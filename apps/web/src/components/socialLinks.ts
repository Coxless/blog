import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { Github, Matrix, Twitter } from "./BrandIcons";

export const socialLinks: { href: string; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { href: "https://github.com/Coxless/", label: "GitHub", icon: Github },
  { href: "https://matrix.to/#/@coxless:mozilla.org", label: "Matrix", icon: Matrix },
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "Email", icon: Mail },
];
