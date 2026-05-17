import Link from "next/link";
import Head from "next/head";

const Triangle = ({ size = 8 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 1.38)} viewBox="0 0 8 11" className="inline-block">
    <polygon points="4,2 7,9 1,9" fill="#3C2415" />
  </svg>
);

const Wordmark = () => (
  <div
    className="flex items-center"
    style={{
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: "0.02em",
      color: "#3C2415",
    }}
  >
    <span>NADER&nbsp;GA</span>
    <span className="inline-flex items-center" style={{ gap: 1, transform: "translateY(1px)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Triangle key={i} />
      ))}
    </span>
    <span>AS</span>
  </div>
);

const VariantRow = ({
  label,
  children,
  borderBottom = false,
}: {
  label: string;
  children: React.ReactNode;
  borderBottom?: boolean;
}) => (
  <div
    className="flex"
    style={{
      padding: "10px 0",
      borderTop: "1px solid #D6D1C8",
      borderBottom: borderBottom ? "1px solid #D6D1C8" : undefined,
    }}
  >
    <div style={{ width: 96 }}>{label}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const TowerThumb = () => (
  <div
    style={{
      width: 96,
      height: 120,
      background: "#E4DFD5",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 38,
        height: 80,
        background: "linear-gradient(180deg,#E7C77A 0%,#B07934 100%)",
      }}
    />
  </div>
);

const SoftThumb = () => (
  <div
    style={{
      width: 96,
      height: 120,
      background: "#EFEAE0",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 58,
        height: 82,
        background: "radial-gradient(circle at 50% 50%, #E6D7B9 0%, #BFB099 100%)",
      }}
    />
  </div>
);

const DarkThumb = () => (
  <div
    style={{
      width: 96,
      height: 120,
      background: "#3B2E20",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: 30,
        height: 60,
        background:
          "radial-gradient(ellipse at 50% 40%, #E5B96C 0%, #A56D2A 70%, #3B2E20 100%)",
      }}
    />
  </div>
);

const WarmThumb = () => (
  <div
    style={{
      width: 96,
      height: 120,
      background: "#D9D1C3",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 36,
        left: "50%",
        transform: "translateX(-50%)",
        width: 46,
        height: 48,
        background: "linear-gradient(180deg,#E7C77A 0%,#A56D2A 100%)",
      }}
    />
  </div>
);

export default function TestPDP() {
  return (
    <>
      <Head>
        <title>Tower Table – Nader Gammas</title>
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
        <div className="flex items-start justify-between w-full" style={{ fontSize: 12, paddingBottom: 80 }}>
          <div className="flex flex-col" style={{ gap: 2 }}>
            <div>For sales in North and South America, please contact</div>
            <a href="mailto:studio@studiotwentyseven.com" style={{ textDecoration: "underline" }}>
              studio@studiotwentyseven.com
            </a>
            <div style={{ paddingTop: 6 }}>For Europe and Asia</div>
            <a href="mailto:sales@nadergammas.com" style={{ textDecoration: "underline" }}>
              sales@nadergammas.com
            </a>
            <div>USA +1 6463344918</div>
            <div>UAE +971 971581541868</div>
          </div>
          <div className="flex items-center" style={{ gap: 40 }}>
            <Link href="/test-homepage">
              <Wordmark />
            </Link>
            <Link href="/test-plp" style={{ fontSize: 20 }}>
              Menu
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="flex w-full items-start" style={{ gap: 40 }}>
          {/* Left column */}
          <div className="flex flex-col" style={{ flex: "0 0 280px", gap: 36 }}>
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 56,
                lineHeight: 1,
                color: "#3C2415",
              }}
            >
              Tower Table
            </div>
            <button
              className="flex items-center"
              style={{ gap: 8, fontSize: 13, background: "transparent", border: 0, padding: 0, color: "#3C2415", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              <span>Spec Sheet</span>
              <svg width="10" height="6" viewBox="0 0 10 6">
                <polygon points="0,0 10,0 5,6" fill="#3C2415" />
              </svg>
            </button>
            <div className="flex flex-col" style={{ fontSize: 12 }}>
              <div style={{ paddingBottom: 8, fontWeight: 500 }}>Available Variants</div>
              <VariantRow label="Material">Brass</VariantRow>
              <VariantRow label="Finish">Various Brass Patinas</VariantRow>
              <VariantRow label="Lamping" borderBottom>
                <div className="flex" style={{ gap: 10 }}>
                  <span>120V</span>
                  <span>(2) E26 Base 4W G20 Bulb</span>
                </div>
                <div className="flex" style={{ gap: 10 }}>
                  <span>240V</span>
                  <span>(2) E27 Base 4W G20 Bulb</span>
                </div>
                <div>2700K Color Temperature</div>
                <div>Phase Dimming</div>
              </VariantRow>
            </div>
          </div>

          {/* Main Image */}
          <div
            style={{
              flex: 1,
              height: 1080,
              background: "#E4DFD5",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* hanging stem */}
            <div
              style={{
                position: "absolute",
                top: 60,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 40,
                background: "#3C2415",
              }}
            />
            {/* top faceted shade */}
            <div
              style={{
                position: "absolute",
                top: 100,
                left: "50%",
                transform: "translateX(-50%)",
                width: 240,
                height: 140,
                background:
                  "linear-gradient(180deg,#F2D594 0%,#E5B96C 50%,#A6712F 100%)",
                clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 240,
                left: "50%",
                transform: "translateX(-50%)",
                width: 300,
                height: 30,
                background: "#8A5A28",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 270,
                left: "50%",
                transform: "translateX(-50%)",
                width: 300,
                height: 200,
                background:
                  "linear-gradient(180deg,#E5B96C 0%,#B07934 50%,#E5B96C 100%)",
                clipPath: "polygon(0 0, 100% 0, 84% 100%, 16% 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 470,
                left: "50%",
                transform: "translateX(-50%)",
                width: 260,
                height: 18,
                background: "#8A5A28",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 488,
                left: "50%",
                transform: "translateX(-50%)",
                width: 260,
                height: 180,
                background:
                  "linear-gradient(180deg,#E5B96C 0%,#A56D2A 60%,#E5B96C 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 668,
                left: "50%",
                transform: "translateX(-50%)",
                width: 300,
                height: 40,
                background: "#C9BFAD",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 700,
                left: "50%",
                transform: "translateX(-50%)",
                width: 280,
                height: 240,
                background: "linear-gradient(180deg,#D9CFBE 0%,#B5A893 100%)",
                borderRadius: "8px 8px 0 0",
              }}
            />
          </div>

          {/* Thumbs */}
          <div className="flex flex-col" style={{ flex: "0 0 96px", gap: 12 }}>
            <TowerThumb />
            <SoftThumb />
            <DarkThumb />
            <WarmThumb />
          </div>
        </div>
      </main>
    </>
  );
}
