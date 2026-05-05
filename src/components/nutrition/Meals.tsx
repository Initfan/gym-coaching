import { Settings } from "lucide-react";
import type { MealType } from "../../types/db";

import Meal from "./Meal";
import { useState } from "react";

interface Props {
  onClose?: () => void;
  meals: MealType[];
}

const Meals = (props: Props) => {
  const [mealsId, setSelected] = useState<string[]>([]);

  return (
    <>
      <div className="flex p-1 rounded-xl w-fit mb-8 bg-[#222222]">
        <button className="px-8 py-2 bg-[#1a1a1a] rounded-lg text-xs font-bold shadow-sm">
          Recomendation
        </button>
        <button className="px-8 py-2 text-xs font-bold text-slate-200">
          My Comsumption
        </button>
      </div>

      {/* Meal Recommendations */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Smart Meal Recommendations
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Adaptive plans based on your Hypertrophy goal, $15/day budget, and
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
          {props.meals.map((meal, idx) => (
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
