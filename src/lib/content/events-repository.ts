import { eventSeed } from "@/content/events/event-seed";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseEventsResult } from "@/lib/supabase/public-content";
import type { PublicContentResult } from "@/lib/content/public-content-result";
import type { SchoolEvent } from "@/types/content";

export type EventsRepository = {
  getEvents(): Promise<SchoolEvent[]>;
  getEventBySlug(slug: string): Promise<SchoolEvent | null>;
  getUpcomingEvents(limit?: number): Promise<SchoolEvent[]>;
};

function hasNotPassed(event: SchoolEvent) {
  return new Date(`${event.date}T23:59:59.999Z`).getTime() >= Date.now();
}

class LocalEventsRepository implements EventsRepository {
  private readonly records = eventSeed;

  async getEvents() {
    return [...this.records]
      .filter((event) => event.visibility === "public" && event.status === "published")
      .sort((left, right) => left.date.localeCompare(right.date));
  }

  async getEventBySlug(slug: string) {
    return (await this.getEvents()).find((event) => event.slug === slug) ?? null;
  }

  async getUpcomingEvents(limit = 3) {
    return (await this.getEvents()).filter(hasNotPassed).slice(0, limit);
  }
}

class SupabaseEventsRepository implements EventsRepository {
  getEvents() {
    return getSupabaseEventsResult().then((result) => result.data);
  }

  async getEventBySlug(slug: string) {
    return (await this.getEvents()).find((event) => event.slug === slug) ?? null;
  }

  async getUpcomingEvents(limit = 3) {
    return (await this.getEvents()).filter(hasNotPassed).slice(0, limit);
  }
}

/**
 * Pages depend on this interface rather than the seed records. A future
 * Supabase implementation can replace this instance without changing UI code.
 */
export const eventsRepository: EventsRepository = isSupabaseConfigured()
  ? new SupabaseEventsRepository()
  : new LocalEventsRepository();

export async function getEventsResult(): Promise<PublicContentResult<SchoolEvent[]>> {
  if (isSupabaseConfigured()) {
    const result = await getSupabaseEventsResult();
    return { records: result.data, hasLoadError: result.hasError };
  }

  return { records: await eventsRepository.getEvents(), hasLoadError: false };
}

export const getEvents = async () => (await getEventsResult()).records;
export const getEventBySlug = (slug: string) => eventsRepository.getEventBySlug(slug);

export async function getUpcomingEventsResult(limit = 3): Promise<PublicContentResult<SchoolEvent[]>> {
  const result = await getEventsResult();
  return {
    records: result.records.filter(hasNotPassed).slice(0, limit),
    hasLoadError: result.hasLoadError,
  };
}

export const getUpcomingEvents = async (limit?: number) => (await getUpcomingEventsResult(limit)).records;
