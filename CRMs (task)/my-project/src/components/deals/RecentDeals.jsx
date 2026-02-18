import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

const RecentDeals = ({ data, dateFilter, onDateFilterChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  // Reset to page 1 when data changes
  useMemo(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm  h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 sm:px-5 rounded-t-lg py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Recently Created Deals
        </h3>
        
        {/* Date Filter Dropdown - Updated Options */}
        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="px-2 sm:px-3 py-1 text-xs drop-shadow  inset-shadow-zinc-500 border hover:bg-gray-100  border-zinc-300 rounded bg-white focus:outline-none"
        >
          <option value="AllTime">All Time</option>
          <option value="Today">Today</option>
          <option value="Last5Days">Last 5 days</option>
          <option value="Last15Days">Last 15 days</option>
          <option value="OneMonth">One Month</option>
        </select>
      </div>

      {/* Table - Scrollable on mobile */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-fit">
          <table className="w-full text-xs sm:text-sm m-2 lg:m-4 border border-gray-200 rounded">
            <thead className="bg-gray-50 text-gray-600 sticky top-0">
              <tr>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Deal Name
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Stage
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Deal Value
                </th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 font-medium border-b border-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((deal) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-black">
                      {deal.name}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-600">
                      {deal.stage}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-800 font-medium">
                      ${deal.value.toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          deal.status === "Won"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    No deals found for the selected date range
                  </td>
                </tr>
              )}
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

export default RecentDeals;