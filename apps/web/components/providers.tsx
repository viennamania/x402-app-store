"use client";

import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import type { Dictionary } from "@/lib/i18n";
import { PwaShell } from "@/components/pwa-shell";

export function Providers({
  children,
  pwaCopy
}: {
  children: ReactNode;
  pwaCopy: Dictionary["pwa"];
}) {
  return (
    <ThirdwebProvider>
      {children}
      <PwaShell copy={pwaCopy} />
    </ThirdwebProvider>
  );
}
