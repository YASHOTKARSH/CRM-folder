import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DealsByYear = ({ data, pipelineFilter, onPipelineFilterChange }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyTotals = {};

  data.forEach((deal) => {
    if (!deal.date) return;

    const dateObj = new Date(deal.date);
    if (isNaN(dateObj)) return;

    const month = dateObj.toLocaleString("default", { month: "short" });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(deal.value);
  });

  const chartData = months.map((month) => ({
    month,
    value: monthlyTotals[month] || 0,
  }));

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 sm:px-5 rounded-t-lg py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Deals by Year
        </h3>
        
        {/* Pipeline Filter */}
        <select
          value={pipelineFilter}
          onChange={(e) => onPipelineFilterChange(e.target.value)}
          className="px-2 sm:px-3 py-1 text-xs drop-shadow  inset-shadow-zinc-500 border hover:bg-gray-100  border-zinc-300 rounded bg-white focus:outline-none"
        >
          <option value="All">All Pipelines</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-2 sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 3 }}
              activeDot={{ r: 5 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DealsByYear;