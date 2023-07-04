export interface NavigationPage {
  path: string;
  hash: string;
  query: {
    [key: string]: string;
  };
}

// http://www.domain.com/<root>/?/<path>/&<query>#<hash>

export const QUERY = {
  parse: (value = ""): { [key: string]: string } => {
    return value.split("&").reduce((query, s) => {
      const s2 = s.split("=");
      if (s2[0]) {
        query[s2[0]] = s2[1] || s2[0];
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
    const v1 = (value.split("/?")[1] || "").split("#")[0];
    const v2 = v1.split("&")
    const p = (v2[0] || "").startsWith("/") ? v2[0] : ""
    const q = QUERY.parse(((v2[0] || "").startsWith("/") ? v2[1] : v2[0]) || "");
    const h = (value.split("#")[1] || "").split("?")[0];
    return {
      path: p || "",
      hash: h || "",
      query: q,
    };
  },
  stringify: (page: NavigationPage): string => {
    // prettier-ignore
    return `/?${page.path}${QUERY.stringify(page.query)}${page.hash ? "#" : ""}${page.hash}`;
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
