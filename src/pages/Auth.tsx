import { useState, useTransition } from "react";
import supabase from "../utils/supabase";
import type { Provider } from "@supabase/auth-js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { Dumbbell, Loader2, Lock, Mail } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [pending, transition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { initializeAccount } = useAuthStore();

  const googleSignin = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
    });
  };

  const { register, handleSubmit } = useForm<Inputs>();

  function onSubmit(data: Inputs) {
    transition(async () => {
      setErrorMsg("");
      try {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          });
          if (error) throw error;
          await initializeAccount();
          const goalDefined = localStorage.getItem("goal");
          navigate(goalDefined ? "/dashboard/" : "/pricing");
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });
          if (error) throw error;
          await initializeAccount();
          const goalDefined = localStorage.getItem("goal");
          navigate(goalDefined ? "/dashboard/" : "/pricing");
        }
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    });
  }

  return (
    <div className="min-h-screen flex bg-black/95 text-white items-center justify-center font-sans p-5">
      <div className="max-w-5xl w-full flex flex-col md:flex-row min-h-screen py-4">
        {/* Left Section: Branding & Social Proof */}
        <div className="md:w-1/2 hidden md:flex bg-black border border-neutral-800 p-12 flex-col justify-between relative rounded-l-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white mb-16">
              <div className="bg-white p-1.5 rounded-lg">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                AIFit Coach
              </span>
            </div>

            <h1 className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Elite Performance <br />
              through AI <br />
              Wisdom
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Join the community of elite performers using artificial
              intelligence to optimize every aspect of their fitness journey.
            </p>
          </div>

          {/* Social Proof Card */}
          <div className="hidden relative z-10 bg-zinc-800/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-zinc-600"
                  />
                ))}
              </div>
              <span className="text-zinc-300 text-sm font-medium">
                Joined by 10k+ athletes
              </span>
            </div>
            <p className="text-zinc-400 text-sm italic leading-relaxed">
              "This AI coach transformed my routine in weeks. The precision is
              unmatched."
            </p>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-100 mb-2">
                {isSignUp ? "Sign Up" : "Welcome back"}
              </h2>
              <p className="text-slate-300 text-sm">
                Please enter your credentials to access your dashboard.
              </p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className="w-full border border-neutral-700 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-100 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full  border border-neutral-700 rounded-xl py-3.5 pl-11 pr-4 text-smoutline-none transition-all outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                disabled={pending}
                type="submit"
                className=" w-full bg-neutral-900 text-white flex items-center gap-3 justify-center py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
                style={{ opacity: pending && "50%" }}
              >
                {isSignUp ? "Submit" : "Login"}
                {pending && <Loader2 className="animate-spin" size={16} />}
              </button>
              <SocialButton
                icon="/google.svg"
                label="Google"
                onClick={() => googleSignin("google")}
              />
              <p className="text-sm">
                {isSignUp ? "Already have account? " : "Doesn't have account? "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsSignUp((p) => !p)}
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) => (
  <button
    className="flex items-center justify-center gap-2 p-3 w-full border bg-slate-200 border-slate-300 rounded-xl hover:bg-slate-100 transition-all group"
    onClick={onClick}
  >
    <div className="w-6 h-6 ">
      <img src={icon} alt="icon" />
    </div>
    <span className="text-xs font-bold text-slate-700">{label}</span>
  </button>
);

export default Auth;
