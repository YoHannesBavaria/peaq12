export type LegacyMenuItem = {
  label: string;
  href: string;
};

export type RichAuthor = {
  path: string;
  slug: string;
  name: string;
  bio: string;
  image: {
    src: string;
    alt: string;
  };
  linkedin: string;
};

export type RichCategory = {
  path: string;
  slug: string;
  name: string;
  count: number;
};

export type RichPost = {
  path: string;
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  dateIso: string;
  readTimeMinutes: number;
  category: {
    name: string;
    path: string;
  };
  author: {
    name: string;
    path: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
  bodyHtml: string;
};

export type BlogAlias = {
  path: string;
  page: number;
};

export type RichSiteData = {
  generatedAt: string;
  source: string;
  menu: LegacyMenuItem[];
  routePaths: string[];
  blogAliases: BlogAlias[];
  posts: RichPost[];
  authors: RichAuthor[];
  categories: RichCategory[];
};

export type InternalMenuItem = {
  label: string;
  href: string;
  path: string | null;
  external: boolean;
};

export type RouteBase = {
  path: string;
};

export type ResolvedHomeRoute = RouteBase & {
  kind: "home";
};

export type ResolvedContactRoute = RouteBase & {
  kind: "contact";
};

export type ResolvedSolutionRoute = RouteBase & {
  kind: "solution";
  solution: "sam4h" | "ioportal";
};

export type ResolvedBlogRoute = RouteBase & {
  kind: "blog";
  page: number;
  totalPages: number;
  posts: RichPost[];
};

export type ResolvedPostRoute = RouteBase & {
  kind: "post";
  post: RichPost;
  related: RichPost[];
};

export type ResolvedCategoryRoute = RouteBase & {
  kind: "category";
  category: RichCategory;
  posts: RichPost[];
};

export type ResolvedAuthorRoute = RouteBase & {
  kind: "author";
  author: RichAuthor;
  posts: RichPost[];
};

export type ResolvedRoute =
  | ResolvedHomeRoute
  | ResolvedContactRoute
  | ResolvedSolutionRoute
  | ResolvedBlogRoute
  | ResolvedPostRoute
  | ResolvedCategoryRoute
  | ResolvedAuthorRoute;

export type SiteContent = {
  menu: LegacyMenuItem[];
  menuItems: InternalMenuItem[];
  routes: string[];
  blogAliases: BlogAlias[];
  posts: RichPost[];
  authors: RichAuthor[];
  categories: RichCategory[];
  sourceLabel: string;
};

export type ProductHighlight = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
};

export type SolutionFeature = {
  title: string;
  description: string;
  icon: string;
};

export type SolutionSpec = {
  id: "sam4h" | "ioportal";
  title: string;
  strapline: string;
  summary: string;
  heroImage: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  features: SolutionFeature[];
  screenshots: string[];
};

export type SanityPage = {
  _id: string;
  title: string;
  path: string;
  category?: string;
  excerpt?: string;
  text?: string;
};
