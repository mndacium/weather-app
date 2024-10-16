const timezoneOffsets = [
  { name: "America/Anchorage", offset: "-09:00" },
  { name: "America/Los_Angeles", offset: "-08:00" },
  { name: "America/Denver", offset: "-07:00" },
  { name: "America/Chicago", offset: "-06:00" },
  { name: "America/New_York", offset: "-05:00" },
  { name: "America/Sao_Paulo", offset: "-03:00" },
  { name: "GMT+0", offset: "00:00" },
  { name: "Europe/London", offset: "+00:00" },
  { name: "Europe/Berlin", offset: "+01:00" },
  { name: "Europe/Moscow", offset: "+03:00" },
  { name: "Africa/Cairo", offset: "+02:00" },
  { name: "Asia/Bangkok", offset: "+07:00" },
  { name: "Asia/Singapore", offset: "+08:00" },
  { name: "Asia/Tokyo", offset: "+09:00" },
  { name: "Australia/Sydney", offset: "+10:00" },
  { name: "Pacific/Auckland", offset: "+12:00" },
];

const offsetToMinutes = (offset: string): number => {
  const [hours, minutes] = offset.split(":").map(Number);
  const sign = offset.startsWith("-") ? -1 : 1;
  return sign * (Math.abs(hours) * 60 + (minutes || 0));
};

export const mapOffsetToTimezone = (inputOffset: string): string => {
  const inputMinutes = offsetToMinutes(inputOffset);

  let closestTimezone = timezoneOffsets[0];
  let minDifference = Math.abs(
    inputMinutes - offsetToMinutes(closestTimezone.offset)
  );

  for (const timezone of timezoneOffsets) {
    const timezoneMinutes = offsetToMinutes(timezone.offset);
    const difference = Math.abs(inputMinutes - timezoneMinutes);

    if (difference < minDifference) {
      closestTimezone = timezone;
      minDifference = difference;
    }
  }

  return closestTimezone.name;
};
