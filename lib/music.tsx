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
  volume: number;
  toggle: () => void;
  seek: (ratio: number) => void;
  setVolume: (value: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);
const FAKE_DURATION = 48;

function finiteSeconds(value: number): number | null {
  return Number.isFinite(value) && value > 0 ? value : null;
}

function seededDuration(): number {
  if (site.audioSrc) {
    return finiteSeconds(site.audioDuration) ?? 0;
  }
  return FAKE_DURATION;
}

function durationFromAudio(audio: HTMLAudioElement): number | null {
  const tagged = finiteSeconds(audio.duration);
  if (tagged) return tagged;
  if (audio.seekable.length > 0) {
    return finiteSeconds(audio.seekable.end(audio.seekable.length - 1));
  }
  return null;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(seededDuration);
  const [volume, setVolumeState] = useState(0.8);
  const fakeStart = useRef(0);
  const fakeElapsed = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !site.audioSrc) return;

    const syncDuration = () => {
      const known = finiteSeconds(site.audioDuration);
      const measured = durationFromAudio(audio);
      const next = known ?? measured;
      if (next) setDuration(next);
    };

    const onTime = () => {
      syncDuration();
      const length = finiteSeconds(site.audioDuration) ?? durationFromAudio(audio);
      const time = audio.currentTime;
      setProgress(length ? Math.min(time, length) : time);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };

    syncDuration();
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
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
      const length = duration || seededDuration();
      const next = Math.max(0, Math.min(1, ratio)) * length;
      if (audioRef.current && site.audioSrc) {
        audioRef.current.currentTime = next;
      }
      fakeElapsed.current = next;
      setProgress(next);
    },
    [duration],
  );

  const setVolume = useCallback((value: number) => {
    const next = Math.max(0, Math.min(1, value));
    setVolumeState(next);
    if (audioRef.current) audioRef.current.volume = next;
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const value = useMemo(
    () => ({ playing, progress, duration, volume, toggle, seek, setVolume }),
    [playing, progress, duration, volume, toggle, seek, setVolume],
  );

  return (
    <MusicContext.Provider value={value}>
      {site.audioSrc ? (
        <audio ref={audioRef} id="audio" src={site.audioSrc} preload="auto" />
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
