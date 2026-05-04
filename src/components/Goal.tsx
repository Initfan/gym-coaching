import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  LineChart,
  ChevronDown,
  ArrowRight,
  Dumbbell,
  TrendingDown,
  Utensils,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import PlanGeneration from "./PlanGeneration";

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
  const [age, setAge] = useState<number>(28);
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(75);
  const [bmi, setBmi] = useState<number>(23.1);
  const [selected, setSelected] = useState<string>("cutting");
  const [loading, setPlan] = useState(false);

  // Simple BMI calculation logic: weight (kg) / [height (m)]^2
  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));
  }, [height, weight]);

  const getBmiStatus = (val: number) => {
    if (val < 18.5) return "Underweight";
    if (val < 25) return "Normal";
    if (val < 30) return "Overweight";
    return "Obese";
  };

  const planGeneration = () => {
    setPlan(true);
  };

  return loading ? (
    <PlanGeneration />
  ) : (
    <div className=" font-sans text-slate-900 flex items-start gap-8 py-8 h-screen overflow-hidden justify-center">
      <div>
        <span className="inline-block bg-slate-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 text-slate-500">
          Medical Assessment
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
          Personalized <br /> Performance Profile
        </h1>
        <p className="text-slate-500 leading-relaxed max-w-md">
          Our AI requires precise biological data to engineer a workout and
          nutrition strategy that minimizes injury risk while maximizing
          metabolic efficiency.
        </p>
      </div>

      {/* Main Content */}
      <main className="bg-white w-1/2 h-screen overflow-y-auto border-slate-300 border scrollbar-hide rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50">
        <header className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Biometric Data</h2>
          <p className="text-sm text-slate-400">
            Please provide your current physiological metrics.
          </p>
        </header>

        <div className="space-y-10">
          {/* Age Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Biological Age
              </label>
              <div className="text-slate-900 font-bold">
                <span className="text-2xl">{age}</span>
                <span className="text-sm ml-1 text-slate-400">years</span>
              </div>
            </div>
            <input
              type="range"
              min="18"
              max="80"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          {/* Height & Weight Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Height
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full border border-slate-100 bg-white rounded-xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                  CM
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Weight
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full border border-slate-100 bg-white rounded-xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                  KG
                </span>
              </div>
            </div>
          </div>

          {/* Gender Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Gender Identity
            </label>
            <div className="relative">
              <select className="w-full appearance-none border border-slate-100 bg-white rounded-xl py-4 px-4 text-sm text-slate-500 font-medium focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all cursor-pointer">
                <option>Select biological gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* BMI Display Card */}
          <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Estimated BMI
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{bmi}</span>
                <span className="text-xs text-slate-500 font-medium">
                  ({getBmiStatus(bmi)})
                </span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <LineChart className="w-5 h-5 text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
            {OBJECTIVES.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelected(obj.id)}
                className={`relative text-left p-8 rounded-xl border-2 transition-all duration-200 flex flex-col gap-4 group ${
                  selected === obj.id
                    ? "border-black bg-white shadow-sm"
                    : "border-gray-100 bg-gray-50/30 hover:border-gray-200"
                }`}
              >
                {selected === obj.id && (
                  <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-black" />
                )}

                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    selected === obj.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {obj.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{obj.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={planGeneration}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold text-md flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
          >
            Generate My Plan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Goal;
