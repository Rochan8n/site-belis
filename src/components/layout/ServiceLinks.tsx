import Link from "next/link";
import { SERVICE_LINKS } from "@/config/site";

export function ServiceLinks({ currentPath }: { currentPath?: string }) {
  return SERVICE_LINKS.map(({ href, label }) => (
    <Link key={href} href={href} prefetch={false} aria-current={href === currentPath ? "page" : undefined}>
      {label}
    </Link>
  ));
}
