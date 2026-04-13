import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { getRequestDictionary } from "@/lib/i18n";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getRequestDictionary();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(appUrl),
    applicationName: dictionary.metadata.title,
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/icons/icon-192.svg", type: "image/svg+xml" },
        { url: "/icons/icon-512.svg", type: "image/svg+xml" }
      ],
      apple: [{ url: "/icons/icon-192.svg", type: "image/svg+xml" }]
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: dictionary.metadata.title
    },
    formatDetection: {
      telephone: false
    }
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f0e6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { dictionary, locale } = await getRequestDictionary();

  return (
    <html lang={locale} data-locale={locale}>
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <Providers pwaCopy={dictionary.pwa}>{children}</Providers>
      </body>
    </html>
  );
}
