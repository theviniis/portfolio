import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, MouseLeft } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { SkillList } from "@/shared/components/SkillList";
import { useClickOutsideEscape } from "@/shared/hooks/useClickOutsideEscape";
import type { Project } from "./types";

const ProjectCard = ({
  name,
  deployUrl,
  githubUrl,
  skills,
  description,
}: Project) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);

  const handleOverlayClick = useCallback(() => setActive(true), []);

  useClickOutsideEscape({
    active,
    ignoreInside: "iframe",
    onDismiss: () => setActive(false),
  });

  return (
    <div className="flex flex-col gap-4 min-w-0">
      <div className="relative w-full aspect-3/4 md:aspect-video overflow-hidden rounded-lg border bg-muted">
        <iframe
          src={deployUrl}
          title={name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full min-w-0 min-h-0 border-0 ${active ? "pointer-events-auto" : "pointer-events-none"}`}
          sandbox="allow-scripts allow-same-origin"
        />
        {!active && (
          <button
            type="button"
            onClick={handleOverlayClick}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-background/60 transition-colors hover:bg-background/70 group"
            aria-label={`Activate ${name} preview`}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <MouseLeft className="h-6 w-6 animate-bounce motion-reduce:animate-none md:animate-none md:group-hover:animate-bounce" />
              <span className="text-xs font-medium">
                {t("projects.clickToInteract")}
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-h4">{name}</h3>
          <div className="flex items-center gap-2">
            <Button asChild size="icon" variant="outline">
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live site`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="icon" variant="outline">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub repository`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </Button>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <SkillList skills={skills} />
      </div>
    </div>
  );
};

export { ProjectCard };
