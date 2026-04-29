// @ts-nocheck
import {
  BrainCircuit,
  Search,
  Zap,
  Bell,
  Heart,
  MessageSquare,
  Share2,
  Plus,
  MoreHorizontal,
  History,
} from "lucide-react";
import { useState } from "react";
import { useCommunityStore } from "../store/communityStore";
import { Image as ImageIcon } from "lucide-react";

const Community = () => {
  const { posts, addPost, likePost, athletes, toggleFollow } =
    useCommunityStore();
  const [newPost, setNewPost] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [showImgInput, setShowImgInput] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    addPost(newPost, newImgUrl);
    setNewPost("");
    setNewImgUrl("");
    setShowImgInput(false);
  };

  return (
    <main className="flex-1 p-10 overflow-y-auto">
      <header className="flex justify-between items-center mb-12">
        <h2 className="text-sm font-bold tracking-tight uppercase">
          Kinetic Atelier
        </h2>
      </header>

      {/* Hero Title */}
      <section className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-8xl font-black tracking-tighter leading-none mb-6">
            COLLECTIVE.
          </h1>
          <p className="max-w-xl text-white/40 text-sm leading-relaxed uppercase tracking-wide">
            Join the elite network of human optimization. Share progress,
            exchange protocols, and push the boundaries of physical performance.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">
            Active Now
          </p>
          <p className="text-5xl font-black tabular-nums">1,284</p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Feed & Transformation */}
        <div className="col-span-2 space-y-8">
          {/* Featured Transformation */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden flex">
            <div className="w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?auto=format&fit=crop&q=80&w=600"
                alt="Transformation"
                className="h-full object-cover grayscale"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold tracking-widest uppercase border border-white/10">
                Transformation of the week
              </div>
            </div>
            <div className="w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                    alt="Marcus"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Marcus Thorne
                  </h4>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">
                    Protocol: Hypertrophy V3
                  </p>
                </div>
              </div>
              <blockquote className="text-2xl font-bold tracking-tight mb-8 leading-tight">
                "The Kinetic approach isn't just about weight — it's about
                re-engineering the habit loop."
              </blockquote>
              <div className="flex gap-8 mb-8">
                <MetricSmall label="Duration" value="12 Weeks" />
                <MetricSmall
                  label="Body Fat"
                  value="-8.2%"
                  color="text-emerald-500"
                />
              </div>
              <button className="w-fit px-6 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Read Case Study
              </button>
            </div>
          </div>

          {/* Compose Post */}
          <form
            onSubmit={handlePost}
            className="bg-[#141414] border border-white/5 rounded-2xl p-6 mb-8 flex gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-slate-400 border border-white/20 overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" />
            </div>
            <div className="flex-1 shrink-0">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your progress..."
                className="w-full bg-transparent resize-none focus:outline-none text-sm placeholder:text-white/20 mb-2 h-16"
              />
              {showImgInput && (
                <input
                  type="text"
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="w-full bg-[#111112] border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white/20 mb-4"
                />
              )}
              <div className="flex justify-between items-center">
                <div
                  className="text-white/20 hover:text-white cursor-pointer transition-colors"
                  onClick={() => setShowImgInput(!showImgInput)}
                >
                  <ImageIcon size={18} />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200"
                >
                  Post
                </button>
              </div>
            </div>
          </form>

          {/* Social Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
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
                  <MoreHorizontal
                    size={18}
                    className="text-white/20 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  {post.text}
                </p>
                {post.img && (
                  <div className="rounded-xl overflow-hidden border border-white/5 mb-6">
                    <img
                      src={post.img}
                      className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                )}
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
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar UI */}
        <div className="space-y-6">
          <SidebarCard title="Rising Athletes">
            <div className="space-y-4">
              {athletes.map((athlete) => (
                <AthleteRow
                  key={athlete.id}
                  name={athlete.name}
                  role={athlete.role}
                  img={athlete.img}
                  following={athlete.following}
                  onToggleFollow={() => toggleFollow(athlete.id)}
                />
              ))}
            </div>
            <button className="w-full text-center text-[9px] font-bold text-white/20 hover:text-white uppercase tracking-widest mt-6">
              View All Directory
            </button>
          </SidebarCard>

          <SidebarCard title="Community Pulse">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 mb-4">
              <div className="flex gap-2 items-center text-emerald-400 mb-2">
                <BrainCircuit size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Global Insight
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                "Athletes in your current weight class are showing a 14%
                improvement in anaerobic capacity when performing fasted morning
                cardio. Would you like to adjust your protocol?"
              </p>
            </div>
            <button className="text-[9px] font-bold text-white/40 hover:text-white underline underline-offset-4 uppercase tracking-widest">
              View Comparison Data
            </button>
          </SidebarCard>

          <SidebarCard title="Trending Protocols">
            <div className="flex flex-wrap gap-2">
              {[
                "#Zone2Masters",
                "#VerticalPower",
                "#AtelierLabs",
                "#CreatineTiming",
                "#MorningFast",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] font-medium text-white/40 cursor-pointer hover:bg-white/10 hover:text-white transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SidebarCard>

          <button className="w-full aspect-square border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-white/20 hover:text-white/40 hover:bg-white/2 transition-all group">
            <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">
              Share Entry
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

// --- Dashboard Extra Sections (Requested from first image) ---

export const RecentPerformance = () => (
  <div className="grid grid-cols-2 gap-6 mt-12">
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
      <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
        Recent Performance
      </h3>
      <div className="space-y-4">
        <PerformanceItem
          title="Bench Press (Max Set)"
          subtitle="Yesterday • 100Kg x 8 reps"
          meta="+1 rep PR"
          color="text-emerald-400"
        />
        <PerformanceItem
          title="Run (Zone 2)"
          subtitle="2 days ago • 5.2 km"
          meta="28:40 mins"
        />
      </div>
    </div>

    <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
      <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
        Atelier Community
      </h3>
      <div className="flex items-start gap-4">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-[#141414] bg-neutral-600 overflow-hidden"
            />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#141414] bg-white/10 flex items-center justify-center text-[8px] font-bold">
            +24
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs italic text-white/60 leading-relaxed mb-4">
            "Just smashed the Week 4 Competition Block. Anyone joining for the
            5AM HIIT session tomorrow?"
          </p>
          <div className="flex gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Heart size={12} /> 12
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare size={12} /> 3
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SidebarCard = ({ title, children }: any) => (
  <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
    <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">
      {title}
    </h3>
    {children}
  </div>
);

const AthleteRow = ({
  name,
  role,
  img,
  following = false,
  onToggleFollow,
}: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex gap-3 items-center">
      <img
        src={img}
        className="w-8 h-8 rounded-full grayscale group-hover:grayscale-0 transition-all"
        alt={name}
      />
      <div>
        <h4 className="text-[11px] font-bold">{name}</h4>
        <p className="text-[9px] text-white/40">{role}</p>
      </div>
    </div>
    <button
      onClick={onToggleFollow}
      className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${following ? "bg-white/5 text-white/40 border border-white/5" : "bg-white text-black"}`}
    >
      {following ? "Following" : "Follow"}
    </button>
  </div>
);

const MetricSmall = ({ label, value, color = "text-white" }: any) => (
  <div>
    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className={`text-sm font-bold ${color}`}>{value}</p>
  </div>
);

const PerformanceItem = ({
  title,
  subtitle,
  meta,
  color = "text-white/40",
}: any) => (
  <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/2">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/40">
        <History size={14} />
      </div>
      <div>
        <h4 className="text-[11px] font-bold">{title}</h4>
        <p className="text-[10px] text-white/40">{subtitle}</p>
      </div>
    </div>
    <span
      className={`text-[10px] font-bold uppercase tracking-widest ${color}`}
    >
      {meta}
    </span>
  </div>
);

export default Community;
