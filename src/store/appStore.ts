import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addMacro: (macro: "protein" | "carbs" | "fats", amount: number) => void;

  weightLogs: WeightLog[];
  addWeightLog: (weight: number) => void;

  activeProgram: string;
  setActiveProgram: (program: string) => void;
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
      updateNutrition: (macros) =>
        set((state) => ({ nutrition: { ...state.nutrition, ...macros } })),
      addMacro: (macro, amount) =>
        set((state) => ({
          nutrition: {
            ...state.nutrition,
            [macro]: state.nutrition[macro] + amount,
          },
        })),

      weightLogs: [
        { date: "2023-10-01", weight: 80.5 },
        { date: "2023-10-15", weight: 79.2 },
        { date: "2023-10-31", weight: 78.4 },
      ],
      addWeightLog: (weight) =>
        set((state) => ({
          weightLogs: [
            ...state.weightLogs,
            { date: new Date().toISOString().split("T")[0], weight },
          ],
        })),

      activeProgram: "Metabolic Conditioning 2.0",
      setActiveProgram: (activeProgram) => set({ activeProgram }),
    }),
    {
      name: "app-storage",
    },
  ),
);
