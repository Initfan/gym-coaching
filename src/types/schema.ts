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
  created_at: z.string(),
});
