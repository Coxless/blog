import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Github, Mail, Twitter } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const socialLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "#", label: "GitHub", icon: Github },
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "Email", icon: Mail },
];

const tabs = [
  { to: "/", label: "記事", exact: true },
  { to: "/zenn", label: "Zenn", exact: false },
  { to: "/profile", label: "プロフィール", exact: false },
] as const;

export default function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
              YN
            </div>
            <div>
              <h1 className="text-primary">Tech Blog</h1>
              <p className="text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-1">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              activeOptions={{ exact: tab.exact }}
              className="px-4 py-2 rounded-lg transition-colors text-foreground hover:bg-secondary/50 no-underline"
              activeProps={{
                className: "px-4 py-2 rounded-lg bg-primary text-white no-underline",
              }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
