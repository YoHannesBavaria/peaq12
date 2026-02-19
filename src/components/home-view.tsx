import Link from "next/link";
import type { LegacyPage } from "@/types/content";

type Props = {
  pages: LegacyPage[];
  sourceLabel: string;
};

export function HomeView({ pages, sourceLabel }: Props) {
  const solutions = pages.filter((p) => p.path.startsWith("/solutions/")).slice(0, 3);
  const latestArticles = pages.filter((p) => p.category === "article").slice(0, 6);

  return (
    <main className="container page-stack">
      <section className="hero hero-cobalt">
        <p className="eyebrow">Next.js + Sanity enabled</p>
        <h1>peaq platform redesign</h1>
        <p className="lede">
          A contemporary enterprise interface focused on readability, service clarity, and maintainable content
          operations.
        </p>
        <div className="hero-actions">
          <Link href="/solutions/sam4h" className="btn solid">
            Explore SAM4H
          </Link>
          <Link href="/solutions/ioportal" className="btn ghost">
            Explore IOportal
          </Link>
        </div>
      </section>

      <section className="panel-grid">
        {solutions.map((item) => (
          <article key={item.path} className="panel">
            <h2>{item.title}</h2>
            <p>{item.excerpt || item.text.slice(0, 180)}</p>
            <Link href={item.path}>Open page</Link>
          </article>
        ))}
      </section>

      <section className="content-wall">
        <div className="wall-head">
          <h2>Migrated content library</h2>
          <span>{pages.length} pages</span>
        </div>
        <p className="source-badge">Source mode: {sourceLabel}</p>
        <div className="article-list">
          {latestArticles.map((item) => (
            <article key={item.path}>
              <h3>
                <Link href={item.path}>{item.title}</Link>
              </h3>
              <p>{item.excerpt || item.text.slice(0, 220)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
