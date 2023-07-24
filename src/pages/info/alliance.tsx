import { Fragment } from "react";
import { useAlliance } from "../../hooks";
import { Grid, MinuteTicker, Navigation } from "../../components";
import { format } from "../../helper";

export const Alliance = () => {
  const alliance = useAlliance();

  if (alliance) {
    return (
      <div>
        <Navigation.Anchor name="alliance" />
        <h2>Alliance</h2>
        <Navigation.Anchor name="alliance-token" />
        <h3>Raid - Token</h3>
        <Grid rows={2}>
          <Grid.Item header>Generation</Grid.Item>
          <Grid.Item>{format.toTimeDescription(alliance.raid.token.generation)}</Grid.Item>
          <Grid.Item header>Max</Grid.Item>
          <Grid.Item>{alliance!.raid.token.max}</Grid.Item>
        </Grid>
        <Navigation.Anchor name="alliance-raid-specs" />
        <h3>Raid - Specs</h3>
        <Grid rows={3}>
          <Grid.Item header>Raid</Grid.Item>
          {Object.keys(alliance.raid.level).map((r) => (
            <Grid.Item header key={r}>{r}</Grid.Item>
          ))}
          <Grid.Item header>Speed</Grid.Item>
          {Object.keys(alliance!.raid.level).map((r) => (
            <Grid.Item key={r}>{alliance.raid.level[r].speed}</Grid.Item>
          ))}
          <Grid.Item header>Security</Grid.Item>
          {Object.keys(alliance!.raid.level).map((r) => (
            <Grid.Item key={r}>{alliance.raid.level[r].security}</Grid.Item>
          ))}
        </Grid>
        <Navigation.Anchor name="alliance-raid-affinities" />
        <h3>Raid - Affinities</h3>
        <Grid rows={1}>
          <Grid.Item header>Duration</Grid.Item>
          <Grid.Item>1 week</Grid.Item>
        </Grid>
        <Grid columns={5}>
        <Grid.Item header className="text-center">
            Current
          </Grid.Item>
          <Grid.Item header className="text-center">
            Start
          </Grid.Item>
          <Grid.Item header className="text-center">
            In
          </Grid.Item>
          <Grid.Item header className="text-center">
            End
          </Grid.Item>
          <Grid.Item header className="text-center">
            In
          </Grid.Item>
          <Grid.Item className={`affinity-${alliance!.raid.currentAffinity.affinity}`}>
            {alliance.raid.currentAffinity.affinity}
          </Grid.Item>
          <Grid.Item>{format.toDate(alliance!.raid.currentAffinity.start)}</Grid.Item>
          <Grid.Item><MinuteTicker until={alliance!.raid.currentAffinity.start} /></Grid.Item>
          <Grid.Item>{format.toDate(alliance!.raid.currentAffinity.end)}</Grid.Item>
          <Grid.Item><MinuteTicker until={alliance!.raid.currentAffinity.end} /></Grid.Item>
          <Grid.Item header className="text-center">
            Next
          </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          {alliance.raid.nextAffinities.map((a) => (
            <Fragment key={`e${a.affinity}`}>
              <Grid.Item className={`affinity-${a.affinity}`}>{a.affinity}</Grid.Item>
              <Grid.Item>{format.toDate(a.start)}</Grid.Item>
              <Grid.Item><MinuteTicker until={a.start} /></Grid.Item>
              <Grid.Item>{format.toDate(a.end)}</Grid.Item>
              <Grid.Item><MinuteTicker until={a.end} /></Grid.Item>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }
  return null;
};
