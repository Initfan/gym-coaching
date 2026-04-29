// @ts-nocheck
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
        </header>

        <ChatBot />
      </main>
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
