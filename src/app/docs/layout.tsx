export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-container gap-16 px-6 py-14 md:px-8 md:py-16">
      {children}
    </div>
  );
}
