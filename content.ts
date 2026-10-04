// Site copy lives in this file so a later email, phone, or job is a small edit.
// Facts come from the public GitHub profile, LinkedIn, and the project READMEs.

export const profile = {
  name: "MD. Asadullah Shibli",
  shortName: "Shibli",
  role: "Full Stack Web Developer",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  education: "Bachelor of Engineering, IUBAT",
  // Value of the work, not a job ask. Django and FastAPI stay off this page on purpose.
  bio: "Full stack web developer based in Dhaka, with a Bachelor of Engineering from IUBAT. I build web applications with TypeScript, React, Next.js, and Node.js, taking a product from the interface through the API and the database.",
  githubUser: "AsadShibli",
  github: "https://github.com/AsadShibli",
  linkedin: "https://www.linkedin.com/in/shibliasadullah/",
  linkedinHandle: "shibliasadullah",
};

// Anchor ids match the section ids in app/page.tsx.
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// Each layer cites the project that shows it, so the claims can be checked.
export const layers = [
  {
    title: "Interface",
    body: "Responsive React and Next.js screens with real states: loading, empty, errors, and role-based views.",
    proof: "StudioDesk switches studios and hides invoices by plan.",
  },
  {
    title: "API",
    body: "Express and Next.js route handlers with cookie sessions, permissions, and validation on the server.",
    proof: "Rise Together serves auth, uploads, and poster rendering.",
  },
  {
    title: "Data",
    body: "PostgreSQL schemas, migrations, and transactions that keep the rules true under concurrent requests.",
    proof: "Dhaka Tesla Pool locks rows so a seat is never sold twice.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Auth & sessions"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "Prisma", "Drizzle", "Supabase", "MongoDB"],
  },
  {
    title: "Tools & deploy",
    items: ["Git", "Docker", "Vercel", "Render"],
  },
];

// The project carousel reads public repos from GitHub, newest push first.
// Only these languages count as web projects for this page.
export const projectLanguages = ["TypeScript", "JavaScript"];

// Repos that are practice, notes, split halves of another project, or this site.
export const hiddenRepos = [
  "portfolio",
  "angular-practice",
  "electron-practice",
  "apex-flow",
  "rise-together",
  "rise-together-backend",
];

export type ProjectNote = {
  name?: string;
  tagline: string;
  highlights: string[];
  stack: string[];
  demo?: string;
  image?: string;
  imageAlt?: string;
  extraLinks?: { label: string; url: string }[];
};

// Richer copy for repos by name. A repo without a note still shows, using its
// GitHub description. These also feed the fallback list when GitHub is down.
export const projectNotes: Record<string, ProjectNote> = {
  "dhaka-tesla-pool": {
    name: "Dhaka Tesla Pool",
    tagline:
      "Ride pooling for one three-seat Tesla: share a seat, split the fare, and never sell the last seat twice.",
    highlights: [
      "Pools riders from the same area whose drop-offs are within 2 km, with a 15% shared fare",
      "Capacity enforced in one PostgreSQL transaction with row locks and CHECK constraints",
      "Passenger and driver dashboards with a lifecycle stepper and live activity feed",
      "Docker Compose migrates, seeds, and health-checks all three containers",
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Drizzle", "Docker"],
    demo: "https://tesla-pool-web.onrender.com",
    image:
      "https://raw.githubusercontent.com/AsadShibli/dhaka-tesla-pool/master/docs/screenshots/driver-dashboard.png",
    imageAlt: "Driver dashboard with two riders sharing the car",
  },
  "rise-together-frontend": {
    name: "Rise Together",
    tagline:
      "A poster maker: sign in, pick a design, write the lines, then save or download the poster.",
    highlights: [
      "Separate Next.js site and Express API, deployed to Vercel and Render",
      "Accounts with email or phone login and password change",
      "Server builds the poster image from a template and an uploaded photo",
      "Admin tab with counts, design management, and review",
    ],
    stack: ["Next.js", "TypeScript", "Express", "MongoDB"],
    demo: "https://rise-together-ten.vercel.app",
    extraLinks: [
      { label: "API repo", url: "https://github.com/AsadShibli/rise-together-backend" },
    ],
  },
  studiodesk: {
    name: "StudioDesk",
    tagline: "Clients, bookings, and invoices for small studios, with two plans and two roles.",
    highlights: [
      "Monorepo: Next.js screens, Express API, Prisma schema in a shared package",
      "Owner and manager roles; each studio only sees its own clients and bookings",
      "Paste a CSV, check the rows, save the good ones, or undo that save",
      "Database-backed cookie sessions; invoices gated by Free and Pro plans",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL"],
    demo: "https://studiodesk-one.vercel.app",
    image:
      "https://raw.githubusercontent.com/AsadShibli/studiodesk/main/docs/screenshots/app.png",
    imageAlt: "StudioDesk app with the clients and bookings view",
  },
  dropbridge: {
    name: "Dropbridge",
    tagline:
      "Move files and notes between your own devices. Everything self-destructs after 48 hours.",
    highlights: [
      "Supabase Auth, Postgres with row-level security, and a private Storage bucket",
      "pg_cron job hard-deletes notes and files after 48 hours",
      "Uploads up to 100 MB in per-user folders",
      "Admin dashboard with activity, expiring items, and top uploaders",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    demo: "https://dropbridge-kappa.vercel.app",
    image:
      "https://raw.githubusercontent.com/AsadShibli/dropbridge/main/public/landing.png",
    imageAlt: "Dropbridge landing page",
  },
};
