import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthSelector from '../components/MonthSelector';

test('MonthSelector renders correctly', () => {
  const selectedMonth = 5;
  const onMonthChange = jest.fn();

  const { getByLabelText } = render(
    <MonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} isDarkMode={false} />
  );

  const monthLabel = getByLabelText(/Select Month/i);
  const monthSelect = getByLabelText(/Select Month/i) as HTMLSelectElement;

  expect(monthLabel).toBeInTheDocument();
  expect(monthSelect).toBeInTheDocument();
  expect(monthSelect.value).toBe('5');
});

test('MonthSelector calls onMonthChange on selection change', () => {
  const selectedMonth = 5;
  const onMonthChange = jest.fn();

  const { getByLabelText } = render(
    <MonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} isDarkMode={false} />
  );

  const monthSelect = getByLabelText(/Select Month/i) as HTMLSelectElement;

  fireEvent.change(monthSelect, { target: { value: '6' } });

  expect(onMonthChange).toHaveBeenCalledWith(6);
});
