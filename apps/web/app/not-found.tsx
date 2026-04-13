import Link from "next/link";
import { ShellCard } from "@repo/ui";

export default function NotFound() {
  return (
    <div className="shell-frame">
      <div className="page-shell">
        <ShellCard className="accent-panel">
          <div className="stack">
            <p className="section-eyebrow">Not Found</p>
            <h1 className="page-title">That route is outside the current scaffold.</h1>
            <p className="detail-copy">
              The monorepo structure is in place, but this page has not been
              implemented yet.
            </p>
            <div className="hero-actions">
              <Link className="primary-link" href="/store">
                Back to store
              </Link>
              <Link className="secondary-link" href="/admin">
                Open admin
              </Link>
            </div>
          </div>
        </ShellCard>
      </div>
    </div>
  );
}
