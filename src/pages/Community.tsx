import { BrainCircuit } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useCommunityStore } from "../store/communityStore";
import PostForm from "@/components/community/PostForm";
import Post from "@/components/community/Post";

const Community = () => {
  const [pending, transition] = useTransition();
  const { posts, athletes, toggleFollow, getPosts } = useCommunityStore();

  useEffect(() => {
    transition(async () => await getPosts());
  }, [getPosts]);

  return (
    <main className="flex-1 p-5 md:p-10 overflow-y-auto">
      {/* Hero Title */}
      <section className="mb-12 flex flex-col justify-between items-end">
        <div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
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
          <p className="text-3xl md:text-5xl font-black tabular-nums">1,284</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-1 space-y-8">
          <PostForm />

          <div className="space-y-6">
            {!pending && posts.map((post, i) => <Post key={i} post={post} />)}
          </div>
        </div>

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
        </div>
      </div>
    </main>
  );
};

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

export default Community;
