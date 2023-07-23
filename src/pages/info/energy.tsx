import { useEnergy } from "../../hooks";
import { Grid, Navigation } from "../../components";
import { format } from "../../helper";

export const Energy = () => {
  const energy = useEnergy();

  if (energy) {
    return (
      <div>
        <Navigation.Anchor name="energy" />
        <h2>Energy</h2>
        <Grid rows={1}>
          <Grid.Item header>Energy Pack</Grid.Item>
          <Grid.Item>{energy.pack}</Grid.Item>
        </Grid>
        <Navigation.Anchor name="energy-generation" />
        <h3>Generation</h3>
        <Grid rows={3}>
          <Grid.Item header>Max Energy Generation</Grid.Item>
          <Grid.Item>{energy.generation.max}</Grid.Item>
          <Grid.Item header>Generation Time</Grid.Item>
          <Grid.Item>{format.toTimeDescription(energy.generation.minutes)}</Grid.Item>
          <Grid.Item header>Max Generation Time</Grid.Item>
          <Grid.Item>{format.toTime(energy.generation.minutesToMaxGeneration)}</Grid.Item>
        </Grid>
        <Navigation.Anchor name="energy-daily" />
        <h3>Daily</h3>
        <Grid rows={3}>
          <Grid.Item header className="text-center">Generated</Grid.Item>
          <Grid.Item header className="text-center">Limited Bundles</Grid.Item>
          <Grid.Item header className="text-center">Platinum Market</Grid.Item>
          <Grid.Item header className="text-center">Playtime Rewards</Grid.Item>
          <Grid.Item header className="text-center">Alliance</Grid.Item>
          <Grid.Item header className="text-center">Total</Grid.Item>
          <Grid.Item className="text-right">{energy.generatedPerDay}</Grid.Item>
          <Grid.Item className="text-right">{energy.daily["Limited Bundles"].pack * energy.pack}</Grid.Item>
          <Grid.Item className="text-right">{energy.daily["Platinum Market"].pack * energy.pack}</Grid.Item>
          <Grid.Item className="text-right">{energy.daily["Playtime Rewards"].energy}</Grid.Item>
          <Grid.Item className="text-right">{format.toNumberRange(energy.daily["Alliance"].energy)}</Grid.Item>
          <Grid.Item className="text-right">{format.toNumberRange(energy.totalPerDay)}</Grid.Item>
          <Grid.Item className="text-right">Energy</Grid.Item>
          <Grid.Item className="text-right">{`Pack (${energy.daily["Limited Bundles"].pack})`}</Grid.Item>
          <Grid.Item className="text-right">{`Pack (${energy.daily["Platinum Market"].pack})`}</Grid.Item>
          <Grid.Item className="text-right">Energy</Grid.Item>
          <Grid.Item className="text-right">Energy</Grid.Item>
          <Grid.Item />
        </Grid>
      </div>
    );
  }
  return null;
};
