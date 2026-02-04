import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileTopbar from "../components/MobileTopbar";
import AnimatedBackground from "../components/AnimatedBackground";
import { ActiveSectionProvider } from "../context/activeSection";

export default function MainLayout() {
  return (
    <ActiveSectionProvider>
      <div className="min-h-screen bg-black">
        {/* Global animated background (all pages) */}
        <AnimatedBackground />

        {/* Navigation */}
        <Sidebar />
        <MobileTopbar />

        {/* Main page content */}
        <main className="relative min-h-screen ml-64 pt-20 px-6 z-10">
          <Outlet />
        </main>
      </div>
    </ActiveSectionProvider>
  );
}
