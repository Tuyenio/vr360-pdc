import Image from "next/image";
import Link from "next/link";
import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

export default function AdminSitesPage() {
  return (
    <AdminFrame eyebrow="Quản lý di tích" title="Danh sách di tích và trạng thái xuất bản">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Bảng dữ liệu</p>
              <h2>Di tích trong hệ thống</h2>
            </div>
            <button type="button">Thêm di tích</button>
          </div>
          <div className="admin-table">
            <div className="admin-row admin-row-head">
              <span>Ảnh</span>
              <span>Tên di tích</span>
              <span>Loại</span>
              <span>Trạng thái</span>
              <span>Điểm VR360</span>
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
                <span>{site.tourPoints.length}</span>
                <span className="admin-actions">
                  <Link href={`/di-tich/${site.slug}`}>Xem</Link>
                  <button type="button">Sửa</button>
                  <button type="button">Ẩn/hiện</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel">
          <p className="eyebrow">Biểu mẫu</p>
          <h2>Thông tin di tích</h2>
          <label>
            <span>Tên di tích</span>
            <input defaultValue="Chùa Liên Hoa" />
          </label>
          <label>
            <span>Đường dẫn</span>
            <input defaultValue="chua-lien-hoa" />
          </label>
          <label>
            <span>Loại di tích</span>
            <select defaultValue="Chùa">
              <option>Chùa</option>
              <option>Đình</option>
              <option>Đền</option>
              <option>Miếu</option>
              <option>Di tích lịch sử</option>
            </select>
          </label>
          <label>
            <span>Mô tả ngắn</span>
            <textarea defaultValue="Không gian tín ngưỡng tiêu biểu của phường Định Công." />
          </label>
          <label>
            <span>Trạng thái</span>
            <select defaultValue="Đang hiển thị">
              <option>Đang hiển thị</option>
              <option>Bản nháp</option>
              <option>Ẩn</option>
            </select>
          </label>
          <button className="primary-button" type="button">Lưu thông tin</button>
        </form>
      </section>
    </AdminFrame>
  );
}
