import Link from "next/link";
import Head from "next/head";

const Triangle = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 1.33)} viewBox="0 0 18 24" className="inline-block">
    <polygon points="9,4 17,20 1,20" fill="#3C2415" />
  </svg>
);

const Wordmark = ({ size = 42 }: { size?: number }) => {
  const triSize = Math.round(size * 0.43);
  return (
    <div
      className="flex items-center"
      style={{
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "0.02em",
        color: "#3C2415",
      }}
    >
      <span>NADER&nbsp;GA</span>
      <span className="inline-flex items-center" style={{ gap: 1, transform: "translateY(2px)" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Triangle key={i} size={triSize} />
        ))}
      </span>
      <span>AS</span>
    </div>
  );
};

export default function TestHomepage() {
  return (
    <>
      <Head>
        <title>Nader Gammas</title>
      </Head>
      <style jsx global>{`
        body { background: #FFFFFF !important; }
        .ng-scope, .ng-scope * {
          color: inherit;
        }
      `}</style>
      <main
        className="ng-scope min-h-screen w-full"
        style={{
          backgroundColor: "#FFFFFF",
          color: "#3C2415",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          lineHeight: 1.45,
          padding: "24px 40px 40px 40px",
        }}
      >
        {/* Top Bar */}
        <div className="flex items-start justify-between w-full" style={{ paddingBottom: 120 }}>
          <div className="flex flex-col gap-2" style={{ maxWidth: 220 }}>
            <div style={{ lineHeight: 1.4 }}>
              Nader Gammas Lighting Design is a studio specializing in project-specific, customized
              lighting solutions.
            </div>
            <div style={{ color: "#B8B0A5", lineHeight: 1.4 }}>
              We embrace the philosophy of simplicity with maximum impact. Our approach is born of
              curiosity and questioning.
            </div>
          </div>
          <Link
            href="/test-plp"
            style={{ fontSize: 22, color: "#3C2415", letterSpacing: "-0.01em" }}
          >
            Menu
          </Link>
        </div>

        {/* Hero */}
        <div className="flex items-start justify-between" style={{ gap: 120, paddingTop: 120 }}>
          <div style={{ paddingTop: 40 }}>
            <Wordmark size={42} />
          </div>
          <Link
            href="/test-pdp"
            aria-label="Open product"
            style={{
              width: 520,
              height: 860,
              background: "linear-gradient(180deg, #E5D5C8 0%, #C9B9AC 50%, #E5D5C8 100%)",
              position: "relative",
              flexShrink: 0,
              cursor: "pointer",
              display: "block",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 40,
                background: "#2B1A0E",
              }}
            />
            {[170, 440, 710].map((top) => (
              <div
                key={top}
                style={{
                  position: "absolute",
                  top,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 110,
                  background:
                    "radial-gradient(ellipse at center, #F5B66A 0%, #D48A3A 60%, #7A4518 100%)",
                }}
              />
            ))}
          </Link>
        </div>

        {/* Featured List */}
        <div className="flex justify-end w-full" style={{ paddingTop: 100 }}>
          <div
            className="flex flex-col"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 64,
              lineHeight: 1.05,
              color: "#DDD6CC",
              gap: 4,
              width: 600,
            }}
          >
            <Link href="/test-pdp" className="hover:!text-[#3C2415] transition-colors">
              Vessels Vespa Floor
            </Link>
            <Link href="/test-pdp" className="hover:!text-[#3C2415] transition-colors">
              Shard P3
            </Link>
            <Link href="/test-pdp" style={{ color: "#3C2415" }}>
              Shingles Wide
            </Link>
            <Link href="/test-pdp" className="hover:!text-[#3C2415] transition-colors">
              Tower Table
            </Link>
            <Link href="/test-pdp" className="hover:!text-[#3C2415] transition-colors">
              Vessels Molly Pendant
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
