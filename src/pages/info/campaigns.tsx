import { useMemo } from "react";
import { useCampaigns } from "../../hooks";
import { Navigation, Table } from "../../components";
import { format } from "../../helper";

export const Campaigns = () => {
  const campaigns = useCampaigns();

  const data = useMemo(() => {
    if (campaigns) {
      return Object.keys(campaigns.difficulty).map((d) => ({
        difficulty: d,
        level: Object.keys(campaigns.difficulty[d].level).map((l) => {
          const stages = Object.keys(campaigns.difficulty[d].level[l].stage);
          return {
            level: l,
            name: campaigns.difficulty[d].level[l].name,
            data: [
              [
                { value: "Stages", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: `${l}-${s}`,
                  header: true,
                })),
                { value: "", type: "empty" },
              ],
              [
                { value: "Energy", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: campaigns.difficulty[d].level[l].stage[s].energy,
                  type: "number",
                })),
                { value: "Spend" },
              ],
              [
                { value: "Exp", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: campaigns.difficulty[d].level[l].stage[s].exp,
                  type: "number",
                })),
                { value: "Gain" },
              ],
              [
                { value: "Exp / Energy", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: campaigns.difficulty[d].level[l].stage[s].expPerEnergy,
                  type: "number",
                })),
                { value: "", type: "empty" },
              ],
              [
                { value: "Equipment", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: format.toEquipment(
                    campaigns.difficulty[d].level[l].stage[s].reward.equip
                  ),
                  type: "number",
                })),
                { value: "Guaranteed Reward" },
              ],
              [
                { value: "Credits", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: format.toNumberRange(
                    campaigns.difficulty[d].level[l].stage[s].reward.optional
                      .credits
                  ),
                  type: "number",
                })),
                { value: "Possible Reward" },
              ],
              [
                { value: "Credits / Energy", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: format.toNumberRange(
                    campaigns.difficulty[d].level[l].stage[s].creditsPerEnergy
                  ),
                  type: "number",
                })),
                { value: "", type: "empty" },
              ],
              [
                { value: "Mainframe", header: true, sticky: true },
                ...stages.map((s) => ({
                  value: format.toMainframe(
                    campaigns.difficulty[d].level[l].stage[s].reward.optional
                      .mainframe
                  ),
                  type: "number",
                })),
                { value: "Possible Reward" },
              ],
            ],
          };
        }),
      }));
    }
    return [];
  }, [campaigns]);

  return (
    <div>
      <Navigation.Anchor name="campaigns" />
      <h2>Campaigns</h2>
      {data.map((d) =>
        d.level.map((l) => {
          const key = `campaigns-${d.difficulty}-${l.level}`;
          return (
            <div key={key}>
              <Navigation.Anchor name={key} />
              <h3>
                {d.difficulty} - {l.name}
              </h3>
              <Table data={l.data} />
            </div>
          );
        })
      )}
    </div>
  );
};
