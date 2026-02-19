export type LegacyMenuItem = {
  label: string;
  href: string;
};

export type LegacyPage = {
  id: string;
  url: string;
  path: string;
  category: string;
  title: string;
  excerpt: string;
  text: string;
};

export type LegacySiteData = {
  generated_at: string;
  source: string;
  page_count: number;
  primary_menu: LegacyMenuItem[];
  pages: LegacyPage[];
};

export type SiteContent = {
  menu: LegacyMenuItem[];
  pages: LegacyPage[];
  sourceLabel: "legacy" | "legacy+sanity";
};

export type SanityPage = {
  _id: string;
  title: string;
  path: string;
  category?: string;
  excerpt?: string;
  text?: string;
};
