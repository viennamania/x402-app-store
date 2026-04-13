import Link from "next/link";
import { ShellCard } from "@repo/ui";
import { getRequestDictionary } from "@/lib/i18n";

export default async function NotFound() {
  const { dictionary } = await getRequestDictionary();

  return (
    <div className="shell-frame">
      <div className="page-shell">
        <ShellCard className="accent-panel">
          <div className="stack">
            <p className="section-eyebrow">{dictionary.notFound.eyebrow}</p>
            <h1 className="page-title">{dictionary.notFound.title}</h1>
            <p className="detail-copy">{dictionary.notFound.description}</p>
            <div className="hero-actions">
              <Link className="primary-link" href="/store">
                {dictionary.notFound.backToStore}
              </Link>
              <Link className="secondary-link" href="/admin">
                {dictionary.notFound.openAdmin}
              </Link>
            </div>
          </div>
        </ShellCard>
      </div>
    </div>
  );
}
