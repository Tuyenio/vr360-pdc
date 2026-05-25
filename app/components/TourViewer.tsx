"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { HeritageSite, Hotspot } from "../lib/data";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function hotspotLabel(type: Hotspot["type"]) {
  if (type === "audio") return "Thuyết minh";
  if (type === "image") return "Ảnh tư liệu";
  if (type === "gallery") return "Album ảnh";
  if (type === "video") return "Video";
  if (type === "document") return "Tư liệu";
  return "Thông tin";
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
  const [pan, setPan] = useState(currentPoint?.initialPan ?? 0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [muted, setMuted] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const dragStart = useRef<{ x: number; pan: number } | null>(null);

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

  function goToPoint(pointId: string, targetPan: number) {
    setActiveHotspot(null);
    setCurrentPointId(pointId);
    setPan(targetPan);
  }

  function toggleFullscreen() {
    const target = document.querySelector(".tour-shell");
    if (!document.fullscreenElement && target?.requestFullscreen) {
      void target.requestFullscreen();
      return;
    }

    if (document.exitFullscreen) {
      void document.exitFullscreen();
    }
  }

  return (
    <main className="tour-shell">
      <div
        className="panorama-viewport"
        onPointerDown={(event) => {
          dragStart.current = { x: event.clientX, pan };
          event.currentTarget.setPointerCapture(event.pointerId);
          setShowGuide(false);
        }}
        onPointerMove={(event) => {
          if (!dragStart.current) return;
          const delta = event.clientX - dragStart.current.x;
          setPan(clamp(dragStart.current.pan - delta / 8, 0, 58));
        }}
        onPointerUp={() => {
          dragStart.current = null;
        }}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
      >
        <div className="panorama-plane" style={{ transform: `translateX(-${pan}%)` }}>
          <Image
            src={currentPoint.panorama}
            alt={currentPoint.name}
            fill
            priority
            sizes="220vw"
            className="panorama-image"
          />

          {currentPoint.arrows
            .filter((arrow) => arrow.status === "published")
            .map((arrow) => {
              const target = publicPoints.find((point) => point.id === arrow.toPointId);
              return (
                <button
                  className="tour-marker arrow-marker"
                  key={arrow.id}
                  onClick={() => goToPoint(arrow.toPointId, arrow.targetPan)}
                  style={{ left: `${arrow.x}%`, top: `${arrow.y}%` }}
                  type="button"
                >
                  <span className="marker-icon">→</span>
                  <span className="marker-preview">
                    {target ? (
                      <>
                        <Image src={target.preview} alt={target.name} fill sizes="180px" />
                        <strong>{arrow.title}</strong>
                      </>
                    ) : (
                      <strong>{arrow.title}</strong>
                    )}
                  </span>
                </button>
              );
            })}

          {currentPoint.hotspots
            .filter((hotspot) => hotspot.status === "published")
            .map((hotspot) => (
              <button
                className="tour-marker info-marker"
                key={hotspot.id}
                onClick={() => setActiveHotspot(hotspot)}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                type="button"
              >
                <span className="marker-icon">{hotspot.type === "audio" ? "♪" : "i"}</span>
                <span className="marker-title">{hotspot.title}</span>
              </button>
            ))}
        </div>
      </div>

      <header className="tour-topbar">
        <div>
          <Link href={`/di-tich/${site.slug}`} className="back-link on-dark-text">
            ← Quay lại trang di tích
          </Link>
          <h1>{site.name}</h1>
          <p>{currentPoint.name}</p>
        </div>
        <div className="tour-controls">
          <button onClick={() => setMuted((value) => !value)} type="button">
            {muted ? "Bật âm thanh" : "Tắt âm thanh"}
          </button>
          <button onClick={toggleFullscreen} type="button">
            Toàn màn hình
          </button>
        </div>
      </header>

      {showGuide ? (
        <div className="tour-guide">
          <strong>Hướng dẫn nhanh</strong>
          <span>Kéo ngang để xoay không gian, chọn mũi tên để di chuyển, chọn biểu tượng thông tin để xem tư liệu.</span>
        </div>
      ) : null}

      <aside className="tour-side-panel">
        <p className="eyebrow">Điểm đang xem</p>
        <h2>{currentPoint.name}</h2>
        <p>{currentPoint.description}</p>
        <label className="range-field">
          <span>Điều chỉnh góc nhìn</span>
          <input min="0" max="58" type="range" value={pan} onChange={(event) => setPan(Number(event.target.value))} />
        </label>
        {currentPoint.narration ? (
          <audio className="tour-audio-panel" controls muted={muted} key={currentPoint.narration} src={currentPoint.narration} />
        ) : null}
      </aside>

      <nav className="tour-thumbs" aria-label="Danh sách điểm tham quan">
        {publicPoints.map((point) => (
          <button
            className={point.id === currentPoint.id ? "tour-thumb active" : "tour-thumb"}
            key={point.id}
            onClick={() => goToPoint(point.id, point.initialPan)}
            type="button"
          >
            <Image src={point.preview} alt={point.name} fill sizes="160px" />
            <span>{point.name}</span>
          </button>
        ))}
      </nav>

      {site.backgroundMusic ? <audio loop muted={muted} src={site.backgroundMusic} /> : null}

      {activeHotspot ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveHotspot(null)}>
          <article className="hotspot-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveHotspot(null)} type="button" aria-label="Đóng">
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
