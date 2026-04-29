import { Route, Routes, Navigate } from "react-router";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import DashboardLayout from "./components/DashboardLayout";
import Coach from "./pages/Coach";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/authStore";
import { useAppStore } from "./store/appStore";
import Train from "./pages/Train";

/* 
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};
*/

const App = () => {
  const { initializeAccount } = useAuthStore();
  const { syncSupabaseData } = useAppStore();

  useEffect(() => {
    initializeAccount().then(() => {
      syncSupabaseData();
    });
  }, [initializeAccount, syncSupabaseData]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
          // </ProtectedRoute>
          <DashboardLayout />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="programs">
          <Route index element={<Programs />} />
          <Route path="train/:tag" element={<Train />} />
        </Route>
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="coach" element={<Coach />} />
        <Route path="progress" element={<Progress />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
