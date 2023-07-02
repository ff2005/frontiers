import { useAsset } from "./asset";

export interface Campaigns {
  difficulty: {
    [difficulty: string]: {
      level: {
        [level: string]: {
          name: string;
          stage: {
            [stage: string]: {
              energy: number;
              exp: number;
              reward: {
                exp: number;
                equip: {
                  category: string;
                  stars: number[];
                  type: string;
                };
                optional: {
                  credits: number[];
                  mainframe: {
                    quantity: number;
                    stars: number;
                  };
                };
              };
              expPerEnergy: number;
              creditsPerEnergy: number[];
            };
          };
        };
      };
    };
  };
}

export const useCampaigns = () => {
  const { data } = useAsset<Campaigns>("campaigns", (data) => ({
    difficulty: Object.keys(data).reduce(
      (difficulties, d) => ({
        ...difficulties,
        [d]: {
          ...difficulties[d],
          level: {
            ...(difficulties[d]?.level || {}),
            ...Object.keys(data[d]).reduce(
              (levels, l) => ({
                ...levels,
                [l]: {
                  name: data[d][l].name,
                  stage: {
                    ...Object.keys(data[d][l]).reduce((stages, s) => {
                      const reward = data[d][l].reward;
                      if (s !== "reward" && s !== "name") {
                        return {
                          ...stages,
                          [s]: {
                            ...data[d][l][s],
                            reward: {
                              ...reward,
                              ...data[d][l][s].reward,
                              equip: {
                                ...reward.equip,
                                ...data[d][l][s].reward.equip,
                              },
                              optional: {
                                ...reward.optional,
                                ...data[d][l][s].reward.optional,
                              },
                            },
                            creditsPerEnergy: data[d][
                              l
                            ].reward.optional.credits.map(
                              (credits: number) =>
                                credits / data[d][l][s].energy
                            ),
                            expPerEnergy:
                              data[d][l][s].reward.exp / data[d][l][s].energy,
                          },
                        };
                      }
                      return stages;
                    }, {}),
                  },
                },
              }),
              {}
            ),
          },
        },
      }),
      {}
    ),
  }));

  return data;
};
