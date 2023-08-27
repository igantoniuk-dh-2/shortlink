export interface CreateShortLinkResult {
  shortLink: string;
  id: string;
}

export interface DeleteShortLinkResult {
  id: string;
}

export interface ReadAllLinksResult {
  links: {
    shortLink: string;
    longLink: string;
    id: string;
    ID: string;
    createdAt: string;
    userId: string;
  }[];
}

export const cacheTtl = 1000 * 60 * 60 * 24 * 7;
