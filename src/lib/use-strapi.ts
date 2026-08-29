import { useState, useEffect } from "react";
import {
  getProfile,
  getSkills,
  getExperiences,
  getSocialLinks,
  type Profile,
  type Skill,
  type Experience,
  type SocialLink,
} from "./strapi";

interface UseStrapiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useStrapi<T>(
  fetcher: () => Promise<{ data: T }>
): UseStrapiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

export function useProfile() {
  return useStrapi<Profile>(getProfile);
}

export function useSkills() {
  return useStrapi<Skill[]>(getSkills);
}

export function useExperiences() {
  return useStrapi<Experience[]>(getExperiences);
}

export function useSocialLinks() {
  return useStrapi<SocialLink[]>(getSocialLinks);
}
