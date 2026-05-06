import { useState } from "react";

type Range = "7D" | "30D" | "ALL";

const dataMap: Record<Range, number[]> = {
  "7D": [60, 65, 70, 75, 80, 85, 90],
  "30D": [40, 45, 42, 48, 55, 75, 85, 70, 90, 100],
  ALL: [20, 30, 40, 35, 50, 60, 70, 80, 90, 100],
};

export default function Chart() {
  const [range, setRange] = useState<Range>("30D");

  const data = dataMap[range];
  const max = Math.max(...data);

  return (
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold">Strength Progress</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
            Main Lift: Deadlift (1RM Est.)
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-black p-1 rounded-md">
          {(["7D", "30D", "ALL"] as Range[]).map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`px-3 py-1 text-[10px] font-bold rounded transition ${
                t === range
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 flex items-end gap-2 px-2">
        {data.map((value, i) => {
          const height = (value / max) * 100;

          return (
            <div
              key={i}
              style={{ height: `${height}%` }}
              className={`flex-1 rounded-t-sm transition-all duration-500 relative group ${
                i >= data.length - 3 ? "bg-white" : "bg-white/20"
              }`}
            >
              <span className="text-xs hidden group-hover:block absolute translate-x-1/3 inset-x-0 -top-5">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
        <span>Start</span>
        <span>Mid</span>
        <span>End</span>
      </div>
    </div>
  );
}
