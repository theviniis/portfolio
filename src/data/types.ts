export interface HeroData {
  greeting: string;
  name: string;
  location: string;
  descriptionPrefix: string;
  descriptionSuffix: string;
  cta: string;
  alt: string;
}

export interface AboutData {
  title: string;
  paragraphs: string[];
  cvLabel: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: { start: string; end: string };
  responsibilities: string[];
  skills: string[];
}

export interface ExperienceData {
  title: string;
  showMore: string;
  showLess: string;
  experiences: ExperienceItem[];
}

export interface SkillsData {
  title: string;
  description: string;
  list: string[];
}

export interface HeaderItem {
  url: string;
  name: string;
}

export interface HeaderData {
  items: HeaderItem[];
}

export interface ContactData {
  title: string;
  emailLabel: string;
  email: string;
  cvLabel: string;
  cvLink: string;
  sendButton: string;
  formFields: {
    name: string;
    subject: string;
    email: string;
    message: string;
  };
}

export interface SocialLinkItem {
  url: string;
  name: string;
  ariaLabel: string;
  iconName: string;
}
