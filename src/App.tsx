import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import DashboardLayout from "./components/DashboardLayout";
import Coach from "./pages/Coach";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="programs" element={<Programs />} />
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
