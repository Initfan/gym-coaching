import { BrainCircuit } from "lucide-react";

const Insight = () => {
  return (
    <div className="bg-neutral-900 text-white border border-neutral-700 rounded-[24px] p-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-sm">Coach AI Insight</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-8">
          Based on your last leg day, your power output dropped in the final
          set. I've increased your rest time by 30 seconds for the compound
          lifts to ensure full ATP recovery.
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <span>Predicted Intensity</span>
            <span>88%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[88%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
