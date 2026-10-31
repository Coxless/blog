import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EntryBody from "#/components/EntryBody";
import EntryCard from "#/components/EntryCard";
import EntryMeta from "#/components/EntryMeta";
import { getEntries, isKind, KINDS } from "#/lib/content";

type Props = { params: Promise<{ kind: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(KINDS).map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  return isKind(kind) ? { title: `${KINDS[kind].label} | Tech Blog` } : {};
}

export default async function KindPage({ params }: Props) {
  const { kind } = await params;
  if (!isKind(kind)) notFound();
  const entries = getEntries(kind);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">{KINDS[kind].label}</h2>
        <p className="text-muted-foreground">{KINDS[kind].description}</p>
      </div>
      {entries.length === 0 && <p className="text-muted-foreground">まだ投稿はありません</p>}
      <div className="grid gap-4">
        {entries.map((entry) =>
          // つぶやきは短いので、一覧に本文をそのまま出す
          kind === "notes" ? (
            <article key={entry.slug} className="border border-border rounded-lg p-6 bg-card space-y-4">
              {entry.title && <h3>{entry.title}</h3>}
              <EntryBody source={entry.body} />
              <EntryMeta entry={entry} />
              <Link href={`/notes/${entry.slug}`} className="text-muted-foreground text-sm">
                この投稿へのリンク
              </Link>
            </article>
          ) : (
            <EntryCard key={entry.slug} entry={entry} />
          ),
        )}
      </div>
    </div>
  );
}
