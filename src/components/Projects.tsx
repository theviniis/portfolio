import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ProjectCard, type Project } from "./ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onEmblaSelect = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    emblaApi.on("reInit", onEmblaSelect);
    emblaApi.on("select", onEmblaSelect);
    return () => {
      emblaApi.off("reInit", onEmblaSelect);
      emblaApi.off("select", onEmblaSelect);
    };
  }, [emblaApi, onEmblaSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!projects.length) return null;

  return (
    <Section id={t("projects.id")}>
      <div>
        <h2>{t("projects.title")}</h2>
        <p className="text-muted-foreground mt-2">
          {t("projects.description")}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {projects.map((project) => (
              <div key={project.name} className="min-w-0 flex-none w-full">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
};

export { Projects };
