"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/visualization", label: "Visualization" },
  { href: "/contact", label: "Contact" },
];

const PageShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#C5BEB6] p-1.5 flex flex-col gap-1.5">
      {/* Nav Bar */}
      <div className="bg-[#F3EBE2] rounded-2xl h-16 px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-medium text-[#1A1A1A] no-underline"
        >
          headwinds
        </Link>
        <div className="flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm text-[#1A1A1A] no-underline tracking-wide ${
                pathname === link.href ? "font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {children}

      {/* Footer */}
      <div className="bg-[#1A1A1A] rounded-2xl px-12 py-8 flex items-center justify-between">
        <span className="text-sm text-[#6B6B6B]">headwinds © 2025</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/headwinds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8A8A8A] hover:text-[#F5F4F2] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/brandonflowers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8A8A8A] hover:text-[#F5F4F2] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/headwinds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8A8A8A] hover:text-[#F5F4F2] transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageShell;
