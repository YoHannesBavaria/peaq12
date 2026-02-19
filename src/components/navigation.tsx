import Link from "next/link";
import { internalPathFromHref } from "@/lib/content";
import type { LegacyMenuItem, LegacyPage } from "@/types/content";

type Props = {
  menu: LegacyMenuItem[];
  pages: LegacyPage[];
};

export function Navigation({ menu, pages }: Props) {
  const corePages = pages.filter(
    (page) =>
      page.path === "/" ||
      page.path.startsWith("/solutions/") ||
      page.path.startsWith("/contact") ||
      page.path.startsWith("/blogs/"),
  );

  return (
    <header className="top-shell">
      <div className="container shell-row">
        <Link href="/" className="brand">
          peaq reboot
        </Link>
        <nav className="main-nav">
          {menu.map((item) => {
            const internal = internalPathFromHref(item.href);
            if (internal) {
              return (
                <Link key={`${item.label}-${item.href}`} href={internal}>
                  {item.label}
                </Link>
              );
            }
            return (
              <a key={`${item.label}-${item.href}`} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            );
          })}
          <Link href="/library">Library</Link>
        </nav>
      </div>
      <div className="container sub-nav">
        {corePages.slice(0, 12).map((page) => (
          <Link key={page.path} href={page.path}>
            {page.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
