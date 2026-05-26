"use client";

import { useMemo, useState } from "react";
import { EquirectangularViewer, type ViewerHotspot } from "../../components/EquirectangularViewer";
import type { HeritageSite, HotspotType, TourPoint } from "../../lib/data";

type Focus = "points" | "navigation" | "hotspots";

function yawFromPercent(item: { x?: number; yaw?: number }) {
  return item.yaw ?? ((item.x ?? 50) / 100) * 360;
}

function pitchFromPercent(item: { y?: number; pitch?: number }) {
  return item.pitch ?? (50 - (item.y ?? 50)) * 1.25;
}

function statusLabel(status: string) {
  if (status === "published") return "Đang hiển thị";
  if (status === "hidden") return "Đang ẩn";
  return "Bản nháp";
}

export function AdminTourBuilder({ sites, focus = "points" }: { sites: HeritageSite[]; focus?: Focus }) {
  const [siteId, setSiteId] = useState(sites[0]?.id ?? "");
  const selectedSite = sites.find((site) => site.id === siteId) ?? sites[0];
  const [pointId, setPointId] = useState(selectedSite?.tourPoints[0]?.id ?? "");
  const selectedPoint =
    selectedSite?.tourPoints.find((point) => point.id === pointId) ?? selectedSite?.tourPoints[0];
  const [coordinate, setCoordinate] = useState({ yaw: 112, pitch: -10 });
  const [hotspotType, setHotspotType] = useState<HotspotType>("text");
  const [message, setMessage] = useState("Nhấn lên ảnh 360 để lấy tọa độ chính xác cho mũi tên hoặc hotspot.");

  const previewHotspots = useMemo<ViewerHotspot[]>(() => {
    if (!selectedPoint) return [];

    return [
      ...selectedPoint.arrows.map((arrow) => {
        const target = selectedSite.tourPoints.find((point) => point.id === arrow.toPointId);
        return {
          id: arrow.id,
          title: arrow.title,
          yaw: yawFromPercent(arrow),
          pitch: pitchFromPercent(arrow),
          type: "navigation" as const,
          thumbnail: target?.preview,
          variant: "arrow" as const,
        };
      }),
      ...selectedPoint.hotspots.map((hotspot) => ({
        id: hotspot.id,
        title: hotspot.title,
        yaw: yawFromPercent(hotspot),
        pitch: pitchFromPercent(hotspot),
        type: "info" as const,
        variant: hotspot.type === "audio" ? ("audio" as const) : ("book" as const),
      })),
      {
        id: "draft-coordinate",
        title: "Tọa độ đang chọn",
        yaw: coordinate.yaw,
        pitch: coordinate.pitch,
        type: "info" as const,
        variant: "temple" as const,
      },
    ];
  }, [coordinate, selectedPoint, selectedSite]);

  if (!selectedSite || !selectedPoint) {
    return <div className="empty-state">Chưa có dữ liệu để dựng tour VR360.</div>;
  }

  return (
    <div className="tour-builder">
      <section className="builder-flow">
        {["Hồ sơ", "Điểm VR360", "Điều hướng", "Hotspot", "Xuất bản"].map((step, index) => (
          <span
            className={index <= (focus === "points" ? 1 : focus === "navigation" ? 2 : 3) ? "active" : ""}
            key={step}
          >
            {String(index + 1).padStart(2, "0")} {step}
          </span>
        ))}
      </section>

      <section className="builder-hero-grid">
        <div className="builder-viewer-panel">
          <div className="builder-viewer-toolbar">
            <div>
              <p className="eyebrow">Trình dựng VR360</p>
              <h2>{selectedPoint.name}</h2>
            </div>
            <div className="builder-coordinate">
              <span>yaw {coordinate.yaw.toFixed(1)}</span>
              <span>pitch {coordinate.pitch.toFixed(1)}</span>
            </div>
          </div>
          <div className="admin-vr-canvas">
            <EquirectangularViewer
              debugHotspots
              fov={72}
              heading={selectedPoint.initialPan}
              hotspots={previewHotspots}
              onDebugCoordinate={(next) => {
                setCoordinate(next);
                setMessage("Đã lấy tọa độ từ ảnh 360. Có thể dùng ngay cho mũi tên hoặc hotspot.");
              }}
              pitch={0}
              src={selectedPoint.panorama}
              title={selectedPoint.name}
            />
          </div>
          <p className="builder-note">{message}</p>
        </div>

        <aside className="builder-inspector">
          <label>
            <span>Di tích đang biên tập</span>
            <select
              value={selectedSite.id}
              onChange={(event) => {
                const nextSite = sites.find((site) => site.id === event.target.value) ?? sites[0];
                setSiteId(event.target.value);
                setPointId(nextSite?.tourPoints[0]?.id ?? "");
              }}
            >
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Điểm VR360</span>
            <select value={selectedPoint.id} onChange={(event) => setPointId(event.target.value)}>
              {selectedSite.tourPoints.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.name}
                </option>
              ))}
            </select>
          </label>
          <div className="builder-stat-grid">
            <span>
              <strong>{selectedSite.tourPoints.length}</strong>
              Điểm VR360
            </span>
            <span>
              <strong>{selectedSite.tourPoints.reduce((total, point) => total + point.arrows.length, 0)}</strong>
              Mũi tên
            </span>
            <span>
              <strong>{selectedSite.tourPoints.reduce((total, point) => total + point.hotspots.length, 0)}</strong>
              Hotspot
            </span>
          </div>
        </aside>
      </section>

      <section className="builder-forms-grid">
        <form className={focus === "points" ? "admin-form-panel active-builder-form" : "admin-form-panel"}>
          <p className="eyebrow">Điểm tham quan</p>
          <h2>Ảnh panorama và điểm bắt đầu</h2>
          <label>
            <span>Tên điểm</span>
            <input defaultValue={selectedPoint.name} />
          </label>
          <label>
            <span>Ảnh VR360</span>
            <input defaultValue={selectedPoint.panorama} />
          </label>
          <label>
            <span>Mô tả ngắn</span>
            <textarea defaultValue={selectedPoint.description} />
          </label>
          <div className="form-grid">
            <label>
              <span>Yaw ban đầu</span>
              <input defaultValue={selectedPoint.initialPan} />
            </label>
            <label>
              <span>Trạng thái</span>
              <select defaultValue={selectedPoint.status}>
                <option value="published">Đang hiển thị</option>
                <option value="draft">Bản nháp</option>
                <option value="hidden">Đang ẩn</option>
              </select>
            </label>
          </div>
          <button className="primary-button" type="button">
            Lưu điểm VR360
          </button>
        </form>

        <form className={focus === "navigation" ? "admin-form-panel active-builder-form" : "admin-form-panel"}>
          <p className="eyebrow">Mũi tên điều hướng</p>
          <h2>Gắn vào không gian 360</h2>
          <label>
            <span>Tiêu đề mũi tên</span>
            <input defaultValue={selectedPoint.arrows[0]?.title ?? "Đi tới điểm tiếp theo"} />
          </label>
          <label>
            <span>Điểm đích</span>
            <select defaultValue={selectedPoint.arrows[0]?.toPointId ?? selectedPoint.id}>
              {selectedSite.tourPoints.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-grid">
            <label>
              <span>Yaw</span>
              <input value={coordinate.yaw.toFixed(1)} readOnly />
            </label>
            <label>
              <span>Pitch</span>
              <input value={coordinate.pitch.toFixed(1)} readOnly />
            </label>
            <label>
              <span>Hiệu ứng</span>
              <select defaultValue="fade">
                <option value="fade">Fade</option>
                <option value="zoom">Zoom</option>
                <option value="slide">Slide</option>
              </select>
            </label>
          </div>
          <button className="primary-button" type="button">
            Gắn mũi tên
          </button>
        </form>

        <form className={focus === "hotspots" ? "admin-form-panel active-builder-form" : "admin-form-panel"}>
          <p className="eyebrow">Hotspot tư liệu</p>
          <h2>Thông tin, ảnh, video, audio</h2>
          <label>
            <span>Loại hotspot</span>
            <select value={hotspotType} onChange={(event) => setHotspotType(event.target.value as HotspotType)}>
              <option value="text">Văn bản</option>
              <option value="image">Ảnh tư liệu</option>
              <option value="gallery">Album ảnh</option>
              <option value="video">Video</option>
              <option value="audio">Thuyết minh</option>
              <option value="document">Tài liệu</option>
            </select>
          </label>
          <label>
            <span>Tiêu đề</span>
            <input defaultValue={selectedPoint.hotspots[0]?.title ?? "Điểm giới thiệu"} />
          </label>
          <label>
            <span>Nội dung mô tả</span>
            <textarea defaultValue={selectedPoint.hotspots[0]?.content ?? ""} />
          </label>
          <div className="form-grid">
            <label>
              <span>Yaw</span>
              <input value={coordinate.yaw.toFixed(1)} readOnly />
            </label>
            <label>
              <span>Pitch</span>
              <input value={coordinate.pitch.toFixed(1)} readOnly />
            </label>
          </div>
          <button className="primary-button" type="button">
            Gắn hotspot
          </button>
        </form>
      </section>

      <section className="builder-data-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Danh sách điểm</p>
              <h2>Cấu trúc tour hiện tại</h2>
            </div>
            <button type="button">Xuất bản</button>
          </div>
          <div className="admin-table compact-table builder-table">
            <div className="admin-row admin-row-head">
              <span>Tên điểm</span>
              <span>Yaw đầu</span>
              <span>Mũi tên</span>
              <span>Hotspot</span>
              <span>Trạng thái</span>
            </div>
            {selectedSite.tourPoints.map((point: TourPoint) => (
              <button
                className={point.id === selectedPoint.id ? "admin-row active-row" : "admin-row"}
                key={point.id}
                onClick={() => setPointId(point.id)}
                type="button"
              >
                <strong>{point.name}</strong>
                <span>{point.initialPan}°</span>
                <span>{point.arrows.length}</span>
                <span>{point.hotspots.length}</span>
                <span>{statusLabel(point.status)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Không gian đang chọn</p>
              <h2>Mũi tên và hotspot</h2>
            </div>
          </div>
          <div className="builder-mini-list">
            {[...selectedPoint.arrows, ...selectedPoint.hotspots].map((item) => (
              <span key={item.id}>
                <strong>{item.title}</strong>
                <small>
                  yaw {yawFromPercent(item).toFixed(1)} · pitch {pitchFromPercent(item).toFixed(1)}
                </small>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
