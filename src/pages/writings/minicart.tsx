import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "motion/react";
import Layout from "src/components/Layout";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";

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
  step,
}: {
  label: string;
  step: number;
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
    <div className="flex items-center justify-center p-6 md:p-10 min-h-[420px]">
      <MockedCartProvider>
        <CartItems step={step} />
      </MockedCartProvider>
    </div>
  </figure>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-[#0d0d0d] border border-dashed border-gray-400 p-4 md:p-5 my-6 overflow-x-auto text-[12px] md:text-[13px] leading-relaxed font-mono text-gray-300">
    <code>{children}</code>
  </pre>
);

// ─── Article ─────────────────────────────────────────────────

const MinicartArticle: NextPage = () => {
  return (
    <Layout
      title="Notes on building the minicart — William Martinsson"
      desc="Three iterations of a cart UI, and a working theory about why none of them are really about the cart."
      framerKey="writings-minicart"
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
          A cart is a list. A minicart is a feeling.
        </motion.h1>

        <div className="flex items-center gap-3 mt-4 mb-10 text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <span>Experiment 01</span>
          <span className="text-gray-700">·</span>
          <span>Minicart</span>
          <span className="text-gray-700">·</span>
          <span>~7 min read</span>
        </div>

        {/* ─── Lede ─── */}
        <P>
          Most carts on the web are still treated like a list of rows. A user
          adds a thing, the list grows. A user removes a thing, the list
          shrinks. The mechanics are solved. The interaction stays flat. I
          wanted to push on the idea that the cart isn&apos;t really about
          managing rows — it&apos;s about managing the small flicker of doubt
          that lives between &ldquo;I think I want this&rdquo; and &ldquo;I&apos;m about to pay
          for it.&rdquo;
        </P>

        <P>
          So I built three versions of the same cart. The data is identical.
          The features are identical. What changes is what the interface is
          willing to commit to.
        </P>

        <Pull>
          Output isn&apos;t the design. The cart is the design.
        </Pull>

        {/* ─── Iteration 1 ─── */}
        <Section label="Iteration 01" title="Classic — the baseline">
          <P>
            The first version is the version everyone has shipped at some
            point. You click <span className="font-mono text-gray-200">−</span> or{" "}
            <span className="font-mono text-gray-200">+</span>, a request goes
            to the backend, the network answers, the number changes. Remove
            the item, the row disappears. Nothing is wrong with it. Nothing is
            right with it either.
          </P>

          <P>
            The problem isn&apos;t that the cart is slow. The problem is that
            the cart is silent. The user clicks and then waits for a system
            they can&apos;t see to make up its mind. If you have ever caught
            yourself clicking <span className="font-mono text-gray-200">+</span> twice
            because you weren&apos;t sure if the first click registered, you
            already know exactly what this is.
          </P>

          <Frame label="01 — Classic" step={0} />

          <P>
            Watch the quantity stepper. The button click feels like nothing. The
            row removal happens with a hard cut. There&apos;s no acknowledgement
            of the request, no signal that anything is in motion, no
            sense of continuity from action to result. The interface is doing
            its job, but it isn&apos;t in the conversation.
          </P>
        </Section>

        {/* ─── Iteration 2 ─── */}
        <Section label="Iteration 02" title="Animated — the cart starts to talk">
          <P>
            The second version doesn&apos;t do anything new. It just stops
            pretending the network isn&apos;t there. When you press a stepper,
            the icon swaps for a small ASCII spinner. When you remove a row,
            the row slides out instead of vanishing. The work that was always
            happening becomes visible.
          </P>

          <Frame label="02 — Animated" step={1} />

          <P>
            Two specific moves carry this version. The first is the spinner
            inside the stepper button: it sits in the exact pixel slot where
            the <span className="font-mono text-gray-200">+</span> or{" "}
            <span className="font-mono text-gray-200">−</span> just was, so the
            eye never has to relocate. The second is a layout-aware slide-out
            on remove, which I get for free by wrapping the row in a{" "}
            <span className="font-mono text-gray-200">motion.div</span> with{" "}
            <span className="font-mono text-gray-200">layout</span> and an exit
            transform.
          </P>

          <Code>{`<motion.div
  layout
  exit={{
    x: "100%",
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
>
  {/* row */}
</motion.div>`}</Code>

          <P>
            That&apos;s the whole &ldquo;feature.&rdquo; The remaining rows close the
            gap on their own because <span className="font-mono text-gray-200">layout</span>{" "}
            measures them before and after and animates the delta. It&apos;s a
            small thing. It also single-handedly removes the worst part of
            iteration one, which was the cart feeling like a spreadsheet.
          </P>

          <Pull>
            The cart got slower in real time and faster in felt time.
          </Pull>

          <P>
            Nothing here makes the network shorter. The latency is identical.
            But by surfacing it, the cart stops being a black box and becomes
            a thing that is{" "}
            <em>working on your request</em>. That&apos;s the whole shift.
          </P>
        </Section>

        {/* ─── Iteration 3 ─── */}
        <Section label="Iteration 03" title="Optimistic — the cart commits first">
          <P>
            The third version stops waiting. The moment you click{" "}
            <span className="font-mono text-gray-200">+</span>, the number
            changes. The request goes out in the background and the UI gets
            on with its life. If the request fails, the UI rolls back. If it
            succeeds — which is almost always — the user never noticed there
            was a request at all.
          </P>

          <Frame label="03 — Optimistic" step={2} />

          <P>
            This one needs a little more code than the others, because you
            now have two states to keep in sync: the optimistic one the user
            sees, and the real one the server confirms. I keep the local
            version in component state and queue the backend writes so they
            apply in order:
          </P>

          <Code>{`const [internalQuantity, setQuantity] = useState(quantity);
const [updateQueue, setUpdateQueue] = useState<
  { line: string; newQuantity: number }[]
>([]);

const updateQuantityCallback = (line, type) => {
  const next = type === "increase"
    ? internalQuantity + 1
    : internalQuantity - 1;

  // 1. Commit to the UI immediately
  setQuantity(next);

  // 2. Push the actual write onto a queue
  setUpdateQueue((q) => [...q, { line, newQuantity: next }]);
};`}</Code>

          <P>
            The queue matters. If a user mashes the{" "}
            <span className="font-mono text-gray-200">+</span> button five
            times, you can&apos;t just fire five requests and pray. You drain
            them one at a time, in order, and if any one fails you snap the
            UI back to the last known-good value. The optimism only works if
            you have a believable plan for when the optimism turns out to be
            wrong.
          </P>

          <Pull>
            Optimistic UI is a promise the interface makes on the
            server&apos;s behalf. It needs an exit strategy.
          </Pull>
        </Section>

        {/* ─── Why this matters ─── */}
        <Section label="Stepping back" title="What actually changed">
          <P>
            All three of these carts do the same thing. They store items,
            change quantities, remove rows. The product manager sees the
            same feature list. The QA spec is the same. The data model
            doesn&apos;t move.
          </P>

          <P>
            What changes between iteration one and iteration three is what
            the cart is willing to <em>say</em>. The first cart says
            nothing. The second cart says &ldquo;I&apos;m working on it.&rdquo; The third
            cart says &ldquo;Done.&rdquo; That&apos;s the design decision. The animation,
            the layout transitions, the optimistic state — those are just
            the tools that make the cart capable of saying any of it.
          </P>

          <P>
            I keep coming back to this when I&apos;m reviewing flows: the
            output is rarely the thing that needs work. The output is fine.
            What needs work is the interface&apos;s willingness to participate
            in the moment the user is in. A button that knows it was just
            pressed. A row that knows it was just deleted. A cart that knows
            you&apos;re mid-thought and tries to keep up.
          </P>

          <Pull>
            The cart isn&apos;t the design. The conversation around the cart is.
          </Pull>
        </Section>

        {/* ─── Footer ─── */}
        <div className="border-t border-dashed border-gray-400 mt-14 pt-6 pb-12 flex items-center justify-between text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/writings"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            ← All writings
          </Link>
          <Link
            href="/writings/add-to-cart"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            Next — Add to Cart →
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default MinicartArticle;
