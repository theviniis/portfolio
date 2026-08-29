const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Profile {
  id: number;
  documentId: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  profileImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  cvFile?: {
    id: number;
    url: string;
    name: string;
  };
}

export interface Skill {
  id: number;
  documentId: string;
  name: string;
  category: "frontend" | "backend" | "ferramentas";
}

export interface Experience {
  id: number;
  documentId: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  skills: Skill[];
}

export interface SocialLink {
  id: number;
  documentId: string;
  platform: string;
  url: string;
}

async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}

export async function getProfile(): Promise<StrapiResponse<Profile>> {
  return fetchAPI<Profile>("/profile?populate=*");
}

export async function getSkills(): Promise<StrapiResponse<Skill[]>> {
  return fetchAPI<Skill[]>("/skills");
}

export async function getExperiences(): Promise<StrapiResponse<Experience[]>> {
  return fetchAPI<Experience[]>("/experiences?populate=skills");
}

export async function getSocialLinks(): Promise<StrapiResponse<SocialLink[]>> {
  return fetchAPI<SocialLink[]>("/social-links");
}
