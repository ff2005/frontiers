import { useCallback, useState } from "react";
import { Navigation } from "../navigation";
import { cn } from "../ui/helpers";
import "./styles.scss";

const Header = () => {
  const routes = Navigation.useRoutes();
  const [active, setActive] = useState(false);
  const toggle = useCallback(() => setActive((active) => !active), []);
  const hide = useCallback(() => setActive(false), []);

  return (
    <div className={cn("layout-header", { "layout-header--active": active })}>
      <div className="layout-header-menu" onClick={hide}>
        <div className="layout-header-menu-content">
          {Object.keys(routes).map((path) => (
            <Navigation.Link path={path} key={routes[path].name}>{routes[path].name}</Navigation.Link>
          ))}
        </div>
      </div>
      <div className="layout-header-action" onClick={toggle}>
        <div className="layout-header-action-content">Menu</div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="layout-footer">
      <a href="https://github.com/ff2005/frontiers" target="_blank" className="layout-footer-item" rel="noreferrer">
        <img src="/frontiers/assets/icons/github.svg" alt="Github" />
      </a>
    </div>
  );
};

export interface LayoutProps {
  name: string;
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ name, children }) => {
  return (
    <div className="layout">
      <div className="layout-container">
        <div className="layout-content">
          <div className="layout-title">
            <h1>{name}</h1>
          </div>
          {children}
        </div>
        <Footer />
      </div>
      <Header />
    </div>
  );
};
