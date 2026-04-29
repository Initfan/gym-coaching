import supabase from "../utils/supabase";

export const SupabaseServices = {
  // === Community / Posts ===
  async fetchPosts() {
    const { data, error } = await supabase.from("posts").select("*, author:profiles(*)").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
    return data;
  },

  async createPost(userId: string, text: string, img: string = "") {
    const { data, error } = await supabase.from("posts").insert([{ user_id: userId, text, img }]).select();
    if (error) {
      console.error("Error creating post:", error.message);
      return null;
    }
    return data?.[0];
  },

  async toggleLikePost(userId: string, postId: number, currentLiked: boolean) {
    if (currentLiked) {
      const { error } = await supabase.from("post_likes").delete().match({ user_id: userId, post_id: postId });
      if (error) console.error("Error unliking post:", error.message);
    } else {
      const { error } = await supabase.from("post_likes").insert([{ user_id: userId, post_id: postId }]);
      if (error) console.error("Error liking post:", error.message);
    }
  },

  // === App Data / Progress ===
  async fetchWeightLogs(userId: string) {
    const { data, error } = await supabase.from("weight_logs").select("*").eq("user_id", userId).order("date", { ascending: true });
    if (error) {
      console.error("Error fetching weight logs:", error.message);
      return [];
    }
    return data;
  },

  async addWeightLog(userId: string, weight: number, date: string) {
    const { data, error } = await supabase.from("weight_logs").insert([{ user_id: userId, weight, date }]).select();
    if (error) {
      console.error("Error adding weight log:", error.message);
      return null;
    }
    return data?.[0];
  },

  // === Nutrition ===
  async fetchNutritionLog(userId: string, date: string) {
    const { data, error } = await supabase.from("nutrition_logs").select("*").eq("user_id", userId).eq("date", date).single();
    if (error && error.code !== "PGRST116") { // Ignore 'row not found'
      console.error("Error fetching nutrition:", error.message);
      return null;
    }
    return data;
  },

  async upsertNutritionLog(userId: string, date: string, macros: { protein: number, carbs: number, fats: number }) {
    const { data, error } = await supabase.from("nutrition_logs").upsert({
      user_id: userId,
      date,
      ...macros
    }).select();
    if (error) {
      console.error("Error upserting nutrition:", error.message);
      return null;
    }
    return data?.[0];
  },
  
  // === Profile / User ===
  async getProfile(userId: string) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }
    return data;
  },
  
  async updateProfile(userId: string, profileData: any) {
    const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userId).select();
    if (error) {
      console.error("Error updating profile:", error.message);
      return null;
    }
    return data?.[0];
  }
};
