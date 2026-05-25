import { AdminFrame } from "../../components/AdminFrame";

const users = [
  { name: "Quản trị hệ thống", email: "admin@dinhcong.gov.vn", role: "Super Admin", status: "Hoạt động" },
  { name: "Cán bộ văn hóa", email: "vanhoa@dinhcong.gov.vn", role: "Admin nội dung", status: "Hoạt động" },
  { name: "Biên tập viên", email: "editor@dinhcong.gov.vn", role: "Biên tập viên", status: "Tạm khóa" },
];

export default function AdminUsersPage() {
  return (
    <AdminFrame eyebrow="Tài khoản quản trị" title="Phân quyền và bảo vệ khu vực admin">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Người dùng</p>
              <h2>Danh sách tài khoản</h2>
            </div>
            <button type="button">Tạo tài khoản</button>
          </div>
          <div className="admin-table compact-table">
            <div className="admin-row admin-row-head">
              <span>Họ tên</span>
              <span>Email</span>
              <span>Vai trò</span>
              <span>Trạng thái</span>
              <span>Lần cuối</span>
              <span>Hành động</span>
            </div>
            {users.map((user) => (
              <div className="admin-row" key={user.email}>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <span>{user.status}</span>
                <span>25/05/2026</span>
                <span className="admin-actions">
                  <button type="button">Sửa</button>
                  <button type="button">Khóa</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel">
          <p className="eyebrow">Phân quyền</p>
          <h2>Tài khoản mới</h2>
          <label>
            <span>Họ tên</span>
            <input defaultValue="Cán bộ phụ trách nội dung" />
          </label>
          <label>
            <span>Email</span>
            <input defaultValue="content@dinhcong.gov.vn" />
          </label>
          <label>
            <span>Vai trò</span>
            <select defaultValue="Admin nội dung">
              <option>Super Admin</option>
              <option>Admin nội dung</option>
              <option>Biên tập viên</option>
              <option>Người xem thống kê</option>
            </select>
          </label>
          <button className="primary-button" type="button">Lưu tài khoản</button>
        </form>
      </section>
    </AdminFrame>
  );
}
