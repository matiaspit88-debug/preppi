import Link from "next/link";
import Glyph from "@/components/ui/Glyph";

const WORD = "Preppi".split("");
const OFFSETS = [0, 12, -6, 10, -4, 16];
const ROTATIONS = [0, 0, 0, 0, 0, 3];

const CARDS = [
  {
    href: "/aineet",
    idx: "01",
    glyph: "plus",
    title: "Ainevalinta",
    title2: "& pisteet",
    meta: "4 HAKUKOHDETTA",
  },
  {
    href: "/suunnitelma",
    idx: "02",
    glyph: "octagon",
    title: "Lukusuunni-",
    title2: "telma",
    meta: "5 BLOKKIA / PV",
  },
  {
    href: "/edistyminen",
    idx: "03",
    glyph: "cross",
    title: "Edistymisen",
    title2: "seuranta",
    meta: "64% VALMIS",
  },
];

export default function KotiPage() {
  return (
    <div className="view koti">
      {/* Hero wordmark */}
      <div className="koti-hero">
        <h1 className="koti-word h-display">
          {WORD.map((ch, i) => (
            <span
              key={i}
              className="koti-glyf"
              style={{
                transform: `translateY(${OFFSETS[i]}px) rotate(${ROTATIONS[i]}deg)`,
                animationDelay: `${0.12 + i * 0.05}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      {/* Feature cards */}
      <div className="koti-index stagger">
        <div className="koti-cards">
          {CARDS.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="koti-card"
              style={{ animationDelay: `${160 + i * 80}ms` }}
            >
              <div className="koti-card-top">
                <span className="koti-card-idx mono">{c.idx}</span>
                <span className="koti-card-arrow">
                  <Glyph name="arrow" size={18} />
                </span>
              </div>
              <div className="koti-card-glyph">
                <Glyph name={c.glyph} size={30} />
              </div>
              <div className="koti-card-foot">
                <div className="koti-card-title">
                  <div>{c.title}</div>
                  <div>{c.title2}</div>
                </div>
                <div className="koti-card-meta mono">{c.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
