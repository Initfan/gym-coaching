import type { profileSchemaType } from "../types/schema";
import supabase from "../utils/supabase";

export const getStat = async (id: string) => {
  const { data }: { data: profileSchemaType } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  // Calculate BMR
  let bmr: number;
  if (data.gender === "male") {
    bmr =
      10 * Number(data.weight) +
      6.25 * Number(data.height) -
      5 * Number(data.age) +
      5;
  } else {
    bmr =
      10 * Number(data.weight) +
      6.25 * Number(data.height) -
      5 * Number(data.age) -
      161;
  }

  let tdee: number;
  let kcal: number;
  let protein: number;
  let fat: number;
  let carbs: number;

  if (data.goal === "bulking") {
    tdee = Math.ceil(bmr * 1.55); // Moderate activity
    kcal = Math.ceil(tdee * 1.15); // Bulking +15%

    protein = Math.ceil(2 * Number(data.weight)); // g/kg
    const proteinCalories = Math.ceil(protein * 4);

    fat = Math.ceil(0.25 * kcal); // 25% of total kcal
    const fatCalories = fat; // already in kcal

    const carbCalories = Math.ceil(kcal - proteinCalories - fatCalories);
    carbs = Math.ceil(carbCalories / 4); // grams
  }

  return {
    goal: data.goal,
    kcal,
    protein,
    fat: Math.ceil(fat / 9),
    carbs,
  };
};
