import Link from "next/link";
import type { InternalMenuItem } from "@/types/content";

type Props = {
  menuItems: InternalMenuItem[];
};

export function Navigation({ menuItems }: Props) {
  return (
    <header className="topbar">
      <div className="container topbar-row">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark">peaq12</span>
          <span className="brand-sub">enterprise editorial</span>
        </Link>

        <nav className="menu-list" aria-label="Main navigation">
          {menuItems.map((item) =>
            item.external ? (
              <a key={`${item.label}-${item.href}`} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ) : (
              <Link key={`${item.label}-${item.path}`} href={item.path || "/"}>
                {item.label}
              </Link>
            ),
          )}
          <Link href="/blogs">News</Link>
          <Link href="/library">Library</Link>
        </nav>
      </div>
    </header>
  );
}
