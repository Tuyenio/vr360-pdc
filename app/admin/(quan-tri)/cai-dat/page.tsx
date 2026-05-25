import { AdminFrame } from "../../components/AdminFrame";

export default function AdminSettingsPage() {
  return (
    <AdminFrame eyebrow="Cài đặt hệ thống" title="Thông tin nhận diện và cấu hình công khai">
      <section className="admin-two-column">
        <form className="admin-form-panel">
          <p className="eyebrow">Nhận diện</p>
          <h2>Thông tin website</h2>
          <label>
            <span>Tên hệ thống</span>
            <input defaultValue="Số hóa di tích lịch sử, văn hóa phường Định Công" />
          </label>
          <label>
            <span>Đơn vị quản lý</span>
            <input defaultValue="UBND phường Định Công" />
          </label>
          <label>
            <span>Màu chủ đạo</span>
            <select defaultValue="Xanh hành chính">
              <option>Xanh hành chính</option>
              <option>Đỏ truyền thống</option>
              <option>Vàng di sản</option>
            </select>
          </label>
          <button className="primary-button" type="button">Lưu cài đặt</button>
        </form>

        <section className="admin-panel">
          <p className="eyebrow">Bảo mật</p>
          <h2>Quy tắc vận hành</h2>
          <div className="settings-list">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Yêu cầu đăng nhập khi truy cập khu vực admin</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Chỉ hiển thị nội dung đã xuất bản ở website công khai</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Ghi nhật ký khi quản trị viên cập nhật dữ liệu</span>
            </label>
          </div>
        </section>
      </section>
    </AdminFrame>
  );
}
