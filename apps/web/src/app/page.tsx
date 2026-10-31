import EntryCard from "#/components/EntryCard";
import { getAllEntries } from "#/lib/content";

const LATEST_COUNT = 10;

export default function HomePage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        自作プロダクトの紹介、技術的なつぶやき、WASMなどの実験をまとめています
      </p>
      <div className="grid gap-4">
        {getAllEntries()
          .slice(0, LATEST_COUNT)
          .map((entry) => (
            <EntryCard key={`${entry.kind}/${entry.slug}`} entry={entry} showKind />
          ))}
      </div>
    </div>
  );
}
