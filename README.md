# MD. Asadullah Shibli — Portfolio

Full stack web developer in Dhaka, with a Bachelor of Engineering from IUBAT. I build web applications with TypeScript, React, Next.js, and Node.js, from the interface through the API and the database.

**Live site:** https://portfolio-inky-eight-87.vercel.app

[GitHub](https://github.com/AsadShibli) · [LinkedIn](https://www.linkedin.com/in/shibliasadullah/)

## What's on the page

- **Projects, newest first.** Pulled from my public GitHub repos and refreshed every hour, so a new project shows up without editing the site. Browse with the arrows, the project names, the ← → keys, or a swipe on mobile. Each project shows a screenshot, highlights, a language breakdown, its stack, and links to the live demo and source.
- **About.** How I work across the interface, the API, and the data layer, with a project that backs up each claim.
- **Skills.** The stack I ship with. Every item is used in at least one of the projects.
- **Contact form.** Validated on the server and delivered to my inbox by email.
- **Dark and light themes.** Follows your system setting, remembers your choice, and never flashes the wrong theme on load.

## Featured projects

| Project | What it does | Stack |
| --- | --- | --- |
| [Dhaka Tesla Pool](https://github.com/AsadShibli/dhaka-tesla-pool) | Ride pooling for one three-seat car; capacity enforced in a single Postgres transaction | Next.js, Express, PostgreSQL, Drizzle, Docker |
| [Rise Together](https://github.com/AsadShibli/rise-together-frontend) | Poster maker with accounts, uploads, and server-side image rendering | Next.js, Express, MongoDB |
| [StudioDesk](https://github.com/AsadShibli/studiodesk) | Clients, bookings, and invoices for small studios, with roles and plans | Next.js, Express, Prisma, PostgreSQL |
| [Dropbridge](https://github.com/AsadShibli/dropbridge) | Ephemeral file and note transfer that self-destructs after 48 hours | Next.js, Supabase |

## Built with

Next.js 16 (App Router, Server Actions, ISR), React 19, TypeScript, Tailwind CSS 4, the GitHub REST API, and Resend.

```
app/
  page.tsx                 sections (server component, revalidates hourly)
  components/              header, project carousel, contact form, icons
  actions/contact.ts       contact form server action
lib/github.ts              GitHub fetch, filtering, and fallback
content.ts                 all copy, skills, and per-project notes
```

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For the contact form | API key from [resend.com](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | For the contact form | Where messages are delivered |
| `CONTACT_FROM_EMAIL` | No | Sender address; defaults to `onboarding@resend.dev`, which only delivers to your Resend account email |
| `GITHUB_TOKEN` | No | Raises the GitHub API limit from 60 to 5,000 requests an hour |

Without the Resend variables, the form still validates and tells visitors to reach out on LinkedIn instead.

## Editing content

Everything is in [`content.ts`](content.ts):

- `profile`, `layers`, `skillGroups` are the page copy.
- `projectNotes` adds a tagline, highlights, stack, demo link, and screenshot to a repo by name.
- `hiddenRepos` keeps practice repos and split halves of a project out of the carousel.
- `projectLanguages` controls which repos count as web projects.
