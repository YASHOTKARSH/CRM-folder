import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

const RecentLeads = ({ data, dateFilter, onDateFilterChange }) => {
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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getPercentage = (stage) => {
    const stagePercentages = {
      "Inpipeline": 20,
      "Follow Up": 40,
      "Schedule Service": 60,
      "Conversation": 80,
      "Closed": 100,
    };
    return stagePercentages[stage] || 0;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Recently Created Leads
        </h3>
        
        {/* Date Filter - Updated Options */}
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

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-max m-2 lg:m-4 border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600 sticky top-0">
            <tr>
              <th className="text-left px-4 py-3 font-medium border-b border-gray-200">
                Lead Name
              </th>
              <th className="text-left px-4 py-3 font-medium border-b border-gray-200">
                Company Name
              </th>
              <th className="text-left px-4 py-3 font-medium border-b border-gray-200">
                Phone
              </th>
              <th className="text-left px-4 py-3 font-medium border-b border-gray-200">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((lead) => {
                const percentage = getPercentage(lead.stage);
                const progressColor = getProgressColor(percentage);

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full ${getAvatarColor(lead.leadName)} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {getInitials(lead.leadName)}
                        </div>
                        <span className="text-gray-800 font-medium">
                          {lead.leadName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{lead.companyIcon}</span>
                        <span className="text-gray-700">{lead.companyName}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                      {lead.phone}
                    </td>

                    <td className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${progressColor} transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-700 font-medium text-xs w-10 text-right">
                          {percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                  No leads found for the selected date range
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default RecentLeads;