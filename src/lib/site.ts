const FALLBACK_URL = "http://localhost:3000";

export function siteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL;
  const normalized = base.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalized}${path ? cleanPath : ""}`;
}
