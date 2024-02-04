import React, { useState } from "react";

// ... (existing imports)

interface CalendarCellProps {
  day: number;
  selectedYear: number;
  selectedMonth: number;
  holidays: any[];
  isDarkMode: boolean;
  selectedDate: Date | null;
  onCellClick: (date: Date) => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  selectedYear,
  selectedMonth,
  holidays,
  isDarkMode,
  selectedDate,
  onCellClick,
}) => {
  const currentDate = new Date();
  const date = new Date(selectedYear, selectedMonth, day, 6);
  const matchingHolidays = holidays.filter(
    (h) => h.date.iso === date.toISOString().split("T")[0]
  );
  const uniqueHolidays = Array.from(new Set(matchingHolidays.map((h) => h.name))).map((name) => {
    return matchingHolidays.find((h) => h.name === name);
  });
  const cellStyle = {
    backgroundColor:
      selectedDate && selectedDate.toDateString() === date.toDateString()
        ? isDarkMode
          ? "#4B5563" // Your desired color for selected cell in dark mode
          : "#D1D5DB" // Your desired color for selected cell in light mode
        : currentDate.toDateString() === date.toDateString()
        ? "#79b6f7" // Your desired color for today's date
        : "",
  };

  const handleClick = () => {
    if (day !== 0) {
      onCellClick(date);
    }
  };

  return (
    <td
    style={cellStyle}
    onClick={handleClick}
    className={`cursor-pointer border border-gray-600 w-[50px] max-w-[50px] h-[50px] sm:w-[75px] sm:max-w-[75px] sm:h-[75px] 
    md:w-[100px] md:max-w-[100px] md:h-[100px]
    lg:w-[125px] lg:max-w-[125px] lg:h-[100px]
    xl:w-[150px] xl:max-w-[150px] xl:h-[100px]
     ${
       day === 0 ? "bg-gray-400" : ""
     } ${isDarkMode ? "text-white" : "text-gray-900"}`}
  >
    {day !== 0 ? (
      <div className="text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[15px]">
        <span className="text-center">{day}</span>
        {uniqueHolidays.length > 0 && (
          <div>
            {uniqueHolidays.map((holiday, index) => (
              <p
                key={index}
                className="whitespace-nowrap overflow-hidden text-ellipsis border p-1 bg-gray-500 rounded-xl border-black"
              >
                {holiday?.name}
              </p>
            ))}
          </div>
        )}
      </div>
    ) : (
      ""
    )}
  </td>
  );
};

export default CalendarCell;

