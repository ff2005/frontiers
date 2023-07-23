import { useAsset } from "./asset";

export interface ShipUpgrade {
  exp: number;
  sum: number;
}

export interface ShipRank {
  upgrade: number;
  need: {
    ship: number;
    rank: number;
  };
}

export interface ShipRankCalcMainframes {
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

export interface Ship {
  upgrade: {
    [upgrade: number]: ShipUpgrade;
  };
  rank: {
    [rank: number]: ShipRank;
  };
  calcUpgrade: (upgrade: number) => any;
  calcRank: (rank: number, mainframes?: ShipRankCalcMainframes) => any;
}

const calculations = (ranks: { [rank: number]: ShipRank }, upgrades: { [upgrade: number]: ShipUpgrade }) => {
  const calcUpgrade = (upgrade: number, mainframes?: ShipRankCalcMainframes) => {
    if (upgrade <= 20) {
      if (mainframes?.[2]) {
        return { exp: 0, ships: 0, mainframes: { 2: 1 } };
      }
      return { exp: upgrades[upgrade].sum, ships: 1, mainframes: {} };
    }
    console.log('r', Math.floor(upgrade / 10))
    const rank = calcRank(Math.floor(upgrade / 10), mainframes);
    return {
      exp: rank.exp + upgrades[upgrade].sum,
      ships: rank.ships,
      mainframes: rank.mainframes,
    };
  };

  const calcRank = (rank: number, mainframes?: ShipRankCalcMainframes): any => {
    const r = ranks[rank];
    if (r) {
      const ship = calcUpgrade(r.upgrade, mainframes);
      const usedMainframes = {
        2: (mainframes?.[2] ?? 0) - (ship.mainframes[2] ?? 0),
        3: (mainframes?.[3] ?? 0) - (ship.mainframes[3] ?? 0),
        4: (mainframes?.[4] ?? 0) - (ship.mainframes[4] ?? 0),
        5: (mainframes?.[5] ?? 0) - (ship.mainframes[5] ?? 0),
      };
      return Array.from(new Array(r.need.ship))
        .map(() => {
          if (r.need.rank > 1 && usedMainframes[r.need.rank]) {
            usedMainframes[r.need.rank] -= 1;
            return {
              exp: 0,
              ships: 0,
              mainframes: {
                [r.need.rank]: 1,
              },
            };
          }
          return calcRank(r.need.rank, usedMainframes);
        })
        .reduce(
          (total, s) => ({
            exp: total.exp + s.exp,
            ships: total.ships + s.ships,
            mainframes: {
              ...total.mainframes,
              [r.need.rank]: (total.mainframes?.[r.need.rank] ?? 0) + (s.mainframes?.[r.need.rank] ?? 0),
            },
          }),
          { ...ship }
        );
    }
    return { exp: 0, ships: 0 };
  };

  return {
    calcUpgrade,
    calcRank,
  };
};

export const useShip = () => {
  const { data } = useAsset<Ship>("ships", (data) => {
    const upgrade = Object.keys(data.upgrade).reduce((upgrades, u) => {
      const level = Number(u);
      upgrades[level] = {
        exp: data.upgrade[u].exp,
        sum: data.upgrade[u].exp + (upgrades[Math.max(0, level - 1)]?.sum ?? 0),
      };
      return upgrades;
    }, {});

    const rank = Object.keys(data.rank).reduce((ranks, r) => {
      const stars = Number(r);
      ranks[stars] = {
        ...data.rank[r],
      };
      return ranks;
    }, {});

    return {
      upgrade,
      rank,
      ...calculations(rank, upgrade),
    };
  });

  return data;
};
