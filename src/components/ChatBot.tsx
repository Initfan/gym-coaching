// @ts-nocheck
import {
  Dumbbell,
  Utensils,
  BrainCircuit,
  LineChart,
  ArrowUp,
  Loader2,
} from "lucide-react";
import React, { useEffect, useRef, useState, type SubmitEvent } from "react";
import { formatTime } from "../lib/time";
import ai from "../utils/gemini";

type Chat = {
  role: "USER" | "BOT";
  text: string;
  time: string;
};

const ChatBot = () => {
  const [chatBox, setChatBox] = useState("");
  const [sending, setSending] = useState(false);
  const [chat, setChat] = useState<Chat[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendChat = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChat((p) => [
      ...p,
      { role: "USER", text: chatBox, time: formatTime(new Date()) },
    ]);

    setChatBox("");
    setSending(true);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction:
          "You are a gym coach just short answer the topic related to gym any else dont respond it. answer in html format",
      },
      contents: chatBox,
    });

    setChat((p) => [
      ...p,
      { role: "BOT", text: response.text, time: formatTime(new Date()) },
    ]);

    setSending(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  return (
    <>
      <div
        className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide"
        ref={chatContainerRef}
      >
        <StartConversation />

        {/* AI Message 1 */}
        {chat.map((v) => (
          <>
            {/* {Bot message} */}
            {v.role == "BOT" && (
              <div className="flex gap-4 max-w-3xl">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <BrainCircuit size={16} />
                </div>
                <div className="space-y-2">
                  <div
                    className="bg-[#141414] border border-white/5 p-5 rounded-2xl rounded-tl-none leading-relaxed text-sm text-white/80"
                    dangerouslySetInnerHTML={{ __html: v.text }}
                  ></div>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest ml-1">
                    Kinetic AI - {formatTime(new Date())}
                  </span>
                </div>
              </div>
            )}

            {/* User Message */}
            {v.role == "USER" && (
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded border border-white/10 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    alt="Avatar"
                  />
                </div>
                <div className="space-y-2 text-right">
                  <div className="bg-[#262626] p-5 rounded-2xl rounded-tr-none text-sm text-white max-w-xl">
                    {v.text}
                  </div>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mr-1">
                    You - {v.time}
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 pt-0 my-2">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {[
            "optimize my bulking",
            "improve bench press",
            "cutting meal suggestion",
          ].map((pill) => (
            <button
              key={pill}
              className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white/60 hover:text-white whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                {pill.includes("optimize") ? (
                  <LineChart size={12} />
                ) : pill.includes("improve") ? (
                  <Dumbbell size={12} />
                ) : (
                  <Utensils size={12} />
                )}
                {pill}
              </span>
            </button>
          ))}
        </div>
        <form
          onSubmit={sendChat}
          className="bg-[#1a1a1a] border border-white/10 rounded-xl p-2 flex items-center gap-2 group focus-within:border-white/30 transition-all"
        >
          <input
            type="text"
            placeholder="Message AI Coach..."
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-white/20"
            onChange={(e) => setChatBox(e.currentTarget.value)}
            value={chatBox}
            disabled={sending}
            onKeyDown={(e) => e.code == "Enter" && sendChat}
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-white text-black p-2.5 rounded-lg hover:bg-neutral-200 disabled:bg-gray-600 disabled:text-gray-500"
          >
            {sending ? (
              <Loader2 className="animate-spin" size={18} strokeWidth={3} />
            ) : (
              <ArrowUp size={18} strokeWidth={3} />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;

const StartConversation = React.memo(() => {
  return (
    <>
      <div className="flex justify-center">
        <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase bg-white/5 px-3 py-1 rounded-full">
          Today • Optimization Session
        </span>
      </div>

      <div className="flex gap-4 max-w-3xl">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
          <BrainCircuit size={16} />
        </div>
        <div className="space-y-2">
          <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl rounded-tl-none leading-relaxed text-sm text-white/80">
            Welcome back to the Atelier. I've analyzed your biometric data from
            this morning. Your heart rate variability is slightly lower than
            usual, suggesting we focus on technical precision rather than raw
            load today.
            <br />
            <br />
            How would you like to proceed with your optimization today?
          </div>
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest ml-1">
            Kinetic AI - {formatTime(new Date())}
          </span>
        </div>
      </div>
    </>
  );
});
