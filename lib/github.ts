import "server-only";
import { hiddenRepos, pinnedRepos, profile, projectLanguages, projectNotes } from "@/content";

// Public repos are read at build time and refreshed hourly (ISR). Set
// GITHUB_TOKEN to raise the rate limit from 60 to 5,000 requests an hour.

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

export type LanguageShare = { name: string; share: number; color: string };

export type Project = {
  repo: string;
  pinned: boolean;
  name: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  url: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
  extraLinks: { label: string; url: string }[];
  languages: LanguageShare[];
  updatedLabel?: string;
  updatedISO?: string;
};

export type GitHubStats = {
  publicRepos: number;
  lastPushLabel: string;
};

export type GitHubData = {
  projects: Project[];
  stats: GitHubStats | null;
  live: boolean;
};

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

// Linguist colors for the languages these repos use.
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#663399",
  HTML: "#e34c26",
  PLpgSQL: "#336790",
  Dockerfile: "#384d54",
  Python: "#3572a5",
  Dart: "#00b4ab",
  "C#": "#178600",
  Shell: "#89e051",
};

async function gh<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(`${API}${path}`, { headers, next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`GitHub ${path} returned ${res.status}`);
  return res.json() as Promise<T>;
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(iso: string, now = Date.now()) {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

function toShares(bytes: Record<string, number>): LanguageShare[] {
  const total = Object.values(bytes).reduce((sum, n) => sum + n, 0);
  if (!total) return [];
  return Object.entries(bytes)
    .map(([name, n]) => ({ name, share: n / total, color: languageColors[name] ?? "#8b8b9e" }))
    .filter((lang) => lang.share >= 0.01)
    .sort((a, b) => b.share - a.share);
}

// Pinned repos sort first in their listed order; everything else ties and falls back to newest push.
function pinRank(name: string) {
  const i = pinnedRepos.indexOf(name);
  return i === -1 ? pinnedRepos.length : i;
}

function isProject(repo: Repo) {
  if (repo.fork || repo.archived || hiddenRepos.includes(repo.name)) return false;
  if (pinnedRepos.includes(repo.name)) return true;
  if (!repo.language || !projectLanguages.includes(repo.language)) return false;
  // A repo needs a description or a note in content.ts to say what it is.
  return Boolean(repo.description || projectNotes[repo.name]);
}

function prettyName(repo: string) {
  return repo
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildProject(repo: Repo, languages: LanguageShare[]): Project {
  const note = projectNotes[repo.name];
  return {
    repo: repo.name,
    pinned: pinnedRepos.includes(repo.name),
    name: note?.name ?? prettyName(repo.name),
    tagline: note?.tagline ?? repo.description ?? "",
    highlights: note?.highlights ?? [],
    stack: note?.stack ?? (repo.language ? [repo.language] : []),
    url: repo.html_url,
    demo: note?.demo ?? (repo.homepage || undefined),
    image: note?.image,
    imageAlt: note?.imageAlt,
    extraLinks: note?.extraLinks ?? [],
    languages,
    updatedLabel: `Updated ${timeAgo(repo.pushed_at)}`,
    updatedISO: repo.pushed_at,
  };
}

// Used when the API is unreachable, so the section is never empty.
function fallbackProjects(): Project[] {
  return Object.entries(projectNotes).map(([repo, note]) => ({
    repo,
    pinned: pinnedRepos.includes(repo),
    name: note.name ?? prettyName(repo),
    tagline: note.tagline,
    highlights: note.highlights,
    stack: note.stack,
    url: `${profile.github}/${repo}`,
    demo: note.demo,
    image: note.image,
    imageAlt: note.imageAlt,
    extraLinks: note.extraLinks ?? [],
    languages: [],
  }));
}

export async function getGitHubData(): Promise<GitHubData> {
  try {
    const [user, repos] = await Promise.all([
      gh<{ public_repos: number }>(`/users/${profile.githubUser}`),
      gh<Repo[]>(`/users/${profile.githubUser}/repos?per_page=100&sort=pushed&type=owner`),
    ]);

    const picked = repos
      .filter(isProject)
      .sort((a, b) => pinRank(a.name) - pinRank(b.name) || b.pushed_at.localeCompare(a.pushed_at));

    const projects = await Promise.all(
      picked.map(async (repo) => {
        const bytes = await gh<Record<string, number>>(
          `/repos/${profile.githubUser}/${repo.name}/languages`,
        ).catch(() => ({}));
        return buildProject(repo, toShares(bytes));
      }),
    );

    const latest = repos.reduce<string | null>(
      (max, repo) => (!max || repo.pushed_at > max ? repo.pushed_at : max),
      null,
    );

    return {
      projects: projects.length ? projects : fallbackProjects(),
      stats: {
        publicRepos: user.public_repos,
        lastPushLabel: latest ? timeAgo(latest) : "recently",
      },
      live: projects.length > 0,
    };
  } catch (error) {
    console.error("Falling back to content.ts projects:", error);
    return { projects: fallbackProjects(), stats: null, live: false };
  }
}
