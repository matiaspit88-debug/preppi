interface GlyphProps {
  name: string;
  size?: number;
}

export default function Glyph({ name, size = 26 }: GlyphProps) {
  const s = size;
  const fill = "currentColor";

  switch (name) {
    case "plus":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9.4" y="2" width="5.2" height="20" rx="0.6" fill={fill} />
          <rect x="2" y="9.4" width="20" height="5.2" rx="0.6" fill={fill} />
        </svg>
      );
    case "octagon":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2.4a4.6 4.6 0 0 1 0 9.2 4.6 4.6 0 0 0 0 9.2A9.4 9.4 0 0 1 12 2.4Z"
            fill={fill}
          />
          <path
            d="M12 21.6a4.6 4.6 0 0 1 0-9.2 4.6 4.6 0 0 0 0-9.2A9.4 9.4 0 0 1 12 21.6Z"
            fill={fill}
            opacity="0.55"
          />
        </svg>
      );
    case "cross":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect
            x="9.4" y="1.5" width="5.2" height="21" rx="0.6"
            fill={fill}
            transform="rotate(45 12 12)"
          />
          <rect
            x="9.4" y="1.5" width="5.2" height="21" rx="0.6"
            fill={fill}
            transform="rotate(-45 12 12)"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect
            x="5" y="5" width="14" height="14" rx="1.4"
            fill={fill}
            transform="rotate(45 12 12)"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h13M13 6l6 6-6 6"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7"
            stroke={fill}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={fill} />
        </svg>
      );
    default:
      return null;
  }
}
