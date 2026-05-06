import type { WorkoutWithExercises } from "@/types/db";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

const Workout = ({ ex }: { ex: WorkoutWithExercises }) => {
  return (
    <Link
      to={`/dashboard/programs/train/${ex.name.replaceAll(" ", "-")}`}
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
            <p className="text-xs text-slate-400 font-medium">{ex.focus}</p>
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

export const WorkoutSkeleton = () => {
  return (
    <div className="bg-[#141414] border border-neutral-700 rounded-[24px] p-6 flex gap-6 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-32 h-32 rounded-2xl bg-neutral-800 shrink-0" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-40 bg-neutral-700 rounded" />
            <div className="h-4 w-24 bg-neutral-700 rounded" />
          </div>
          <div className="w-5 h-5 bg-neutral-700 rounded-full" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex gap-4 mt-4">
          <SkeletonStatItem />
          <SkeletonStatItem />
          <SkeletonStatItem />
        </div>
      </div>
    </div>
  );
};

const SkeletonStatItem = () => (
  <div className="bg-neutral-800 px-6 py-3 rounded-xl min-w-[100px]">
    <div className="h-3 w-12 bg-neutral-700 rounded mb-1" />
    <div className="h-5 w-8 bg-neutral-700 rounded" />
  </div>
);

export default Workout;
