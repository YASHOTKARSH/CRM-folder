const ProjectsByStage = ({ data, pipelineFilter, monthFilter, onPipelineFilterChange, onMonthFilterChange }) => {
  // Stage colors
  const stageColors = {
    Inpipeline: "#8b5cf6",
    "Follow Up": "#06b6d4",
    "Schedule Service": "#f59e0b",
    Conversation: "#14b8a6",
    Won: "#10b981",
    Lost: "#ef4444",
  };

  // Sort stages in funnel order
  const stageOrder = ["Inpipeline", "Follow Up", "Schedule Service", "Conversation", "Won", "Lost"];
  const sortedData = stageOrder
    .map(stage => data.find(d => d.stage === stage))
    .filter(Boolean);

  // Calculate max for width percentage
  const maxCount = Math.max(...sortedData.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filters */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white">
        <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-2">
          Projects By Stage
        </h3>
        <div className="flex flex-wrap gap-2">
          {/* Pipeline Filter */}
          <select
            value={pipelineFilter}
            onChange={(e) => onPipelineFilterChange(e.target.value)}
            className="px-2 sm:px-3 py-1 text-xs drop-shadow  inset-shadow-zinc-500 border hover:bg-gray-100  border-zinc-300 rounded bg-white focus:outline-none"
          >
            <option value="All">All Pipelines</option>
            <option value="Sales">Sales Pipeline</option>
            <option value="Marketing">Marketing Pipeline</option>
          </select>
          
          {/* Month Filter */}
          <select
            value={monthFilter}
            onChange={(e) => onMonthFilterChange(e.target.value)}
            className="px-2 sm:px-3 py-1 text-xs drop-shadow  inset-shadow-zinc-500 border hover:bg-gray-100  border-zinc-300 rounded bg-white focus:outline-none"
          >
            <option value="Last7Days">Last 7 days</option>
            <option value="Last30Days">Last 30 days</option>
            <option value="Last3Months">Last 3 months</option>
            <option value="ThisMonth">This Month</option>
          </select>
        </div>
      </div>

      {/* Funnel Chart */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center gap-1 sm:gap-2">
        {sortedData.map((item) => {
          const widthPercent = (item.count / maxCount) * 100;
          const leftMargin = ((100 - widthPercent) / 2);

          return (
            <div key={item.stage} className="flex items-center">
              <div
                className="relative h-10 sm:h-12 rounded flex items-center justify-center text-white font-bold text-xs transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: stageColors[item.stage],
                  width: `${widthPercent}%`,
                  marginLeft: `${leftMargin}%`,
                }}
              >
                {item.stage} - ${item.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        This data collected based on the Projects for last 30 days
      </div>
    </div>
  );
};

export default ProjectsByStage;