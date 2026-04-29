import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupabaseServices } from "../services/supabaseServices";
import { useAuthStore } from "./authStore";

interface Nutrition {
  protein: number;
  carbs: number;
  fats: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}

interface WeightLog {
  date: string;
  weight: number;
}

interface AppState {
  workoutActive: false | string;
  startWorkout: (program: string) => void;
  endWorkout: () => void;

  nutrition: Nutrition;
  updateNutrition: (macros: Partial<Nutrition>) => void;
  addMacro: (
    macro: "protein" | "carbs" | "fats",
    amount: number,
  ) => Promise<void>;

  weightLogs: WeightLog[];
  addWeightLog: (weight: number) => Promise<void>;

  activeProgram: string;
  setActiveProgram: (program: string) => void;

  syncSupabaseData: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      workoutActive: false,
      startWorkout: (program) => set({ workoutActive: program }),
      endWorkout: () => set({ workoutActive: false }),

      nutrition: {
        protein: 120,
        targetProtein: 200,
        carbs: 150,
        targetCarbs: 280,
        fats: 45,
        targetFats: 70,
      },
      weightLogs: [
        { date: "2023-10-01", weight: 80.5 },
        { date: "2023-10-15", weight: 79.2 },
        { date: "2023-10-31", weight: 78.4 },
      ],
      updateNutrition: (macros) =>
        set((state) => ({ nutrition: { ...state.nutrition, ...macros } })),
      activeProgram: "Metabolic Conditioning 2.0",
      setActiveProgram: (activeProgram) => set({ activeProgram }),

      addMacro: async (macro, amount) => {
        const userId = useAuthStore.getState().user?.id;
        const today = new Date().toISOString().split("T")[0];

        let updatedNutrition: Nutrition;
        set((state) => {
          updatedNutrition = {
            ...state.nutrition,
            [macro]: state.nutrition[macro] + amount,
          };
          return { nutrition: updatedNutrition };
        });

        if (userId && updatedNutrition!) {
          await SupabaseServices.upsertNutritionLog(userId, today, {
            protein: updatedNutrition.protein,
            carbs: updatedNutrition.carbs,
            fats: updatedNutrition.fats,
          });
        }
      },

      addWeightLog: async (weight) => {
        const userId = useAuthStore.getState().user?.id;
        const today = new Date().toISOString().split("T")[0];

        set((state) => ({
          weightLogs: [...state.weightLogs, { date: today, weight }],
        }));

        if (userId) {
          await SupabaseServices.addWeightLog(userId, weight, today);
        }
      },

      syncSupabaseData: async () => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) return;

        const today = new Date().toISOString().split("T")[0];
        try {
          // Fetch weight logs
          const wLogs = await SupabaseServices.fetchWeightLogs(userId);
          if (wLogs && wLogs.length > 0) {
            set({ weightLogs: wLogs });
          }

          // Fetch today's nutrition
          const nutLog = await SupabaseServices.fetchNutritionLog(
            userId,
            today,
          );
          if (nutLog) {
            set((state) => ({
              nutrition: {
                ...state.nutrition,
                protein: nutLog.protein || state.nutrition.protein,
                carbs: nutLog.carbs || state.nutrition.carbs,
                fats: nutLog.fats || state.nutrition.fats,
              },
            }));
          }
        } catch (e) {
          console.error("Failed to sync supabase data:", e);
        }
      },
    }),
    {
      name: "app-storage",
    },
  ),
);
