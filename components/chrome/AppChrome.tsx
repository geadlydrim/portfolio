"use client";

import { ContactProvider } from "@/lib/contact";
import { MusicProvider } from "@/lib/music";
import { ThemeProvider } from "@/lib/theme";
import { ContactDrawer } from "@/components/chrome/ContactDrawer";
import { DotCursor } from "@/components/chrome/DotCursor";
import { PageLoader } from "@/components/chrome/PageLoader";
import { RouteCurtain } from "@/components/chrome/RouteCurtain";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteNav } from "@/components/chrome/SiteNav";
import type { ReactNode } from "react";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MusicProvider>
        <ContactProvider>
          <PageLoader />
          <RouteCurtain />
          <SiteNav />
          {children}
          <SiteFooter />
          <ContactDrawer />
          <DotCursor />
        </ContactProvider>
      </MusicProvider>
    </ThemeProvider>
  );
}
