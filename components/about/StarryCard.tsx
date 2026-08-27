export function StarryCard() {
  return (
    <aside className="starry-card" data-nav="dark">
      <div style={{ position: "relative", zIndex: 1 }}>
        <p className="t-eyebrow">Currently</p>
        <h2 className="ai-heading" style={{ color: "#fff9e9", maxWidth: "18ch" }}>
          Looking for teams who care about the last 5%.
        </h2>
      </div>
      <p style={{ position: "relative", zIndex: 1, maxWidth: "32ch", opacity: 0.8 }}>
        If you’re building something that has to feel inevitable, the contact drawer is open.
      </p>
    </aside>
  );
}
