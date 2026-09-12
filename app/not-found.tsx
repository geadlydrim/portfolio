import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="cs-wrap nf-wrap">
      <p className="cs-kicker">ERR 404</p>
      <h1 className="cs-title">No tape in this slot.</h1>
      <p className="cs-body nf-body">That address isn’t on the reel.</p>
      <nav className="nf-links" aria-label="Site sections">
        <Link href="/#work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/playground">Playground</Link>
      </nav>
      <Link href="/" className="nav-cta nf-cta">
        Back home
      </Link>
    </main>
  );
}
