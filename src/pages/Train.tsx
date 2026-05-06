import React, { useState, useEffect, useTransition } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import type {
  WorkoutExerciseWithDetails,
  WorkoutWithExercises,
} from "../types/db";
import supabase from "../utils/supabase";
import { useAuthStore } from "../store/authStore";

const Train: React.FC = () => {
  const workout = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingSession, setTransition] = useTransition();

  const [seconds, setSeconds] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [exercise, setExercises] = useState<WorkoutWithExercises>(null);
  const [currentExercise, setExercise] =
    useState<WorkoutExerciseWithDetails>(null);
  const [exerciseIndex, setIndex] = useState(0);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    supabase
      .from("workouts")
      .select("*, workout_exercises(*, exercises(*))")
      .eq("name", workout.tag.replaceAll("-", " "))
      .single()
      .then(({ data, error }) => {
        if (error) return;
        setExercises(data);
        setExercise(data.workout_exercises[0]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isStarted) {
      const timer = setInterval(() => setSeconds((p) => p + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds, isStarted]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startSession = async () => {
    await supabase
      .from("workout_sessions")
      .insert({
        workout_id: exercise.id,
        user_id: user.id,
      })
      .then((_) => setStarted(true));
  };

  const onNextSet = async () => {
    if (currentSet != currentExercise.sets) return setCurrentSet((p) => p + 1);
    setIndex((p) => p + 1);
  };

  useEffect(() => {
    if (loading || exerciseIndex == exercise.workout_exercises.length) return;

    setCurrentSet(0);
    setExercise(exercise.workout_exercises[exerciseIndex]);
  }, [exerciseIndex]);

  const completeSession = () => {
    if (exerciseIndex == exercise.workout_exercises.length) {
      supabase
        .from("workout_sessions")
        .update({
          completed_at: new Date(Date.now()),
          total_duration: seconds,
        })
        .eq("workout_id", exercise.id)
        .then(({ data, error }) => console.log(data, error));

      navigate("/dashboard");
    }
  };

  if (loading) return;

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Session Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
              {exercise.name} Session
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              {exercise.focus}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold font-mono tracking-tighter">
              {formatTime(seconds)}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Time Elapsed
            </p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-10">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-black w-[65%]"
              style={{
                width: `${(exerciseIndex / exercise.workout_exercises.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>
              Exercise {exerciseIndex} of {exercise.workout_exercises.length}
            </span>
            <span>
              {(exerciseIndex / exercise.workout_exercises.length) * 100}%
              Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Exercise Card (Left) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="relative rounded-[32px] overflow-hidden bg-zinc-900 aspect-video group">
              {/* Reference to image_0c32a2.jpg style exercise visuals */}
              <img
                src={currentExercise.exercises.video_url}
                alt="Barbell Back Squat"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8">
                <span className="inline-block bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3 border border-white/10">
                  Current Exercise
                </span>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  {currentExercise.exercises.name}
                </h2>
              </div>
            </div>

            {/* Target Specs */}
            <div className="grid grid-cols-3 bg-neutral-900 border border-neutral-700 rounded-3xl p-8 shadow-sm">
              <SpecItem
                label="Target Reps"
                value={`${currentExercise.reps_min} - ${currentExercise.reps_max}`}
              />
              {/* <SpecItem label="Target Weight" value="185" unit="LBS" /> */}
              {currentExercise.rest_seconds && (
                <SpecItem
                  label="Rest"
                  value={currentExercise.rest_seconds}
                  unit="s"
                />
              )}
              <SpecItem
                label="Set"
                value={`${currentSet}`}
                total={`/ ${currentExercise.sets}`}
              />
            </div>

            {/* Control Buttons */}
            {!isStarted && (
              <button
                disabled={loadingSession}
                onClick={() => setTransition(async () => await startSession())}
                className={`flex items-center justify-center gap-3 text-white py-5 rounded-2xl font-bold hover:bg-neutral-900 transition-all shadow-xl shadow-black/10 w-full ${loadingSession ? "bg-black/50" : "bg-black"}`}
              >
                {loadingSession ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                Start Session
              </button>
            )}
            {isStarted && (
              <button
                onClick={
                  exerciseIndex == exercise.workout_exercises.length
                    ? completeSession
                    : onNextSet
                }
                className="flex items-center justify-center gap-3 bg-black text-white py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 w-full"
              >
                {currentSet != currentExercise.sets && (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {exerciseIndex == exercise.workout_exercises.length
                  ? "Complete Exercise Session"
                  : currentSet == currentExercise.sets
                    ? "Next Exercise"
                    : "Complete Set"}
                {currentSet == currentExercise.sets && (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* AI Insight Card */}
            <div className="bg-neutral-900 border border-neutral-700 text-white rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  AI Coach Insight
                </span>
              </div>
              <p className="text-sm italic leading-relaxed text-slate-300">
                "Your velocity was slightly higher in the last set. Maintain
                this tempo for optimal hypertrophy. Keep your chest up during
                the ascent."
              </p>
            </div>

            {/* Upcoming List */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8">
              <h3 className="text-sm font-bold mb-6">Upcoming</h3>
              {exercise.workout_exercises.map((v, i) => (
                <UpcomingItem
                  key={i}
                  image={v.exercises.video_url}
                  isDone={exerciseIndex > i}
                  active={exerciseIndex == i}
                  title={v.exercises.name}
                  sub={`${v.sets} Sets • ${v.reps_min} Reps`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SpecItem = ({ label, value, unit, total }: any) => (
  <div className="text-center">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
      {label}
    </p>
    <div className="flex items-baseline justify-center gap-1">
      <span className="text-3xl font-bold">{value}</span>
      {unit && <span className="text-xs text-slate-400 font-bold">{unit}</span>}
      {total && (
        <span className="text-lg text-slate-300 font-medium">{total}</span>
      )}
    </div>
  </div>
);

const UpcomingItem = ({ title, sub, active, isDone, image }: any) => (
  <div
    className={`flex items-center gap-4 group cursor-pointer ${active ? "bg-neutral-700" : ""} p-3 rounded-xl`}
  >
    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
      <img src={image} alt={title} className="size-full" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h4
          className={`text-sm font-bold ${isDone ? "text-green-500" : active ? "text-gray-100" : "text-gray-300"}`}
        >
          {title}
        </h4>
        {isDone && <CheckCircle2 className=" text-green-500" size={14} />}
      </div>
      <p className="text-[10px] font-bold text-slate-400 tracking-wide">
        {sub}
      </p>
    </div>
  </div>
);

export default Train;
