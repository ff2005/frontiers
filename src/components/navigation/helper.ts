export interface NavigationPage {
  path: string;
  hash: string;
  query: {
    [key: string]: string;
  };
}

export const QUERY = {
  parse: (value = ""): { [key: string]: string } => {
    return value.split("&").reduce((query, s) => {
      const s2 = s.split("=");
      if (s2[0]) {
        query[s2[0]] = s2[1];
      }
      return query;
    }, {});
  },
  stringify: (query: { [key: string]: string }): string => {
    return Object.keys(query)
      .map((key) => (key ? `${key}=${query[key]}` : ""))
      .join("&");
  },
};

export const PAGE = {
  parse: (value = ""): NavigationPage => {
    const v1 = value.split("?");
    const v2 = v1[0].split("#");
    return {
      path: v2[0] || "",
      hash: v2[1] || "",
      query: QUERY.parse(v1[1] || ""),
    };
  },
  stringify: (page: NavigationPage): string => {
    return `${page.path}${page.hash ? "#" : ""}${page.hash}${
      Object.keys(page.query).length > 0 ? "?" : ""
    }${QUERY.stringify(page.query)}`;
  },
};

export const LOCATION = {
  set: (page: NavigationPage, root = "") => {
    window.history.replaceState(
      undefined,
      "",
      `${root}${PAGE.stringify(page)}`
    );
  },
  get: (root = ""): NavigationPage => {
    return PAGE.parse(
      window.location.href.replace(
        new RegExp(`^(${window.location.origin}${root})`),
        ""
      )
    );
  },
};
