import { Button } from "./button";
import LinkedIn from "../../assets/linkedin.svg?react";

const LinkedInButton = () => {
  return (
    <Button variant="secondary" size="lg" asChild>
      <a
        href="https://www.linkedin.com/in/viniis/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn className="text-primary size-6.5" />
      </a>
    </Button>
  );
};
export { LinkedInButton };
