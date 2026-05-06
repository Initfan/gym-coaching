export type Profile = {
  id: string;
  username: string | null;
  experience_level: string | null;
  created_at: string | null;
};

export type Program = {
  id: string;
  user_id: string | null;
  name: string;
  phase: string | null;
  duration_weeks: number | null;
  created_at: string | null;
};

export type Workout = {
  id: string;
  program_id: string | null;
  name: string | null;
  day_number: number | null;
  focus: string | null;
  estimated_duration: number | null;
  created_at: string | null;
};

export type Exercise = {
  id: string;
  name: string;
  category: string | null;
  muscle_group: string | null;
  description: string | null;
  video_url: string | null;
  created_at: string | null;
};

export type WorkoutExercise = {
  id: string;
  workout_id: string | null;
  exercise_id: string | null;
  order_index: number | null;
  sets: number | null;
  reps_min: number | null;
  reps_max: number | null;
  rest_seconds: number | null;
};

export type WorkoutSession = {
  id: string;
  user_id: string | null;
  workout_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  total_duration: number | null;
};

export type ExerciseSet = {
  id: string;
  session_id: string | null;
  exercise_id: string | null;
  set_number: number | null;
  reps: number | null;
  weight: number | null;
  rest_seconds: number | null;
  completed: boolean | null;
};

export type AIInsight = {
  id: string;
  user_id: string | null;
  workout_id: string | null;
  message: string | null;
  predicted_intensity: number | null;
  created_at: string | null;
};

export type MealType = {
  id: string;
  user_id: string | null;
  image: string | null;
  eat_time: string | null;
  name: string | null;
  description: string | null;
  tag: string | null;
  protein: number | null;
  fats: number | null;
  carbs: number | null;
  calorie: number | null;
  created_at: string | null;
};

export type NutritionType = {
  id?: string;
  user_id?: string | null;
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  sufficient?: boolean | null;
  created_at?: string | null;
};

export type ProgramWithWorkout = Program & {
  workouts: WorkoutWithExercises[] | null;
};

export type WorkoutExerciseWithDetails = WorkoutExercise & {
  exercises: Exercise | null;
};

export type WorkoutWithExercises = Workout & {
  workout_exercises: WorkoutExerciseWithDetails[];
};

export type SessionWithSets = WorkoutSession & {
  exercise_sets: ExerciseSet[];
};

export type AIInsightDisplay = {
  message: string;
  predicted_intensity: number;
};
