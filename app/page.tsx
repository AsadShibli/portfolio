import Image from "next/image";
import { layers, profile, skillGroups } from "@/content";
import { getGitHubData } from "@/lib/github";
import { ContactForm } from "./components/contact-form";
import { ArrowIcon, CapIcon, ExternalIcon, GitHubIcon, LinkedInIcon, PinIcon } from "./components/icons";
import { ProjectCarousel } from "./components/project-carousel";
import { RotatingWords } from "./components/rotating-words";
import { ScrollReveal } from "./components/scroll-reveal";
import { SiteHeader } from "./components/site-header";

// Each section reads its text from content.ts so the layout stays separate from the copy.
// Projects and stats come from GitHub and are refreshed hourly.
export const revalidate = 3600;

export default async function Home() {
  const { projects, stats, live } = await getGitHubData();

  return (
    <div id="top" className="relative min-h-full overflow-x-clip">
      <SiteHeader />
      <ScrollReveal />

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 sm:px-8 md:grid-cols-[1fr_auto] md:pt-24 md:pb-28">
            <div className="hero-in">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-ok" />
                </span>
                {profile.location} · {profile.timezone}
              </p>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span>.
              </h1>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-accent-strong">
                {profile.role}
              </p>
              <p className="mt-6 text-xl font-medium tracking-tight sm:text-2xl">
                I build <RotatingWords words={profile.building} />
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{profile.bio}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:bg-accent-strong"
                >
                  See my projects
                  <ArrowIcon className="size-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-5 py-3 text-sm font-medium transition hover:border-line-strong"
                >
                  Get in touch
                </a>
                <div className="flex items-center gap-2 pl-1">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="grid size-11 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
                  >
                    <GitHubIcon className="size-5" />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid size-11 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
                  >
                    <LinkedInIcon className="size-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Portrait from public/profile.jpg, with a tilted accent card behind it. */}
            <div className="hero-in relative mx-auto w-60 sm:w-72 md:order-last" style={{ animationDelay: "120ms" }}>
              <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-accent/25 blur-[1px]" />
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${profile.name}`}
                width={320}
                height={320}
                priority
                className="relative aspect-square w-full rounded-[2rem] border border-line object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading eyebrow="About" title="From the interface to the database">
            I like owning a feature end to end: the screen someone uses, the API behind it, and the
            tables that keep its rules true.
          </SectionHeading>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {layers.map((layer, i) => (
              <article
                key={layer.title}
                className="reveal rounded-2xl border border-line bg-surface p-6 hover:border-line-strong"
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{layer.title}</h3>
                <p className="mt-2 leading-7 text-muted">{layer.body}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm text-fg/80">{layer.proof}</p>
              </article>
            ))}
          </div>

          <dl className="reveal mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Based in" icon={<PinIcon />}>
              {profile.location}
            </Fact>
            <Fact label="Education" icon={<CapIcon />}>
              {profile.education}
            </Fact>
            <Fact label="Public repos" icon={<GitHubIcon />}>
              {stats ? `${stats.publicRepos} · last push ${stats.lastPushLabel}` : "On GitHub"}
            </Fact>
            <Fact label="Web projects" icon={<span className="font-mono text-xs">{"</>"}</span>}>
              {projects.length} shipped · {projects[0]?.stack.slice(0, 2).join(", ")}
            </Fact>
          </dl>
        </section>

        {/* Skills */}
        <section id="skills" className="border-y border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <SectionHeading eyebrow="Skills" title="The stack I ship with">
              Every item here is used in at least one of the projects below.
            </SectionHeading>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group, i) => (
                <div
                  key={group.title}
                  className="reveal rounded-2xl border border-line bg-surface p-6 hover:border-line-strong"
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                >
                  <h3 className="font-semibold">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-sm text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Projects" title="Featured work, then the newest">
              Use the arrows, the names, your keyboard&apos;s ← → keys, or swipe to move through
              older projects.
            </SectionHeading>
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
              <GitHubIcon className="size-3.5" />
              {live ? "Synced from GitHub · refreshed hourly" : "Featured projects"}
            </p>
          </div>

          <div className="reveal mt-10">
            <ProjectCarousel projects={projects} />
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            More experiments and older work live on{" "}
            <a
              href={`${profile.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              GitHub <ExternalIcon />
            </a>
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="relative border-t border-line">
          <div className="glow pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[720px] -translate-x-1/2 opacity-60" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading eyebrow="Contact" title="Let's build something">
                Have a project, a role, or a question? Send a message and it lands in my inbox.
              </SectionHeading>

              <div className="mt-8 grid gap-3">
                <ContactLink
                  href={profile.github}
                  icon={<GitHubIcon className="size-5" />}
                  label="GitHub"
                  value={profile.githubUser}
                />
                <ContactLink
                  href={profile.linkedin}
                  icon={<LinkedInIcon className="size-5" />}
                  label="LinkedIn"
                  value={profile.linkedinHandle}
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            Built with Next.js and Tailwind ·{" "}
            <a
              href={`${profile.github}/portfolio`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-strong">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-muted">{children}</p>
    </div>
  );
}

function Fact({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-surface p-5">
      <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-subtle">
        {icon}
        {label}
      </dt>
      <dd className="mt-2 font-medium">{children}</dd>
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-accent/50"
    >
      <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-fg">{icon}</span>
      <span className="flex-1">
        <span className="block text-xs text-subtle">{label}</span>
        <span className="block font-medium">{value}</span>
      </span>
      <ExternalIcon className="size-4 text-subtle transition group-hover:text-accent" />
    </a>
  );
}
