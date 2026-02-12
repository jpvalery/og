// @ts-nocheck
import "@/styles.css";
import Script from "next/script";

import { Metadata, Viewport } from "next";
import { PreloadResources } from "./preload-resources";

const title = "OG Image Playground";
const description = "Generate Open Graph images with Vercel’s Edge Function.";
const url = "https://og-cio.vercel.app";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: "Next.js",
    images: [
      {
        url: `${url}/og.png`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${url}/og.png`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: "@customerio",
    images: [`${url}/og.png`], // Must be an absolute URL
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PreloadResources />
      <body>{children}</body>
      <Script />
    </html>
  );
}
