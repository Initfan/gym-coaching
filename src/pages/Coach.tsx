import {
  Search,
  Zap,
  Bell,
  ExternalLink,
  Activity,
  Moon,
  PlayCircle,
} from "lucide-react";
import ChatBot from "../components/ChatBot";

const Coach = () => {
  return (
    <>
      {/* --- Main Chat Interface --- */}
      <main className="flex-1 flex flex-col relative border-r border-white/5 border-2 max-h-screen">
        <header className="p-6 flex justify-between items-center border-b border-white/5">
          <h2 className="font-black tracking-tighter text-lg uppercase">
            Kinetic Atelier
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                size={14}
              />
              <input
                type="text"
                placeholder="Search insights..."
                className="bg-[#141414] border border-white/5 rounded-md py-1.5 pl-9 pr-4 text-xs w-64 focus:outline-none"
              />
            </div>
            <Zap size={18} className="text-white/40" />
            <Bell size={18} className="text-white/40" />
            <div className="w-7 h-7 rounded-full bg-slate-400 border border-white/20 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        <ChatBot />
      </main>

      {/* --- Right Sidebar: Insights --- */}
      <aside className="w-80 p-8 space-y-10 h-screen overflow-y-scroll">
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">
            Contextual Recommendations
          </h3>
          <div className="space-y-4">
            <RecommendationCard
              label="New Routine"
              title="Hypertrophy Plateau Breaker"
              desc="Based on your chest progress stall, we recommend a 3-week undulating periodization block."
            />
            <RecommendationCard
              label="Nutrition"
              title="Evening Recovery Meal"
              desc="High magnesium intake needed today. Suggested: Salmon with roasted pumpkin and pumpkin seeds."
            />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">
            Biometric Feed
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <BiometricCard
              icon={<Activity size={14} />}
              label="HRV"
              value="64"
              unit="ms"
            />
            <BiometricCard
              icon={<Moon size={14} />}
              label="SLEEP"
              value="88"
              unit="%"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">
            Knowledge Atelier
          </h3>
          <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=400"
              alt="Video"
              className="w-full h-40 object-cover opacity-40 group-hover:scale-105 transition-all"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-blue-400 mb-1">
                <PlayCircle size={12} /> VIDEO GUIDE • 4 MIN
              </div>
              <h4 className="text-xs font-black uppercase tracking-tighter">
                Mastering the Arch
              </h4>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const RecommendationCard = ({ label, title, desc }: any) => (
  <div className="bg-[#141414] border border-white/5 p-4 rounded-xl group cursor-pointer hover:border-white/20 transition-all">
    <div className="flex justify-between items-start mb-3">
      <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase text-white/60">
        {label}
      </span>
      <ExternalLink
        size={12}
        className="text-white/20 group-hover:text-white"
      />
    </div>
    <h4 className="text-xs font-bold mb-2 tracking-tight">{title}</h4>
    <p className="text-[10px] text-white/40 leading-relaxed">{desc}</p>
  </div>
);

const BiometricCard = ({ icon, label, value, unit }: any) => (
  <div className="bg-[#141414] border border-white/5 p-4 rounded-xl">
    <div className="flex items-center gap-2 mb-3 text-white/20">
      {icon}
      <span className="text-[9px] font-bold tracking-widest uppercase">
        {label}
      </span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">
        {unit}
      </span>
    </div>
  </div>
);

export default Coach;
