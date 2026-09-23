import { navLinks, profile, projects, skillGroups } from "@/content";

// Each section reads its text from content.ts so the layout stays separate from the copy.

export default function Home() {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-indigo-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <a href="#about" className="text-sm font-semibold tracking-wide text-indigo-950">
            {profile.name}
          </a>
          <nav className="flex flex-wrap gap-5 text-sm text-slate-600">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-indigo-700">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Soft indigo wash so the intro reads as a hero, not a plain text block. */}
        <section
          id="about"
          className="relative my-8 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-slate-100 px-8 py-16 sm:px-12"
        >
          <p className="text-sm font-medium text-indigo-700">Hello!</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            I&apos;m {profile.shortName}
          </h1>
          <p className="mt-4 inline-flex rounded-full bg-indigo-700 px-3 py-1 text-sm font-medium text-white">
            {profile.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{profile.bio}</p>
          <p className="mt-3 text-sm text-slate-500">
            {profile.location} · {profile.education}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-800"
            >
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-medium text-indigo-900 hover:border-indigo-400"
            >
              GitHub
            </a>
          </div>
        </section>

        <section id="skills" className="py-16">
          <h2 className="text-2xl font-semibold tracking-tight">My top skills</h2>
          <p className="mt-2 text-slate-600">
            Web stack used for a full-stack internship.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-indigo-950">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-900"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="border-t border-slate-200 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-slate-600">Two public repositories on GitHub.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300"
              >
                <h3 className="text-xl font-semibold text-slate-950">{project.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-medium text-indigo-700 underline"
                >
                  View repository
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s connect</h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Reach me on GitHub, LinkedIn, or X. I am based in {profile.location}.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300"
            >
              <p className="text-sm text-slate-500">GitHub</p>
              <p className="mt-1 font-medium">AsadShibli</p>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300"
            >
              <p className="text-sm text-slate-500">LinkedIn</p>
              <p className="mt-1 font-medium">shibliasadullah</p>
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300"
            >
              <p className="text-sm text-slate-500">X</p>
              <p className="mt-1 font-medium">@shibliasadullah</p>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
    </div>
  );
}
