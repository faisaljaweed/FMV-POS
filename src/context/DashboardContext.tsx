import React, { createContext, useContext, useState } from "react";

interface DashboardContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Before toggle:", sidebarOpen);
    setSidebarOpen((prev) => !prev);
    console.log("After toggle:", !sidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <DashboardContext.Provider
      value={{ sidebarOpen, toggleSidebar, closeSidebar }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
