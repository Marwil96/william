import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import TextBlock from "src/components/TextBlock";
import ProjectListAscii from "src/components/ProjectListAscii";
import React from "react";
import { projects } from "./index";

const ORANGE = "#ff5800";
const SPARSE_PALETTE = ["·", " ", " ", " ", "░", "░", "▒"];
const DENSE_PALETTE = ["█", "▓", "▒", "█", "░", " ", "▓", "█", "▒"];
const ASCII_COLS = 14;
const ASCII_ROWS = 4;

type Article = {
  title: string;
  excerpt: string;
  date: string;
  category: "Writing" | "Note" | "Playground" | "Talk" | "Experiment";
  readMin?: number;
  href?: string;
  externalHref?: string;
};

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
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    excerpt:
      "What's the most important? Making the web accessible for all or letting the user make the website black?",
    date: "2021-03-03",
    readMin: 3,
    category: "Writing",
    externalHref:
      "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
  },
  {
    title: "How to use the grid",
    excerpt:
      "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    date: "2019-08-22",
    readMin: 6,
    category: "Writing",
    externalHref:
      "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
  },
];

// ────────────────────────────────────────────────────────────────
// ASCII wave glyph
// ────────────────────────────────────────────────────────────────

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

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

function useWaveGlyph(seed: string, active: boolean, stepMs = 90) {
  const baseRef = useRef(
    generateGrid(seed, ASCII_COLS, ASCII_ROWS, SPARSE_PALETTE)
  );
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
        for (let r = 0; r < ASCII_ROWS; r++) {
          const wavePos =
            (frame + Math.floor(Math.sin(r * 0.8 + frame * 0.3) * 3)) %
            ASCII_COLS;
          for (let dc = 0; dc < 3; dc++) {
            const c = (wavePos + dc) % ASCII_COLS;
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

  return grid.map((r) => r.join("")).join("\n");
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
};

// ────────────────────────────────────────────────────────────────
// Section header
// ────────────────────────────────────────────────────────────────

const SectionHeader = ({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead?: string;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 pb-2 border-b border-dashed border-gray-400">
    <div className="flex items-baseline gap-3 shrink-0">
      <span className="text-[10px] tracking-[0.25em] font-system uppercase text-gray-500 tabular-nums shrink-0">
        {index}
      </span>
      <h2 className="text-base lg:text-lg font-title italic font-normal text-[#F7F7F7] leading-none">
        {title}
      </h2>
    </div>
    {lead && (
      <p className="text-xs font-text text-gray-500 sm:text-right text-balance">
        {lead}
      </p>
    )}
  </div>
);

// ────────────────────────────────────────────────────────────────
// Writings slider
// ────────────────────────────────────────────────────────────────

const ArticleCard = ({
  article,
  active,
  onEnter,
}: {
  article: Article;
  active: boolean;
  onEnter: () => void;
}) => {
  const glyph = useWaveGlyph(article.title, active);
  const href = article.href ?? article.externalHref!;
  const external = !!article.externalHref;
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onEnter}
        className="snap-start shrink-0 w-[260px] flex flex-col p-4 border border-dashed transition-colors gap-3"
        style={{ borderColor: active ? ORANGE : "#374151" }}
      >
        {children}
      </a>
    ) : (
      <Link
        href={href}
        onMouseEnter={onEnter}
        className="snap-start shrink-0 w-[260px] flex flex-col p-4 border border-dashed transition-colors gap-3"
        style={{ borderColor: active ? ORANGE : "#374151" }}
      >
        {children}
      </Link>
    );

  return (
    <Wrapper>
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
          {formatDate(article.date)}
        </span>
      </div>
      <h3
        className="font-title italic text-lg leading-tight transition-colors"
        style={{ color: active ? ORANGE : "#F7F7F7" }}
      >
        {article.title}
      </h3>
      <p className="text-xs font-text text-gray-500 leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
    </Wrapper>
  );
};

const WritingsSlider = ({ rows }: { rows: Article[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startScroll: 0, active: false });
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
    el.scrollLeft =
      dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
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
    scrollerRef.current?.scrollBy({ left: dir * 276, behavior: "smooth" });
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pr-4 cursor-grab select-none border-r border-dashed border-gray-400"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {rows.map((a, i) => (
          <ArticleCard
            key={a.href ?? a.externalHref ?? a.title}
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
// Page — mirrors v1 (index.tsx) with the writings BlogComponent
// replaced by the slider.
// ────────────────────────────────────────────────────────────────

const HomepageV2 = ({ currentlyReading, readRecently }: any) => {
  return (
    <Layout
      title="William Martinsson — Homepage v2"
      desc="Test homepage: same as v1, but writings replaced with a slider."
      framerKey="homepage-v2"
      className="lg:w-[655px] mx-auto"
    >
      <h1 className="text-base font-title -tracking-tight italic font-normal mt-5 mb-4 md:mt-[250px]">
        William Martinsson -<br />
        Based in Stockholm
      </h1>
      <span className="text-base font-text mb-12 inline-block text-balance">
        <strong className="font-title italic font-medium">
          Design Engineer.
        </strong>{" "}
        Builder of performant software and web experiences. Musing about design
        systems and the dev & designer relationship. Currently Team Lead at{" "}
        <a
          href="https://trystockholm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          TRY Stockholm
        </a>
        , creating ecom sites for some of Swedens biggest fashion brands(
        <a
          href="https://minirodini.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Mini Rodini
        </a>
        ,{" "}
        <a
          href="https://oascompany.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          OAS
        </a>
        ,{" "}
        <a
          href="https://www.strongerlabel.com/se"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Stronger
        </a>
        ) and internal tools.
        <br /> <br /> Previously, designed and developed the new wave of
        internet art at{" "}
        <a
          href="https://artscape.se/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Artscape
        </a>{" "}
        & built a great communication tool with{" "}
        <a
          href="https://www.levelshealth.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Levels Health
        </a>
        .
      </span>

      <SectionHeader
        index="01"
        title="Projects"
        lead="Selected client work and case studies."
      />
      <div className="mb-16">
        <ProjectListAscii projects={projects} />
      </div>

      <SectionHeader
        index="02"
        title="Writing & Experiments"
        lead="Articles, notes, talks, and playgrounds."
      />
      <div className="mt-6 mb-16">
        <WritingsSlider rows={articles} />
      </div>

      <h2 className="text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Me
      </h2>
      <TextBlock>
        I'm all about learning through <strong>play</strong>, diving into good{" "}
        <strong>reads</strong>, and getting hands-on with{" "}
        <strong>building</strong>. When I tackle a new challenge, I aim to stay
        thoughtful, and open-minded, and take full responsibility for <br />
        figuring it out. <br />
        <br />
        I've been working with <strong>React</strong> since I made my first
        website almost ten years ago. I still{" "}
        <strong className="text-[pink]">love</strong> it, and I haven't found
        anything that can make me work as fast as it can. For styling, I’m
        usually using <strong>Tailwind</strong>.
        <br />
        <br />I take pride in working fast with a high level of detail. I
        believe speed is one of the cornerstones of creating great software. You
        have to be fast, if you want to have time to{" "}
        <strong>collaborate</strong> with design and other engineers, do more{" "}
        <strong>iterations</strong>, and dare to do things{" "}
        <strong>differently</strong>.
        <br />
        <br /> When I'm not hunched over my laptop, I hunt after{" "}
        <strong>Unknown Pleasures</strong> in <strong>Stockholms</strong> vinyl
        shops. Rooting for
        <strong className="text-[#89CFF0]"> Änglarna </strong> in Allsvenskan
        and <strong className="text-[orange]"> McLaren </strong> in Formula One.
        Currently reading{" "}
        {currentlyReading.length > 0 &&
          currentlyReading.map((book: any, index: number) => (
            <strong key={index}>
              <a href={book.link}>{book.title}</a> by {book.creator}
              {currentlyReading.length - 1 !== index && "&"}
            </strong>
          ))}
        , and recently read{" "}
        {readRecently.length > 0 &&
          readRecently.map((book: any, index: number) => (
            <React.Fragment key={index}>
              <strong>
                <a href={book.link}>{book.title}</a> by {book.creator}
              </strong>
              {readRecently.length - 1 !== index ? " and " : "."}
            </React.Fragment>
          ))}
      </TextBlock>
      <h2 className="text-xs lg:text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Reach out
      </h2>
      <TextBlock>
        Looking for a chat, a freelance proposal or advice?
        <br />
        Say hi at{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:william.c.o.martinsson@gmail.com"
        >
          william.c.o.martinsson@gmail.com
        </a>
      </TextBlock>
    </Layout>
  );
};

export async function getStaticProps() {
  const Parser = (await import("rss-parser")).default;
  const parser = new Parser();
  try {
    const currentlyReading = await parser.parseURL(
      "https://oku.club/rss/collection/b4aUW"
    );
    const readRecently = await parser.parseURL(
      "https://oku.club/rss/collection/8OVTk"
    );
    return {
      props: {
        currentlyReading: currentlyReading.items,
        readRecently: readRecently.items,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: { currentlyReading: [], readRecently: [] },
      revalidate: 60,
    };
  }
}

export default HomepageV2;
