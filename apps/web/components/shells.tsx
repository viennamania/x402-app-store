import type { ReactNode } from "react";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Dictionary, Locale } from "@/lib/i18n";

type ShellProps = {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
};

export function AppShell({ children, dictionary, locale }: ShellProps) {
  const storeNav = [
    { href: "/store", label: dictionary.nav.store },
    { href: "/wallet", label: dictionary.nav.wallet },
    { href: "/rewards", label: dictionary.nav.rewards },
    { href: "/history", label: dictionary.nav.history }
  ];

  return (
    <div className="shell-frame">
      <header className="topbar">
        <Link className="brandmark" href="/">
          X402
          <span>{dictionary.brand.storefront}</span>
        </Link>
        <nav className="topnav">
          {storeNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="ghost-pill" href="/admin">
            {dictionary.nav.admin}
          </Link>
          <LocaleSwitcher
            label={dictionary.language.label}
            locale={locale}
            options={dictionary.language.options}
          />
        </nav>
      </header>
      <main className="page-shell">{children}</main>
    </div>
  );
}

export function AdminShell({ children, dictionary, locale }: ShellProps) {
  const adminNav = [
    { href: "/admin", label: dictionary.nav.overview },
    { href: "/admin/apps", label: dictionary.nav.apps },
    { href: "/admin/campaigns", label: dictionary.nav.campaigns },
    { href: "/admin/payouts", label: dictionary.nav.payouts },
    { href: "/admin/fraud", label: dictionary.nav.fraud }
  ];

  return (
    <div className="shell-frame admin-frame">
      <header className="topbar">
        <Link className="brandmark" href="/admin">
          X402 Ops
          <span>{dictionary.brand.controlPlane}</span>
        </Link>
        <nav className="topnav">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="ghost-pill" href="/store">
            {dictionary.nav.storefront}
          </Link>
          <LocaleSwitcher
            label={dictionary.language.label}
            locale={locale}
            options={dictionary.language.options}
          />
        </nav>
      </header>
      <main className="page-shell">{children}</main>
    </div>
  );
}
