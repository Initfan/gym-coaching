import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../utils/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  initializeAccount: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
      initializeAccount: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        set({ session, user: session?.user || null, loading: false });

        supabase.auth.onAuthStateChange((_event, session) => {
          set({ session, user: session?.user || null });
        });
      },
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
