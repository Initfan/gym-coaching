import { Settings } from "lucide-react";
import type { MealType } from "../../types/db";

import Meal from "./Meal";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";

interface Props {
  onClose?: () => void;
  meals: MealType[];
}

const Meals = (props: Props) => {
  const [meals, setMeals] = useState([]);
  const [mealsId, setSelected] = useState<string[]>([]);
  const [mealContent, setMealContent] = useState<"recomend" | "consumption">(
    "recomend",
  );

  useEffect(() => {
    if (mealContent == "consumption")
      supabase
        .from("meal")
        .select("*")
        .then(({ data }) => setMeals(data));
  }, [mealContent]);

  return (
    <>
      <div className="flex p-1 rounded-xl w-fit mb-8 bg-[#222222]">
        <button
          onClick={() => setMealContent("recomend")}
          className={`px-8 py-2 text-xs font-bold ${mealContent == "recomend" ? "bg-[#1a1a1a] rounded-lg" : "text-slate-200"}`}
        >
          Recomendation
        </button>
        <button
          onClick={() => setMealContent("consumption")}
          className={`px-8 py-2 text-xs font-bold ${mealContent == "consumption" ? "bg-[#1a1a1a] rounded-lg" : "text-slate-200"}`}
        >
          My Comsumption
        </button>
      </div>

      {/* Meal Recommendations */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              {mealContent == "recomend"
                ? "Smart Meal Recommendations"
                : "Today's Consumption"}
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Adaptive plans based on your Hypertrophy goal, budget, and
              Mediterranean preference.
            </p>
          </div>
          <button
            onClick={props.onClose}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-800 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <Settings size={14} />
            Preferences
          </button>
        </div>

        <div className="space-y-4">
          {mealContent == "recomend" &&
            props.meals.map((meal, idx) => (
              <Meal
                meal={meal}
                key={idx}
                selected={(id) => setSelected((p) => [...p, id])}
                selectedId={mealsId[idx]}
              />
            ))}
          {mealContent == "consumption" &&
            meals.map((meal, idx) => (
              <Meal
                meal={meal}
                key={idx}
                selected={(id) => setSelected((p) => [...p, id])}
                selectedId={mealsId[idx]}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Meals;
