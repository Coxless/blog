import { createFileRoute } from "@tanstack/react-router";
import Notes from "../components/Notes";

export const Route = createFileRoute("/")({ component: Projects });

function Projects() {
  return (
    <div className="space-y-12">
      <Notes />
    </div>
  );
}
