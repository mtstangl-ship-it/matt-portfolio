import { redirect } from "next/navigation";

/**
 * /case-studies has no landing page. The case picker inside each case
 * is the navigation between cases, and dropping readers on a list of
 * tiles made them decide before the site had shown them anything.
 *
 * Hitting the route lands directly on the first case (Centaur Practice).
 * Every other case remains deep-linkable via /case-studies/<slug>.
 */
export default function CaseStudiesIndexPage() {
  redirect("/case-studies/ai");
}
