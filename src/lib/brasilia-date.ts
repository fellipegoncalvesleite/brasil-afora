const BRAZILIA_TIME_ZONE = "America/Sao_Paulo";

const brasiliaDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  timeZone: BRAZILIA_TIME_ZONE,
  year: "numeric",
});

export const getBrasiliaDateKey = (date = new Date()): string => {
  const dateParts = brasiliaDateFormatter.formatToParts(date);
  const year = dateParts.find(({ type }) => type === "year")?.value;
  const month = dateParts.find(({ type }) => type === "month")?.value;
  const day = dateParts.find(({ type }) => type === "day")?.value;

  if (!(year && month && day)) {
    throw new Error("Could not resolve the current date in Brasilia time.");
  }

  return `${year}-${month}-${day}`;
};
