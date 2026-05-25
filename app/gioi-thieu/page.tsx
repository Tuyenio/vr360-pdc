import Image from "next/image";
import Link from "next/link";
import { PublicHeader } from "../components/PublicHeader";

const modules = [
  "Quản lý danh sách di tích",
  "Quản lý điểm tham quan VR360",
  "Gắn mũi tên điều hướng trong không gian 360",
  "Gắn điểm thông tin, ảnh, video và audio",
  "Tổ chức thư viện tư liệu theo từng di tích",
  "Theo dõi lượt xem và trạng thái xuất bản",
];

export default function AboutPage() {
  return (
    <main>
      <PublicHeader />
      <header className="subpage-hero">
        <Link href="/" className="back-link">
          ← Trang chủ
        </Link>
        <p className="eyebrow">Giới thiệu dự án</p>
        <h1>Nền tảng số hóa di tích phục vụ cộng đồng</h1>
        <p>
          Dự án hướng tới việc lưu giữ, giới thiệu và khai thác giá trị di sản văn hóa
          của phường Định Công bằng công nghệ ảnh toàn cảnh, tư liệu số và hệ thống quản trị nội dung.
        </p>
      </header>

      <section className="section split-showcase">
        <div className="showcase-image">
          <Image src="/vr360/Sảnh trung tâm.jpg" alt="Không gian sân trung tâm" fill sizes="50vw" />
        </div>
        <div className="showcase-copy">
          <p className="eyebrow">Mục tiêu</p>
          <h2>Giới thiệu di tích theo hướng trang trọng, dễ tiếp cận và có khả năng mở rộng</h2>
          <p>
            Người dân và du khách chỉ nhìn thấy các nội dung đã được xuất bản, trong khi
            cán bộ quản trị có khu vực riêng để cập nhật dữ liệu, kiểm duyệt bài viết,
            quản lý trạng thái và bổ sung tư liệu mới.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Cấu trúc chức năng</p>
          <h2>Các module chính của hệ thống</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card reveal-card" key={module}>
              <strong>{module}</strong>
              <p>Được thiết kế theo hướng dữ liệu tập trung, sẵn sàng kết nối API và cơ sở dữ liệu.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
