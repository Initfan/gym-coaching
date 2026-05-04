import { Plus } from "lucide-react";
import { useState } from "react";

const Hydration = () => {
  const [currentLiter, setCurrentLiter] = useState(0);
  const [liter] = useState(3.5);

  return (
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
      <div>
        <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">
          Hydration
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold">{currentLiter}</span>
          <span className="text-sm font-bold text-white/40">/ {liter} L</span>
        </div>
        <div className="flex gap-1.5 h-8 mb-6">
          {Array.from({ length: liter / 0.5 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-white/5 rounded-sm overflow-hidden relative"
            >
              <div
                className="absolute bottom-0 w-full bg-white/40 transition-all duration-1000"
                style={{ height: `${(currentLiter / 0.5 > i ? 1 : 0) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => currentLiter != liter && setCurrentLiter((p) => p + 0.5)}
        className="w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
      >
        <Plus size={14} /> Add 500ml
      </button>
    </div>
  );
};

export default Hydration;
