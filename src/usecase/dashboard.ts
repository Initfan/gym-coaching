import supabase from "@/utils/supabase";
import { getNutrition, getStat as getStatNut } from "./nutrition";

export const getStat = async (id: string) => {
  const { data: p } = await supabase
    .from("profiles")
    .select("weight,height,age,goal")
    .eq("id", id)
    .single();

  const { data: wo } = await supabase
    .from("programs")
    .select("user_id, workouts(name,day_number,estimated_duration)")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(1);

  const goalNut = await getStatNut(id);
  const nut = await getNutrition(id);

  return {
    ...nut,
    goalNut: goalNut,
    goal: p.goal,
    weight: p.weight,
    duration: wo[0].workouts[0].estimated_duration,
    name: wo[0].workouts[0].name,
    day: wo[0].workouts[0].day_number,
  };
};
