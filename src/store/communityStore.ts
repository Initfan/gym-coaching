import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupabaseServices } from "../services/supabaseServices";
import { useAuthStore } from "./authStore";

export interface Post {
  id: number;
  author: string;
  authorImg: string;
  time: string;
  text: string;
  img?: string;
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
  posts: Post[];
  addPost: (text: string, img?: string) => Promise<void>;
  likePost: (id: number) => Promise<void>;
  fetchRemotePosts: () => Promise<void>;

  athletes: Athlete[];
  toggleFollow: (id: string) => void;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Elena Rodriguez",
    authorImg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    time: "2 hours ago • London, UK",
    text: "Just hit a new PR on my conventional deadlift today. 140kg felt like air. Huge thanks to the AI Coach for the technical adjustments on my hinge. Stability is everything.",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000",
    likes: 242,
    comments: 18,
    isLikedByMe: false,
  },
];

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
      posts: initialPosts,
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
              text,
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
          await SupabaseServices.toggleLikePost(userId, id, !isLiked);
        }
      },

      fetchRemotePosts: async () => {
        const posts = await SupabaseServices.fetchPosts();
        if (posts && posts.length > 0) {
          const mappedPosts = posts.map((p) => ({
            id: p.id,
            author: p.author?.username || p.author?.full_name || "Unknown",
            authorImg:
              p.author?.avatar_url ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
            time: new Date(p.created_at).toLocaleDateString(),
            text: p.text,
            img: p.img,
            likes: p.likes || 0,
            comments: p.comments || 0,
            isLikedByMe: false,
          }));
          set({ posts: mappedPosts });
        }
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
