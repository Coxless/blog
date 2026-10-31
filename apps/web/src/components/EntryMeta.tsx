import { Calendar, Tag } from "lucide-react";
import type { Entry } from "#/lib/content";

export default function EntryMeta({ entry }: { entry: Entry }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex gap-2 flex-wrap">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md flex items-center gap-1"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>{entry.date}</span>
      </div>
    </div>
  );
}
