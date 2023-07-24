import { useArena } from "../../hooks";
import { Grid, MinuteTicker, Navigation } from "../../components";
import { format } from "../../helper";

export const Arena = () => {
  const arena = useArena();

  if (arena) {
    return (
      <div>
        <Navigation.Anchor name="arena" />
        <h2>Arena</h2>
        <Grid rows={1}>
          <Grid.Item header sticky>
            Reset
          </Grid.Item>
          <Grid.Item>{format.toDate(arena.nextReset)}</Grid.Item>
          <Grid.Item><MinuteTicker until={arena.nextReset} /></Grid.Item>
        </Grid>
      </div>
    );
  }
  return null;
};
