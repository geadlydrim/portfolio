import Link from "next/link";

export default function NotFound() {
  return (
    <main className="cs-wrap" style={{ minHeight: "70vh", textAlign: "center" }}>
      <p className="cs-kicker">404</p>
      <h1 className="cs-title">This path isn’t planted yet.</h1>
      <p className="cs-body" style={{ margin: "16px auto 28px" }}>
        Try the work, the about, or the playground.
      </p>
      <Link href="/" className="nav-cta" style={{ display: "inline-flex" }}>
        Back home
      </Link>
    </main>
  );
}
