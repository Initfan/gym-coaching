import React, { useState, useEffect } from "react";
import {
  LineChart,
  ChevronDown,
  ArrowRight,
  Dumbbell,
  CheckCircle2,
  Loader2,
  Layers,
  Leaf,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import PlanGeneration from "./PlanGeneration";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import {
  profileSchema,
  type GoalType,
  type profileSchemaType,
} from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { generateProgram } from "@/usecase/program";

const OBJECTIVES = [
  {
    type: "strength",
    goal: "Muscle & Strength",
    description: "Build muscle and increase power using weights and machines.",
    icon: <Dumbbell />,
  },
  {
    type: "fat loss",
    goal: "Weight Loss",
    description: "Burn fat with cardio, HIIT, and nutrition guidance.",
    icon: <Activity />,
  },
  {
    type: "endurance",
    goal: "Stamina & Cardio",
    description: "Improve running, cycling, or overall endurance.",
    icon: <Clock />,
  },
  {
    type: "functional",
    goal: "Fitness & Agility",
    description: "Train movements, flexibility, and sports performance.",
    icon: <TrendingUp />,
  },
  {
    type: "mind-body",
    goal: "Wellness & Flexibility",
    description: "Focus on yoga, stretching, mobility, and stress relief.",
    icon: <Leaf />,
  },
  {
    type: "hybrid",
    goal: "Multiple Goals",
    description:
      "Combines strength, cardio, functional, and wellness training.",
    icon: <Layers />,
  },
];

const Goal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [goal, setGoal] = useState<GoalType>("strength");
  const [bmi, setBmi] = useState<number>(23.1);
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    register,
    setValues,
  } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: "0",
      height: "0",
      weight: "0",
    },
  });

  useEffect(() => {
    const heightInMeters = Number(watch("height")) / 100;
    const calculatedBmi =
      Number(watch("weight")) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
  }, [watch("weight"), watch("height")]);

  const getBmiStatus = (val: number) => {
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal";
    if (val < 30) return "Overweight";
    return "Obese";
  };

  const onSubmit = async (data: profileSchemaType) => {
    await generateProgram(user.id, data);
    navigate("/dashboard");
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
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Gender Identity
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none border border-neutral-700  rounded-xl py-4 px-4 text-sm text-slate-300 font-medium outline-none transition-all cursor-pointer bg-neutral-800"
                {...register("experience")}
              >
                <option disabled selected value="">
                  Experience level
                </option>
                <option value={"beginner"}>Beginner</option>
                <option value={"intermediate"}>Intermediate</option>
                <option value={"expert"}>Expert</option>
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

          <div className="space-y-3">
            <h2 className="text-2xl font-bold mb-2">Define your Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
              {OBJECTIVES.map((obj) => (
                <button
                  type="button"
                  key={obj.type}
                  onClick={() => (
                    setGoal(obj.type as GoalType),
                    setValues({ goal: obj.type as GoalType })
                  )}
                  className={`relative text-left p-8 rounded-xl border-2 transition-all duration-200 flex flex-col gap-4 group ${
                    goal === obj.type
                      ? "bg-neutral-900 shadow-sm"
                      : "border-neutral-700 bg-neutral-800 hover:border-gray-200"
                  }`}
                >
                  {goal === obj.type && (
                    <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-black" />
                  )}

                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      goal === obj.type
                        ? "bg-black text-white"
                        : "bg-slate-100 text-gray-600"
                    }`}
                  >
                    {obj.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">{obj.goal}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {obj.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
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
