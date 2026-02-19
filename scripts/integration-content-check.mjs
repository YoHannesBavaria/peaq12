import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "rich-content.json");

const raw = await fs.readFile(dataPath, "utf8");
const data = JSON.parse(raw);

if (!Array.isArray(data.routePaths) || data.routePaths.length < 40) {
  throw new Error("Route coverage is unexpectedly low in rich-content.json");
}

if (!Array.isArray(data.menu) || data.menu.length < 5) {
  throw new Error("Main menu is incomplete in rich-content.json");
}

if (!Array.isArray(data.posts) || data.posts.length < 25) {
  throw new Error("Post corpus is unexpectedly small in rich-content.json");
}

const requiredRoutes = ["/", "/solutions/sam4h", "/solutions/ioportal", "/contact", "/blogs/index"];
for (const route of requiredRoutes) {
  if (!data.routePaths.includes(route)) {
    throw new Error(`Required legacy route is missing: ${route}`);
  }
}

const forbiddenMenuLabel = data.menu.find((item) => /page\s*-\s*\d+/i.test(String(item.label || "")));
if (forbiddenMenuLabel) {
  throw new Error(`Menu still contains pagination placeholder: ${forbiddenMenuLabel.label}`);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      routes: data.routePaths.length,
      posts: data.posts.length,
      menu: data.menu.length,
      authors: Array.isArray(data.authors) ? data.authors.length : 0,
      categories: Array.isArray(data.categories) ? data.categories.length : 0,
    },
    null,
    2,
  ),
);
