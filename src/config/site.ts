// Production redirects the apex domain to www. Canonical URLs use the final host.
export const SITE_URL = "https://www.belis.agency";

export const VISUAL_SERVICE = { href: "/comunicacao-visual", label: "Comunicação visual" } as const;
export const ENGINEERING_SERVICE = { href: "/engenharia-reversa", label: "Engenharia reversa e impressão 3D" } as const;
export const SERVICE_LINKS = [VISUAL_SERVICE, ENGINEERING_SERVICE] as const;
