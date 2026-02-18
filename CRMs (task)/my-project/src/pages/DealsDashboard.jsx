import { useState, useMemo } from "react";
import { deals } from "../data/dealsData";
import DateRangePicker from "../components/common/DateRangePicker";

import RecentDeals from "../components/deals/RecentDeals";
import DealsByStage from "../components/deals/DealsByStage";
import LostDeals from "../components/deals/LostDeals";
import WonDeals from "../components/deals/WonDeals";
import DealsByYear from "../components/deals/DealsByYear";

const DealsDashboard = () => {
  const [globalDateRange, setGlobalDateRange] = useState("AllTime");
  const [customDateRange, setCustomDateRange] = useState(null);
  
  // Individual filters for each component
  const [recentDealsDateFilter, setRecentDealsDateFilter] = useState("AllTime");
  const [stagesPipelineFilter, setStagesPipelineFilter] = useState("All");
  const [lostPipelineFilter, setLostPipelineFilter] = useState("All");
  const [wonPipelineFilter, setWonPipelineFilter] = useState("All");
  const [yearPipelineFilter, setYearPipelineFilter] = useState("All");

  // Filter function based on date range
  const filterDealsByDate = (dateRange, customRange = null) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return deals.filter((deal) => {
      const dealDate = new Date(deal.date);
      let startDate;

      switch (dateRange) {
        case "AllTime":
          return true; // Show all data

        case "Today":
          startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          return dealDate >= startDate && dealDate <= today;

        case "Last5Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 5);
          startDate.setHours(0, 0, 0, 0);
          return dealDate >= startDate && dealDate <= today;

        case "Last15Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 15);
          startDate.setHours(0, 0, 0, 0);
          return dealDate >= startDate && dealDate <= today;

        case "OneMonth":
          startDate = new Date(today);
          startDate.setMonth(startDate.getMonth() - 1);
          startDate.setHours(0, 0, 0, 0);
          return dealDate >= startDate && dealDate <= today;

        case "Custom":
          if (customRange && customRange.startDate && customRange.endDate) {
            const customStart = new Date(customRange.startDate);
            customStart.setHours(0, 0, 0, 0);
            const customEnd = new Date(customRange.endDate);
            customEnd.setHours(23, 59, 59, 999);
            return dealDate >= customStart && dealDate <= customEnd;
          }
          return true;

        default:
          return true;
      }
    });
  };

  // Filter by pipeline
  const filterByPipeline = (data, pipelineFilter) => {
    if (pipelineFilter === "All") return data;
    return data.filter(deal => deal.pipeline === pipelineFilter);
  };

  // Generate stage statistics
  const generateStageStats = (data) => {
    const result = {};
    data.forEach((deal) => {
      result[deal.stage] = (result[deal.stage] || 0) + 1;
    });
    return Object.keys(result).map((stage) => ({
      stage,
      count: result[stage],
    }));
  };

  // Handle global date range change
  const handleGlobalDateChange = (value, customRange) => {
    setGlobalDateRange(value);
    if (customRange) {
      setCustomDateRange(customRange);
    }
  };

  // Filtered data for each component
  const recentDealsData = useMemo(
    () => filterDealsByDate(recentDealsDateFilter, customDateRange).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [recentDealsDateFilter, customDateRange]
  );

  const stageData = useMemo(
    () => generateStageStats(filterByPipeline(filterDealsByDate(globalDateRange, customDateRange), stagesPipelineFilter)),
    [globalDateRange, customDateRange, stagesPipelineFilter]
  );

  const lostData = useMemo(
    () => generateStageStats(
      filterByPipeline(filterDealsByDate(globalDateRange, customDateRange), lostPipelineFilter)
        .filter((d) => d.status === "Lost")
    ),
    [globalDateRange, customDateRange, lostPipelineFilter]
  );

  const wonData = useMemo(
    () => generateStageStats(
      filterByPipeline(filterDealsByDate(globalDateRange, customDateRange), wonPipelineFilter)
        .filter((d) => d.status === "Won")
    ),
    [globalDateRange, customDateRange, wonPipelineFilter]
  );

  const yearData = useMemo(
    () => filterByPipeline(filterDealsByDate(globalDateRange, customDateRange), yearPipelineFilter),
    [globalDateRange, customDateRange, yearPipelineFilter]
  );

  return (
    <div className="min-h-screen w- bg-gray-50 p-4 sm:p-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Deals Dashboard
        </h1>
        
        {/* Global Date Range Picker with Data */}
        <div className="w-full sm:w-auto">
          <DateRangePicker
            value={globalDateRange}
            onChange={handleGlobalDateChange}
            data={deals}
          />
        </div>
      </div>

      {/* 2x2 Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="h-[350px] sm:h-[400px] rounded-lg">
          <RecentDeals 
            data={recentDealsData}
            dateFilter={recentDealsDateFilter}
            onDateFilterChange={setRecentDealsDateFilter}
          />
        </div>
        
        <div className="h-[350px] sm:h-[400px]">
          <DealsByStage 
            data={stageData}
            pipelineFilter={stagesPipelineFilter}
            onPipelineFilterChange={setStagesPipelineFilter}
          />
        </div>
        
        <div className="h-[350px] sm:h-[400px]">
          <LostDeals 
            data={lostData}
            pipelineFilter={lostPipelineFilter}
            onPipelineFilterChange={setLostPipelineFilter}
          />
        </div>
        
        <div className="h-[350px] sm:h-[400px]">
          <WonDeals 
            data={wonData}
            pipelineFilter={wonPipelineFilter}
            onPipelineFilterChange={setWonPipelineFilter}
          />
        </div>
      </div>

      {/* Full width chart - Responsive */}
      <div className="h-[350px] sm:h-[400px]">
        <DealsByYear 
          data={yearData}
          pipelineFilter={yearPipelineFilter}
          onPipelineFilterChange={setYearPipelineFilter}
        />
      </div>
    </div>
  );
};

export default DealsDashboard;