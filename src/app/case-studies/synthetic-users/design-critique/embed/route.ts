import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import { SYNTHETIC_USERS_ARTIFACT_PATHS } from "@/lib/synthetic-users-artifacts";

export async function GET() {
  const html = readFileSync(SYNTHETIC_USERS_ARTIFACT_PATHS.designCritique, "utf8");
  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
