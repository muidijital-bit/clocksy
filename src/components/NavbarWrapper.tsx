"use client";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[#e6e3da] bg-[#fafaf7]"
    >
      {children}
    </header>
  );
}
