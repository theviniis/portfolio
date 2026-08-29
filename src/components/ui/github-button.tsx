import { Button } from "./button";
import GitHub from "../../assets/github.svg?react";

const GitHubButton = () => {
  return (
    <Button variant="secondary" size="lg" asChild>
      <a
        href="https://github.com/theviniis/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub className="text-primary size-6.5" />
      </a>
    </Button>
  );
};
export { GitHubButton };
