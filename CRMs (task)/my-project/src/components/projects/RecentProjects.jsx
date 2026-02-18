import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

const RecentProjects = ({ data, dateFilter, onDateFilterChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  useMemo(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Recent Projects
        </h3>
        
        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="px-2 sm:px-3 py-1 text-xs drop-shadow  inset-shadow-zinc-500 border hover:bg-gray-100  border-zinc-300 rounded bg-white focus:outline-none"
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last7Days">Last 7 days</option>
          <option value="Last30Days">Last 30 days</option>
          <option value="ThisMonth">This Month</option>
          <option value="LastMonth">Last Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-175">
          <table className="w-full text-xs sm:text-sm m-2 lg:m-4 border border-gray-200 rounded scroll">
            <thead className="bg-gray-50 text-gray-600 sticky top-0">
              <tr>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Name
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Company Name
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Priority
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Project Name with Icon */}
                  <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {project.companyIcon}
                      </div>
                      <span className="text-gray-800 font-medium">
                        {project.name}
                      </span>
                    </div>
                  </td>

                  {/* Company Name with Icon */}
                  <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {project.companyIcon}
                      </div>
                      <span className="text-gray-700">{project.companyName}</span>
                    </div>
                  </td>

                  {/* Priority Badge */}
                  <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : project.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {project.priority}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-600">
                    {new Date(project.dueDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between sm:justify-end items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 bg-gray-50">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-xs sm:text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;