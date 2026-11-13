export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  links: { live?: string; source?: string };
};

/**
 * Projects are currently hidden — the section renders an elegant
 * "coming soon" state while the case studies are being prepared.
 *
 * To bring them back, add entries here. Entries with `featured: true`
 * appear in the "Highlighted work" section on the home page.
 *
 * Every consumer (home page, /projects, llms.txt) updates automatically.
 */
export const projects: Project[] = [];
