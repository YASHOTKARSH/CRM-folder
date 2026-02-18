import { useState, useMemo } from "react";
import { leads } from "../data/leadsData";
import DateRangePicker from "../components/common/DateRangePicker";

import RecentLeads from "../components/leads/RecentLeads";
import ProjectsByStage from "../components/leads/ProjectsByStage";

const LeadsDashboard = () => {
  const [globalDateRange, setGlobalDateRange] = useState("AllTime");
  const [customDateRange, setCustomDateRange] = useState(null);
  const [recentLeadsDateFilter, setRecentLeadsDateFilter] = useState("AllTime");
  const [projectsDateFilter, setProjectsDateFilter] = useState("AllTime");

  // ✅ Filter function based on date range
  const filterLeadsByDate = (dateRange, customRange = null) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return leads.filter((lead) => {
      const leadDate = new Date(lead.date);
      let startDate;

      switch (dateRange) {
        case "AllTime":
          return true; // ✅ Show all data

        case "Today":
          startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          return leadDate >= startDate && leadDate <= today;

        case "Last5Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 5);
          startDate.setHours(0, 0, 0, 0);
          return leadDate >= startDate && leadDate <= today;

        case "Last15Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 15);
          startDate.setHours(0, 0, 0, 0);
          return leadDate >= startDate && leadDate <= today;

        case "OneMonth":
          startDate = new Date(today);
          startDate.setMonth(startDate.getMonth() - 1);
          startDate.setHours(0, 0, 0, 0);
          return leadDate >= startDate && leadDate <= today;

        case "Custom":
          if (customRange && customRange.startDate && customRange.endDate) {
            const customStart = new Date(customRange.startDate);
            customStart.setHours(0, 0, 0, 0);
            const customEnd = new Date(customRange.endDate);
            customEnd.setHours(23, 59, 59, 999);
            return leadDate >= customStart && leadDate <= customEnd;
          }
          return true;

        default:
          return true;
      }
    });
  };

  // ✅ Generate stage statistics
  const generateStageStats = (data) => {
    const result = {};
    data.forEach((lead) => {
      result[lead.stage] = (result[lead.stage] || 0) + 1;
    });
    return Object.keys(result).map((stage) => ({
      stage,
      count: result[stage],
    }));
  };

  // Handle global date change
  const handleGlobalDateChange = (value, customRange) => {
    setGlobalDateRange(value);
    if (customRange) {
      setCustomDateRange(customRange);
    }
  };

  // ✅ Filtered data
  const recentLeadsData = useMemo(
    () => filterLeadsByDate(recentLeadsDateFilter, customDateRange)
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [recentLeadsDateFilter, customDateRange]
  );

  const projectsData = useMemo(
    () => generateStageStats(filterLeadsByDate(projectsDateFilter, customDateRange)),
    [projectsDateFilter, customDateRange]
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Leads Dashboard
        </h1>
        
        {/* Global Date Range Picker with Data */}
        <div className="w-full sm:w-auto">
          <DateRangePicker
            value={globalDateRange}
            onChange={handleGlobalDateChange}
            data={leads}
          />
        </div>
      </div>

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="h-[400px] sm:h-[500px] rounded-4xl">
          <RecentLeads 
            data={recentLeadsData}
            dateFilter={recentLeadsDateFilter}
            onDateFilterChange={setRecentLeadsDateFilter}
          />
        </div>

        <div className="h-[400px] sm:h-[500px] rounded-4xl">
          <ProjectsByStage 
            data={projectsData}
            dateFilter={projectsDateFilter}
            onDateFilterChange={setProjectsDateFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;