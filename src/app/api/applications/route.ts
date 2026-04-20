import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const position = formData.get("position");
  const resumeFile = formData.get("resume");

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();

    let resumeId: number | undefined;

    if (resumeFile instanceof File && resumeFile.size > 0) {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await payload.create({
        collection: "resumes",
        data: {} as never,
        file: {
          data: buffer,
          mimetype: "application/pdf",
          name: resumeFile.name,
          size: buffer.length,
        },
      });
      resumeId = uploaded.id as number;
    }

    await payload.create({
      collection: "applications",
      data: {
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        position: (position ? String(position) : undefined) as
          | "cna" | "hha" | "rn" | "lpn" | "other" | undefined,
        resume: resumeId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("application submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
