// Site copy lives in this file so a later email, phone, or job is a small edit.
// Facts come from the public GitHub profile and LinkedIn (name, Dhaka, IUBAT, profile URL).

export const profile = {
  name: "MD. Asadullah Shibli",
  shortName: "Shibli",
  role: "Full Stack Web Developer",
  location: "Dhaka, Bangladesh",
  education: "Bachelor of Engineering, IUBAT",
  // Intern-focused bio. Django and FastAPI stay off this page on purpose.
  bio: "Full stack web developer based in Dhaka, with a Bachelor of Engineering from IUBAT. I build web applications with TypeScript, React, Next.js, and Node.js, and I am looking for a hands-on full-stack internship.",
  github: "https://github.com/AsadShibli",
  linkedin: "https://www.linkedin.com/in/shibliasadullah/",
  x: "https://x.com/shibliasadullah",
};

// Anchor ids match the section ids in app/page.tsx.
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// Intern stack only: React, Next.js, TypeScript, Tailwind, Node, Express, Prisma, PostgreSQL.
export const skillGroups = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Prisma", "PostgreSQL"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker"],
  },
];

// Mobile (Flutter, Firebase) was removed because those skills only backed the
// Timeblock project, and this page is aimed at a web full-stack internship.

export const projects = [
  {
    name: "StudioDesk",
    description:
      "Clients, bookings, and invoices for small studios.",
    url: "https://github.com/AsadShibli/studiodesk",
    tags: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL"],
  },
  {
    name: "Dropbridge",
    description:
      "Ephemeral file and note transfer between devices. Files self-destruct after 48 hours.",
    url: "https://github.com/AsadShibli/dropbridge",
    tags: ["TypeScript"],
  },
  // Timeblock and Image to SVG were removed so the page shows the two
  // projects closest to the full-stack intern role.
];
