import { useAsset } from "./asset";

export interface AllianceRaid {
  speed: number;
  security: number;
}

export interface Alliance {
  token: {
    generation: number;
    max: number;
  };
  raid: {
    normal: AllianceRaid;
    hard: AllianceRaid;
    brutal: AllianceRaid;
    nightmare: AllianceRaid;
  };
}

export const useAlliance = () => {
  const { data } = useAsset<Alliance>('alliance')
  return data;
};
