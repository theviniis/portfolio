import { cn } from "@lib/utils";
import type { ComponentProps } from "react";

const Section = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section className={cn("wrapper", className)} {...props}>
      <div className="grid md:grid-cols-[1fr_1fr] gap-8 py-8 lg:gap-16 lg:py-16">
        {children}
      </div>
    </section>
  );
};

export { Section };
