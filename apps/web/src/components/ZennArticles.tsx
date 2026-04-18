import { ExternalLink, MessageSquare } from "lucide-react";

const articles = [
  {
    slug: "bd433dd08a50ae",
    title: "ViteでWASMのHMRを補助するプラグインを作ってみた",
    emoji: "🦀",
    publishedAt: "2026-03-31",
    comment:
      "WASMのHMRはViteの標準機能ではないため、開発中にコード変更がリアルタイムに反映されるようにするためのプラグインを作成しました。",
  },
  {
    slug: "e379b80d3dc685",
    title: "Next.js開発時にコード変更がリアルタイムに反映される仕組みをざっくり理解する",
    emoji: "⚡",
    publishedAt: "2026-03-28",
    comment: "Next.jsにWASMを組み込みたく、調べたときのものです",
  },
  {
    slug: "ab20a4e2004a54",
    title: "WSL + Arch Linux + home-managerで環境構築してみた",
    emoji: "🦔",
    publishedAt: "2026-03-01",
    comment: "環境構築をhome-managerで管理したくなったので、やったものです",
  },
  {
    slug: "300f464cbcff76",
    title: "Claude Codeの並列開発を可視化するTUIツール「ccmon」を作ってみた",
    emoji: "🖥️",
    publishedAt: "2026-01-18",
    comment: "作ったはいいものの放置してます",
  },
  {
    slug: "ace251d445175a",
    title: "[Tips]ZedでTerraformのformat on saveが効かなかったので対処した",
    emoji: "🛠️",
    publishedAt: "2025-11-27",
    comment: "",
  },
  {
    slug: "a0491fd70a7b20",
    title: "Windows版Zedが出たので環境を整えてみた",
    emoji: "🦀",
    publishedAt: "2025-10-21",
    comment: "今もメインで使っているZedの記事です",
  },
  {
    slug: "d283b1f2ad1770",
    title: "DevcontainerでAtcoderの環境を構築してみた (Rust)",
    emoji: "🌟",
    publishedAt: "2025-10-12",
    comment:
      "Devcontainerを使ってAtcoderの環境を構築してみた記事です。Rustでの環境構築方法を紹介しています。",
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
        {articles.map((article) => {
          const url = `https://zenn.dev/coxlessspcond/articles/${article.slug}`;
          return (
            <a
              key={article.slug}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors bg-card block group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{article.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="group-hover:text-primary transition-colors">{article.title}</h3>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                  </div>
                  <span className="text-muted-foreground text-sm">{article.publishedAt}</span>
                  {article.comment && (
                    <div className="mt-3 pt-3 border-t border-border flex items-start gap-2 text-muted-foreground text-sm">
                      <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{article.comment}</span>
                    </div>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
