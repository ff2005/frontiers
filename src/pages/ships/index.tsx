import { Fragment } from "react";
import { Navigation, Grid, MinuteTicker } from "../../components";
import { format } from "../../helper";
import { useShip } from "../../hooks";

export const Ships = () => {
  const ship = useShip();
  console.log('ship', ship)

  if (ship) {
    // console.log('ship.calcUpgrade(10)', ship.calcUpgrade(10))
    // console.log('-----------------------------------------------')
    // console.log('ship.calcUpgrade(20)', ship.calcUpgrade(20))
    // console.log('-----------------------------------------------')
    // console.log('ship.calcUpgrade(30)', ship.calcUpgrade(30))
    // console.log('-----------------------------------------------')
    // console.log('ship.calcUpgrade(40)', ship.calcUpgrade(40))
    // console.log('-----------------------------------------------')

    // console.log('ship.calcRank(2)', ship.calcRank(2, { 2: 100 }))
    // console.log('ship.calcRank(3)', ship.calcRank(3, { 2:100, 3:100, 4:100, 5:100 }))
    // console.log('ship.calcRank(4)', ship.calcRank(4))
    // console.log('ship.calcRank(4)', ship.calcRank(4, { 2:1, 3:2, 4:100, 5:100 }))
    // console.log('ship.calcRank(5)', ship.calcRank(5))
    console.log('ship.calcRank(6)', ship.calcRank(6))
    console.log('ship.calcUpgrade(60)', ship.calcUpgrade(60))
    return (
      <div>
        <Navigation.Anchor name="upgrades" />
        <h3>Upgrades</h3>
        <Grid rows={3}>
          <Grid.Item header sticky>Level</Grid.Item>
          {Object.keys(ship.upgrade).map((u) => (<Grid.Item key={u} header className="text-center">{u}</Grid.Item>))}
          <Grid.Item header sticky>Exp</Grid.Item>
          {Object.keys(ship.upgrade).map((u) => (<Grid.Item key={u} className="text-right">{ship.upgrade[u].exp}</Grid.Item>))}
          <Grid.Item header sticky>Sum</Grid.Item>
          {Object.keys(ship.upgrade).map((u) => (<Grid.Item key={u} className="text-right">{ship.upgrade[u].sum}</Grid.Item>))}
        </Grid>
        <h3>Ranks</h3>
        <Grid rows={3}>

        </Grid>
        {/*
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
          <Grid.Item className={`affinity-${alliance!.raid.currentAffinity.affinity.toLowerCase()}`}>
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
              <Grid.Item className={`affinity-${a.affinity.toLowerCase()}`}>{a.affinity}</Grid.Item>
              <Grid.Item>{format.toDate(a.start)}</Grid.Item>
              <Grid.Item><MinuteTicker until={a.start} /></Grid.Item>
              <Grid.Item>{format.toDate(a.end)}</Grid.Item>
              <Grid.Item><MinuteTicker until={a.end} /></Grid.Item>
            </Fragment>
          ))}
        </Grid>
        {/**/}
      </div>
    );
  }
  return null;
};
