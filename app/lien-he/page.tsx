import Link from "next/link";
import { PublicHeader } from "../components/PublicHeader";

export default function ContactPage() {
  return (
    <main>
      <PublicHeader />
      <header className="subpage-hero">
        <Link href="/" className="back-link">
          ← Trang chủ
        </Link>
        <p className="eyebrow">Liên hệ</p>
        <h1>Thông tin hỗ trợ và tiếp nhận tư liệu</h1>
        <p>
          Người dân, nhà trường và các tổ chức có thể gửi góp ý, tư liệu ảnh, thông tin
          lịch sử hoặc đề xuất bổ sung nội dung cho hệ thống số hóa di tích.
        </p>
      </header>

      <section className="section contact-layout">
        <div className="contact-card">
          <p className="eyebrow">Đơn vị phụ trách</p>
          <h2>UBND phường Định Công</h2>
          <p>Địa chỉ: Phường Định Công, quận Hoàng Mai, thành phố Hà Nội</p>
          <p>Email tiếp nhận: vanhoa@dinhcong.gov.vn</p>
          <p>Thời gian hỗ trợ: Giờ hành chính các ngày làm việc</p>
        </div>

        <form className="public-form">
          <label>
            <span>Họ và tên</span>
            <input placeholder="Nhập họ tên người gửi" />
          </label>
          <label>
            <span>Số điện thoại hoặc email</span>
            <input placeholder="Thông tin để liên hệ lại" />
          </label>
          <label>
            <span>Nội dung góp ý</span>
            <textarea placeholder="Nhập nội dung cần trao đổi hoặc tư liệu muốn bổ sung" />
          </label>
          <button className="primary-button" type="button">
            Gửi thông tin
          </button>
        </form>
      </section>
    </main>
  );
}
