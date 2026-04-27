"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeadwindsLogo } from "cross-country";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#C5BEB6] p-1.5 flex flex-col gap-1.5">
      {/* Nav Bar */}
      <div className="bg-[#F3EBE2] rounded-2xl h-16 px-4 md:px-12 flex items-center justify-between relative z-50">
        <Link
          href="/"
          className="text-xl font-medium text-[#1A1A1A] no-underline flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <div style={{ width: 60 }}>
            <HeadwindsLogo width={80} />
          </div>
          headwinds
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#EAE3DA] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <path d="M4 4l12 12" />
                <path d="M16 4L4 16" />
              </>
            ) : (
              <>
                <path d="M3 5h14" />
                <path d="M3 10h14" />
                <path d="M3 15h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <nav
            className="absolute top-[72px] left-1.5 right-1.5 bg-[#F3EBE2] rounded-2xl p-6 flex flex-col gap-1 shadow-2xl animate-[scaleIn_200ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base text-[#1A1A1A] no-underline tracking-wide px-4 py-3 rounded-xl transition-colors ${
                  pathname === link.href
                    ? "font-medium bg-[#EAE3DA]"
                    : "hover:bg-[#EAE3DA]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {children}

      {/* Footer */}
      <div className="bg-[#1A1A1A] rounded-2xl px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
