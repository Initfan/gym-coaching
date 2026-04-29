import re

with open("src/pages/Programs.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace('} from "lucide-react";', '} from "lucide-react";\nimport { useAppStore } from "../store/appStore";')

# Component state
content = content.replace("const Programs = () => {", "const Programs = () => {\n  const { activeProgram, setActiveProgram } = useAppStore();")

# Replace ProgramCard uses to include onClick
content = content.replace('<ProgramCard\n            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500"\n            tag="HYPERTROPHY"',
'<ProgramCard\n            onClick={() => setActiveProgram("Mechanical Tension")}\n            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=500"\n            tag="HYPERTROPHY"')

content = content.replace('<ProgramCard\n            image="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=500"\n            tag="MOBILITY"',
'<ProgramCard\n            onClick={() => setActiveProgram("Neuromuscular Flow")}\n            image="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=500"\n            tag="MOBILITY"')

content = content.replace('<ProgramCard\n            image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=500"\n            tag="STRENGTH"',
'<ProgramCard\n            onClick={() => setActiveProgram("Absolute Power")}\n            image="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=500"\n            tag="STRENGTH"')

content = content.replace('<div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">',
'<div onClick={onClick} className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-all">')

content = content.replace("""const ProgramCard = ({
  image,
  tag,
  title,
  desc,
  level,
  duration,
  progress,
}: any) =>""", """const ProgramCard = ({
  image,
  tag,
  title,
  desc,
  level,
  duration,
  progress,
  onClick
}: any) =>""")

content = content.replace("""<div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent p-10 flex flex-col justify-end">""", """<div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
            <button onClick={() => setActiveProgram("Metabolic Conditioning 2.0")} className="absolute top-10 right-10 px-4 py-2 bg-white text-black font-bold text-xs uppercase rounded">Set Active</button>""")

with open("src/pages/Programs.tsx", "w") as f:
    f.write(content)
