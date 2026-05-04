import React, { useEffect, useState } from "react";
import { BrainCircuit, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import supabase from "../utils/supabase";
import { useAuthStore } from "../store/authStore";
import type { ProgramWithWorkout } from "../types/db";

const Programs: React.FC = () => {
  const { user } = useAuthStore();
  const [programs, setPrograms] = useState<ProgramWithWorkout>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("programs")
      .select("*, workouts(*, workout_exercises(*))")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setPrograms(data);
        setLoading(false);
      });
  }, []);

  if (loading) return;

  return (
    <div className="min-h-screen flex-1 p-10 flex font-sans">
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Phase {programs.duration_weeks}: {programs.phase}
            </span>
            <h2 className="text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
              Daily
              <br />
              <span className="text-white/20">Performance</span>
            </h2>
            {/* <h2 className="text-4xl font-bold mt-1 tracking-tight text-white">
              Daily Performance Plan
            </h2> */}
            <p className="max-w-sm text-white/40 text-sm leading-relaxed uppercase tracking-wider font-medium">
              Focus on controlled eccentric movements today.
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex p-1 rounded-xl w-fit mb-8 bg-[#222222]">
          <button className="px-8 py-2 bg-[#1a1a1a] rounded-lg text-xs font-bold shadow-sm">
            Workout
          </button>
          <button className="px-8 py-2 text-xs font-bold text-slate-200">
            Nutrition
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Workout List */}
          <div className="col-span-8 space-y-4">
            {programs.workouts.map((ex, i) => (
              <Link
                to={`/dashboard/programs/train/${ex.name.replaceAll(" ", "-")}`}
                key={i}
                className="bg-[#141414] border border-neutral-700 hover:bg-neutral-900 rounded-[24px] p-6 flex gap-6 group transition-all"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                  <img
                    src={"/images/boarding/1.png"}
                    alt={ex.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{ex.name}</h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {ex.focus}
                      </p>
                    </div>
                    <MoreHorizontal className="text-slate-300 w-5 h-5 cursor-pointer" />
                  </div>
                  <div className="flex gap-4">
                    <StatItem label="Day" value={ex.day_number.toString()} />
                    <StatItem
                      label="Exercises"
                      value={ex.workout_exercises.length.toString()}
                    />
                    <StatItem
                      label="Est Duration"
                      value={`${ex.estimated_duration.toString()}m`}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar Insights */}
          <div className="col-span-4 space-y-6">
            {/* AI Insight Card */}
            <div className="bg-neutral-900 text-white border border-neutral-700 rounded-[24px] p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <BrainCircuit className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-sm">Coach AI Insight</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-8">
                  Based on your last leg day, your power output dropped in the
                  final set. I've increased your rest time by 30 seconds for the
                  compound lifts to ensure full ATP recovery.
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Duration
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">65</span>
                  <span className="text-xs text-slate-400 font-medium">
                    min
                  </span>
                </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Est. Burn
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">420</span>
                  <span className="text-xs text-slate-400 font-medium">
                    kcal
                  </span>
                </div>
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest  mb-8">
                Today's Schedule
              </h3>
              <div className="space-y-10 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100" />
                <TimelineItem
                  title="Warm Up"
                  desc="Dynamic stretching & Mobility"
                  active
                />
                <TimelineItem
                  title="Compound Phase"
                  desc="High intensity CNS focus"
                />
                <TimelineItem
                  title="Recovery & Fuel"
                  desc="Post-workout nutrition"
                  last
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className=" bg-neutral-800 px-6 py-3 rounded-xl min-w-[100px]">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
      {label}
    </p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const TimelineItem = ({
  title,
  desc,
  active = false,
  // last = false,
}: {
  title: string;
  desc: string;
  active?: boolean;
  last?: boolean;
}) => (
  <div className="flex gap-6 relative z-10">
    <div
      className={`w-4 h-4 rounded-full mt-1 border-2 bg-white ${active ? "border-neutral-700" : "border-slate-200"}`}
    >
      {active && (
        <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full m-auto mt-[3px]" />
      )}
    </div>
    <div>
      <h4 className={`text-sm font-bold ${active ? "text-neutral-400" : ""}`}>
        {title}
      </h4>
      <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
    </div>
  </div>
);

export default Programs;
