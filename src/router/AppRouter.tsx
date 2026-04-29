import { BrowserRouter, Route, Routes } from "react-router-dom";
import AchievementsPage from "../features/achievements/pages/AchievementsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import MainDashboardPage from "../features/dashboard/pages/MainDashboardPage";
import DailyCheckinPage from "../features/daily-checkin/pages/DailyCheckinPage";
import HelpPage from "../features/help/pages/HelpPage";
import LeaderboardPage from "../features/leaderboard/pages/LeaderboardPage";
import ProfilePage from "../features/Profile/pages/ProfilePage";
import ReferralsPage from "../features/referrals/pages/ReferralsPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import TasksPage from "../features/tasks/pages/TasksPage";
import TransactionsPage from "../features/transactions/pages/TransactionsPage";
import TransferPage from "../features/transactions/pages/TransferPage";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainDashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="referrals" element={<ReferralsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="daily-checkin" element={<DailyCheckinPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
