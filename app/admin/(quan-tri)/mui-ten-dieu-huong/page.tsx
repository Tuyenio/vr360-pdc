import Image from "next/image";
import { AdminFrame } from "../../components/AdminFrame";
import { getAllNavigationArrows, getAllTourPoints } from "../../../lib/data";

export default function AdminNavigationPage() {
  const arrows = getAllNavigationArrows();
  const points = getAllTourPoints();

  return (
    <AdminFrame eyebrow="Mũi tên điều hướng" title="Thiết lập chuyển điểm trong không gian VR360">
      <section className="admin-editor-preview full-editor">
        <div>
          <p className="eyebrow">Trực quan</p>
          <h2>Đặt mũi tên cố định theo tọa độ ảnh 360</h2>
          <p>
            Mũi tên được gắn vào không gian panorama bằng tọa độ yaw và pitch, không
            dính vào màn hình. Khi người xem xoay ảnh, mũi tên vẫn giữ đúng vị trí đã đặt.
          </p>
          <div className="admin-actions">
            <button type="button">Thêm mũi tên</button>
            <button type="button">Lưu tọa độ</button>
          </div>
        </div>
        <div className="editor-mock large">
          <Image src="/vr360/Sảnh trung tâm.jpg" alt="Ảnh toàn cảnh để đặt mũi tên" fill sizes="60vw" />
          <button className="mock-pin mock-pin-two" type="button">→</button>
          <button className="mock-pin mock-pin-three" type="button">→</button>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <p className="eyebrow">Danh sách</p>
            <h2>Mũi tên đã cấu hình</h2>
          </div>
          <button type="button">Tạo mũi tên</button>
        </div>
        <div className="admin-table compact-table">
          <div className="admin-row admin-row-head">
            <span>Tiêu đề</span>
            <span>Điểm hiện tại</span>
            <span>Hiệu ứng</span>
            <span>Tọa độ X</span>
            <span>Tọa độ Y</span>
            <span>Trạng thái</span>
          </div>
          {arrows.map((arrow) => (
            <div className="admin-row" key={arrow.id}>
              <strong>{arrow.title}</strong>
              <span>{arrow.fromPointName}</span>
              <span>{arrow.transitionEffect}</span>
              <span>{arrow.x}%</span>
              <span>{arrow.y}%</span>
              <span>{arrow.status === "published" ? "Hiển thị" : "Bản nháp"}</span>
            </div>
          ))}
        </div>
      </section>

      <form className="admin-form-panel wide-form">
        <p className="eyebrow">Biểu mẫu cấu hình</p>
        <h2>Thông tin mũi tên</h2>
        <div className="form-grid">
          <label>
            <span>Điểm hiện tại</span>
            <select defaultValue="Sân trung tâm">
              {points.map((point) => (
                <option key={point.id}>{point.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Điểm đích</span>
            <select defaultValue="Tiền đường">
              {points.map((point) => (
                <option key={point.id}>{point.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Tọa độ X</span>
            <input defaultValue="66" />
          </label>
          <label>
            <span>Tọa độ Y</span>
            <input defaultValue="60" />
          </label>
          <label>
            <span>Hiệu ứng chuyển cảnh</span>
            <select defaultValue="fade">
              <option>fade</option>
              <option>zoom</option>
              <option>slide</option>
            </select>
          </label>
        </div>
        <button className="primary-button" type="button">Lưu mũi tên</button>
      </form>
    </AdminFrame>
  );
}
