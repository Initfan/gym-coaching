// @ts-nocheck
import {
  Dumbbell,
  BrainCircuit,
  Settings,
  Bell,
  Droplets,
  Pill,
  Clock,
  Sparkles,
  Plus,
  ShieldCheck,
  RefreshCw,
  Dna,
} from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../store/appStore";

const Nutrition = () => {
  const { nutrition, addMacro } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMacro, setNewMacro] = useState({ protein: 0, carbs: 0, fats: 0 });

  const handleAddMacro = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMacro.protein > 0) addMacro("protein", Number(newMacro.protein));
    if (newMacro.carbs > 0) addMacro("carbs", Number(newMacro.carbs));
    if (newMacro.fats > 0) addMacro("fats", Number(newMacro.fats));
    setNewMacro({ protein: 0, carbs: 0, fats: 0 });
    setShowAddForm(false);
  };

  return (
    <main className="flex-1 p-10 overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex gap-8 items-center">
          <span className="text-sm font-bold tracking-tight">
            KINETIC ATELIER
          </span>
          <nav className="flex gap-6 text-sm text-white/40 font-medium">
            <a href="#" className="hover:text-white">
              Performance
            </a>
            <a href="#" className="text-white border-b border-white pb-1">
              Nutrition
            </a>
            <a href="#" className="hover:text-white">
              Recovery
            </a>
            <a href="#" className="hover:text-white">
              Protocols
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Bell size={18} className="text-white/40 cursor-pointer" />
          <Settings size={18} className="text-white/40 cursor-pointer" />
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
              alt="Avatar"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
            Nutrition
            <br />
            <span className="text-white/20">Engineering</span>
          </h2>
          <p className="max-w-sm text-white/40 text-sm leading-relaxed uppercase tracking-wider font-medium">
            Precision fueling calibrated for metabolic efficiency and peak
            cognitive performance.
          </p>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                AI Coherence
              </p>
              <p className="text-[11px] font-bold">
                Calibrated for{" "}
                <span className="text-emerald-400">Hypertrophy phase</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-500 rounded text-xs font-bold uppercase hover:bg-emerald-500 hover:text-white transition-colors"
          >
            + Log Custom Food
          </button>
        </div>
      </section>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddMacro}
            className="bg-[#1a1a1a] p-8 rounded-xl w-96 border border-white/10"
          >
            <h3 className="text-xl font-bold mb-4">Log Macros</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={newMacro.protein}
                  onChange={(e) =>
                    setNewMacro({
                      ...newMacro,
                      protein: Number(e.target.value),
                    })
                  }
                  className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={newMacro.carbs}
                  onChange={(e) =>
                    setNewMacro({ ...newMacro, carbs: Number(e.target.value) })
                  }
                  className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">
                  Fats (g)
                </label>
                <input
                  type="number"
                  value={newMacro.fats}
                  onChange={(e) =>
                    setNewMacro({ ...newMacro, fats: Number(e.target.value) })
                  }
                  className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded text-sm text-white/40 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded text-sm font-bold"
                >
                  Save Log
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Top Grid: Macros, Hydration, Supplements */}

      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-8">
            Daily Macro Overview
          </h3>
          <div className="flex justify-between items-center px-2">
            <RadialProgress
              value={Math.min(
                100,
                Math.floor((nutrition.protein / nutrition.targetProtein) * 100),
              )}
              label="PROTEIN"
              sub={`${nutrition.protein}g / ${nutrition.targetProtein}g`}
            />
            <RadialProgress
              value={Math.min(
                100,
                Math.floor((nutrition.carbs / nutrition.targetCarbs) * 100),
              )}
              label="CARBS"
              sub={`${nutrition.carbs}g / ${nutrition.targetCarbs}g`}
            />
            <RadialProgress
              value={Math.min(
                100,
                Math.floor((nutrition.fats / nutrition.targetFats) * 100),
              )}
              label="FATS"
              sub={`${nutrition.fats}g / ${nutrition.targetFats}g`}
            />
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">
              Hydration
            </h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">2.4</span>
              <span className="text-sm font-bold text-white/40">/ 3.5 L</span>
            </div>
            <div className="flex gap-1.5 h-8 mb-6">
              {[1, 1, 1, 1, 0.4, 0, 0, 0].map((fill, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/5 rounded-sm overflow-hidden relative"
                >
                  <div
                    className="absolute bottom-0 w-full bg-white/40 transition-all duration-1000"
                    style={{ height: `${fill * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
            <Plus size={14} /> Add 500ml
          </button>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">
            Daily Stack
          </h3>
          <div className="space-y-4">
            <SupplementRow
              icon={<Dumbbell size={12} />}
              name="Creatine Monohydrate"
              dose="5G • STRENGTH"
              completed
            />
            <SupplementRow
              icon={<Droplets size={12} />}
              name="Omega-3 Fish Oil"
              dose="2G • HEART"
              completed
            />
            <SupplementRow
              icon={<Pill size={12} />}
              name="Vitamin D3 + K2"
              dose="5000 IU • BONE"
              completed={false}
            />
          </div>
        </div>
      </div>

      {/* Today's Fuel Timeline */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight">Today's Fuel</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <Clock size={14} /> AI Optimized Schedule
          </div>
        </div>

        <div className="space-y-4">
          <MealCard
            time="07:30 AM"
            type="BREAKFAST"
            title="Avocado & Egg Sourdough"
            calories="540"
            macros={{ p: 28, c: 42, f: 18 }}
            img="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=200"
            note="High-fat start for cognitive clarity."
          />
          <MealCard
            time="12:30 PM"
            type="LUNCH"
            title="Sashimi Power Bowl"
            calories="680"
            macros={{ p: 52, c: 65, f: 12 }}
            img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200"
            note="Omega-3 rich for neuro-protection."
          />
        </div>
      </section>

      {/* Protocols Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight">Protocols</h3>
          <button className="text-[10px] font-bold text-white/30 uppercase tracking-widest hover:text-white transition-colors">
            Explore Laboratory
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <ProtocolCard
            icon={<Dna size={20} />}
            tag="ADVANCED"
            title="Ketogenic Hybrid"
            desc="Targeted fat adaptation with tactical carb loading for explosive outputs during anaerobic sessions."
          />
          <ProtocolCard
            icon={<RefreshCw size={20} />}
            tag="OPTIMAL"
            title="Carb Cycling"
            desc="Oscillating glycogen availability to maintain insulin sensitivity while maximizing training volume."
          />
          <ProtocolCard
            icon={<ShieldCheck size={20} />}
            tag="HEALTH"
            title="Anti-Inflammatory"
            desc="Polyphenol-focused methodology designed to reduce systemic inflammation and oxidative stress."
          />
        </div>
      </section>
    </main>
  );
};

// --- Subcomponents ---

const RadialProgress = ({ value, label, sub }: any) => (
  <div className="text-center">
    <div className="relative w-24 h-24 mb-4 mx-auto">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-white/5"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-white/80"
          strokeDasharray={251.2}
          strokeDashoffset={251.2 - (value / 100) * 251.2}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-black tabular-nums">{value}%</span>
      </div>
    </div>
    <p className="text-[9px] font-black tracking-[0.2em] text-white/30 mb-1 uppercase">
      {label}
    </p>
    <p className="text-[10px] font-bold uppercase">{sub}</p>
  </div>
);

const SupplementRow = ({ icon, name, dose, completed }: any) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-[11px] font-bold">{name}</h4>
        <p className="text-[9px] text-white/30 uppercase tracking-widest">
          {dose}
        </p>
      </div>
    </div>
    <div
      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${completed ? "bg-white/10 border-white/20" : "border-white/10"}`}
    >
      {completed && <CheckCircle2 className="text-white/80" size={12} />}
    </div>
  </div>
);

const MealCard = ({
  time,
  type,
  title,
  calories,
  macros,
  img,
  note,
  athlete = false,
}: any) => (
  <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden flex h-44 group cursor-pointer hover:border-white/20 transition-all">
    <div className="w-44 shrink-0 relative overflow-hidden bg-black/40">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
      />
      {athlete && (
        <div className="absolute inset-0 flex items-end justify-center p-4">
          <div className="text-[6px] font-black uppercase tracking-[0.4em] text-white/20">
            Kinetic Optimized
          </div>
        </div>
      )}
    </div>
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">
            {time} • {type}
          </p>
          <h4 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">
            {title}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xl font-black">{calories}</span>
          <span className="text-[10px] font-bold text-white/20 ml-1">KCAL</span>
        </div>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex gap-4">
          <MacroBadge label="PROTEIN" val={macros.p} />
          <MacroBadge label="CARBS" val={macros.c} />
          <MacroBadge label="FATS" val={macros.f} />
        </div>
        <div className="flex-1 py-1.5 px-4 bg-white/2 border border-white/5 rounded-lg flex items-center gap-2 italic text-white/40 text-[10px]">
          <Sparkles size={12} className="text-emerald-500/50" />
          {note}
        </div>
      </div>
    </div>
  </div>
);

const MacroBadge = ({ label, val }: any) => (
  <div>
    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-0.5">
      {label}
    </p>
    <p className="text-xs font-bold">
      {val}
      <span className="text-[8px] ml-0.5 opacity-40">g</span>
    </p>
  </div>
);

const ProtocolCard = ({ icon, tag, title, desc }: any) => (
  <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl group hover:border-white/20 transition-all">
    <div className="flex justify-between items-start mb-8">
      <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[8px] font-black tracking-[0.2em] text-white/20 border border-white/10 px-2 py-0.5 rounded uppercase">
        {tag}
      </span>
    </div>
    <h4 className="text-xl font-bold mb-3 tracking-tight">{title}</h4>
    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
  </div>
);

const CheckCircle2 = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default Nutrition;
