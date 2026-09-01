import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { HamburgerButton } from "./ui/hamburger-button";

const Header = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const headerItems = t('header.items', { returnObjects: true }) as Array<{ url: string; name: string }>;
  const projects = t('projects.list', { returnObjects: true }) as unknown[];
  const hasProjects = projects.length > 0;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const filteredItems = hasProjects
    ? headerItems
    : headerItems.filter(({ url }) => url !== "#projects" && url !== "#projetos");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="wrapper py-6 sticky top-0 w-full z-50 bg-background/80 shadow-md ring-1 ring-border backdrop-blur-xl">
        <nav className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center">
            {filteredItems.map(({ name, url }) => (
              <Button
                key={name}
                asChild
                variant="link"
                className="text-md transition-all motion-reduce:transition-none"
              >
                <a href={url}>{name}</a>
              </Button>
            ))}
          </div>

          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </nav>
      </header>

      <div
        className={`
          fixed inset-0 z-40 bg-background/95 backdrop-blur-xl
          flex flex-col items-center justify-center gap-6 p-6 md:hidden
          transition-all duration-300 ease-in-out
          motion-reduce:transition-none
          ${
            isOpen
              ? "opacity-100 visible pointer-events-auto scale-100"
              : "opacity-0 invisible pointer-events-none scale-95"
          }
        `}
      >
        {filteredItems.map(({ name, url }) => (
          <Button
            key={name}
            asChild
            variant="link"
            className="text-2xl w-full"
            onClick={() => setIsOpen(false)}
            size="lg"
          >
            <a href={url}>{name}</a>
          </Button>
        ))}
      </div>
    </>
  );
};

export { Header };
