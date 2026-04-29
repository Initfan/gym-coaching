import re

with open("src/pages/Nutrition.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace('} from "lucide-react";', '} from "lucide-react";\nimport { useState } from "react";\nimport { useAppStore } from "../store/appStore";')

# Add store to component and edit return block
replacement = """const Nutrition = () => {
  const { nutrition, addMacro } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMacro, setNewMacro] = useState({ protein: 0, carbs: 0, fats: 0 });

  const handleAddMacro = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMacro.protein > 0) addMacro('protein', Number(newMacro.protein));
    if (newMacro.carbs > 0) addMacro('carbs', Number(newMacro.carbs));
    if (newMacro.fats > 0) addMacro('fats', Number(newMacro.fats));
    setNewMacro({ protein: 0, carbs: 0, fats: 0 });
    setShowAddForm(false);
  };
"""

content = content.replace("const Nutrition = () => {", replacement)

# Replace the AI Coherence block to add the Logging button
ui_replace = """<div className="bg-[#141414] border border-white/5 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                AI Coherence
              </p>
              <p className="text-[11px] font-bold">
                Calibrated for{" "}
                <span className="text-emerald-400">Hypertrophy phase</span>
              </p>
            </div>
          </div>
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-emerald-500/20 text-emerald-500 rounded text-xs font-bold uppercase hover:bg-emerald-500 hover:text-white transition-colors">
            + Log Custom Food
          </button>
        </div>"""

old_ui = """<div className="bg-[#141414] border border-white/5 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400">
            <BrainCircuit size={20} />
          </div>
          <div>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
              AI Coherence
            </p>
            <p className="text-[11px] font-bold">
              Calibrated for{" "}
              <span className="text-emerald-400">Hypertrophy phase</span>
            </p>
          </div>
        </div>"""

content = content.replace(old_ui, ui_replace)

# Render the modal right before the Top Grid
modal = """
      </section>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <form onSubmit={handleAddMacro} className="bg-[#1a1a1a] p-8 rounded-xl w-96 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Log Macros</h3>
             <div className="space-y-4">
               <div>
                 <label className="block text-xs text-white/40 mb-1">Protein (g)</label>
                 <input type="number" value={newMacro.protein} onChange={e => setNewMacro({...newMacro, protein: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="block text-xs text-white/40 mb-1">Carbs (g)</label>
                 <input type="number" value={newMacro.carbs} onChange={e => setNewMacro({...newMacro, carbs: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="block text-xs text-white/40 mb-1">Fats (g)</label>
                 <input type="number" value={newMacro.fats} onChange={e => setNewMacro({...newMacro, fats: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
               </div>
               <div className="flex justify-end gap-3 mt-6">
                 <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded text-sm text-white/40 hover:text-white">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-white text-black rounded text-sm font-bold">Save Log</button>
               </div>
             </div>
          </form>
        </div>
      )}

      {/* Top Grid: Macros, Hydration, Supplements */}
"""

content = content.replace("""</section>

      {/* Top Grid: Macros, Hydration, Supplements */}""", modal)

# Replace the overview progress bars
old_overview = """<div className="flex justify-between items-center px-2">
            <RadialProgress value={80} label="PROTEIN" sub="160g / 200g" />
            <RadialProgress value={40} label="CARBS" sub="120g / 300g" />
            <RadialProgress value={60} label="FATS" sub="48g / 80g" />
          </div>"""
          
new_overview = """<div className="flex justify-between items-center px-2">
            <RadialProgress value={Math.min(100, Math.floor((nutrition.protein/nutrition.targetProtein)*100))} label="PROTEIN" sub={`${nutrition.protein}g / ${nutrition.targetProtein}g`} />
            <RadialProgress value={Math.min(100, Math.floor((nutrition.carbs/nutrition.targetCarbs)*100))} label="CARBS" sub={`${nutrition.carbs}g / ${nutrition.targetCarbs}g`} />
            <RadialProgress value={Math.min(100, Math.floor((nutrition.fats/nutrition.targetFats)*100))} label="FATS" sub={`${nutrition.fats}g / ${nutrition.targetFats}g`} />
          </div>"""

content = content.replace(old_overview, new_overview)

with open("src/pages/Nutrition.tsx", "w") as f:
    f.write(content)

