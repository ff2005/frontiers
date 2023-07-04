const evalCN = (cn: undefined | string | CNObject) => {
  if (typeof cn === "string") {
    return cn;
  }
  if (typeof cn === "object") {
    return Object.keys(cn)
      .map((key) => (cn[key] ? key : undefined))
      .filter((cn) => cn)
      .join(" ");
  }
  return undefined;
};

export interface CNObject {
  [cn: string]: boolean | undefined;
}

export const cn = (...cns: (undefined |string | CNObject)[]) =>
  cns
    .map((cn) => evalCN(cn))
    .filter((cn) => cn)
    .join(" ");
