import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const WonDealsStage = ({ data, pipelineFilter, monthFilter, onPipelineFilterChange, onMonthFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filters */}
      <div className="px-4 rounded-t-4xl sm:px-5 py-4 border-b border-gray-200 bg-white">
        <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-2">
          Won Deals Stage
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

      {/* Chart Area - Horizontal */}
      <div className="flex-1 p-2 sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis 
              type="category" 
              dataKey="stage" 
              tick={{ fontSize: 10 }}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Bar
              dataKey="count"
              fill="#10b981"
              radius={[0, 6, 6, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WonDealsStage;