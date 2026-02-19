import type { LegacyPage } from "@/types/content";

type Props = {
  page: LegacyPage;
};

export function PageView({ page }: Props) {
  return (
    <main className="container page-stack">
      <article className="article-shell">
        <p className="eyebrow">{page.category}</p>
        <h1>{page.title}</h1>
        <p className="lede">{page.excerpt || page.text.slice(0, 240)}</p>
        <section className="article-body">
          {page.text
            .split(/\n{2,}/)
            .map((para) => para.trim())
            .filter(Boolean)
            .slice(0, 60)
            .map((para, idx) => (
              <p key={`${page.path}-p-${idx}`}>{para}</p>
            ))}
        </section>
      </article>
    </main>
  );
}
