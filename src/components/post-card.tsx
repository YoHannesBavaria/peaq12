import Link from "next/link";
import { ImageLightbox } from "@/components/image-lightbox";
import type { RichPost } from "@/types/content";

type Props = {
  post: RichPost;
};

export function PostCard({ post }: Props) {
  const teaser = truncate(post.excerpt, 220);

  return (
    <article className="post-card">
      {post.heroImage.src ? (
        <div className="post-image-wrap">
          <ImageLightbox
            src={post.heroImage.src}
            alt={post.heroImage.alt || post.title}
            width={960}
            height={540}
            sizes="(max-width: 1024px) 100vw, 33vw"
            imageClassName="post-image"
            fillHeight
          />
        </div>
      ) : null}

      <div className="post-content">
        <p className="post-meta">
          <span>{post.category.name}</span>
          {post.dateLabel ? <span>{post.dateLabel}</span> : null}
        </p>
        <h3>
          <Link href={post.path}>{post.title}</Link>
        </h3>
        <p>{teaser}</p>
        <p className="post-foot">
          {post.author.name ? `By ${post.author.name}` : "peaq editorial"}
          <span>{post.readTimeMinutes} min read</span>
        </p>
        <p className="post-read-link">
          <Link href={post.path}>Read article</Link>
        </p>
      </div>
    </article>
  );
}

function truncate(value: string, maxLength: number) {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}
