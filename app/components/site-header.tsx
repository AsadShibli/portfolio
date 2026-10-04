"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content";
import { GitHubIcon, MenuIcon, MoonIcon, SunIcon } from "./icons";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode: the choice just won't persist.
  }
}

export function SiteHeader() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Highlight the nav link for whichever section sits in the upper middle of the screen.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-ink transition group-hover:rotate-6">
            S
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
          <span className="sm:hidden">{profile.shortName}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className="rounded-full px-4 py-1.5 text-sm text-muted transition hover:text-fg aria-[current]:bg-surface-2 aria-[current]:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
          >
            <GitHubIcon />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg"
          >
            <SunIcon className="icon-sun size-4" />
            <MoonIcon className="icon-moon size-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-muted hover:bg-surface-2 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
