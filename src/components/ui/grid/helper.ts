export const count = (children: any): number => {
  if (children !== null || children !== undefined) {
    if (Array.isArray(children)) {
      return children.reduce((sum, child) => {
        return sum += count(child);
      }, 0);
    }
    return 1;
  }
  return 0;
};
