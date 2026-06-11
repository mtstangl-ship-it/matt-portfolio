import { redirect } from "next/navigation";

/** Legacy slug — redirects to Tier A canonical route. */
export default function SyntheticLegacyRedirectPage() {
  redirect("/case-studies/synthetic-users");
}
