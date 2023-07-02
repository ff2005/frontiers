import { Page } from "../../components";
import { Alliance } from "./alliance";
import { Anomalies } from "./anomalies";
import { Bounties } from "./bouties";
import { Campaigns } from "./campaigns";
import { Energy } from "./energy";

export const Info = () => (
  <Page name="Info">
    <Bounties />
    <Campaigns />
    <Anomalies />
    <Energy />
    <Alliance />
  </Page>
);
