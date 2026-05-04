import React, { useEffect, useState, type ReactNode } from "react";
import {
  Droplets,
  ArrowRight,
  ArrowLeft,
  Target,
  RefreshCw,
  SlidersHorizontal,
  BarChart3,
  Repeat,
  Dumbbell,
  TrendingUp,
  Brain,
  Moon,
  ActivityIcon,
  Clock,
  Beef,
  Calendar,
  Flame,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

type Tips = {
  step: number;
  title: string;
  subtitle: string;
  items: {
    title: string;
    description: string;
    icon: ReactNode;
  }[];
};

const BoardingContent: Tips[] = [
  {
    step: 1,
    title: "Goal Alignment",
    subtitle: "Define a clear direction for your physique transformation.",
    items: [
      {
        title: "Primary Objective",
        description:
          "Identify your core goal—muscle gain, fat loss, or recomposition—to guide all decisions.",
        icon: <Target className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Calorie Targeting",
        description:
          "Establish a daily calorie range aligned with your goal (surplus for growth, deficit for fat loss).",
        icon: <Flame className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Timeline Planning",
        description:
          "Set realistic milestones to track progress and maintain motivation over time.",
        icon: <Calendar className="w-5 h-5 text-zinc-900" />,
      },
    ],
  },
  {
    step: 2,
    title: "Nutrition Mastery",
    subtitle: "Fuel your body with precision based on your goal.",
    items: [
      {
        title: "Protein Optimization",
        description:
          "Prioritize adequate protein intake to support lean muscle growth and recovery.",
        icon: <Beef className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Anabolic Window",
        description:
          "Consume protein and carbs post-workout to enhance recovery and muscle synthesis.",
        icon: <Clock className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Hydration Cycle",
        description:
          "Maintain proper hydration levels to optimize performance and recovery.",
        icon: <Droplets className="w-5 h-5 text-zinc-900" />,
      },
    ],
  },
  {
    step: 3,
    title: "Recovery Optimization",
    subtitle: "Fuel your progress with smarter rest and regeneration.",
    items: [
      {
        title: "Sleep Quality Focus",
        description:
          "Aim for 7–9 hours of deep sleep to support muscle repair and performance.",
        icon: <Moon className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Active Recovery",
        description:
          "Use low-intensity movement like walking or stretching to reduce soreness.",
        icon: <ActivityIcon className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Stress Regulation",
        description:
          "Manage stress to prevent it from negatively impacting recovery.",
        icon: <Brain className="w-5 h-5 text-zinc-900" />,
      },
    ],
  },
  {
    step: 4,
    title: "Training Efficiency",
    subtitle: "Maximize results with intelligent workout strategies.",
    items: [
      {
        title: "Progressive Overload",
        description:
          "Gradually increase training intensity to drive muscle adaptation.",
        icon: <TrendingUp className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Compound Prioritization",
        description:
          "Focus on multi-joint exercises for maximum efficiency and gains.",
        icon: <Dumbbell className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Workout Consistency",
        description: "Stick to a structured plan to ensure steady progress.",
        icon: <Repeat className="w-5 h-5 text-zinc-900" />,
      },
    ],
  },
  {
    step: 5,
    title: "Performance Tracking",
    subtitle: "Use data to refine and accelerate your results.",
    items: [
      {
        title: "Metric Monitoring",
        description: "Track weight, strength, and measurements consistently.",
        icon: <BarChart3 className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Adaptive Adjustments",
        description: "Adjust your plan based on real progress and feedback.",
        icon: <SlidersHorizontal className="w-5 h-5 text-zinc-900" />,
      },
      {
        title: "Goal Alignment",
        description: "Continuously refine your goals as your body evolves.",
        icon: <RefreshCw className="w-5 h-5 text-zinc-900" />,
      },
    ],
  },
];

const Boarding: React.FC = () => {
  const [currentStep, setStep] = useState(1);
  const [content, setContent] = useState<Tips>(BoardingContent[0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep == 5) {
      localStorage.setItem("boarding", "true");
      navigate("/auth");
    } else setContent(BoardingContent[currentStep - 1]);
  }, [currentStep]);

  useEffect(() => {
    const boarding = localStorage.getItem("boarding");
    if (boarding) navigate("/auth");
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[600px] border border-zinc-200">
        {/* Left Side: Hero Image Section */}
        <div className="md:w-[42%] relative bg-zinc-300">
          {/* Reference to the gym background aesthetic in image_0bd51f.jpg */}
          <div className="absolute inset-0 grayscale opacity-60">
            <img
              src={`/images/boarding/${content.step}.png`}
              alt="Gym Background"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900/40 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10 z-10 text-white">
            <span className="inline-block bg-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Elite Performance
            </span>
            <h1 className="text-4xl font-bold leading-tight mb-4 tracking-tight">
              Step {content.step}: {content.title}
            </h1>
            <p className="text-zinc-100 text-sm leading-relaxed opacity-90 max-w-[280px]">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Content & Tips */}
        <div className="md:w-[58%] p-10 md:p-14 flex flex-col justify-between relative">
          {/* Top Navigation / Progress */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    step == currentStep ? "w-8 bg-black" : "w-8 bg-zinc-200"
                  }`}
                />
              ))}
            </div>
            <Link
              to={"/auth"}
              className="text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-colors"
            >
              Skip
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
              Smart Fueling Tips
            </h2>
            <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
              Your AI Coach has identified three key adjustments for your
              current physique goals.
            </p>

            <div className="space-y-4">
              {content.items.map((tip, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 p-5 bg-zinc-50/50 rounded-2xl border border-transparent hover:border-zinc-200 hover:bg-white transition-all duration-200"
                >
                  <div className="mt-1 w-10 h-10 shrink-0 bg-white border border-zinc-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setStep((p) => p - 1)}
              className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => setStep((p) => p + 1)}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/5"
            >
              {currentStep == 5 ? "Login" : "Next Step"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boarding;
