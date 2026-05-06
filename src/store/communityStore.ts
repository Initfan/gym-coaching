import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupabaseServices } from "../services/supabaseServices";
import { useAuthStore } from "./authStore";
import supabase from "@/utils/supabase";
import { community } from "@/usecase/community";

export interface Post {
  id: number;
  author: string;
  authorImg: string;
  time: string;
  content: string;
  images?: string;
  likes: number;
  comments: number;
  isLikedByMe?: boolean;
}

export interface Athlete {
  id: string;
  name: string;
  role: string;
  img: string;
  following: boolean;
}

interface CommunityState {
  posts?: Post[];
  addPost: (text: string, img?: string) => Promise<void>;
  likePost: (id: number) => Promise<void>;
  getPosts: () => Promise<void>;

  athletes: Athlete[];
  toggleFollow: (id: string) => void;
}

const initialAthletes: Athlete[] = [
  {
    id: "a1",
    name: "Julian S.",
    role: "Powerlifting Expert",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    following: false,
  },
  {
    id: "a2",
    name: "Sarah Chen",
    role: "Mobility Coach",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    following: false,
  },
  {
    id: "a3",
    name: "Mona Lisa",
    role: "Yoga/Balance",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    following: true,
  },
];

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      posts: [],
      athletes: initialAthletes,

      addPost: async (text, img) => {
        const userId = useAuthStore.getState().user?.id;
        if (userId) {
          await SupabaseServices.createPost(userId, text, img);
        }
        set((state) => ({
          posts: [
            {
              id: Date.now(),
              author: "You",
              authorImg:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
              time: "Just now",
              content: text,
              img: img || "",
              likes: 0,
              comments: 0,
              isLikedByMe: false,
            },
            ...state.posts,
          ],
        }));
      },

      likePost: async (id) => {
        const userId = useAuthStore.getState().user?.id;
        let isLiked = false;

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              isLiked = !post.isLikedByMe;
              return {
                ...post,
                isLikedByMe: isLiked,
                likes: isLiked ? post.likes + 1 : post.likes - 1,
              };
            }
            return post;
          }),
        }));

        if (userId) {
          await community.toggleLikePost(userId, id, !isLiked);
        }
      },

      getPosts: async () => {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });
        set({ posts: data });
      },

      toggleFollow: (id) =>
        set((state) => ({
          athletes: state.athletes.map((athlete) => {
            if (athlete.id === id) {
              return { ...athlete, following: !athlete.following };
            }
            return athlete;
          }),
        })),
    }),
    {
      name: "community-storage",
    },
  ),
);
