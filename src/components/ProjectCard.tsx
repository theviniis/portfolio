import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

type Project = {
  name: string;
  deployUrl: string;
  githubUrl: string;
  skills: string[];
  description?: string;
};

const ProjectCard = ({ name, deployUrl, githubUrl, skills, description }: Project) => {
  return (
    <div className="flex flex-col gap-4 min-w-0">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg border bg-muted">
        <iframe
          src={deployUrl}
          title={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full min-w-0 min-h-0 border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4>{name}</h4>
          <div className="flex items-center gap-3">
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live site`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} GitHub repository`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <li key={skill}>
              <Badge variant={index > 2 ? "outline" : "default"}>
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ProjectCard };
export type { Project };
