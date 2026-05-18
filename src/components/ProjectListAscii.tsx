import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

export type ProjectRow = {
  title: string;
  agency: string;
  year: string;
  desc?: string;
  href?: string;
  externalHref?: string;
  image?: StaticImageData;
};

type Props = {
  projects: ProjectRow[];
};

const SPARSE_PALETTE = ["·", " ", " ", " ", "░", "░", "▒"];
const DENSE_PALETTE = ["█", "▓", "▒", "█", "░", " ", "▓", "█", "▒"];
const STRIP_COLS = 8;

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeSparseStrip(seed: string) {
  let h = hashString(seed + "idle");
  const cells: string[] = [];
  for (let i = 0; i < STRIP_COLS; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push(SPARSE_PALETTE[h % SPARSE_PALETTE.length]);
  }
  return cells;
}

function useWaveStrip(seed: string, active: boolean, stepMs = 70) {
  const idleRef = useRef<string[]>(makeSparseStrip(seed));
  const [cells, setCells] = useState<string[]>(() => [...idleRef.current]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) {
      setCells([...idleRef.current]);
      return;
    }
    let frame = 0;
    const tick = () => {
      setCells(() => {
        const next = [...idleRef.current];
        // wave head: 4-cell band of dense chars travelling L→R, looping
        const head = frame % (STRIP_COLS + 4);
        for (let i = 0; i < 4; i++) {
          const idx = head - i;
          if (idx >= 0 && idx < STRIP_COLS) {
            next[idx] =
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

  return cells.join("");
}

function useHasHover() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return hasHover;
}

const Row = ({
  project,
  i,
  isHovered,
  isExpanded,
  onEnter,
  onToggle,
}: {
  project: ProjectRow;
  i: number;
  isHovered: boolean;
  isExpanded: boolean;
  onEnter: () => void;
  onToggle: () => void;
}) => {
  const accent = isHovered || isExpanded;
  const strip = useWaveStrip(project.title, accent);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onMouseEnter={onEnter}
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex items-center justify-between gap-4 py-3 border-b border-dashed font-system uppercase text-sm tracking-wide cursor-pointer transition-colors focus:outline-none w-full text-left"
        style={{ borderColor: accent ? "#ff5800" : "#9ca3af" }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="tabular-nums shrink-0 transition-colors"
            style={{ color: accent ? "#ff5800" : "#6b7280" }}
          >
            {String(i + 1).padStart(3, "0")}
          </span>
          <span className="truncate">
            <span
              className="transition-colors"
              style={{ color: accent ? "#ff5800" : "#F7F7F7" }}
            >
              {project.title}
            </span>
            <span
              className="transition-colors"
              style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
            >
              {" "}
              {accent ? "→" : "@"} {project.agency}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <pre
            className="font-mono text-[11px] leading-none whitespace-pre transition-colors select-none"
            style={{ color: accent ? "#ff5800" : "#4b5563" }}
          >
            {strip}
          </pre>
          <span
            className="tabular-nums transition-colors"
            style={{ color: accent ? "#ff5800" : "#6b7280" }}
          >
            {project.year}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-dashed transition-colors"
            style={{ borderColor: accent ? "#ff5800" : "#9ca3af" }}
          >
            <div className="py-4 flex flex-col sm:flex-row gap-4">
              {project.image && (
                <div className="sm:w-1/2 shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    placeholder="blur"
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="w-full h-auto rounded-sm"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 text-sm font-system text-[#F7F7F7]/80">
                {project.desc && (
                  <p className="leading-relaxed">{project.desc}</p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-widest">
                  {project.href && (
                    <Link
                      href={project.href}
                      className="text-[#F7F7F7] underline underline-offset-4 hover:text-[#ff5800] transition-colors"
                    >
                      Case Study →
                    </Link>
                  )}
                  {project.externalHref && (
                    <a
                      href={project.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F7F7F7] underline underline-offset-4 hover:text-[#ff5800] transition-colors"
                    >
                      Visit Site →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const INITIAL_VISIBLE = 8;

const ProjectListAscii = ({ projects }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const hasHover = useHasHover();

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

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 100);
  };

  const showPreview =
    hasHover &&
    hoveredIndex !== null &&
    expandedId === null &&
    projects[hoveredIndex]?.image;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative"
    >
      <div className="flex flex-col">
        {projects.slice(0, INITIAL_VISIBLE).map((project, i) => (
          <Row
            key={`${project.title}-${i}`}
            project={project}
            i={i}
            isHovered={hoveredIndex === i}
            isExpanded={expandedId === i}
            onEnter={() => setHoveredIndex(i)}
            onToggle={() =>
              setExpandedId((cur) => (cur === i ? null : i))
            }
          />
        ))}
        <AnimatePresence initial={false}>
          {showAll &&
            projects.slice(INITIAL_VISIBLE).map((project, idx) => {
              const i = idx + INITIAL_VISIBLE;
              return (
                <motion.div
                  key={`${project.title}-${i}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <Row
                    project={project}
                    i={i}
                    isHovered={hoveredIndex === i}
                    isExpanded={expandedId === i}
                    onEnter={() => setHoveredIndex(i)}
                    onToggle={() =>
                      setExpandedId((cur) => (cur === i ? null : i))
                    }
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
        {projects.length > INITIAL_VISIBLE && (
          <button
            type="button"
            onClick={() => {
              setShowAll((s) => !s);
              setExpandedId(null);
            }}
            className="group w-full py-4 text-[10px] tracking-[0.25em] font-system uppercase text-gray-500 hover:text-[#ff5800] transition-colors border-b border-dashed border-gray-400 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gray-700 group-hover:bg-[#ff5800] transition-colors" />
            <span>
              {showAll
                ? "Collapse"
                : `Show ${projects.length - INITIAL_VISIBLE} more`}
            </span>
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              ↓
            </motion.span>
            <span className="h-px w-8 bg-gray-700 group-hover:bg-[#ff5800] transition-colors" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showPreview && projects[hoveredIndex!]?.image && (
          <motion.div
            key={`preview-${hoveredIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{ x: previewX, y: previewY }}
            className="fixed top-0 left-0 pointer-events-none z-50 w-[220px]"
          >
            <Image
              src={projects[hoveredIndex!].image!}
              alt=""
              placeholder="blur"
              sizes="220px"
              className="w-full h-auto rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectListAscii;
