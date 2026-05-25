import { AdminFrame } from "../../components/AdminFrame";
import { getAllHotspots, getAllTourPoints } from "../../../lib/data";

export default function AdminHotspotPage() {
  const hotspots = getAllHotspots();
  const points = getAllTourPoints();

  return (
    <AdminFrame eyebrow="Hotspot giới thiệu" title="Quản lý điểm thông tin trong ảnh 360">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Danh sách hotspot</p>
              <h2>Nội dung gắn trên panorama</h2>
            </div>
            <button type="button">Thêm hotspot</button>
          </div>
          <div className="admin-table compact-table">
            <div className="admin-row admin-row-head">
              <span>Tiêu đề</span>
              <span>Loại</span>
              <span>Điểm VR360</span>
              <span>X</span>
              <span>Y</span>
              <span>Trạng thái</span>
            </div>
            {hotspots.map((hotspot) => (
              <div className="admin-row" key={hotspot.id}>
                <strong>{hotspot.title}</strong>
                <span>{hotspot.type}</span>
                <span>{hotspot.tourPointName}</span>
                <span>{hotspot.x}%</span>
                <span>{hotspot.y}%</span>
                <span>{hotspot.status === "published" ? "Hiển thị" : "Bản nháp"}</span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel">
          <p className="eyebrow">Biểu mẫu</p>
          <h2>Nội dung hotspot</h2>
          <label>
            <span>Thuộc điểm VR360</span>
            <select defaultValue="Tiền đường">
              {points.map((point) => (
                <option key={point.id}>{point.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Loại hotspot</span>
            <select defaultValue="text">
              <option>text</option>
              <option>image</option>
              <option>gallery</option>
              <option>video</option>
              <option>audio</option>
              <option>document</option>
            </select>
          </label>
          <label>
            <span>Tiêu đề</span>
            <input defaultValue="Hoành phi, câu đối" />
          </label>
          <label>
            <span>Nội dung mô tả</span>
            <textarea defaultValue="Các mảng chữ Hán Nôm và trang trí gợi mở giá trị nghệ thuật của di tích." />
          </label>
          <div className="form-grid">
            <label>
              <span>Tọa độ X</span>
              <input defaultValue="55" />
            </label>
            <label>
              <span>Tọa độ Y</span>
              <input defaultValue="32" />
            </label>
          </div>
          <button className="primary-button" type="button">Lưu hotspot</button>
        </form>
      </section>
    </AdminFrame>
  );
}
