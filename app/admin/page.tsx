import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <Image src="/vr360/Sảnh Chính.jpg" alt="Không gian di tích" fill priority sizes="60vw" />
        <div className="auth-visual-overlay" />
        <div>
          <p className="eyebrow">Khu vực quản trị nội dung</p>
          <h1>Đăng nhập hệ thống VR360 Định Công</h1>
          <p>
            Dành cho cán bộ quản lý và người vận hành hệ thống. Nội dung thay đổi tại
            khu vực này sẽ ảnh hưởng đến thông tin hiển thị trên website công khai.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <Link href="/" className="brand">
          <span>VR360</span>
          Định Công
        </Link>
        <div>
          <p className="eyebrow">Đăng nhập</p>
          <h2>Quản trị viên</h2>
          <p>Sử dụng tài khoản được cấp bởi đơn vị quản lý để truy cập hệ thống.</p>
        </div>
        <form className="auth-form">
          <label>
            <span>Email quản trị</span>
            <input defaultValue="admin@dinhcong.gov.vn" type="email" />
          </label>
          <label>
            <span>Mật khẩu</span>
            <input defaultValue="12345678" type="password" />
          </label>
          <div className="form-inline">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link href="/admin/quen-mat-khau">Quên mật khẩu?</Link>
          </div>
          <Link className="primary-button full-width" href="/admin/dashboard">
            Đăng nhập
          </Link>
        </form>
      </section>
    </main>
  );
}
