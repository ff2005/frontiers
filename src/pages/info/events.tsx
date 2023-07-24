import { Fragment } from "react";
import { useEvents } from "../../hooks";
import { Grid, MinuteTicker, Navigation } from "../../components";
import { format } from "../../helper";

export const Events = () => {
  const events = useEvents();

  if (events) {
    return (
      <div>
        <Navigation.Anchor name="events" />
        <h2>Events</h2>
        <Grid rows={1}>
          <Grid.Item header sticky>Events</Grid.Item>
          {events.events.map((e) => (
            <Grid.Item key={e}>
              {e}
            </Grid.Item>
          ))}
        </Grid>
        <Grid rows={1}>
          <Grid.Item header>Duration</Grid.Item>
          <Grid.Item>4 days (each)</Grid.Item>
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
          {events.currentEvents.map((e) => (
            <Fragment key={`e${e.name}`}>
              <Grid.Item className={`event-${e.name}`}>{e.name}</Grid.Item>
              <Grid.Item>{format.toDate(e.start)}</Grid.Item>
              <Grid.Item><MinuteTicker until={e.start} /></Grid.Item>
              <Grid.Item>{format.toDate(e.end)}</Grid.Item>
              <Grid.Item><MinuteTicker until={e.end} /></Grid.Item>
            </Fragment>
          ))}
          <Grid.Item header className="text-center">
            Next
          </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          {events.nextEvents.map((e: any) => (
            <Fragment key={`e${e.name}`}>
              <Grid.Item className={`event-${e.name}`}>{e.name}</Grid.Item>
              <Grid.Item>{format.toDate(e.start)}</Grid.Item>
              <Grid.Item><MinuteTicker until={e.start} /></Grid.Item>
              <Grid.Item>{format.toDate(e.end)}</Grid.Item>
              <Grid.Item><MinuteTicker until={e.end} /></Grid.Item>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }
  return null;
};
