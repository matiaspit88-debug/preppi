"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandGlyph from "@/components/ui/BrandGlyph";

// `visible: false` -sivut pysyvät olemassa reitityksessä ja datassa,
// mutta eivät näy päänavigaatiossa vielä.
const NAV_TABS = [
  { href: "/", label: "Koti", visible: true },
  { href: "/aineet", label: "Pistelaskuri", visible: false },
  { href: "/suunnitelma", label: "Lukusuunnitelma", visible: false },
  { href: "/edistyminen", label: "Seuranta", visible: false },
];

const TERM = { label: "Syksy 2026", short: "YO·26S" };

export default function TopNav() {
  const pathname = usePathname();

  return (
    <div className="topbar stagger">
      <Link href="/" className="brand" style={{ animationDelay: "0ms" }}>
        <span className="brand-glyph">
          <BrandGlyph />
        </span>
        <span className="brand-name">Preppi</span>
        <span className="brand-idx">／{TERM.short}</span>
      </Link>

      <nav className="nav-pill" style={{ animationDelay: "60ms" }} aria-label="Päänavigaatio">
        {NAV_TABS.filter((t) => t.visible).map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={pathname === t.href ? "active" : ""}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="top-right" style={{ animationDelay: "120ms" }}>
        <span className="pill-tag" style={{ cursor: "default" }}>
          <span className="dot" />
          <span>{TERM.label}</span>
        </span>
      </div>
    </div>
  );
}
