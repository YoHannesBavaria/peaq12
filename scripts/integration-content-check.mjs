import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "site-structure.json");

const raw = await fs.readFile(dataPath, "utf8");
const data = JSON.parse(raw);

if (!Array.isArray(data.pages) || data.pages.length === 0) {
  throw new Error("No pages in site-structure.json");
}

if (!Array.isArray(data.primary_menu) || data.primary_menu.length === 0) {
  throw new Error("No primary_menu items found");
}

const paths = new Set(data.pages.map((p) => normalizePath(p.path)));
if (!paths.has("/")) {
  throw new Error("Home path '/' is missing from content pages");
}

for (const item of data.primary_menu) {
  const href = String(item.href || "");
  let maybePath = null;
  try {
    const u = new URL(href);
    if (u.hostname === "peaq.ch" || u.hostname === "www.peaq.ch") {
      maybePath = normalizePath(u.pathname);
    }
  } catch {
    if (href.startsWith("/")) maybePath = normalizePath(href);
  }

  if (maybePath && !paths.has(maybePath)) {
    throw new Error(`Menu link not found in migrated pages: ${maybePath}`);
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      pages: data.pages.length,
      menu: data.primary_menu.length,
    },
    null,
    2,
  ),
);

function normalizePath(pathLike) {
  let out = String(pathLike || "/").trim();
  if (!out.startsWith("/")) out = `/${out}`;
  if (out !== "/" && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}
