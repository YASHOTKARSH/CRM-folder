import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  // Get page title based on route
  const getPageTitle = () => {
    if (location.pathname === "/deals") return "Deals Dashboard";
    if (location.pathname === "/leads") return "Leads Dashboard";
    if (location.pathname === "/projects") return "Project Dashboard";
    return "Dashboard";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Hamburger + Title */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Page Title */}
            <h1 className="text-lg font-bold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right: Future additions (notifications, profile, etc.) */}
          <div className="flex items-center gap-2">
            {/* Add your user profile, notifications here */}
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:block w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
