import React from "react";
import { format, startOfWeek, addDays } from "date-fns";

interface CalendarProps {
  workouts?: { day_number: number }[]; // highlight workout days
}

const Calendar: React.FC<CalendarProps> = ({ workouts = [] }) => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday start

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-4 flex-1">
      <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
        This Week
      </h4>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = addDays(start, i);
          const isToday = date.toDateString() === today.toDateString();
          const isWorkoutDay = workouts.some((w) => w.day_number === i + 1);

          return (
            <div
              key={i}
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer
                ${isWorkoutDay ? "bg-blue-600 text-white" : "bg-neutral-800 text-slate-400"}
                ${isToday ? "border-2 border-white" : ""}`}
            >
              <span className="text-[10px]">{format(date, "EEE")}</span>
              <span className="text-sm font-bold">{date.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
