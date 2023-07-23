import { Layout, Navigation } from "../components";
import { Calendar } from "./calendar";
import { Info } from "./info";
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
        "/general": { name: "General", component: Info },
        "/ships": { name: "Ships", component: Ships },
        // "/events": { name: 'Events', component: Events },
      }}
    >
      <Page />
    </Navigation.Router>
  );
};
