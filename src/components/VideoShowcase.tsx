"use client";

import { useRef, useState } from "react";

type VideoShowcaseProps = {
  /** Path to the actual demo clip once you have one, e.g. "/videos/demo.mp4" */
  src?: string;
  /** Static preview frame shown before playback starts */
  poster?: string;
  title?: string;
  description?: string;
};

export default function VideoShowcase({
  src = "/videos/demo.mp4",
  poster = "/images/demo-poster.jpg",
  title = "Watch the bridge flow, live",
  description = "Four steps, ~90 seconds — approve, burn, attestation, mint. No cuts, no staged data.",
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasSrc, setHasSrc] = useState(true);

  function handlePlay() {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => setHasSrc(false)));
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  }

  function handleScrub(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }

  return (
    <div className="group relative aspect-video overflow-hidden rounded-[24px] border border-hairline bg-ink-raised glow-ring">
      {!playing ? (
        <button
          onClick={handlePlay}
          className="relative flex h-full w-full items-center justify-center overflow-hidden"
          aria-label={`Play: ${title}`}
        >
          {/* Poster — falls back to the mesh-gradient atmosphere if no image exists yet */}
          <div
            className="absolute inset-0 bg-atmosphere bg-cover bg-center"
            style={poster ? { backgroundImage: `url(${poster})` } : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-brass-dim bg-ink/60 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full border border-brass-dim opacity-60 animate-pulseGlow" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative ml-1">
              <path d="M6 4l14 8-14 8V4z" fill="#F5F3ED" />
            </svg>
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-7 text-left">
            <h3 className="text-[20px] text-bone">{title}</h3>
            <p className="mt-1.5 max-w-[440px] text-[13.5px] text-bone-dim">{description}</p>
          </div>
        </button>
      ) : hasSrc ? (
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted={muted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={() => setHasSrc(false)}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-10">
            <button
              onClick={() => (videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause())}
              className="text-bone-dim transition-colors hover:text-bone"
              aria-label="Play/pause"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            </button>

            <div
              onClick={handleScrub}
              className="relative h-1 flex-1 cursor-pointer rounded-full bg-hairline-strong"
            >
              <div className="h-full rounded-full bg-brass" style={{ width: `${progress}%` }} />
            </div>

            <button
              onClick={() => setMuted((m) => !m)}
              className="text-bone-dim transition-colors hover:text-bone"
              aria-label="Toggle mute"
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M16 9l5 6M21 9l-5 6" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9v6h4l5 5V4L7 9H3z" /><path d="M15.5 8.5a5 5 0 010 7" /></svg>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-atmosphere px-8 text-center">
          <p className="font-mono text-[12.5px] text-bone-faint">
            No video file at <span className="text-brass-dim">{src}</span> yet — drop your demo clip there and this player is ready to go.
          </p>
        </div>
      )}
    </div>
  );
}