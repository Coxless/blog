import { ExternalLink, Github, Mail, Twitter } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">プロフィール</h2>
        <p className="text-muted-foreground">自己紹介とスキルについて</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 flex items-center justify-center text-white text-5xl">
              YN
            </div>
            <h3 className="mb-1">Your Name</h3>
            <p className="text-muted-foreground mb-6">Software Engineer</p>

            <div className="space-y-3 w-full">
              <a
                href="#"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span className="group-hover:underline">GitHub</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Twitter className="w-5 h-5" />
                <span className="group-hover:underline">Twitter</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="group-hover:underline">Email</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h4 className="mb-3">About</h4>
              <p className="text-muted-foreground leading-relaxed">
                WebAssemblyとRustが好きなエンジニアです。フロントエンドからバックエンドまで幅広く開発しています。
                パフォーマンスとユーザー体験を大切にし、新しい技術を積極的に取り入れることを心がけています。
              </p>
            </div>

            <div>
              <h4 className="mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["Rust", "TypeScript", "React", "WASM", "Go", "Docker", "Tailwind CSS", "Node.js"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-3">Interests</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• WebAssemblyを使ったパフォーマンス最適化</li>
                <li>• 型安全な開発環境の構築</li>
                <li>• モダンなフロントエンド開発</li>
                <li>• オープンソースへの貢献</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
