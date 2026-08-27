"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/content/site";

type MusicContextValue = {
  playing: boolean;
  progress: number;
  duration: number;
  toggle: () => void;
  seek: (ratio: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);
const FAKE_DURATION = 48;

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(FAKE_DURATION);
  const fakeStart = useRef(0);
  const fakeElapsed = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !site.audioSrc) return;
    const onMeta = () => setDuration(audio.duration || FAKE_DURATION);
    const onTime = () => setProgress(audio.currentTime);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    if (site.audioSrc) return;
    if (!playing) return;
    fakeStart.current = performance.now() - fakeElapsed.current * 1000;
    let frame = 0;
    const tick = (now: number) => {
      const t = (now - fakeStart.current) / 1000;
      if (t >= FAKE_DURATION) {
        fakeElapsed.current = 0;
        setProgress(0);
        setPlaying(false);
        return;
      }
      fakeElapsed.current = t;
      setProgress(t);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (audio && site.audioSrc) {
      if (playing) audio.pause();
      else void audio.play();
      setPlaying((p) => !p);
      return;
    }
    setPlaying((p) => !p);
  }, [playing]);

  const seek = useCallback(
    (ratio: number) => {
      const next = Math.max(0, Math.min(1, ratio)) * duration;
      if (audioRef.current && site.audioSrc) {
        audioRef.current.currentTime = next;
      }
      fakeElapsed.current = next;
      setProgress(next);
    },
    [duration],
  );

  const value = useMemo(
    () => ({ playing, progress, duration, toggle, seek }),
    [playing, progress, duration, toggle, seek],
  );

  return (
    <MusicContext.Provider value={value}>
      {site.audioSrc ? (
        <audio ref={audioRef} id="audio" src={site.audioSrc} preload="metadata" />
      ) : (
        <audio ref={audioRef} id="audio" preload="none" />
      )}
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
