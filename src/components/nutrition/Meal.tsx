import { Loader2, Plus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useTransition } from "react";
import type { MealType } from "../../types/db";
import { consumeMeal } from "../../usecase/nutrition";

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

  const onConsumeMeal = (meal: MealType) => {
    transition(async () =>
      consumeMeal(user.id, meal).then((res) => selected(res.id)),
    );
  };

  return (
    <div className="bg-neutral-900 flex-col md:flex-row border border-neutral-700 rounded-[28px] overflow-hidden flex group transition-all duration-300">
      <div className="md:w-56 w-full max-h-56 overflow-hidden ">
        <img
          src={meal.image}
          alt={meal.name}
          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-center">
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
            <span className="px-2 py-1 bg-neutral-800 uppercase border border-neutral-700 rounded text-[9px] font-bold text-slate-300 tracking-wider">
              {meal.tag}
            </span>
            <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-bold text-slate-300 tracking-wider">
              {meal.protein}G Protein
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-6 justify-between w-full md:w-auto md:mt-0 md:justify-baseline">
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
              onClick={() => onConsumeMeal(meal)}
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

export const MealSkeleton = () => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-[28px] overflow-hidden flex animate-pulse">
      {/* Image placeholder */}
      <div className="w-56 max-h-56 bg-neutral-800" />

      {/* Content placeholder */}
      <div className="flex-1 p-8 flex justify-between items-center">
        <div className="max-w-md flex flex-col gap-2">
          {/* Eat time placeholder */}
          <div className="h-3 w-32 bg-neutral-800 rounded" />

          {/* Meal name placeholder */}
          <div className="h-5 w-48 bg-neutral-800 rounded" />

          {/* Description placeholder */}
          <div className="h-3 w-full bg-neutral-800 rounded" />
          <div className="h-3 w-5/6 bg-neutral-800 rounded" />

          {/* Tags placeholder */}
          <div className="flex gap-3 mt-2">
            <div className="h-5 w-16 bg-neutral-800 rounded" />
            <div className="h-5 w-20 bg-neutral-800 rounded" />
          </div>
        </div>

        {/* Calorie & button placeholder */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-16 bg-neutral-800 rounded" />
          <div className="h-10 w-10 bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Meal;
