import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET() {
  const dm = await draftMode();
  dm.disable();
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return NextResponse.redirect(`${base}/blog`);
}
