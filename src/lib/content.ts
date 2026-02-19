import richData from "@/data/rich-content.json";
import type {
  BlogAlias,
  InternalMenuItem,
  ProductHighlight,
  ResolvedRoute,
  RichPost,
  RichSiteData,
  SiteContent,
  SolutionSpec,
} from "@/types/content";

const typedData = richData as RichSiteData;
const BLOG_PAGE_SIZE = 12;

const HOME_HIGHLIGHTS: ProductHighlight[] = [
  {
    title: "SAM4H",
    subtitle: "Smart Storage Provisioning",
    description:
      "Automate volume and replication management for Hitachi block storage with robust, auditable workflows and rapid execution.",
    href: "/solutions/sam4h",
    image: "https://www.peaq.ch/assets/images/sam4h/sam4h_screenshot1_ipad2.png",
  },
  {
    title: "IOportal",
    subtitle: "Performance Monitoring",
    description:
      "Cloud-native visibility into storage performance with anomaly detection, proactive health checks, and intuitive dashboards.",
    href: "/solutions/ioportal",
    image: "https://www.peaq.ch/assets/images/ioportal/ioportal_home.png",
  },
  {
    title: "X-Charging",
    subtitle: "Cost Transparency",
    description:
      "Customer-specific cross-charging reports linking infrastructure usage with real cost-center accountability.",
    href: "/contact",
    image: "https://www.peaq.ch/assets/images/x-charging/x-charging-w-logo.png",
  },
];

const SOLUTIONS: Record<"sam4h" | "ioportal", SolutionSpec> = {
  sam4h: {
    id: "sam4h",
    title: "SAM4H",
    strapline: "Smart Storage Provisioning",
    summary:
      "SAM4H accelerates Hitachi block storage operations with safe automation, role separation, and enterprise-grade replication workflows.",
    heroImage: "https://www.peaq.ch/assets/images/sam4h/sam4h_screenshot1_ipad2.png",
    cta: [
      { label: "Free Trial License", href: "https://try.sam4h.com", external: true },
      { label: "Request Demo", href: "https://capture.navattic.com/cm0ayrdxu000103l8dwnngans", external: true },
    ],
    features: [
      {
        title: "Volumes / Replications",
        description: "Accelerate provisioning and lifecycle operations for enterprise volumes and replication pairs.",
        icon: "https://www.peaq.ch/assets/images/icons/database.png",
      },
      {
        title: "Automation",
        description: "Rules-based automation from engineering setup to day-to-day operations with full traceability.",
        icon: "https://www.peaq.ch/assets/images/icons/cogs.png",
      },
      {
        title: "Service Quality",
        description: "Consistent standards and reduced operational risk with policy-driven workflows and safeguards.",
        icon: "https://www.peaq.ch/assets/images/icons/heartbeat.png",
      },
      {
        title: "REST API",
        description: "Integrate SAM4H into CI/CD, change workflows, and orchestration tools via API endpoints.",
        icon: "https://www.peaq.ch/assets/images/icons/searchengin.png",
      },
    ],
    screenshots: [
      "https://www.peaq.ch/assets/images/sam4h/screenshot_dashboard.png",
      "https://www.peaq.ch/assets/images/sam4h/screenshot_array_mgmt.png",
      "https://www.peaq.ch/assets/images/sam4h/screenshot_cluster_fabric_report.png",
      "https://www.peaq.ch/assets/images/sam4h/screenshot_cluster_lun_report.png",
      "https://www.peaq.ch/assets/images/sam4h/screenshot_dpv_config_template.png",
      "https://www.peaq.ch/assets/images/sam4h/screenshot_rest_api.png",
    ],
  },
  ioportal: {
    id: "ioportal",
    title: "IOportal",
    strapline: "Storage Performance Monitoring",
    summary:
      "IOportal combines analytics, benchmarking, and proactive service insights to keep Hitachi storage arrays efficient and predictable.",
    heroImage: "https://www.peaq.ch/assets/images/ioportal/ioportal_home.png",
    cta: [
      { label: "Explore Features", href: "/blogs" },
      { label: "Contact peaq", href: "/contact" },
    ],
    features: [
      {
        title: "Anomaly Radar",
        description: "Identify and prioritize abnormal behavior quickly with statistics-driven anomaly detection.",
        icon: "https://www.peaq.ch/assets/images/icons/chart-bar.png",
      },
      {
        title: "Health Checks",
        description: "Periodic expert reviews and long-term trend analysis to prevent creeping performance issues.",
        icon: "https://www.peaq.ch/assets/images/icons/heartbeat.png",
      },
      {
        title: "Capacity Analytics",
        description: "Track pool risk, compression effects, and growth trajectories with actionable dashboards.",
        icon: "https://www.peaq.ch/assets/images/icons/database.png",
      },
      {
        title: "Benchmarking",
        description: "Compare array and workload behavior to uncover optimization opportunities across environments.",
        icon: "https://www.peaq.ch/assets/images/icons/th-list.png",
      },
    ],
    screenshots: [
      "https://www.peaq.ch/assets/images/ioportal/dashboard-kpis.png",
      "https://www.peaq.ch/assets/images/ioportal/dashboard-anomalies.png",
      "https://www.peaq.ch/assets/images/ioportal/dashboard-comparison.png",
      "https://www.peaq.ch/assets/images/ioportal/healthcheck.png",
      "https://www.peaq.ch/assets/images/ioportal/capacity1.png",
      "https://www.peaq.ch/assets/images/ioportal/benchmark.png",
    ],
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  const menuItems = typedData.menu.map(toInternalMenuItem);
  const routes = getStaticRoutePaths();

  return {
    menu: typedData.menu,
    menuItems,
    routes,
    blogAliases: typedData.blogAliases,
    posts: typedData.posts,
    authors: typedData.authors,
    categories: typedData.categories,
    sourceLabel: "legacy-html",
  };
}

export function getHomeHighlights() {
  return HOME_HIGHLIGHTS;
}

export function getSolutionSpec(id: "sam4h" | "ioportal") {
  return SOLUTIONS[id];
}

export function getStaticRoutePaths() {
  const set = new Set<string>(typedData.routePaths.map((value) => normalizePath(value)));
  set.add("/blogs");
  set.add("/blogs/index");

  const totalPages = getBlogTotalPages(typedData.posts.length);
  for (let page = 2; page <= totalPages; page += 1) {
    set.add(`/blogs/page/${page}`);
  }

  return [...set].sort((a, b) => a.localeCompare(b));
}

export function resolveRoute(pathname: string, content: SiteContent): ResolvedRoute | null {
  const path = normalizePath(pathname);

  if (path === "/") {
    return { kind: "home", path };
  }

  if (path === "/contact") {
    return { kind: "contact", path };
  }

  if (path === "/solutions/sam4h") {
    return { kind: "solution", path, solution: "sam4h" };
  }
  if (path === "/solutions/ioportal") {
    return { kind: "solution", path, solution: "ioportal" };
  }

  const blogPage = pageForBlogPath(path, content.blogAliases);
  if (blogPage > 0) {
    const pagePayload = paginatePosts(content.posts, blogPage, BLOG_PAGE_SIZE);
    if (!pagePayload) return null;
    return {
      kind: "blog",
      path,
      page: blogPage,
      totalPages: pagePayload.totalPages,
      posts: pagePayload.items,
    };
  }

  const post = content.posts.find((item) => normalizePath(item.path) === path);
  if (post) {
    const related = content.posts
      .filter((candidate) => candidate.path !== post.path && candidate.category.path === post.category.path)
      .slice(0, 4);
    return { kind: "post", path, post, related };
  }

  const category = content.categories.find((item) => normalizePath(item.path) === path);
  if (category) {
    const posts = content.posts.filter((postItem) => normalizePath(postItem.category.path) === path);
    return { kind: "category", path, category, posts };
  }

  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const posts = content.posts.filter((postItem) => normalizePath(postItem.category.path) === path);
    const slug = categoryMatch[1];
    return {
      kind: "category",
      path,
      category: {
        path,
        slug,
        name: slugToLabel(slug),
        count: posts.length,
      },
      posts,
    };
  }

  const author = content.authors.find((item) => normalizePath(item.path) === path);
  if (author) {
    const posts = content.posts.filter((postItem) => normalizePath(postItem.author.path) === path);
    return { kind: "author", path, author, posts };
  }

  return null;
}

export function normalizePath(pathLike: string): string {
  if (!pathLike) return "/";
  let out = pathLike.trim();
  if (!out.startsWith("/")) out = `/${out}`;
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out;
}

export function pathToSlugParts(pathname: string): string[] {
  const norm = normalizePath(pathname);
  if (norm === "/") return [];
  return norm.slice(1).split("/");
}

export function slugPartsToPath(parts: string[] | undefined): string {
  if (!parts || parts.length === 0) return "/";
  return normalizePath(`/${parts.join("/")}`);
}

export function internalPathFromHref(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname !== "www.peaq.ch" && url.hostname !== "peaq.ch") return null;
    return canonicalInternalPath(url.pathname);
  } catch {
    if (!href.startsWith("/")) return null;
    return canonicalInternalPath(href);
  }
}

export function canonicalInternalPath(pathname: string) {
  const path = normalizePath(pathname);
  if (path === "/blogs/index" || path === "/blogs/index/index.html") return "/blogs";
  const pageMatch = path.match(/^\/blogs\/index\/page\/(\d+)\/index\.html$/);
  if (pageMatch) {
    const page = Number(pageMatch[1]);
    if (page > 1) return `/blogs/page/${page}`;
    return "/blogs";
  }
  return path;
}

type PaginationResult = {
  items: RichPost[];
  totalPages: number;
};

function paginatePosts(posts: RichPost[], page: number, pageSize: number): PaginationResult | null {
  const totalPages = getBlogTotalPages(posts.length, pageSize);
  if (page < 1 || page > totalPages) return null;
  const start = (page - 1) * pageSize;
  return {
    items: posts.slice(start, start + pageSize),
    totalPages,
  };
}

function getBlogTotalPages(totalPosts: number, pageSize = BLOG_PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalPosts / pageSize));
}

function pageForBlogPath(path: string, aliases: BlogAlias[]) {
  if (path === "/blogs" || path === "/blogs/index") return 1;

  const canonicalPage = path.match(/^\/blogs\/page\/(\d+)$/);
  if (canonicalPage) {
    return Number(canonicalPage[1]);
  }

  const alias = aliases.find((item) => normalizePath(item.path) === path);
  if (!alias) return -1;
  return alias.page;
}

function toInternalMenuItem(item: { label: string; href: string }): InternalMenuItem {
  const path = internalPathFromHref(item.href);
  return {
    label: item.label,
    href: item.href,
    path,
    external: path === null,
  };
}

function slugToLabel(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
