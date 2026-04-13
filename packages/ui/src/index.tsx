import type { HTMLAttributes, ReactNode } from "react";

function cx(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function ShellCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("shell-card", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export function Pill({
  tone = "default",
  children
}: {
  tone?: "default" | "success" | "warning";
  children: ReactNode;
}) {
  return <span className={cx("pill", `pill-${tone}`)}>{children}</span>;
}

export function MetricCard({
  label,
  value,
  note
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <ShellCard className="metric-card">
      <p className="metric-label">{label}</p>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </ShellCard>
  );
}

export function InfoStrip({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="info-strip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
