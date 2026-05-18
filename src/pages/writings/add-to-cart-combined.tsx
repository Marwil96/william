import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "motion/react";
import Layout from "src/components/Layout";
import { AddToCartDemo } from "src/components/AddToCartDemo";

// ─── Inline figure (same chrome as minicart-combined) ──────────

const Figure = ({
  n,
  caption,
  children,
}: {
  n: number;
  caption: string;
  children: React.ReactNode;
}) => (
  <figure className="my-10 md:my-12">
    <figcaption className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 mb-3">
      Fig. {String(n).padStart(2, "0")} — {caption}
    </figcaption>
    <div className="border-t border-b border-dashed border-gray-500 bg-[#0d0d0d] flex items-center justify-center p-6 md:p-10 min-h-[360px]">
      {children}
    </div>
  </figure>
);

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

const AddToCartCombined: NextPage = () => {
  return (
    <Layout
      title="An ordinary button, with extra rooms — William Martinsson"
      desc="On building UI scaffolding with AI, and what becomes possible inside the artifact when the room around it is cheap to build."
      framerKey="writings-add-to-cart-combined"
      project
      className="w-full px-6 md:px-0 md:max-w-[640px] mx-auto"
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
          An ordinary button, with extra rooms
        </motion.h1>

        <p className="text-sm font-inter text-gray-500 mt-3 mb-12">
          William Martinsson · May 17, 2026
        </p>

        {/* ─── Essay body ─── */}

        <P>
          Building a UI experiment used to involve a quiet tradeoff. You
          could spend time on the thing, or you could spend time on the
          scaffolding around the thing — the dev mode, the state inspector,
          the toggle that lets you freeze a moment and look at it. There
          was rarely budget for both. Most of us built the thing and
          shipped it.
        </P>

        <P>
          That was the constraint, not the truth. With AI in the loop, the
          scaffolding now costs almost nothing. The state inspector that
          used to take a Saturday afternoon takes the time it takes to
          describe what you want twice. Which means the constraint is gone,
          and the question becomes: what would you build if you could
          afford to build it twice — once for the user, once for yourself?
        </P>

        <P>
          In 2011, Bret Victor published an essay called{" "}
          <em>Up and Down the Ladder of Abstraction</em>. Its argument was
          that abstract systems become legible when you simultaneously
          visualize many of their specific cases. You do not understand a
          function by reading its definition. You understand it by laying
          out a hundred of its outputs next to each other and looking at
          all of them at once. Most software is built without that ladder,
          which is why so much of it surprises its makers.
        </P>

        <Figure n={1} caption="The button, with its rooms shown">
          <AddToCartDemo />
        </Figure>

        <P>
          The artifact above is what that idea looks like for an
          add-to-cart button. The button itself is the small thing on the
          page. Beneath it sits an <span className="font-mono text-gray-200">auto / manual</span> toggle.
          In auto mode, the button plays its own animation — you click, it
          loads, it confirms, it resets. In manual mode, the button stops
          moving and the inspector takes over. You can pin it into any of
          its three states — idle, loading, success — and study what is
          happening without it sliding past you.
        </P>

        <P>
          The inspector is the room the button lives in. The button itself
          is the same in either mode. What changes is whether the maker —
          me, you, the next person to touch this file — has the leverage
          to see what they are working on.
        </P>

        <P>
          This kind of scaffolding used to be expensive enough that the
          practical move was to skip it. You built the button, you clicked
          through the states a few times in a browser, you trusted that
          the production version would behave well enough. That trust was
          usually misplaced. Loading states existed but you saw them once.
          Success animations flickered past too fast to feel. The result
          was a UI that looked polished at a glance and turned out to be
          brittle the moment you used it.
        </P>

        <P>
          With the inspector, the brittle moments become unhideable. Force
          the button into <span className="font-mono text-gray-200">loading</span> and
          leave it there for an hour. The Braille spinner has to hold up
          under attention. Force it into{" "}
          <span className="font-mono text-gray-200">success</span> and stare
          at the check icon resolving — does the path draw at the right
          speed? Does the border solidify cleanly or does it flicker? A
          state that used to flash past for 200 milliseconds now has to
          survive being looked at.
        </P>

        <P>
          That changes what is worth doing inside the button. An ordinary
          add-to-cart button — the most-pressed and least-considered
          widget on the web — can absorb a marching-ants border borrowed
          from Photoshop, a label that scrambles through random glyphs and
          resolves left to right, a one-character Braille spinner that
          lives in the same row as the text. None of those touches exist
          because the button needs them. They exist because the inspector
          made it bearable to spend the time.
        </P>

        <P>
          That is the shift I keep coming back to. AI did not help me
          design a better button. It made the scaffolding around the
          button cheap enough that I could finally afford to design{" "}
          <em>any</em> button properly.
        </P>

        <Coda>
          An ordinary thing made extra is rarely the result of working
          harder on the thing.
        </Coda>

        <Coda>It is the result of building a better room around it.</Coda>

        {/* ─── Footer ─── */}
        <div className="border-t border-dashed border-gray-400 mt-14 pt-6 pb-12 flex items-center justify-between text-[11px] font-inter uppercase tracking-[0.15em] text-gray-500">
          <Link
            href="/writings/add-to-cart"
            className="hover:text-gray-200 transition-colors no-underline"
          >
            ← Original version
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

export default AddToCartCombined;
