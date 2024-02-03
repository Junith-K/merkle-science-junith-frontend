import React from "react";

interface CalendarHeaderProps {
  isDarkMode: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ isDarkMode }) => {
  return (
    <thead>
      <tr className={`w-[50px] max-w-[50px] h-[50px] sm:w-[75px] sm:max-w-[75px] sm:h-[50px] 
      md:w-[100px] md:max-w-[100px]
      lg:w-[125px] lg:max-w-[125px]
      xl:w-[150px] xl:max-w-[150px]
      ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <th
            key={index}
            className={`text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[15px] font-normal border border-gray-600 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CalendarHeader;
