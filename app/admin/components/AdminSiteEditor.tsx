"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { HeritageSite, PublishStatus } from "../../lib/data";

function statusLabel(status: PublishStatus) {
  if (status === "published") return "Đang hiển thị";
  if (status === "hidden") return "Đang ẩn";
  return "Bản nháp";
}

export function AdminSiteEditor({ sites }: { sites: HeritageSite[] }) {
  const [selectedSiteId, setSelectedSiteId] = useState(sites[0]?.id ?? "");
  const selectedSite = useMemo(
    () => sites.find((site) => site.id === selectedSiteId) ?? sites[0],
    [selectedSiteId, sites],
  );
  const [draft, setDraft] = useState({
    name: selectedSite?.name ?? "",
    slug: selectedSite?.slug ?? "",
    address: selectedSite?.address ?? "",
    shortDescription: selectedSite?.shortDescription ?? "",
    content: selectedSite?.content.join("\n\n") ?? "",
    status: selectedSite?.status ?? "published",
  });

  function selectSite(site: HeritageSite) {
    setSelectedSiteId(site.id);
    setDraft({
      name: site.name,
      slug: site.slug,
      address: site.address,
      shortDescription: site.shortDescription,
      content: site.content.join("\n\n"),
      status: site.status,
    });
  }

  if (!selectedSite) {
    return <div className="empty-state">Chưa có dữ liệu di tích để quản lý.</div>;
  }

  return (
    <section className="admin-workspace">
      <div className="admin-panel admin-data-panel">
        <div className="admin-panel-head">
          <div>
            <p className="eyebrow">Bảng dữ liệu</p>
            <h2>Di tích trong hệ thống</h2>
          </div>
          <button type="button">Thêm di tích</button>
        </div>

        <div className="admin-status-tabs" aria-label="Lọc trạng thái">
          <button className="active" type="button">Tất cả</button>
          <button type="button">Đang hiển thị</button>
          <button type="button">Bản nháp</button>
          <button type="button">Đang ẩn</button>
        </div>

        <div className="admin-table site-editor-table">
          <div className="admin-row admin-row-head">
            <span>Ảnh</span>
            <span>Tên di tích</span>
            <span>Loại</span>
            <span>Trạng thái</span>
            <span>Điểm VR360</span>
            <span>Hành động</span>
          </div>
          {sites.map((site) => (
            <div
              className={site.id === selectedSite.id ? "admin-row active-row" : "admin-row"}
              key={site.id}
              onClick={() => selectSite(site)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") selectSite(site);
              }}
            >
              <span className="admin-thumb">
                <Image src={site.thumbnail} alt={site.name} fill sizes="80px" />
              </span>
              <strong>{site.name}</strong>
              <span>{site.type}</span>
              <span>{statusLabel(site.status)}</span>
              <span>{site.tourPoints.length}</span>
              <span className="admin-actions">
                <Link href={`/di-tich/${site.slug}`}>Xem</Link>
                <span>Sửa</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <form className="admin-form-panel admin-edit-panel">
        <div className="admin-edit-preview">
          <Image src={selectedSite.banner} alt={selectedSite.name} fill sizes="420px" />
          <div>
            <span>{selectedSite.type}</span>
            <strong>{draft.name}</strong>
          </div>
        </div>

        <p className="eyebrow">Biểu mẫu nội dung</p>
        <h2>Chỉnh sửa thông tin di tích</h2>
        <label>
          <span>Tên di tích</span>
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        </label>
        <label>
          <span>Đường dẫn</span>
          <input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} />
        </label>
        <label>
          <span>Địa chỉ</span>
          <input value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} />
        </label>
        <label>
          <span>Mô tả ngắn</span>
          <textarea
            value={draft.shortDescription}
            onChange={(event) => setDraft({ ...draft, shortDescription: event.target.value })}
          />
        </label>
        <label>
          <span>Bài giới thiệu</span>
          <textarea value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} />
        </label>
        <label>
          <span>Trạng thái</span>
          <select
            value={draft.status}
            onChange={(event) => setDraft({ ...draft, status: event.target.value as PublishStatus })}
          >
            <option value="published">Đang hiển thị</option>
            <option value="draft">Bản nháp</option>
            <option value="hidden">Đang ẩn</option>
          </select>
        </label>

        <div className="admin-form-actions">
          <button type="button">Lưu nháp</button>
          <button className="primary-button compact" type="button">Cập nhật nội dung</button>
        </div>
      </form>

      <aside className="admin-live-preview">
        <p className="eyebrow">Xem trước công khai</p>
        <h2>{draft.name}</h2>
        <p>{draft.shortDescription}</p>
        <div className="preview-meta-grid">
          <span>
            <strong>{selectedSite.tourPoints.length}</strong>
            Điểm VR360
          </span>
          <span>
            <strong>{selectedSite.spatialPlan.length}</strong>
            Cụm số hóa
          </span>
        </div>
        <Link className="secondary-button" href={`/di-tich/${selectedSite.slug}`}>
          Mở trang người dùng
        </Link>
      </aside>
    </section>
  );
}
