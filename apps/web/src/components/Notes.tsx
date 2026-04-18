import { Calendar, Tag } from "lucide-react";

type Note = {
  title: string;
  content: string;
  tags: string[];
  date: string;
};

const noteModules = import.meta.glob<{ default: Note }>("./notes/*.ts", {
  eager: true,
});

const notes = Object.values(noteModules)
  .map((mod) => mod.default)
  .sort((a, b) => b.date.localeCompare(a.date));

export default function Notes() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">技術関連のメモや自作パッケージなどをまとめています</p>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.title}
            className="border border-border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
          >
            <h3 className="mb-3">{note.title}</h3>
            <p className="text-muted-foreground mb-4">{note.content}</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tag) => (
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
                <span>{note.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
