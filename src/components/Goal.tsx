import React, { useState, useEffect } from "react";
import {
  LineChart,
  ChevronDown,
  ArrowRight,
  Dumbbell,
  TrendingDown,
  Utensils,
  Trophy,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import PlanGeneration from "./PlanGeneration";
import supabase from "../utils/supabase";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import { profileSchema, type profileSchemaType } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

interface ObjectiveCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OBJECTIVES: ObjectiveCard[] = [
  {
    id: "bulking",
    title: "Bulking",
    description:
      "Focus on hyper-trophy and strength gains. Structured caloric surplus with high-intensity resistance training.",
    icon: <Dumbbell className="w-5 h-5" />,
  },
  {
    id: "cutting",
    title: "Cutting",
    description:
      "Prioritize fat loss while preserving lean muscle mass. Precision tracking and metabolic conditioning.",
    icon: <TrendingDown className="w-5 h-5" />,
  },
  {
    id: "maintenance",
    title: "Diet Maintenance",
    description:
      "Balance lifestyle and longevity. Optimal nutritional density and sustainable movement patterns for long-term health.",
    icon: <Utensils className="w-5 h-5" />,
  },
  {
    id: "contest",
    title: "Body Contest",
    description:
      "Peak performance and aesthetic conditioning. Rigorous scheduling for competitive preparation and visual symmetry.",
    icon: <Trophy className="w-5 h-5" />,
  },
];

const Goal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [goal, setGoal] = useState<string>("Bulking");
  const [bmi, setBmi] = useState<number>(23.1);
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    register,
  } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: "20",
      height: "180",
      weight: "80",
    },
  });

  useEffect(() => {
    const heightInMeters = Number(watch("height")) / 100;
    const calculatedBmi =
      Number(watch("weight")) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
  }, [watch("height"), watch("height")]);

  const getBmiStatus = (val: number) => {
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal";
    if (val < 30) return "Overweight";
    return "Obese";
  };

  const onSubmit = async (data: profileSchemaType) => {
    await supabase
      .from("profiles")
      .upsert({ ...data, id: user.id })
      .then(({ success }) => success && navigate("/dashboard"));
  };

  return isSubmitting ? (
    <PlanGeneration />
  ) : (
    <div className=" font-sans bg-neutral-900 flex-col p-6 lg:px-0 lg:flex-row text-white flex items-start gap-8 py-8 lg:h-screen overflow-hidden justify-center">
      <div>
        <span className="inline-block bg-neutral-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 text-slate-300">
          Medical Assessment
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
          Personalized <br /> Performance Profile
        </h1>
        <p className="text-slate-300 leading-relaxed max-w-md">
          Our AI requires precise biological data to engineer a workout and
          nutrition strategy that minimizes injury risk while maximizing
          metabolic efficiency.
        </p>
      </div>

      {/* Main Content */}
      <main className="bg-neutral-800 lg:w-1/2 lg:h-screen lg:overflow-y-auto border-neutral-700 border scrollbar-hide rounded-[32px] p-8 md:p-12 ">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Biometric Data</h2>
          <p className="text-sm text-slate-300">
            Please provide your current physiological metrics.
          </p>
        </header>

        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          {/* Age Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Biological Age
              </label>
              <div className="text-slate-300 font-bold">
                <span className="text-2xl">{watch("age")}</span>
                <span className="text-sm ml-1 ">years</span>
                <input type="hidden" {...register("age")} />
              </div>
            </div>
            <input
              type="range"
              min="18"
              max="80"
              // value={age}
              {...register("age")}
              className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          {/* Height & Weight Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Height
              </label>
              <div className="relative group">
                <input
                  type="number"
                  {...register("height")}
                  className="w-full border border-neutral-700 rounded-xl py-4 px-4 text-sm font-bold outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                  CM
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Weight
              </label>
              <div className="relative group">
                <input
                  type="number"
                  {...register("weight")}
                  className="w-full border border-neutral-700 rounded-xl py-4 px-4 text-sm font-bold outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                  KG
                </span>
              </div>
            </div>
          </div>

          {/* Gender Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Gender Identity
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border border-neutral-700  rounded-xl py-4 px-4 text-sm text-slate-300 font-medium outline-none transition-all cursor-pointer bg-neutral-800"
                {...register("gender")}
              >
                <option disabled selected value="">
                  Select biological gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* BMI Display Card */}
          <div className="bg-neutral-900 border border-dashed border-slate-700 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                Estimated BMI
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{bmi}</span>
                <span className="text-xs text-slate-500 font-medium">
                  ({getBmiStatus(bmi)})
                </span>
                <input
                  type="hidden"
                  {...register("bmi", { value: bmi.toString() })}
                />
              </div>
            </div>
            <div className="bg-slate-100 p-3 rounded-xl shadow-sm border border-slate-100">
              <LineChart className="w-5 h-5 text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
            {OBJECTIVES.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setGoal(obj.id)}
                className={`relative text-left p-8 rounded-xl border-2 transition-all duration-200 flex flex-col gap-4 group ${
                  goal === obj.id
                    ? "bg-neutral-900 shadow-sm"
                    : "border-neutral-700 bg-neutral-800 hover:border-gray-200"
                }`}
              >
                {goal === obj.id && (
                  <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-black" />
                )}

                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    goal === obj.id
                      ? "bg-black text-white"
                      : "bg-slate-100 text-gray-600"
                  }`}
                >
                  {obj.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{obj.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {obj.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <input type="hidden" {...register("goal")} value={goal} />

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-bold text-md flex items-center justify-center gap-3 hover:bg-black/75 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
            style={{ opacity: isSubmitting && "50%" }}
          >
            Generate My Plan
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Goal;
