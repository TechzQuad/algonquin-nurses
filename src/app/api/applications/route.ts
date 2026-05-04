import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { sendApplicationConfirmation, sendApplicationNotification } from "@/lib/email";

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
  const applicationFile = formData.get("resume");

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();

    let applicationFormId: number | undefined;

    if (applicationFile instanceof File && applicationFile.size > 0) {
      const arrayBuffer = await applicationFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await payload.create({
        collection: "application-forms",
        overrideAccess: true,
        data: {} as never,
        file: {
          data: buffer,
          mimetype: "application/pdf",
          name: applicationFile.name,
          size: buffer.length,
        },
      });
      applicationFormId = uploaded.id as number;
    }

    await payload.create({
      collection: "applications",
      overrideAccess: true,
      data: {
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        position: (position ? String(position) : undefined) as
          | "cna" | "hha" | "rn" | "lpn" | "other" | undefined,
        applicationForm: applicationFormId,
      },
    });

    await Promise.all([
      sendApplicationConfirmation({
        email: String(email),
        firstName: String(firstName),
        lastName: String(lastName),
        phone: String(phone),
        position: position ? String(position) : undefined,
      }),
      sendApplicationNotification({
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phone: String(phone),
        position: position ? String(position) : undefined,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("application submission failed", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
