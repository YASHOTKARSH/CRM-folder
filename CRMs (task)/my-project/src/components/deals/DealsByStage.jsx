import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DealsByStage = ({ data, pipelineFilter, onPipelineFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      {/* Header with Filter */}
      <div className="px-4 sm:px-5 rounded-t-lg py-4 border-b border-gray-200 bg-white flex justify-between items-center gap-2">
        <h3 className="font-bold text-sm sm:text-base text-gray-800">
          Deals By Stage
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
      <div className="flex-1 bg-white rounded-md overflow-x-auto">
        <div style={{ minWidth: `${data.length * 120}px` }}>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
              barCategoryGap="50%" // more gap between bars
              barGap={8} // extra spacing if multiple bars
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#d1d5db"
                vertical={false}
              />

              <XAxis
                dataKey="stage"
                interval={0}
                height={70}
                tick={{ fontSize: 13, fill: "#374151" }}
                axisLine={{ stroke: "#9ca3af" }}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#374151" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#2a9d8f"
                radius={[4, 4, 0, 0]}
                barSize={45} // slightly wider bars
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DealsByStage;
