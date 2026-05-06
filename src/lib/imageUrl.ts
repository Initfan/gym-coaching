export const imageUrl = (bucket: string, asset: string) =>
  `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co/storage/v1/object/public/${bucket}/${asset}`;
