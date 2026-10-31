import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import EntryBody from "#/components/EntryBody";
import EntryMeta from "#/components/EntryMeta";
import { getEntries, getEntry, isKind, KINDS, type Kind } from "#/lib/content";

type Props = { params: Promise<{ kind: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(KINDS) as Kind[]).flatMap((kind) =>
    getEntries(kind).map((entry) => ({ kind, slug: entry.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind, slug } = await params;
  const entry = isKind(kind) ? getEntry(kind, slug) : undefined;
  if (!entry) return {};
  return {
    title: `${entry.title ?? entry.summary} | Tech Blog`,
    description: entry.summary,
  };
}

export default async function EntryPage({ params }: Props) {
  const { kind, slug } = await params;
  const entry = isKind(kind) ? getEntry(kind, slug) : undefined;
  if (!entry) notFound();

  return (
    <article className="space-y-6">
      <Link href={`/${entry.kind}`} className="text-muted-foreground">
        ← {KINDS[entry.kind].label}
      </Link>
      {entry.title && <h2>{entry.title}</h2>}
      <EntryMeta entry={entry} />
      {entry.links.length > 0 && (
        <ul className="flex gap-4 flex-wrap">
          {entry.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
      <EntryBody source={entry.body} />
    </article>
  );
}
