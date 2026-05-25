import Image from "next/image";
import Link from "next/link";
import { PublicHeader } from "./components/PublicHeader";
import { SiteDirectory } from "./components/SiteDirectory";
import { getFirstTourableSite, getPublishedSites, heritageSites } from "./lib/data";

const tourableSite = getFirstTourableSite();
const publishedSites = getPublishedSites();

const featureGroups = [
  {
    title: "Tham quan trực tuyến",
    text: "Người xem có thể xoay không gian, chọn điểm dừng, mở thông tin thuyết minh và xem tư liệu ngay trên ảnh toàn cảnh.",
  },
  {
    title: "Tư liệu tập trung",
    text: "Ảnh, video, âm thanh, bài viết và tài liệu lịch sử được tổ chức thống nhất theo từng di tích.",
  },
  {
    title: "Dễ mở rộng",
    text: "Mỗi di tích có thể bổ sung thêm điểm VR360, mũi tên điều hướng và hotspot mà không cần thay đổi mã nguồn.",
  },
];

const publicBenefits = [
  "Tra cứu thông tin di tích theo cách dễ hiểu, phù hợp với người dân và học sinh.",
  "Tham quan thử trước khi đến trực tiếp, đặc biệt hữu ích với hoạt động giáo dục địa phương.",
  "Lưu giữ tư liệu văn hóa bằng hình ảnh, âm thanh và nội dung số có cấu trúc.",
];

export default function Home() {
  return (
    <main>
      <PublicHeader />

      <section className="hero">
        <Image
          src="/vr360/Sảnh Chính.jpg"
          alt="Không gian di tích phường Định Công"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content animate-in">
          <p className="eyebrow">Nền tảng số hóa di tích phường Định Công</p>
          <h1>Số hóa di tích lịch sử, văn hóa phường Định Công</h1>
          <p>
            Cổng tham quan trực tuyến giúp người dân, học sinh và du khách tiếp cận
            các di tích địa phương bằng hình ảnh VR360, thuyết minh và tư liệu văn hóa
            được trình bày trang trọng, mạch lạc.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href={`/tham-quan/${tourableSite.slug}`}>
              Bắt đầu tham quan
            </Link>
            <Link className="secondary-button on-dark" href="/di-tich">
              Xem danh sách di tích
            </Link>
          </div>
        </div>
        <div className="hero-stats animate-in delay-one">
          <span>
            <strong>{publishedSites.length}</strong>
            Di tích đang giới thiệu
          </span>
          <span>
            <strong>{tourableSite.tourPoints.length}</strong>
            Điểm tham quan mẫu
          </span>
          <span>
            <strong>{heritageSites.reduce((sum, site) => sum + site.views, 0).toLocaleString("vi-VN")}</strong>
            Lượt xem nội dung
          </span>
        </div>
      </section>

      <section className="section civic-intro" id="du-an">
        <div className="intro-copy">
          <p className="eyebrow">Giới thiệu dự án</p>
          <h2>Không gian số trang trọng cho di sản văn hóa địa phương</h2>
          <p>
            Website được thiết kế như một cổng thông tin phục vụ cộng đồng: dễ tra cứu,
            dễ tham quan, dễ mở rộng và phù hợp với phong cách truyền thông của cơ quan
            nhà nước cấp phường. Nội dung công khai chỉ tập trung vào trải nghiệm của
            người dân; các trạng thái quản trị như bản nháp, ẩn/hiện được tách riêng
            trong khu vực admin.
          </p>
        </div>
        <div className="feature-grid">
          {featureGroups.map((item) => (
            <article className="feature-card reveal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-showcase">
        <div className="showcase-image">
          <Image src="/vr360/Trước Cổng.jpg" alt="Cổng tam quan Chùa Liên Hoa" fill sizes="50vw" />
        </div>
        <div className="showcase-copy">
          <p className="eyebrow">Phục vụ người dân và du khách</p>
          <h2>Trải nghiệm đơn giản, nội dung rõ ràng, thao tác mượt mà</h2>
          <div className="benefit-list">
            {publicBenefits.map((benefit) => (
              <p key={benefit}>{benefit}</p>
            ))}
          </div>
          <Link className="primary-button" href={`/di-tich/${tourableSite.slug}`}>
            Xem di tích nổi bật
          </Link>
        </div>
      </section>

      <SiteDirectory sites={publishedSites} />

      <section className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">Luồng tham quan</p>
          <h2>Từ trang giới thiệu đến không gian VR360</h2>
        </div>
        <div className="timeline">
          {["Chọn di tích", "Đọc giới thiệu", "Mở VR360", "Xem điểm thông tin", "Nghe thuyết minh"].map((item, index) => (
            <div className="timeline-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
