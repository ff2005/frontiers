import { useBounties } from "../../hooks";
import { Grid, Navigation } from "../../components";

export const Bounties = () => {
  const bounties = useBounties();

  if (bounties) {
    const levels = Object.keys(bounties.level);
    return (
      <div>
        <Navigation.Anchor name="bounty" />
        <h2>Bounty</h2>
        <Grid rows={6}>
          <Grid.Item header sticky>
            Levels
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item header className="text-center" key={l}>
              {l}
            </Grid.Item>
          ))}
          <Grid.Item />
          <Grid.Item header sticky>
            Energy
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {bounties.level[l].energy}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Spend</Grid.Item>
          <Grid.Item header sticky>
            Exp
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {bounties.level[l].reward.exp}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Gain</Grid.Item>
          <Grid.Item header sticky>
            Exp / Energy
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {bounties.level[l].reward.expPerEnergy}
            </Grid.Item>
          ))}
          <Grid.Item />
          <Grid.Item header sticky>
            Credits
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {bounties.level[l].reward.credits}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Reward</Grid.Item>
          <Grid.Item header sticky>
            Credits / Energy
          </Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {bounties.level[l].reward.creditsPerEnergy}
            </Grid.Item>
          ))}
          <Grid.Item />
        </Grid>
      </div>
    );
  }
  return null;
};
