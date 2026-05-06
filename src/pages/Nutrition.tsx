import React, { useEffect, useState, useTransition } from "react";
import Preference from "../components/nutrition/Preference";
import { useAuthStore } from "../store/authStore";
import Meals from "../components/nutrition/Meals";
import type { MealType } from "../types/db";
import Stat from "../components/nutrition/Stat";
import { generateMeal } from "../usecase/nutrition";
import { MealSkeleton } from "../components/nutrition/Meal";
import Vision from "../components/nutrition/Vision";

const Nutrition: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const [meals, setMeals] = useState<MealType[]>([]);
  const [pending, transition] = useTransition();
  const [consumedMeal, setConsumed] = useState([]);

  useEffect(() => {
    transition(async () => {
      const meals = await generateMeal(user.id);
      setMeals(meals);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-1 font-sans ">
      {open && <Preference onClose={() => setOpen(false)} />}

      <main className="p-5 md:p-10 flex-1">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
            Nutrition
            <br />
            <span className="text-white/20">Optimization</span>
          </h2>
          <Vision />
        </header>

        <Stat consumedMeal={consumedMeal} />

        {pending ? (
          <MealSkeleton />
        ) : (
          <Meals
            meals={meals}
            onClose={() => setOpen(true)}
            userId={user.id}
            consumedMeal={(id) => setConsumed((p) => [...p, id])}
          />
        )}
      </main>
    </div>
  );
};

export default Nutrition;
