import type { NextPage } from "next";
import Link from "next/link";
import Layout from "src/components/Layout";
import { ArticleHeader } from "src/components/ArticleHeader";
import { CartItems } from "src/components/CartSummary";
import { MockedCartProvider } from "src/components/MockCartProvider";

// ─── Inline figure (quieter than v1's hero frame) ──────────────

const Figure = ({
  n,
  caption,
  step,
}: {
  n: number;
  caption: string;
  step: number;
}) => (
  <figure className="my-10 md:my-12">
    <figcaption className="text-[10px] font-inter uppercase tracking-[0.2em] text-gray-500 mb-3">
      Fig. {String(n).padStart(2, "0")} — {caption}
    </figcaption>
    <div className="border-t border-b border-dashed border-gray-500 bg-[#0d0d0d] flex items-center justify-center p-6 md:p-10 min-h-[360px]">
      <MockedCartProvider>
        <CartItems step={step} />
      </MockedCartProvider>
    </div>
  </figure>
);

// ─── Article ──────────────────────────────────────────────────

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

const MinicartCombined: NextPage = () => {
  return (
    <Layout
      title="The cart is the conversation — William Martinsson"
      desc="Three carts, one feature spec, three different positions on the moment a user commits."
      framerKey="writings-minicart"
      project
      className="w-full px-6 md:px-0 md:max-w-[640px] mx-auto"
    >
      <article className="flex flex-col mt-6 md:mt-12">
        <ArticleHeader
          category="Writing"
          monthYear="May 2026"
          title="The cart is the conversation"
          standfirst="Three versions of the same cart. They share a spec. They disagree about what to say."
          date="May 17, 2026"
          readTime="4 min read"
        />

        {/* ─── Essay body ─── */}

        <P>
          A cart on the web is usually built as a list of rows. Add something,
          the list grows. Remove something, the list shrinks. The mechanics
          are solved. The interaction stays flat.
        </P>

        <P>
          That is the misunderstanding. A cart is not a list. It is the
          place where a user is most uncertain about what they have just
          committed to, and the design of a cart is the design of that
          uncertainty. Treating it as state management produces a cart
          that records the user&apos;s decisions without acknowledging
          them.
        </P>

        <P>
          In 1982, an IBM researcher named Walter Doherty published a paper
          called <em>The Economic Value of Rapid Response Time</em>. Its
          central finding was that human productivity does not rise smoothly
          with system speed. It jumps, at a specific threshold of around
          400 milliseconds. Below that line, the user stops waiting and
          starts thinking. Above it, the system is something they talk to
          instead of using.
        </P>

        <P>
          Most carts on the web sit well above that line. The user clicks{" "}
          <span className="font-mono text-gray-200">+</span>, a request goes
          to the backend, the network answers, the number changes. Nothing
          is wrong with it. Nothing is right with it either. The cart is
          silent in the moment that matters. If you have ever clicked{" "}
          <span className="font-mono text-gray-200">+</span> twice because
          you were not sure the first click registered, you already know
          what is happening — the interface is asking the user to model the
          server.
        </P>

        <Figure n={1} caption="Silent — the baseline cart" step={0} />

        <P>
          A different version of the same cart admits the work. The stepper
          replaces its glyph with a spinner the moment it is pressed. The
          removed row slides out instead of vanishing. None of the latency
          has changed, but the cart is now in the conversation. It says
          &ldquo;I&apos;m working on it&rdquo; — slower on the wire, faster
          in the head.
        </P>

        <Figure n={2} caption="The cart admits the work" step={1} />

        <P>
          A third version commits before the server does. The quantity
          changes at the click, and the request leaves in the background.
          If it fails — almost never — the UI rolls back. The cart now says{" "}
          &ldquo;Done&rdquo; before it knows. This is the version where the
          user stops talking to a system and starts using a tool.
        </P>

        <Figure n={3} caption="The cart commits first" step={2} />

        <P>
          All three carts share the same feature spec. The data model does
          not move. The QA list is identical. What changes is whether the
          cart speaks up while the user is still in the moment.
        </P>

        <P>
          The optimistic cart is the only one of the three that crosses
          Doherty&apos;s line. It is also the only one that required the
          designer to decide what the cart would say before the server had
          answered. The other two are still well-built. They are simply
          not in the conversation.
        </P>

        <P>
          That is the part I keep coming back to. The cart is not a list of
          rows. It is the conversation around the rows.
        </P>

        <Coda>An interface that says nothing is not neutral.</Coda>

        <Coda>It is a position.</Coda>

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
            Next — Marching ants and scrambling text →
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default MinicartCombined;
