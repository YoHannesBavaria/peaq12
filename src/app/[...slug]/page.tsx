import { notFound } from "next/navigation";
import { PageView } from "@/components/page-view";
import { getSiteContent, pathToSlugParts, slugPartsToPath } from "@/lib/content";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.pages
    .filter((page) => page.path !== "/")
    .map((page) => ({ slug: pathToSlugParts(page.path) }));
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const pathname = slugPartsToPath(slug);
  if (pathname === "/library") {
    return notFound();
  }

  const content = await getSiteContent();
  const page = content.pages.find((item) => item.path === pathname);
  if (!page) return notFound();
  return <PageView page={page} />;
}
