import { Loader2, Plus } from "lucide-react";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../store/authStore";
import { useTransition } from "react";
import type { MealType } from "../../types/db";

const Meal = ({
  meal,
  selected,
  selectedId,
}: {
  meal: MealType;
  selected: (id: string) => void;
  selectedId: string;
}) => {
  const { user } = useAuthStore();
  const [pending, transition] = useTransition();

  const consumeMeal = (meal: MealType) => {
    transition(
      async () =>
        await supabase
          .from("meal")
          .insert({ ...meal, user_id: user.id })
          .select("*")
          .single()
          .then(({ success, data }) => success && selected(data.id)),
    );
  };
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-[28px] overflow-hidden flex group transition-all duration-300">
      <div className="w-56 max-h-56 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-8 flex justify-between items-center">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              {meal.eat_time}
              {" • "}
              {new Date(meal.created_at).toLocaleTimeString("id-ID", {
                minute: "numeric",
                hour: "numeric",
              })}
            </span>
            {/* <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">
                      {meal.badge}
                    </span> */}
          </div>
          <h4 className="text-lg font-bold mb-1 tracking-tight">{meal.name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {meal.description}
          </p>
          <div className="flex gap-3">
            <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-bold text-slate-300 tracking-wider">
              {meal.tag}
            </span>
            <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-bold text-slate-300 tracking-wider">
              {meal.protein}G Protein
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-2xl font-bold tracking-tighter">
              {meal.calorie}
            </span>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Kcal
            </p>
          </div>
          {meal.id != selectedId && (
            <button
              disabled={pending}
              onClick={() => consumeMeal(meal)}
              className="w-10 h-10 rounded-full border border-neutral-500 flex items-center justify-center transition-all hover:bg-neutral-700"
              style={{ opacity: pending && "50%" }}
            >
              {pending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Plus size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meal;
