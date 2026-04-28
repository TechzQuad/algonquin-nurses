import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const token = searchParams.get("token");

  if (!slug) {
    return new NextResponse("Missing slug", { status: 400 });
  }

  if (!token) {
    return new NextResponse("Missing token", { status: 401 });
  }

  // Validate the Payload JWT — only logged-in admins can preview
  let isValid = false;
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    });
    isValid = Boolean(user);
  } catch {
    isValid = false;
  }

  if (!isValid) {
    return new NextResponse("Unauthorized — please log in to the admin to preview.", {
      status: 401,
    });
  }

  const dm = await draftMode();
  dm.enable();

  const base = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000`;
  return NextResponse.redirect(`${base}/blog/${slug}`);
}
