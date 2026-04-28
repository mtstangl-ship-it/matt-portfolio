import { redirect } from "next/navigation";

/** Canonical case slug is `synthetic`; this URL is the editorial / handoff path. */
export default function SyntheticUsersAliasPage() {
  redirect("/case-studies/synthetic");
}
