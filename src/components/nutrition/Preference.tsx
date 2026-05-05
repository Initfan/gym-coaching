import {
  X,
  Target,
  Ban,
  AlertTriangle,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import supabase from "../../utils/supabase";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { meal_preference } from "../../types/schema";

type data = z.infer<typeof meal_preference>;

const Preference = ({ onClose }: { onClose?: () => void }) => {
  const { user } = useAuthStore();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<data>({
    resolver: zodResolver(meal_preference),
  });

  const onSubmit = async (data: data) => {
    await supabase
      .from("meal_preference")
      .insert({
        ...data,
        user_id: user.id,
      })
      .then(({ error }) => !error && onClose());
  };

  return (
    <div className="fixed inset-0 h-screen items-center justify-center flex bg-black/60 backdrop-blur-sm select-none z-50 font-sans p-4">
      <div className="bg-neutral-900 w-full max-w-[500px] rounded-[24px] shadow-2xl shadow-black/20 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Meal Planning</h1>
            <p className="text-sm text-slate-300 mt-1">
              Configure your AI nutrition preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-300 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <form className="px-8 pb-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Goal Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <Target size={14} /> Your Goal
            </label>
            <div className="relative">
              <select
                className="w-full  border border-neutral-800 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer"
                {...register("goal")}
              >
                <option>Select Goal</option>
                <option value="weight loss">Weight Loss</option>
                <option value="fat loss">Fat Loss</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="bulking">Bulking</option>
                <option value="maintance">Maintenance</option>
                <option value="performance">Performance</option>
                <option value="diet">Diet</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l pl-3 border-neutral-700">
                <div className="border-t-2 border-r-2 border-slate-400 w-1.5 h-1.5 rotate-135" />
              </div>
            </div>
            {errors.goal && (
              <p className="text-red-500 text-xs">{errors.goal.message}</p>
            )}
          </div>

          {/* Disliked Foods */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-700 flex items-center gap-2">
              <Ban size={14} /> What food don't you like?
            </label>
            <textarea
              {...register("disliked_food")}
              placeholder="e.g. Mushrooms, Olives, Cilantro..."
              className="w-full border border-neutral-700 rounded-xl px-4 py-3 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all resize-none"
            ></textarea>
            {errors.disliked_food && (
              <p className="text-red-500 text-xs">
                {errors.disliked_food.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <AlertTriangle size={14} /> Allergies
              </label>
              <input
                {...register("alergies")}
                type="text"
                placeholder="e.g. Peanuts"
                className="w-full  border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
              {errors.alergies && (
                <p className="text-red-500 text-xs">
                  {errors.alergies.message}
                </p>
              )}
            </div>
            {/* Budget */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <DollarSign size={14} /> Daily Budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm">
                  $
                </span>
                <input
                  {...register("budget")}
                  type="number"
                  placeholder="20"
                  className="w-full  border border-neutral-700 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>
              {errors.budget && (
                <p className="text-red-500 text-xs">{errors.budget.message}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border bg-neutral-800 border-neutral-700 rounded-xl text-sm font-bold hover:bg-neutral-800/75 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-xl text-sm font-bold shadow-lg shadow-black/10 hover:bg-black/75 transition-all active:scale-[0.98]"
              style={{ opacity: isSubmitting && "50%" }}
            >
              <span>Save Changes</span>
              {isSubmitting && <Loader2 className="animate-spin" size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preference;
