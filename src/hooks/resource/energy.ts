import { useAsset } from "./asset";

export interface Energy {
  pack: number;
  generation: {
    minutes: number;
    max: number;
    minutesToMaxGeneration: number;
  };
  generatedPerDay: number;
  daily: {
    "Limited Bundles": { pack: number };
    "Platinum Market": { pack: number };
    "Alliance": { energy: number[] };
    "Playtime Rewards": { energy: number };
  };
  totalPerDay: number[];
}

export const useEnergy = () => {
  const { data } = useAsset<Energy>("energy", (data) => {
    const minutesToMaxGeneration =
      data.generation.max * data.generation.minutes;
    const generatedPerDay = (24 * 60) / data.generation.minutes;
    const totalPerDay = [
      generatedPerDay +
        data.daily["Alliance"].energy[0] +
        data.daily["Limited Bundles"].pack * data.pack +
        data.daily["Platinum Market"].pack * data.pack +
        data.daily["Playtime Rewards"].energy,
      generatedPerDay +
        data.daily["Alliance"].energy[1] +
        data.daily["Limited Bundles"].pack * data.pack +
        data.daily["Platinum Market"].pack * data.pack +
        data.daily["Playtime Rewards"].energy,
    ];
    return {
      ...data,
      generation: {
        ...data.generation,
        minutesToMaxGeneration,
      },
      generatedPerDay,
      totalPerDay,
    };
  });

  return data;
};
