import { useCallback, useState } from "react";
import { Navigation } from "../navigation";
import { cn } from "../ui/helpers";
import "./styles.scss";

const Header = () => {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => setActive((active) => !active), []);

  const hide = useCallback(() => setActive(false), []);

  return (
    <div className="layout-header">
      <div
        className={cn("layout-header-menu", {
          "layout-header-menu--active": active,
        })}
        onClick={hide}
      >
        <Navigation.Link path="">Info</Navigation.Link>
        <Navigation.Link path="/events">Events</Navigation.Link>
        <Navigation.Link path="/events1">Events</Navigation.Link>
        <Navigation.Link path="/events2">Events</Navigation.Link>
        <Navigation.Link path="/events3">Events</Navigation.Link>
        <Navigation.Link path="/events4">Events</Navigation.Link>
        <Navigation.Link path="/events5">Events</Navigation.Link>
        <Navigation.Link path="/events6">Events</Navigation.Link>
        <Navigation.Link path="/events7">Events</Navigation.Link>
        <Navigation.Link path="/events8">Events</Navigation.Link>
        <Navigation.Link path="/events9">Events</Navigation.Link>
        <Navigation.Link path="/events10">Events</Navigation.Link>
        <Navigation.Link path="/events11">Events</Navigation.Link>
        <Navigation.Link path="/events12">Events</Navigation.Link>
        <Navigation.Link path="/events13">Events</Navigation.Link>
      </div>
      <div className="layout-header-action" onClick={toggle}>
        <div className="layout-header-action-content">Menu</div>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div className="layout-footer">footer</div>;
};

export interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-content">{children}</div>
      <Footer />
      <Header />
    </div>
  );
};
