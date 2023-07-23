import { useAsset } from "./asset";

export interface Bounties {
  level: {
    [level: string]: {
      energy: number;
      reward: {
        exp: number;
        credits: number;
        expPerEnergy: number;
        creditsPerEnergy: number;
      };
    };
  };
}

export const useBounties = () => {
  const { data } = useAsset<Bounties>("bounties", (data) => ({
    level: Object.keys(data.level).reduce((levels, l) => {
      const bounty = data.level[l];
      levels[l] = {
        ...bounty,
        reward: {
          ...bounty.reward,
          expPerEnergy: bounty.reward.exp / bounty.energy,
          creditsPerEnergy: bounty.reward.credits / bounty.energy,
        }
      };
      return levels;
    }, {}),
  }));

  return data;
};
