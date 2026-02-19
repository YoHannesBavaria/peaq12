import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export default async function LibraryPage() {
  const content = await getSiteContent();

  return (
    <main className="container page-flow">
      <section className="hero-panel">
        <p className="eyebrow">Content library</p>
        <h1>Complete route and content index</h1>
        <p className="lede">
          Every migrated legacy route is preserved. Categories and author hubs are rebuilt with structured post data.
        </p>
      </section>

      <section className="library-stats">
        <article>
          <h2>{content.posts.length}</h2>
          <p>Posts</p>
        </article>
        <article>
          <h2>{content.categories.length}</h2>
          <p>Categories</p>
        </article>
        <article>
          <h2>{content.authors.length}</h2>
          <p>Authors</p>
        </article>
        <article>
          <h2>{content.routes.length}</h2>
          <p>Routes</p>
        </article>
      </section>

      <section className="library-group">
        <h2>Categories</h2>
        <ul>
          {content.categories.map((category) => (
            <li key={category.path}>
              <Link href={category.path}>{category.name}</Link>
              <span>{category.count} posts</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="library-group">
        <h2>Authors</h2>
        <ul>
          {content.authors.map((author) => (
            <li key={author.path}>
              <Link href={author.path}>{author.name}</Link>
              <span>{author.path}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="library-group">
        <h2>Legacy routes</h2>
        <ul>
          {content.routes.map((route) => (
            <li key={route}>
              <Link href={route}>{route}</Link>
              <span>migrated</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
