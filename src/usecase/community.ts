import { compressToWebP } from "@/services/imageCompress";
import { useAuthStore } from "@/store/authStore";
import type { postSchemaType } from "@/types/schema";
import supabase from "@/utils/supabase";

const { id: user_id } = useAuthStore?.getState().user ?? { id: 0 };

export const community = {
  async createPost(data: postSchemaType) {
    const paths = await Promise.all(
      data.images.map(async (v) => {
        const compressed = await compressToWebP(v);

        const fileName = `${Date.now()}-${Math.random()}.webp`;

        const { data: uploadData, error } = await supabase.storage
          .from("posts")
          .upload(fileName, compressed);

        if (error) throw error;

        return uploadData?.path;
      }),
    );

    const { data: p } = await supabase
      .from("posts")
      .insert({
        user_id,
        content: data.content,
        images: paths,
      })
      .select("*")
      .single();

    return p;
  },

  async toggleLikePost(userId: string, postId: number, currentLiked: boolean) {
    if (currentLiked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .match({ user_id: userId, post_id: postId });
      if (error) console.error("Error unliking post:", error.message);
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert([{ user_id: userId, post_id: postId }]);
      if (error) console.error("Error liking post:", error.message);
    }
  },
};
