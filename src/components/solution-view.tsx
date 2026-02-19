import Image from "next/image";
import { PostCard } from "@/components/post-card";
import type { RichPost, SolutionSpec } from "@/types/content";

type Props = {
  solution: SolutionSpec;
  relatedPosts: RichPost[];
};

export function SolutionView({ solution, relatedPosts }: Props) {
  return (
    <main className="container page-flow">
      <section className="hero-panel solution-hero">
        <div>
          <p className="eyebrow">Solution</p>
          <h1>{solution.title}</h1>
          <p className="solution-subtitle">{solution.strapline}</p>
          <p className="lede">{solution.summary}</p>
          <div className="hero-actions">
            {solution.cta.map((item) => (
              <a
                key={`${solution.id}-${item.label}`}
                href={item.href}
                className="btn solid"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <Image
          src={solution.heroImage}
          alt={solution.title}
          className="solution-hero-image"
          width={1280}
          height={720}
          sizes="(max-width: 980px) 100vw, 40vw"
          style={{ width: "100%", height: "auto" }}
        />
      </section>

      <section className="feature-grid compact">
        {solution.features.map((feature) => (
          <article key={`${solution.id}-${feature.title}`} className="feature-card small">
            <Image
              src={feature.icon}
              alt={feature.title}
              className="icon"
              width={26}
              height={26}
              sizes="26px"
            />
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="gallery-grid">
        {solution.screenshots.map((src) => (
          <figure key={`${solution.id}-${src}`}>
            <Image
              src={src}
              alt={`${solution.title} screenshot`}
              width={1280}
              height={720}
              sizes="(max-width: 1024px) 100vw, 33vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </figure>
        ))}
      </section>

      {relatedPosts.length > 0 ? (
        <section className="related-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Latest updates</p>
              <h2>{solution.title} releases and field notes</h2>
            </div>
          </div>
          <div className="post-grid">
            {relatedPosts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
