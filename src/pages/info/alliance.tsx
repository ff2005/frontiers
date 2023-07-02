import { useMemo } from "react";
import { useAlliance } from "../../hooks";
import { Navigation, Table } from "../../components";
import { format } from "../../helper";

export const Alliance = () => {
  const alliance = useAlliance();

  const token = useMemo(() => {
    if (alliance) {
      return [
        [
          { value: "Generation", header: true },
          { value: format.toTime(alliance.token.generation) },
        ],
        [{ value: "Max", header: true }, { value: alliance.token.max }],
      ];
    }
    return [];
  }, [alliance]);

  const raid = useMemo(() => {
    if (alliance) {
      return [
        [
          { value: "Raid", header: true },
          ...Object.keys(alliance.raid).map((r) => ({
            value: r,
            header: true,
          })),
        ],
        [
          { value: "Speed", header: true },
          ...Object.keys(alliance.raid).map((r) => ({
            value: alliance.raid[r].speed,
          })),
        ],
        [
          { value: "Security", header: true },
          ...Object.keys(alliance.raid).map((r) => ({
            value: alliance.raid[r].security,
          })),
        ],
      ];
    }
    return [];
  }, [alliance]);

  console.log("raid", { token, raid });

  return (
    <div>
      <Navigation.Anchor name="alliance" />
      <h2>Alliance</h2>
      <Navigation.Anchor name="alliance-token" />
      <h3>Token</h3>
      <Table data={token} />
      <Navigation.Anchor name="alliance-raid" />
      <h3>Raid</h3>
      <Table data={raid} />
    </div>
  );
};
