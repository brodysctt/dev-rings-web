import { Timestamp } from "firebase/firestore";

export const getMonthAsString = (timestamp: Timestamp) => {
  const month = timestamp.toDate().getMonth();
  return months[month];
};

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
