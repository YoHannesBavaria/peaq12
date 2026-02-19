import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export default async function LibraryPage() {
  const content = await getSiteContent();
  const grouped = new Map<string, typeof content.pages>();

  for (const page of content.pages) {
    const group = page.category || "other";
    const list = grouped.get(group) || [];
    list.push(page);
    grouped.set(group, list);
  }

  const categories = [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <main className="container page-stack">
      <section className="hero">
        <p className="eyebrow">Complete content map</p>
        <h1>Library</h1>
        <p className="lede">All migrated pages from the legacy peaq website, grouped by category.</p>
      </section>

      {categories.map(([category, pages]) => (
        <section key={category} className="library-group">
          <h2>{category}</h2>
          <ul>
            {pages
              .sort((a, b) => a.path.localeCompare(b.path))
              .map((page) => (
                <li key={page.path}>
                  <Link href={page.path}>{page.title}</Link>
                  <span>{page.path}</span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
