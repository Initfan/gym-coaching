import re

with open("src/pages/Progress.tsx", "r") as f:
    content = f.read()

# Add imports for store
content = content.replace('} from "lucide-react";', '} from "lucide-react";\nimport { useState } from "react";\nimport { useAppStore } from "../store/appStore";')

# Component state
new_comp = """const Progress = () => {
  const { weightLogs, addWeightLog } = useAppStore();
  const [showUpdateMode, setShowUpdateMode] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if(Number(newWeight) > 0) addWeightLog(Number(newWeight));
    setShowUpdateMode(false);
    setNewWeight("");
  };
  
  const latestWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : 0;
  const previousWeight = weightLogs.length > 1 ? weightLogs[weightLogs.length - 2].weight : latestWeight;
  const weightDiff = latestWeight - previousWeight;
"""
content = content.replace("const Progress = () => {", new_comp)

# Update weight numbers from store
content = content.replace('<span className="text-5xl font-black tracking-tighter">78.4</span>', '<span className="text-5xl font-black tracking-tighter">{latestWeight.toFixed(1)}</span>')
content = content.replace('<ArrowDownRight size={12} /> -2.1 kg (LTM)', '{weightDiff <= 0 ? <ArrowDownRight size={12} /> : null} {weightDiff > 0 ? "+" : ""}{weightDiff.toFixed(1)} kg (from last)')

# Update the "Update Measurements" button
old_btn = """<button className="w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all mt-4">
            Update Measurements
          </button>"""

new_btn = """{showUpdateMode ? (
            <form onSubmit={handleUpdate} className="flex gap-2.5 mt-4">
              <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(e.target.value)} placeholder="0.0 kg" className="w-full py-3 bg-black border border-white/10 rounded-lg text-sm px-3 focus:outline-none" />
              <button type="submit" className="px-4 py-3 bg-white text-black rounded-lg text-[9px] font-bold uppercase hover:bg-white/90">Save</button>
              <button type="button" onClick={() => setShowUpdateMode(false)} className="px-4 py-3 bg-white/10 rounded-lg text-[9px] font-bold uppercase">Cancel</button>
            </form>
          ) : (
          <button onClick={() => setShowUpdateMode(true)} className="w-full py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all mt-4">
            Update Measurements
          </button>)}"""

content = content.replace(old_btn, new_btn)

with open("src/pages/Progress.tsx", "w") as f:
    f.write(content)

