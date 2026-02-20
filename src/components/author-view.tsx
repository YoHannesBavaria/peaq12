import { ImageLightbox } from "@/components/image-lightbox";
import { PostCard } from "@/components/post-card";
import type { RichAuthor, RichPost } from "@/types/content";

type Props = {
  author: RichAuthor;
  posts: RichPost[];
};

export function AuthorView({ author, posts }: Props) {
  return (
    <main className="container page-flow">
      <section className="author-hero">
        {author.image.src ? (
          <ImageLightbox
            src={author.image.src}
            alt={author.image.alt || author.name}
            width={480}
            height={480}
            sizes="(max-width: 980px) 100vw, 220px"
            imageClassName="author-picture"
          />
        ) : null}
        <div>
          <p className="eyebrow">Author</p>
          <h1>{author.name}</h1>
          <p className="lede">{author.bio}</p>
          {author.linkedin ? (
            <p className="author-links">
              <a href={author.linkedin} target="_blank" rel="noreferrer">
                LinkedIn profile
              </a>
            </p>
          ) : null}
        </div>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>
    </main>
  );
}
