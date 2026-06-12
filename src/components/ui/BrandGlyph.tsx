export default function BrandGlyph() {
  return (
    <svg
      className="brand-petals"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((r, i) => (
        <ellipse
          key={i}
          cx="12"
          cy="12"
          rx="3.1"
          ry="11"
          fill="currentColor"
          opacity={0.85 - i * 0.12}
          transform={`rotate(${r} 12 12)`}
        />
      ))}
    </svg>
  );
}
