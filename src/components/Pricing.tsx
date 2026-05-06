import { Check, Circle } from "lucide-react";
import { Link } from "react-router";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black/90 font-sans text-white flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            Invest in Your Performance
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
            Choose the plan that fits your elite training goals. From AI-driven
            nutrition to real-time biofeedback, unlock your full potential.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Free Trial Card */}
          <div className="border border-gray-300  rounded-2xl p-8 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4 bg-neutral-800 w-fit px-3 py-1 rounded-full">
              Limited Access
            </span>
            <h2 className="text-2xl font-bold mb-2">Free Trial (7 days)</h2>
            <div className="mb-8">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-slate-300 text-sm ml-1">/ 7 days</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              <FeatureItem text="Basic AI Workout Generation" active />
              <FeatureItem text="Weekly Progress Summary" active />
              <FeatureItem text="Standard Nutrition Database" active />
              <FeatureItem
                text="Real-time Performance Analytics"
                active={false}
              />
              <FeatureItem text="Personalized Biofeedback" active={false} />
            </ul>

            <Link
              to={"/goal"}
              className="w-full text-center py-3 rounded-xl hover:bg-neutral-800/80 bg-neutral-800 font-bold hover:bg-gray-10 transition-colors"
            >
              Continue Free Trial
            </Link>
          </div>

          {/* Pro Plan Card */}
          <div className="relative border-2 border-black rounded-2xl p-8 flex flex-col shadow-2xl shadow-black/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Recommended
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4 bg-neutral-800 w-fit px-3 py-1 rounded-full">
              Unlimited Access
            </span>
            <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
            <div className="mb-8">
              <span className="text-3xl font-bold">$29.99</span>
              <span className="text-gray-400 text-sm ml-1">/ month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              <FeatureItem
                text="Adaptive AI Engine"
                subtext="Real-time adjustments during sets"
                active
              />
              <FeatureItem text="Advanced Biofeedback Monitoring" active />
              <FeatureItem text="Precision Nutrition System" active />
              <FeatureItem text="Elite Community Access" active />
              <FeatureItem text="Direct Messaging with Pro Coaches" active />
            </ul>

            <Link
              to={"/goal"}
              className="w-full py-4 text-center rounded-xl bg-black text-white font-bold hover:bg-black/80 transition-colors"
            >
              Choose Plan
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureItem = ({
  text,
  subtext,
  active,
}: {
  text: string;
  subtext?: string;
  active: boolean;
}) => (
  <li className="flex items-start gap-3">
    {active ? (
      <Check className="w-5 h-5 text-white shrink-0" />
    ) : (
      <Circle className="w-5 h-5 text-gray-300 shrink-0" />
    )}
    <div>
      <p
        className={`text-sm font-medium ${active ? "text-white" : "text-gray-300"}`}
      >
        {text}
      </p>
      {subtext && <p className="text-[10px] text-gray-400 mt-0.5">{subtext}</p>}
    </div>
  </li>
);

export default Pricing;
