import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { PublicSchoolSettings } from "@/types/settings";

type MapReadyProps = {
  className?: string;
  tone?: "light" | "dark";
  settings: PublicSchoolSettings;
};

export function MapReady({ className, settings, tone = "dark" }: MapReadyProps) {
  const isDark = tone === "dark";
  const mapEmbedUrl = settings.location.googleMapsEmbedUrl;

  if (mapEmbedUrl) {
    return (
      <div className={cn("map-ready-frame", className)}>
        <iframe
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapEmbedUrl}
          title={`${settings.name} location map`}
        />
      </div>
    );
  }

  return (
    <div aria-label="Map location awaiting verified Google Maps connection" className={cn("map-ready-placeholder", isDark ? "map-ready-dark" : "map-ready-light", className)} role="img">
      <div aria-hidden="true" className="map-ready-grid" />
      <div aria-hidden="true" className="map-ready-route map-ready-route-one" />
      <div aria-hidden="true" className="map-ready-route map-ready-route-two" />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="type-eyebrow text-gold">Location</span>
          <MapPin aria-hidden="true" className="text-gold" size={20} strokeWidth={1.6} />
        </div>
        <div className="max-w-[17rem] border-l border-current/25 pl-5">
          <p className={cn("font-display text-[clamp(2rem,3.8vw,4rem)] leading-[0.86] tracking-[-0.065em]", isDark ? "text-white" : "text-primary")}>
            Map-ready.<br /><span className="text-gold">Verified soon.</span>
          </p>
          <p className={cn("mt-4 text-sm leading-6", isDark ? "text-white/66" : "text-muted")}>
            School location map will appear here once the verified Google Maps location is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DirectionsAction({ className, settings }: { className?: string; settings: PublicSchoolSettings }) {
  if (settings.location.googleMapsUrl) {
    return (
      <a className={className} href={settings.location.googleMapsUrl} rel="noreferrer" target="_blank">
        Get Directions
      </a>
    );
  }

  return <span aria-disabled="true" className={cn("directions-pending", className)}>Directions await verified map connection</span>;
}
