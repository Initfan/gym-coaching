import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30">
      <Sidebar />
      <div className="mt-16 md:my-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
