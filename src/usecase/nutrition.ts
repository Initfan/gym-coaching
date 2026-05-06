import type { MealType, NutritionType } from "../types/db";
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
    fats: Math.ceil(fat / 9),
    carbs,
  };
};

export const consumeMeal = async (id: string, meal: MealType) => {
  const { data } = await supabase
    .from("meal")
    .insert({ ...meal, id: undefined, user_id: id })
    .select("*")
    .single();

  const { data: nut, success } = await supabase
    .from("nutrition")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  console.log(nut);

  if (success)
    await supabase.from("nutrition").upsert({
      id: nut.length > 0 ? nut[0].id : undefined,
      user_id: id,
      kcal: nut.length > 0 ? nut[0].kcal + meal.calorie : meal.calorie,
      fats: nut.length > 0 ? nut[0].fats + meal.fats : meal.fats,
      protein: nut.length > 0 ? nut[0].protein + meal.protein : meal.protein,
      carbs: nut.length > 0 ? nut[0].carbs + meal.carbs : meal.carbs,
    });

  return data;
};

export const getNutrition = async (): Promise<NutritionType> => {
  const { data }: { data: unknown } = await supabase
    .from("nutrition")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  return data[0] as NutritionType;
};
