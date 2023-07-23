import { useMemo } from "react";
import { getUTCDate } from "../helper";
import { useToday } from "./today";

const referenceDate = getUTCDate(2023, 1, 9, 0, 0, 0);

const getReset = (date: Date) => {
  const d = getUTCDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  const e = (((d.getTime() - referenceDate.getTime() - 60000) / 86400000) - 1) % 14;
  return 13 - e;
};

const isReset = (date: Date) => getReset(date) === 0;

export const useArena = () => {
  const today = useToday();

  const nextReset = useMemo(() => new Date(today.getTime() + (getReset(today) * 86400000)), [today]);
  
  // for (let d=1; d<30;d++) {
  //   const date = getUTCDate(2023,7,d)
  //   console.log(date.toISOString(), getReset(date))
  // }

  return {
    nextReset,
    isReset,
  };
};
