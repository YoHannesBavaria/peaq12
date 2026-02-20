import Link from "next/link";
import { ImageLightbox } from "@/components/image-lightbox";
import { getHomeHighlights } from "@/lib/content";
import type { RichPost } from "@/types/content";
import { PostCard } from "@/components/post-card";

type Props = {
  posts: RichPost[];
  sourceLabel: string;
};

export function HomeView({ posts, sourceLabel }: Props) {
  const highlights = getHomeHighlights();
  const latest = posts.slice(0, 6);

  return (
    <main className="container page-flow">
      <section className="hero-panel">
        <p className="eyebrow">peaq GmbH / Edition 12</p>
        <h1>Storage operations clarity, rebuilt for scale</h1>
        <p className="lede">
          This concept prioritizes decision-ready structure: solution overviews, concrete feature proof points, and full
          technical release history with category and author navigation.
        </p>
        <div className="hero-actions">
          <Link href="/solutions/sam4h" className="btn solid">
            Explore SAM4H
          </Link>
          <Link href="/solutions/ioportal" className="btn ghost">
            Explore IOportal
          </Link>
          <Link href="/blogs" className="btn ghost">
            Browse Blog
          </Link>
        </div>
      </section>

      <section className="feature-grid">
        {highlights.map((item) => (
          <article key={item.title} className="feature-card">
            <ImageLightbox
              src={item.image}
              alt={`${item.title} preview`}
              width={960}
              height={600}
              sizes="(max-width: 1024px) 100vw, 33vw"
              imageClassName="feature-image"
            />
            <div>
              <p className="card-eyebrow">{item.subtitle}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link href={item.href}>Open {item.title}</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="section-head">
        <div>
          <p className="eyebrow">Latest updates</p>
          <h2>Release news and technical articles</h2>
        </div>
        <Link href="/blogs" className="inline-link">
          View all posts
        </Link>
      </section>

      <section className="post-grid">
        {latest.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>

      <section className="meta-strip">
        <span>{posts.length} migrated posts</span>
        <span>Source: {sourceLabel}</span>
      </section>
    </main>
  );
}
