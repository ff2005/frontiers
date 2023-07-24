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

const affinities = ["antimater", "thermal", "chemical", "electric"];

const cycle = 7;
const duration = 7;

const getAffinity = (date: Date): AllianceRaidAffinityCalendar => {
  const d = new Date(
    Math.ceil((date.getTime() + new Date().getTimezoneOffset() * 60000) / 86400000) * 86400000 -
      new Date().getTimezoneOffset() * 60000
  );
  const start = new Date(
    d.getTime() - Math.ceil(((d.getTime() - referenceDate.getTime()) / 86400000) % cycle) * 86400000
  );
  const end = new Date(start.getTime() + duration * 86400000);
  const a = ((start.getTime() - referenceDate.getTime()) / 86400000 / cycle) % affinities.length;
  return { affinity: affinities[a], start: start, end: end };
};

export const useAlliance = () => {
  const today = useToday();

  const { data } = useAsset<Alliance>("alliance", (data) => {
    const currentAffinity = getAffinity(today);
    const nextAffinities = Array.from(new Array(3)).map((_, i) =>
      getAffinity(new Date(today.getTime() + (i + 1) * cycle * 86400000))
    );

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
