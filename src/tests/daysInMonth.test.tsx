import daysInMonth from '../utils/daysInMonth';

test('daysInMonth returns correct number of days for February 2022 (non-leap year)', () => {
  const month = 1;
  const year = 2022;
  const result = daysInMonth(month, year);

  expect(result).toBe(28);
});

test('daysInMonth returns correct number of days for July 2024 (leap year)', () => {
  const month = 6;
  const year = 2024;
  const result = daysInMonth(month, year);

  expect(result).toBe(31);
});