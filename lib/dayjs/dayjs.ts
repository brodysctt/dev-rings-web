import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";
import minMax from "dayjs/plugin/minMax";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(arraySupport);
dayjs.extend(minMax);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };
