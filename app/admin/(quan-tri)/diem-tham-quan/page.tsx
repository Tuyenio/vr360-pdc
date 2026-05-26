import Image from "next/image";
import { AdminFrame } from "../../components/AdminFrame";
import { getAllTourPoints, heritageSites } from "../../../lib/data";

export default function AdminTourPointsPage() {
  const points = getAllTourPoints();

  return (
    <AdminFrame eyebrow="Điểm tham quan VR360" title="Quản lý ảnh toàn cảnh và điểm dừng">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Danh sách điểm</p>
              <h2>Các vị trí VR360</h2>
            </div>
            <button type="button">Thêm điểm</button>
          </div>
          <div className="admin-table compact-table">
            <div className="admin-row admin-row-head">
              <span>Ảnh</span>
              <span>Tên điểm</span>
              <span>Di tích</span>
              <span>Bắt đầu</span>
              <span>Trạng thái</span>
              <span>Góc nhìn</span>
            </div>
            {points.map((point) => (
              <div className="admin-row" key={point.id}>
                <span className="admin-thumb">
                  <Image src={point.preview} alt={point.name} fill sizes="80px" />
                </span>
                <strong>{point.name}</strong>
                <span>{point.heritageSiteName}</span>
                <span>{point.isStartPoint ? "Có" : "Không"}</span>
                <span>{point.status === "published" ? "Hiển thị" : "Bản nháp"}</span>
                <span>{point.initialPan}°</span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel">
          <p className="eyebrow">Cấu hình điểm</p>
          <h2>Ảnh panorama</h2>
          <label>
            <span>Thuộc di tích</span>
            <select defaultValue="Chùa Định Công (Định Công Tự)">
              {heritageSites.map((site) => (
                <option key={site.id}>{site.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Tên điểm</span>
            <input defaultValue="Sân trung tâm" />
          </label>
          <label>
            <span>Ảnh VR360</span>
            <input defaultValue="/vr360/Sảnh trung tâm.jpg" />
          </label>
          <label>
            <span>Góc nhìn ban đầu</span>
            <input defaultValue="28" />
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Đặt làm điểm bắt đầu</span>
          </label>
          <button className="primary-button" type="button">Lưu điểm tham quan</button>
        </form>
      </section>
    </AdminFrame>
  );
}
