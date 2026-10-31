import Link from "next/link";
import { KINDS, type Entry } from "#/lib/content";
import EntryMeta from "./EntryMeta";

export default function EntryCard({ entry, showKind = false }: { entry: Entry; showKind?: boolean }) {
  return (
    <article className="border border-border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
      {showKind && <p className="text-muted-foreground text-sm mb-2">{KINDS[entry.kind].label}</p>}
      <Link href={`/${entry.kind}/${entry.slug}`} className="block no-underline text-inherit mb-4">
        {entry.title && <h3 className="mb-3">{entry.title}</h3>}
        <p className="text-muted-foreground">{entry.summary}</p>
      </Link>
      <EntryMeta entry={entry} />
    </article>
  );
}
