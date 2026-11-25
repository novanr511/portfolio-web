import { redirect } from "next/navigation";

/**
 * The curation case study was retired. Older articles still link to this URL,
 * so it redirects to the first-hand essay that records the same decision.
 */
export default function RetiredCurationCaseStudy() {
  redirect("/articles/why-i-killed-966-articles");
}
