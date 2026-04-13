"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileTabBar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="mobile-tabbar"
      aria-label="Mobile navigation"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className={isActive(pathname, item.href) ? "is-active" : undefined}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
