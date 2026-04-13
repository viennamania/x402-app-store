import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "X402 Rewards",
    short_name: "X402",
    description: "Find simple app tasks, earn rewards, and request payouts.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f0e6",
    theme_color: "#f7f0e6",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
