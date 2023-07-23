import { getUTCDate } from "../../helper";
import { useToday } from "../today";
import { useAsset } from "./asset";

export interface AllianceRaid {
  speed: number;
  security: number;
}
export interface AllianceRaidAffinityCalendar {
  affinity: string;
  start: Date;
  end: Date;
}

export interface Alliance {
  raid: {
    token: {
      generation: number;
      max: number;
    };
    level: {
      normal: AllianceRaid;
      hard: AllianceRaid;
      brutal: AllianceRaid;
      nightmare: AllianceRaid;
    };
    affinities: string[];
    currentAffinity: AllianceRaidAffinityCalendar;
    nextAffinities: AllianceRaidAffinityCalendar[];
    getAffinity: (date: Date) => AllianceRaidAffinityCalendar;
  };
}

const referenceDate = getUTCDate(2023, 1, 1, 0, 0, 0);

const affinities = ["Electric", "Antimater", "Thermal", "Chemical"];

const getAffinity = (date: Date): AllianceRaidAffinityCalendar => {
  const d = getUTCDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), 0, 0, 0);
  const a = Math.floor(Math.ceil(Math.floor((d.getTime() - referenceDate.getTime()) / 86400000) / 7) % 4);
  const start = new Date(d.getTime() - d.getUTCDay() * 86400000);
  const end = new Date(start.getTime() + 7 * 86400000);
  return { affinity: affinities[a], start: start, end: end };
};

export const useAlliance = () => {
  const today = useToday();

  const { data } = useAsset<Alliance>("alliance", (data) => {
    const currentAffinity = getAffinity(today);

    const nextAffinities = Array.from(new Array(3)).reduce<any[]>((e, _, i) => {
      const n = new Date(today.getTime() + (i + 1) * 7 * 86400000);
      return [...e, getAffinity(n)];
    }, []);

    return {
      ...data,
      raid: {
        ...data.raid,
        affinities,
        currentAffinity,
        nextAffinities,
        getAffinity,
      },
    };
  });

  return data;
};
