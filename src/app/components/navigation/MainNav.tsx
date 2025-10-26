"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/garden", label: "Garden" },
  { href: "/ki", label: "Now" },
  // Add more links as you build out sections
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap gap-4 md:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    text-lg md:text-xl font-medium
                    transition-all duration-200
                    hover:opacity-100
                    ${
                      isActive
                        ? "opacity-100 underline underline-offset-4"
                        : "opacity-60"
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
