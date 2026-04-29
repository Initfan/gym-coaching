import React from "react";
import {
  Search,
  Bell,
  Zap,
  BrainCircuit,
  History,
  ChevronRight,
} from "lucide-react";

const Train: React.FC = () => {
  return (
    <main className="flex-1 p-10 overflow-y-auto">
      <header className="flex justify-between items-center mb-10">
        <h2 className="text-lg font-black tracking-tight">Hypertrophy V4</h2>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#48484a] group-focus-within:text-white"
              size={16}
            />
            <input
              type="text"
              placeholder="Search exercises..."
              className="bg-[#111112] border border-[#1a1a1c] rounded-full py-2 pl-10 pr-4 text-xs w-72 focus:outline-none focus:border-[#2c2c2e] transition-all"
            />
          </div>
          <div className="flex items-center gap-6 text-[#8e8e93]">
            <Bell size={18} className="cursor-pointer hover:text-white" />
            <Zap size={18} className="cursor-pointer hover:text-white" />
            <div className="w-8 h-8 rounded-full bg-slate-600 border border-[#2c2c2e] overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?&w=64&q=80&auto=format&fit=crop"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="mb-10 relative h-[420px] rounded-2xl overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1600"
          alt="Running"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-12 flex flex-col justify-end">
          <div className="flex gap-2 mb-4">
            <Badge text="Elite Difficulty" />
            <Badge text="12 Weeks" />
          </div>
          <h3 className="text-6xl font-black mb-5 tracking-tighter leading-[0.9] max-w-2xl">
            Hypertrophy V4:
            <br /> The Core Series
          </h3>
          <p className="max-w-xl text-[#aeaeb2] text-sm leading-relaxed mb-10">
            Advanced physiological programming targeting myofibrillar growth
            through calculated mechanical tension and metabolic stress
            protocols.
          </p>
          <button className="w-fit bg-[#c7c7c8] text-black font-extrabold py-4 px-8 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform active:scale-95">
            Start Session
          </button>
        </div>
      </section>

      {/* Tabs */}
      <nav className="flex gap-8 border-b border-[#1a1a1c] mb-8 pb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#8e8e93]">
        {["Workout", "Nutrition", "Recovery", "Milestones"].map((tab, i) => (
          <button
            key={tab}
            className={`pb-4 ${i === 0 ? "text-white border-b-2 border-white" : "hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Workout Grid */}
      <div className="grid grid-cols-[1fr,minmax(280px,auto)] gap-8">
        <div className="space-y-8">
          {/* AI Insight */}
          <div className="bg-[#111112] border border-[#1a1a1c] p-6 rounded-xl flex items-center gap-5">
            <div className="p-3.5 bg-white/5 rounded-full text-[#8e8e93] border border-[#1a1a1c]">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2] mb-1">
                AI Coach Insight
              </h4>
              <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
                Based on your{" "}
                <span className="font-bold">CNS recovery metrics</span> and
                sleep quality of 88%, today is optimized for{" "}
                <span className="font-bold text-white">High Volume</span>. Focus
                on tempo (3-1-1) and deep mind-muscle connection during the
                eccentric phases.
              </p>
            </div>
          </div>

          {/* Weekly Split */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">
                Weekly Split
              </h3>
              <span className="text-[10px] font-bold text-[#48484a] uppercase tracking-widest">
                Week 4 of 12
              </span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <DayCard day={1} title="Chest & Back" isToday />
              <DayCard day={2} title="Legs (Quad Bias)" />
              <DayCard day={3} title="Active Recovery" />
              <DayCard day={4} title="Shoulders & Arms" />
              <DayCard day={5} title="" isEmpty />
            </div>
          </section>

          {/* Protocol */}
          <section>
            <h3 className="text-[10px] font-black text-[#48484a] uppercase tracking-[0.2em] mb-6">
              Today's Protocol: Hypertrophy Phase II
            </h3>
            <div className="space-y-3">
              <ExerciseRow
                image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80&auto=format&fit=crop"
                name="Incline Barbell Bench Press"
                target="Upper Pectorals • Tempo 3-1-1"
                sets="4 × 8-10"
                rpe={8.5}
              />
              <ExerciseRow
                image="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&q=80&auto=format&fit=crop"
                name="Weighted Wide-Grip Pull Ups"
                target="Lats & Teres Major • Dead Stop"
                sets="3 x AMRAP"
                rpe={9.0}
              />
              <ExerciseRow
                image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&q=80&auto=format&fit=crop"
                name="Seated Low Row (Neutral Grip)"
                target="Mid Back & Rhomboids • 2s Squeeze"
                sets="4 × 12"
                rpe={8.0}
              />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#111112] border border-[#1a1a1c] p-7 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2]">
                Anabolic Targets
              </h3>
              <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-500 animate-pulse"></div>
            </div>
            <div className="space-y-6 mb-8">
              <MacroBar
                label="Protein"
                current={185}
                total={220}
                progress={84}
              />
              <MacroBar
                label="Carbohydrates"
                current={310}
                total={450}
                progress={68}
              />
              <MacroBar
                label="Healthy Fats"
                current={62}
                total={85}
                progress={73}
              />
            </div>
            <div className="flex justify-between items-end bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#aeaeb2] leading-none">
                Daily Caloric
                <br />
                Surplus
              </span>
              <span className="text-3xl font-black tabular-nums text-emerald-400">
                +350{" "}
                <span className="text-xs font-bold text-[#aeaeb2]">kcal</span>
              </span>
            </div>
          </div>

          <div className="bg-[#111112] border border-white/5 rounded-2xl p-7 flex flex-col items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2] mb-10 w-full text-left">
              Program Intensity
            </h3>
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-white/5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="text-white"
                  strokeDasharray={339}
                  strokeDashoffset={339 * (1 - 0.72)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-5xl font-black text-white">72%</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#aeaeb2]">
                  Load Volume
                </span>
              </div>
            </div>
            <div className="w-full flex gap-3">
              <MetricSmall label="Tons Moved" value="14.2k" />
              <MetricSmall label="Total Time" value="2.4m" unit="m" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="text-[9px] font-black text-white/80 uppercase tracking-widest bg-black/50 backdrop-blur-sm px-2 py-1 border border-white/10 rounded">
    {text}
  </span>
);

const DayCard = ({
  day,
  title,
  isEmpty = false,
  isToday = false,
}: {
  day: number;
  title: string;
  isEmpty?: boolean;
  isToday?: boolean;
}) => (
  <div
    className={`aspect-video rounded-xl p-4 flex flex-col justify-between transition-all ${isEmpty ? "bg-white/5 opacity-50" : isToday ? "border-2 border-white bg-white/5" : "bg-[#111112] border border-[#1a1a1c] hover:border-white/20"}`}
  >
    <div className="flex justify-between items-center text-[#48484a] text-[10px] font-bold uppercase tracking-widest mb-1.5">
      <span>Day {day}</span>
      {!isEmpty && !isToday && (
        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
      )}
    </div>
    {!isEmpty ? (
      <div>
        <p className="text-sm font-black text-white mb-3 tracking-tight leading-tight line-clamp-2">
          {title}
        </p>
        {isToday && (
          <span className="text-[9px] font-bold text-black uppercase tracking-widest bg-white px-2 py-0.5 rounded">
            Today
          </span>
        )}
      </div>
    ) : (
      <div className="w-10 h-10 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10">
        . . .
      </div>
    )}
  </div>
);

const ExerciseRow = ({
  image,
  name,
  target,
  sets,
  rpe,
}: {
  image: string;
  name: string;
  target: string;
  sets: string;
  rpe: number;
}) => (
  <div className="bg-[#111112] border border-[#1a1a1c] rounded-xl p-4 flex items-center gap-6 cursor-pointer hover:border-white/20 transition-all group">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-lg object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
    />
    <div className="flex-1">
      <p className="text-base font-black text-white tracking-tight mb-0.5">
        {name}
      </p>
      <p className="text-xs text-[#8e8e93] leading-relaxed line-clamp-1">
        {target}
      </p>
    </div>
    <div className="flex items-center gap-12 text-center shrink-0">
      <ExerciseStat label="Sets x Reps" value={sets} />
      <ExerciseStat label="Target RPE" value={rpe.toFixed(1)} />
      <div className="text-[#8e8e93] hover:text-white p-1 cursor-pointer transition-colors">
        <History size={18} />
      </div>
    </div>
  </div>
);

const ExerciseStat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] font-bold text-[#8e8e93] uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-lg font-black text-white tracking-tighter tabular-nums leading-none">
      {value}
    </p>
  </div>
);

const MacroBar = ({
  label,
  current,
  total,
  progress,
}: {
  label: string;
  current: number;
  total: number;
  progress: number;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-baseline">
      <span className="text-xs font-bold text-white tracking-tight">
        {label}
      </span>
      <span className="text-[10px] font-bold tabular-nums text-[#aeaeb2] tracking-wider">
        {current}g / {total}g
      </span>
    </div>
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-white rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const MetricSmall = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="flex-1 bg-black/40 p-4 rounded-xl text-center">
    <p className="text-[10px] font-bold text-[#aeaeb2] uppercase tracking-[0.2em] mb-1">
      {label}
    </p>
    <p className="text-2xl font-black tabular-nums text-white leading-none">
      {value}{" "}
      {unit && (
        <span className="text-xs font-bold text-[#aeaeb2] uppercase ml-0.5">
          {unit}
        </span>
      )}
    </p>
  </div>
);

export default Train;
