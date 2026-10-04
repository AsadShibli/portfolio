"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { Project } from "@/lib/github";
import { ArrowIcon, CheckIcon, ExternalIcon, GitHubIcon } from "./icons";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const count = projects.length;
  const tabsRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  // Wraps around so "next" on the oldest project returns to the newest.
  const wrap = (to: number) => ((to % count) + count) % count;
  const go = (to: number) => setIndex(wrap(to));
  const step = (delta: number) => setIndex((i) => wrap(i + delta));

  // Keep the active name visible in the scrollable strip without moving the page.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !tab) return;
    strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  // Touch swipe only, so mouse users can still select text on a slide.
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
  };

  const current = projects[index];

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects, newest first" onKeyDown={onKeyDown}>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          ref={tabsRef}
          className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
          aria-label="Jump to a project"
        >
          {projects.map((project, i) => (
            <button
              key={project.repo}
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? "true" : undefined}
              className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition hover:border-line-strong hover:text-fg aria-[current]:border-accent/60 aria-[current]:bg-accent-soft aria-[current]:text-fg"
            >
              <span className="mr-1.5 font-mono text-xs text-subtle">{pad(i + 1)}</span>
              {project.name}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <p className="font-mono text-sm tabular-nums text-muted" aria-hidden="true">
            <span className="text-fg">{pad(index + 1)}</span> / {pad(count)}
          </p>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg transition hover:-translate-x-0.5 hover:border-accent/60"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className="grid size-11 place-items-center rounded-full bg-accent text-accent-ink transition hover:translate-x-0.5 hover:bg-accent-strong"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Project {index + 1} of {count}: {current.name}
      </p>

      <div
        className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-40px_var(--glow)]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {projects.map((project, i) => (
            <article
              key={project.repo}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${project.name}`}
              inert={i !== index}
              className="grid w-full shrink-0 lg:grid-cols-[1.1fr_1fr]"
            >
              <ProjectMedia project={project} priority={i === 0} />
              <ProjectDetails project={project} latest={i === 0} />
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
        {projects.map((project, i) => (
          <span
            key={project.repo}
            className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-accent" : "w-3 bg-line-strong"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectMedia({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <div className="relative border-b border-line bg-surface-2 p-4 sm:p-6 lg:border-r lg:border-b-0">
      <div className="overflow-hidden rounded-xl border border-line bg-bg shadow-lg">
        {/* Browser chrome so screenshots read as a running app. */}
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-subtle">
            {project.demo ? project.demo.replace(/^https?:\/\//, "") : `github.com/AsadShibli/${project.repo}`}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.name} screenshot`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <Cover project={project} />
          )}
        </div>
      </div>
    </div>
  );
}

// Shown for repos without a screenshot: the name over a grid tinted by its main language.
function Cover({ project }: { project: Project }) {
  const tint = project.languages[0]?.color ?? "var(--accent)";
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute size-72 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${tint}, transparent)` }}
      />
      <div className="relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">{project.repo}</p>
        <p className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</p>
      </div>
    </div>
  );
}

function ProjectDetails({ project, latest }: { project: Project; latest: boolean }) {
  return (
    <div className="flex flex-col p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {latest && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent-strong">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Latest
          </span>
        )}
        {project.updatedLabel && (
          <time dateTime={project.updatedISO} className="text-subtle">
            {project.updatedLabel}
          </time>
        )}
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
      <p className="mt-3 leading-7 text-muted">{project.tagline}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-5 space-y-2.5 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2.5">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-fg/85">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {project.languages.length > 0 && (
        <div className="mt-6">
          <div className="flex h-2 overflow-hidden rounded-full bg-surface-2">
            {project.languages.map((lang) => (
              <span key={lang.name} style={{ width: `${lang.share * 100}%`, background: lang.color }} />
            ))}
          </div>
          <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {project.languages.map((lang) => (
              <li key={lang.name} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: lang.color }} />
                {lang.name}
                <span className="text-subtle">{(lang.share * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <li key={tag} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-7">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:opacity-85"
          >
            Live demo <ExternalIcon />
          </a>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-line-strong"
        >
          <GitHubIcon /> Source
        </a>
        {project.extraLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition hover:text-fg"
          >
            {link.label} <ExternalIcon />
          </a>
        ))}
      </div>
    </div>
  );
}
