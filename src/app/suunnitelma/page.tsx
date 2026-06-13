"use client";

import { useState } from "react";
import Glyph from "@/components/ui/Glyph";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  WEEK,
  WEEK_LOAD,
  TODAY_PLAN,
  TODAY_INDEX,
  DAYS_LEFT,
  type StudyBlock,
} from "@/lib/data";

const DAY_NAMES = [
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
  "Sunnuntai",
];

const MAX_LOAD = Math.max(...WEEK_LOAD);
const TOTAL_WEEK_H = WEEK_LOAD.reduce((a, b) => a + b, 0).toFixed(1);

export default function SuunnitelmaPage() {
  const [day, setDay] = useState(TODAY_INDEX);
  const [plan, setPlan] = useState<StudyBlock[]>(
    TODAY_PLAN.map((b) => ({ ...b }))
  );

  function toggle(id: number) {
    setPlan((p) =>
      p.map((b) => (b.id === id ? { ...b, done: !b.done } : b))
    );
  }

  const doneCount = plan.filter((b) => b.done).length;
  const totalMin = plan.reduce((a, b) => a + b.dur, 0);
  const doneMin = plan.filter((b) => b.done).reduce((a, b) => a + b.dur, 0);
  const hours = (totalMin / 60).toFixed(1);
  const doneH = (doneMin / 60).toFixed(1);

  const ringR = 34;
  const ringCirc = 2 * Math.PI * ringR;
  const ringOffset = ringCirc * (1 - doneMin / totalMin);

  return (
    <div className="view suunnitelma">
      {/* Header */}
      <div className="suun-head stagger">
        <div style={{ animationDelay: "0ms" }}>
          <Eyebrow num="02 / 03">Henkilökohtainen lukusuunnitelma</Eyebrow>
          <h1 className="suun-title h-display">{DAY_NAMES[day]}.</h1>
        </div>

        <div className="suun-head-meta" style={{ animationDelay: "80ms" }}>
          <div className="suun-ring">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle
                cx="40" cy="40" r={ringR}
                fill="none"
                stroke="var(--line)"
                strokeWidth="6"
              />
              <circle
                cx="40" cy="40" r={ringR}
                fill="none"
                stroke="var(--ink)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCirc}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dashoffset 0.8s var(--ease)" }}
              />
            </svg>
            <div className="suun-ring-label">
              <b>
                {doneCount}/{plan.length}
              </b>
              <span className="mono">blokkia</span>
            </div>
          </div>

          <div className="suun-head-stat">
            <div>
              <span className="mono">Tänään yhteensä</span>
              <b>{hours} h</b>
            </div>
            <div>
              <span className="mono">Tehty</span>
              <b>{doneH} h</b>
            </div>
          </div>
        </div>
      </div>

      {/* Week strip */}
      <div className="week-strip stagger">
        {WEEK.map((d, i) => (
          <button
            key={d}
            className={`week-day${i === day ? " on" : ""}${i === TODAY_INDEX ? " today" : ""}`}
            style={{ animationDelay: `${i * 40}ms` }}
            onClick={() => setDay(i)}
          >
            <span className="week-day-name mono">{d}</span>
            <span className="week-day-bar">
              <span
                className="week-day-fill"
                style={{ height: `${(WEEK_LOAD[i] / MAX_LOAD) * 100}%` }}
              />
            </span>
            <span className="week-day-h">{WEEK_LOAD[i]}h</span>
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="suun-grid">
        {/* Timeline */}
        <section className="timeline stagger">
          <div className="ain-panel-head">
            <span className="mono">Päivän ohjelma · {plan.length} blokkia</span>
            <span className="mono">Mukautuu tasoosi</span>
          </div>

          {plan.map((b, i) => (
            <div
              key={b.id}
              className={`tl-block${b.done ? " done" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="tl-time">
                <span className="tl-time-h">{b.time}</span>
                <span className="tl-dur mono">{b.dur}min</span>
              </div>

              <button
                className="tl-dot"
                onClick={() => toggle(b.id)}
                aria-label={b.done ? "Merkitse tekemättömäksi" : "Merkitse tehdyksi"}
              >
                {b.done && <Glyph name="check" size={13} />}
              </button>

              <div
                className="tl-card card"
                onClick={() => toggle(b.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggle(b.id)}
              >
                <div className="tl-card-top">
                  <span className="tl-subj">{b.subj}</span>
                  <span className="tl-title">{b.title}</span>
                </div>
                <div className="tl-type mono">{b.type}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Sidebar */}
        <aside className="suun-side stagger">
          <div className="side-card card" style={{ animationDelay: "60ms" }}>
            <span className="mono">Suunnitelman perusta</span>
            <div className="basis-list">
              <div className="basis-row">
                <span className="mono">Tavoitearvosanat</span>
                <span className="basis-chips">
                  <em>MAA·M</em>
                  <em>FY·M</em>
                  <em>EN·L</em>
                </span>
              </div>
              <div className="basis-row">
                <span className="mono">Lukuaika / pv</span>
                <b>4.0 h</b>
              </div>
              <div className="basis-row">
                <span className="mono">Osaamistaso</span>
                <b>Keskitaso</b>
              </div>
              <div className="basis-row">
                <span className="mono">YO-koe</span>
                <b>{DAYS_LEFT} pv</b>
              </div>
            </div>
          </div>

          <div className="side-card card" style={{ animationDelay: "130ms" }}>
            <span className="mono">Viikon kuormitus</span>
            <div className="wk-load">
              {WEEK.map((d, i) => (
                <div key={d} className="wk-load-col">
                  <span
                    className="wk-load-bar"
                    style={{ height: `${(WEEK_LOAD[i] / MAX_LOAD) * 60}px` }}
                  />
                  <span className="wk-load-d mono">{d[0]}</span>
                </div>
              ))}
            </div>
            <div className="wk-load-foot">
              <span className="mono">Yhteensä</span>
              <b>{TOTAL_WEEK_H} h / vk</b>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
