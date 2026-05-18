import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "motion/react";
import Layout from "src/components/Layout";
import { AddToCartButton } from "src/components/AddToCartButton";

// ─── Reusable article blocks ──────────────────────────────────

const Section = ({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-dashed border-gray-400 pt-8 md:pt-10 mt-10 md:mt-14">
    {label && (
      <span className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 block mb-3">
        {label}
      </span>
    )}
    {title && (
      <h2 className="text-2xl md:text-3xl font-title italic font-light mb-6 leading-tight">
        {title}
      </h2>
    )}
    {children}
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-[17px] font-text text-gray-300 leading-[1.7] mb-5">
    {children}
  </p>
);

const Pull = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl font-title italic text-[#F7F7F7] leading-snug my-8 md:my-10 border-l border-dashed border-gray-500 pl-5 md:pl-6">
    {children}
  </p>
);

const Frame = ({
  label,
  forcedState,
  children,
}: {
  label: string;
  forcedState?: "idle" | "loading" | "success";
  children?: React.ReactNode;
}) => (
  <figure className="border border-dashed border-gray-400 bg-[#0d0d0d] my-8 md:my-10 overflow-hidden">
    <figcaption className="flex items-center justify-between px-3 py-2 border-b border-dashed border-gray-400">
      <span className="text-[10px] font-inter uppercase tracking-[0.15em] text-gray-500">
        Live preview
      </span>
      <span className="text-[10px] font-inter uppercase tracking-[0.15em] text-gray-500">
        {label}
      </span>
    </figcaption>
    <div className="flex flex-col items-center justify-center p-6 md:p-10 min-h-[160px] gap-5">
      {children ?? <AddToCartButton forcedState={forcedState ?? null} />}
    </div>
  </figure>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-[#0d0d0d] border border-dashed border-gray-400 p-4 md:p-5 my-6 overflow-x-auto text-[12px] md:text-[13px] leading-relaxed font-mono text-gray-300">
    <code>{children}</code>
  </pre>
);

// ─── Article ─────────────────────────────────────────────────

const AddToCartArticle: NextPage = () => {
  return (
    <Layout
      title="Notes on the add-to-cart button — William Martinsson"
      desc="A single button doing three jobs. How a morphing add-to-cart button stops being a button and starts being a conversation."
      framerKey="writings-add-to-cart"
      project
      className="w-full px-6 md:px-0 md:max-w-[680px] mx-auto"
    >
      <article className="flex flex-col mt-6 md:mt-12">
        {/* ─── Title block ─── */}
        <div className="mb-2">
          <Link
            href="/writings"
            className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 hover:text-gray-300 transition-colors no-underline"
          >
            ← Writings
          </Link>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-title font-thin italic leading-[1.05] mt-4 mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 90 }}
        >
          A button that answers back.
        </motion.h1>

        <div className="flex items-center gap-3 mt-4 mb-10 text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <span>Experiment 02</span>
          <span className="text-gray-700">·</span>
          <span>Add to Cart</span>
          <span className="text-gray-700">·</span>
          <span>~6 min read</span>
        </div>

        {/* ─── Lede ─── */}
        <P>
          Most add-to-cart buttons get replaced after a click. They show a
          toast somewhere else, or open a panel, or refresh the cart icon up
          in the navbar — and the button itself, the thing the user actually
          pressed, just sits there unchanged. The pointer is gone, the
          confirmation is somewhere offscreen, and the user has to assemble
          the story themselves: I pressed it, the toast popped, therefore it
          worked.
        </P>

        <P>
          That assembly is a small tax the interface charges the user for not
          paying attention to them. So I wanted to build a button where the
          confirmation happens in the place the user is already looking.
        </P>

        <Pull>
          A click is a question. The button is the part of the system that
          should answer it.
        </Pull>

        {/* ─── The thing ─── */}
        <Section label="The button" title="Three states, one place">
          <P>
            This button has three states — <em>idle</em>, <em>loading</em>,{" "}
            <em>success</em> — and they all live in the same 260×48 pixel
            slot. The label morphs. A spinner appears. A check draws. The
            border switches behavior. Nothing moves the layout, nothing pops
            up elsewhere on the page, and the cursor never has to chase a
            confirmation.
          </P>

          <Frame label="Click it" />

          <P>
            You can also step through each state manually:
          </P>

          <div className="grid grid-cols-3 gap-3 my-6">
            <Frame label="idle" forcedState="idle" />
            <Frame label="loading" forcedState="loading" />
            <Frame label="success" forcedState="success" />
          </div>

          <P>
            The interesting part isn&apos;t any single state. It&apos;s the
            transition between them, because that&apos;s where the button gets
            to perform the thing it claims to do.
          </P>
        </Section>

        {/* ─── Marching ants ─── */}
        <Section label="Detail 01" title="The marching ants border">
          <P>
            The border around the button is the loudest signal it has, and I
            wanted it to do real work. At rest, it sits still. On hover, it
            starts to march slowly. On <em>loading</em>, it marches three
            times faster. On <em>success</em>, it solidifies into a clean
            line and the marching stops. It&apos;s the same border the whole
            time — only the rhythm changes.
          </P>

          <P>
            The pattern is borrowed wholesale from Photoshop&apos;s &ldquo;marching
            ants&rdquo; selection — the dashed line that crawls around the edge of
            whatever you just selected. The reason I like it here is that
            it&apos;s already a piece of UI grammar that means{" "}
            <em>this thing is active and you are doing something to it</em>.
            Borrowing that meaning means the loading state doesn&apos;t have
            to teach the user anything new.
          </P>

          <Code>{`<svg className="absolute inset-0 pointer-events-none">
  <style>{\`@keyframes march { to { stroke-dashoffset: -28; } }\`}</style>
  <rect
    x="0.5" y="0.5"
    width="calc(100% - 1px)"
    height="calc(100% - 1px)"
    fill="none"
    stroke={state === "success" ? "#F7F7F7" : "#6b7280"}
    strokeDasharray={state === "success" ? "0 0" : "4 3"}
    style={{
      animation: shouldAnimate ? \`march \${duration} linear infinite\` : "none",
      transition: "stroke 0.5s, stroke-dasharray 0.5s",
    }}
  />
</svg>`}</Code>

          <P>
            It&apos;s one rect, one keyframe, and a couple of conditionals.
            What you get is a border that meaningfully reports the state of
            the system without ever needing a separate progress indicator.
          </P>

          <Pull>
            Reuse existing visual grammar before inventing your own. The user
            has already paid the tuition.
          </Pull>
        </Section>

        {/* ─── Scramble ─── */}
        <Section label="Detail 02" title="The label scrambles, on purpose">
          <P>
            The button has three labels: <em>Add to bag</em>, <em>Adding</em>,
            and <em>Added to bag</em>. The lazy thing to do is swap them with
            a fade or a slide. The lazy thing also makes the transition
            forgettable, which means the user has to read the new label cold
            to find out what changed.
          </P>

          <P>
            So instead, the label scrambles through random glyphs and
            resolves into the new word, left to right. It takes around half a
            second, which is long enough to register but short enough that it
            doesn&apos;t feel slow. The effect is small but specific: your
            eyes track the resolve, and by the time the new word lands,
            you&apos;ve already noticed the state changed.
          </P>

          <Code>{`function useScrambleText(target: string, trigger: number, speed = 30) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    let iteration = 0;
    const totalFrames = target.length * 3;

    const tick = () => {
      setDisplay(
        target.split("").map((char, i) => {
          if (char === " ") return " ";
          // Each character "locks in" once iteration passes it
          if (i < iteration / 3) return target[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join("")
      );
      iteration++;
      if (iteration <= totalFrames) setTimeout(tick, speed);
    };

    tick();
  }, [target, trigger, speed]);

  return display;
}`}</Code>

          <P>
            The trick is the per-character lock: as the iteration counter
            climbs, characters from the left freeze into their final value
            while characters on the right keep scrambling. The eye reads
            order out of the noise, which is exactly what good motion design
            should do — direct attention without spelling out the
            instructions.
          </P>

          <P>
            I also fire a scramble on hover, even before any click. It&apos;s
            a tiny acknowledgement that the user has touched the button — a
            way for the button to say &ldquo;I see you&rdquo; without doing anything
            irreversible yet. That kind of pre-click feedback is cheap, and
            it builds confidence that the system is listening.
          </P>
        </Section>

        {/* ─── The spinner ─── */}
        <Section label="Detail 03" title="Loading lives where the button does">
          <P>
            The loading indicator is a single-character Braille spinner that
            sits inside the same row as the label. It&apos;s monospace,
            it&apos;s exactly one character wide, and it doesn&apos;t shift
            anything around it.
          </P>

          <Code>{`const LOADING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function useAsciiSpinner(active: boolean, speed = 80) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) { setFrame(0); return; }
    const i = setInterval(() => setFrame((f) => (f + 1) % LOADING_FRAMES.length), speed);
    return () => clearInterval(i);
  }, [active, speed]);
  return LOADING_FRAMES[frame];
}`}</Code>

          <P>
            I could have used a spinning SVG. A spinning SVG is fine. But the
            rest of the button leans on monospace text — the scramble, the
            label, the tracking — and an ASCII spinner stays inside that
            language. It feels like part of the same object instead of an
            ornament glued on.
          </P>

          <Pull>
            Pick a material and stay in it. The button is text and dashes. So
            is its loading state.
          </Pull>
        </Section>

        {/* ─── Stepping back ─── */}
        <Section label="Stepping back" title="The button isn't the feature">
          <P>
            Add to cart is one of the most-pressed buttons in the entire e-com
            stack. It&apos;s also one of the most generic. The default version
            in every framework does the same thing: trigger a mutation,
            update some state somewhere else, hope the user finds the
            confirmation. The button itself is treated as plumbing.
          </P>

          <P>
            Treating it as plumbing is the misunderstanding. The button is
            the only piece of the system the user is actually looking at when
            they commit. Everything that happens after their click is a
            response to that commitment, and the most direct place to put
            that response is the button they just touched.
          </P>

          <P>
            None of the techniques here are new. Marching ants are from the
            90s. Scrambling text effects are older than the web. Braille
            spinners are from terminals. The work wasn&apos;t inventing any
            of them. The work was deciding that a button could carry that
            much, and then refusing to put the confirmation anywhere else.
          </P>

          <Pull>
            A button is a small place. That&apos;s exactly why it should do
            its own talking.
          </Pull>
        </Section>

        {/* ─── Footer ─── */}
        <div className="border-t border-dashed border-gray-400 mt-14 pt-6 pb-12 flex items-center justify-between text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/writings/minicart"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            ← Previous — Minicart
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

export default AddToCartArticle;
