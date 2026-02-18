import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Overlay - Shows on mobile when sidebar is open */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"
        }`}
      >
        {/* Top Navbar */}
        <Navbar onMenuClick={() => setIsCollapsed(false)} />

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;