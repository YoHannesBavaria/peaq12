"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { InternalMenuItem } from "@/types/content";

type Props = {
  menuItems: InternalMenuItem[];
};

type MenuLink = {
  key: string;
  label: string;
  href: string;
  external: boolean;
};

export function Navigation({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const links = useMemo(() => {
    const list: MenuLink[] = menuItems.map((item) => ({
      key: `${item.label}-${item.href}`,
      label: item.label,
      href: item.path || item.href,
      external: item.external,
    }));

    const hasBlogs = list.some((item) => item.href === "/blogs");
    if (!hasBlogs) {
      list.push({
        key: "blogs",
        label: "Blog",
        href: "/blogs",
        external: false,
      });
    }

    list.push({
      key: "library",
      label: "Library",
      href: "/library",
      external: false,
    });

    return list;
  }, [menuItems]);

  return (
    <header className="topbar">
      <div className="container topbar-row">
        <Link href="/" className="brand-lockup" onClick={() => setIsOpen(false)}>
          <span className="brand-logo-wrap">
            <Image
              src="/assets/images/logo.png"
              alt="peaq GmbH"
              width={114}
              height={35}
              className="brand-logo brand-logo-dark"
              priority
            />
            <Image
              src="/assets/images/logo-light.png"
              alt="peaq GmbH"
              width={114}
              height={35}
              className="brand-logo brand-logo-light"
              priority
            />
          </span>
          <span className="brand-sub">enterprise editorial</span>
        </Link>

        <button
          type="button"
          className={`menu-toggle ${isOpen ? "is-open" : ""}`}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`menu-list ${isOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((item) =>
            item.external ? (
              <a key={item.key} href={item.href} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.key} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
