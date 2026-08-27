"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useContact } from "@/lib/contact";
import { useMusic } from "@/lib/music";
import { useNavContrast } from "@/lib/use-nav-contrast";
import { useTheme } from "@/lib/theme";

export function SiteNav() {
  const pathname = usePathname();
  const onDark = useNavContrast();
  const { toggle } = useTheme();
  const { playing, toggle: toggleMusic } = useMusic();
  const { setOpen } = useContact();
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const isCase = pathname.startsWith("/work/");

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMenu(false);
  }

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = [
    onDark ? "nav-on-dark" : "nav-on-light",
    isCase ? "nav-cs" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav id="nav" className={navClass}>
        <div className="nav-side">
          <Link href="/#work" className="nav-back" aria-label="Back to work">
            <svg className="nav-back-arrow" width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M7 1 L1 7 L7 13 M1 7 H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </Link>
          <Pin />
          <span className="nav-loc">{site.locationShort}</span>
        </div>

        <div className={`nav-pill${compact ? " compact" : ""}`}>
          <div className="nav-id">
            <Link className="nav-avatar" href="/" aria-label={`${site.name} — home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.avatar} alt="" />
            </Link>
          </div>
          {site.available ? (
            <>
              <div className="avail-tag" aria-hidden="true">
                <span className="avail-text">{site.availableLabel}</span>
              </div>
              <span className="avail-dot" aria-hidden="true" />
            </>
          ) : null}
          <div className="nav-links">
            <Link href="/#work" className={`nav-link${pathname === "/" ? " active" : ""}`}>
              Work
            </Link>
            <Link href="/about" className={`nav-link${pathname === "/about" ? " active" : ""}`}>
              About
            </Link>
            <Link href="/playground" className={`nav-link${pathname === "/playground" ? " active" : ""}`}>
              Playground
            </Link>
            <button type="button" className="nav-cta" onClick={() => setOpen(true)}>
              <MailIcon />
              <span>Work with me</span>
            </button>
            <button
              className={`nav-burger${menu ? " open" : ""}`}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="nav-side right">
          <button
            className={`nav-wave${playing ? " playing" : ""}`}
            type="button"
            aria-label={playing ? "Pause music" : "Play music"}
            aria-pressed={playing}
            onClick={toggleMusic}
          >
            <svg className="nav-wave-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <g>
                <g className="nav-wave-travel">
                  <path
                    className="nav-wave-path"
                    d="M-20 20 C -17.5 11.1 -12.5 11.1 -10 20 C -7.5 28.9 -2.5 28.9 0 20 C 2.5 11.1 7.5 11.1 10 20 C 12.5 28.9 17.5 28.9 20 20 C 22.5 11.1 27.5 11.1 30 20 C 32.5 28.9 37.5 28.9 40 20 C 42.5 11.1 47.5 11.1 50 20 C 52.5 28.9 57.5 28.9 60 20"
                  />
                </g>
              </g>
            </svg>
          </button>
          <button
            className="day-toggle"
            type="button"
            aria-label="Toggle day / night theme"
            onClick={toggle}
          >
            <svg className="toggle-ico ico-sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <g fill="currentColor">
                <circle cx="12" cy="3.6" r="1.15" />
                <circle cx="12" cy="20.4" r="1.15" />
                <circle cx="3.6" cy="12" r="1.15" />
                <circle cx="20.4" cy="12" r="1.15" />
                <circle cx="6.1" cy="6.1" r="1.15" />
                <circle cx="17.9" cy="6.1" r="1.15" />
                <circle cx="6.1" cy="17.9" r="1.15" />
                <circle cx="17.9" cy="17.9" r="1.15" />
              </g>
            </svg>
            <svg className="toggle-ico ico-moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 14.2A8 8 0 1 1 10.3 4.2a6.4 6.4 0 0 0 9.7 10z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={`menu-overlay${menu ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <nav>
          <ul className="menu-links">
            <li>
              <Link href="/#work" className="menu-link" onClick={() => setMenu(false)}>
                <span className="num">01</span>
                <span className="word">Work</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="menu-link" onClick={() => setMenu(false)}>
                <span className="num">02</span>
                <span className="word">About</span>
              </Link>
            </li>
            <li>
              <Link href="/playground" className="menu-link" onClick={() => setMenu(false)}>
                <span className="num">03</span>
                <span className="word">Playground</span>
              </Link>
            </li>
          </ul>
        </nav>
        <p className="menu-footer">{site.locationShort}</p>
      </div>
    </>
  );
}

function Pin() {
  return (
    <svg className="pin" width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
      <path
        d="M7 0C3.13 0 0 3.05 0 6.8 0 11.9 7 20 7 20s7-8.1 7-13.2C14 3.05 10.87 0 7 0zm0 9.2A2.4 2.4 0 1 1 7 4.4a2.4 2.4 0 0 1 0 4.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 8l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
