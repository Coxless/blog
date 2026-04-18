import { ExternalLink, Heart } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "RustでWASMを始めるための完全ガイド",
    emoji: "🦀",
    likes: 142,
    publishedAt: "2026-03-15",
    url: "#",
  },
  {
    id: 2,
    title: "TypeScriptで型安全なAPIクライアントを作る",
    emoji: "📘",
    likes: 89,
    publishedAt: "2026-02-28",
    url: "#",
  },
  {
    id: 3,
    title: "Reactのパフォーマンス最適化テクニック",
    emoji: "⚡",
    likes: 215,
    publishedAt: "2026-01-20",
    url: "#",
  },
  {
    id: 4,
    title: "Tailwind CSS v4の新機能まとめ",
    emoji: "🎨",
    likes: 167,
    publishedAt: "2025-12-10",
    url: "#",
  },
];

export default function ZennArticles() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Zenn 記事</h2>
        <p className="text-muted-foreground">Zennで公開している技術記事の一覧です</p>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors bg-white block group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{article.emoji}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="group-hover:text-primary transition-colors">{article.title}</h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{article.publishedAt}</span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
