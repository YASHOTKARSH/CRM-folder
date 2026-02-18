import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ProjectsByStage = ({ data, dateFilter, onDateFilterChange }) => {
  const COLORS = {
    Inpipeline: "#3b82f6",
    "Follow Up": "#10b981",
    "Schedule Service": "#f59e0b",
    Conversation: "#ef4444",
  };

  const renderCustomLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Projects By Stage
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

      {/* Chart Area */}
      <div className="flex-1 p-4 flex items-center justify-center">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="stage"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={renderCustomLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.stage] || "#94a3b8"} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500">
            <p>No data available for the selected date range</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsByStage;