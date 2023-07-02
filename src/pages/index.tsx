import { Layout, Navigation } from "../components";
import { Events } from "./events";
import { Info } from "./info";

const Page = () => {
  const routes = Navigation.useRoutes()
  const [page] = Navigation.usePage()
  return (
    <Layout>{routes[page.path]}</Layout>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Navigation.Router
      root="/frontiers"
      routes={{
        "/info": <Info />,
        "/events": <Events />,
      }}
    >
      <Page />
    </Navigation.Router>
  );
};
