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

const cycle = 3;
const duration = 4;
const overlap = 1;

const getEvent = (date: Date): EventCalendar => {
  const d = new Date(
    Math.ceil((date.getTime() + new Date().getTimezoneOffset() * 60000) / 86400000) * 86400000 -
      new Date().getTimezoneOffset() * 60000
  );
  const start = new Date(
    d.getTime() - Math.ceil(((d.getTime() - referenceDate.getTime()) / 86400000) % cycle) * 86400000
  );
  const end = new Date(start.getTime() + duration * 86400000);
  const e = ((start.getTime() - referenceDate.getTime()) / 86400000 / cycle) % events.length;
  return { name: events[e], start, end };
};

const getEvents = (date: Date): EventCalendar[] => {
  const e1 = getEvent(date);
  const e2 = getEvent(new Date(date.getTime() - overlap * 86400000));
  const e = [e1];
  if (date.getTime() >= e2.start.getTime() && date.getTime() <= e2.end.getTime() && e1.name !== e2.name) {
    e.push(e2);
  }
  return e.reverse();
};

export const useEvents = () => {
  const today = useToday();

  const currentEvents = useMemo(() => getEvents(today), [today]);
  const nextEvents = useMemo(
    () =>
      Array.from(new Array(4))
        .map((_, i) => getEvent(new Date(today.getTime() + (i + 1) * cycle * 86400000)))
        .slice(0, 6 - currentEvents.length),
    [currentEvents, today]
  );

  return {
    events,
    currentEvents,
    nextEvents,
    getEvents,
  } as Event;
};
