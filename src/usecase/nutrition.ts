import { createPartFromUri, createUserContent } from "@google/genai";
import { analyzeNutritionPrompt, mealPrompt } from "../lib/prompt";
import type { MealType, NutritionType } from "../types/db";
import type { mealPreferenceType, profileSchemaType } from "../types/schema";
import ai from "../utils/gemini";
import supabase from "../utils/supabase";

export const getPreference = async (id: string) => {
  const { data } = await supabase
    .from("meal_preference")
    .select("*")
    .eq("user_id", id)
    .single();

  return {
    data: data as mealPreferenceType,
    id: data.id,
  };
};

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

  // if (data.goal === "strength") {
  tdee = Math.ceil(bmr * 1.55); // Moderate activity
  kcal = Math.ceil(tdee * 1.15); // Bulking +15%

  protein = Math.ceil(2 * Number(data.weight)); // g/kg
  const proteinCalories = Math.ceil(protein * 4);

  fat = Math.ceil(0.25 * kcal); // 25% of total kcal
  const fatCalories = fat; // already in kcal

  const carbCalories = Math.ceil(kcal - proteinCalories - fatCalories);
  carbs = Math.ceil(carbCalories / 4); // grams
  // }

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

export const getNutrition = async (id: string): Promise<NutritionType> => {
  const { data }: { data: unknown } = await supabase
    .from("nutrition")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(1);
  return data[0] as NutritionType;
};

export const generateMeal = async (id: string) => {
  const { data } = await supabase
    .from("meal_preference")
    .select("*")
    .eq("user_id", id)
    .single();

  let meals = [
    {
      id: "a7b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
      user_id: "78b1516d-2772-4818-a244-6d64760ee73b",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      eat_time: "lunch",
      name: "Lemon Herb Grilled Chicken Salad",
      description:
        "A nutrient-dense salad featuring grilled chicken breast, fresh mixed greens, cucumbers, and cherry tomatoes with a zesty lemon vinaigrette. Completely olive and peanut free.",
      tag: "low-carb",
      protein: 38,
      calorie: 350,
      carbs: 24,
      fats: 42,
      created_at: "2026-05-05T13:42:47.483191",
    },
    {
      id: "f1g2h3i4-j5k6-4l7m-8n9o-0p1q2r3s4t5u",
      user_id: "78b1516d-2772-4818-a244-6d64760ee73b",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      eat_time: "breakfast",
      name: "Berry & Chia Greek Yogurt Bowl",
      description:
        "Non-fat Greek yogurt layered with fresh blueberries, raspberries, and chia seeds. High in protein to support weight loss while staying within budget.",
      tag: "high-protein",
      protein: 24,
      calorie: 280,
      carbs: 24,
      fats: 42,
      created_at: "2026-05-05T13:42:47.483191",
    },
  ];

  try {
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${mealPrompt} input: ${JSON.stringify(data)}, create 3 meal`,
    });
    meals = JSON.parse(res.text);
  } catch (error) {}
  return meals;
};

export const getConsumption = async (id: string) => {
  const { data } = await supabase
    .from("meal")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  return data as MealType[];
};

export const analyzeMeal = async (file: File) => {
  if (!file) return;

  try {
    const img = await ai.files.upload({ file });

    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: createUserContent([
        `${analyzeNutritionPrompt}, Analyze meal from the given image`,
        createPartFromUri(img.uri, img.mimeType),
      ]),
    });

    const cleaned = res.text
      .replace(/```(?:json)?/gi, "") // remove ```json or ```JSON
      .trim();

    console.log(cleaned);

    return JSON.parse(cleaned) as MealType;
  } catch (error) {}
};
