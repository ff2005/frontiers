import { useAsset } from "./asset";

export interface Bounties {
  level: {
    [level: string]: {
      energy: number;
      reward: {
        exp: number;
        credits: number;
      };
      creditsPerEnergy: number;
      expPerEnergy: number;
    };
  };
}

export const useBounties = () => {
  const { data } = useAsset<Bounties>("bounties", (data) => ({
    level: Object.keys(data.level).reduce((levels, l) => {
      const bounty = data.level[l];
      levels[l] = {
        ...bounty,
        creditsPerEnergy: bounty.reward.credits / bounty.energy,
        expPerEnergy: bounty.reward.exp / bounty.energy,
      };
      return levels;
    }, {}),
  }));

  return data;
};
