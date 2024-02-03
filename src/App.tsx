import React from "react";
import "./App.css";
import { countries } from "./constants/countries";
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import useCalendar from "./hooks/useCalendar";
import YearSelector from "./components/YearSelector";
import MonthSelector from "./components/MonthSelector";
import CountrySelector from "./components/CountrySelector";
import CalendarCell from "./components/CalendarCell";
import CalendarHeader from "./components/CalendarHeader";

const App: React.FC = () => {
  const {
    selectedYear,
    selectedMonth,
    selectedCountry,
    isDarkMode,
    holidays,
    handleYearChange,
    handleMonthChange,
    handleCountryChange,
    toggleDarkMode,
    handleTodayClick,
    handlePrevYear,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    calendarMatrix,
    selectedDate,
    handleCellClick,
  } = useCalendar();

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white dark-mode-scroll" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className={`flex justify-between items-center w-full px-4 py-3 ${
          isDarkMode
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-900"
      }`}>
        <div>Calendar UI</div>
        <button
          onClick={toggleDarkMode}
          className={`h-min px-4 py-2 ${
            isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-900"
          } flex items-center justify-center transition duration-300`}
        >
          {isDarkMode ? <RiSunFill /> : <RiMoonFill />}
        </button>
      </div>
      
      <div className="mb-2 w-full flex flex-col sm:flex-row p-4 justify-around items-center font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px]">
        <YearSelector
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          isDarkMode={isDarkMode}
        />
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          isDarkMode={isDarkMode}
        />
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
          countries={countries}
          isDarkMode={isDarkMode}
        />
        <button
          onClick={handleTodayClick}
          className={`h-min px-4 py-2 max-sm:mb-2 ${
            isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-900"
          } rounded-full transition duration-300`}
        >
          Today
        </button>
      </div>
      
      <div
        className={`text-center p-4 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <button
              onClick={handlePrevYear}
              disabled={selectedYear === 1930}
              className={`p-2 mr-2 font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px] ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              } rounded-full transition duration-300 ${selectedYear === 1930 ? 'cursor-not-allowed' : ''}`}
            >
              Prev Year
            </button>
            <button
              onClick={handlePrevMonth}
              className={`p-2 font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px] ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              } rounded-full transition duration-300`}
            >
              Prev Month
            </button>
          </div>

          <h2
            className={`text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div>
            <button
              onClick={handleNextMonth}
              className={`p-2 mr-2 font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px] ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              } rounded-full transition duration-300`}
            >
              Next Month
            </button>
            <button
              onClick={handleNextYear}
              disabled={selectedYear === 2030}
              className={`p-2 font-light text-[9px] sm:text-[11px] md:text-[13px] lg:text-sm xl:text-[16px] ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              } rounded-full transition duration-300 ${selectedYear === 2030 ? 'cursor-not-allowed' : ''}`}
            >
              Next Year
            </button>
          </div>
        </div>
        <table className="">
          <CalendarHeader  isDarkMode={isDarkMode} />
          <tbody>
            {calendarMatrix.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <CalendarCell
                  key={dayIndex}
                  day={day}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  holidays={holidays}
                  isDarkMode={isDarkMode}
                  selectedDate={selectedDate}
                  onCellClick={handleCellClick}
                />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
