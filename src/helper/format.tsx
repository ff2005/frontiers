const toTimeDescription = (minutes?: number): string | undefined => {
  if (minutes && minutes > 0) {
    if (minutes >= 525600) {
      const y = Math.floor((minutes ?? 0) / 525600);
      return [`${y}y`, toTimeDescription(minutes - y * 525600)].join(" ");
    }
    if (minutes >= 43830) {
      const mm = Math.floor((minutes ?? 0) / 43830);
      return [`${mm}mm`, toTimeDescription(minutes - mm * 43830)].join(" ");
    }
    if (minutes >= 1440) {
      const d = Math.floor((minutes ?? 0) / 1440);
      return [`${d}d`, toTimeDescription(minutes - d * 1440)].join(" ");
    }
    if (minutes >= 60) {
      const h = Math.floor((minutes ?? 0) / 60);
      return [`${h}h`, toTimeDescription(minutes - h * 60)].join(" ");
    }
    return `${Math.floor(minutes ?? 0)}m`;
  }
};

const toTime = (minutes?: number) => {
  if (minutes) {
    const h = Math.floor(minutes / 60);
    const m = ("00" + Math.floor(minutes % 60)).slice(-2);
    return `${h}:${m}`;
  }
  return null;
};

const toNumber = (number?: number) => (number ? Math.round((number || 0) * 10) / 10 : "?");

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
  star ? (star.quantity > 1 ? `${star.quantity}x ${star.stars}*` : `${star.stars}*`) : null;

const toEquipment = (equip: any) =>
  equip ? (
    <div>
      <div>{`${equip.category} ${equip.type}`}</div>
      <div>{equip.stars.map((stars: any) => toStar({ stars })).join(" / ")}</div>
    </div>
  ) : null;

const toMainframe = (mainframe?: any) => (mainframe ? toStar(mainframe) : null);

const toDate = (date: Date) => date.toISOString().replace("T", " ").substring(0, 16);

export const format = {
  toTimeDescription,
  toTime,
  toNumber,
  toNumberRange,
  toStar,
  toEquipment,
  toMainframe,
  toDate,
};
