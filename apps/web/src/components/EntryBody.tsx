import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { demos } from "./demos";

export default function EntryBody({ source }: { source: string }) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none">
      <MDXRemote
        source={source}
        components={demos}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
