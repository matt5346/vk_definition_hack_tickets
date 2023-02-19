import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const unixToDate = (unix: number, format = "DD.MM.YYYY") => {
  return dayjs.unix(unix).format(format);
};

export const getDayjs = (date?: number) => {
  return date ? dayjs.unix(date) : dayjs();
};

export const getTimeRemaining = (endtime: number) => {
  let t = endtime - new Date().getTime();
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
};
