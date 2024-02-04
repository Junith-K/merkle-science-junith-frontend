import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import generateCalendarMatrix from "../utils/generateCalendarMatrix";

const API_KEY = "uq9VLD3QZlaN57dtCFGSzwJHjgY2oTXo";
const API_URL = "https://calendarific.com/api/v2/holidays";

const useCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("US"); // Default to US
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedHolidays, setCachedHolidays] = useState<{ [key: string]: any }>({});

  // Debouncing function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleYearChange = debounce((year: number) => {
    setSelectedYear(year);
  }, 1000);

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

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const cacheKey = `${selectedCountry}-${selectedYear}`;
      if (cachedHolidays[cacheKey]) {
        setCachedHolidays((prevCachedHolidays) => ({
          ...prevCachedHolidays,
          [cacheKey]: prevCachedHolidays[cacheKey],
        }));
      } else {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            country: selectedCountry,
            year: selectedYear,
          },
        });
  
        if (response.status === 200) {
          const holidaysData = response.data.response.holidays;
          setCachedHolidays((prevCachedHolidays) => ({
            ...prevCachedHolidays,
            [cacheKey]: holidaysData,
          }));
        } else {
          console.error("Error fetching holidays:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [selectedYear, selectedCountry]);

  const holidays = useMemo(() => {
    return cachedHolidays[`${selectedCountry}-${selectedYear}`] || [];
  }, [cachedHolidays, selectedCountry, selectedYear]);

  const calendarMatrix = generateCalendarMatrix(selectedMonth, selectedYear);

  return {
    selectedYear,
    selectedMonth,
    selectedCountry,
    isDarkMode,
    holidays,
    calendarMatrix,
    selectedDate,
    loading,
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
