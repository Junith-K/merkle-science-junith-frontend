import daysInMonth from "./daysInMonth";

const generateCalendarMatrix = (month: number, year: number): number[][] => {
    const days = daysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const matrix: number[][] = [[]];
    let currentWeek = 0;
  
    for (let i = 1; i <= days; i++) {
      if (i === 1) {
        for (let j = 0; j < firstDayOfMonth; j++) {
          matrix[currentWeek].push(0);
        }
      }
  
      matrix[currentWeek].push(i);
  
      if ((i + firstDayOfMonth) % 7 === 0 && i < days) {
        matrix.push([]);
        currentWeek++;
      }
    }
  
    return matrix;
};

export default generateCalendarMatrix