import React, { useState, useEffect } from "react";
import "./App.css";
import generateCalendarMatrix from "./utils/generateCalendarMatrix";
import { countries } from "./constants/countries";
import { dummy_response } from "./constants/dummy_data";

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [holidays, setHolidays] = useState<Array<any>>([]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        // Simulating API call with dummy data
        // const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=uq9VLD3QZlaN57dtCFGSzwJHjgY2oTXo&country=${selectedCountry}&year=${selectedYear}`);
        // const data = await response.json();

        // Using dummy data instead of API call
        const data = dummy_response;

        if (data.meta.code === 200) {
          setHolidays(data.response.holidays);
        } else {
          console.error("Error fetching holidays:", data.meta.code);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, [selectedYear, selectedCountry]);

  const calendarMatrix = generateCalendarMatrix(selectedMonth, selectedYear);

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="mb-4">
        <label
          htmlFor="year"
          className={`mr-2 text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Select Year:
        </label>
        <select
          id="year"
          onChange={handleYearChange}
          value={selectedYear}
          className={`p-2 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={selectedYear - 5 + index}>
              {selectedYear - 5 + index}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="month"
          className={`mr-2 text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Select Month:
        </label>
        <select
          id="month"
          onChange={handleMonthChange}
          value={selectedMonth}
          className={`p-2 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index}>
              {new Date(2000, index, 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="country"
          className={`mr-2 text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Select Country:
        </label>
        <select
          id="country"
          onChange={handleCountryChange}
          value={selectedCountry}
          className={`p-2 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`text-center p-4 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              setSelectedMonth((prevMonth) =>
                prevMonth === 0 ? 11 : prevMonth - 1
              )
            }
            className={`p-2 ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            } rounded-full transition duration-300`}
          >
            Prev Month
          </button>
          <h2
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={() =>
              setSelectedMonth((prevMonth) =>
                prevMonth === 11 ? 0 : prevMonth + 1
              )
            }
            className={`p-2 ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            } rounded-full transition duration-300`}
          >
            Next Month
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
            } rounded-full transition duration-300`}
          >
            {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <th
                    key={index}
                    className={`p-6 border border-gray-600 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {day}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {calendarMatrix.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const date = new Date(selectedYear, selectedMonth, day, 6);
                  const holiday = holidays.find((h) =>
                    h.date.iso==date.toISOString().split('T')[0]
                  );

                  return (
                    <td
                      key={dayIndex}
                      className={`p-6 border border-gray-600 ${
                        day === 0 ? "bg-gray-400" : ""
                      } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {day !== 0 ? (
                        <div>
                          <span>{day}</span>
                          {holiday && <p className="text-sm">{holiday.name}</p>}
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
