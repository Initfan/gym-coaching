import type { ProgramWithWorkout } from "@/types/db";
import type { profileSchemaType } from "@/types/schema";
import supabase from "@/utils/supabase";

export const getPrograms = async (id: string): Promise<ProgramWithWorkout> => {
  const { data } = await supabase
    .from("programs")
    .select("*, workouts(*, workout_exercises(*))")
    .eq("user_id", id)
    .single();

  return data;
};

export const generateProgram = async (id: string, data: profileSchemaType) => {
  await supabase.from("profiles").upsert({ ...data, id: id });

  const { data: pg } = await supabase
    .from("programs")
    .insert({
      user_id: id,
      name: `${data.goal} programs`,
      phase:
        data.experience == "beginner"
          ? "adaptation"
          : data.experience == "intermediate"
            ? "hypertrophy"
            : "strength",
      duration_weeks:
        data.experience == "beginner"
          ? 4
          : data.experience == "intermediate"
            ? 6
            : 5,
    })
    .select("id")
    .single();

  const { data: wo } = await supabase
    .from("workouts")
    .insert({
      program_id: pg.id,
      name: `Day ${data.goal}`,
      day_number: 1,
      focus: data.goal,
      estimated_duration: 1,
    })
    .select("id")
    .single();

  const { data: ex } = await supabase.rpc("get_random_exercises_filtered", {
    exp: data.experience,
    cat: data.goal,
    limit_count: 5,
  });

  const random = (mult: number) => Math.ceil(Math.random() * mult);

  const wo_ex = ex.map((e, i) => ({
    workout_id: wo.id,
    exercise_id: e.id,
    order_index: i + 1,
    sets: random(2) + 2,
    reps_min: random(4) + 4,
    reps_max: random(4) + 8,
    rest_seconds: random(60) + 60,
  }));

  await supabase.from("workout_exercises").insert(wo_ex).select("*");
};
