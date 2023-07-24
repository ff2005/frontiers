import { useMemo } from "react";
import { getUTCDate } from "../helper";
import { useToday } from "./today";

const referenceDate = getUTCDate(2023, 1, 9, 0, 0, 0);

const getReset = (date: Date) => {
  const d = new Date(
    Math.ceil((date.getTime() + new Date().getTimezoneOffset() * 60000) / 86400000) * 86400000 -
      new Date().getTimezoneOffset() * 60000
  );
  const e = ((d.getTime() - referenceDate.getTime()) / 86400000 - 1) % 14;
  return new Date(d.getTime() + (13 - e) * 86400000);
};

export const useArena = () => {
  const today = useToday();

  const nextReset = useMemo(() => getReset(today), [today]);

  return {
    nextReset,
    getReset,
  };
};
