import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const ORANGE = "#ff5800";

type Article = {
  title: string;
  excerpt: string;
  date: string; // ISO
  readMin?: number;
  category: "Writing" | "Experiment" | "Note" | "Playground" | "Talk";
  href: string;
  external?: boolean;
};

// Placeholder data — 3 real entries + invented ones to show how it looks at scale
const articles: Article[] = [
  {
    title: "UI Experiments",
    excerpt:
      "A playground for me to experiment with different animations, interactions, and design patterns.",
    date: "2024-11-02",
    category: "Playground",
    href: "/experiments",
  },
  {
    title: "The dev & designer relationship is broken",
    excerpt:
      "Why the handoff keeps failing and what a design engineer practice actually fixes.",
    date: "2024-06-18",
    readMin: 7,
    category: "Writing",
    href: "#",
  },
  {
    title: "Notes on building the ASCII scramble button",
    excerpt:
      "Marching ants borders, monospace glyphs, and timed state transitions — taking inspiration from terminal interfaces.",
    date: "2024-04-09",
    readMin: 5,
    category: "Note",
    href: "#",
  },
  {
    title: "Why I rewrote my portfolio (again)",
    excerpt:
      "Going from Gatsby to Next, from Styled Components to Tailwind, and what I learned about scope creep.",
    date: "2023-10-14",
    readMin: 4,
    category: "Writing",
    href: "#",
  },
  {
    title: "Designing under uncertainty — talk at Hyper Island",
    excerpt:
      "A 25-minute talk on shipping when you don't know if the thing should exist yet.",
    date: "2023-05-22",
    category: "Talk",
    href: "#",
  },
  {
    title: "Cursor-following image previews",
    excerpt:
      "Tiny interaction study: how Locomotive's project list does it, and three ways to build it yourself.",
    date: "2022-11-30",
    category: "Experiment",
    href: "#",
  },
  {
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    excerpt:
      "What's the most important? Making the web accessible for all or letting the user make the website black?",
    date: "2021-03-03",
    readMin: 3,
    category: "Writing",
    href: "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
    external: true,
  },
  {
    title: "How to use the grid",
    excerpt:
      "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    date: "2019-08-22",
    readMin: 6,
    category: "Writing",
    href: "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
    external: true,
  },
];

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
};

const getYear = (iso: string) => new Date(iso).getFullYear();

const Hrefable = ({
  article,
  children,
  className,
  style,
  onMouseEnter,
}: {
  article: Article;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
}) => {
  if (article.external) {
    return (
      <a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={article.href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </Link>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT A — Indexed list (matches project list aesthetic)
// ────────────────────────────────────────────────────────────────
const VariantA = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex flex-col" onMouseLeave={() => setHovered(null)}>
      {rows.map((a, i) => {
        const accent = hovered === i;
        return (
          <Hrefable
            key={a.href + i}
            article={a}
            onMouseEnter={() => setHovered(i)}
            className="flex items-center justify-between py-3 border-b border-dashed font-system uppercase text-sm tracking-wide transition-colors"
            style={{ borderColor: accent ? ORANGE : "#9ca3af" }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <span
                className="tabular-nums shrink-0 transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="truncate">
                <span
                  className="transition-colors"
                  style={{ color: accent ? ORANGE : "#F7F7F7" }}
                >
                  {a.title}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0 ml-4">
              <span
                className="text-[10px] tracking-[0.2em] transition-colors"
                style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
              >
                {a.category}
              </span>
              <span
                className="tabular-nums transition-colors w-12 text-right"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {getYear(a.date)}
              </span>
              <span
                className="tabular-nums transition-colors w-12 text-right"
                style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
              >
                {a.readMin ? `${a.readMin} MIN` : "—"}
              </span>
            </div>
          </Hrefable>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT B — Date-led timeline grouped by year
// ────────────────────────────────────────────────────────────────
const VariantB = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = [...rows].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = sorted.reduce<Record<number, Article[]>>((acc, a) => {
    const y = getYear(a.date);
    (acc[y] = acc[y] || []).push(a);
    return acc;
  }, {});
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col" onMouseLeave={() => setHovered(null)}>
      {years.map((year) => (
        <div key={year} className="flex flex-col sm:flex-row gap-4 py-6 border-b border-dashed border-gray-400">
          <div className="sm:w-20 shrink-0 font-title italic text-2xl text-gray-500">
            {year}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {byYear[year].map((a) => {
              const key = a.href + a.date;
              const accent = hovered === key;
              return (
                <Hrefable
                  key={key}
                  article={a}
                  onMouseEnter={() => setHovered(key)}
                  className="grid grid-cols-[68px_1fr_auto] gap-4 items-baseline transition-colors group"
                  style={{ color: accent ? ORANGE : undefined }}
                >
                  <span
                    className="text-[10px] tracking-[0.2em] font-system uppercase tabular-nums shrink-0 pt-1"
                    style={{ color: accent ? ORANGE : "#6b7280" }}
                  >
                    {formatDate(a.date)}
                  </span>
                  <span
                    className="font-title italic text-lg leading-snug transition-colors"
                    style={{ color: accent ? ORANGE : "#F7F7F7" }}
                  >
                    {a.title}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.2em] font-system uppercase shrink-0 pt-1"
                    style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
                  >
                    {a.category}
                  </span>
                </Hrefable>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT C — Magazine cards (2-col grid with excerpt)
// ────────────────────────────────────────────────────────────────
const VariantC = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-400">
      {rows.map((a, i) => {
        const accent = hovered === i;
        return (
          <Hrefable
            key={a.href + i}
            article={a}
            onMouseEnter={() => setHovered(i)}
            className="flex flex-col gap-3 p-5 bg-[#161616] transition-colors min-h-[180px]"
            style={{ backgroundColor: accent ? "rgba(255, 88, 0, 0.04)" : undefined }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] tracking-[0.2em] font-system uppercase transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {a.category}
              </span>
              <span className="text-[10px] tracking-[0.2em] font-system uppercase text-gray-500 tabular-nums">
                {formatDate(a.date)} · {getYear(a.date)}
              </span>
            </div>
            <h3
              className="font-title italic text-xl leading-tight transition-colors flex-1"
              style={{ color: accent ? ORANGE : "#F7F7F7" }}
            >
              {a.title}
            </h3>
            <p className="text-sm font-text text-gray-500 leading-relaxed line-clamp-2">
              {a.excerpt}
            </p>
            <div
              className="text-[10px] tracking-[0.2em] font-system uppercase transition-colors mt-auto"
              style={{ color: accent ? ORANGE : "#6b7280" }}
            >
              {accent ? "Read →" : `${a.readMin ?? "—"} ${a.readMin ? "min read" : ""}`}
            </div>
          </Hrefable>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT D — Vertical category rail (extends current BlogComponent leftText)
// ────────────────────────────────────────────────────────────────
const CategoryShort: Record<Article["category"], string> = {
  Writing: "W",
  Experiment: "EXP",
  Note: "NOTE",
  Playground: "PLAY",
  Talk: "TALK",
};

const VariantD = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex flex-col pl-12" onMouseLeave={() => setHovered(null)}>
      {rows.map((a, i) => {
        const accent = hovered === i;
        const short = CategoryShort[a.category];
        return (
          <Hrefable
            key={a.href + i}
            article={a}
            onMouseEnter={() => setHovered(i)}
            className="relative flex flex-col py-5 border-b border-dashed gap-1 transition-colors"
            style={{ borderColor: accent ? ORANGE : "#9ca3af" }}
          >
            <span
              className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.25em] font-title transition-colors whitespace-nowrap"
              style={{ color: accent ? ORANGE : "#6b7280" }}
            >
              {short}
            </span>
            <div className="flex items-baseline justify-between gap-4">
              <h3
                className="font-title italic text-lg leading-snug transition-colors"
                style={{ color: accent ? ORANGE : "#F7F7F7" }}
              >
                {a.title}
              </h3>
              <span
                className="text-[10px] tracking-[0.2em] font-system uppercase tabular-nums shrink-0 transition-colors"
                style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
              >
                {formatDate(a.date)} · {getYear(a.date)}
              </span>
            </div>
            <p className="text-sm font-text text-gray-500 leading-relaxed">
              {a.excerpt}
            </p>
            <span
              className="text-[10px] tracking-[0.2em] font-system uppercase mt-1 transition-colors"
              style={{ color: accent ? ORANGE : "#6b7280" }}
            >
              {a.external ? "Read on Medium →" : "Read →"}
            </span>
          </Hrefable>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT E — Typographic posters (no images, year as background)
// ────────────────────────────────────────────────────────────────
const VariantE = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rows.map((a, i) => {
        const accent = hovered === i;
        return (
          <Hrefable
            key={a.href + i}
            article={a}
            onMouseEnter={() => setHovered(i)}
            className="relative overflow-hidden p-6 min-h-[260px] flex flex-col justify-between border border-dashed transition-colors"
            style={{ borderColor: accent ? ORANGE : "#374151" }}
          >
            <span
              className="absolute -top-6 -right-2 font-title italic select-none transition-colors pointer-events-none"
              style={{
                fontSize: "9rem",
                lineHeight: 1,
                color: accent ? "rgba(255, 88, 0, 0.12)" : "rgba(247, 247, 247, 0.04)",
              }}
            >
              {getYear(a.date)}
            </span>
            <div className="relative flex items-center justify-between">
              <span
                className="text-[10px] tracking-[0.25em] font-system uppercase transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {a.category}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] font-system uppercase tabular-nums transition-colors"
                style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
              >
                {formatDate(a.date)}
              </span>
            </div>
            <h3
              className="relative font-title italic text-3xl leading-[1.05] mt-3 mb-4 transition-colors"
              style={{ color: accent ? ORANGE : "#F7F7F7" }}
            >
              {a.title}
            </h3>
            <div className="relative flex items-end justify-between gap-4">
              <p className="text-xs font-text text-gray-500 leading-relaxed line-clamp-2 flex-1">
                {a.excerpt}
              </p>
              <span
                className="text-[10px] tracking-[0.25em] font-system uppercase shrink-0 transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {a.readMin ? `${a.readMin} min` : "—"}
              </span>
            </div>
          </Hrefable>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT F — ASCII glyph cards (deterministic art mark per article)
// ────────────────────────────────────────────────────────────────
function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const SPARSE_PALETTE = ["·", " ", " ", " ", "░", "░", "▒"];
const DENSE_PALETTE = ["█", "▓", "▒", "█", "░", " ", "▓", "█", "▒"];
const NOISE_PALETTE = ["░", "▒", "▓", "█", "·", "/", "\\", " "];

function generateGrid(seed: string, cols: number, rows: number, palette: string[]) {
  let h = hashString(seed);
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < cols; c++) {
      h = (h * 1103515245 + 12345) >>> 0;
      row.push(palette[h % palette.length]);
    }
    grid.push(row);
  }
  return grid;
}

function gridToString(grid: string[][]) {
  return grid.map((r) => r.join("")).join("\n");
}

const COLS = 16;
const ROWS = 5;

// F1 — Static baseline
function useStaticGlyph(seed: string, active: boolean) {
  const sparse = generateGrid(seed, COLS, ROWS, SPARSE_PALETTE);
  const dense = generateGrid(`${seed}-on`, COLS, ROWS, DENSE_PALETTE);
  return gridToString(active ? dense : sparse);
}

// F2 — Left-to-right swipe rebuild
function useSwipeGlyph(seed: string, active: boolean, stepMs = 18) {
  const sparseRef = useRef(generateGrid(seed, COLS, ROWS, SPARSE_PALETTE));
  const denseRef = useRef(generateGrid(`${seed}-on`, COLS, ROWS, DENSE_PALETTE));
  const [grid, setGrid] = useState<string[][]>(() =>
    sparseRef.current.map((r) => [...r])
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const target = active ? denseRef.current : sparseRef.current;
    let col = 0;
    const tick = () => {
      setGrid((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) => (c === col ? target[r][c] : cell))
        )
      );
      col++;
      if (col < COLS) timerRef.current = setTimeout(tick, stepMs);
    };
    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, stepMs]);

  return gridToString(grid);
}

// F3 — Top-down drop
function useDropGlyph(seed: string, active: boolean, stepMs = 60) {
  const sparseRef = useRef(generateGrid(seed, COLS, ROWS, SPARSE_PALETTE));
  const denseRef = useRef(generateGrid(`${seed}-on`, COLS, ROWS, DENSE_PALETTE));
  const [grid, setGrid] = useState<string[][]>(() =>
    sparseRef.current.map((r) => [...r])
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const target = active ? denseRef.current : sparseRef.current;
    let row = 0;
    const tick = () => {
      setGrid((prev) =>
        prev.map((rowArr, r) => (r === row ? [...target[r]] : rowArr))
      );
      row++;
      if (row < ROWS) timerRef.current = setTimeout(tick, stepMs);
    };
    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, stepMs]);

  return gridToString(grid);
}

// F4 — Scramble all (like add-to-cart)
function useScrambleGlyph(seed: string, active: boolean, durationMs = 500, stepMs = 30) {
  const sparseRef = useRef(generateGrid(seed, COLS, ROWS, SPARSE_PALETTE));
  const denseRef = useRef(generateGrid(`${seed}-on`, COLS, ROWS, DENSE_PALETTE));
  const [grid, setGrid] = useState<string[][]>(() =>
    sparseRef.current.map((r) => [...r])
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const target = active ? denseRef.current : sparseRef.current;
    const totalSteps = Math.ceil(durationMs / stepMs);
    let step = 0;
    const tick = () => {
      const progress = step / totalSteps;
      setGrid(
        target.map((row, r) =>
          row.map((cell, c) => {
            if (Math.random() < progress) return cell;
            return NOISE_PALETTE[Math.floor(Math.random() * NOISE_PALETTE.length)];
          })
        )
      );
      step++;
      if (step <= totalSteps) {
        timerRef.current = setTimeout(tick, stepMs);
      } else {
        setGrid(target.map((r) => [...r]));
      }
    };
    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, durationMs, stepMs]);

  return gridToString(grid);
}

// F5 — Continuous wave (loops while active)
function useWaveGlyph(seed: string, active: boolean, stepMs = 90) {
  const baseRef = useRef(generateGrid(seed, COLS, ROWS, SPARSE_PALETTE));
  const [grid, setGrid] = useState<string[][]>(() =>
    baseRef.current.map((r) => [...r])
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) {
      setGrid(baseRef.current.map((r) => [...r]));
      return;
    }
    let frame = 0;
    const tick = () => {
      setGrid(() => {
        const next = baseRef.current.map((r) => [...r]);
        for (let r = 0; r < ROWS; r++) {
          const wavePos =
            (frame + Math.floor(Math.sin(r * 0.8 + frame * 0.3) * 3)) % COLS;
          for (let dc = 0; dc < 3; dc++) {
            const c = (wavePos + dc) % COLS;
            next[r][c] =
              DENSE_PALETTE[Math.floor(Math.random() * DENSE_PALETTE.length)];
          }
        }
        return next;
      });
      frame++;
      timerRef.current = setTimeout(tick, stepMs);
    };
    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, stepMs]);

  return gridToString(grid);
}

type AsciiAnimation = "static" | "swipe" | "drop" | "scramble" | "wave";

const AsciiCard = ({
  article,
  active,
  onEnter,
  animation,
}: {
  article: Article;
  active: boolean;
  onEnter: () => void;
  animation: AsciiAnimation;
}) => {
  const staticG = useStaticGlyph(article.title, active);
  const swipeG = useSwipeGlyph(article.title, active);
  const dropG = useDropGlyph(article.title, active);
  const scrambleG = useScrambleGlyph(article.title, active);
  const waveG = useWaveGlyph(article.title, active);
  const glyph =
    animation === "swipe"
      ? swipeG
      : animation === "drop"
        ? dropG
        : animation === "scramble"
          ? scrambleG
          : animation === "wave"
            ? waveG
            : staticG;

  return (
    <Hrefable
      article={article}
      onMouseEnter={onEnter}
      className="flex flex-col p-5 border border-dashed transition-colors gap-3"
      style={{ borderColor: active ? ORANGE : "#374151" }}
    >
      <pre
        className="font-mono text-[10px] leading-[1] whitespace-pre transition-colors select-none"
        style={{ color: active ? ORANGE : "#4b5563" }}
      >
        {glyph}
      </pre>
      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] font-system uppercase">
        <span
          className="transition-colors"
          style={{ color: active ? ORANGE : "#6b7280" }}
        >
          {article.category}
        </span>
        <span
          className="tabular-nums transition-colors"
          style={{ color: active ? "#ff5800aa" : "#6b7280" }}
        >
          {formatDate(article.date)} · {getYear(article.date)}
        </span>
      </div>
      <h3
        className="font-title italic text-xl leading-tight transition-colors"
        style={{ color: active ? ORANGE : "#F7F7F7" }}
      >
        {article.title}
      </h3>
      <p className="text-sm font-text text-gray-500 leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
    </Hrefable>
  );
};

const AsciiCardGrid = ({
  rows,
  animation,
}: {
  rows: Article[];
  animation: AsciiAnimation;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onMouseLeave={() => setHovered(null)}
    >
      {rows.map((a, i) => (
        <AsciiCard
          key={a.href + i}
          article={a}
          active={hovered === i}
          onEnter={() => setHovered(i)}
          animation={animation}
        />
      ))}
    </div>
  );
};

const VariantF = ({ rows }: { rows: Article[] }) => (
  <AsciiCardGrid rows={rows} animation="static" />
);

// ────────────────────────────────────────────────────────────────
// F6 — Horizontal slider / carousel of F5-style wave cards
// ────────────────────────────────────────────────────────────────
const AsciiSliderCard = ({
  article,
  active,
  onEnter,
}: {
  article: Article;
  active: boolean;
  onEnter: () => void;
}) => {
  const glyph = useWaveGlyph(article.title, active);
  return (
    <Hrefable
      article={article}
      onMouseEnter={onEnter}
      className="snap-start shrink-0 w-[300px] flex flex-col p-5 border border-dashed transition-colors gap-3"
      style={{ borderColor: active ? ORANGE : "#374151" }}
    >
      <pre
        className="font-mono text-[10px] leading-[1] whitespace-pre transition-colors select-none"
        style={{ color: active ? ORANGE : "#4b5563" }}
      >
        {glyph}
      </pre>
      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] font-system uppercase">
        <span
          className="transition-colors"
          style={{ color: active ? ORANGE : "#6b7280" }}
        >
          {article.category}
        </span>
        <span
          className="tabular-nums transition-colors"
          style={{ color: active ? "#ff5800aa" : "#6b7280" }}
        >
          {formatDate(article.date)} · {getYear(article.date)}
        </span>
      </div>
      <h3
        className="font-title italic text-xl leading-tight transition-colors"
        style={{ color: active ? ORANGE : "#F7F7F7" }}
      >
        {article.title}
      </h3>
      <p className="text-sm font-text text-gray-500 leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
    </Hrefable>
  );
};

const VariantF6 = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startScroll: number; active: boolean }>({
    startX: 0,
    startScroll: 0,
    active: false,
  });
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      active: true,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const el = scrollerRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 316, behavior: "smooth" });
  };

  return (
    <div className="relative" onMouseLeave={() => setHovered(null)}>
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={updateProgress}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 cursor-grab select-none"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {rows.map((a, i) => (
          <AsciiSliderCard
            key={a.href + i}
            article={a}
            active={hovered === i}
            onEnter={() => setHovered(i)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="relative h-px flex-1 bg-gray-700 mr-4">
          <div
            className="absolute top-0 left-0 h-px bg-[#ff5800] transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="w-8 h-8 border border-dashed border-gray-400 text-gray-400 hover:text-[#ff5800] hover:border-[#ff5800] transition-colors text-sm"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="w-8 h-8 border border-dashed border-gray-400 text-gray-400 hover:text-[#ff5800] hover:border-[#ff5800] transition-colors text-sm"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT G — Index-card / library catalog
// ────────────────────────────────────────────────────────────────
const VariantG = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {rows.map((a, i) => {
        const accent = hovered === i;
        const refCode = `${a.category.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;
        return (
          <Hrefable
            key={a.href + i}
            article={a}
            onMouseEnter={() => setHovered(i)}
            className="relative flex flex-col p-5 transition-colors bg-[#1a1a1a]"
            style={{
              borderTop: `1px solid ${accent ? ORANGE : "#374151"}`,
              borderBottom: `1px solid ${accent ? ORANGE : "#374151"}`,
            }}
          >
            <div
              className="flex items-center justify-between text-[10px] tracking-[0.2em] font-mono uppercase pb-2 mb-3 border-b border-dashed transition-colors"
              style={{ borderColor: accent ? "#ff580055" : "#374151" }}
            >
              <span
                className="transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {refCode}
              </span>
              <span
                className="tabular-nums transition-colors"
                style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
              >
                {a.date.replaceAll("-", ".")}
              </span>
            </div>
            <h3
              className="font-title italic text-2xl leading-tight transition-colors mb-2"
              style={{ color: accent ? ORANGE : "#F7F7F7" }}
            >
              {a.title}
            </h3>
            <p className="text-sm font-text text-gray-500 leading-relaxed flex-1">
              {a.excerpt}
            </p>
            <div className="flex items-center justify-between mt-4 text-[10px] tracking-[0.2em] font-system uppercase">
              <span
                className="transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {a.category}{a.readMin ? ` · ${a.readMin} MIN` : ""}
              </span>
              <span
                className="transition-colors"
                style={{ color: accent ? ORANGE : "#6b7280" }}
              >
                {a.external ? "Medium ↗" : "Read →"}
              </span>
            </div>
          </Hrefable>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────

const VariantSection = ({
  label,
  title,
  desc,
  children,
}: {
  label: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <section className="mb-24">
    <div className="mb-6">
      <span className="text-xs font-inter uppercase tracking-widest text-[#ff5800]">
        {label}
      </span>
      <h2 className="text-xl font-title italic mt-1 mb-1 text-[#F7F7F7]">
        {title}
      </h2>
      <p className="text-sm font-system text-gray-500">{desc}</p>
    </div>
    {children}
  </section>
);

const WritingsVariants = () => (
  <Layout
    title="Writings Variants - William Martinsson"
    desc="Design suggestions for the writings/articles section at scale."
    framerKey="writings-variants"
    className="lg:w-[760px] mx-auto"
  >
    <h1 className="text-2xl font-title italic mt-5 mb-2 md:mt-[120px] text-[#F7F7F7]">
      Writings & Articles — Variants
    </h1>
    <p className="text-sm font-system text-gray-500 mb-16 max-w-md">
      Four design directions for the Writing & Experiments section,
      sized for ~10–30 articles. All use the same orange accent on hover.
    </p>

    <VariantSection
      label="A"
      title="Indexed list"
      desc="Matches the homepage projects list aesthetic — numbered, category, year, read time. Densest of the four."
    >
      <VariantA rows={articles} />
    </VariantSection>

    <VariantSection
      label="B"
      title="Timeline grouped by year"
      desc="Year as a large italic anchor on the left. Each entry shows date · title · category. Reads like a journal index."
    >
      <VariantB rows={articles} />
    </VariantSection>

    <VariantSection
      label="C"
      title="Magazine cards"
      desc="2-column grid with excerpts. Best when you want the title + excerpt + read-time to do the selling. Heavier visually."
    >
      <VariantC rows={articles} />
    </VariantSection>

    <VariantSection
      label="D"
      title="Vertical category rail"
      desc="Keeps your existing rotated leftText pattern. Title + excerpt + date · year. Closest evolution of the current Suggested Reading block."
    >
      <VariantD rows={articles} />
    </VariantSection>

    <h2 className="text-sm font-inter uppercase tracking-widest text-gray-500 mt-8 mb-2">
      Card directions
    </h2>
    <p className="text-sm font-system text-gray-500 mb-16 max-w-md">
      Three card explorations — leaning into typography, ASCII marks, or a
      library-catalog format, since article cards without thumbnails need
      something else to anchor each tile.
    </p>

    <VariantSection
      label="E"
      title="Typographic posters"
      desc="No image. The year becomes a huge ghosted background number, title is the hero, category and date frame it like a print spread."
    >
      <VariantE rows={articles} />
    </VariantSection>

    <VariantSection
      label="F1"
      title="ASCII glyph — static"
      desc="Baseline: sparse pattern at rest, denser pattern on hover. No animation, just an instant swap. Reference point for the animated takes below."
    >
      <AsciiCardGrid rows={articles} animation="static" />
    </VariantSection>

    <VariantSection
      label="F2"
      title="ASCII glyph — swipe (L→R)"
      desc="On hover, columns rebuild from left to right with denser characters. On unhover, swipes back to sparse. Feels like a print head or paper feed."
    >
      <AsciiCardGrid rows={articles} animation="swipe" />
    </VariantSection>

    <VariantSection
      label="F3"
      title="ASCII glyph — drop (top→bottom)"
      desc="Rows fall in from the top, one at a time. Slower than the swipe — reads like a typewriter cascading line by line."
    >
      <AsciiCardGrid rows={articles} animation="drop" />
    </VariantSection>

    <VariantSection
      label="F4"
      title="ASCII glyph — scramble"
      desc="All cells scramble through noise simultaneously, then resolve into the new pattern. Same mechanic as the add-to-cart button."
    >
      <AsciiCardGrid rows={articles} animation="scramble" />
    </VariantSection>

    <VariantSection
      label="F5"
      title="ASCII glyph — wave (continuous)"
      desc="While hovered, a 3-cell wave loops across each row, leaving a trail of denser characters. Looks alive. Stops and resets when you leave."
    >
      <AsciiCardGrid rows={articles} animation="wave" />
    </VariantSection>

    <VariantSection
      label="F6"
      title="ASCII wave cards — slider"
      desc="Same F5 cards (wave on hover), but in a horizontal slider with snap. Drag to scroll, use the arrows, or swipe on touch. Frees up vertical space when the list grows large."
    >
      <VariantF6 rows={articles} />
    </VariantSection>

    <VariantSection
      label="G"
      title="Index-card / catalog"
      desc="Library-card framing: a reference code (WRI-001), date in YYYY.MM.DD, structured metadata header. Reads like a card from a card catalog."
    >
      <VariantG rows={articles} />
    </VariantSection>
  </Layout>
);

export default WritingsVariants;
