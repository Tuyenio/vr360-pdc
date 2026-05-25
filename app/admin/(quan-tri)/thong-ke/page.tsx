import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

export default function AdminStatsPage() {
  const totalViews = heritageSites.reduce((sum, site) => sum + site.views, 0);

  return (
    <AdminFrame eyebrow="Thống kê truy cập" title="Theo dõi lượt xem và hiệu quả nội dung">
      <div className="admin-stat-grid">
        <article className="admin-stat">
          <span>Lượt xem toàn hệ thống</span>
          <strong>{totalViews.toLocaleString("vi-VN")}</strong>
        </article>
        <article className="admin-stat">
          <span>Di tích xem nhiều nhất</span>
          <strong>Chùa Liên Hoa</strong>
        </article>
        <article className="admin-stat">
          <span>Thiết bị di động</span>
          <strong>64%</strong>
        </article>
        <article className="admin-stat">
          <span>Thời lượng trung bình</span>
          <strong>04:32</strong>
        </article>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <p className="eyebrow">Báo cáo</p>
            <h2>Lượt xem theo di tích</h2>
          </div>
          <button type="button">Xuất báo cáo</button>
        </div>
        <div className="stats-bars">
          {heritageSites.map((site) => (
            <div className="stats-bar-row" key={site.id}>
              <span>{site.name}</span>
              <div>
                <i style={{ width: `${Math.max(18, (site.views / totalViews) * 100)}%` }} />
              </div>
              <strong>{site.views.toLocaleString("vi-VN")}</strong>
            </div>
          ))}
        </div>
      </section>
    </AdminFrame>
  );
}
