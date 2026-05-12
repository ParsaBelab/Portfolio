import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { api } from "@/lib/api";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"], display: "swap", variable: "--font-sans",
});
const serif = Instrument_Serif({
  subsets: ["latin"], weight: "400", style: ["normal", "italic"],
  display: "swap", variable: "--font-serif",
});
const mono = JetBrains_Mono({
  subsets: ["latin"], display: "swap", variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost"),
  title: {
    default: "Parsa Belab — Backend Developer",
    template: "%s · Parsa Belab",
  },
  description:
    "Backend developer focused on clean architecture and system reliability. " +
    "Django, Python, Postgres, Docker — building services that stay calm under load.",
  openGraph: {
    type: "website",
    title: "Parsa Belab — Backend Developer",
    description: "Backend developer focused on clean architecture and system reliability.",
    siteName: "Parsa Belab",
  },
  twitter: { card: "summary_large_image", creator: "@mrinloop" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)",  color: "#0c0c0c" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await api.site();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="bg-bg text-ink antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Nav site={site} />
          <main id="main">{children}</main>
          <Footer site={site} />
        </ThemeProvider>
      </body>
    </html>
  );
}
