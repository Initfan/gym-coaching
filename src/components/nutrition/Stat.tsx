const Stat = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mb-10">
      <div className="col-span-4 bg-neutral-900 border border-neutral-700 rounded-[24px] p-8 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          Daily Goal
        </p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold tracking-tighter">2,450</span>
          <span className="text-xs text-slate-400 font-medium tracking-tight">
            kcal remaining
          </span>
        </div>
        <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="absolute h-full bg-black w-[65%]" />
        </div>
        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>1,592 kcal consumed</span>
          <span>858 left</span>
        </div>
      </div>

      <div className="col-span-8 bg-neutral-900 border border-neutral-700 rounded-[24px] p-8 shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-sm font-bold tracking-tight">Macronutrients</h3>
            <p className="text-[11px] text-slate-400">
              Optimized for lean muscle growth
            </p>
          </div>
          <span className="bg-neutral-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-gray-300">
            Phase 1: Hypertrophy
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <MacroStat label="PROTEIN" val={0} goal={10} />
          <MacroStat label="CARBS" val={0} goal={10} />
          <MacroStat label="FATS" val={0} goal={10} />
        </div>
      </div>
    </div>
  );
};

const MacroStat = ({
  label,
  val,
  goal,
}: {
  label: string;
  val: number;
  goal: number;
}) => (
  <div>
    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
      <span>{label}</span>
      <span className="text-slate-300">Goal: {goal}g</span>
    </div>
    <div className="flex items-baseline gap-1 mb-3">
      <span className="text-xl font-bold">{val}</span>
      <span className="text-[10px] font-medium text-slate-300 tracking-tight uppercase">
        g
      </span>
    </div>
    <div className="h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-black rounded-full"
        style={{ width: `${(val / goal) * 100}%` }}
      />
    </div>
  </div>
);

export default Stat;
