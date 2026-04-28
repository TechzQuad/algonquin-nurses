"use client";

import { useState } from "react";

export default function BlogImportPanel() {
  const [tab, setTab] = useState<"gdocs" | "file">("gdocs");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function importGdocs() {
    if (!url.trim()) return setError("Please enter a Google Docs URL.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/import-gdocs", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      window.location.href = `/admin/collections/posts/${data.postId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
      setLoading(false);
    }
  }

  async function importFile() {
    if (!file) return setError("Please select a file.");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/blog/import-document", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      window.location.href = `/admin/collections/posts/${data.postId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
      setLoading(false);
    }
  }

  const btn = (active: boolean) => ({
    padding: "5px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer" as const,
    background: active ? "#0070f3" : "#e5e7eb",
    color: active ? "#fff" : "#374151",
    fontSize: "12px",
    fontWeight: "600" as const,
  });

  const input = {
    flex: 1,
    padding: "7px 10px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "13px",
    outline: "none",
  };

  const primaryBtn = {
    padding: "7px 16px",
    background: loading ? "#9ca3af" : "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: loading ? ("not-allowed" as const) : ("pointer" as const),
    fontSize: "13px",
    fontWeight: "600" as const,
    whiteSpace: "nowrap" as const,
  };

  return (
    <div
      style={{
        padding: "16px 18px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        marginBottom: "28px",
        background: "#f9fafb",
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "13px",
          fontWeight: "700",
          color: "#111827",
          letterSpacing: "0.01em",
        }}
      >
        ✦ AI Import — Generate SEO Blog from Document
      </p>

      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        <button style={btn(tab === "gdocs")} onClick={() => setTab("gdocs")}>
          Google Docs
        </button>
        <button style={btn(tab === "file")} onClick={() => setTab("file")}>
          Upload (.docx / .txt)
        </button>
      </div>

      {tab === "gdocs" ? (
        <div>
          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", lineHeight: 1.5 }}>
            Paste a Google Docs URL. The document must be shared as{" "}
            <strong>"Anyone with the link can view"</strong>. Claude AI will transform it into a
            fully SEO-optimized blog post and save it as a{" "}
            <strong>Draft</strong> for your review.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/..."
              style={input}
              disabled={loading}
            />
            <button onClick={importGdocs} disabled={loading} style={primaryBtn}>
              {loading ? "Generating…" : "Import & Generate"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", lineHeight: 1.5 }}>
            Upload a <strong>.docx</strong> or <strong>.txt</strong> file. Claude AI will
            transform it into a fully SEO-optimized blog post and save it as a{" "}
            <strong>Draft</strong> for your review.
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="file"
              accept=".docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ flex: 1, fontSize: "13px", color: "#374151" }}
              disabled={loading}
            />
            <button onClick={importFile} disabled={loading || !file} style={primaryBtn}>
              {loading ? "Generating…" : "Import & Generate"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#dc2626",
            background: "#fef2f2",
            padding: "6px 10px",
            borderRadius: "6px",
          }}
        >
          {error}
        </p>
      )}

      {loading && (
        <p style={{ marginTop: "10px", fontSize: "12px", color: "#6b7280", fontStyle: "italic" }}>
          Claude AI is analyzing the document and generating SEO content — this takes 15–30
          seconds. You will be redirected to the new draft when complete.
        </p>
      )}
    </div>
  );
}
