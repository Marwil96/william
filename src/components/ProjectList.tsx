import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

export type ProjectRow = {
  title: string;
  agency: string;
  year: string;
  desc?: string;
  href?: string;
  externalHref?: string;
  image?: StaticImageData;
};

type Props = {
  projects: ProjectRow[];
};

function useHasHover() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return hasHover;
}

const ProjectList = ({ projects }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const hasHover = useHasHover();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 400, damping: 40, mass: 0.4 });
  const previewY = useSpring(mouseY, { stiffness: 400, damping: 40, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 100);
  };

  const showPreview =
    hasHover &&
    hoveredIndex !== null &&
    expandedId === null &&
    projects[hoveredIndex]?.image;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative"
    >
      <div className="flex flex-col">
        {projects.map((project, i) => {
          const isExpanded = expandedId === i;
          const isHovered = hoveredIndex === i;
          const accent = isHovered || isExpanded;
          return (
            <div key={`${project.title}-${i}`} className="flex flex-col">
              <button
                type="button"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() =>
                  setExpandedId((current) => (current === i ? null : i))
                }
                aria-expanded={isExpanded}
                className="flex items-center justify-between py-3 border-b border-dashed font-system uppercase text-sm tracking-wide cursor-pointer transition-colors focus:outline-none w-full text-left"
                style={{ borderColor: accent ? "#ff5800" : "#9ca3af" }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className="tabular-nums shrink-0 transition-colors"
                    style={{ color: accent ? "#ff5800" : "#6b7280" }}
                  >
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="truncate">
                    <span
                      className="transition-colors"
                      style={{ color: accent ? "#ff5800" : "#F7F7F7" }}
                    >
                      {project.title}
                    </span>
                    <span
                      className="transition-colors"
                      style={{ color: accent ? "#ff5800aa" : "#6b7280" }}
                    >
                      {" "}{accent ? "→" : "@"} {project.agency}
                    </span>
                  </span>
                </div>
                <span
                  className="shrink-0 ml-4 transition-colors"
                  style={{ color: accent ? "#ff5800" : "#6b7280" }}
                >
                  {project.year}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-b border-dashed transition-colors"
                    style={{ borderColor: accent ? "#ff5800" : "#9ca3af" }}
                  >
                    <div className="py-4 flex flex-col sm:flex-row gap-4">
                      {project.image && (
                        <div className="sm:w-1/2 shrink-0">
                          <Image
                            src={project.image}
                            alt={project.title}
                            placeholder="blur"
                            sizes="(max-width: 640px) 100vw, 320px"
                            className="w-full h-auto rounded-sm"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-3 text-sm font-system text-[#F7F7F7]/80">
                        {project.desc && (
                          <p className="leading-relaxed">{project.desc}</p>
                        )}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-widest">
                          {project.href && (
                            <Link
                              href={project.href}
                              className="text-[#F7F7F7] underline underline-offset-4 hover:text-[#ff5800] transition-colors"
                            >
                              Case Study →
                            </Link>
                          )}
                          {project.externalHref && (
                            <a
                              href={project.externalHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#F7F7F7] underline underline-offset-4 hover:text-[#ff5800] transition-colors"
                            >
                              Visit Site →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showPreview && projects[hoveredIndex!]?.image && (
          <motion.div
            key={`preview-${hoveredIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              x: previewX,
              y: previewY,
            }}
            className="fixed top-0 left-0 pointer-events-none z-50 w-[220px]"
          >
            <Image
              src={projects[hoveredIndex!].image!}
              alt=""
              placeholder="blur"
              sizes="220px"
              className="w-full h-auto rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectList;
