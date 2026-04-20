import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Services } from "./collections/Services.ts";
import { Team } from "./collections/Team.ts";
import { Testimonials } from "./collections/Testimonials.ts";
import { Posts } from "./collections/Posts.ts";
import { ContactSubmissions } from "./collections/ContactSubmissions.ts";
import { Referrals } from "./collections/Referrals.ts";
import { Feedback } from "./collections/Feedback.ts";
import { Applications } from "./collections/Applications.ts";
import { Resumes } from "./collections/Resumes.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Team,
    Testimonials,
    Posts,
    ContactSubmissions,
    Referrals,
    Feedback,
    Applications,
    Resumes,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true, resumes: true } as Record<string, true>,
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  sharp,
});
