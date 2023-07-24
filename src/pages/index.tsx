import { Layout, Navigation } from "../components";
import { Calendar } from "./calendar";
import { Alliance } from "./alliance";
import { Anomalies } from "./anomalies";
import { Arena } from "./arena";
import { Bounties } from "./bounties";
import { Campaigns } from "./campaigns";
import { Energy } from "./energy";
import { Events } from "./events";
import { Ships } from "./ships";

const Page = () => {
  const routes = Navigation.useRoutes();
  const [page] = Navigation.usePage();
  const Page = routes[page.path]?.component;
  if (Page) {
    return (
      <Layout name={routes[page.path].name}>
        <Page />
      </Layout>
    );
  }
  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Navigation.Router
      root="/frontiers"
      routes={{
        "": { name: "Calendar", component: Calendar },
        // "/general": { name: "General", component: Info },
        "/allience": { name: "Alliance", component: Alliance },
        "/anomalies": { name: "Anomalies", component: Anomalies },
        "/arena": { name: "Arena", component: Arena },
        "/bounties": { name: "Bounties", component: Bounties },
        "/campaigns": { name: "Campaigns", component: Campaigns },
        "/energy": { name: "Energy", component: Energy },
        "/events": { name: "Events", component: Events },
        "/ships": { name: "Ships", component: Ships },
        // "/events": { name: 'Events', component: Events },
      }}
    >
      <Page />
    </Navigation.Router>
  );
};
