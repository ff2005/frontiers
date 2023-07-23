export const getTimeZone = () => 0 - new Date().getTimezoneOffset()

const getNumber = (defaultValue: number, value?: number) => {
  if (value !== undefined && value >= 0) {
    return value
  }
  return defaultValue
}

export const getUTCDate = (year?: number, month?: number, day?: number, hours?: number, minutes?: number, seconds?: number) => {
  const d1 = new Date();
  d1.setUTCFullYear(getNumber(d1.getUTCFullYear(), year))
  d1.setUTCMonth(getNumber(d1.getUTCMonth() + 1, month) - 1)
  d1.setUTCDate(getNumber(d1.getUTCDate(), day))
  d1.setUTCHours(getNumber(d1.getUTCHours(), hours))
  d1.setUTCMinutes(getNumber(d1.getUTCMinutes(), minutes))
  d1.setUTCSeconds(getNumber(d1.getUTCSeconds(), seconds))
  d1.setUTCMilliseconds(0);

  const d2 = new Date(d1.getTime() - (new Date().getTimezoneOffset() * 60000))
  d2.setUTCMilliseconds(0)

  return d2;
};

export const getUTCNow = () => {
  const d = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))
  d.setUTCMilliseconds(0)

  return d;
}
