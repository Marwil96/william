import Layout from "src/components/Layout";
import { PortalGallery, PortalVariant } from "src/components/oak-portal/PortalGallery";
import { oakShaders } from "src/components/oak-portal/shaders";

const VARIANTS: PortalVariant[] = [
  ...oakShaders,
  {
    id: "diorama",
    title: "Diorama",
    note: "Real 3D in three.js. Forty-five thousand blades, low-poly oaks, a late sun.",
  },
];

const OakVariants = () => (
  <Layout
    title="Oak portal — variants"
    desc="Five takes on oaks in a field, dancing with the wind."
    framerKey="oak-variants"
    className="lg:w-[655px] mx-auto"
  >
    <PortalGallery
      panel="Oak portal"
      intro="Move through a portal to stir the wind. Click to send a gust."
      variants={VARIANTS}
    />
  </Layout>
);

export default OakVariants;
