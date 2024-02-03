import generateCalendarMatrix from '../utils/generateCalendarMatrix';

test('generateCalendarMatrix generates correct matrix for January 2022', () => {
  const month = 0;
  const year = 2020;
  const matrix = generateCalendarMatrix(month, year);
  expect(matrix[0]).toEqual([0, 0, 0, 1, 2, 3, 4]);

  expect(matrix[1]).toEqual([5,6,7,8,9,10,11]);
  expect(matrix[2]).toEqual([12,13,14,15,16,17,18]);
  expect(matrix[3]).toEqual([19,20,21,22,23,24,25]);
  expect(matrix[matrix.length - 1]).toEqual([26,27,28,29,30,31]);
});