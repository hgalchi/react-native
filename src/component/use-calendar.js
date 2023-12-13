import dayjs from "dayjs";
import { useState } from "react";

export const useCalendar = (now) => {
  const [chooseDate, setChooseDate] = useState(now);

  const selDate = (date) => {
    setChooseDate(dayjs(date));
  };
  const prevMonth = () => {
    console.log("이전 달력 조회");
    const newDate = dayjs(chooseDate).subtract(1, "month");
    setChooseDate(newDate);
  };
  const nextMonth = () => {
    console.log("이후 달력 조회");
    const newDate = dayjs(chooseDate).add(1, "month");
    setChooseDate(newDate);
  };

  return {
    chooseDate,
    setChooseDate,
    selDate,
    prevMonth,
    nextMonth,
  };
};
