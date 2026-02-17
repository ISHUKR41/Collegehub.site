/**
 * layout.tsx — Custom layout for the immersive lesson viewer.
 *
 * Why a custom layout:
 * - Hides the global navbar and footer for distraction-free learning.
 * - The learn page has its own top bar with navigation controls.
 * - Still inherits root layout's providers, fonts, and global CSS.
 */

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 
       * Hide the global Navbar and Footer using CSS when inside the learn route.
       * This avoids duplicating provider setup from root layout.
       */}
      <style>{`
        nav, footer, .scroll-progress-bar { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
