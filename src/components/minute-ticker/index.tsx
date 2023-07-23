import { useEffect, useState } from "react";
import { format, getUTCNow } from "../../helper";

export interface MinuteTickerProps {
  until?: Date
}

export const MinuteTicker = ({ until }: MinuteTickerProps) => {
  const [diff, setDiff] = useState('')

  useEffect(() => {
    let timer = setInterval(() => {
      const n = getUTCNow()
      const d = until ? format.toTimeDescription(Math.max(0, until.getTime() - n.getTime()) / 60000) : ''
      if (d && diff !== d) {
        setDiff(d);
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [diff, until])

  return (
    <span>{diff}</span>
  );
};
