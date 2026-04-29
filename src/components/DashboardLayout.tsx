import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
