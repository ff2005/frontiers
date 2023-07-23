import { useEffect, useState } from "react";
import { getUTCDate } from "../helper";

const toDateWithoutSecounds = (date: Date) => {
  const d = new Date(date.getTime());
  d.setUTCSeconds(0);
  return d;
};

export const useToday = () => {
  const [today, setToday] = useState(toDateWithoutSecounds(getUTCDate()));

  useEffect(() => {
    let timer = setInterval(() => {
      const t = toDateWithoutSecounds(getUTCDate());
      if (t.toISOString() !== today.toISOString()) {
        setToday(t);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [today]);

  return today;
};
