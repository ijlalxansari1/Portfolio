"use client";

import { useRef, useState } from "react";
import { ArrowRight, ExternalLink, Music2, Play, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ascension = "suXLyqzLpcA";
const trailer = "Wb8Tq_HD4E8";

function VideoPlayer({ id, title, autoplay = false }: { id: string; title: string; autoplay?: boolean }) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&controls=1${autoplay ? "&autoplay=1" : ""}`}
      title={title}
      referrerPolicy="strict-origin-when-cross-origin"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
}

export function LokiSoundtrack() {
  const { language } = useLanguage();
  const german = language === "de";
  const [open, setOpen] = useState(false);

  return (
    <aside className="loki-audio" data-prevent-scroll-snap="true" aria-label={german ? "Loki-Soundtrack" : "Loki soundtrack"}>
      {open && (
        <div className="loki-audio-panel" id="loki-audio-panel">
          <div className="theme-media-title">
            <div><strong>Ascension</strong><small>Natalie Holt · Loki: Season 2</small></div>
            <button type="button" onClick={() => setOpen(false)} aria-label={german ? "Player schließen" : "Close player"}><X size={19} /></button>
          </div>
          <iframe
            className="loki-music-embed"
            src="https://embed.music.apple.com/us/album/1716588908?i=1716589534&theme=dark"
            title="Ascension — Natalie Holt on Apple Music"
            allow="autoplay *; encrypted-media *"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
          <a className="theme-media-link" href={`https://www.youtube.com/watch?v=${ascension}`} target="_blank" rel="noopener noreferrer">
            {german ? "Auf YouTube anhören" : "Listen on YouTube"} <ExternalLink size={13} aria-hidden />
          </a>
        </div>
      )}
      <button className="loki-audio-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={open ? "loki-audio-panel" : undefined}>
        <Music2 size={19} aria-hidden /> Ascension
      </button>
    </aside>
  );
}

export function DoomPremiere() {
  const { language } = useLanguage();
  const german = language === "de";
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="doom-premiere">
      <div className="doom-poster">
        <div className="doom-poster-copy">
          <p className="doom-credit">Marvel Entertainment</p>
          <h2>Avengers:<br />Doomsday</h2>
          <button type="button" className="doom-play" onClick={() => { dialog.current?.showModal(); setPlaying(true); }}>
            <Play size={18} fill="currentColor" aria-hidden /> {german ? "Offiziellen Trailer ansehen" : "Watch official trailer"}
          </button>
        </div>
      </div>
      <div className="doom-feature-links">
        <a href="/demos/doomsday"><span>{german ? "Interaktive Simulation" : "Interactive simulation"}<strong>Doomsday Drill</strong></span><ArrowRight size={20} aria-hidden /></a>
        <a href="https://www.youtube.com/@Marvel" target="_blank" rel="noopener noreferrer"><span>YouTube<strong>Marvel Entertainment</strong></span><ExternalLink size={19} aria-hidden /></a>
      </div>
      <dialog ref={dialog} className="doom-trailer" aria-labelledby="doom-trailer-title" onClose={() => setPlaying(false)}>
        <div className="theme-media-title">
          <strong id="doom-trailer-title">Avengers: Doomsday</strong>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={german ? "Trailer schließen" : "Close trailer"}><X size={22} /></button>
        </div>
        {playing && <VideoPlayer id={trailer} title="Avengers: Doomsday — Official Trailer" autoplay />}
        <a className="theme-media-link" href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" rel="noopener noreferrer">
          {german ? "Auf YouTube ansehen" : "Watch on YouTube"} <ExternalLink size={13} aria-hidden />
        </a>
      </dialog>
    </div>
  );
}
