"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandGlyph from "@/components/ui/BrandGlyph";

const TERMS = [
  { id: "k26", label: "Kevät 2026", short: "YO·26K" },
  { id: "s26", label: "Syksy 2026", short: "YO·26S" },
  { id: "k27", label: "Kevät 2027", short: "YO·27K" },
  { id: "s27", label: "Syksy 2027", short: "YO·27S" },
];

const NAV_TABS = [
  { href: "/", label: "Koti" },
  { href: "/aineet", label: "Pistelaskuri" },
  { href: "/suunnitelma", label: "Lukusuunnitelma" },
  { href: "/edistyminen", label: "Seuranta" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [term, setTerm] = useState("k26");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cur = TERMS.find((t) => t.id === term) ?? TERMS[0];

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="topbar stagger">
      <Link href="/" className="brand" style={{ animationDelay: "0ms" }}>
        <span className="brand-glyph">
          <BrandGlyph />
        </span>
        <span className="brand-name">Preppi</span>
        <span className="brand-idx">／{cur.short}</span>
      </Link>

      <nav className="nav-pill" style={{ animationDelay: "60ms" }} aria-label="Päänavigaatio">
        {NAV_TABS.map((t) => (
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
        <div className="term-select" ref={menuRef}>
          <button
            className={"pill-tag" + (open ? " open" : "")}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="dot" />
            <span>{cur.label}</span>
            <span className="term-caret">▾</span>
          </button>

          {open && (
            <div
              className="term-menu"
              role="listbox"
              aria-label="Valitse tutkintokausi"
              onClick={(e) => e.stopPropagation()}
            >
              {TERMS.map((t) => (
                <button
                  key={t.id}
                  role="option"
                  aria-selected={t.id === term}
                  className={"term-opt" + (t.id === term ? " on" : "")}
                  onClick={() => {
                    setTerm(t.id);
                    setOpen(false);
                  }}
                >
                  <span>{t.label}</span>
                  <span className="term-opt-short mono">{t.short}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
