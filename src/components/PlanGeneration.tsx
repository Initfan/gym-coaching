import { BrainCircuit, Loader2 } from "lucide-react";

const PlanGeneration: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 flex flex-col items-center justify-center">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-black/5 rounded-full animate-ping scale-150 opacity-20" />
          <div className="relative w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-xl">
            <BrainCircuit className="w-10 h-10 text-black animate-pulse" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Creating your personalized plan...
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
            Our AI is analyzing your biometric data, fitness history, and
            nutritional goals to construct an elite-level performance protocol.
          </p>
        </div>

        <Loader2 className="animate-spin" />
      </main>
    </div>
  );
};

export default PlanGeneration;
