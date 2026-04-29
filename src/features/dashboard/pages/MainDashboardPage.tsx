import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../components/Header";

export default function MainDashboardPage() {
  return (
    <div className="relative min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,191,82,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_22%)]" />

      <div className="relative flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Header />
          <main className="min-w-0 flex-1 pb-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
