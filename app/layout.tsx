import type { Metadata } from "next";
import { Archivo, Barlow_Condensed, IBM_Plex_Mono, Libre_Bodoni } from "next/font/google";
import { AppChrome } from "@/components/chrome/AppChrome";
import { site } from "@/content/site";
import { GTM_CONTAINER_ID, GTM_SCRIPT } from "@/lib/analytics";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const grotesk = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-grotesk",
});

const serif = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Keanu Agustin - Software Developer",
    template: "%s — Keanu Agustin",
  },
  description: site.intro.lead,
  openGraph: {
    title: "Keanu Agustin - Software Developer",
    description: site.intro.lead,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "2a_iBLRBFE_Ycckj9wByholEldKvQMrYcoOXgCXqW4s",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${grotesk.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
