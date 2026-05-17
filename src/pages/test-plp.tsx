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

type Product = {
  slug: string;
  name: string;
  nameLines?: string[];
  dimensions: string[];
  leadTime: string;
  leadNote?: string;
  material: string;
  finish: string;
  finishNote?: string;
  lamping: { voltage: string; bulb: string }[];
  lampingExtra: string[];
  image: React.ReactNode;
};

const VespaImage = (
  <div
    style={{
      width: 360,
      height: 420,
      background: "linear-gradient(180deg,#EAE4DB 0%,#D9D2C8 100%)",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 160,
        height: 12,
        background: "#2A1F1A",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 72,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 80,
        background: "#2A1F1A",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 150,
        left: "50%",
        transform: "translateX(-50%)",
        width: 260,
        height: 220,
        background:
          "conic-gradient(from 0deg, #C46B56, #D88E3A, #E5C37C, #8A6EB8, #5F7CC4, #B84A7C, #C46B56)",
        borderRadius: "50%",
      }}
    />
  </div>
);

const TowerImage = (
  <div
    style={{
      width: 360,
      height: 420,
      background: "linear-gradient(180deg,#EAE4DB 0%,#D9D2C8 100%)",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 6,
        height: 20,
        background: "#3C2415",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 140,
        height: 340,
        background:
          "linear-gradient(180deg,#E7C77A 0%,#D5A24E 40%,#A56D2A 80%,#E7C77A 100%)",
      }}
    />
  </div>
);

const BubblesImage = (
  <div
    style={{
      width: 360,
      height: 420,
      background: "linear-gradient(180deg,#EAE4DB 0%,#D9D2C8 100%)",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 100,
        left: "50%",
        transform: "translateX(-50%)",
        width: 220,
        height: 4,
        background: "#3C2415",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 120,
        left: "50%",
        transform: "translateX(-50%)",
        width: 320,
        height: 180,
        background:
          "radial-gradient(ellipse at 30% 50%, #E5BFA0 0%, #B88560 40%, #6B4B30 100%)",
        borderRadius: "50%",
      }}
    />
  </div>
);

const products: Product[] = [
  {
    slug: "test-pdp",
    name: "Vessels Vespa Pendant – RGB",
    nameLines: ["Vessels Vespa", "Pendant – RGB"],
    dimensions: ["Ø 40 x H 40cm", 'Ø 16" x H 16"', "Stem to order", "Made-to-order sizes upon request."],
    leadTime: "6-8 weeks",
    leadNote: "Each ceramic vessel is handmade without a mould. Actual ceramic body may vary.",
    material: "Brass, Ceramic",
    finish: "Brass Patina, Glazed Ceramic",
    finishNote: "Glazing options available.",
    lamping: [{ voltage: "120-240V", bulb: "(28) 1W LED Bulbs" }],
    lampingExtra: ["2700K Color Temperature", "Dimming options available"],
    image: VespaImage,
  },
  {
    slug: "test-pdp",
    name: "Tower Table",
    dimensions: ['L 25 x W 25 x H 62 cm', 'L 10" x W 10" x H 24"', "Made to order.", "Custom sizes upon request."],
    leadTime: "8-10 weeks",
    leadNote: "A sculptural brass column of graduated brass shades stacked to form a column of light.",
    material: "Brass",
    finish: "Various Brass Patinas",
    finishNote: "Custom finishes by request.",
    lamping: [
      { voltage: "120V", bulb: "(2) E26 Base 4W G20 Bulb" },
      { voltage: "240V", bulb: "(2) E27 Base 4W G20 Bulb" },
    ],
    lampingExtra: ["2700K Color Temperature", "Phase Dimming"],
    image: TowerImage,
  },
  {
    slug: "test-pdp",
    name: "Bubbles Curved",
    dimensions: ["L 150 x W 30 x H 24 cm", 'L 59" x W 12" x H 9.5"', "Stem to order", "Made-to-order sizes upon request."],
    leadTime: "10 — 12 weeks",
    leadNote: "Each glass shade is slumped. Finish may exhibit unique surface characteristics.",
    material: "Brass, Blown Glass",
    finish: "Brass Patina, Clear Glass",
    finishNote: "Glass tints available.",
    lamping: [{ voltage: "120-240V", bulb: "(8) G9 LED Bulbs" }],
    lampingExtra: ["2700K Color Temperature", "Dimming options available"],
    image: BubblesImage,
  },
];

const SpecRow = ({
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
    <div style={{ width: 140 }}>{label}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const ProductRow = ({ product, last }: { product: Product; last: boolean }) => (
  <div
    className="flex w-full items-start"
    style={{
      gap: 40,
      padding: "32px 0 60px 0",
      borderBottom: last ? undefined : "1px solid #D6D1C8",
    }}
  >
    <Link href={`/${product.slug}`} className="block" style={{ flex: 1 }}>
      <div className="flex flex-col" style={{ gap: 24 }}>
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 52,
            lineHeight: 1.05,
            color: "#3C2415",
          }}
        >
          {product.nameLines
            ? product.nameLines.map((l, i) => (
                <div key={i}>{l}</div>
              ))
            : product.name}
        </div>
        <div className="flex flex-col" style={{ gap: 4, fontSize: 12, color: "#3C2415" }}>
          <div style={{ fontWeight: 500 }}>Dimensions</div>
          {product.dimensions.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
      </div>
    </Link>
    <Link href={`/${product.slug}`}>{product.image}</Link>
    <div className="flex flex-col" style={{ flex: "0 0 420px", fontSize: 12, color: "#3C2415" }}>
      <SpecRow label="Lead Time">
        {product.leadTime}
        {product.leadNote && <div style={{ paddingTop: 6 }}>{product.leadNote}</div>}
      </SpecRow>
      <SpecRow label="Material">{product.material}</SpecRow>
      <SpecRow label="Finish">
        {product.finish}
        {product.finishNote && <div>{product.finishNote}</div>}
      </SpecRow>
      <SpecRow label="Lamping" borderBottom>
        {product.lamping.map((l, i) => (
          <div key={i} className="flex" style={{ gap: 12 }}>
            <span>{l.voltage}</span>
            <span>{l.bulb}</span>
          </div>
        ))}
        {product.lampingExtra.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </SpecRow>
    </div>
  </div>
);

const filters = ["Everything", "Floor", "Furniture", "Suspended", "Table", "Wall"];

export default function TestPLP() {
  return (
    <>
      <Head>
        <title>Collection – Nader Gammas</title>
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
        <div className="flex items-start justify-between w-full" style={{ fontSize: 12, paddingBottom: 60 }}>
          <div className="flex" style={{ gap: 40 }}>
            <div className="flex flex-col" style={{ gap: 2 }}>
              <div>For sales in North and South America, please contact</div>
              <a href="mailto:studio@studiotwentyseven.com" style={{ textDecoration: "underline" }}>
                studio@studiotwentyseven.com
              </a>
            </div>
            <div className="flex flex-col" style={{ gap: 2 }}>
              <div>For Europe and Asia</div>
              <a href="mailto:sales@nadergammas.com" style={{ textDecoration: "underline" }}>
                sales@nadergammas.com
              </a>
              <div>USA +1 6463344918</div>
              <div>UAE +971 971581541868</div>
            </div>
          </div>
          <div className="flex items-center" style={{ gap: 40 }}>
            <Link href="/test-homepage">
              <Wordmark />
            </Link>
            <Link href="/test-homepage" style={{ fontSize: 20 }}>
              Menu
            </Link>
          </div>
        </div>

        {/* Filter Row */}
        <div
          className="flex items-center justify-center w-full"
          style={{ gap: 80, padding: "140px 0 160px 0", fontSize: 14 }}
        >
          {filters.map((f, i) => (
            <div key={f} className="flex items-center" style={{ gap: 14 }}>
              {i === 0 ? (
                <span className="inline-flex items-center" style={{ gap: 4 }}>
                  (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#3C2415",
                      display: "inline-block",
                    }}
                  />
                  )
                </span>
              ) : (
                <span>(&nbsp;&nbsp;)</span>
              )}
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center w-full"
          style={{
            gap: 6,
            paddingBottom: 12,
            borderBottom: "1px solid #3C2415",
          }}
        >
          <span>Index</span>
          <span style={{ color: "#B8B0A5" }}>/</span>
          <span style={{ color: "#B8B0A5" }}>Overview</span>
        </div>

        {/* Product rows */}
        {products.map((p, i) => (
          <ProductRow key={p.name} product={p} last={i === products.length - 1} />
        ))}
      </main>
    </>
  );
}
