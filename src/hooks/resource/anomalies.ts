import { useAsset } from "./asset";

export interface Anomalies {
  level: {
    [level: string]: {
      energy: number;
      R1: number[];
      R2: number[];
      R3: number[];
      r1PerEnergy: number[];
      r2PerEnergy: number[];
      r3PerEnergy: number[];
    };
  };
}

export const useAnomalies = () => {
  const { data } = useAsset<Anomalies>('anomalies', (data) => ({
    level: Object.keys(data.level).reduce((levels, l) => {
      const anomaly = data.level[l];
      levels[l] = {
        ...anomaly,
        r1PerEnergy: anomaly["R1"]?.map((a: any) => a / anomaly.energy),
        r2PerEnergy: anomaly["R2"]?.map((a: any) => a / anomaly.energy),
        r3PerEnergy: anomaly["R3"]?.map((a: any) => a / anomaly.energy),
      };
      return levels;
    }, {}),
  }))

  return data;
};
