export const GRADES = ["L", "E", "M", "C", "B", "A"] as const;
export type Grade = (typeof GRADES)[number];

export interface Subject {
  id: string;
  name: string;
  short: string;
  req?: boolean;
  points: Record<Grade, number>;
}

export interface Program {
  id: string;
  name: string;
  org: string;
  threshold: number;
  glyph: string;
  weight: Partial<Record<string, number>>;
}

export const SUBJECTS: Subject[] = [
  {
    id: "ai",
    name: "Äidinkieli",
    short: "ÄI",
    req: true,
    points: { L: 33, E: 27.5, M: 21, C: 14.5, B: 9, A: 4 },
  },
  {
    id: "maa",
    name: "Matematiikka, pitkä",
    short: "MAA",
    points: { L: 43, E: 36, M: 27, C: 19, B: 12, A: 6 },
  },
  {
    id: "fy",
    name: "Fysiikka",
    short: "FY",
    points: { L: 30, E: 25, M: 19, C: 13, B: 8, A: 4 },
  },
  {
    id: "ke",
    name: "Kemia",
    short: "KE",
    points: { L: 30, E: 25, M: 19, C: 13, B: 8, A: 4 },
  },
  {
    id: "bi",
    name: "Biologia",
    short: "BI",
    points: { L: 28, E: 23, M: 17, C: 12, B: 7, A: 3 },
  },
  {
    id: "en",
    name: "Englanti, pitkä",
    short: "EN",
    points: { L: 25, E: 21, M: 16, C: 11, B: 7, A: 3 },
  },
  {
    id: "yh",
    name: "Yhteiskuntaoppi",
    short: "YH",
    points: { L: 24, E: 20, M: 15, C: 10, B: 6, A: 3 },
  },
  {
    id: "psy",
    name: "Psykologia",
    short: "PS",
    points: { L: 24, E: 20, M: 15, C: 10, B: 6, A: 3 },
  },
];

export const PROGRAMS: Program[] = [
  {
    id: "laakis",
    name: "Lääketiede",
    org: "Helsingin yliopisto",
    threshold: 132,
    glyph: "plus",
    weight: { maa: 1.0, fy: 1.0, ke: 1.0, bi: 0.6, ai: 0.5 },
  },
  {
    id: "di",
    name: "Tekniikka, DI",
    org: "Aalto-yliopisto",
    threshold: 92,
    glyph: "octagon",
    weight: { maa: 1.0, fy: 0.9, ke: 0.7, en: 0.6, ai: 0.5 },
  },
  {
    id: "kauppis",
    name: "Kauppatieteet",
    org: "Aalto-yliopisto",
    threshold: 78,
    glyph: "cross",
    weight: { maa: 0.9, ai: 0.8, en: 0.7, yh: 0.6, psy: 0.5 },
  },
  {
    id: "oikis",
    name: "Oikeustiede",
    org: "Turun yliopisto",
    threshold: 86,
    glyph: "diamond",
    weight: { ai: 1.0, yh: 0.9, en: 0.7, psy: 0.6, maa: 0.5 },
  },
];

export const INITIAL_SELECTION: Record<string, string> = {
  ai: "E",
  maa: "M",
  fy: "M",
  ke: "C",
  en: "L",
};

// ---------- Lukusuunnitelma ----------

export interface StudyBlock {
  id: number;
  time: string;
  dur: number;
  subj: string;
  title: string;
  type: string;
  done: boolean;
}

export const WEEK = ["MA", "TI", "KE", "TO", "PE", "LA", "SU"] as const;

export const TODAY_PLAN: StudyBlock[] = [
  { id: 1, time: "08:30", dur: 75, subj: "MAA", title: "Derivaatta — ketjusääntö",   type: "Teoria + tehtävät 4.1–4.6",      done: true  },
  { id: 2, time: "10:00", dur: 45, subj: "EN",  title: "Lukukappale + sanasto",       type: "Abstract reading · set 12",      done: true  },
  { id: 3, time: "11:15", dur: 60, subj: "FY",  title: "Sähkökenttä",                 type: "Kertaus + YO-tehtävä k2019/8",   done: false },
  { id: 4, time: "13:30", dur: 50, subj: "KE",  title: "Hapot ja emäkset",            type: "Titraus — laskuharjoitus",       done: false },
  { id: 5, time: "15:00", dur: 40, subj: "ÄI",  title: "Esseen jäsentely",            type: "Materiaalipohjainen kirjoit.",   done: false },
];

export const WEEK_LOAD = [3.5, 4.5, 4.0, 3.0, 4.5, 2.0, 1.5] as const;
export const TODAY_INDEX = 2;
export const DAYS_LEFT = 41;

export interface Term {
  id: string;
  label: string;
  short: string;
  daysLeft: number;
}

export const TERMS: Term[] = [
  { id: "k26", label: "Kevät 2026",  short: "YO·26K", daysLeft: 12  },
  { id: "s26", label: "Syksy 2026",  short: "YO·26S", daysLeft: 98  },
  { id: "k27", label: "Kevät 2027",  short: "YO·27K", daysLeft: 281 },
  { id: "s27", label: "Syksy 2027",  short: "YO·27S", daysLeft: 463 },
];

// ---------- Edistyminen ----------

export interface SubjectProgress {
  subj: string;
  name: string;
  pct: number;
  total: number;
  done: number;
}

export const PROGRESS: SubjectProgress[] = [
  { subj: "MAA", name: "Matematiikka, pitkä", pct: 72, total: 48, done: 35 },
  { subj: "FY",  name: "Fysiikka",            pct: 64, total: 32, done: 20 },
  { subj: "KE",  name: "Kemia",               pct: 58, total: 30, done: 17 },
  { subj: "EN",  name: "Englanti, pitkä",     pct: 81, total: 26, done: 21 },
  { subj: "ÄI",  name: "Äidinkieli",          pct: 49, total: 22, done: 11 },
];

export interface CheckIn {
  id: number;
  label: string;
  meta: string;
  done: boolean;
}

export const CHECKINS: CheckIn[] = [
  { id: 1, label: "Matematiikka — derivaatta",  meta: "75 min · 6 tehtävää",  done: true  },
  { id: 2, label: "Englanti — lukukappale",     meta: "45 min · set 12",      done: true  },
  { id: 3, label: "Fysiikka — sähkökenttä",     meta: "60 min · YO k2019/8",  done: false },
  { id: 4, label: "Kemia — titraus",            meta: "50 min · harjoitus",   done: false },
  { id: 5, label: "Äidinkieli — esseluonnos",   meta: "40 min · jäsentely",   done: false },
];

// 7 weeks × 7 days activity heatmap (0–3 intensity)
export const HEATMAP: number[][] = [
  [2, 3, 1, 2, 3, 1, 0],
  [3, 2, 2, 3, 1, 2, 1],
  [1, 2, 3, 2, 2, 0, 1],
  [2, 3, 2, 1, 3, 2, 0],
  [3, 1, 2, 3, 2, 1, 2],
  [2, 2, 3, 2, 3, 1, 0],
  [1, 3, 2, 3, 0, 0, 0],
];

export const STREAK = 23;
