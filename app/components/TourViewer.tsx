"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EquirectangularViewer, type EquirectangularViewerHandle } from "./EquirectangularViewer";
import type { HeritageSite, Hotspot, NavigationArrow } from "../lib/data";

type TourMode = "free" | "auto";

const AUTO_SCENE_DURATION = 18000;
const AUTO_ROTATION_SPEED = 360 / AUTO_SCENE_DURATION;

function hotspotLabel(type: Hotspot["type"]) {
  if (type === "audio") return "Thuyết minh";
  if (type === "image") return "Ảnh tư liệu";
  if (type === "gallery") return "Album ảnh";
  if (type === "video") return "Video";
  if (type === "document") return "Tài liệu";
  return "Thông tin";
}

function normalizeHeading(heading: number) {
  return ((heading % 360) + 360) % 360;
}

function yawFromPercent(item: { x?: number; yaw?: number }) {
  return item.yaw ?? ((item.x ?? 50) / 100) * 360;
}

function pitchFromPercent(item: { y?: number; pitch?: number }) {
  return item.pitch ?? (50 - (item.y ?? 50)) * 1.25;
}

export function TourViewer({ site }: { site: HeritageSite }) {
  const publicPoints = useMemo(
    () => site.tourPoints.filter((point) => point.status === "published"),
    [site.tourPoints],
  );
  const firstPoint = publicPoints.find((point) => point.isStartPoint) ?? publicPoints[0];
  const [currentPointId, setCurrentPointId] = useState(firstPoint?.id ?? "");
  const currentPoint = useMemo(
    () => publicPoints.find((point) => point.id === currentPointId) ?? firstPoint,
    [currentPointId, firstPoint, publicPoints],
  );
  const currentIndex = Math.max(
    0,
    publicPoints.findIndex((point) => point.id === currentPoint?.id),
  );
  const [mode, setMode] = useState<TourMode>("free");
  const [heading, setHeading] = useState(currentPoint?.initialPan ?? 0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [muted, setMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [thumbsCollapsed, setThumbsCollapsed] = useState(false);
  const viewerRef = useRef<EquirectangularViewerHandle | null>(null);
  const autoStateRef = useRef({ lastTimestamp: 0, elapsed: 0, baseHeading: heading });
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  const preloadSources = useMemo(() => {
    if (!publicPoints.length) return [];
    const nextPoint = publicPoints[(currentIndex + 1) % publicPoints.length];
    const previousPoint = publicPoints[(currentIndex - 1 + publicPoints.length) % publicPoints.length];

    return Array.from(new Set([nextPoint?.panorama, previousPoint?.panorama].filter(Boolean)));
  }, [currentIndex, publicPoints]);

  const viewerHotspots = useMemo(() => {
    if (!currentPoint || mode === "auto") return [];

    const navigation = currentPoint.arrows
      .filter((arrow) => arrow.status === "published")
      .map((arrow) => {
        const target = publicPoints.find((point) => point.id === arrow.toPointId);
        return {
          id: arrow.id,
          title: arrow.title,
          yaw: yawFromPercent(arrow),
          pitch: pitchFromPercent(arrow),
          type: "navigation" as const,
          thumbnail: target?.preview,
          variant: "arrow" as const,
        };
      });

    const info = currentPoint.hotspots
      .filter((hotspot) => hotspot.status === "published")
      .map((hotspot) => ({
        id: hotspot.id,
        title: hotspot.title,
        yaw: yawFromPercent(hotspot),
        pitch: pitchFromPercent(hotspot),
        type: "info" as const,
        variant:
          hotspot.type === "audio"
            ? ("audio" as const)
            : hotspot.type === "image" || hotspot.type === "gallery" || hotspot.type === "video"
              ? ("media" as const)
              : ("book" as const),
      }));

    return [...navigation, ...info];
  }, [currentPoint, mode, publicPoints]);

  useEffect(() => {
    // detect mobile to hide fullscreen control on small screens
    const mq = typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)") : null;
    const update = () => {
      if (!mq) return;
      setIsMobile(Boolean(mq.matches));
    };
    update();
    mq?.addEventListener("change", update);
    return () => mq?.removeEventListener("change", update);
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (muted || mode !== "auto" || !site.backgroundMusic) {
      backgroundAudioRef.current?.pause();
      return;
    }

    if (!backgroundAudioRef.current) {
      const audio = new Audio(site.backgroundMusic);
      audio.loop = true;
      audio.volume = 0.18;
      backgroundAudioRef.current = audio;
    }
    void backgroundAudioRef.current.play().catch(() => undefined);
  }, [mode, muted, site.backgroundMusic]);

  useEffect(() => {
    if (mode !== "auto" || !currentPoint || !publicPoints.length) return undefined;

    autoStateRef.current = {
      lastTimestamp: 0,
      elapsed: 0,
      baseHeading: viewerRef.current?.getPov().heading ?? heading,
    };

    let frame = 0;
    const tick = (timestamp: number) => {
      const state = autoStateRef.current;
      if (!state.lastTimestamp) state.lastTimestamp = timestamp;
      const delta = timestamp - state.lastTimestamp;
      state.lastTimestamp = timestamp;
      state.elapsed += delta;

      const nextHeading = normalizeHeading(state.baseHeading + state.elapsed * AUTO_ROTATION_SPEED);
      setHeading(nextHeading);
      viewerRef.current?.setPov({ heading: nextHeading, pitch: 0, fov: 72 });

      if (state.elapsed >= AUTO_SCENE_DURATION) {
        const nextPoint = publicPoints[(currentIndex + 1) % publicPoints.length];
        setActiveHotspot(null);
        setCurrentPointId(nextPoint.id);
        setHeading(nextPoint.initialPan);
        state.elapsed = 0;
        state.baseHeading = nextPoint.initialPan;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, currentPoint, heading, mode, publicPoints]);

  if (!currentPoint) {
    return (
      <main className="tour-empty">
        <h1>Di tích này chưa có dữ liệu tham quan VR360</h1>
        <p>Vui lòng quay lại trang giới thiệu để xem thông tin và tư liệu liên quan.</p>
        <Link className="primary-button" href={`/di-tich/${site.slug}`}>
          Quay lại trang di tích
        </Link>
      </main>
    );
  }

  function goToPoint(pointId: string, targetHeading: number) {
    setMode("free");
    setActiveHotspot(null);
    setCurrentPointId(pointId);
    setHeading(targetHeading);
  }

  function toggleFullscreen() {
    const target = document.querySelector(".tour-shell");
    if (!document.fullscreenElement && target?.requestFullscreen) {
      void target.requestFullscreen();
      return;
    }
    if (document.exitFullscreen) void document.exitFullscreen();
  }

  function toggleThumbs() {
    setThumbsCollapsed((v) => !v);
  }

  function handleHotspotClick(hotspotId: string) {
    const arrow = currentPoint.arrows.find((item: NavigationArrow) => item.id === hotspotId);
    if (arrow) {
      goToPoint(arrow.toPointId, arrow.targetPan);
      return;
    }

    const infoHotspot = currentPoint.hotspots.find((item) => item.id === hotspotId);
    if (infoHotspot) setActiveHotspot(infoHotspot);
  }

  return (
    <main className={`tour-shell immersive-tour ${mode === "auto" ? "auto-mode" : "free-mode"}`}>
      <EquirectangularViewer
        fov={72}
        heading={heading}
        hotspots={viewerHotspots}
        interactionDisabled={mode === "auto"}
        onHotspotClick={(hotspot) => handleHotspotClick(hotspot.id)}
        pitch={0}
        preloadSrcs={preloadSources}
        ref={viewerRef}
        src={currentPoint.panorama}
        title={`${site.name} - ${currentPoint.name}`}
      />

      <div className="tour-atmosphere" aria-hidden="true" />

      <header className="tour-topbar">
        <Link href={`/di-tich/${site.slug}`} className="tour-back-button">
          ← Trang di tích
        </Link>
        <div className="tour-controls">
          <button
            className={`tour-mode-toggle ${mode === "auto" ? "active" : ""}`}
            onClick={() => setMode((currentMode) => (currentMode === "auto" ? "free" : "auto"))}
            type="button"
            aria-label={mode === "auto" ? "Dừng tham quan tự động" : "Phát tham quan tự động"}
            aria-pressed={mode === "auto"}
            title={mode === "auto" ? "Dừng" : "Phát"}
          >
            {mode === "auto" ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M6 6h5v12H6V6Zm7 0h5v12h-5V6Z" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            )}
          </button>
          <button
            className={`sound-toggle ${muted ? "muted" : ""}`}
            onClick={() => setMuted((value) => !value)}
            type="button"
            aria-pressed={muted}
            aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
            title={muted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="M11 5.5 7.2 8.7H4a1 1 0 0 0-1 1v4.6a1 1 0 0 0 1 1h3.2L11 18.5a1 1 0 0 0 1.6-.8V6.3a1 1 0 0 0-1.6-.8Zm6.1 1.2a1 1 0 0 1 1.4 0 7.8 7.8 0 0 1 0 11 1 1 0 1 1-1.4-1.4 5.8 5.8 0 0 0 0-8.2 1 1 0 0 1 0-1.4Zm-2.1 2.1a1 1 0 0 1 1.4 0 4.8 4.8 0 0 1 0 6.8 1 1 0 0 1-1.4-1.4 2.8 2.8 0 0 0 0-4 1 1 0 0 1 0-1.4Z" />
            </svg>
          </button>
          {!isMobile ? (
            <button
              className="fullscreen-control"
              onClick={toggleFullscreen}
              type="button"
              aria-label="Chế độ toàn màn hình"
            >
              Toàn màn hình
            </button>
          ) : null}
        </div>
      </header>

      <button
        className="thumbs-toggle"
        onClick={toggleThumbs}
        aria-pressed={thumbsCollapsed}
        aria-label={thumbsCollapsed ? "Mở danh sách điểm" : "Thu gọn danh sách điểm"}
        type="button"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <aside className="tour-point-pill">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <div>
          <strong>{currentPoint.name}</strong>
          <p>{mode === "auto" ? "Đang tự động dẫn tuyến" : "Đang ở chế độ tự do"}</p>
        </div>
      </aside>

      <nav
        className={`tour-thumbs ${thumbsCollapsed ? "collapsed" : "expanded"}`}
        aria-label="Danh sách điểm tham quan"
      >
        {publicPoints.map((point, index) => (
          <button
            className={point.id === currentPoint.id ? "tour-thumb active" : "tour-thumb"}
            key={point.id}
            onClick={() => goToPoint(point.id, point.initialPan)}
            type="button"
            aria-label={`${index + 1}. ${point.name}`}
          >
            <Image src={point.preview} alt={point.name} fill sizes="180px" />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{point.name}</strong>
          </button>
        ))}
      </nav>

      {currentPoint.narration ? (
        <audio className="sr-only" autoPlay={mode === "auto"} muted={muted} src={currentPoint.narration} />
      ) : null}

      {activeHotspot ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveHotspot(null)}>
          <article
            className="hotspot-modal premium-hotspot-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Đóng"
              className="modal-close"
              onClick={() => setActiveHotspot(null)}
              type="button"
            >
              ×
            </button>
            <p className="eyebrow">{hotspotLabel(activeHotspot.type)}</p>
            <h2>{activeHotspot.title}</h2>
            <p>{activeHotspot.content}</p>
            {activeHotspot.media ? (
              <div className="modal-media">
                <Image src={activeHotspot.media} alt={activeHotspot.title} fill sizes="520px" />
              </div>
            ) : null}
            {activeHotspot.audio ? <audio controls muted={muted} src={activeHotspot.audio} /> : null}
          </article>
        </div>
      ) : null}
    </main>
  );
}
