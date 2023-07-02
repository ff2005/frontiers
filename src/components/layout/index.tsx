import { Navigation } from "../navigation";
import "./styles.scss";

const Header = () => {
  return (
    <div className="layout-header">
      <Navigation.Link path="/info">
        Info
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
      <Navigation.Link path="/events">
        Events
      </Navigation.Link>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="layout-footer">
      footer
    </div>
  )
}

export interface LayoutProps {
  children: any
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="layout">
      <div className="layout-content">
        {children}
      </div>
      <Footer />
      <Header />
    </div>
  )
}
