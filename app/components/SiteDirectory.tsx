"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { HeritageSite } from "../lib/data";

const filters = ["Tất cả", "Chùa", "Đình", "Đền", "Miếu", "Nhà thờ họ", "Di tích lịch sử"];

export function SiteDirectory({ sites }: { sites: HeritageSite[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tất cả");

  const filteredSites = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sites.filter((site) => {
      const matchesType = filter === "Tất cả" || site.type === filter;
      const matchesQuery =
        !normalizedQuery ||
        `${site.name} ${site.address} ${site.shortDescription}`.toLowerCase().includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [filter, query, sites]);

  return (
    <section className="section" id="danh-sach">
      <div className="section-heading">
        <p className="eyebrow">Danh sách di tích</p>
        <h2>Chọn một không gian để bắt đầu tham quan</h2>
        <p>
          Tìm kiếm theo tên, lọc theo loại hình và truy cập nhanh vào trang giới thiệu
          hoặc giao diện VR360 của từng di tích.
        </p>
      </div>

      <div className="directory-tools">
        <label className="search-field">
          <span>Tìm kiếm</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nhập tên di tích, địa chỉ..."
          />
        </label>

        <div className="filter-row" aria-label="Lọc loại di tích">
          {filters.map((item) => (
            <button
              className={filter === item ? "filter-chip active" : "filter-chip"}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="site-grid">
        {filteredSites.map((site) => (
          <article className="site-card reveal-card" key={site.id}>
            <Link className="site-image" href={`/di-tich/${site.slug}`} aria-label={`Xem ${site.name}`}>
              <Image src={site.thumbnail} alt={site.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
              {site.tourPoints.length ? <span className="tour-ready-pill">Có tham quan 360</span> : null}
            </Link>
            <div className="site-card-body">
              <div className="card-meta">
                <span>{site.type}</span>
                <span>Phường Định Công</span>
              </div>
              <h3>{site.name}</h3>
              <p>{site.shortDescription}</p>
              <p className="address">{site.address}</p>
              <div className="card-actions">
                <Link className="secondary-button" href={`/di-tich/${site.slug}`}>
                  Xem chi tiết
                </Link>
                <Link
                  className={site.tourPoints.length ? "primary-button compact" : "primary-button compact disabled"}
                  href={site.tourPoints.length ? `/tham-quan/${site.slug}` : `/di-tich/${site.slug}`}
                >
                  Tham quan VR360
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredSites.length === 0 ? (
        <div className="empty-state">Chưa có di tích phù hợp với bộ lọc hiện tại.</div>
      ) : null}
    </section>
  );
}
