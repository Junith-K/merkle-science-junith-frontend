import { useState, useEffect } from "react";
import generateCalendarMatrix from "../utils/generateCalendarMatrix";
import { dummy_response } from "../constants/dummy_data";

const useCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [holidays, setHolidays] = useState<Array<any>>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
  };
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
  };

  const handlePrevYear = () => {
    setSelectedYear((prevYear) => (prevYear > 1930 ? prevYear - 1 : prevYear));
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => (prevYear < 2030 ? prevYear + 1 : prevYear));
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        // Simulating API call with dummy data
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

  return {
    selectedYear,
    selectedMonth,
    selectedCountry,
    isDarkMode,
    holidays,
    calendarMatrix,
    selectedDate,
    handleYearChange,
    handleMonthChange,
    handleCountryChange,
    toggleDarkMode,
    handleTodayClick,
    handlePrevYear,
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handleCellClick,
  };
};

export default useCalendar;
