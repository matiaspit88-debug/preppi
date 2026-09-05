import Glyph from "@/components/ui/Glyph";

const WORD = "Preppi".split("");
const OFFSETS = [0, 12, -6, 10, -4, 16];
const ROTATIONS = [0, 0, 0, 0, 0, 3];

// Nämä kortit eivät vielä johda mihinkään (href säilytetty tulevaa varten) -
// ne näyttävät vain lähestyvät koepäivät.
const CARDS = [
  {
    href: "/aineet",
    idx: "01",
    glyph: "diamond",
    title: "Yhteiskuntaoppi",
    meta: "16.9.",
  },
  {
    href: "/suunnitelma",
    idx: "02",
    glyph: "diamond",
    title: "Ruotsi",
    meta: "21.9.",
  },
  {
    href: "/edistyminen",
    idx: "03",
    glyph: "diamond",
    title: "Saksa",
    meta: "28.9.",
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
            <div
              key={c.href}
              className="koti-card"
              style={{ animationDelay: `${160 + i * 80}ms` }}
            >
              <div className="koti-card-top">
                <span className="koti-card-idx mono">{c.idx}</span>
              </div>
              <div className="koti-card-glyph">
                <Glyph name={c.glyph} size={30} />
              </div>
              <div className="koti-card-foot">
                <div className="koti-card-title">
                  <div>{c.title}</div>
                </div>
                <div className="koti-card-meta mono">{c.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
