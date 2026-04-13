import type { ReactNode } from "react";
import Link from "next/link";

const storeNav = [
  { href: "/store", label: "Store" },
  { href: "/wallet", label: "Wallet" },
  { href: "/rewards", label: "Rewards" },
  { href: "/history", label: "History" }
];

const adminNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/apps", label: "Apps" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/payouts", label: "Payouts" },
  { href: "/admin/fraud", label: "Fraud" }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell-frame">
      <header className="topbar">
        <Link className="brandmark" href="/">
          X402
          <span>Reward app store</span>
        </Link>
        <nav className="topnav">
          {storeNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="ghost-pill" href="/admin">
            Admin
          </Link>
        </nav>
      </header>
      <main className="page-shell">{children}</main>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell-frame admin-frame">
      <header className="topbar">
        <Link className="brandmark" href="/admin">
          X402 Ops
          <span>Reward engine control plane</span>
        </Link>
        <nav className="topnav">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="ghost-pill" href="/store">
            Storefront
          </Link>
        </nav>
      </header>
      <main className="page-shell">{children}</main>
    </div>
  );
}
