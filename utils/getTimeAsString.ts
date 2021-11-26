import { Timestamp } from "firebase/firestore";

export const getTimeAsString = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours > 11;
  return `${isPM ? hours - 12 : hours}:${minutes < 10 ? "0" : ""}${minutes} ${
    isPM ? "PM" : "AM"
  }`;
};
