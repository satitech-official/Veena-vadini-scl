export type NavigationItem = {
  label: string;
  href: string;
};

/**
 * Public routes are declared once here so the desktop and mobile navigation
 * always present the same information architecture.
 */
export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/facilities" },
  { label: "Student Life", href: "/student-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export const admissionRoute = "/admissions";
