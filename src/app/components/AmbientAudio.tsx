"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/story/media/audio/heaven-on-earth.m4a";
const VOLUME = 0.45;

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "metadata";
    audio.loop = false;
    audio.volume = VOLUME;
    audioRef.current = audio;

    const handleEnded = () => {
      setPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio || playing) return;

    try {
      audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className="ambient-audio"
      onClick={play}
      disabled={playing}
      aria-label="Play ambient audio"
    >
      play
    </button>
  );
}
