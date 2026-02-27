/**
 * layout.tsx — Custom layout for Day-level C Language pages.
 *
 * Hides the global navbar and footer for distraction-free learning,
 * similar to the course learn layout. Each day page has its own
 * breadcrumb navigation bar.
 */

export default function DayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style>{`
        nav, footer, .scroll-progress-bar { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
