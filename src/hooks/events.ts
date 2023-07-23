import { useMemo } from "react";
import { getUTCDate } from "../helper";
import { useToday } from "./today";

export interface EventCalendar {
  name: string;
  start: Date;
  end: Date;
}

export interface Event {
  events: string[];
  currentEvents: EventCalendar[];
  nextEvents: EventCalendar[];
  getEvents: (date: Date) => EventCalendar[];
}

const referenceDate = getUTCDate(2023, 1, 4, 0, 0, 0);

const events = ["equipment", "arena", "energy", "recruitment", "promotion", "bounty"];

const getEvents = (date: Date): EventCalendar[] => {
  const d1 = getUTCDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), 0, 0, 0);
  const d2 = getUTCDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate() - 1, 0, 0, 0);
  const e1 = Math.floor(((d1.getTime() - referenceDate.getTime()) / 86400000 / 3) % 6);
  const e2 = Math.floor(((d2.getTime() - referenceDate.getTime()) / 86400000 / 3) % 6);
  const e1Start = new Date(d1.getTime() - (((d1.getTime() - referenceDate.getTime()) / 86400000) % 3) * 86400000);
  const e1End = new Date(e1Start.getTime() + 4 * 86400000);
  const e = [{ name: events[e1], start: e1Start, end: e1End }];
  if (e1 !== e2) {
    const e2Start = new Date(d2.getTime() - (((d2.getTime() - referenceDate.getTime()) / 86400000) % 3) * 86400000);
    const e2End = new Date(e2Start.getTime() + 4 * 86400000);
    e.push({ name: events[e2], start: e2Start, end: e2End });
  }
  return e.reverse();
};

export const useEvents = () => {
  const today = useToday();

  const currentEvents = useMemo(() => getEvents(today), [today]);

  const nextEvents = useMemo(
    () =>
      Array.from(new Array(4))
        .reduce<EventCalendar[]>((e, _, i) => {
          const n = new Date(today.getTime() + (i + 1) * 4 * 86400000);
          return [...e, ...getEvents(n)];
        }, [])
        .slice(0, 6 - currentEvents.length),
    [currentEvents.length, today]
  );

  return {
    events,
    currentEvents,
    nextEvents,
    getEvents,
  } as Event;
};
