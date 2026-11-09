import Layout from "src/components/Layout";
import { PortalGallery, PortalVariant } from "src/components/oak-portal/PortalGallery";
import { createDogPlay } from "src/components/oak-portal/dogs";
import { oveShaders, rememberShader } from "src/components/oak-portal/shaders";

const remembering = () => createDogPlay({ remember: true });

const VARIANTS: PortalVariant[] = (
  [
    ...oveShaders,
    {
      id: "remember",
      title: "Remember",
      note: "Hold the portal. Everything falls away but Ove, then a line is written.",
      fragment: rememberShader("fetch", "May you forever run in the leaves."),
      createSimulation: remembering,
    },
    {
      id: "goodnight",
      title: "Goodnight",
      note: "Moonlight. Hold for a moment.",
      fragment: rememberShader("moonlight", "Goodnight, Ove."),
      createSimulation: remembering,
    },
    {
      id: "run-on",
      title: "Run on",
      note: "Hold for a moment.",
      fragment: rememberShader("fetch", "Run on, little one."),
      createSimulation: remembering,
    },
    {
      ...oveShaders[0],
      id: "inscription",
      title: "Inscription",
      note: "Handwritten, for comparison. Hold the portal for a moment.",
      inscription: { line: "May you forever run in the leaves." },
    },
  ] satisfies PortalVariant[]
).map((variant) => ({
  createSimulation: createDogPlay,
  ...variant,
  maxPixelRatio: 2,
}));

const OveVariants = () => (
  <Layout
    title="Ove — variants"
    desc="Ove and a poodle under an oak, drawn in glyphs."
    framerKey="ove-variants"
    className="lg:w-[655px] mx-auto"
  >
    <PortalGallery
      panel="Ove portal"
      intro="Ove and a friend under the oak. Tap to throw the ball. From four on, hold for a moment."
      variants={VARIANTS}
    />
  </Layout>
);

export default OveVariants;
