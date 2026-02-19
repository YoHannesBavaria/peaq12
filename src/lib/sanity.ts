import { createClient } from "@sanity/client";
import type { SanityPage } from "@/types/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN;

const enabled = Boolean(projectId && dataset);

const client = enabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-02-01",
      useCdn: true,
      token,
      perspective: "published",
    })
  : null;

export const sanityEnabled = enabled;

export async function fetchSanityPages(): Promise<SanityPage[]> {
  if (!client) return [];

  try {
    const query = `*[_type == "page"]{
      _id,
      title,
      "path": select(defined(path.current) => path.current, "/"),
      category,
      excerpt,
      "text": coalesce(body, content, "")
    }`;
    const rows = await client.fetch(query);
    if (!Array.isArray(rows)) return [];
    return rows
      .filter((item) => item && typeof item.path === "string")
      .map((item) => ({
        _id: String(item._id ?? ""),
        title: String(item.title ?? "Untitled"),
        path: normalizePath(String(item.path)),
        category: item.category ? String(item.category) : undefined,
        excerpt: item.excerpt ? String(item.excerpt) : undefined,
        text: item.text ? stringifyRichText(item.text) : undefined,
      }));
  } catch {
    return [];
  }
}

function stringifyRichText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const children = (block as { children?: unknown[] }).children;
      if (!Array.isArray(children)) return "";
      return children
        .map((child) => {
          if (!child || typeof child !== "object") return "";
          const text = (child as { text?: unknown }).text;
          return typeof text === "string" ? text : "";
        })
        .join("");
    })
    .join("\n\n");
}

function normalizePath(pathLike: string): string {
  if (!pathLike) return "/";
  let out = pathLike.trim();
  if (!out.startsWith("/")) out = `/${out}`;
  if (out !== "/" && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}
