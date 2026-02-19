import Link from "next/link";
import { PostCard } from "@/components/post-card";
import type { RichCategory, RichPost } from "@/types/content";

type Props = {
  page: number;
  totalPages: number;
  posts: RichPost[];
  categories: RichCategory[];
};

export function BlogIndexView({ page, totalPages, posts, categories }: Props) {
  const prevHref = page <= 2 ? "/blogs" : `/blogs/page/${page - 1}`;
  const nextHref = `/blogs/page/${page + 1}`;

  return (
    <main className="container page-flow">
      <section className="hero-panel">
        <p className="eyebrow">peaq blog</p>
        <h1>Storage insights, releases, and field updates</h1>
        <p className="lede">
          Technical release notes, performance tuning reports, and event updates from the peaq engineering and consulting
          team.
        </p>
      </section>

      <section className="chip-row">
        {categories.map((category) => (
          <Link key={category.path} href={category.path} className="chip">
            {category.name} ({category.count})
          </Link>
        ))}
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>

      <nav className="pager" aria-label="Blog pagination">
        <span>
          Page {page} / {totalPages}
        </span>
        <div className="pager-actions">
          {page > 1 ? <Link href={prevHref}>Previous</Link> : <span className="disabled">Previous</span>}
          {page < totalPages ? <Link href={nextHref}>Next</Link> : <span className="disabled">Next</span>}
        </div>
      </nav>
    </main>
  );
}
