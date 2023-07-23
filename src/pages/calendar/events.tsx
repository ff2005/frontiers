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
        <h3>Events</h3>
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
          {events.currentEvents.map((e) => (
            <Fragment key={`e${e.name}`}>
              <Grid.Item header sticky className={`event-${e.name.toLowerCase()}`}>{e.name}</Grid.Item>
              <Grid.Item className="text-right">{format.toDate(e.start)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={e.start} /></Grid.Item>
              <Grid.Item className="text-right">{format.toDate(e.end)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={e.end} /></Grid.Item>
            </Fragment>
          ))}
          <Grid.Item header sticky className="text-center">
            Next
          </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          <Grid.Item header> </Grid.Item>
          {events.nextEvents.map((e: any) => (
            <Fragment key={`e${e.name}`}>
              <Grid.Item header sticky className={`event-${e.name.toLowerCase()}`}>{e.name}</Grid.Item>
              <Grid.Item className="text-right">{format.toDate(e.start)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={e.start} /></Grid.Item>
              <Grid.Item className="text-right">{format.toDate(e.end)}</Grid.Item>
              <Grid.Item className="text-right"><MinuteTicker until={e.end} /></Grid.Item>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }
  return null;
};
