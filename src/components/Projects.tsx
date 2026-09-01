import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "./ui/Section";
import { Button } from "./ui/button";
import { ProjectCard, type Project } from "./ProjectCard";

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 0);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollPrev = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -scrollRef.current.clientWidth, behavior: "smooth" });
  }, []);

  const scrollNext = useCallback(() => {
    scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
  }, []);

  if (!projects.length) return null;

  return (
    <Section id={t("projects.id")}>
      <div>
        <h2>{t("projects.title")}</h2>
        <p className="text-muted-foreground mt-2">
          {t("projects.description")}
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {projects.map((project) => (
            <div key={project.name} className="min-w-0 flex-none w-full snap-start">
              <ProjectCard {...project} />
            </div>
          ))}
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
