import { PlaygroundTrack } from "@/components/playground/PlaygroundTrack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "Design and code experiments",
  openGraph: { title: "Playground", description: "Design and code experiments" },
};

export default function PlaygroundPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PlaygroundTrack />
    </main>
  );
}
