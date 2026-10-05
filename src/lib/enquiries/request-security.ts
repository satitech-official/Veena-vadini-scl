import type { NextRequest } from "next/server";

/** A lightweight same-origin check; rate limiting can be added at the edge later. */
export function hasTrustedFormOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
