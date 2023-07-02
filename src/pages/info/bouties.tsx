import { useMemo } from "react";
import { useBounties } from "../../hooks";
import { Navigation, Table } from "../../components";

export const Bounties = () => {
  const bounties = useBounties();

  const data = useMemo(() => {
    if (bounties) {
      const levels = Object.keys(bounties.level);
      return [
        [
          { value: "Levels", header: true, sticky: true },
          ...levels.map((l) => ({
            value: l,
            header: true,
          })),
          { value: "", type: "empty" },
        ],
        [
          { value: "Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: bounties.level[l].energy,
            type: "number",
          })),
          { value: "Spend" },
        ],
        [
          { value: "Exp", header: true, sticky: true },
          ...levels.map((l) => ({
            value: bounties.level[l].reward.exp,
            type: "number",
          })),
          { value: "Gain" },
        ],
        [
          { value: "Exp / Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: bounties.level[l].expPerEnergy,
            type: "number",
          })),
          { value: "", type: "empty" },
        ],
        [
          { value: "Credits", header: true, sticky: true },
          ...levels.map((l) => ({
            value: bounties.level[l].reward.credits,
            type: "number",
          })),
          { value: "Reward" },
        ],
        [
          { value: "Credits / Energy", header: true, sticky: true },
          ...levels.map((level) => ({
            value: bounties.level[level].creditsPerEnergy,
            type: "number",
          })),
          { value: "", type: "empty" },
        ],
      ];
    }
    return [];
  }, [bounties]);

  return (
    <div>
      <Navigation.Anchor name="bounty" />
      <h2>Bounty</h2>
      <Table data={data} />
    </div>
  );
};
