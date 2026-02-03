import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileTopbar from "../components/MobileTopbar";
import { ActiveSectionProvider } from "../context/activeSection";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function MainLayout() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <ActiveSectionProvider>
      <div className="min-h-screen">
        <Sidebar />
        <MobileTopbar />

        <main className="lg:ml-[320px]">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                exit={reduce ? false : { opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </ActiveSectionProvider>
  );
}
