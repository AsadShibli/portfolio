"use client";

import { useEffect } from "react";

// Adds .is-visible to each .reveal element once its top reaches 90% of the
// viewport height, including anything already scrolled past, so a fast scroll
// or a jump to an anchor never leaves a section hidden. The hidden starting
// state only applies once JS runs (html[data-js]), so the page still shows
// everything if scripts fail.
export function ScrollReveal() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const line = innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true;
        el.classList.add("is-visible");
        return false;
      });
      if (!pending.length) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    check();
    return stop;
  }, []);

  return null;
}
