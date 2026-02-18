import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  }, [location.pathname, setIsCollapsed]);

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-300 shadow-sm z-40 
        transition-all duration-300
        ${isCollapsed 
          ? "w-16 -translate-x-full lg:translate-x-0" 
          : "w-64 translate-x-0"
        }
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎯</span>
              </div>
              <span className="text-lg font-bold text-gray-800">CRMS</span>
            </div>

            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Close sidebar"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors w-full hidden lg:flex justify-center"
            title="Expand sidebar"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {/* Main Menu Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main Menu
            </p>
          )}

          {/* Dashboard */}
          <div className="mb-2">
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isCollapsed ? "justify-center" : ""
              } ${
                location.pathname.includes("/deals") ||
                location.pathname.includes("/leads") ||
                location.pathname.includes("/projects")
                  ? "bg-red-50 text-red-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              {!isCollapsed && (
                <span className="text-sm font-medium">Dashboard</span>
              )}
            </div>

            {/* Sub-menu items */}
            {!isCollapsed &&
              (location.pathname.includes("/deals") ||
                location.pathname.includes("/leads") ||
                location.pathname.includes("/projects")) && (
                <div className="ml-8 mt-2 space-y-1">
                  <Link
                    to="/deals"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive("/deals")
                        ? "text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    Deals Dashboard
                  </Link>

                  <Link
                    to="/leads"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive("/leads")
                        ? "text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    Leads Dashboard
                  </Link>

                  <Link
                    to="/projects"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive("/projects")
                        ? "text-red-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    Project Dashboard
                  </Link>
                </div>
              )}
          </div>
    
    </div>
    </div>
    </aside>
  );
};

export default Sidebar;