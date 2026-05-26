"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TourViewer } from "./TourViewer";
import type { HeritageSite } from "../lib/data";

export function HomeVRExperience({ site }: { site: HeritageSite }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <section className="section immersive-band">
        <button
          type="button"
          className="immersive-visual immersive-play-card immersive-launch-card"
          aria-label={`Mở trải nghiệm VR360 ${site.name}`}
          onClick={() => setOpen(true)}
        >
          <Image src="/vr360/Trước Cổng.jpg" alt="Điểm mở đầu tham quan VR360" fill sizes="(max-width: 760px) 100vw, 50vw" />
          <div className="immersive-play-overlay" aria-hidden="true" />
          <div className="immersive-play-center" aria-hidden="true">
            <span className="immersive-play-button">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
            <strong>CLICK ĐỂ THAM QUAN DỰ ÁN</strong>
            <p>Chạm để mở trực tiếp không gian VR360 ngay trong trang</p>
          </div>
          <div className="hud-panel hud-left">
            <span>VR360</span>
            <strong>{site.name}</strong>
          </div>
          <div className="hud-panel hud-right">
            <span>Trạng thái</span>
            <strong>Sẵn sàng phát</strong>
          </div>
        </button>

        <div className="immersive-copy">
          <p className="eyebrow">Trải nghiệm người dân</p>
          <h2>Nhấn để phát trải nghiệm VR360 ngay tại trang chủ</h2>
          <p>
            Khối trình bày này giờ hoạt động như một nút phát lớn: bấm vào là mở ngay
            không gian tham quan VR360 trong cùng trang, không cần chuyển sang trang khác.
          </p>
          <div className="benefit-list premium-benefits">
            <p>Thiết kế giống một preview video sang trọng với nút phát nổi bật ở giữa.</p>
            <p>Mở trực tiếp trong trang để người xem vào trải nghiệm nhanh hơn.</p>
            <p>Tối ưu lại cho mobile với nút lớn, label ngắn gọn và khoảng thở tốt hơn.</p>
          </div>
        </div>
      </section>

      {open ? (
        <div className="vr360-modal" role="dialog" aria-modal="true" aria-label={`Trải nghiệm VR360 ${site.name}`}>
          <button className="vr360-modal-close" type="button" aria-label="Đóng VR360" onClick={() => setOpen(false)}>
            ×
          </button>
          <div className="vr360-modal-stage">
            <TourViewer embedded site={site} />
          </div>
        </div>
      ) : null}
    </>
  );
}
