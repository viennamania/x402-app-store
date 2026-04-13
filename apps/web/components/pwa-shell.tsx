"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function PwaShell({ copy }: { copy: Dictionary["pwa"] }) {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIsOffline(!window.navigator.onLine);

    function handleOnline() {
      setIsOffline(false);
    }

    function handleOffline() {
      setIsOffline(true);
    }

    function handleBeforeInstallPrompt(event: BeforeInstallPromptEvent) {
      event.preventDefault();
      setInstallPrompt(event);
      setDismissed(false);
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
      setDismissed(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      void navigator.serviceWorker.register("/sw.js");
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
      setDismissed(true);
      return;
    }

    setDismissed(true);
  }

  const showInstallBanner = Boolean(installPrompt) && !dismissed;

  if (!isOffline && !showInstallBanner) {
    return null;
  }

  return (
    <div className="pwa-layer" aria-live="polite">
      {isOffline ? (
        <div className="pwa-banner pwa-banner-offline" role="status">
          <div className="stack">
            <strong>{copy.offlineTitle}</strong>
            <span className="mini-label">{copy.offlineDescription}</span>
          </div>
        </div>
      ) : null}

      {showInstallBanner ? (
        <div className="pwa-banner">
          <div className="stack">
            <strong>{copy.installTitle}</strong>
            <span className="mini-label">{copy.installDescription}</span>
          </div>
          <div className="pwa-banner-actions">
            <button className="secondary-button" onClick={() => setDismissed(true)}>
              {copy.dismissAction}
            </button>
            <button className="primary-button" onClick={() => void installApp()}>
              {copy.installAction}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
