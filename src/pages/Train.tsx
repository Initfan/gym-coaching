// @ts-nocheck
import React, { useState } from "react";
import {
  Search,
  Bell,
  Zap,
  BrainCircuit,
  History,
  ChevronRight,
  Utensils,
  Moon,
  Activity,
  TrendingUp,
  Award,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import programs from "../lib/programs.json";
import { useAppStore } from "../store/appStore";

const Train: React.FC = () => {
  const { tag } = useParams();
  const navigate = useNavigate();
  // Ensure we fallback to first program or handle not found
  const program = programs.find((p) => p.tag === tag) || programs[0];

  const [activeTab, setActiveTab] = useState("Workout");
  const {
    nutrition,
    weightLogs,
    startWorkout,
    endWorkout,
    workoutActive,
    activeProgram,
  } = useAppStore();

  const handleStartSession = () => {
    if (workoutActive) {
      endWorkout();
    } else {
      startWorkout(program.title);
    }
  };

  return (
    <main className="flex-1 p-10 overflow-y-auto">
      <header className="flex justify-between items-center mb-10">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-[#8e8e93] hover:text-white transition-colors"
          >
            &larr; Back
          </button>
          <h2 className="text-lg font-black tracking-tight">{tag}</h2>
        </div>
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
                alt="User"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="mb-10 relative h-[420px] rounded-2xl overflow-hidden group">
        <img
          src={program.image}
          alt={program.title}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-12 flex flex-col justify-end">
          <div className="flex gap-2 mb-4">
            <Badge text={`${program.level} Difficulty`} />
            <Badge text={program.duration} />
          </div>
          <h3 className="text-6xl font-black mb-5 tracking-tighter leading-[0.9] max-w-2xl text-white">
            {program.title}
          </h3>
          <p className="max-w-xl text-[#aeaeb2] text-sm leading-relaxed mb-10">
            {program.description}
          </p>
          <button
            onClick={handleStartSession}
            className={`w-fit font-extrabold py-4 px-8 rounded-xl text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
              workoutActive === program.title
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-[#c7c7c8] text-black hover:bg-white"
            }`}
          >
            {workoutActive === program.title ? "End Session" : "Start Session"}
          </button>
        </div>
      </section>

      {/* Tabs */}
      <nav className="flex gap-8 border-b border-[#1a1a1c] mb-8 pb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#8e8e93]">
        {["Workout", "Nutrition", "Recovery", "Milestones"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 transition-colors ${activeTab === tab ? "text-white border-b-2 border-white" : "hover:text-white"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="grid grid-cols-[1fr,minmax(280px,auto)] gap-8">
        {/* Main Content Area */}
        <div className="space-y-8">
          {activeTab === "Workout" && <WorkoutTabContent program={program} />}
          {activeTab === "Nutrition" && <NutritionTabContent />}
          {activeTab === "Recovery" && <RecoveryTabContent />}
          {activeTab === "Milestones" && <MilestonesTabContent />}
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
                current={nutrition.protein}
                total={nutrition.targetProtein}
                progress={Math.min(
                  100,
                  (nutrition.protein / nutrition.targetProtein) * 100,
                )}
              />
              <MacroBar
                label="Carbohydrates"
                current={nutrition.carbs}
                total={nutrition.targetCarbs}
                progress={Math.min(
                  100,
                  (nutrition.carbs / nutrition.targetCarbs) * 100,
                )}
              />
              <MacroBar
                label="Healthy Fats"
                current={nutrition.fats}
                total={nutrition.targetFats}
                progress={Math.min(
                  100,
                  (nutrition.fats / nutrition.targetFats) * 100,
                )}
              />
            </div>
            <div className="flex justify-between items-end bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#aeaeb2] leading-none">
                Est. Daily Calories
              </span>
              <span className="text-3xl font-black tabular-nums text-emerald-400">
                {Math.round(
                  nutrition.protein * 4 +
                    nutrition.carbs * 4 +
                    nutrition.fats * 9,
                )}
                <span className="text-xs font-bold text-[#aeaeb2] ml-1">
                  kcal
                </span>
              </span>
            </div>
          </div>

          <div className="bg-[#111112] border border-white/5 rounded-2xl p-7 flex flex-col items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2] mb-10 w-full text-left">
              Program Details
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
                  strokeDashoffset={339 * (1 - program.progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <span className="text-5xl font-black text-white">
                  {program.progress}%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#aeaeb2]">
                  Completion
                </span>
              </div>
            </div>
            <div className="w-full flex gap-3">
              <MetricSmall label="Level" value={program.level} />
              <MetricSmall label="Duration" value={program.duration} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* --- TAB COMPONENTS --- */

const WorkoutTabContent = ({ program }: { program: any }) => (
  <>
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
          {program.insight ||
            "Based on your CNS recovery metrics and sleep quality, today is optimized for Volume. Focus on tempo and deep mind-muscle connection."}
        </p>
      </div>
    </div>

    {/* Weekly Split */}
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black tracking-tight">Weekly Split</h3>
        <span className="text-[10px] font-bold text-[#48484a] uppercase tracking-widest">
          Week 4
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {program.days?.map((d: any, i: number) => (
          <DayCard
            key={i}
            day={d.day}
            title={d.title}
            isToday={d.isToday}
            isEmpty={d.isEmpty}
          />
        )) || (
          <>
            <DayCard day={1} title="Push & Core" isToday />
            <DayCard day={2} title="Legs (Quad Bias)" />
            <DayCard day={3} title="Active Recovery" />
            <DayCard day={4} title="Pull & Arm" />
            <DayCard day={5} title="" isEmpty />
          </>
        )}
      </div>
    </section>

    {/* Protocol */}
    <section>
      <h3 className="text-[10px] font-black text-[#48484a] uppercase tracking-[0.2em] mb-6">
        Today's Protocol
      </h3>
      <div className="space-y-3">
        {program.exercises?.map((ex: any, i: number) => (
          <ExerciseRow
            key={i}
            image={ex.image}
            name={ex.name}
            target={ex.target}
            sets={ex.sets}
            rpe={ex.rpe}
          />
        )) || (
          <>
            <ExerciseRow
              image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80&auto=format&fit=crop"
              name="Kinetic Barbell Press"
              target="Primary Movers • Tempo 3-1-1"
              sets="4 × 8-10"
              rpe={8.5}
            />
            <ExerciseRow
              image="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&q=80&auto=format&fit=crop"
              name="Explosive Pull Ups"
              target="Lats & Neural Activation"
              sets="3 x AMRAP"
              rpe={9.0}
            />
            <ExerciseRow
              image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&q=80&auto=format&fit=crop"
              name="Seated Low Row"
              target="Mid Back • 2s Squeeze"
              sets="4 × 12"
              rpe={8.0}
            />
          </>
        )}
      </div>
    </section>
  </>
);

const NutritionTabContent = () => (
  <div className="space-y-6">
    <div className="bg-[#111112] border border-[#1a1a1c] p-8 rounded-2xl flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">Program Specific Nutrition</h3>
        <p className="text-sm text-[#8e8e93] max-w-lg">
          Your macro nutrient targets have been automatically adjusted to
          account for the intensity of this module. Focus on rapid carb
          replenishment post-session.
        </p>
      </div>
      <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500">
        <Utensils size={32} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#111112] border border-[#1a1a1c] rounded-xl p-6">
        <h4 className="font-bold mb-4">Hydration Targets</h4>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-white">3.2</span>
          <span className="text-sm font-bold text-white/40">/ 4.0 L</span>
        </div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">
          +Electrolytes specifically during intra-workout
        </p>
      </div>
      <div className="bg-[#111112] border border-[#1a1a1c] rounded-xl p-6">
        <h4 className="font-bold mb-4">Supplement Stack Timing</h4>
        <ul className="text-sm space-y-3 text-[#aeaeb2]">
          <li className="flex justify-between items-center">
            <span className="text-white">Pre-Workout</span>{" "}
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">
              30 mins prior
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-white">Intra-Workout</span>{" "}
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
              During
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-white">Post-Workout</span>{" "}
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              Immediate
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const RecoveryTabContent = () => (
  <div className="space-y-6">
    <div className="bg-[#111112] border border-[#1a1a1c] p-6 rounded-xl flex items-center gap-5">
      <div className="p-3.5 bg-blue-500/10 rounded-full text-blue-500 border border-blue-500/20">
        <Moon size={20} />
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">
          Sleep & CNS Status
        </h4>
        <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
          Your sleep score is currently{" "}
          <span className="font-bold text-white">88%</span>. Your central
          nervous system has largely recovered from yesterday's strain, making
          today suitable for explosive or heavy maximal lifts.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#111112] border border-[#1a1a1c] rounded-xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="text-emerald-500" size={18} />
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8e8e93]">
            HRV (Heart Rate Variability)
          </h4>
        </div>
        <span className="text-5xl font-black text-white">
          64 <span className="text-base text-white/40">ms</span>
        </span>
        <p className="text-[10px] mt-4 text-emerald-400">+12% from baseline</p>
      </div>

      <div className="bg-[#111112] border border-[#1a1a1c] rounded-xl p-6">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#8e8e93] mb-4">
          Recommended Protocol
        </h4>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Contrast
            Water Therapy (15 mins)
          </li>
          <li className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>{" "}
            Breathwork Simulation (10 mins)
          </li>
          <li className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Light
            stretching / Active mobility
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const MilestonesTabContent = () => {
  const { weightLogs } = useAppStore();
  const latestWeight =
    weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : 0;

  return (
    <div className="space-y-6">
      <div className="bg-[#111112] border border-[#1a1a1c] p-6 rounded-xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2] mb-6">
          Current Trends
        </h4>
        <div className="flex gap-12">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[#8e8e93]">
              <TrendingUp size={14} />{" "}
              <span className="text-[10px] uppercase font-bold">
                Body Weight
              </span>
            </div>
            <span className="text-3xl font-black text-white">
              {latestWeight.toFixed(1)}{" "}
              <span className="text-sm font-bold text-white/40">kg</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 text-[#8e8e93]">
              <Award size={14} />{" "}
              <span className="text-[10px] uppercase font-bold">Recent PB</span>
            </div>
            <span className="text-3xl font-black text-white">
              100 <span className="text-sm font-bold text-white/40">kg</span>
            </span>
            <p className="text-[10px] text-emerald-400 mt-1">
              Barbell Press Setup
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#111112] border border-[#1a1a1c] p-6 rounded-xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aeaeb2] mb-6">
          Program Acheivements
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <h5 className="font-bold text-white text-sm">Volume Legend</h5>
              <p className="text-xs text-[#8e8e93] mt-1">
                Complete 10,000kg total volume in one session.
              </p>
            </div>
            <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded">
              Unlocked
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <h5 className="font-bold text-white text-sm opacity-50">
                Consistency King
              </h5>
              <p className="text-xs text-[#8e8e93] mt-1 opacity-50">
                Complete exactly all days in Week 4.
              </p>
            </div>
            <span className="text-[10px] font-black uppercase text-white/20 bg-white/5 px-3 py-1 rounded">
              In Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SHARED COMPONENTS --- */

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
  value: string | number;
  unit?: string;
}) => (
  <div className="flex-1 bg-black/40 p-4 rounded-xl text-center">
    <p className="text-[10px] font-bold text-[#aeaeb2] uppercase tracking-[0.2em] mb-1 leading-relaxed">
      {label}
    </p>
    <p className="text-xl lg:text-2xl font-black tabular-nums text-white leading-none">
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
