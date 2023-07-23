import { Fragment } from "react";
import { useAlliance } from "../../hooks";
import { Grid, MinuteTicker, Navigation } from "../../components";
import { format } from "../../helper";

export const Alliance = () => {
  const alliance = useAlliance();

  if (alliance) {
    return (
      <div>
        <Navigation.Anchor name="raid" />
        <h3>Raid</h3>
        <Grid columns={5}>
        <Grid.Item header sticky className="text-center">
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
          <Grid.Item header sticky className={`affinity-${alliance!.raid.currentAffinity.affinity.toLowerCase()}`}>
            {alliance.raid.currentAffinity.affinity}
          </Grid.Item>
          <Grid.Item className="text-right">{format.toDate(alliance!.raid.currentAffinity.start)}</Grid.Item>
          <Grid.Item className="text-right"><MinuteTicker until={alliance!.raid.currentAffinity.start} /></Grid.Item>
          <Grid.Item className="text-right">{format.toDate(alliance!.raid.currentAffinity.end)}</Grid.Item>
          <Grid.Item className="text-right"><MinuteTicker until={alliance!.raid.currentAffinity.end} /></Grid.Item>
          <Grid.Item header sticky className="text-center">
            Next
          </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          {alliance.raid.nextAffinities.map((a) => (
            <Fragment key={`e${a.affinity}`}>
              <Grid.Item header sticky className={`affinity-${a.affinity.toLowerCase()}`}>{a.affinity}</Grid.Item>
              <Grid.Item className="text-right">{format.toDate(a.start)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={a.start} /></Grid.Item>
              <Grid.Item className="text-right">{format.toDate(a.end)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={a.end} /></Grid.Item>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }
  return null;
};
