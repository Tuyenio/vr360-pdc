import Image from "next/image";
import Link from "next/link";
import { AdminFrame } from "../../components/AdminFrame";
import { getAllHotspots, getAllNavigationArrows, getAllTourPoints, heritageSites } from "../../../lib/data";

const stats = [
  { label: "Tổng số di tích", value: heritageSites.length },
  { label: "Điểm VR360", value: getAllTourPoints().length },
  { label: "Mũi tên điều hướng", value: getAllNavigationArrows().length },
  { label: "Hotspot thông tin", value: getAllHotspots().length },
];

export default function DashboardPage() {
  return (
    <AdminFrame eyebrow="Dashboard quản trị" title="Tổng quan hệ thống VR360">
      <div className="admin-stat-grid">
        {stats.map((stat) => (
          <article className="admin-stat" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <p className="eyebrow">Nội dung gần đây</p>
            <h2>Di tích đang quản lý</h2>
          </div>
          <Link className="primary-button compact" href="/admin/di-tich">
            Quản lý di tích
          </Link>
        </div>
        <div className="admin-table">
          <div className="admin-row admin-row-head">
            <span>Ảnh</span>
            <span>Tên di tích</span>
            <span>Loại</span>
            <span>Trạng thái</span>
            <span>Cập nhật</span>
            <span>Hành động</span>
          </div>
          {heritageSites.map((site) => (
            <div className="admin-row" key={site.id}>
              <span className="admin-thumb">
                <Image src={site.thumbnail} alt={site.name} fill sizes="80px" />
              </span>
              <strong>{site.name}</strong>
              <span>{site.type}</span>
              <span>{site.status === "published" ? "Đang hiển thị" : "Bản nháp"}</span>
              <span>{site.updatedAt}</span>
              <span className="admin-actions">
                <Link href={`/di-tich/${site.slug}`}>Xem</Link>
                <Link href="/admin/di-tich">Sửa</Link>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-editor-preview">
        <div>
          <p className="eyebrow">Trình chỉnh sửa VR360</p>
          <h2>Đặt mũi tên và hotspot theo tọa độ không gian</h2>
          <p>
            Giao diện quản trị mô phỏng luồng thao tác: chọn điểm VR360, xoay đến vị trí
            mong muốn, thêm mũi tên hoặc hotspot, sau đó lưu tọa độ yaw, pitch và trạng thái hiển thị.
          </p>
        </div>
        <div className="editor-mock">
          <Image src="/vr360/Sảnh trung tâm.jpg" alt="Trình chỉnh sửa VR360" fill sizes="50vw" />
          <button className="mock-pin mock-pin-one" type="button">+</button>
          <button className="mock-pin mock-pin-two" type="button">→</button>
          <aside>
            <strong>Cấu hình hotspot</strong>
            <span>Loại: thông tin</span>
            <span>Yaw: 42.8</span>
            <span>Pitch: -6.2</span>
            <span>Trạng thái: hiển thị</span>
          </aside>
        </div>
      </section>
    </AdminFrame>
  );
}
