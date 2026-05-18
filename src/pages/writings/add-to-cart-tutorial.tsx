import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "motion/react";
import Layout from "src/components/Layout";
import { AddToCartButton } from "src/components/AddToCartButton";

// ─── Mini demo: marching ants ─────────────────────────────────

const MarchingDemo = () => {
  const [mode, setMode] = useState<"stop" | "slow" | "fast">("slow");
  const duration = mode === "fast" ? "0.5s" : "1.5s";
  const shouldAnimate = mode !== "stop";

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-[240px] h-[80px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <style>{`@keyframes march-demo { to { stroke-dashoffset: -28; } }`}</style>
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            fill="none"
            stroke="#F7F7F7"
            strokeWidth="1"
            strokeDasharray="4 3"
            style={{
              animation: shouldAnimate
                ? `march-demo ${duration} linear infinite`
                : "none",
            }}
          />
        </svg>
        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-gray-400">
          {mode === "stop" ? "Idle" : mode === "slow" ? "Hover" : "Loading"}
        </span>
      </div>
      <div className="flex gap-2">
        {(["stop", "slow", "fast"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-[10px] font-inter uppercase tracking-[0.15em] border border-dashed cursor-pointer transition-colors ${
              mode === m
                ? "text-[#F7F7F7] border-gray-300 bg-[#1a1a1a]"
                : "text-gray-500 border-gray-600 hover:text-gray-300"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Mini demo: scramble ───────────────────────────────────────

const DEMO_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=-~<>[]{}|/\\";

const ScrambleDemo = () => {
  const targets = ["Add to bag", "Adding", "Added to bag"];
  const [idx, setIdx] = useState(0);
  const target = targets[idx];
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    const totalFrames = target.length * 3;
    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return target[i];
            return DEMO_GLYPHS[
              Math.floor(Math.random() * DEMO_GLYPHS.length)
            ];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = setTimeout(tick, 30);
      }
    };
    tick();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-[200px] text-center">
        <span className="font-mono text-base text-[#F7F7F7] tracking-wide">
          {display}
        </span>
      </div>
      <button
        onClick={() => setIdx((idx + 1) % targets.length)}
        className="px-3 py-1.5 text-[10px] font-inter uppercase tracking-[0.15em] border border-dashed border-gray-600 text-gray-400 hover:text-[#F7F7F7] cursor-pointer transition-colors"
      >
        Cycle label
      </button>
    </div>
  );
};

// ─── Article building blocks ──────────────────────────────────

const Figure = ({
  n,
  caption,
  children,
}: {
  n: number;
  caption: string;
  children: React.ReactNode;
}) => (
  <figure className="my-8 md:my-10">
    <figcaption className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 mb-3">
      Fig. {String(n).padStart(2, "0")} — {caption}
    </figcaption>
    <div className="border-t border-b border-dashed border-gray-500 bg-[#0d0d0d] flex items-center justify-center p-8 md:p-10 min-h-[260px]">
      {children}
    </div>
  </figure>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[16px] md:text-[17px] font-text text-gray-300 leading-[1.7] mb-5">
    {children}
  </p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-title italic font-light mt-16 mb-5 leading-tight">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-inter uppercase tracking-[0.2em] text-gray-500 mt-10 mb-3">
    {children}
  </h3>
);

const Code = ({
  lang = "tsx",
  children,
}: {
  lang?: string;
  children: React.ReactNode;
}) => (
  <div className="my-5">
    <div className="text-[9px] font-inter uppercase tracking-[0.2em] text-gray-600 mb-1">
      {lang}
    </div>
    <pre className="bg-[#0d0d0d] border border-dashed border-gray-500 p-4 md:p-5 overflow-x-auto text-[12px] md:text-[13px] leading-relaxed font-mono text-gray-300">
      <code>{children}</code>
    </pre>
  </div>
);

// ─── Article ──────────────────────────────────────────────────

const AddToCartTutorial: NextPage = () => {
  return (
    <Layout
      title="Marching ants and scrambling text — William Martinsson"
      desc="A step-by-step walkthrough of the two effects that carry the personality of the add-to-cart button."
      framerKey="writings-add-to-cart-tutorial"
      project
      className="w-full px-6 md:px-0 md:max-w-[680px] mx-auto"
    >
      <article className="flex flex-col mt-6 md:mt-12">
        <div className="mb-2">
          <Link
            href="/writings"
            className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 hover:text-gray-300 transition-colors no-underline"
          >
            ← Writings
          </Link>
        </div>

        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-title font-thin italic leading-[1.1] mt-4 mb-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 90 }}
        >
          Marching ants and scrambling text
        </motion.h1>

        <p className="text-sm font-inter text-gray-500 mt-3 mb-10">
          William Martinsson · May 17, 2026 · ~10 min build
        </p>

        {/* ─── Lede ─── */}

        <P>
          Two effects do almost all the work on the add-to-cart button on
          this site. The first is a dashed border that crawls around the
          edge while the system is busy. The second is a label that
          scrambles through random characters before resolving into the
          next word. Neither is technically new. Together they handle every
          state transition the button needs, without anything sliding into
          the page from somewhere else.
        </P>

        <Figure n={1} caption="The button you are about to build">
          <AddToCartButton />
        </Figure>

        <P>
          What follows is the two recipes, step by step, in the order I&apos;d
          build them if I were starting from scratch. The full
          implementation in this repo is in{" "}
          <span className="font-mono text-gray-200">
            src/components/AddToCartButton.tsx
          </span>
          .
        </P>

        {/* ─── Marching ants ─── */}

        <H2>Marching ants</H2>

        <P>
          The dashed line that crawls around a Photoshop selection is one
          of the oldest motion patterns in computer interfaces. It already
          means something: <em>this thing is active, and something is
          happening to it</em>. Borrowing it for a loading state means the
          user does not have to learn anything new. Most of the work is
          done before we write a line of code.
        </P>

        <P>
          Underneath the effect is one SVG rect, one CSS keyframe, and a
          handful of conditionals. We&apos;ll build it in three steps.
        </P>

        <H3>Step 1 — A dashed rect</H3>

        <P>
          Start with the bare element. An SVG rectangle, transparent fill,
          dashed stroke, positioned absolutely so it covers the button.
        </P>

        <Code>
          {`<svg className="absolute inset-0 w-full h-full pointer-events-none">
  <rect
    x="0.5"
    y="0.5"
    width="calc(100% - 1px)"
    height="calc(100% - 1px)"
    fill="none"
    stroke="#F7F7F7"
    strokeWidth="1"
    strokeDasharray="4 3"
  />
</svg>`}
        </Code>

        <P>
          The <span className="font-mono text-gray-200">0.5px</span> inset
          and <span className="font-mono text-gray-200">calc(100% - 1px)</span>{" "}
          sizing prevent the stroke from being clipped at the SVG edges.
          The <span className="font-mono text-gray-200">4 3</span> dash
          array sets the rhythm — four pixels of line, three pixels of gap.
          Different values produce different feels.
        </P>

        <H3>Step 2 — Make it march</H3>

        <P>
          Animate <span className="font-mono text-gray-200">stroke-dashoffset</span>.
          Shifting the offset slides the dash pattern along the path of
          the stroke, so the dashes appear to crawl.
        </P>

        <Code lang="css">{`@keyframes march {
  to { stroke-dashoffset: -28; }
}`}</Code>

        <Code>
          {`<rect
  /* ...same as before */
  style={{ animation: "march 1.5s linear infinite" }}
/>`}
        </Code>

        <P>
          The <span className="font-mono text-gray-200">-28</span> is the
          length of one full dash cycle. For a{" "}
          <span className="font-mono text-gray-200">4 3</span> array (total
          7px per repeat), <span className="font-mono text-gray-200">-28</span>{" "}
          is exactly four cycles, which produces a clean loop with no
          visible jump. Pick any multiple of the dash total.
        </P>

        <H3>Step 3 — React to state</H3>

        <P>
          The button has three states —{" "}
          <span className="font-mono text-gray-200">idle</span>,{" "}
          <span className="font-mono text-gray-200">loading</span>,{" "}
          <span className="font-mono text-gray-200">success</span> — and a
          hover boolean. The march responds to all of them. On idle, no
          animation. On hover, slow march. On loading, fast march (three
          times faster). On success, the dashes collapse into a solid
          line.
        </P>

        <Code>
          {`const dashArray = state === "success" ? "0 0" : "4 3";
const shouldAnimate = state === "loading" || hovered;
const duration = state === "loading" ? "0.5s" : "1.5s";
const strokeColor =
  state === "success" ? "#F7F7F7" :
  hovered             ? "#F7F7F7" :
                        "#6b7280";

return (
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    <style>{\`@keyframes march { to { stroke-dashoffset: -28; } }\`}</style>
    <rect
      x="0.5"
      y="0.5"
      width="calc(100% - 1px)"
      height="calc(100% - 1px)"
      fill="none"
      stroke={strokeColor}
      strokeWidth="1"
      strokeDasharray={dashArray}
      style={{
        animation: shouldAnimate
          ? \`march \${duration} linear infinite\`
          : "none",
        transition: "stroke 0.5s, stroke-dasharray 0.5s",
      }}
    />
  </svg>
);`}
        </Code>

        <P>
          The CSS{" "}
          <span className="font-mono text-gray-200">transition</span> on{" "}
          <span className="font-mono text-gray-200">stroke</span> and{" "}
          <span className="font-mono text-gray-200">strokeDasharray</span>{" "}
          is the small move that pulls the success state together.
          Without it, the border snaps from dashed to solid. With it, the
          dashes glide into a single line.
        </P>

        <Figure n={2} caption="Marching ants — toggle the speed">
          <MarchingDemo />
        </Figure>

        {/* ─── Scrambling text ─── */}

        <H2>Scrambling text</H2>

        <P>
          The label scrambles through random glyphs and resolves into the
          new word, left to right. It is the visual move from any 90s
          movie where someone is &ldquo;decrypting&rdquo; something.
          Lifted into a UI, it does one specific job: it draws the eye
          through the transition, so by the time the new label has landed
          the user has already noticed something changed.
        </P>

        <H3>Step 1 — The character pool</H3>

        <P>
          Any legible set of characters works. I use a mix of letters,
          digits, and symbols.
        </P>

        <Code lang="ts">
          {`const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789!@#$%&*+=-~<>[]{}|/\\\\";`}
        </Code>

        <P>
          If you are not using a monospace font, avoid characters whose
          width varies a lot (
          <span className="font-mono text-gray-200">i</span>,{" "}
          <span className="font-mono text-gray-200">l</span>,{" "}
          <span className="font-mono text-gray-200">1</span>,{" "}
          <span className="font-mono text-gray-200">.</span>) — they cause
          the label to jitter horizontally mid-scramble. Monospace dodges
          this entirely, which is why the button uses{" "}
          <span className="font-mono text-gray-200">font-mono</span> for
          the label.
        </P>

        <H3>Step 2 — The per-character lock</H3>

        <P>
          The trick that makes the effect read as &ldquo;decrypting&rdquo;
          rather than &ldquo;random noise&rdquo; is the lock. Characters
          from the left freeze into their final value first; characters on
          the right keep scrambling until their turn comes. The whole
          thing is one hook that returns a display string for a given
          target.
        </P>

        <Code lang="ts">
          {`function useScrambleText(target: string, trigger: number, speed = 30) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    const totalFrames = target.length * 3;

    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";              // skip spaces
            if (i < iteration / 3) return target[i];    // locked
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = setTimeout(tick, speed);
      }
    };

    tick();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [target, trigger, speed]);

  return display;
}`}
        </Code>

        <P>
          The <span className="font-mono text-gray-200">iteration / 3</span>{" "}
          ratio controls how quickly the lock progresses. With a 30ms{" "}
          <span className="font-mono text-gray-200">speed</span>, each
          character takes about 90ms to lock — a 10-character label
          resolves in roughly 900ms. Adjust speed and ratio to taste.
          Under 500ms feels snappy. Closer to a full second feels
          deliberate.
        </P>

        <H3>Step 3 — Re-running on state change</H3>

        <P>
          The hook re-runs whenever{" "}
          <span className="font-mono text-gray-200">target</span> changes,
          which covers the obvious case (the button&apos;s label switches
          from <em>Add to bag</em> to <em>Adding</em>). To re-trigger it
          without a target change — say, on hover — pass an extra trigger
          counter and bump it from the parent.
        </P>

        <Code lang="ts">
          {`const [trigger, setTrigger] = useState(0);

// usage
const display = useScrambleText(label, trigger);

// re-fire externally (on hover, focus, anything)
setTrigger((t) => t + 1);`}
        </Code>

        <P>
          In the button, the scramble also fires on hover, before any
          click. That tiny pre-click acknowledgement is half of what
          makes the button feel like it is paying attention.
        </P>

        <Figure n={3} caption="Scrambling text — cycle the label">
          <ScrambleDemo />
        </Figure>

        {/* ─── Bringing them together ─── */}

        <H2>In the button</H2>

        <P>
          The two effects sit on top of each other inside the same
          element. The marching border carries the system status — am I
          busy, am I done. The scrambled label carries the system message
          — what just changed. Both live in the same 260×48 pixel slot
          the user&apos;s cursor is already pointed at. Nothing pops up
          somewhere else.
        </P>

        <P>
          Combined, they look like this — same demo as the top of the
          page, with the recipes now visible underneath.
        </P>

        <Figure n={4} caption="The two effects, together">
          <AddToCartButton />
        </Figure>

        <P>
          Both effects are short. A few dozen lines each. The reason they
          punch above their weight is not the implementation — it is that
          they borrow meanings the user already has. Marching ants from
          Photoshop. Scrambling glyphs from terminals and movie tropes.
          The work was not in inventing them. The work was deciding that
          an ordinary button could carry them, and then putting them in
          the place the user was already looking.
        </P>

        <P>
          Take the code, change the dash array, change the glyph set,
          change the speeds. Both effects survive a lot of tuning before
          they stop working. Have fun.
        </P>

        {/* ─── Footer ─── */}
        <div className="border-t border-dashed border-gray-400 mt-14 pt-6 pb-12 flex items-center justify-between text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/writings/add-to-cart-combined"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            ← Essay version
          </Link>
          <Link
            href="/writings"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            All writings →
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default AddToCartTutorial;
