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

const Programs = () => {
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
            <a href="#" className="hover:text-white transition-colors">
              Community
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Insights
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
          <Zap size={18} className="text-white/40 cursor-pointer" />
          <Bell size={18} className="text-white/40 cursor-pointer" />
          <div className="w-7 h-7 rounded-full bg-linear-to-tr from-orange-500 to-rose-500 border border-white/20" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
          Training Modules
        </span>
        <h2 className="text-6xl font-black mt-2 mb-4 tracking-tighter leading-none">
          CURATED
          <br />
          PROGRAMS
        </h2>
        <p className="max-w-xl text-white/50 text-sm leading-relaxed">
          Precision-engineered curricula designed for metabolic adaptation,
          neurological performance, and systemic resilience.
        </p>
      </section>

      {/* Featured Program */}
      <div className="grid grid-cols-4 gap-6 mb-16">
        <div className="col-span-3 relative h-[320px] rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200"
            alt="Running"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
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
              The flagship engine optimization program for advanced endurance
              and fat oxidation.
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

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex flex-col">
          <div className="p-2 bg-white/5 rounded-lg w-fit mb-6">
            <Sparkles size={18} className="text-white/60" />
          </div>
          <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">
            AI Adaptive Path
          </h4>
          <p className="text-xs text-white/40 leading-relaxed mb-8">
            Based on your recent 5K run metrics, we recommend prioritizing the{" "}
            <span className="text-white">Aerobic Threshold</span> series this
            week.
          </p>
          <button className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            View Analysis <ArrowRight size={14} />
          </button>
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
          <ProgramCard
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500"
            tag="HYPERTROPHY"
            title="Mechanical Tension"
            desc="High-volume resistance training focused on structural muscle..."
            level="INTERMEDIATE"
            duration="8-12 WKS"
            progress={65}
          />
          <ProgramCard
            image="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=500"
            tag="MOBILITY"
            title="Neuromuscular Flow"
            desc="Enhance joint integrity and movement economy through deep..."
            level="BEGINNER"
            duration="4 WKS"
            progress={100}
          />
          <ProgramCard
            image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=500"
            tag="STRENGTH"
            title="Absolute Power"
            desc="Peak force production and CNS conditioning utilizing compound..."
            level="ADVANCED"
            duration="16 WKS"
            progress={12}
          />
          <ProgramCard
            image="https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=500"
            tag="CALISTHENICS"
            title="Relative Strength"
            desc="Master your bodyweight with progression-based training for..."
            level="INTERMEDIATE"
            duration="10 WKS"
            progress={0}
          />
          <ProgramCard
            image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500"
            tag="RECOVERY"
            title="Restoration Protocol"
            desc="Optimize systemic recovery with parasympathetic-focused sessions..."
            level="ADAPTIVE"
            duration="ONGOING"
            progress={40}
          />

          {/* Custom Protocol Card */}
          <div className="bg-[#141414] border border-white/5 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
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
          </div>
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
}: any) => (
  <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
    <div className="h-48 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-black text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase border border-white/10">
          {tag}
        </span>
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
  </div>
);

export default Programs;
