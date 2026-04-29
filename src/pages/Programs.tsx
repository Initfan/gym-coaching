// @ts-nocheck
import {
  Zap,
  Bell,
  Clock,
  BarChart,
  Plus,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Search,
} from "lucide-react";
import { useAppStore } from "../store/appStore";
import { Link } from "react-router";
import programs from "../lib/programs.json";

const Programs = () => {
  const { activeProgram, setActiveProgram } = useAppStore();
  return (
    <main className="flex-1 p-10 overflow-y-auto">
      {/* Top Navigation */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex gap-8 items-center">
          <span className="text-sm font-bold tracking-tight">
            KINETIC ATELIER
          </span>
          <nav className="flex gap-6 text-sm text-white/40 font-medium">
            <a href="#" className="text-white">
              Programs
            </a>
            <a
              href="/dashboard/community"
              className="hover:text-white transition-colors"
            >
              Community
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              size={14}
            />
            <input
              type="text"
              placeholder="Search training..."
              className="bg-[#141414] border border-white/5 rounded-md py-1.5 pl-9 pr-4 text-xs w-64 focus:outline-none focus:border-white/20"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
          Training Modules
        </span>
        <h2 className="text-6xl font-black mt-2 mb-4 tracking-tighter leading-none">
          CURATED PROGRAMS
        </h2>
        <p className="max-w-xl text-white/50 text-sm leading-relaxed">
          Precision-engineered curricula designed for metabolic adaptation,
          neurological performance, and systemic resilience.
        </p>
      </section>

      {/* Featured Program */}
      <div className="relative h-[320px] rounded-2xl overflow-hidden group mb-16">
        <img
          src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200"
          alt="Running"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
          <button
            onClick={() => setActiveProgram("Metabolic Conditioning 2.0")}
            className={`absolute top-10 right-10 px-4 py-2 font-bold text-xs uppercase rounded transition-colors ${
              activeProgram === "Metabolic Conditioning 2.0"
                ? "bg-rose-500 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {activeProgram === "Metabolic Conditioning 2.0"
              ? "Active Program"
              : "Set Active"}
          </button>
          <div className="flex gap-2 mb-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
              Elite Tier
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
              New Release
            </span>
          </div>
          <h3 className="text-4xl font-bold mb-3 tracking-tight">
            Metabolic Conditioning 2.0
          </h3>
          <p className="text-white/60 text-sm max-w-sm mb-6">
            The flagship engine optimization program for advanced endurance and
            fat oxidation.
          </p>
          <div className="flex gap-6 text-[10px] font-bold tracking-widest text-white/40">
            <span className="flex items-center gap-2">
              <Clock size={12} /> 12 WEEKS
            </span>
            <span className="flex items-center gap-2">
              <BarChart size={12} /> ADVANCED
            </span>
          </div>
        </div>
      </div>

      {/* Explore Categories */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight">
            Explore Categories
          </h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded border border-white/5 text-white/60">
              <SlidersHorizontal size={16} />
            </button>
            <button className="p-2 bg-white/5 rounded border border-white/5 text-white/60">
              <BarChart size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {programs.map((prog, index) => (
            <ProgramCard
              key={index}
              onClick={() => setActiveProgram(prog.title)}
              isActive={activeProgram === prog.title}
              image={prog.image}
              tag={prog.tag}
              title={prog.title}
              desc={prog.description}
              level={prog.level}
              duration={prog.duration}
              progress={prog.progress}
            />
          ))}

          {/* Custom Protocol Card */}
          {/* <div className="bg-[#141414] border border-white/5 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-white/40">
              <Plus size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2">Custom Protocol</h4>
            <p className="text-xs text-white/40 max-w-[180px] mb-8 leading-relaxed">
              Design your own training pathway or import a blueprint.
            </p>
            <button className="bg-white/5 border border-white/10 px-6 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Create Now
            </button>
          </div> */}
        </div>
      </section>
    </main>
  );
};

const ProgramCard = ({
  image,
  tag,
  title,
  desc,
  level,
  duration,
  progress,
  isActive,
  onClick,
}: any) => (
  <Link
    to={`/dashboard/programs/train/${tag}`}
    onClick={(e) => {
      // Allow navigation but also trigger active if we want, or just let users click into it.
      // E.g. we might want to have a set active button entirely separate. But let's trigger it.
      onClick?.(e);
    }}
    className={`bg-[#141414] border rounded-2xl overflow-hidden group cursor-pointer transition-all ${
      isActive
        ? "border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
        : "border-white/5 hover:border-white/20"
    }`}
  >
    <div className="h-48 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-black text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase border border-white/10">
          {tag}
        </span>
        {isActive && (
          <span className="bg-rose-500 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase border border-rose-400">
            Active
          </span>
        )}
      </div>
    </div>
    <div className="p-6">
      <h4 className="text-xl font-bold mb-2 tracking-tight">{title}</h4>
      <p className="text-xs text-white/40 mb-6 leading-relaxed line-clamp-2">
        {desc}
      </p>

      <div className="flex justify-between text-[9px] font-black tracking-[0.15em] text-white/40 uppercase mb-4">
        <span className="flex items-center gap-1.5">
          <Zap size={10} /> {level}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={10} /> {duration}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[8px] font-black tracking-widest uppercase text-white/20">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 relative">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </Link>
);

export default Programs;
