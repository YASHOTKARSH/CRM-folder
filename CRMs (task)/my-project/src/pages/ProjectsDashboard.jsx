import { useState, useMemo } from "react";
import { projects } from "../data/projectsData";
import DateRangePicker from "../components/common/DateRangePicker";

import RecentProjects from "../components/projects/RecentProjects";
import ProjectByStage from "../components/projects/ProjectByStage";
import ProjectsByStage from "../components/projects/ProjectsByStage";
import LeadsByStage from "../components/projects/LeadsByStage";
import WonDealsStage from "../components/projects/WonDealsStage";

const ProjectsDashboard = () => {
  const [globalDateRange, setGlobalDateRange] = useState("Last30Days");
  
  // Individual filters for each component
  const [recentProjectsDateFilter, setRecentProjectsDateFilter] = useState("Last30Days");
  const [projectByStageFilter, setProjectByStageFilter] = useState("Last30Days");
  const [projectsByStagePipelineFilter, setProjectsByStagePipelineFilter] = useState("Sales");
  const [projectsStageMonthFilter, setProjectsStageMonthFilter] = useState("Last3Months");
  const [leadsStageFilter, setLeadsStageFilter] = useState("Marketing");
  const [leadsMonthFilter, setLeadsMonthFilter] = useState("Last3Months");
  const [wonStageFilter, setWonStageFilter] = useState("Marketing");
  const [wonMonthFilter, setWonMonthFilter] = useState("Last3Months");

  // Filter function based on date range
  const filterProjectsByDate = (dateRange) => {
    const today = new Date();
    
    return projects.filter((project) => {
      const projectDate = new Date(project.date);
      let startDate;

      switch (dateRange) {
        case "Today":
          startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          return projectDate >= startDate;

        case "Yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday.setHours(0, 0, 0, 0);
          const yesterdayEnd = new Date(yesterday);
          yesterdayEnd.setHours(23, 59, 59, 999);
          return projectDate >= yesterday && projectDate <= yesterdayEnd;

        case "Last7Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 7);
          return projectDate >= startDate;

        case "Last30Days":
          startDate = new Date(today);
          startDate.setDate(startDate.getDate() - 30);
          return projectDate >= startDate;

        case "Last3Months":
          startDate = new Date(today);
          startDate.setMonth(startDate.getMonth() - 3);
          return projectDate >= startDate;

        case "ThisMonth":
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          return projectDate >= startDate;

        case "LastMonth":
          startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
          return projectDate >= startDate && projectDate <= endDate;

        default:
          return true;
      }
    });
  };

  // Filter by pipeline/source
  const filterByPipeline = (data, pipelineFilter) => {
    if (pipelineFilter === "All") return data;
    // For projects, we'll use the source field as pipeline
    return data.filter(project => {
      if (pipelineFilter === "Sales") {
        return ["Campaigns", "Referrals"].includes(project.source);
      } else if (pipelineFilter === "Marketing") {
        return ["Google", "Paid Social"].includes(project.source);
      }
      return true;
    });
  };

  // Generate statistics by source (for donut chart)
  const generateSourceStats = (data) => {
    const result = {};
    data.forEach((project) => {
      result[project.source] = (result[project.source] || 0) + 1;
    });
    return Object.keys(result).map((source) => ({
      source,
      count: result[source],
    }));
  };

  // Generate statistics by stage
  const generateStageStats = (data) => {
    const result = {};
    data.forEach((project) => {
      result[project.stage] = (result[project.stage] || 0) + 1;
    });
    return Object.keys(result).map((stage) => ({
      stage,
      count: result[stage],
    }));
  };

  // Filtered data for each component
  const recentProjectsData = useMemo(
    () => filterProjectsByDate(recentProjectsDateFilter).sort((a, b) => new Date(b.date) - new Date(a.date)),
    [recentProjectsDateFilter]
  );

  const projectByStageData = useMemo(
    () => generateSourceStats(filterProjectsByDate(projectByStageFilter)),
    [projectByStageFilter]
  );

  const projectsStageData = useMemo(
    () => generateStageStats(
      filterByPipeline(
        filterProjectsByDate(projectsStageMonthFilter),
        projectsByStagePipelineFilter
      )
    ),
    [projectsStageMonthFilter, projectsByStagePipelineFilter]
  );

  const leadsStageData = useMemo(
    () => generateStageStats(
      filterByPipeline(
        filterProjectsByDate(leadsMonthFilter),
        leadsStageFilter
      ).filter(p => ["Conversation", "Follow Up", "Inpipeline"].includes(p.stage))
    ),
    [leadsMonthFilter, leadsStageFilter]
  );

  const wonStageData = useMemo(
    () => generateStageStats(
      filterByPipeline(
        filterProjectsByDate(wonMonthFilter),
        wonStageFilter
      ).filter(p => ["Conversation", "Follow Up", "Inpipeline"].includes(p.stage))
    ),
    [wonMonthFilter, wonStageFilter]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Project Dashboard
        </h1>
        
        {/* Global Date Range Picker */}
        <div className="w-full sm:w-auto">
          <DateRangePicker
            value={globalDateRange}
            onChange={setGlobalDateRange}
          />
        </div>
      </div>

      {/* First Row: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="h-[350px] sm:h-[400px]">
          <RecentProjects 
            data={recentProjectsData}
            dateFilter={recentProjectsDateFilter}
            onDateFilterChange={setRecentProjectsDateFilter}
          />
        </div>
        
        <div className="h-[350px] sm:h-[400px]">
          <ProjectByStage 
            data={projectByStageData}
            dateFilter={projectByStageFilter}
            onDateFilterChange={setProjectByStageFilter}
          />
        </div>
      </div>

      {/* Second Row: 1 columns */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div className="h-[400px] sm:h-[450px]">
          <ProjectsByStage 
            data={projectsStageData}
            pipelineFilter={projectsByStagePipelineFilter}
            monthFilter={projectsStageMonthFilter}
            onPipelineFilterChange={setProjectsByStagePipelineFilter}
            onMonthFilterChange={setProjectsStageMonthFilter}
          />
        </div>
      </div>
        {/* Third Row: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="h-[400px] sm:h-[450px]">
          <LeadsByStage 
            data={leadsStageData}
            pipelineFilter={leadsStageFilter}
            monthFilter={leadsMonthFilter}
            onPipelineFilterChange={setLeadsStageFilter}
            onMonthFilterChange={setLeadsMonthFilter}
          />
        </div>
        
        <div className="h-[400px] sm:h-[450px]">
          <WonDealsStage 
            data={wonStageData}
            pipelineFilter={wonStageFilter}
            monthFilter={wonMonthFilter}
            onPipelineFilterChange={setWonStageFilter}
            onMonthFilterChange={setWonMonthFilter}
          />
        </div>
        </div>

    </div>
  );
};

export default ProjectsDashboard;