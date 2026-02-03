import { createContext, useContext, useMemo, useState } from "react";

const ActiveSectionContext = createContext(null);

export function ActiveSectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState("intro");

  const value = useMemo(() => ({ activeSection, setActiveSection }), [activeSection]);

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) throw new Error("useActiveSection must be used inside ActiveSectionProvider");
  return ctx;
}
