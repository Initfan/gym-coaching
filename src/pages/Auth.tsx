import supabase from "../utils/supabase";
import type { Provider } from "@supabase/auth-js";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Auth = () => {
  const googleSignin = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
    });
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();

  async function signUpNewUser(data: Inputs) {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-neutral-500/30">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 md:p-14 shadow-2xl">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-sm text-white/40 tracking-tight">
              Enter your credentials to access the Atelier
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit(signUpNewUser)}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@atelier.com"
                className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/10 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Password
                </label>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/10 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d1d1d1] text-black font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-full border-t border-white/5"></div>
              <span className="absolute bg-[#0f0f0f] px-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              // onClick={() => googleSignin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>{" "}
              Google
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-white/40 font-medium">
            Don't have an account?{" "}
            <a href="#" className="text-white hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
