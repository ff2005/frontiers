import { createContext, useCallback, useContext, useState } from "react";
import { LOCATION, NavigationPage } from "./helper";
import { cn } from "../ui/helpers";
import "./styles.scss";

export interface NavigationRoutes {
  [path: string]: JSX.Element;
}

interface NavigationContextProps {
  routes: NavigationRoutes;
  page: NavigationPage;
  setPage: (page: NavigationPage) => void;
}

export interface NavigationRouterProps {
  root?: string;
  routes: NavigationRoutes;
  children: ((page: JSX.Element) => JSX.Element) | any;
}

export interface NavigationLinkProps extends Partial<NavigationPage> {
  path: string;
  children: any;
}

export interface NavigationAnchorProps {
  name: string;
}

export const createNavigation = () => {
  const NavigationContext = createContext<NavigationContextProps>({
    routes: {},
    page: {
      path: "",
      hash: "",
      query: {},
    },
    setPage: (page: NavigationPage) => {},
  });

  const Router = ({ root, routes, children }: NavigationRouterProps) => {
    const [page, setPage] = useState(LOCATION.get(root));

    const handleSetPage = useCallback(
      (page: NavigationPage) => {
        setPage(page);
        LOCATION.set(page, root);
      },
      [root]
    );

    return (
      <NavigationContext.Provider
        value={{ routes, page, setPage: handleSetPage }}
      >
        {typeof children === "function"
          ? children(routes[page.path])
          : children}
      </NavigationContext.Provider>
    );
  };

  const Link = ({ path, hash, query, children }: NavigationLinkProps) => {
    const context = useContext(NavigationContext);
    const selected = path === context.page.path;

    const handleClick = useCallback(() => {
      const page: NavigationPage = {
        path,
        hash: hash || "",
        query: query || {},
      };
      context.setPage(page);
    }, [context, hash, path, query]);
    return (
      <div
        className={cn("navigation-link", {
          "navigation-link--selected": selected,
        })}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  };

  const Anchor = ({ name }: NavigationAnchorProps) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    return <a id={name} />;
  };

  const usePage = (): [NavigationPage, (page: NavigationPage) => void] => {
    const context = useContext(NavigationContext);
    return [context.page, context.setPage];
  };

  const useRoutes = () => {
    return useContext(NavigationContext).routes;
  };

  return {
    Router,
    Link,
    Anchor,
    usePage,
    useRoutes,
  };
};

export const Navigation = createNavigation();
