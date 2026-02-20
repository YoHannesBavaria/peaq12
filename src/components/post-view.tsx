import Link from "next/link";
import { ArticleBody } from "@/components/article-body";
import { ImageLightbox } from "@/components/image-lightbox";
import { PostCard } from "@/components/post-card";
import type { RichPost } from "@/types/content";

type Props = {
  post: RichPost;
  related: RichPost[];
};

export function PostView({ post, related }: Props) {
  return (
    <main className="container page-flow">
      <article className="article-shell">
        <p className="eyebrow">{post.category.name}</p>
        <h1>{post.title}</h1>
        <p className="article-meta">
          {post.dateLabel ? <span>{post.dateLabel}</span> : null}
          {post.author.name ? <span>By {post.author.name}</span> : null}
          <span>{post.readTimeMinutes} min read</span>
        </p>

        {post.heroImage.src ? (
          <figure className="article-hero-image">
            <ImageLightbox
              src={post.heroImage.src}
              alt={post.heroImage.alt || post.title}
              width={1280}
              height={720}
              sizes="100vw"
              imageClassName="article-hero-picture"
            />
          </figure>
        ) : null}

        <ArticleBody html={post.bodyHtml} />
      </article>

      {related.length > 0 ? (
        <section className="related-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Related</p>
              <h2>More from {post.category.name}</h2>
            </div>
            <Link href={post.category.path}>Open category</Link>
          </div>
          <div className="post-grid">
            {related.map((item) => (
              <PostCard key={item.path} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
