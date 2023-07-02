const toMinutes = (minutes?: number) => {
  return `${Math.floor(minutes ?? 0)}m`;
}

const toHours = (minutes?: number) => {
  return `${Math.floor(minutes ?? 0 % 60)}m`;
}

const toTime = (minutes?: number) => {
  if (minutes) {
    const h = Math.floor(minutes / 60);
    const m = ('00' + Math.floor(minutes % 60)).slice(-2);
    return `${h}:${m}`;
  }
  return null;
}

const toNumber = (number?: number) =>
  number ? Math.round((number || 0) * 10) / 10 : '?';

const toNumberRange = (range?: (number | undefined)[]) => {
  if (range) {
    if (range.length === 2) {
      return `${toNumber(range[0])} to ${toNumber(range[1])}`;
    }
    return toNumber(range[0]);
  }
  return null;
};

const toStar = (star: any) =>
  star
    ? star.quantity > 1
      ? `${star.quantity}x ${star.stars}*`
      : `${star.stars}*`
    : null;

const toEquipment = (equip: any) =>
  equip ? (
    <div>
      <div>{`${equip.category} ${equip.type}`}</div>
      <div>
        {equip.stars.map((stars: any) => toStar({ stars })).join(" / ")}
      </div>
    </div>
  ) : null;

const toMainframe = (mainframe?: any) =>
  mainframe ? toStar(mainframe) : null;


export const format = {
  toMinutes,
  toHours,
  toTime,
  toNumber,
  toNumberRange,
  toStar,
  toEquipment,
  toMainframe
}