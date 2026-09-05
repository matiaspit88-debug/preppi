"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Glyph from "@/components/ui/Glyph";
import CountUp from "@/components/ui/CountUp";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  PROGRESS,
  CHECKINS,
  HEATMAP,
  STREAK,
  DAYS_LEFT,
  type CheckIn,
} from "@/lib/data";

const TOT_DONE = PROGRESS.reduce((a, s) => a + s.done, 0);
const TOT_ALL = PROGRESS.reduce((a, s) => a + s.total, 0);
const OVERALL = Math.round((TOT_DONE / TOT_ALL) * 100);

export default function EdistyminenPage() {
  // Sivu ei ole vielä julkinen: ohjaa Kotiin, kunnes se avataan navigaatiosta.
  redirect("/");

  const [checks, setChecks] = useState<CheckIn[]>(
    CHECKINS.map((c) => ({ ...c }))
  );

  function toggle(id: number) {
    setChecks((cs) => cs.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  }

  const checkDone = checks.filter((c) => c.done).length;

  return (
    <div className="view edistyminen">
      {/* Header */}
      <div className="edi-head stagger">
        <div style={{ animationDelay: "0ms" }}>
          <Eyebrow num="03 / 03">Edistymisen seuranta</Eyebrow>
          <h1 className="edi-title h-display">
            Missä
            <br />
            mennään.
          </h1>
        </div>
        <div className="edi-overall" style={{ animationDelay: "80ms" }}>
          <div className="edi-overall-num">
            <CountUp value={OVERALL} decimals={0} className="edi-big" />
            <span className="edi-pct">%</span>
          </div>
          <span className="mono">Kokonaisedistyminen</span>
        </div>
      </div>

      {/* Stat pills */}
      <div className="edi-stats stagger">
        <div className="edi-stat card" style={{ animationDelay: "40ms" }}>
          <span className="edi-stat-ico">
            <Glyph name="spark" size={18} />
          </span>
          <div>
            <b>
              <CountUp value={STREAK} />
            </b>
            <span className="mono">päivän putki</span>
          </div>
        </div>
        <div className="edi-stat card" style={{ animationDelay: "90ms" }}>
          <span className="edi-stat-ico">
            <Glyph name="diamond" size={16} />
          </span>
          <div>
            <b>{DAYS_LEFT}</b>
            <span className="mono">päivää YO-kokeeseen</span>
          </div>
        </div>
        <div className="edi-stat card" style={{ animationDelay: "140ms" }}>
          <span className="edi-stat-ico">
            <Glyph name="check" size={18} />
          </span>
          <div>
            <b>
              {checkDone}/{checks.length}
            </b>
            <span className="mono">tänään tehty</span>
          </div>
        </div>
        <div className="edi-stat card" style={{ animationDelay: "190ms" }}>
          <span className="edi-stat-ico">
            <Glyph name="octagon" size={16} />
          </span>
          <div>
            <b>
              {TOT_DONE}
              <i>/{TOT_ALL}</i>
            </b>
            <span className="mono">tehtäväkokonaisuutta</span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="edi-grid">
        {/* Subject bars */}
        <section className="edi-bars card stagger">
          <div className="ain-panel-head">
            <span className="mono">Ainekohtainen edistyminen</span>
            <span className="mono">Tehty / yhteensä</span>
          </div>
          <div className="edi-bars-body">
            {PROGRESS.map((s, i) => (
              <div
                key={s.subj}
                className="edi-bar-row"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="edi-bar-id">
                  <span className="edi-bar-subj">{s.subj}</span>
                  <span className="edi-bar-name">{s.name}</span>
                </div>
                <div className="edi-bar-track">
                  <div
                    className="edi-bar-fill"
                    style={{ width: `${s.pct}%` }}
                  >
                    <span className="edi-bar-pct">{s.pct}%</span>
                  </div>
                </div>
                <div className="edi-bar-count mono">
                  {s.done}/{s.total}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily check-in */}
        <section className="edi-checkin card stagger">
          <div className="ain-panel-head">
            <span className="mono">Päivän check-in</span>
            <span className="edi-check-prog">
              {checkDone}/{checks.length}
            </span>
          </div>
          <div className="edi-check-body">
            {checks.map((c, i) => (
              <button
                key={c.id}
                className={`check-row${c.done ? " done" : ""}`}
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => toggle(c.id)}
              >
                <span className="check-box">
                  {c.done && <Glyph name="check" size={13} />}
                </span>
                <span className="check-text">
                  <span className="check-label">{c.label}</span>
                  <span className="check-meta mono">{c.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Activity heatmap */}
      <section className="edi-heat card view" style={{ animationDelay: "120ms" }}>
        <div className="ain-panel-head">
          <span className="mono">Aktiivisuus · 7 viikkoa</span>
          <span className="heat-legend">
            <span className="mono">vähän</span>
            {([0, 1, 2, 3] as const).map((l) => (
              <i key={l} className={`hl l${l}`} />
            ))}
            <span className="mono">paljon</span>
          </span>
        </div>
        <div className="heat-grid">
          {HEATMAP.flatMap((wk, wi) =>
            wk.map((v, di) => (
              <span
                key={`${wi}-${di}`}
                className={`heat-cell l${v}`}
                style={{ animationDelay: `${(wi * 7 + di) * 9}ms` }}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
