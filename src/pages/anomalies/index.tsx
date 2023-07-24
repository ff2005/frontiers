import { useAnomalies } from "../../hooks";
import { Grid, Navigation } from "../../components";
import { format } from "../../helper";

export const Anomalies = () => {
  const anomalies = useAnomalies();
  console.log('anomalies', anomalies)

  if (anomalies) {
    const levels = Object.keys(anomalies.level);
    return (
      <div>
        <Navigation.Anchor name="anomalies" />
        <h2>Anomalies</h2>
        <Grid rows={8}>
          <Grid.Item header sticky>Levels</Grid.Item>
          {levels.map((l) => (
            <Grid.Item header className="text-center" key={l}>
              {l}
            </Grid.Item>
          ))}
          <Grid.Item />
          <Grid.Item header sticky>Energy</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {anomalies.level[l].energy}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Spend</Grid.Item>
          <Grid.Item header sticky>R1</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {anomalies.level[l].R1 || ""}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Gain</Grid.Item>
          <Grid.Item header sticky>R2</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {anomalies.level[l].R2 || ""}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Gain</Grid.Item>
          <Grid.Item header sticky>R3</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {anomalies.level[l].R3 || ""}
            </Grid.Item>
          ))}
          <Grid.Item className="text-center">Gain</Grid.Item>
          <Grid.Item header sticky>R1 / Energy</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {format.toNumberRange(anomalies.level[l].r1PerEnergy)}
            </Grid.Item>
          ))}
          <Grid.Item />
          <Grid.Item header sticky>R2 / Energy</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {format.toNumberRange(anomalies.level[l].r2PerEnergy)}
            </Grid.Item>
          ))}
          <Grid.Item />
          <Grid.Item header sticky>R3 / Energy</Grid.Item>
          {levels.map((l) => (
            <Grid.Item className="text-right" key={l}>
              {format.toNumberRange(anomalies.level[l].r3PerEnergy)}
            </Grid.Item>
          ))}
          <Grid.Item />
        </Grid>
      </div>
    );
  }
  return null;
};
