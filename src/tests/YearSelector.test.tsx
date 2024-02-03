import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearSelector from '../components/YearSelector';

test('YearSelector renders correctly', () => {
  const selectedYear = 2022;
  const onYearChange = jest.fn();

  const { getByLabelText } = render(
    <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} isDarkMode={false} />
  );

  const yearLabel = getByLabelText(/Select Year/i);
  const yearSelect = getByLabelText(/Select Year/i) as HTMLSelectElement;

  expect(yearLabel).toBeInTheDocument();
  expect(yearSelect).toBeInTheDocument();
  expect(yearSelect.value).toBe('2022');
});

test('YearSelector calls onYearChange on selection change', () => {
  const selectedYear = 2022;
  const onYearChange = jest.fn();

  const { getByLabelText } = render(
    <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} isDarkMode={false} />
  );

  const yearSelect = getByLabelText(/Select Year/i) as HTMLSelectElement;

  fireEvent.change(yearSelect, { target: { value: '2023' } });

  expect(onYearChange).toHaveBeenCalledWith(2023);
});
