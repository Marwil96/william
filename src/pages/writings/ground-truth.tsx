import type { NextPage } from "next";
import Link from "next/link";
import Layout from "src/components/Layout";
import { ArticleHeader } from "src/components/ArticleHeader";

// ─── Inline figure (static evidence plate, same chrome as minicart) ──

const Stage = ({
  value,
  label,
  tone = "mid",
}: {
  value: string;
  label: string;
  tone?: "mid" | "dim" | "bright";
}) => {
  const color =
    tone === "bright"
      ? "text-[#F7F7F7]"
      : tone === "dim"
      ? "text-gray-600"
      : "text-gray-300";
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className={`font-mono text-4xl md:text-5xl tabular-nums ${color}`}
      >
        {value}
      </span>
      <span className="mt-3 text-[10px] font-inter uppercase tracking-[0.18em] text-gray-500 max-w-[130px] leading-[1.5]">
        {label}
      </span>
    </div>
  );
};

const Arrow = () => (
  <div className="flex items-center justify-center text-gray-600 text-lg">
    <span className="md:hidden">↓</span>
    <span className="hidden md:inline">→</span>
  </div>
);

const Figure = () => (
  <figure className="my-10 md:my-12">
    <figcaption className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 mb-3">
      Fig. 01 — The loop that caught the silent loss
    </figcaption>
    <div className="border-t border-b border-dashed border-gray-500 bg-[#0d0d0d] flex items-center justify-center p-6 md:p-10 min-h-[360px]">
      <div className="w-full max-w-[460px] flex flex-col gap-7 md:gap-4 md:flex-row md:items-start md:justify-between">
        <Stage value="533" label="In the Swedish source" tone="mid" />
        <Arrow />
        <Stage value="118" label="Survived the first migration" tone="dim" />
        <Arrow />
        <Stage value="1,063" label="Recovered across four markets" tone="bright" />
      </div>
    </div>
  </figure>
);

// ─── Article ──────────────────────────────────────────────────────

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] md:text-[18px] font-text text-gray-300 leading-[1.75] mb-6">
    {children}
  </p>
);

const Coda = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] md:text-[18px] font-text text-[#F7F7F7] leading-[1.55] mb-4">
    {children}
  </p>
);

const GroundTruth: NextPage = () => {
  return (
    <Layout
      title="The model was never the bottleneck — William Martinsson"
      desc="Building a four-market store with agents — and why the speed came from everything except the code."
      framerKey="writings-ground-truth"
      project
      className="w-full px-6 md:px-0 md:max-w-[640px] mx-auto"
    >
      <article className="flex flex-col mt-6 md:mt-12">
        <ArticleHeader
          category="Writing"
          monthYear="Jun 2026"
          title="The model was never the bottleneck"
          standfirst="Rebuilding a store with agents, and the part nobody points at: the machinery that let the work check itself."
          date="June 29, 2026"
          readTime="5 min read"
        />

        {/* ─── Essay body ─── */}

        <P>
          Building software with AI gets sold as a typing speedup. You
          describe what you want, a model writes the code, and the thing that
          used to take an afternoon takes a minute. The pitch is always about
          generation — how much faster the machine writes than a person does.
        </P>

        <P>
          That is the misunderstanding. Rebuilding Nelson Garden — a
          four-market store, around a thousand products and several hundred
          editorial pages, all of it lifted off a legacy CMS against a hard
          deadline — the writing of code was never the slow part. The slow
          part was knowing whether what got written was right, and remembering
          what right even meant across hundreds of separate sessions. A model
          that generates faster than anyone can read is not an asset on its
          own. It is a way to produce wrong work quickly.
        </P>

        <P>
          In 2012, Bret Victor gave a talk called{" "}
          <em>Inventing on Principle</em>. Its claim was that a creator needs
          an immediate connection to what they make — that the gap between
          doing something and seeing its effect is where bad work hides. He
          meant a person dragging a slider and watching a drawing respond. The
          claim is sharper for an agent, because an agent has no eyes. It
          cannot glance at a page and notice that an image is missing. Working
          blind is its resting state, and the entire job is to take that away.
        </P>

        <P>
          So the first thing built was not code. It was a fixed point to
          measure against. The old site ran on Episerver, and its public API
          had a shutoff date. Before that date, all four Nordic versions were
          crawled and their responses and images frozen to disk — a copy that
          would never move again. Everything afterwards was checked against
          that copy. The task stopped being{" "}
          <span className="italic">generate the new site</span> and became{" "}
          <span className="italic">make the new site agree with the frozen
          one</span>, which is a question a machine can actually answer.
        </P>

        <P>
          The frozen copy paid for itself within days. The converter that
          turned old article HTML into the new format silently dropped any
          image wrapped the wrong way — tucked inside a heading, buried in a
          div. On the Swedish site that was 533 images in the source and 118
          that survived. Someone reviewing the result would have scrolled
          through hundreds of articles full of pictures and seen nothing
          wrong, because a missing image leaves no hole. The loop saw it,
          because it was not reading the page — it was comparing the page to
          the snapshot.
        </P>

        <Figure />

        <P>
          Then it checked its own repair, diffing every document it had
          touched against a backup to confirm it had added the missing images
          and changed nothing else. The fix and the proof that the fix was
          safe were the same kind of operation.
        </P>

        <P>
          After that, the shape repeated. Every migrated page was diffed
          against the live sites and the gaps written to a report. A check on
          product labels queried the real dataset and failed loudly the
          instant a badge had no translation, rather than letting a Swedish
          word sit quietly on a Finnish card. None of these were clever. They
          were cheap — a script and a few seconds — and cheap is the entire
          point. An expensive check runs once, before launch. A cheap one runs
          every time, which keeps the work close to the last moment it was
          known to be correct.
        </P>

        <P>
          The same idea covered intent, not just data. The spec lived in
          Linear — a project the agent could reopen at the start of every
          session — rather than in a chat history that forgets itself. The
          crawl was the ground truth for the data; Linear was the ground truth
          for the intent. The move was identical both times: keep the source
          of truth outside the work, so the work always has something to be
          wrong against.
        </P>

        <P>
          What stands out, looking back, is the proportion: almost none of the
          time went into writing code, and almost all of it into building the
          things that could check it.
        </P>

        <Coda>
          I didn&apos;t move faster because the model wrote the code, but
          because almost nothing it wrote could stay wrong for long.
        </Coda>

        {/* ─── Footer ─── */}
        <div className="border-t border-dashed border-gray-400 mt-14 pt-6 pb-12 flex items-center justify-between text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/writings"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            ← All writings
          </Link>
          <Link
            href="/writings/minicart"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            Next — The cart is the conversation →
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default GroundTruth;
