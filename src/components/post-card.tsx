import Image from "next/image";
import Link from "next/link";
import type { RichPost } from "@/types/content";

type Props = {
  post: RichPost;
};

export function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      {post.heroImage.src ? (
        <Link href={post.path} className="post-image-wrap">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt || post.title}
            width={960}
            height={540}
            sizes="(max-width: 1024px) 100vw, 33vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      ) : null}

      <div className="post-content">
        <p className="post-meta">
          <span>{post.category.name}</span>
          {post.dateLabel ? <span>{post.dateLabel}</span> : null}
        </p>
        <h3>
          <Link href={post.path}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <p className="post-foot">
          {post.author.name ? `By ${post.author.name}` : "peaq editorial"}
          <span>{post.readTimeMinutes} min read</span>
        </p>
      </div>
    </article>
  );
}
