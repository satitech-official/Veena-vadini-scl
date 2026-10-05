import { getContentDateParts, formatContentDate } from "@/lib/content/date";
import { cn } from "@/lib/utils/cn";

type EventDateProps = {
  className?: string;
  date: string;
  tone?: "light" | "dark";
};

export function EventDate({ className, date, tone = "light" }: EventDateProps) {
  const dateParts = getContentDateParts(date);

  return (
    <time aria-label={`Sample event date: ${formatContentDate(date)}`} className={cn("event-date", tone === "dark" ? "event-date-dark" : "event-date-light", className)} dateTime={date}>
      <span>{dateParts.day}</span>
      <span>{dateParts.month}</span>
    </time>
  );
}
