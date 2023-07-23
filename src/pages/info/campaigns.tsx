import { useCampaigns } from "../../hooks";
import { Grid, Navigation } from "../../components";
import { format } from "../../helper";

export const Campaigns = () => {
  const campaigns = useCampaigns();

  if (campaigns) {
    return (
      <div>
        <Navigation.Anchor name="campaigns" />
        <h2>Campaigns</h2>
        {Object.keys(campaigns.difficulty).map((d) =>
          Object.keys(campaigns.difficulty[d].level).map((l) => {
            const stages = Object.keys(campaigns.difficulty[d].level[l].stage);
            const key = `campaigns-${d}-${l}`;
            return (
              <div key={key}>
                <Navigation.Anchor name={key} />
                <h3>
                  {d} - {campaigns.difficulty[d].level[l].name}
                </h3>
                <Grid rows={9}>
                  <Grid.Item header sticky>Stages</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item header className="text-center" key={s}>{`${l}-${s}`}</Grid.Item>
                  ))}
                  <Grid.Item></Grid.Item>
                  <Grid.Item header sticky>Energy</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{campaigns.difficulty[d].level[l].stage[s].energy}</Grid.Item>
                  ))}
                  <Grid.Item className="text-center">Spend</Grid.Item>

                  <Grid.Item header sticky>Battle Exp</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{campaigns.difficulty[d].level[l].stage[s].battle.exp || ''}</Grid.Item>
                  ))}
                  <Grid.Item />

                  <Grid.Item header sticky>Exp</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{campaigns.difficulty[d].level[l].stage[s].reward.exp || ''}</Grid.Item>
                  ))}
                  <Grid.Item className="text-center">Gain</Grid.Item>
                  <Grid.Item header sticky>Exp / Energy</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{campaigns.difficulty[d].level[l].stage[s].reward.expPerEnergy}</Grid.Item>
                  ))}
                  <Grid.Item />
                  <Grid.Item header sticky>Equipment</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{format.toEquipment(campaigns.difficulty[d].level[l].stage[s].reward.equip)}</Grid.Item>
                  ))}
                  <Grid.Item className="text-center">Guaranteed Reward</Grid.Item>
                  <Grid.Item header sticky>Credits</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{format.toNumberRange(campaigns.difficulty[d].level[l].stage[s].reward.optional.credits)}</Grid.Item>
                  ))}
                  <Grid.Item className="text-center">Possible Reward</Grid.Item>
                  <Grid.Item header sticky>Credits / Energy</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{format.toNumberRange(campaigns.difficulty[d].level[l].stage[s].reward.creditsPerEnergy)}</Grid.Item>
                  ))}
                  <Grid.Item />
                  <Grid.Item header sticky>Mainframe</Grid.Item>
                  {stages.map((s) => (
                    <Grid.Item className="text-right" key={s}>{format.toMainframe(campaigns.difficulty[d].level[l].stage[s].reward.optional.mainframe)}</Grid.Item>
                  ))}
                  <Grid.Item className="text-center">Possible Reward</Grid.Item>
                </Grid>
              </div>
            );
          })
        )}
      </div>
    );
  }
  return null;
};
