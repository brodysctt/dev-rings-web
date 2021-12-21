export const getMonthName = (month: number) => {
  return months[month - 1];
};

// TODO: Refactor this with Dayjs

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
