import React from "react";
import {
  Zap,
  Bell,
  Target,
  Award,
  Infinity as InfinityIcon,
  BrainCircuit,
} from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  unit: string;
  progress?: number;
  subText?: string;
};

type BenchmarkProps = {
  category: string;
  title: string;
  value: string;
  progress: number;
};

type AccoladeProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const CustomProgressBar: React.FC<{ progress: number; height?: string }> = ({
  progress,
  height = "h-1",
}) => (
  <div className={`w-full ${height} bg-[#2c2c2e] rounded-full overflow-hidden`}>
    <div
      className="h-full bg-white rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  progress,
  subText,
}) => (
  <div className="bg-[#111111] p-5 rounded-xl border border-[#1c1c1e]">
    <p className="text-[10px] font-bold text-[#8e8e93] uppercase tracking-[0.15em] mb-4">
      {label}
    </p>
    <div className="flex items-baseline gap-1 mb-2">
      <span className="text-3xl font-black tracking-tighter text-white">
        {value}
      </span>
      <span className="text-xs font-bold text-[#8e8e93] uppercase tracking-wider">
        {unit}
      </span>
    </div>
    {progress !== undefined && <CustomProgressBar progress={progress} />}
    {subText && (
      <p className="text-[10px] font-medium text-[#8e8e93] mt-2 tracking-tight">
        {subText}
      </p>
    )}
  </div>
);

const BenchmarkItem: React.FC<BenchmarkProps> = ({
  category,
  title,
  progress,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-baseline">
      <div className="space-y-0.5">
        <p className="text-[9px] font-bold text-[#8e8e93] uppercase tracking-[0.2em]">
          {category}
        </p>
        <p className="text-sm font-black text-white tracking-tight">{title}</p>
      </div>
      <p className="text-[10px] font-bold text-white uppercase tracking-wider tabular-nums">
        {progress}%
      </p>
    </div>
    <CustomProgressBar progress={progress} height="h-[2px]" />
  </div>
);

const AccoladeBadge: React.FC<AccoladeProps> = ({ icon, label, active }) => (
  <div className="flex flex-col items-center gap-2 text-center group cursor-pointer w-[60px]">
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors ${
        active
          ? "border-white bg-white/5 text-white"
          : "border-[#2c2c2e] text-[#48484a] group-hover:border-[#48484a] group-hover:text-[#8e8e93]"
      }`}
    >
      {React.cloneElement(icon as React.ReactElement)}
    </div>
    <p
      className={`text-[8px] font-black uppercase tracking-[0.2em] leading-tight ${
        active ? "text-white" : "text-[#8e8e93]"
      }`}
    >
      {label}
    </p>
  </div>
);

const BarChartItem: React.FC<{ height: string; isActive?: boolean }> = ({
  height,
  isActive,
}) => (
  <div className="flex-1 flex flex-col justify-end gap-1">
    <div
      className={`${height} w-full rounded-[3px] transition-all duration-300 ${isActive ? "bg-white" : "bg-[#1c1c1e]"}`}
    ></div>
  </div>
);

const Profile: React.FC = () => {
  return (
    <main className="flex-1 p-10 overflow-y-auto">
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-lg font-black tracking-tight uppercase">
          Kinetic Atelier <button onClick={() => { import("../store/authStore").then(m => m.useAuthStore.getState().signOut()) }} className="ml-4 text-xs bg-red-500/20 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">Sign Out</button>
        </h2>
        <div className="flex items-center gap-6 text-[#48484a]">
          <Zap size={18} className="cursor-pointer hover:text-white" />
          <Bell size={18} className="cursor-pointer hover:text-white" />
          <div className="w-8 h-8 rounded-full bg-slate-500 border border-[#2c2c2e] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?&w=100&q=80"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* --- Profile Header Section --- */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-[#111111] p-8 rounded-2xl border border-[#1c1c1e] relative group">
          {/* Background Graphic Effect */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 flex items-baseline gap-1 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-12 h-40 bg-slate-500 rounded-lg"></div>
            <div className="w-12 h-32 bg-slate-500 rounded-lg"></div>
            <div className="w-12 h-20 bg-slate-500 rounded-lg"></div>
          </div>

          <div className="relative z-10 space-y-5">
            <span className="inline-block bg-[#1c1c1e] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-[0.3em] text-[#8e8e93]">
              Elite Optimization Phase
            </span>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.85]">
              Alex
              <br />
              Mercer
            </h1>
            <p className="max-w-md text-sm text-[#8e8e93] leading-relaxed">
              Calisthenics specialist focused on explosive power and neural
              efficiency. Currently on a 42-day optimization streak.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="bg-[#050505] px-4 py-3 rounded-lg border border-[#1c1c1e] text-center w-24">
                <span className="text-3xl font-black tracking-tighter text-white">
                  84
                </span>
                <p className="text-[9px] font-black text-[#48484a] uppercase tracking-widest mt-1">
                  Kilo
                </p>
              </div>
              <div className="bg-[#050505] px-4 py-3 rounded-lg border border-[#1c1c1e] text-center w-24">
                <span className="text-3xl font-black tracking-tighter text-white">
                  182
                </span>
                <p className="text-[9px] font-black text-[#48484a] uppercase tracking-widest mt-1">
                  Cm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111111] p-8 rounded-2xl border border-[#1c1c1e] flex flex-col">
          <div className="flex items-center gap-3 text-[#8e8e93] mb-6">
            <BrainCircuit size={18} />
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Coach Insight
            </h4>
          </div>
          <p className="text-sm italic text-white leading-relaxed flex-1">
            "Your recovery-to-output ratio is peaking. This is the optimal
            window to push for a Personal Best in the Muscle-Up volume today."
          </p>
          <button className="w-full py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all transform active:scale-[0.98]">
            View Strategy
          </button>
        </div>
      </div>

      {/* --- Key Metrics Grid --- */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Weekly Volume"
          value="124.5k"
          unit="kg"
          progress={45}
        />
        <MetricCard label="Neural Load" value="92" unit="%" progress={92} />
        <MetricCard
          label="Sleep Efficiency"
          value="8.2"
          unit="hrs"
          progress={82}
        />
        <MetricCard
          label="Total Sessions"
          value="248"
          unit=""
          subText="+12 this month"
        />
      </div>

      {/* --- Benchmarks and Accolades Grid --- */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-[#111111] p-8 rounded-2xl border border-[#1c1c1e]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black tracking-tight uppercase">
              Active Benchmarks
            </h3>
            <button className="text-[9px] font-bold text-[#48484a] uppercase tracking-widest hover:text-white transition-colors">
              Recalibrate
            </button>
          </div>
          <div className="space-y-6">
            <BenchmarkItem
              category="Strength"
              title="140kg Deadlift (x5 Reps)"
              value="80%"
              progress={80}
            />
            <BenchmarkItem
              category="Skill"
              title="60s Freestanding Handstand"
              value="45%"
              progress={45}
            />
            <BenchmarkItem
              category="Endurance"
              title="5km Sub-20min Run"
              value="92%"
              progress={92}
            />
          </div>
        </div>

        <div className="bg-[#111111] p-8 rounded-2xl border border-[#1c1c1e]">
          <h3 className="text-lg font-black tracking-tight uppercase mb-8">
            Accolades
          </h3>
          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            <AccoladeBadge icon={<Award />} label="Consistency King" active />
            <AccoladeBadge icon={<Zap />} label="Peak Velocity" active />
            <AccoladeBadge
              icon={<InfinityIcon />}
              label="Eternal Athlete"
              active
            />
            <AccoladeBadge icon={<Target />} label="Master Unlock" />
            <AccoladeBadge icon={<Award />} label="Zen Flow" />
          </div>
        </div>
      </div>

      {/* --- Progress Summary Section --- */}
      <div className="bg-[#111111] p-8 rounded-2xl border border-[#1c1c1e]">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-0.5">
            <h3 className="text-lg font-black tracking-tight uppercase">
              Kinetic Progress Summary
            </h3>
            <p className="text-xs text-[#8e8e93] tracking-tight">
              Real-time performance analytics for the last 30 days
            </p>
          </div>
          <div className="flex bg-[#050505] p-1 rounded-lg border border-[#1c1c1e]">
            <button className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#48484a] rounded hover:text-white">
              Weekly
            </button>
            <button className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-black bg-white rounded">
              Monthly
            </button>
          </div>
        </div>

        <div className="flex h-36 gap-2 pt-4 items-end">
          <BarChartItem height="h-20" />
          <BarChartItem height="h-16" />
          <BarChartItem height="h-28" />
          <BarChartItem height="h-10" />
          <BarChartItem height="h-24" />
          <BarChartItem height="h-32" />
          <BarChartItem height="h-36" isActive />
          <BarChartItem height="h-20" />
          <BarChartItem height="h-28" />
          <BarChartItem height="h-24" />
          <BarChartItem height="h-32" />
          <BarChartItem height="h-16" />
          <BarChartItem height="h-12" />
        </div>

        <div className="flex justify-between text-[9px] font-bold text-[#48484a] uppercase tracking-[0.2em] mt-4 tabular-nums">
          <span>Oct 01</span>
          <span>Oct 15</span>
          <span>Oct 30</span>
        </div>
      </div>
    </main>
  );
};

export default Profile;
