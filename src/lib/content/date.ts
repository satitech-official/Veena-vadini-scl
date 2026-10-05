const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const longDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const datePartsFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

function toDate(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

export function formatContentDate(value: string) {
  return dateFormatter.format(toDate(value));
}

export function formatLongContentDate(value: string) {
  return longDateFormatter.format(toDate(value));
}

export function getContentDateParts(value: string) {
  const parts = datePartsFormatter.formatToParts(toDate(value));

  return {
    day: parts.find((part) => part.type === "day")?.value ?? "",
    month: parts.find((part) => part.type === "month")?.value.toUpperCase() ?? "",
  };
}

export function formatEventTimeRange(startTime: string | null, endTime: string | null) {
  if (!startTime) {
    return "Sample time to be confirmed";
  }

  const toTime = (time: string) => timeFormatter.format(new Date(`1970-01-01T${time}:00+05:30`));
  const start = toTime(startTime);

  return endTime ? `${start} – ${toTime(endTime)}` : start;
}
