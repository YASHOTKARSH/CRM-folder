import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ProjectByStage = ({ data, dateFilter, onDateFilterChange }) => {
  // Define colors matching the image
  const COLORS = {
    Campaigns: "#7c3aed",     // Purple
    Google: "#f59e0b",        // Orange
    Referrals: "#3b82f6",     // Blue
    "Paid Social": "#ef4444", // Red
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Project By Stage
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

      {/* Chart Area */}
      <div className="flex-1 p-2 sm:p-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.source] || "#94a3b8"} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry) => (
                <span className="text-xs sm:text-sm text-gray-700">
                  {value} - {entry.payload.count}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectByStage;