import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileTopbar from "../components/MobileTopbar";
import { ActiveSectionProvider } from "../context/activeSection";

export default function MainLayout() {
  return (
    <ActiveSectionProvider>
      <div className="min-h-screen">
        <Sidebar />
        <MobileTopbar />

        {/* Content area: pushed right on desktop because sidebar is fixed */}
        <main className="lg:ml-[320px]">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </ActiveSectionProvider>
  );
}
