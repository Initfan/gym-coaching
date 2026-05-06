import React, { useEffect, useState, useTransition } from "react";
import { BrainCircuit, Droplets, Wheat, Camera, Keyboard } from "lucide-react";
import Preference from "../components/nutrition/Preference";
import supabase from "../utils/supabase";
import { useAuthStore } from "../store/authStore";
import { mealPrompt } from "../lib/prompt";
import ai from "../utils/gemini";
import Meals from "../components/nutrition/Meals";
import { meal_preference } from "../types/schema";
import type z from "zod";
import type { MealType } from "../types/db";
import Stat from "../components/nutrition/Stat";

const Nutrition: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const [meals, setMeals] = useState<MealType[]>([
    {
      id: "a7b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
      user_id: "78b1516d-2772-4818-a244-6d64760ee73b",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      eat_time: "lunch",
      name: "Lemon Herb Grilled Chicken Salad",
      description:
        "A nutrient-dense salad featuring grilled chicken breast, fresh mixed greens, cucumbers, and cherry tomatoes with a zesty lemon vinaigrette. Completely olive and peanut free.",
      tag: "low-carb",
      protein: 38,
      calorie: 350,
      carbs: 24,
      fats: 42,
      created_at: "2026-05-05T13:42:47.483191",
    },
    {
      id: "f1g2h3i4-j5k6-4l7m-8n9o-0p1q2r3s4t5u",
      user_id: "78b1516d-2772-4818-a244-6d64760ee73b",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      eat_time: "breakfast",
      name: "Berry & Chia Greek Yogurt Bowl",
      description:
        "Non-fat Greek yogurt layered with fresh blueberries, raspberries, and chia seeds. High in protein to support weight loss while staying within budget.",
      tag: "high-protein",
      protein: 24,
      calorie: 280,
      carbs: 24,
      fats: 42,
      created_at: "2026-05-05T13:42:47.483191",
    },
  ]);
  const [pending, transition] = useTransition();

  // useEffect(() => {
  //   const generateMeal = async (data: z.infer<typeof meal_preference>) => {
  //     const res = await ai.models.generateContent({
  //       model: "gemini-3-flash-preview",
  //       contents: `${mealPrompt} input: ${JSON.stringify(data)}, create 2 meal`,
  //     });
  //     const meals = JSON.parse(res.text);
  //     setMeals(meals);
  //   };

  //   transition(async () => {
  //     await supabase
  //       .from("meal_preference")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .single()
  //       .then(
  //         ({ data, error }) =>
  //           !error &&
  //           data &&
  //           generateMeal(data as z.infer<typeof meal_preference>),
  //       );
  //   });
  // }, []);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Meal preference */}
      {open && <Preference onClose={() => setOpen(false)} />}

      {/* Main Content Area */}
      <main className="p-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
            Nutrition
            <br />
            <span className="text-white/20">Optimization</span>
          </h2>
        </header>

        {/* Top Insights Section */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* AI Coach Insight */}
          <div className="col-span-8 bg-neutral-900 rounded-[24px] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <BrainCircuit size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide">
                      Coach AI Insight
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                      Real-Time
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-lg">
                You're low on protein today (only 45% of goal). At this rate,
                you'll miss your weekly calorie target for{" "}
                <span className="text-white font-bold">
                  Phase 1: Hypertrophy
                </span>
                . Consider adding a high-protein snack before your 2:00 PM lift.
              </p>
              <div className="flex gap-3">
                <button className="px-5 py-2 text-[11px] font-bold rounded-lg bg-neutral-800 hover:bg-neutral-800/75 transition-colors">
                  See Plan
                </button>
                <button className="px-5 py-2 bg-neutral-800/50 text-white text-[11px] font-bold rounded-lg hover:bg-neutral-800/25 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
            {/* Abstract Background Accent */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Log Food Card */}
          <div className="col-span-4 bg-neutral-900 border border-neutral-700 rounded-[24px] p-8">
            <h3 className="text-sm font-bold mb-6 tracking-tight">Log Food</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-3 p-4 border border-neutral-700 rounded-2xl  transition-colors">
                <Camera size={20} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
                  AI Vision
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 p-4 border border-neutral-700 rounded-2xl  transition-colors">
                <Keyboard size={20} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  Manual
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <Stat />

        {pending ? (
          <p>Preparing your meals</p>
        ) : (
          <Meals meals={meals} onClose={() => setOpen(true)} />
        )}

        {/* Footer Metrics */}
        <div className="grid grid-cols-2 gap-6 pb-12">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <Droplets size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <h4 className="text-sm font-bold">Hydration</h4>
                <span className="text-[10px] font-bold text-slate-400">
                  2.1L / 3.5L consumed
                </span>
              </div>
              <div className="flex gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 flex-1 rounded-sm ${i < 4 ? "bg-blue-500" : "bg-slate-100"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 flex items-center gap-5">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              <Wheat size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <h4 className="text-sm font-bold">Fiber Tracker</h4>
                <span className="text-[10px] font-bold text-slate-400">
                  28g / 35g consumed
                </span>
              </div>
              <div className="relative h-2 w-full bg-slate-100 rounded-full">
                <div className="absolute h-full bg-orange-500 rounded-full w-[80%]" />
              </div>
              <div className="mt-1 text-[10px] font-bold text-orange-500">
                80%
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nutrition;
