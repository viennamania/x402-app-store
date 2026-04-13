import type { ReactNode } from "react";
import { AppShell } from "@/components/shells";
import { getRequestDictionary } from "@/lib/i18n";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const { dictionary, locale } = await getRequestDictionary();

  return (
    <AppShell dictionary={dictionary} locale={locale}>
      {children}
    </AppShell>
  );
}
