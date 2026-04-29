import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BrainCircuit,
  LineChart,
  Users,
  User,
  Settings,
  Zap,
  Bell,
  Flame,
  Calendar,
  MoreHorizontal,
  Brain,
  ArrowDownRight,
  ZapIcon,
  FileText,
  Archive,
} from "lucide-react";

const Progress = () => {
  return (
    <main className="flex-1 p-10 overflow-y-auto">
      {/* Header Navigation */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex gap-8 items-center">
          <span className="text-sm font-bold tracking-tight">
            KINETIC ATELIER
          </span>
          <nav className="flex gap-6 text-sm text-white/40 font-medium">
            <a href="#" className="hover:text-white">
              Explore
            </a>
            <a href="#" className="text-white border-b border-white pb-1">
              Progress
            </a>
            <a href="#" className="hover:text-white">
              Insights
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Zap size={18} className="text-white/40 cursor-pointer" />
          <Bell size={18} className="text-white/40 cursor-pointer" />
          <div className="w-7 h-7 rounded-full bg-slate-400 border border-white/20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
              alt="Avatar"
            />
          </div>
        </div>
      </header>

      {/* Title & AI Insight Bar */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
            Performance Analytics
          </span>
          <h2 className="text-4xl font-bold mt-1 tracking-tight">
            Optimization Progress
          </h2>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-xl p-4 flex items-center gap-4 max-w-sm">
          <div className="bg-white/5 p-2 rounded-lg">
            <Brain size={18} className="text-white/70" />
          </div>
          <div>
            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
              AI Insight
            </p>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Your consistency is up 12%. Suggested caloric floor: 2,450 kcal.
            </p>
          </div>
        </div>
      </div>

      {/* Top Grid: Weight Trajectory & Key Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-[#141414] border border-white/5 rounded-2xl p-8 relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold">Body Weight Trajectory</h3>
              <p className="text-xs text-white/40">
                Last 90 days visualization
              </p>
            </div>
            <div className="flex gap-2 bg-black/40 p-1 rounded-lg">
              {["3M", "6M", "1Y"].map((t) => (
                <button
                  key={t}
                  className={`px-3 py-1 text-[9px] font-bold rounded ${t === "3M" ? "bg-white/10 text-white" : "text-white/20"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-3 h-48 mb-4">
            {[80, 75, 78, 82, 70, 65, 60, 55, 58, 50, 48, 45, 65, 68, 62].map(
              (h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-sm ${i === 12 ? "bg-white" : "bg-white/10"}`}
                />
              ),
            )}
          </div>

          <div className="absolute top-24 right-12 text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-5xl font-black tracking-tighter">78.4</span>
              <span className="text-sm font-bold text-white/40">kg</span>
            </div>
            <p className="text-[10px] font-bold text-rose-500 mt-1 flex items-center justify-end gap-1 uppercase tracking-widest">
              <ArrowDownRight size={12} /> -2.1 kg (LTM)
            </p>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-8 text-white/40">
            <LineChart size={16} />
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Key Metrics
            </h3>
          </div>
          <div className="space-y-8 flex-1">
            <MetricRow
              label="Waist Circumference"
              value="31.5 in"
              change="-0.4 this month"
              negative
            />
            <MetricRow
              label="Bicep (Flexed)"
              value="16.2 in"
              change="+0.2 this month"
            />
            <MetricRow
              label="Body Fat % (Est)"
              value="14.2%"
              change="-0.8% peak"
              negative
            />
          </div>
          <button className="w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all mt-4">
            Update Measurements
          </button>
        </div>
      </div>

      {/* Middle Grid: Energy Intake & Heatmap */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-white/5 rounded-lg text-white/60">
                <Flame size={18} />
              </div>
              <div>
                <h3 className="font-bold">Energy Intake</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  Daily average: 2,640 kcal
                </p>
              </div>
            </div>
            <MoreHorizontal size={18} className="text-white/20" />
          </div>
          <div className="flex items-end justify-between h-32 px-4 mb-6">
            {[40, 55, 48, 70, 50, 60, 65, 90].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-8 rounded-sm ${i === 7 ? "bg-white" : "bg-white/20"}`}
              />
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">18,480</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Weekly Total
            </span>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
          <div className="flex gap-4 items-center mb-10">
            <div className="p-2 bg-white/5 rounded-lg text-white/60">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="font-bold">Protocol Consistency</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                92% adhesion last 30 days
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-8">
            {Array.from({ length: 28 }).map((_, i) => {
              const levels = [
                "bg-white/10",
                "bg-white/30",
                "bg-white/60",
                "bg-white/90",
              ];
              const level = [
                0, 0, 1, 2, 1, 3, 2, 1, 0, 1, 3, 2, 1, 3, 1, 1, 2, 3, 2, 1, 3,
                1, 2, 1, 2, 3, 1, 2,
              ][i];
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${levels[level]}`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <span>Less Active</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/10 rounded-sm" />
              <div className="w-2 h-2 bg-white/30 rounded-sm" />
              <div className="w-2 h-2 bg-white/60 rounded-sm" />
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span>Protocol Perfect</span>
          </div>
        </div>
      </div>

      {/* Executive Summary Footer */}
      <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 flex items-center gap-10">
        <div className="w-24 h-24 bg-black rounded-xl border border-white/5 flex items-center justify-center p-4">
          <div className="text-[10px] font-black tracking-tighter leading-none text-center">
            KINETIC
            <br />
            <span className="text-[6px] text-white/40 tracking-widest">
              ATELIER
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">
            Executive Summary: Phase 2 Complete
          </h3>
          <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
            Your metabolic efficiency has increased by 4.2% since the start of
            the optimization protocol. Muscle density markers in the thoracic
            region show significant improvement. Recommend shifting focus to VO2
            Max stabilization for the upcoming quarter.
          </p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
            <FileText size={14} /> Generate Report
          </button>
          <button className="flex items-center gap-2 text-white/40 hover:text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all">
            <Archive size={14} /> Archive Data
          </button>
        </div>
      </div>
    </main>
  );
};

// --- Subcomponents ---

const NavItem = ({ icon, label, active = false }: any) => (
  <div
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${active ? "bg-white/5 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const MetricRow = ({ label, value, change, negative = false }: any) => (
  <div className="flex justify-between items-center group">
    <div>
      <p className="text-xs text-white/40 font-medium mb-1 group-hover:text-white/60 transition-colors">
        {label}
      </p>
      <p className="text-xl font-bold tracking-tight">{value}</p>
    </div>
    <div className="text-right">
      <p
        className={`text-[9px] font-bold uppercase tracking-widest ${negative ? "text-emerald-500" : "text-white/40"}`}
      >
        {change}
      </p>
    </div>
  </div>
);

export default Progress;
