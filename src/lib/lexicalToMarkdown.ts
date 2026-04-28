// Converts Payload Lexical JSON to plain markdown string.
// Used to feed post content to Claude AI for enhancement.

type LexNode = {
  type?: string;
  text?: string;
  format?: number;
  tag?: string;
  url?: string;
  listType?: string;
  children?: LexNode[];
  value?: { id?: string | number; url?: string; alt?: string } | string | number;
  relationTo?: string;
  fields?: { url?: string; linkType?: string; newTab?: boolean };
};

function serializeInline(nodes: LexNode[] = []): string {
  return nodes
    .map((n) => {
      if (n.type === "text") {
        let t = n.text ?? "";
        const fmt = n.format ?? 0;
        if (fmt & 1) t = `**${t}**`;   // bold
        if (fmt & 2) t = `*${t}*`;    // italic
        if (fmt & 16) t = `\`${t}\``; // code
        return t;
      }
      if (n.type === "link" || n.type === "autolink") {
        const url = n.fields?.url ?? n.url ?? "#";
        const text = serializeInline(n.children);
        return `[${text}](${url})`;
      }
      if (n.type === "linebreak") return "\n";
      // Fall through for inline-level wrappers
      return serializeInline(n.children);
    })
    .join("");
}

function serializeNode(node: LexNode): string {
  switch (node.type) {
    case "heading": {
      const level = parseInt(node.tag?.replace("h", "") ?? "2", 10);
      const hashes = "#".repeat(Math.min(Math.max(level, 1), 6));
      return `${hashes} ${serializeInline(node.children)}\n\n`;
    }

    case "paragraph": {
      const text = serializeInline(node.children);
      return text.trim() ? `${text}\n\n` : "";
    }

    case "quote": {
      const inner = (node.children ?? [])
        .map(serializeNode)
        .join("")
        .replace(/\n+$/, "");
      return (
        inner
          .split("\n")
          .map((l) => `> ${l}`)
          .join("\n") + "\n\n"
      );
    }

    case "list": {
      const ordered = node.listType === "number";
      const items = (node.children ?? []).map((item, i) => {
        const content = (item.children ?? []).map(serializeNode).join("").replace(/\n+$/, "");
        const prefix = ordered ? `${i + 1}. ` : "- ";
        return `${prefix}${content}`;
      });
      return items.join("\n") + "\n\n";
    }

    case "horizontalrule":
      return "---\n\n";

    case "upload": {
      // Inline image reference — include alt if available
      const val = node.value as { alt?: string; url?: string } | undefined;
      const alt = val?.alt ?? "image";
      const url = val?.url ?? "";
      return url ? `![${alt}](${url})\n\n` : "";
    }

    case "link":
    case "autolink": {
      const url = node.fields?.url ?? node.url ?? "#";
      const text = serializeInline(node.children);
      return `[${text}](${url})`;
    }

    default:
      // Containers with children (e.g. root, unknown wrappers)
      return (node.children ?? []).map(serializeNode).join("");
  }
}

export function lexicalToMarkdown(lexical: unknown): string {
  const root = (lexical as { root?: LexNode })?.root;
  if (!root) return "";
  return serializeNode(root).trim();
}
