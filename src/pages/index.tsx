import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import Layout from "../components/Layout";
import TextBlock from "src/components/TextBlock";
import ProjectListAscii, {
  ProjectRow,
} from "src/components/ProjectListAscii";
import React from "react";

import KnoddHero from "../assets/knodd/hero.png";
import SuperchicaneHero from "../assets/superchicane/hero.png";
import RadionightHero from "../assets/radionight/hero.png";
import MasterDigitalDesignHero from "../assets/masterdigitaldesign/hero.png";
import AgenlyHero from "../assets/agenly/hero.png";
import MatieHero from "../assets/matie/hero.png";
import KnvbHero from "../assets/knvb/hero.png";

export const projects: ProjectRow[] = [
  {
    title: "Leche Negra",
    agency: "TRY Stockholm",
    year: "2026",
    desc: "Site for the restaurant where half the fun is finding what shouldn't be there. Packed with small interactions and easter eggs that reward poking around.",
    externalHref: "https://www.lechenegra.com/",
  },
  {
    title: "Miss Mary",
    agency: "TRY Stockholm",
    year: "2026",
    desc: "New e-commerce site for the Swedish lingerie brand making well-fitting bras and swimwear since 1957, built on React, Storyblok and Centra.",
    externalHref: "https://www.missmary.com",
  },
  {
    title: "Dedicated",
    agency: "TRY Stockholm",
    year: "2025",
    desc: "New e-commerce site for the Stockholm-based sustainable streetwear brand, built on React, Storyblok and Centra.",
    externalHref: "https://www.dedicatedbrand.com",
  },
  {
    title: "Stronger",
    agency: "TRY Stockholm",
    year: "2025",
    desc: "New e-commerce site for the Swedish activewear brand sold across 100+ markets, built on React, Storyblok and Centra.",
    externalHref: "https://www.strongerlabel.com",
  },
  {
    title: "Röhnisch",
    agency: "Made People",
    year: "2024",
    desc: "New e-commerce site for the Swedish women's activewear brand founded in 1945, built on React, Storyblok and Centra.",
    externalHref: "https://www.rohnisch.com",
  },
  {
    title: "Astrid Lindgren",
    agency: "Made People",
    year: "2024",
    desc: "New e-commerce platform for The Astrid Lindgren Company's official store — Pippi Longstocking, Emil and other beloved characters — built on React, Storyblok and Centra.",
    externalHref: "https://www.astridlindgren.com",
  },
  {
    title: "EQPE (SkiStar)",
    agency: "Made People",
    year: "2023",
    desc: "New e-commerce site for SkiStar's in-house Scandinavian skiwear brand launching across five European markets, built on Vue, Storyblok and Centra.",
    externalHref: "https://www.eqpestore.com",
  },
  {
    title: "Mini Rodini",
    agency: "Made People",
    year: "2023",
    desc: "New e-commerce site for the iconic Swedish kidswear brand known for bold prints and sustainable production, built on React, Storyblok and Centra.",
    externalHref: "https://www.minirodini.com",
  },
  {
    title: "Levels Health",
    agency: "Oh Hi (Freelance)",
    year: "2022",
    desc: "Internal communication tool for the metabolic health startup — a focused workspace for the team to share updates, research notes, and shared docs in one place.",
    externalHref: "https://www.levelshealth.com",
  },
  {
    title: "Artscape",
    agency: "Oh Hi (Freelance)",
    year: "2022",
    desc: "NFT platform for Artscape, the Swedish nonprofit behind some of the world's largest street art projects — bringing public murals onto the blockchain.",
    externalHref: "https://artscape.se",
  },
  {
    title: "Radionight",
    agency: "Personal",
    year: "2021",
    desc: "A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.",
    href: "/projects/radionight",
    image: RadionightHero,
  },
  {
    title: "Superchicane",
    agency: "Personal",
    year: "2021",
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    href: "/projects/superchicane",
    image: SuperchicaneHero,
  },
  {
    title: "Matie",
    agency: "Personal",
    year: "2021",
    desc: "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family.",
    href: "/projects/matie",
    image: MatieHero,
  },
  {
    title: "Knodd",
    agency: "Oh Hi (Freelance)",
    year: "2020",
    desc: "Website for the Swedish digital paediatric healthcare provider connecting parents with paediatricians and nurses via video.",
    href: "/projects/knodd",
    image: KnoddHero,
    externalHref: "https://www.knodd.se",
  },
  {
    title: "Karygen Health",
    agency: "Oh Hi (Freelance)",
    year: "2020",
    desc: "Designed and built a one-pager for an early-stage Australian startup in the health industry — clean, scrollable, made to introduce the product to its first audience.",
  },
  {
    title: "Agenly",
    agency: "Personal",
    year: "2019",
    desc: "A website builder where you build your sites through having a dialogue with a decision tree (semi-AI).",
    href: "/projects/agenly",
    image: AgenlyHero,
  },
  {
    title: "KNVB Rinus",
    agency: "Momkai",
    year: "2019",
    desc: "The new version of KNVB's Rinus, a training platform for football teams where they plan exercises and get advice from other coaches.",
    href: "/projects/knvb-rinus",
    image: KnvbHero,
  },
  {
    title: "Master Digital Design",
    agency: "Momkai",
    year: "2018",
    desc: "An alumni page for Amsterdam University of Applied Sciences design students.",
    href: "/projects/master-digital-design",
    image: MasterDigitalDesignHero,
  },
  {
    title: "Halland Region",
    agency: "Oh Hi (Freelance)",
    year: "2018",
    desc: "Designed and built a website surfacing the region's European projects — their partnerships, initiatives, and the work happening across borders.",
  },
];

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
    title: "Marching ants and scrambling text",
    excerpt:
      "A step-by-step walkthrough of the two effects that carry the personality of the add-to-cart button — a marching SVG border and a label that scrambles between states.",
    date: "2026-05-17",
    category: "Writing",
    href: "/writings/add-to-cart",
  },
  {
    title: "A cart is not a list",
    excerpt:
      "Notes on what the design of a minicart is actually for. Three iterations of the same cart, one citation, one position.",
    date: "2026-05-17",
    category: "Writing",
    href: "/writings/minicart",
  },
  {
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    excerpt:
      "What's the most important? Making the web accessible for all or letting the user make the website black?",
    date: "2021-12-13",
    category: "Writing",
    externalHref:
      "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
  },
  {
    title: "The Greatest and the Cursed Car Numbers",
    excerpt:
      "Coming from football where the numbers are almost mythological, I wanted to find out more about the car numbers and try to discover their hidden meanings and status.",
    date: "2021-03-30",
    category: "Writing",
    externalHref: "https://superchicane.com/articles/thecursedf1number",
  },
  {
    title: "How to use the grid",
    excerpt:
      "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    date: "2020-11-09",
    category: "Writing",
    externalHref:
      "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
  },
  {
    title: "Why Figma Beats Sketch",
    excerpt:
      "For a long time, the biggest players in the UI design market were Adobe (Photoshop, Illustrator) and Sketch. Both of these tools aren't very collaborative.",
    date: "2019-10-10",
    category: "Writing",
    externalHref:
      "https://williammartinsson.medium.com/why-figma-is-better-then-sketch-872b7bf8631a",
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
  const dragRef = useRef({
    startX: 0,
    startScroll: 0,
    primed: false,
    active: false,
  });
  const [progress, setProgress] = useState(0);

  const DRAG_THRESHOLD = 5;

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Prime but don't drag yet — wait for movement past threshold so clicks
    // (which fire pointerdown + pointerup at ~same x) reach the Link inside.
    dragRef.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      primed: true,
      active: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.primed) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragRef.current.startX;
    if (!dragRef.current.active) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      dragRef.current.active = true;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      el.style.scrollSnapType = "none";
    }
    el.scrollLeft = dragRef.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.primed) return;
    const el = scrollerRef.current;
    if (el && dragRef.current.active) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
      el.style.scrollSnapType = "x mandatory";
    }
    dragRef.current = {
      startX: 0,
      startScroll: 0,
      primed: false,
      active: false,
    };
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
// Page
// ────────────────────────────────────────────────────────────────

const Home = ({ currentlyReading, readRecently }: any) => {
  const [showPortrait, setShowPortrait] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, {
    stiffness: 400,
    damping: 40,
    mass: 0.4,
  });
  const previewY = useSpring(mouseY, {
    stiffness: 400,
    damping: 40,
    mass: 0.4,
  });

  const handleNameMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 100);
  };

  return (
    <Layout
      title="William Martinsson — Design Engineer"
      desc="Design Engineer based in Stockholm. Currently Team Lead at TRY Stockholm, building ecom sites for Swedish fashion brands like Mini Rodini, OAS, and Stronger."
      framerKey="home"
      className="lg:w-[655px] mx-auto"
    >
      <h1 className="text-base font-title -tracking-tight italic font-normal mt-5 mb-4 md:mt-[250px]">
        <span
          onMouseEnter={() => setShowPortrait(true)}
          onMouseLeave={() => setShowPortrait(false)}
          onMouseMove={handleNameMouseMove}
        >
          William Martinsson
        </span>{" "}
        -<br />
        Based in Stockholm
      </h1>

      <AnimatePresence>
        {showPortrait && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{ x: previewX, y: previewY }}
            className="fixed top-0 left-0 pointer-events-none z-50 w-[200px] hidden md:block"
          >
            <div className="border border-dashed border-gray-400 p-1 bg-[#0d0d0d]">
              <Image
                src="/william-portrait.jpg"
                width={200}
                height={200}
                alt="William Martinsson"
                className="block w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="text-base font-text mb-12 inline-block text-balance">
        <strong className="font-title italic font-medium">
          Design Engineer.
        </strong>{" "}
        Currently Team Lead at{" "}
        <a
          href="https://trystockholm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          TRY Stockholm
        </a>
        , creating ecom sites for some of Sweden's biggest fashion brands (
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
        & built a communication tool with{" "}
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
        lead="Articles and walkthroughs from the craft."
      />
      <div className="mt-6 mb-16">
        <WritingsSlider rows={articles} />
      </div>

      <SectionHeader
        index="03"
        title="Me"
        lead="How I work, what I read, who I cheer for."
      />
      <div className="mt-6 mb-6">
      <TextBlock>
        I work fast on purpose. Speed isn't the opposite of care — it's what
        buys the time to collaborate, iterate, and try the version no one
        asked for. The faster I can put something in front of someone, the
        more shots I get at making it right.
        <br />
        <br />
        Most of what I do at TRY sits in the seam between design and
        engineering, which is where the interesting work usually is. I've
        been writing React since I built my first site nearly ten years ago.
        Still my favorite, and nothing else lets me move faster. For styling
        I usually reach for Tailwind.
        <br />
        <br />
        Sometimes I write about the work too — usually when something is
        bothering me about how it's done.
        <br />
        <br />
        When I close the laptop, I'm hunting{" "}
        <strong>Unknown Pleasures</strong> in Stockholm's vinyl shops,
        cheering for{" "}
        <strong className="text-[#89CFF0]">Änglarna</strong> (IFK Göteborg)
        in Allsvenskan and{" "}
        <strong className="text-[orange]">McLaren</strong> in F1, and
        usually halfway through more books than I should be — currently{" "}
        {currentlyReading.length > 0 &&
          currentlyReading.map((book: any, index: number) => (
            <React.Fragment key={index}>
              <strong>
                <a href={book.link}>{book.title}</a> by {book.creator}
              </strong>
              {currentlyReading.length - 1 !== index && " and "}
            </React.Fragment>
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
      </div>
      <SectionHeader
        index="04"
        title="Reach out"
        lead="A chat, freelance proposal, or advice."
      />
      <div className="mt-6">
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
      </div>
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

export default Home;
