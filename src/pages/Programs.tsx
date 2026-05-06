import React, { useEffect, useState, useTransition } from "react";
import { useAuthStore } from "@/store/authStore";
import type { ProgramWithWorkout, WorkoutWithExercises } from "@/types/db";
import { getPrograms } from "@/usecase/program";
import Workout, { WorkoutSkeleton } from "@/components/program/Workout";
import Calendar from "@/components/program/Calendar";
import Insight from "@/components/program/Insight";
import { useNavigate } from "react-router";

const Programs: React.FC = () => {
  const { user } = useAuthStore();
  const nav = useNavigate();
  const [pending, transition] = useTransition();
  const [programs, setPrograms] = useState<ProgramWithWorkout>();
  const [workouts, setWorkouts] = useState<WorkoutWithExercises[]>([]);

  useEffect(() => {
    transition(
      async () =>
        await getPrograms(user.id).then((res) =>
          res ? (setPrograms(res), setWorkouts(res.workouts)) : nav("/goal"),
        ),
    );
  }, []);

  return (
    <div className="min-h-screen flex-1 p-10 flex font-sans">
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Phase {programs?.duration_weeks}: {programs?.phase}
            </span>
            <h2 className="text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
              Daily
              <br />
              <span className="text-white/20">Performance</span>
            </h2>
            <p className="max-w-sm text-white/40 text-sm leading-relaxed uppercase tracking-wider font-medium">
              Focus on controlled eccentric movements today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-4">
            <Calendar />
            {pending && <WorkoutSkeleton />}
            {workouts.map((ex, i) => (
              <Workout key={i} ex={ex} />
            ))}
          </div>

          {/* Sidebar Insights */}
          <div className="col-span-4 space-y-6">
            <Insight />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Programs;
