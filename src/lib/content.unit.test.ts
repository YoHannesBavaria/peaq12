import { describe, expect, it } from "vitest";
import {
  canonicalInternalPath,
  internalPathFromHref,
  normalizePath,
  pathToSlugParts,
  resolveRoute,
  slugPartsToPath,
} from "./content";
import type { SiteContent } from "@/types/content";

describe("content utils", () => {
  it("normalizes paths", () => {
    expect(normalizePath("solutions/ioportal/")).toBe("/solutions/ioportal");
    expect(normalizePath("/")).toBe("/");
  });

  it("roundtrips slug parts", () => {
    const route = "/solutions/sam4h";
    expect(slugPartsToPath(pathToSlugParts(route))).toBe(route);
    expect(slugPartsToPath([])).toBe("/");
  });

  it("canonicalizes legacy blog aliases", () => {
    expect(canonicalInternalPath("/blogs/index/")).toBe("/blogs");
    expect(canonicalInternalPath("/blogs/index/page/2/index.html")).toBe("/blogs/page/2");
  });

  it("maps internal hrefs only", () => {
    expect(internalPathFromHref("https://www.peaq.ch/contact")).toBe("/contact");
    expect(internalPathFromHref("https://www.peaq.ch/blogs/index/")).toBe("/blogs");
    expect(internalPathFromHref("https://example.com/x")).toBeNull();
  });

  it("resolves unknown legacy categories as empty category pages", () => {
    const content: SiteContent = {
      menu: [],
      menuItems: [],
      routes: [],
      blogAliases: [],
      posts: [],
      authors: [],
      categories: [],
      sourceLabel: "legacy-html",
    };

    const route = resolveRoute("/category/automation", content);
    expect(route).not.toBeNull();
    expect(route?.kind).toBe("category");
    if (route?.kind === "category") {
      expect(route.category.name).toBe("Automation");
      expect(route.posts).toHaveLength(0);
    }
  });
});
