import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BrainCircuit,
  Users,
  User,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const { signOut } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 absolute w-full border-b border-white/5">
        <h1 className="text-lg font-bold tracking-tighter">ATELIER</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 min-w-1/2
          md:min-w-1/5 bg-[#0b0b0b] border-r border-white/5
          flex flex-col p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (mobile only) */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <h1 className="text-lg font-bold tracking-tighter">ATELIER</h1>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* DESKTOP LOGO */}
        <div className="mb-10 hidden md:block">
          <h1 className="text-xl font-bold tracking-tighter">ATELIER</h1>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <NavItem
            to="/dashboard/programs"
            icon={<Dumbbell size={18} />}
            label="Programs"
          />
          <NavItem
            to="/dashboard/nutrition"
            icon={<Utensils size={18} />}
            label="Nutrition"
          />
          <NavItem
            to="/dashboard/coach"
            icon={<BrainCircuit size={18} />}
            label="AI Coach"
          />
          <NavItem
            to="/dashboard/community"
            icon={<Users size={18} />}
            label="Community"
          />
          <NavItem
            to="/dashboard/profile"
            icon={<User size={18} />}
            label="Profile"
          />
        </nav>

        <button
          onClick={signOut}
          className="w-full bg-red-500/20 text-red-500 font-bold py-3 rounded-md text-xs uppercase tracking-wider hover:bg-red-500 hover:text-white transition-colors"
        >
          Log Out
        </button>
      </aside>
    </>
  );
};

const NavItem = ({ icon, label, to }: any) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    onClick={() => window.innerWidth < 768 && null}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        isActive
          ? "bg-white/5 text-white"
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`
    }
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default Sidebar;
