"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, GitBranch, Play, RotateCcw, Shield, Terminal, Timer } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { drillCopy } from "./copy";
import styles from "./doomsday.module.css";

const sourceRegistry = { "FEED-WEST": "01", "FEED-CENTRAL": "02", "FEED-EAST": "03" } as const;
const feeds = Object.keys(sourceRegistry) as (keyof typeof sourceRegistry)[];
const timelines = feeds.map((feed) => ({ id: sourceRegistry[feed], feed }));
const incoming = ["EVT-042", "EVT-043"].flatMap((id) =>
  feeds.map((feed) => ({ id, feed })),
);

function uniqueEvents<T>(events: T[], keyOf: (event: T) => string) {
  const seen = new Set<string>();
  return events.filter((event) => {
    const key = keyOf(event);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const flattened = uniqueEvents(incoming, (event) => event.id);
const restored = uniqueEvents(
  incoming.map((event) => ({ ...event, timeline: sourceRegistry[event.feed] })),
  (event) => `${event.timeline}/${event.id}`,
);

const targetSeconds = 60;
type Decision = "dedupe" | "restore";

function formatClock(seconds: number) {
  const absolute = Math.abs(seconds);
  return `${seconds < 0 ? "+" : ""}${String(Math.floor(absolute / 60)).padStart(2, "0")}:${String(absolute % 60).padStart(2, "0")}`;
}

export default function DoomsdayDrill() {
  const { language } = useLanguage();
  const t = drillCopy[language];
  const [doomMode, setDoomMode] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [inspected, setInspected] = useState<typeof timelines[number] | null>(null);
  const evidenceHeading = useRef<HTMLHeadingElement>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (decision) result.current?.focus();
  }, [decision]);

  useEffect(() => {
    if (startedAt === null || decision) return;
    const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 250);
    return () => window.clearInterval(timer);
  }, [startedAt, decision]);

  function startDrill() {
    setStartedAt(Date.now());
    setElapsed(0);
    setDecision(null);
    setInspected(null);
    evidenceHeading.current?.focus();
  }

  function chooseFix(fix: Decision) {
    if (startedAt === null) return;
    setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    setDecision(fix);
  }

  const output = decision === "dedupe" ? flattened : restored;
  const choicesDisabled = startedAt === null || decision !== null;

  return (
    <main className={styles.console} data-doom-mode={doomMode}>
      <div className={styles.frame}>
        <header className={styles.toolbar}>
          <a href="/#demo" className={styles.back}><ArrowLeft size={17} aria-hidden /> {t.back}</a>
          <button type="button" className={styles.mode} aria-pressed={doomMode} onClick={() => setDoomMode(!doomMode)}>
            <Shield size={16} aria-hidden /> {t.mode}
            <span className={styles.switchTrack} aria-hidden />
          </button>
        </header>

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><GitBranch size={16} aria-hidden /> {t.operations}</div>
            <h1>{t.title}</h1>
            <p>{t.briefing}</p>
          </div>
          <div className={styles.clock}>
            <div className={styles.clockLabel}><Timer size={17} aria-hidden /> {elapsed > targetSeconds ? t.overtime : t.timer}</div>
            <time className={styles.clockValue} dateTime={`PT${Math.abs(targetSeconds - elapsed)}S`}>{formatClock(targetSeconds - elapsed)}</time>
            {startedAt === null && (
              <button type="button" className={styles.primary} onClick={startDrill}><Play size={15} aria-hidden /> {t.start}</button>
            )}
          </div>
        </div>

        <div className={styles.workspace}>
          <section className={styles.panel} aria-labelledby="drill-evidence">
            <div className={styles.panelHeader}>
              <h2 id="drill-evidence" ref={evidenceHeading} tabIndex={-1}>{t.evidence}</h2>
              <span>{t.sample}</span>
            </div>
            <table className={styles.events}>
              <thead><tr><th scope="col">{t.event}</th><th scope="col">{t.source}</th><th scope="col">{t.timeline}</th></tr></thead>
              <tbody>
                {incoming.slice(0, timelines.length).map((event) => (
                  <tr key={event.feed}><td>{event.id}</td><td>{event.feed}</td><td><span>{t.missing}</span></td></tr>
                ))}
              </tbody>
            </table>
            <aside className={styles.clue}><GitBranch size={18} aria-hidden /><p>{t.loki}</p></aside>
          </section>

          <section className={styles.panel} aria-labelledby="drill-monitor">
            <div className={styles.panelHeader}><h2 id="drill-monitor">{t.health}</h2><Activity size={20} aria-hidden /></div>
            <div className={styles.lanes}>
              {timelines.map((timeline) => {
                const count = output.filter((event) => event.feed === timeline.feed).length;
                const state = decision ? (count > 0 ? "online" : "offline") : "pending";
                return (
                  <button type="button" key={timeline.id} className={styles.lane} data-state={state} aria-pressed={inspected === timeline} onClick={() => setInspected(timeline)}>
                    <span className={styles.laneId}>{timeline.id}</span>
                    <span className={styles.laneTrack} aria-hidden><span /><span /><span /><span /><span /></span>
                    <span className={styles.laneStatus}>{t[state]}{decision ? ` · ${t.events(count)}` : ""}</span>
                  </button>
                );
              })}
            </div>
            <p className={styles.feed} aria-live="polite">{inspected ? t.feedResult(inspected.feed, inspected.id) : t.feedHint}</p>
          </section>
        </div>

        <section className={styles.actions} aria-labelledby="drill-choose">
          <h2 id="drill-choose">{t.choose}</h2>
          <div className={styles.choices}>
            {(["dedupe", "restore"] as const).map((fix) => (
              <button type="button" className={styles.choice} key={fix} disabled={choicesDisabled} onClick={() => chooseFix(fix)}>
                <span><strong>{t[fix]}</strong><small>{fix === "dedupe" ? t.dedupeDetail : t.restoreDetail}</small></span>
                <ArrowRight size={19} aria-hidden />
              </button>
            ))}
          </div>

          {decision && (
            <div ref={result} className={styles.result} data-result={decision} tabIndex={-1} role="group" aria-labelledby="drill-result" aria-describedby="drill-result-detail">
              <div>
                <strong id="drill-result">{decision === "restore" ? t.recovered : t.failed}</strong>
                <p id="drill-result-detail">{decision === "restore" ? t.recoveredDetail(restored.length) : t.failedDetail(incoming.length, flattened.length)}</p>
              </div>
              <button type="button" className={styles.mode} onClick={startDrill}><RotateCcw size={16} aria-hidden /> {decision === "restore" ? t.reset : t.retry}</button>
            </div>
          )}
        </section>

        {decision === "restore" && (
          <section className={styles.report} aria-labelledby="drill-report">
            <h2 id="drill-report"><Terminal size={17} aria-hidden /> {t.report}</h2>
            <ul><li>{t.audit}</li><li>{t.trace}</li><li><strong>SOURCE: LATVERIA</strong></li></ul>
          </section>
        )}
      </div>
    </main>
  );
}
