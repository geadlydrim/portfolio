import type { Metadata } from "next";
import { Archivo, Barlow_Condensed, IBM_Plex_Mono, Libre_Bodoni } from "next/font/google";
import { AppChrome } from "@/components/chrome/AppChrome";
import { site } from "@/content/site";
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
      </head>
      <body className="min-h-full">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
