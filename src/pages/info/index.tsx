import { Events } from "./events";
import { Alliance } from "./alliance";
import { Anomalies } from "./anomalies";
import { Bounties } from "./bouties";
import { Campaigns } from "./campaigns";
import { Energy } from "./energy";
import { Arena } from "./arena";

export const Info = () => (
  <>
    <Arena />
    <Alliance />
    <Events />
    <Bounties />
    <Campaigns />
    <Anomalies />
    <Energy />
  </>
);
