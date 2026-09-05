"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Glyph from "@/components/ui/Glyph";
import CountUp from "@/components/ui/CountUp";
import Eyebrow from "@/components/ui/Eyebrow";
import { SUBJECTS, GRADES, PROGRAMS, INITIAL_SELECTION } from "@/lib/data";

type Selection = Record<string, string>;

export default function AineetPage() {
  // Sivu ei ole vielä julkinen: ohjaa Kotiin, kunnes se avataan navigaatiosta.
  redirect("/");

  const [sel, setSel] = useState<Selection>({ ...INITIAL_SELECTION });
  const [active, setActive] = useState<string | null>(null);

  const subjById = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));

  function pick(subjId: string, grade: string) {
    setSel((prev) => {
      const next = { ...prev };
      if (next[subjId] === grade) delete next[subjId];
      else next[subjId] = grade;
      return next;
    });
  }

  const totalRaw = Object.entries(sel).reduce(
    (a, [id, g]) => a + (subjById[id]?.points[g as keyof typeof subjById[typeof id]["points"]] ?? 0),
    0
  );
  const selCount = Object.keys(sel).length;

  function programPoints(p: (typeof PROGRAMS)[0]) {
    let pts = 0;
    for (const [id, g] of Object.entries(sel)) {
      const w = p.weight[id];
      if (w) pts += w * (subjById[id]?.points[g as keyof typeof subjById[typeof id]["points"]] ?? 0);
    }
    return Math.round(pts * 10) / 10;
  }

  const progData = PROGRAMS.map((p) => {
    const pts = programPoints(p);
    return { ...p, pts, ratio: pts / p.threshold, pass: pts >= p.threshold };
  });
  const bestPass = progData.filter((p) => p.pass).length;

  return (
    <div className="view aineet">
      <div className="ain-head stagger">
        <div style={{ animationDelay: "0ms" }}>
          <Eyebrow num="01 / 03">Ainevalinta &amp; pistelaskuri</Eyebrow>
          <h1 className="ain-title h-display">
            Rakenna
            <br />
            yhdistelmäsi.
          </h1>
        </div>
        <div className="ain-summary" style={{ animationDelay: "80ms" }}>
          <div className="ain-sum-num">
            <CountUp value={totalRaw} decimals={0} className="ain-sum-big" />
            <span className="ain-sum-unit">p</span>
          </div>
          <div className="ain-sum-meta">
            <div>
              <span className="mono">Aineita</span>
              <b>{selCount}</b>
            </div>
            <div>
              <span className="mono">Hakukelpoinen</span>
              <b>
                {bestPass}/{PROGRAMS.length}
              </b>
            </div>
          </div>
        </div>
      </div>

      <div className="ain-grid">
        {/* Aineet */}
        <section className="ain-subjects card stagger">
          <div className="ain-panel-head">
            <span className="mono">Valitse aineet &amp; tavoitearvosana</span>
            <span className="ain-grade-legend mono">Heikoin → Paras</span>
          </div>
          {SUBJECTS.map((s, i) => {
            const chosen = sel[s.id];
            const contrib = chosen
              ? s.points[chosen as keyof typeof s.points]
              : null;
            return (
              <div
                key={s.id}
                className={`ain-row${chosen ? " on" : ""}`}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <div className="ain-row-id">
                  <span className="ain-short">{s.short}</span>
                  <span className="ain-name">
                    {s.name}
                    {s.req && <em> · pakollinen</em>}
                  </span>
                </div>
                <div className="ain-grades">
                  {[...GRADES].reverse().map((g) => (
                    <button
                      key={g}
                      className={`grade${chosen === g ? " sel" : ""}`}
                      onClick={() => pick(s.id, g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="ain-contrib">
                  {contrib != null ? (
                    <span className="ain-contrib-on">+{contrib}p</span>
                  ) : (
                    <span className="ain-contrib-off mono">lisää</span>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Hakukohteet */}
        <section className="ain-programs stagger">
          <div className="ain-panel-head">
            <span className="mono">Hakukohteet · reaaliaikainen</span>
            <span className="mono">Pisteet / raja</span>
          </div>
          {progData.map((p, i) => (
            <div
              key={p.id}
              className={`prog-card card${p.pass ? " pass" : ""}${active === p.id ? " active" : ""}`}
              style={{ animationDelay: `${i * 70}ms` }}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="prog-top">
                <span className="prog-glyph">
                  <Glyph name={p.glyph} size={22} />
                </span>
                <div className="prog-id">
                  <div className="prog-name">{p.name}</div>
                  <div className="prog-org mono">{p.org}</div>
                </div>
                <div className={`prog-status ${p.pass ? "ok" : "no"}`}>
                  {p.pass ? (
                    <span>
                      <Glyph name="check" size={12} /> Hakukelpoinen
                    </span>
                  ) : (
                    <span>
                      {Math.max(
                        0,
                        Math.round((p.threshold - p.pts) * 10) / 10
                      )}
                      p vajaa
                    </span>
                  )}
                </div>
              </div>
              <div className="prog-figures">
                <div className="prog-pts">
                  <CountUp value={p.pts} decimals={1} />
                  <span className="prog-pts-unit">p</span>
                </div>
                <div className="prog-thr mono">raja {p.threshold}</div>
              </div>
              <div className="prog-bar">
                <div
                  className="prog-bar-fill"
                  style={{ width: `${Math.min(100, p.ratio * 100)}%` }}
                />
              </div>
            </div>
          ))}
          <p className="ain-note mono">
            * Pisteytys mukailee todistusvalinnan logiikkaa · havainnollistava
          </p>
        </section>
      </div>
    </div>
  );
}
