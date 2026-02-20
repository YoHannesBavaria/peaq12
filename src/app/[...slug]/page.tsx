import { notFound } from "next/navigation";
import { AuthorView } from "@/components/author-view";
import { BlogIndexView } from "@/components/blog-index-view";
import { CategoryView } from "@/components/category-view";
import { ContactView } from "@/components/contact-view";
import { PostView } from "@/components/post-view";
import { SolutionView } from "@/components/solution-view";
import { getSiteContent, getSolutionSpec, pathToSlugParts, resolveRoute, slugPartsToPath } from "@/lib/content";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.routes
    .filter(
      (route) =>
        route !== "/" &&
        route !== "/library" &&
        route !== "/impressum" &&
        route !== "/datenschutz" &&
        route !== "/agb" &&
        route !== "/cookie",
    )
    .map((route) => ({ slug: pathToSlugParts(route) }));
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const pathname = slugPartsToPath(slug);
  if (pathname === "/library") return notFound();

  const content = await getSiteContent();
  const route = resolveRoute(pathname, content);
  if (!route) return notFound();

  switch (route.kind) {
    case "home":
      return notFound();
    case "contact":
      return <ContactView />;
    case "solution": {
      const spec = getSolutionSpec(route.solution);
      const relatedPosts = content.posts.filter(
        (post) => post.category.path === `/category/${route.solution}` || post.category.name.toLowerCase() === route.solution,
      );
      return <SolutionView solution={spec} relatedPosts={relatedPosts.slice(0, 6)} />;
    }
    case "blog":
      return (
        <BlogIndexView
          page={route.page}
          totalPages={route.totalPages}
          posts={route.posts}
          categories={content.categories}
        />
      );
    case "post":
      return <PostView post={route.post} related={route.related} />;
    case "category":
      return <CategoryView category={route.category} posts={route.posts} />;
    case "author":
      return <AuthorView author={route.author} posts={route.posts} />;
    default:
      return notFound();
  }
}
