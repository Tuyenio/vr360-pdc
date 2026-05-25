import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

const audioRows = [
  { title: "Nhạc nền Chùa Liên Hoa", type: "Nhạc nền", target: "Chùa Liên Hoa", status: "Hiển thị" },
  { title: "Cổng tam quan", type: "Thuyết minh điểm", target: "Cổng tam quan", status: "Hiển thị" },
  { title: "Bia công đức", type: "Âm thanh hotspot", target: "Bia công đức", status: "Hiển thị" },
  { title: "Lời cảm ơn", type: "Âm thanh hệ thống", target: "Kết thúc tham quan", status: "Bản nháp" },
];

export default function AdminAudioPage() {
  return (
    <AdminFrame eyebrow="Quản lý âm thanh" title="Nhạc nền, thuyết minh và âm thanh hotspot">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Danh sách audio</p>
              <h2>Tệp âm thanh</h2>
            </div>
            <button type="button">Tải audio lên</button>
          </div>
          <div className="admin-table compact-table">
            <div className="admin-row admin-row-head">
              <span>Tên audio</span>
              <span>Loại</span>
              <span>Gắn với</span>
              <span>Tự phát</span>
              <span>Lặp lại</span>
              <span>Trạng thái</span>
            </div>
            {audioRows.map((row) => (
              <div className="admin-row" key={row.title}>
                <strong>{row.title}</strong>
                <span>{row.type}</span>
                <span>{row.target}</span>
                <span>{row.type === "Nhạc nền" ? "Có" : "Không"}</span>
                <span>{row.type === "Nhạc nền" ? "Có" : "Không"}</span>
                <span>{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel">
          <p className="eyebrow">Cấu hình phát</p>
          <h2>Thông tin audio</h2>
          <label>
            <span>Tên audio</span>
            <input defaultValue="Thuyết minh Tiền đường" />
          </label>
          <label>
            <span>Loại âm thanh</span>
            <select defaultValue="Thuyết minh điểm">
              <option>Nhạc nền</option>
              <option>Thuyết minh điểm</option>
              <option>Âm thanh hotspot</option>
            </select>
          </label>
          <label>
            <span>Thuộc di tích</span>
            <select defaultValue="Chùa Liên Hoa">
              {heritageSites.map((site) => (
                <option key={site.id}>{site.name}</option>
              ))}
            </select>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Tự động phát khi vào điểm</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Cho phép người xem bật/tắt</span>
          </label>
          <button className="primary-button" type="button">Lưu cấu hình</button>
        </form>
      </section>
    </AdminFrame>
  );
}
