"use client";

import Link from "next/link";
import { Eye, ExternalLink, X } from "lucide-react";

type Props = {
  status: string | null | undefined;
  adminEditUrl: string;
};

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  published: "Published",
};

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-neutral-500",
  pending_review: "bg-amber-500",
  published: "bg-emerald-500",
};

export function PreviewBanner({ status, adminEditUrl }: Props) {
  const label = STATUS_LABEL[status ?? "draft"] ?? "Draft";
  const dot = STATUS_COLOR[status ?? "draft"] ?? "bg-neutral-500";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 py-2.5 bg-neutral-900 text-white text-sm shadow-lg">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-yellow-400 font-semibold">
          <Eye className="w-4 h-4" />
          Preview Mode
        </span>
        <span className="text-neutral-400">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <span className="text-neutral-300">{label}</span>
        </span>
        <span className="text-neutral-500 text-xs hidden sm:block">
          This post is not live yet. Changes in the admin will appear here.
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={adminEditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Edit in Admin
        </Link>
        <Link
          href="/api/preview/disable"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Exit Preview
        </Link>
      </div>
    </div>
  );
}
