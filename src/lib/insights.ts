export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  body: string;
}

function parseMD(raw: string) {
  const parts = raw.split("---");
  if (parts.length < 3) return { frontmatter: {} as any, body: raw };
  const fmText = parts[1];
  const body = parts.slice(2).join("---").trim();
  const frontmatter: any = {};
  fmText.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      const key = line.substring(0, idx).trim();
      let val = line.substring(idx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      if (val.startsWith("'") && val.endsWith("'")) {
        val = val.substring(1, val.length - 1);
      }
      frontmatter[key] = val;
    }
  });
  return { frontmatter, body };
}

// Convert markdown to custom styled HTML
export function mdToHtml(md: string): string {
  if (!md) return "";

  // Convert Windows newlines to Unix
  let html = md.replace(/\r\n/g, "\n");

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-lg font-bold text-ink mt-6 mb-2">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-xl font-bold text-ink mt-8 mb-3">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-2xl font-bold text-ink mt-10 mb-4">$1</h2>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-6 rounded-xl max-w-full border border-hairline shadow-md mx-auto" />');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[var(--orange)] hover:underline font-semibold" target="_blank" rel="noopener noreferrer">$1</a>');

  // Parse Lists (State Machine)
  const lines = html.split("\n");
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Bullet list item
    if (/^[\-\*]\s+(.*)$/.test(trimmed)) {
      const content = trimmed.replace(/^[\-\*]\s+/, "");
      let prefix = "";
      if (!inList || listType !== "ul") {
        prefix = inList
          ? `</${listType}><ul class="list-disc pl-6 my-4 space-y-2 text-ink-soft">`
          : '<ul class="list-disc pl-6 my-4 space-y-2 text-ink-soft">';
        inList = true;
        listType = "ul";
      }
      return `${prefix}<li>${content}</li>`;
    }

    // Numbered list item
    if (/^\d+\.\s+(.*)$/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, "");
      let prefix = "";
      if (!inList || listType !== "ol") {
        prefix = inList
          ? `</${listType}><ol class="list-decimal pl-6 my-4 space-y-2 text-ink-soft">`
          : '<ol class="list-decimal pl-6 my-4 space-y-2 text-ink-soft">';
        inList = true;
        listType = "ol";
      }
      return `${prefix}<li>${content}</li>`;
    }

    // Close open list on empty line or text line
    if (inList && trimmed === "") {
      inList = false;
      const suffix = `</${listType}>`;
      listType = null;
      return suffix;
    }

    if (inList && !/^[\-\*]\s+/.test(trimmed) && !/^\d+\.\s+/.test(trimmed)) {
      inList = false;
      const suffix = `</${listType}>`;
      listType = null;
      return `${suffix}\n${line}`;
    }

    return line;
  });

  if (inList && listType) {
    processedLines.push(`</${listType}>`);
  }

  html = processedLines.join("\n");

  // Paragraph blocks
  const blocks = html.split(/\n{2,}/);
  const parsedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    if (/^<(h2|h3|h4|ul|ol|img|li)/i.test(trimmed)) {
      return trimmed;
    }
    return `<p class="my-4 text-base leading-relaxed text-ink-soft">${trimmed.replace(/\n/g, "<br />")}</p>`;
  });

  return parsedBlocks.filter((b) => b !== "").join("\n");
}

// Dynamically load all blog posts from src/content/insights
const modules = import.meta.glob("/src/content/insights/*.md", {
  eager: true,
  query: "?raw",
}) as Record<string, { default: string }>;

export const posts: Post[] = Object.entries(modules)
  .map(([filepath, module]) => {
    const rawContent = module.default;
    const slug = filepath.split("/").pop()?.replace(".md", "") || "";
    const { frontmatter, body } = parseMD(rawContent);
    return {
      slug,
      title: frontmatter.title || "",
      date: frontmatter.date || "",
      excerpt: frontmatter.excerpt || "",
      image: frontmatter.image || undefined,
      body,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
