import { useMemo } from "react";
import { DialConfig, DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";
import { OakPortal } from "./OakPortal";
import { OakDiorama } from "./OakDiorama";
import { Inscription, InscriptionConfig } from "./Inscription";
import { Simulation } from "./interaction";

export type PortalVariant = {
  id: string;
  title: string;
  note: string;
  fragment?: string;
  createSimulation?: () => Simulation;
  maxPixelRatio?: number;
  inscription?: InscriptionConfig;
};

type PortalGalleryProps = {
  panel: string;
  intro: string;
  variants: PortalVariant[];
};

const dialConfig = (variants: PortalVariant[]) =>
  ({
    show: {
      type: "select",
      options: [
        { value: "all", label: "All" },
        ...variants.map((variant) => ({ value: variant.id, label: variant.title })),
      ],
    },
    wind: {
      strength: [0.7, 0, 1.6, 0.01],
      speed: [1, 0, 3, 0.01],
      gust: [0.6, 0, 1, 0.01],
    },
    interaction: {
      push: [1, 0, 2, 0.05],
      parallax: [1, 0, 2, 0.05],
    },
    portal: {
      height: [240, 120, 480, 1],
      frame: true,
      resolution: [1, 0.5, 2, 0.25],
      grain: [1, 0.5, 2.5, 0.05],
    },
  }) satisfies DialConfig;

export function PortalGallery({ panel, intro, variants }: PortalGalleryProps) {
  const config = useMemo(() => dialConfig(variants), [variants]);
  const dials = useDialKit(panel, config, {
    id: panel.toLowerCase().replace(/\s+/g, "-"),
    persist: true,
  });

  const settings = {
    wind: dials.wind.strength,
    speed: dials.wind.speed,
    gust: dials.wind.gust,
    push: dials.interaction.push,
    parallax: dials.interaction.parallax,
    grain: dials.portal.grain,
  };
  const portalStyle = { height: dials.portal.height };
  const shown = variants
    .map((variant, index) => ({ ...variant, index }))
    .filter((variant) => dials.show === "all" || variant.id === dials.show);

  return (
    <>
      <p className="text-xs font-text text-gray-500 mt-8 mb-10 md:mt-16 text-balance">
        {intro}
      </p>
      <div className="flex flex-col gap-14">
        {shown.map((variant) => {
          const label = `${variant.title}. ${variant.note}`;
          const portal = variant.fragment ? (
            <OakPortal
              fragment={variant.fragment}
              settings={settings}
              resolution={dials.portal.resolution}
              maxPixelRatio={variant.maxPixelRatio}
              createSimulation={variant.createSimulation}
              label={label}
              className="block w-full"
              style={portalStyle}
            />
          ) : (
            <OakDiorama
              settings={settings}
              resolution={dials.portal.resolution}
              label={label}
              className="w-full"
              style={portalStyle}
            />
          );
          return (
            <section key={variant.id}>
              <div className="flex items-baseline gap-3 pb-2 mb-3 border-b border-dashed border-gray-400">
                <span className="text-[10px] tracking-[0.25em] font-system uppercase text-gray-500 tabular-nums shrink-0">
                  {String(variant.index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base lg:text-lg font-title italic font-normal text-text leading-none shrink-0">
                  {variant.title}
                </h2>
                <p className="ml-auto text-xs font-text text-gray-500 text-right text-balance hidden sm:block">
                  {variant.note}
                </p>
              </div>
              <div className={dials.portal.frame ? "border border-dashed border-gray-400 p-1" : ""}>
                {variant.inscription ? (
                  <Inscription {...variant.inscription}>{portal}</Inscription>
                ) : (
                  portal
                )}
              </div>
            </section>
          );
        })}
      </div>
      <DialRoot position="bottom-right" theme="dark" />
    </>
  );
}
