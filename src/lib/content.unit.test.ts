import { describe, expect, it } from "vitest";
import { internalPathFromHref, normalizePath, pathToSlugParts, slugPartsToPath } from "./content";

describe("content utils", () => {
  it("normalizes paths", () => {
    expect(normalizePath("solutions/ioportal/")).toBe("/solutions/ioportal");
    expect(normalizePath("/")).toBe("/");
  });

  it("roundtrips slug parts", () => {
    const path = "/solutions/sam4h";
    expect(slugPartsToPath(pathToSlugParts(path))).toBe(path);
    expect(slugPartsToPath([])).toBe("/");
  });

  it("maps internal hrefs only", () => {
    expect(internalPathFromHref("https://www.peaq.ch/contact")).toBe("/contact");
    expect(internalPathFromHref("/blogs/index/")).toBe("/blogs/index");
    expect(internalPathFromHref("https://example.com/x")).toBeNull();
  });
});
