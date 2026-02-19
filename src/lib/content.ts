import siteData from "@/data/site-structure.json";
import { fetchSanityPages, sanityEnabled } from "@/lib/sanity";
import type { LegacyPage, LegacySiteData, SiteContent } from "@/types/content";

const typedData = siteData as LegacySiteData;

export async function getSiteContent(): Promise<SiteContent> {
  const legacyPages = dedupePages(typedData.pages);
  if (!sanityEnabled) {
    return {
      menu: typedData.primary_menu,
      pages: legacyPages,
      sourceLabel: "legacy",
    };
  }

  const sanityPages = await fetchSanityPages();
  if (!sanityPages.length) {
    return {
      menu: typedData.primary_menu,
      pages: legacyPages,
      sourceLabel: "legacy",
    };
  }

  const byPath = new Map<string, LegacyPage>();
  for (const page of legacyPages) {
    byPath.set(normalizePath(page.path), page);
  }

  for (const page of sanityPages) {
    const norm = normalizePath(page.path);
    byPath.set(norm, {
      id: `sanity-${page._id}`,
      url: `sanity://${page._id}`,
      path: norm,
      category: page.category || "sanity",
      title: page.title,
      excerpt: page.excerpt || "",
      text: page.text || "",
    });
  }

  return {
    menu: typedData.primary_menu,
    pages: [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path)),
    sourceLabel: "legacy+sanity",
  };
}

export function normalizePath(pathLike: string): string {
  if (!pathLike) return "/";
  let out = pathLike.trim();
  if (!out.startsWith("/")) out = `/${out}`;
  if (out !== "/" && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

export function pathToSlugParts(pathname: string): string[] {
  const norm = normalizePath(pathname);
  if (norm === "/") return [];
  return norm.slice(1).split("/");
}

export function slugPartsToPath(parts: string[] | undefined): string {
  if (!parts || parts.length === 0) return "/";
  return normalizePath(`/${parts.join("/")}`);
}

export function internalPathFromHref(href: string): string | null {
  try {
    const u = new URL(href);
    if (u.hostname !== "www.peaq.ch" && u.hostname !== "peaq.ch") return null;
    return normalizePath(u.pathname);
  } catch {
    if (href.startsWith("/")) return normalizePath(href);
    return null;
  }
}

function dedupePages(pages: LegacyPage[]): LegacyPage[] {
  const map = new Map<string, LegacyPage>();
  for (const p of pages) {
    const norm = normalizePath(p.path);
    map.set(norm, { ...p, path: norm });
  }
  return [...map.values()].sort((a, b) => a.path.localeCompare(b.path));
}
