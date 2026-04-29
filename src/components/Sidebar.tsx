import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BrainCircuit,
  LineChart,
  Users,
  User,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tighter">ATELIER</h1>
      </div>

      <nav className="space-y-1 flex-1">
        <NavItem
          to={"/dashboard"}
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />
        <NavItem
          to={"programs"}
          icon={<Dumbbell size={18} />}
          label="Programs"
        />
        <NavItem
          to={"nutrition"}
          icon={<Utensils size={18} />}
          label="Nutrition"
        />
        <NavItem
          to={"coach"}
          icon={<BrainCircuit size={18} />}
          label="AI Coach"
        />
        <NavItem
          to={"progress"}
          icon={<LineChart size={18} />}
          label="Progress"
        />
        <NavItem
          to={"community"}
          icon={<Users size={18} />}
          label="Community"
        />
        <NavItem to={"profile"} icon={<User size={18} />} label="Profile" />
      </nav>

      <div className="mt-auto space-y-4">
        <button className="w-full bg-[#d1d1d1] text-black font-bold py-3 rounded-md text-xs uppercase tracking-wider hover:bg-white transition-colors">
          Start Workout
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isActive ? "bg-white/5 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`
    }
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default Sidebar;
