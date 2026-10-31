import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const KINDS = {
  products: { label: "プロダクト", description: "自分で作ったプロダクトの紹介です" },
  notes: { label: "つぶやき", description: "技術的なつぶやきです" },
  lab: { label: "ラボ", description: "WASMなどをブラウザ上で試す実験場です" },
} as const;

export type Kind = keyof typeof KINDS;

export type EntryLink = { label: string; url: string };

export type Entry = {
  kind: Kind;
  slug: string;
  /** つぶやきでは省略できる */
  title: string | null;
  date: string;
  summary: string;
  tags: string[];
  links: EntryLink[];
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function isKind(value: string): value is Kind {
  return Object.hasOwn(KINDS, value);
}

function excerpt(body: string, length = 80): string {
  const text = body
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*`>_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

function parseLinks(value: unknown, where: string): EntryLink[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${where}: links は配列で指定してください`);
  return value.map((link) => {
    if (typeof link?.label !== "string" || typeof link?.url !== "string") {
      throw new Error(`${where}: links の各要素には label と url が必要です`);
    }
    return { label: link.label, url: link.url };
  });
}

/** MDX ファイルの中身を検証して Entry にする。不正な場合は例外でビルドを止める。 */
export function parseEntry(kind: Kind, slug: string, raw: string): Entry {
  const where = `content/${kind}/${slug}.mdx`;
  const { data, content } = matter(raw);

  // YAML の日付は引用符なしだと Date になる
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${where}: date は YYYY-MM-DD で指定してください`);
  }

  const title = typeof data.title === "string" && data.title !== "" ? data.title : null;
  if (title === null && kind !== "notes") {
    throw new Error(`${where}: title は必須です`);
  }

  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    throw new Error(`${where}: tags は文字列の配列で指定してください`);
  }

  const body = content.trim();
  const summary = typeof data.summary === "string" ? data.summary : excerpt(body);

  return { kind, slug, title, date, summary, tags, links: parseLinks(data.links, where), body };
}

function sortByNewest(entries: Entry[]): Entry[] {
  return entries.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getEntries(kind: Kind): Entry[] {
  const dir = path.join(CONTENT_DIR, kind);
  const entries = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) =>
      parseEntry(kind, file.replace(/\.mdx$/, ""), fs.readFileSync(path.join(dir, file), "utf8")),
    );
  return sortByNewest(entries);
}

export function getEntry(kind: Kind, slug: string): Entry | undefined {
  return getEntries(kind).find((entry) => entry.slug === slug);
}

export function getAllEntries(): Entry[] {
  return sortByNewest((Object.keys(KINDS) as Kind[]).flatMap(getEntries));
}
