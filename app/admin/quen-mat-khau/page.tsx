import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-shell compact-auth">
      <section className="auth-panel centered-auth">
        <Link href="/" className="brand">
          <span>VR360</span>
          Định Công
        </Link>
        <div>
          <p className="eyebrow">Khôi phục truy cập</p>
          <h2>Quên mật khẩu</h2>
          <p>Nhập email quản trị để nhận hướng dẫn đặt lại mật khẩu.</p>
        </div>
        <form className="auth-form">
          <label>
            <span>Email quản trị</span>
            <input placeholder="admin@dinhcong.gov.vn" type="email" />
          </label>
          <button className="primary-button full-width" type="button">
            Gửi hướng dẫn khôi phục
          </button>
          <Link className="secondary-button full-width" href="/admin">
            Quay lại đăng nhập
          </Link>
        </form>
      </section>
    </main>
  );
}
