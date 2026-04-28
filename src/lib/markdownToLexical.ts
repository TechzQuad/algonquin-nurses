// Converts a markdown string to the Payload Lexical JSON format.
// Handles: paragraphs, h1–h6, bold, italic, bold+italic, inline code,
// bullet lists, ordered lists, blockquotes, horizontal rules,
// inline links [text](url), and [IMAGE:mediaId] upload markers.

type TextNode = {
  type: "text";
  text: string;
  format: number;
  style: string;
  mode: "normal";
  detail: number;
  version: 1;
};

type LinkNode = {
  type: "link";
  version: 1;
  format: string;
  indent: number;
  fields: { url: string; linkType: "custom"; newTab: boolean };
  children: TextNode[];
};

type LexicalChild = Record<string, unknown>;

type LexicalNode = {
  type: string;
  version: 1;
  [key: string]: unknown;
};

type RootNode = {
  type: "root";
  version: 1;
  format: string;
  indent: number;
  direction: "ltr" | "rtl" | null;
  children: LexicalNode[];
};

function textNode(text: string, format = 0): TextNode {
  return { type: "text", text, format, style: "", mode: "normal", detail: 0, version: 1 };
}

function linkNode(url: string, children: TextNode[]): LinkNode {
  return {
    type: "link",
    version: 1,
    format: "",
    indent: 0,
    fields: { url, linkType: "custom", newTab: false },
    children,
  };
}

// Parses inline markdown including links and formatting
function parseInline(raw: string): (TextNode | LinkNode)[] {
  const nodes: (TextNode | LinkNode)[] = [];
  // Match: links [text](url), ***b+i***, **bold**, *italic*, `code`
  const re =
    /(\[([^\]]+)\]\(([^)]+)\)|\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) nodes.push(textNode(raw.slice(last, m.index)));
    const seg = m[0];

    if (seg.startsWith("[") && m[2] && m[3]) {
      // Markdown link
      const innerText = m[2];
      const url = m[3];
      nodes.push(linkNode(url, [textNode(innerText)]));
    } else if (seg.startsWith("***")) {
      nodes.push(textNode(seg.slice(3, -3), 3)); // bold+italic
    } else if (seg.startsWith("**")) {
      nodes.push(textNode(seg.slice(2, -2), 1)); // bold
    } else if (seg.startsWith("*")) {
      nodes.push(textNode(seg.slice(1, -1), 2)); // italic
    } else if (seg.startsWith("`")) {
      nodes.push(textNode(seg.slice(1, -1), 16)); // code
    }
    last = m.index + seg.length;
  }

  if (last < raw.length) nodes.push(textNode(raw.slice(last)));
  return nodes.filter((n) => n.type !== "text" || (n as TextNode).text.length > 0);
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: "",
    children: parseInline(text) as unknown as LexicalChild[],
  };
}

function headingNode(tag: string, text: string): LexicalNode {
  return {
    type: "heading",
    tag,
    format: "",
    indent: 0,
    version: 1,
    children: parseInline(text) as unknown as LexicalChild[],
  };
}

function listNode(items: string[], ordered: boolean): LexicalNode {
  return {
    type: "list",
    listType: ordered ? "number" : "bullet",
    start: 1,
    tag: ordered ? "ol" : "ul",
    format: "",
    indent: 0,
    version: 1,
    children: items.map((item, i) => ({
      type: "listitem",
      value: i + 1,
      format: "",
      indent: 0,
      version: 1,
      children: parseInline(item) as unknown as LexicalChild[],
    })),
  };
}

function quoteNode(text: string): LexicalNode {
  return {
    type: "quote",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: "",
        children: parseInline(text) as unknown as LexicalChild[],
      },
    ],
  };
}

function uploadNode(mediaId: string): LexicalNode {
  return {
    type: "upload",
    version: 1,
    format: "",
    relationTo: "media",
    value: { id: mediaId },
  };
}

export function markdownToLexical(markdown: string): { root: RootNode } {
  const lines = markdown.split("\n");
  const children: LexicalNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // [IMAGE:mediaId] marker — insert upload node
    const imgMatch = line.trim().match(/^\[IMAGE:([^\]]+)\]$/);
    if (imgMatch) {
      children.push(uploadNode(imgMatch[1].trim()));
      i++;
      continue;
    }

    // Heading
    const hm = line.match(/^(#{1,6})\s+(.*)/);
    if (hm) {
      const tag = `h${Math.min(hm[1].length, 6)}`;
      children.push(headingNode(tag, hm[2].trim()));
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      children.push(quoteNode(line.slice(2)));
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(line.trim())) {
      children.push({ type: "horizontalrule", version: 1 });
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s+/, "").trim());
        i++;
      }
      children.push(listNode(items, false));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      children.push(listNode(items, true));
      continue;
    }

    // Paragraph — collect contiguous non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].match(/^#{1,6}\s/) &&
      !lines[i].startsWith("> ") &&
      !/^[-*+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^[-*_]{3,}$/.test(lines[i].trim()) &&
      !lines[i].trim().match(/^\[IMAGE:[^\]]+\]$/)
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length > 0) {
      children.push(paragraphNode(para.join(" ")));
    }
  }

  if (children.length === 0) {
    children.push(paragraphNode(""));
  }

  return {
    root: { type: "root", format: "", indent: 0, version: 1, direction: null, children },
  };
}

// Extract headings from Lexical JSON for Table of Contents
export type TocEntry = { tag: string; text: string; id: string };

export function extractHeadings(lexical: unknown): TocEntry[] {
  const root = (lexical as { root?: { children?: unknown[] } })?.root;
  if (!root?.children) return [];

  return root.children
    .filter((node) => {
      const n = node as { type?: string; tag?: string };
      return n.type === "heading" && ["h2", "h3"].includes(n.tag ?? "");
    })
    .map((node) => {
      const n = node as { tag: string; children?: { text?: string }[] };
      const text = (n.children ?? []).map((c) => c.text ?? "").join("");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return { tag: n.tag, text, id };
    })
    .filter((h) => h.text.length > 0);
}
