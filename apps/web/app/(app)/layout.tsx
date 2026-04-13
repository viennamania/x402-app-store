import type { ReactNode } from "react";
import { AppShell } from "@/components/shells";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
