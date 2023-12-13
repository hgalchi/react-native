import dayjs from "dayjs";

import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

export const height = getStatusBarHeight(true);
export const ITEM_WIDTH = 220;
export const bottomSpace = getBottomSpace();

export const fillEmptyCol = (col, start_Day, end_Day) => {
  const filledCol = [...col];

  const sDay = dayjs(start_Day).day();
  for (let a = 0; a < sDay; a += 1) {
    const d = dayjs(start_Day).subtract(a + 1, "day");
    filledCol.unshift(d);
  }

  const eDay = dayjs(end_Day).day();

  for (let a = 1; a <= 6 - eDay; a += 1) {
    const d = dayjs(end_Day).add(a, "day");
    filledCol.push(d);
  }

  return filledCol;
};

export const getCalendarColumns = (now) => {
  const start_Day = dayjs(now).startOf("month");
  const end_Day = dayjs(now).endOf("month");
  const end = dayjs(end_Day).date();

  const col = [];
  for (let a = 0; a < end; a += 1) {
    const d = dayjs(start_Day).add(a, "day");
    col.push(d);
  }

  const filledCol = fillEmptyCol(col, start_Day, end_Day);
  return filledCol;
};

export const getDayColor = (day) => {
  return day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
};
