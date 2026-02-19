import { HomeView } from "@/components/home-view";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const content = await getSiteContent();
  return <HomeView pages={content.pages} sourceLabel={content.sourceLabel} />;
}
