import re

with open("src/pages/Community.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace('} from "lucide-react";', '} from "lucide-react";\nimport { useState } from "react";')

content = content.replace("const Community = () => {", """const Community = () => {
  const [posts, setPosts] = useState([
    { id: 1, author: "Elena Rodriguez", time: "2 hours ago • London, UK", text: "Just hit a new PR on my conventional deadlift today. 140kg felt like air. Huge thanks to the AI Coach for the technical adjustments on my hinge. Stability is everything.", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000", likes: 242, comments: 18 }
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newPost) return;
    setPosts([{ id: Date.now(), author: "You", time: "Just now", text: newPost, img: "", likes: 0, comments: 0 }, ...posts]);
    setNewPost("");
  };
""")

# replace single social post with map
old_post = """{/* Social Post */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Elena"
                />
                <div>
                  <h4 className="text-xs font-bold">Elena Rodriguez</h4>
                  <p className="text-[10px] text-white/40">
                    2 hours ago • London, UK
                  </p>
                </div>
              </div>
              <MoreHorizontal size={18} className="text-white/20" />
            </div>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Just hit a new PR on my conventional deadlift today. 140kg felt
              like air. Huge thanks to the AI Coach for the technical
              adjustments on my hinge. Stability is everything.
            </p>
            <div className="rounded-xl overflow-hidden border border-white/5 mb-6">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000"
                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                alt="Deadlift"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-rose-500 transition-colors">
                  <Heart size={14} /> 242
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  <MessageSquare size={14} /> 18
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
              <span className="text-[8px] font-bold tracking-[0.2em] text-white/20 uppercase bg-white/5 px-2 py-0.5 rounded">
                Strength Protocol
              </span>
            </div>
          </div>"""

new_posts = """{/* Compose Post */}
          <form onSubmit={handlePost} className="bg-[#141414] border border-white/5 rounded-2xl p-6 mb-8 flex gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-400 border border-white/20 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" />
             </div>
             <div className="flex-1 shrink-0">
                <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share your progress..." className="w-full bg-transparent resize-none focus:outline-none text-sm placeholder:text-white/20 mb-4 h-16" />
                <div className="flex justify-between items-center">
                   <div className="text-white/20 hover:text-white cursor-pointer"><MoreHorizontal size={18} /></div>
                   <button type="submit" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200">Post</button>
                </div>
             </div>
          </form>

          {/* Social Posts */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                       <img className="w-full h-full object-cover" src={post.author === "You" ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"\} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{post.author}</h4>
                      <p className="text-[10px] text-white/40">{post.time}</p>
                    </div>
                  </div>
                  <MoreHorizontal size={18} className="text-white/20 cursor-pointer" />
                </div>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">{post.text}</p>
                {post.img && (
                  <div className="rounded-xl overflow-hidden border border-white/5 mb-6">
                    <img src={post.img} className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-rose-500 transition-colors">
                      <Heart size={14} /> {post.likes}
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
          </div>"""

content = content.replace(old_post, new_posts)

with open("src/pages/Community.tsx", "w") as f:
    f.write(content)
