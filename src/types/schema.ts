import z from "zod";

export const meal_preference = z.object({
  alergies: z.string(),
  budget: z.string(),
  disliked_food: z.string().min(1),
  goal: z.string().min(1),
});

export const mealSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  image: z.string(),
  eat_time: z.string(),
  name: z.string(),
  description: z.string(),
  tag: z.string(),
  protein: z.number(),
  calorie: z.number(),
  fats: z.number(),
  carbs: z.number(),
  created_at: z.string(),
});

export type mealSchemaType = z.infer<typeof mealSchema>;

export const profileSchema = z.object({
  age: z.string(),
  height: z.string(),
  weight: z.string(),
  bmi: z.string(),
  gender: z.string().min(1, "Select the gender"),
  goal: z.enum(["bulking", "cutting", "maintenance", "contest"]),
});

export type profileSchemaType = z.infer<typeof profileSchema>;

export const nutritionSchema = z.object({
  user_id: z.string(),
  kcal: z.string(),
  protein: z.string(),
  carbs: z.string(),
  fats: z.string(),
  sufficient: z.boolean().nullable(),
});

export type nutritionSchemaType = z.infer<typeof nutritionSchema>;
