import { useState, useRef, useEffect } from "react";

const DateRangePicker = ({ value, onChange, data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateRanges = [
    { label: "All Time", value: "AllTime" },
    { label: "Today", value: "Today" },
    { label: "Last 5 days", value: "Last5Days" },
    { label: "Last 15 days", value: "Last15Days" },
    { label: "One Month", value: "OneMonth" },
    { label: "Custom Range", value: "Custom" },
  ];

  // Get actual date range from data
  const getDataDateRange = () => {
    if (!data || data.length === 0) {
      return { minDate: new Date(), maxDate: new Date() };
    }

    const dates = data
      .map(item => new Date(item.date))
      .filter(date => !isNaN(date));

    if (dates.length === 0) {
      return { minDate: new Date(), maxDate: new Date() };
    }

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return { minDate, maxDate };
  };

  // Calculate display text based on actual data or filter
  const getDisplayText = () => {
    const today = new Date();
    let startDate, endDate;

    switch (value) {
      case "AllTime":
        const { minDate, maxDate } = getDataDateRange();
        startDate = minDate;
        endDate = maxDate;
        break;

      case "Today":
        return today.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        });

      case "Last5Days":
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 5);
        endDate = today;
        break;

      case "Last15Days":
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 15);
        endDate = today;
        break;

      case "OneMonth":
        startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - 1);
        endDate = today;
        break;

      case "Custom":
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          endDate = new Date(customEndDate);
          break;
        }
        return "Select Custom Range";

      default:
        const range = getDataDateRange();
        startDate = range.minDate;
        endDate = range.maxDate;
    }

    const formatDate = (date) =>
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      });

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleSelect = (rangeValue) => {
    if (rangeValue === "Custom") {
      setShowCalendar(true);
    } else {
      onChange(rangeValue);
      setIsOpen(false);
      setShowCalendar(false);
    }
  };

  const handleCustomApply = () => {
    if (customStartDate && customEndDate) {
      onChange("Custom", { startDate: customStartDate, endDate: customEndDate });
      setIsOpen(false);
      setShowCalendar(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for max attribute
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get min date from data
  const getMinDateString = () => {
    const { minDate } = getDataDateRange();
    return minDate.toISOString().split('T')[0];
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Date Range Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-full px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2 min-w-0">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="truncate">{getDisplayText()}</span>
        </div>
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 left-0 sm:left-auto mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {!showCalendar ? (
            // Quick Select Options
            <div className="py-1">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleSelect(range.value)}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 ${
                    value === range.value && range.value !== "Custom"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          ) : (
            // Custom Calendar
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Select Custom Range
              </h4>
              
              {/* Start Date */}
              <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  min={getMinDateString()}
                  max={getTodayString()}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* End Date */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  min={customStartDate || getMinDateString()}
                  max={getTodayString()}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowCalendar(false);
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }}
                  className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomApply}
                  disabled={!customStartDate || !customEndDate}
                  className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;