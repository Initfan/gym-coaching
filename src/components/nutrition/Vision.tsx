import { Camera, Loader2, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealSchema, type mealSchemaType } from "../../types/schema";
import { useState, useTransition } from "react";
import { analyzeMeal, consumeMeal } from "../../usecase/nutrition";
import type { MealType } from "../../types/db";

const Vision = () => {
  const [close, setClose] = useState(true);

  return (
    <>
      {!close && <NutritionRecognition onClose={() => setClose(true)} />}

      <div className="space-y-3 text-center">
        <h3 className="text-sm font-bold  tracking-tight">Log Food</h3>
        <button
          onClick={() => setClose(false)}
          className="flex flex-col items-center justify-center gap-3 p-4 border border-neutral-700 rounded-2xl  transition-colors"
        >
          <Camera size={20} className="text-blue-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
            AI Vision
          </span>
        </button>
      </div>
    </>
  );
};

const NutritionRecognition = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, transition] = useTransition();
  const [file, setFile] = useState<File>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
    setValues,
  } = useForm<mealSchemaType>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      user_id: user.id,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
    // onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const file = e.dataTransfer.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
    // onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: MealType) => {
    await consumeMeal(user.id, data);
    onClose();
  };

  const onAnalyze = () =>
    transition(async () => {
      const meal = await analyzeMeal(file);
      setValues(meal);
    });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 select-none font-sans">
      <div className="bg-neutral-900 max-h-screen overflow-y-auto w-full max-w-[500px] rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Nutrition Recognition
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Upload an image and AI will identify meal info.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="px-8 pb-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Upload Image
            </label>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full relative overflow-hidden h-40 border-2 border-dashed border-neutral-700 rounded-xl flex items-center justify-center bg-neutral-800 text-slate-300 cursor-pointer hover:border-white transition-colors"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full rounded-xl"
                />
              ) : (
                <span>Drag & Drop or click to upload</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute size-full opacity-0 cursor-pointer border-4"
              />
            </div>
          </div>

          {/* name */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1">
              Name
            </label>
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                placeholder="e.g egg"
                disabled
                value={watch("name")}
                className="w-full border border-neutral-700 rounded-xl  pr-4 p-3 text-sm text-white transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* desc */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1">
              Description
            </label>
            <div className="relative">
              <textarea
                {...register("description")}
                rows={4}
                placeholder="e.g healthy food"
                disabled
                value={watch("description")}
                className="w-full border border-neutral-700 rounded-xl  pr-4 p-3 text-sm text-white transition-all"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1">
              Calories
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm">
                Kcal
              </span>
              <input
                {...register("calorie")}
                value={watch("calorie")}
                type="number"
                placeholder="0 "
                disabled
                className="w-full border border-neutral-700 rounded-xl pl-12 pr-4 py-3 text-sm text-white transition-all"
              />
            </div>
            {errors.calorie && (
              <p className="text-red-500 text-xs">{errors.calorie.message}</p>
            )}
          </div>

          {/* Macronutrients */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Fats (g)
              </label>
              <input
                {...register("fats")}
                value={watch("fats")}
                type="number"
                disabled
                placeholder="0"
                className="w-full border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Protein (g)
              </label>
              <input
                {...register("protein")}
                value={watch("protein")}
                type="number"
                disabled
                placeholder="0"
                className="w-full border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Carbs (g)
              </label>
              <input
                {...register("carbs")}
                value={watch("carbs")}
                type="number"
                disabled
                placeholder="0"
                className="w-full border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onAnalyze}
              disabled={pending}
              className="flex-1 px-6 py-3 flex gap-3 border justify-center border-neutral-700 bg-neutral-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-neutral-800/70 transition-colors"
              style={{ opacity: pending ? 0.6 : 1 }}
            >
              Analyze
              {pending && <Loader2 className="animate-spin" size={16} />}
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-bold shadow-lg shadow-black/20 hover:bg-black/75 transition-all active:scale-[0.98]"
              style={{ opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting && <Loader2 className="animate-spin" size={16} />}
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vision;
