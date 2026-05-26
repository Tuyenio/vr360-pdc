import Image from "next/image";
import Link from "next/link";
import { PublicHeader } from "../components/PublicHeader";
import { solutionHighlights } from "../lib/data";

const modules = [
  "Bản đồ số VR360 các di tích phường Định Công",
  "Quản lý ảnh panorama, điểm tham quan và góc nhìn",
  "Gắn mũi tên điều hướng cố định trong không gian 360",
  "Tích hợp hotspot tư liệu, ảnh, video, audio và tài liệu",
  "Tổ chức thư viện số theo từng cụm di tích",
  "Kiểm soát trạng thái xuất bản, bảo mật và thống kê truy cập",
];

const requirements = [
  "Bảo tồn lâu dài, gìn giữ và phát huy giá trị di tích trên địa bàn phường.",
  "Cung cấp kênh thông tin quảng bá chính thống, trực quan, sinh động cho người dân và khách thập phương.",
  "Phục vụ giáo dục truyền thống lịch sử, phát triển văn hóa và truyền thông địa phương.",
  "Tác nghiệp thực địa tuân thủ Luật Di sản văn hóa, không gây ảnh hưởng đến yếu tố gốc của di tích.",
];

export default function AboutPage() {
  return (
    <main>
      <PublicHeader />
      <header className="subpage-hero premium-subpage">
        <Link href="/" className="back-link">
          ← Trang chủ
        </Link>
        <p className="eyebrow">Giới thiệu dự án</p>
        <h1>Giải pháp công nghệ lõi VR360 cho bảo tồn di sản Định Công</h1>
        <p>
          Dự án “Số hóa Di tích Lịch sử Văn hóa tại Phường Định Công” hướng tới việc
          xây dựng một bảo tàng số trực quan, hiện đại và có khả năng mở rộng lâu dài.
        </p>
      </header>

      <section className="section split-showcase">
        <div className="showcase-image premium-media">
          <Image src="/vr360/Sảnh trung tâm.jpg" alt="Không gian số hóa VR360" fill sizes="50vw" />
        </div>
        <div className="showcase-copy">
          <p className="eyebrow">Tổng quan giải pháp</p>
          <h2>Chuyển đổi không gian vật lý thành dữ liệu di sản số</h2>
          <p>
            Công nghệ Thực tế ảo VR360 cho phép người xem tiếp cận không gian di tích
            bằng ảnh toàn cảnh độ phân giải cao, điểm điều hướng, điểm thông tin và
            thuyết minh đa phương tiện. Hệ thống được thiết kế để phù hợp với công tác
            quản lý nhà nước, truyền thông chính thống và giáo dục văn hóa địa phương.
          </p>
        </div>
      </section>

      <section className="section solution-section">
        <div className="section-heading">
          <p className="eyebrow">Mục đích, yêu cầu</p>
          <h2>Bảo tồn không xâm lấn, khai thác hiệu quả, phục vụ cộng đồng</h2>
        </div>
        <div className="solution-grid">
          {requirements.map((item, index) => (
            <article className="solution-card reveal-card" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Năng lực nền tảng</p>
          <h2>Các lớp chức năng chính của hệ thống</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card reveal-card" key={module}>
              <strong>{module}</strong>
              <p>Được thiết kế theo hướng dữ liệu tập trung, sẵn sàng kết nối API và cơ sở dữ liệu vận hành thực tế.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section premium-process">
        <div className="section-heading">
          <p className="eyebrow">Công nghệ lõi</p>
          <h2>Nền tảng vận hành như một bảo tàng số</h2>
        </div>
        <div className="solution-grid">
          {solutionHighlights.map((item) => (
            <article className="solution-card dark reveal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
