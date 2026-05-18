import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Layout from "../components/Layout";
import { projects } from "./index";

const ORANGE = "#ff5800";
const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=-~<>[]{}|/\\";

function useScrambleText(target: string, active: boolean, speed = 30) {
  const [display, setDisplay] = useState(target);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) {
      setDisplay(target);
      return;
    }
    let iteration = 0;
    const totalFrames = target.length * 3;
    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " " || char === "@") return char;
            if (i < iteration / 3) return target[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        timerRef.current = setTimeout(tick, speed);
      }
    };
    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [target, active, speed]);

  return display;
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

type Row = (typeof projects)[number];

// ────────────────────────────────────────────────────────────────
// Shared hover-image preview (lifted out so each variant can reuse)
// ────────────────────────────────────────────────────────────────
const HoverPreview = ({
  image,
  visible,
  x,
  y,
  withOrangeFrame = false,
}: {
  image?: StaticImageData;
  visible: boolean;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  withOrangeFrame?: boolean;
}) => (
  <AnimatePresence>
    {visible && image && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        style={{ x, y }}
        className="fixed top-0 left-0 pointer-events-none z-50 w-[220px]"
      >
        <div
          className={
            withOrangeFrame
              ? "p-1 bg-[#ff5800]"
              : ""
          }
        >
          <Image
            src={image}
            alt=""
            placeholder="blur"
            sizes="220px"
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ────────────────────────────────────────────────────────────────
// VARIANT A — Vertical year tag (90° rotated) on the left rail
// ────────────────────────────────────────────────────────────────
const VariantA = ({ rows }: { rows: Row[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hasHover = useHasHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.4 });

  return (
    <div
      className="relative pl-14"
      onMouseMove={(e) => {
        mx.set(e.clientX + 20);
        my.set(e.clientY - 100);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex flex-col">
        {rows.map((p, i) => (
          <button
            type="button"
            key={`${p.title}-${i}`}
            onMouseEnter={() => setHovered(i)}
            className="relative flex items-center justify-between py-3 border-b border-dashed border-gray-400 font-system uppercase text-sm tracking-wide cursor-pointer transition-colors hover:bg-white/[0.03] w-full text-left group"
          >
            <span className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-gray-500 text-[10px] tracking-[0.2em] font-title group-hover:text-[#F7F7F7] transition-colors">
              {p.year}
            </span>
            <span className="truncate">
              <span className="text-[#F7F7F7]">{p.title}</span>
              <span className="text-gray-500"> @ {p.agency}</span>
            </span>
            <span className="text-gray-500 shrink-0 ml-4 tabular-nums">
              {String(i + 1).padStart(3, "0")}
            </span>
          </button>
        ))}
      </div>
      <HoverPreview
        image={hovered != null ? rows[hovered]?.image : undefined}
        visible={hasHover && hovered != null}
        x={sx}
        y={sy}
      />
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT B — Orange accent on hover (no scramble, no rotated text)
// ────────────────────────────────────────────────────────────────
const VariantB = ({ rows }: { rows: Row[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hasHover = useHasHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.4 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        mx.set(e.clientX + 20);
        my.set(e.clientY - 100);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex flex-col">
        {rows.map((p, i) => {
          const isHovered = hovered === i;
          return (
            <button
              type="button"
              key={`${p.title}-${i}`}
              onMouseEnter={() => setHovered(i)}
              className="flex items-center justify-between py-3 border-b border-dashed border-gray-400 font-system uppercase text-sm tracking-wide cursor-pointer w-full text-left transition-colors"
              style={{
                color: isHovered ? ORANGE : undefined,
                borderColor: isHovered ? ORANGE : undefined,
              }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className="tabular-nums shrink-0"
                  style={{ color: isHovered ? ORANGE : "#6b7280" }}
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="truncate">
                  <span style={{ color: isHovered ? ORANGE : "#F7F7F7" }}>
                    {p.title}
                  </span>
                  <span style={{ color: isHovered ? "#ff5800aa" : "#6b7280" }}>
                    {" "}{isHovered ? "→" : "@"} {p.agency}
                  </span>
                </span>
              </div>
              <span
                className="shrink-0 ml-4"
                style={{ color: isHovered ? ORANGE : "#6b7280" }}
              >
                {p.year}
              </span>
            </button>
          );
        })}
      </div>
      <HoverPreview
        image={hovered != null ? rows[hovered]?.image : undefined}
        visible={hasHover && hovered != null}
        x={sx}
        y={sy}
        withOrangeFrame
      />
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT C — ASCII scramble title on hover
// ────────────────────────────────────────────────────────────────
const ScrambleRow = ({
  p,
  i,
  onEnter,
  active,
}: {
  p: Row;
  i: number;
  onEnter: () => void;
  active: boolean;
}) => {
  const titleDisplay = useScrambleText(p.title, active);
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      className="flex items-center justify-between py-3 border-b border-dashed border-gray-400 font-system uppercase text-sm tracking-wide cursor-pointer transition-colors hover:bg-white/[0.03] w-full text-left group"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-gray-500 tabular-nums shrink-0">
          {String(i + 1).padStart(3, "0")}
        </span>
        <span className="truncate">
          <span className="text-[#F7F7F7] font-mono">{titleDisplay}</span>
          <span className="text-gray-500"> @ {p.agency}</span>
        </span>
      </div>
      <span className="text-gray-500 shrink-0 ml-4">{p.year}</span>
    </button>
  );
};

const VariantC = ({ rows }: { rows: Row[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hasHover = useHasHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.4 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        mx.set(e.clientX + 20);
        my.set(e.clientY - 100);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex flex-col">
        {rows.map((p, i) => (
          <ScrambleRow
            key={`${p.title}-${i}`}
            p={p}
            i={i}
            active={hovered === i}
            onEnter={() => setHovered(i)}
          />
        ))}
      </div>
      <HoverPreview
        image={hovered != null ? rows[hovered]?.image : undefined}
        visible={hasHover && hovered != null}
        x={sx}
        y={sy}
      />
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// VARIANT D — All three combined: vertical agency tag + orange + scramble
// ────────────────────────────────────────────────────────────────
const ComboRow = ({
  p,
  i,
  onEnter,
  active,
}: {
  p: Row;
  i: number;
  onEnter: () => void;
  active: boolean;
}) => {
  const titleDisplay = useScrambleText(p.title, active);
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      className="relative flex items-center justify-between py-3 border-b border-dashed font-system uppercase text-sm tracking-wide cursor-pointer w-full text-left transition-colors"
      style={{ borderColor: active ? ORANGE : "#9ca3af" }}
    >
      <span
        className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.2em] font-title transition-colors"
        style={{ color: active ? ORANGE : "#6b7280" }}
      >
        {p.year}
      </span>
      <div className="flex items-center gap-4 min-w-0">
        <span
          className="tabular-nums shrink-0"
          style={{ color: active ? ORANGE : "#6b7280" }}
        >
          {String(i + 1).padStart(3, "0")}
        </span>
        <span
          className="truncate font-mono"
          style={{ color: active ? ORANGE : "#F7F7F7" }}
        >
          {titleDisplay}
        </span>
        <span style={{ color: active ? "#ff5800aa" : "#6b7280" }}>
          @ {p.agency}
        </span>
      </div>
    </button>
  );
};

const VariantD = ({ rows }: { rows: Row[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hasHover = useHasHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 400, damping: 40, mass: 0.4 });

  return (
    <div
      className="relative pl-14"
      onMouseMove={(e) => {
        mx.set(e.clientX + 20);
        my.set(e.clientY - 100);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex flex-col">
        {rows.map((p, i) => (
          <ComboRow
            key={`${p.title}-${i}`}
            p={p}
            i={i}
            active={hovered === i}
            onEnter={() => setHovered(i)}
          />
        ))}
      </div>
      <HoverPreview
        image={hovered != null ? rows[hovered]?.image : undefined}
        visible={hasHover && hovered != null}
        x={sx}
        y={sy}
        withOrangeFrame
      />
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

const ProjectListVariants = () => (
  <Layout
    title="Project List Variants - William Martinsson"
    desc="Variants of the project list with vertical text, orange accents, and ASCII scramble."
    framerKey="project-list-variants"
    className="lg:w-[760px] mx-auto"
  >
    <h1 className="text-2xl font-title italic mt-5 mb-2 md:mt-[120px] text-[#F7F7F7]">
      Project List — Variants
    </h1>
    <p className="text-sm font-system text-gray-500 mb-16 max-w-md">
      Four takes on the homepage projects list, exploring 90° rotated labels,
      the orange accent color, and ASCII text scramble on hover.
    </p>

    <VariantSection
      label="A"
      title="Vertical year tags"
      desc="The year rotates 90° onto the left rail. The 3-digit index moves right to balance."
    >
      <VariantA rows={projects} />
    </VariantSection>

    <VariantSection
      label="B"
      title="Orange accent on hover"
      desc="On hover the row turns orange — title, number, year, border — and the @ separator flips to →. Image preview gets an orange frame."
    >
      <VariantB rows={projects} />
    </VariantSection>

    <VariantSection
      label="C"
      title="ASCII scramble on hover"
      desc="The title scrambles characters and resolves into place, monospaced. Same mechanic as the add-to-cart button."
    >
      <VariantC rows={projects} />
    </VariantSection>

    <VariantSection
      label="D"
      title="Everything at once"
      desc="Vertical year tag on the left, orange accent on hover, ASCII scramble title, orange-framed preview. Maximal."
    >
      <VariantD rows={projects} />
    </VariantSection>
  </Layout>
);

export default ProjectListVariants;
