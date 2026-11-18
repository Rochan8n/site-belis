// Keep attribution parameters, but never forward arbitrary form/query fields.
const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_content", "utm_term"];
const clickKeys = ["gclid", "dclid", "gbraid", "wbraid"];

export function analyticsPageLocation(href: string): string {
  const source = new URL(href);
  const clean = new URL(source.pathname, source.origin);
  for (const key of campaignKeys) {
    const value = source.searchParams.get(key);
    // Campaign labels must not contain email addresses or phone-like numbers.
    if (value && value.length <= 200 && !/[@\r\n]/.test(value)
      && (key === "utm_id" || !/\d[\d\s()+.-]{7,}\d/.test(value))) {
      clean.searchParams.set(key, value);
    }
  }
  for (const key of clickKeys) {
    const value = source.searchParams.get(key);
    if (value && /^[A-Za-z0-9_-]{1,256}$/.test(value)) clean.searchParams.set(key, value);
  }
  return clean.href;
}

export function analyticsReferrer(href: string): string {
  if (!href) return "";
  try {
    const url = new URL(href);
    return /^https?:$/.test(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
}
