import {
  Dumbbell,
  Utensils,
  BrainCircuit,
  Flame,
  Calendar,
  TrendingUp,
} from "lucide-react";
// import { useAppStore } from "../store/appStore";
import { useEffect, useState } from "react";
import { getStat } from "@/usecase/dashboard";
import { useAuthStore } from "@/store/authStore";
import Chart from "@/components/dashboard/Chart";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stat, setStat] = useState(null);

  // const { nutrition, weightLogs, activeProgram } = useAppStore();
  // const latestWeight =
  //   weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : 0;
  // const previousWeight =
  //   weightLogs.length > 1
  //     ? weightLogs[weightLogs.length - 2].weight
  //     : latestWeight;
  // const weightDiff = latestWeight - previousWeight;

  useEffect(() => {
    getStat(user.id).then((res) => setStat(res));
  }, []);

  return (
    <main className="flex-1 md:p-10 p-5 overflow-y-auto">
      <section className="mb-10">
        <h2 className="text-4xl font-bold mb-2 tracking-tight">
          Good Morning, Ready to Train?
        </h2>
        <p className="text-white/50">
          Your personalized gym plan is ready today.
        </p>
      </section>

      {/* Top Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard title="TODAY'S WORKOUT" icon={<Dumbbell size={14} />}>
          <div className="text-xl font-bold tracking-tight truncate py-1">
            {stat?.name}
          </div>
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
            Expected duration: {stat?.duration} min
          </p>
        </StatCard>
        <StatCard title="CALORIES TARGET" icon={<Flame size={14} />}>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">
              {stat?.kcal}
            </span>
            <span className="text-xs text-white/40">
              / {stat?.goalNut.kcal} kcal
            </span>
          </div>
          <div className="w-full bg-white/5 h-1 mt-3 rounded-full overflow-hidden">
            <div
              className="bg-white/60 h-full transition-all"
              style={{
                width: `${Math.min(100, (stat?.calorie / stat?.tdee) * 100)}%`,
              }}
            />
          </div>
        </StatCard>
        <StatCard title="WEIGHT PROGRESS" icon={<TrendingUp size={14} />}>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">
              {stat?.weight}
            </span>
            <span className="text-xs text-white/40">kg</span>
          </div>
          {/* <p
            className={`text-[10px] mt-1 ${weightDiff <= 0 ? "text-emerald-400" : "text-red-400"}`}
          >
            {weightDiff <= 0 ? "↘" : "↗"} {Math.abs(weightDiff).toFixed(1)}kg
            from last log
          </p> */}
        </StatCard>
        <StatCard title="CONSISTENCY" icon={<Calendar size={14} />}>
          <div className="text-2xl font-bold">94%</div>
          <div className="flex gap-1 mt-3">
            {[1, 1, 1, 1, 0].map((bar, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${bar ? "bg-white/80" : "bg-white/10"}`}
              />
            ))}
          </div>
        </StatCard>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          "hybrid",
          "mind-body",
          "functional",
          "endurance",
          "fat loss",
          "strength",
        ].map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all uppercase
              ${tag === stat?.goal ? "bg-white text-black" : "bg-[#1a1a1a] text-white/40 border border-white/5 hover:border-white/20"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Center Section: Main Focus & AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2 relative h-[360px] rounded-2xl overflow-hidden group">
          <img
            // src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
            src="https://loremflickr.com/800/600/gym,fitness"
            alt="Gym"
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-between">
            <div>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                Current Program
              </span>
              <h3 className="text-5xl font-bold mt-4 leading-[1.1] max-w-md tracking-tighter">
                {stat?.name}
              </h3>
            </div>
            <div className="flex gap-12">
              <Metric label="DURATION" value={`${stat?.duration} Mins`} />
              <Metric label="LOAD INDEX" value="8.5/10" />
              <Metric label="EST. CAL" value="640 kcal" />
            </div>
            <div className="absolute top-8 right-8 text-right">
              <span className="text-5xl font-black text-white/20">
                0{stat?.day}
              </span>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                Today's Focus
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg">
              <BrainCircuit size={20} className="text-white/70" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-wider uppercase">
                AI Insights
              </h4>
              <p className="text-[10px] text-emerald-400">
                Optimization Engine Active
              </p>
            </div>
          </div>

          <div className="flex-1 italic text-white/80 text-sm leading-relaxed border-l-2 border-emerald-500/50 pl-4 py-1 mb-8">
            "Based on your 7h 24m sleep and elevated HRV, I recommend increasing
            your bench press load by 2.5% today."
          </div>

          <div className="space-y-4 mb-8">
            <ProgressBar label="Recovery Readiness" value="92%" />
            <ProgressBar
              label="CNS Fatigue"
              value="Low"
              progress={30}
              color="bg-emerald-500"
            />
          </div>

          <button className="w-full py-3 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Deep Analysis
          </button>
        </div>
      </div>

      {/* Bottom Grid: Nutrition & Strength Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Utensils size={16} /> Nutrition
            </h3>
          </div>
          <div className="space-y-6">
            <NutritionRow
              label="PROTEIN"
              current={stat?.protein}
              target={stat?.goalNut.protein}
              unit="g"
            />
            <NutritionRow
              label="CARBS"
              current={stat?.carbs}
              target={stat?.goalNut.carbs}
              unit="g"
            />
            <NutritionRow
              label="FATS"
              current={stat?.fats}
              target={stat?.goalNut.fats}
              unit="g"
            />
          </div>
        </div>

        <Chart />
      </div>
    </main>
  );
};

// --- Subcomponents ---

const StatCard = ({ title, icon, children }: any) => (
  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-bold text-white/40 tracking-widest">
        {title}
      </span>
      <span className="text-white/20">{icon}</span>
    </div>
    {children}
  </div>
);

const Metric = ({ label, value }: any) => (
  <div>
    <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-1">
      {label}
    </p>
    <p className="text-xl font-bold tracking-tight">{value}</p>
  </div>
);

const ProgressBar = ({
  label,
  value,
  progress = 92,
  color = "bg-white",
}: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-[10px] font-bold">{value}</span>
    </div>
    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
      <div
        className={`${color} h-full transition-all duration-1000`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const NutritionRow = ({ label, current, target, unit }: any) => (
  <div className="flex items-center gap-6">
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-white/80"
          strokeDasharray={125.6}
          strokeDashoffset={125.6 - Math.min(1, current / target) * 125.6}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-bold">
        {current}
        {unit}
      </span>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-end">
        <span className="text-[11px] font-bold tracking-widest">{label}</span>
        <span className="text-[10px] text-white/40">
          TARGET {target}
          {unit}
        </span>
      </div>
      <div className="w-full bg-white/5 h-1 mt-2">
        <div
          className="bg-white/40 h-full transition-all duration-500"
          style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
