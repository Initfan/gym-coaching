import { imageUrl } from "@/lib/imageUrl";
import {
  useCommunityStore,
  type Post as PostType,
} from "@/store/communityStore";
import { Heart, MessageSquare, MoreHorizontal, Share2 } from "lucide-react";

const Post = ({ post }: { post: PostType }) => {
  const { likePost } = useCommunityStore();
  const images: string[] = JSON.parse(post.images ?? "[]");

  return (
    <div
      key={post.id}
      className="bg-[#141414] border border-white/5 rounded-2xl p-6"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center shrink-0">
            <img
              className="w-full h-full object-cover"
              src={
                post.authorImg ||
                (post.author === "You"
                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100")
              }
            />
          </div>
          <div>
            <h4 className="text-xs font-bold">{post.author}</h4>
            <p className="text-[10px] text-white/40">{post.time}</p>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-white/20 cursor-pointer" />
      </div>
      <p className="text-sm text-white/80 mb-6 leading-relaxed">
        {post.content}
      </p>

      {post.images &&
        images.map((v, i) => (
          <div key={v}>
            {i == 0 && (
              <div className="rounded-xl overflow-hidden border border-white/5 mb-4">
                <img
                  src={imageUrl("posts", v)}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </div>
        ))}

      <div
        className={`grid gap-4 mb-6`}
        style={{
          gridTemplateColumns:
            images.length - 1 >= 5
              ? "repeat(5, 1fr)"
              : `repeat(${images.length - 1}, 1fr)`,
        }}
      >
        {post.images &&
          images.map(
            (v, i) =>
              i != 0 && (
                <div className="h-32 bg-neutral-800 w-full">
                  <img
                    src={imageUrl("posts", v)}
                    className="size-full object-cover rounded-lg"
                  />
                </div>
              ),
          )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center gap-2 text-[10px] font-bold transition-colors ${post.isLikedByMe ? "text-rose-500" : "text-white/40 hover:text-rose-500"}`}
          >
            <Heart
              size={14}
              className={post.isLikedByMe ? "fill-rose-500" : ""}
            />{" "}
            {post.likes}
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
            <MessageSquare size={14} /> {post.comments}
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
            <Share2 size={14} />
          </button>
        </div>
        <span className="text-[8px] font-bold tracking-[0.2em] text-white/20 uppercase bg-white/5 px-2 py-0.5 rounded">
          Global Feed
        </span>
      </div>
    </div>
  );
};

export default Post;
