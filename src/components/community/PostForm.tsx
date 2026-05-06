import { postSchema, type postSchemaType } from "@/types/schema";
import { createPost } from "@/usecase/community";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PostForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
  });
  const [files, setFile] = useState<File[]>([]);

  useEffect(() => {
    setValue("images", files);
  }, [watch("images")]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile((p) => [...p, file]);
  };

  const removeFile = (file: File) => {
    const upt = files.filter((v) => v.name != file.name);
    setFile(upt);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const file = e.dataTransfer.files[0];
    setFile((p) => [...p, file]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (d: postSchemaType) => {
    await createPost(d);
    setValue("content", "");
    setFile([]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#141414] border border-white/5 rounded-2xl p-6 mb-8 flex gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-slate-300 border border-neutral-700 overflow-hidden shrink-0">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" />
      </div>
      <div className="flex-1 shrink-0 space-y-4">
        <textarea
          rows={3}
          {...register("content")}
          placeholder="Share your progress..."
          className="w-full border-neutral-700 border rounded-lg p-3 resize-none focus:outline-none text-sm placeholder:text-white/20 mb-2 scrollbar-hide"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}

        <div className="flex justify-between items-start">
          <div className="grid grid-cols-3 gap-3 items-center">
            {files.map((v, i) => (
              <div
                key={i}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative overflow-hidden h-40 w-full border-2 border-dashed border-neutral-700 rounded-xl flex items-center justify-center bg-neutral-800 text-slate-300 cursor-pointer hover:border-white transition-colors group"
              >
                {v ? (
                  <img
                    src={URL.createObjectURL(v)}
                    alt="Preview"
                    className="object-contain w-full h-full rounded-xl"
                  />
                ) : (
                  <ImageIcon size={18} />
                )}

                <X
                  onClick={() => removeFile(files[i])}
                  className="rounded-full bg-red-600 z-50 hover:bg-red-700 absolute text-white cursor-pointer p-1 top-2 right-2 group-hover:block hidden"
                  size={32}
                />
                <input
                  disabled={v.name && true}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute size-full opacity-0 cursor-pointer border-4"
                />
              </div>
            ))}

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative overflow-hidden h-16 w-16 border-2 border-dashed border-neutral-700 rounded-xl flex items-center justify-center bg-neutral-800 text-slate-300 cursor-pointer hover:border-white transition-colors"
            >
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute size-full opacity-0 cursor-pointer border-4"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-white flex gap-2 items-center float-right text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200"
          style={{ opacity: isSubmitting && 0.5 }}
        >
          <span>Post</span>
          {isSubmitting && <Loader2 className="animate-spin" />}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
