import Link from "next/link";
import { PostCard } from "@/components/post-card";
import type { RichCategory, RichPost } from "@/types/content";

type Props = {
  category: RichCategory;
  posts: RichPost[];
};

export function CategoryView({ category, posts }: Props) {
  return (
    <main className="container page-flow">
      <section className="hero-panel">
        <p className="eyebrow">Category</p>
        <h1>{category.name}</h1>
        <p className="lede">{posts.length} posts in this category.</p>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>

      {posts.length === 0 ? (
        <section className="empty-state">
          <p>No direct posts were found for this legacy category.</p>
          <Link href="/blogs">Open all blog posts</Link>
        </section>
      ) : null}
    </main>
  );
}
