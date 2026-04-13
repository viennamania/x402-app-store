import type { ReactNode } from "react";
import { AdminShell } from "@/components/shells";
import { getRequestDictionary } from "@/lib/i18n";

export default async function AdminLayout({
  children
}: {
  children: ReactNode;
}) {
  const { dictionary, locale } = await getRequestDictionary();

  return (
    <AdminShell dictionary={dictionary} locale={locale}>
      {children}
    </AdminShell>
  );
}
