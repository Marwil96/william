import Layout from "../components/Layout";
import dynamic from "next/dynamic";

const AsciiHero = dynamic(() => import("../components/AsciiHero"), {
  ssr: false,
});

export default function Test2() {
  return (
    <Layout title="ASCII Hero" desc="ASCII letter hero experiment" framerKey="test-2">
      <div className="flex items-center justify-center" style={{ minHeight: "80vh" }}>
        <AsciiHero />
      </div>
    </Layout>
  );
}
