export function SkyBand() {
  return (
    <svg className="sky-band" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="120" width="1440" height="80" fill="var(--bg-base)" />
      <path d="M0 140 L1440 80 L1440 200 L0 200 Z" fill="var(--bg-base)" />
      <path
        d="M0 128 L1440 68"
        fill="none"
        stroke="var(--c-ink)"
        strokeWidth="3"
      />
    </svg>
  );
}
