import type { Log } from "components";

export const getFirstLogDate = (logs: Log[]) => {
  const sortedLogs = logs
    .map((log: Log) => {
      const [dateString] = log;
      return Date.parse(dateString);
    })
    .sort();
  return new Date(sortedLogs[0]);
};
