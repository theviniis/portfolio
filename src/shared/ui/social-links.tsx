import { useTranslation } from "react-i18next";
import { ButtonGroup } from "./button-group";
import { SocialLinkButton } from "./social-link-button";
import type { SocialLinkItem } from "@/shared/types";

const SocialLinks = () => {
  const { t } = useTranslation();
  const links = t("links", { returnObjects: true }) as SocialLinkItem[];

  return (
    <ButtonGroup>
      {links.map((link) => (
        <SocialLinkButton key={link.iconName} {...link} />
      ))}
    </ButtonGroup>
  );
};

export { SocialLinks };
