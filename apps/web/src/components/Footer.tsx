export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground">
        <p>© {year} Tech Blog. Built with TanStack Start &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
