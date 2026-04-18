import { createFileRoute } from "@tanstack/react-router";
import ZennArticles from "../components/ZennArticles";

export const Route = createFileRoute("/zenn")({ component: ZennPage });

function ZennPage() {
  return <ZennArticles />;
}
