import Image from "next/image";
import Link from "next/link";
import { PublicHeader } from "./components/PublicHeader";
import { SiteDirectory } from "./components/SiteDirectory";
import { getFirstTourableSite, getPublishedSites, heritageSites, solutionHighlights } from "./lib/data";

const tourableSite = getFirstTourableSite();
const publishedSites = getPublishedSites();

const metrics = [
  { value: publishedSites.length, label: "cụm di tích trọng điểm" },
  { value: heritageSites.reduce((sum, site) => sum + site.tourPoints.length, 0), label: "không gian VR360 mẫu" },
  { value: "4K+", label: "tư liệu số hóa độ phân giải cao" },
];

const workflow = [
  "Khảo sát không gian",
  "Chụp/quay VR360",
  "Biên tập tư liệu",
  "Gắn hotspot",
  "Xuất bản bản đồ số",
];

export default function Home() {
  return (
    <main>
      <PublicHeader />

      <section className="hero premium-hero">
        <Image
          src="/vr360/Sảnh Chính.jpg"
          alt="Không gian di tích phường Định Công"
          fill
          priority
          sizes="100vw"
          className="hero-image cinematic-image"
        />
        <div className="hero-overlay premium-overlay" />
        <div className="tech-grid-overlay" />
        <div className="orbital-ring ring-one" />
        <div className="orbital-ring ring-two" />

        <div className="hero-content animate-in">
          <p className="eyebrow">Công nghệ lõi VR360 · Bảo tồn di sản số</p>
          <h1>Số hóa Di tích Lịch sử Văn hóa tại Phường Định Công</h1>
          <p>
            Dự án do Công ty ICS xây dựng nhằm hình thành một “bảo tàng số” trực quan,
            chuyển đổi các không gian di tích thành dữ liệu số độ phân giải cao, phục vụ
            người dân, học sinh và du khách khám phá giá trị văn hóa mọi lúc, mọi nơi.
          </p>
          <div className="hero-actions">
            <Link className="primary-button premium-button" href={`/tham-quan/${tourableSite.slug}`}>
              Khám phá bản đồ VR360
            </Link>
            <Link className="secondary-button on-dark" href="/gioi-thieu">
              Xem giải pháp
            </Link>
          </div>
        </div>

        <div className="hero-command-panel animate-in delay-one">
          <span className="signal-dot" />
          <strong>Bản đồ số VR360 Định Công</strong>
          <p>Đình · Chùa · Nhà thờ Tổ nghề · Đền Mẫu</p>
          <div className="scan-line" />
        </div>

        <div className="hero-stats premium-stats animate-in delay-two">
          {metrics.map((metric) => (
            <span key={metric.label}>
              <strong>{metric.value}</strong>
              {metric.label}
            </span>
          ))}
        </div>
      </section>

      <section className="section solution-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Tổng quan giải pháp</p>
          <h2>Công nghệ VR360 kết nối giá trị lịch sử với thế hệ tương lai</h2>
          <p>
            Nền tảng được thiết kế để lưu trữ, giới thiệu và vận hành nội dung số hóa
            theo chuẩn dữ liệu tập trung. Mỗi cụm di tích có thể quản lý ảnh toàn cảnh,
            tuyến tham quan, thuyết minh, tư liệu hiện vật và trạng thái xuất bản riêng.
          </p>
        </div>

        <div className="solution-grid">
          {solutionHighlights.map((item, index) => (
            <article className="solution-card reveal-card" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section spatial-section">
        <div className="spatial-copy">
          <p className="eyebrow">Kế hoạch triển khai</p>
          <h2>Phân bổ cụm không gian VR360 theo từng hạng mục di tích</h2>
          <p>
            Mỗi địa điểm được tổ chức thành các lớp quan sát: toàn cảnh tầm cao, tuyến
            tiếp cận, kiến trúc nội tự và đặc tả bảo tồn hiện vật. Cách phân lớp này giúp
            giao diện vừa dễ tham quan, vừa đủ sâu cho công tác lưu trữ và giáo dục truyền thống.
          </p>
        </div>

        <div className="spatial-list">
          {heritageSites.map((site, index) => (
            <article className="spatial-item reveal-card" key={site.id}>
              <div className="spatial-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <span>{site.type}</span>
                <h3>{site.name}</h3>
                <p>{site.shortDescription}</p>
                <ul>
                  {site.spatialPlan.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={`/di-tich/${site.slug}`}>Xem hồ sơ số hóa</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section immersive-band">
        <div className="immersive-visual">
          <Image src="/vr360/Trước Cổng.jpg" alt="Điểm mở đầu tham quan VR360" fill sizes="50vw" />
          <div className="hud-panel hud-left">
            <span>Yaw</span>
            <strong>128.4°</strong>
          </div>
          <div className="hud-panel hud-right">
            <span>Hotspot</span>
            <strong>Đang khóa tọa độ</strong>
          </div>
        </div>
        <div className="immersive-copy">
          <p className="eyebrow">Trải nghiệm người dân</p>
          <h2>Gọn, mượt, trang trọng và dễ sử dụng</h2>
          <p>
            Người xem chỉ cần chọn di tích, đọc giới thiệu và bước vào không gian VR360.
            Các chức năng kỹ thuật như bản nháp, tọa độ, trạng thái hotspot được ẩn khỏi
            giao diện công khai và chỉ xuất hiện trong khu vực quản trị.
          </p>
          <div className="benefit-list premium-benefits">
            <p>Tham quan theo tuyến điểm, có mũi tên chuyển cảnh và ảnh xem trước.</p>
            <p>Mở điểm thông tin để xem tư liệu, nghe thuyết minh hoặc xem ảnh hiện vật.</p>
            <p>Giao diện tối ưu cho máy tính, điện thoại và màn hình trình chiếu tại sự kiện.</p>
          </div>
        </div>
      </section>

      <SiteDirectory sites={publishedSites} />

      <section className="section process-section premium-process">
        <div className="section-heading">
          <p className="eyebrow">Quy trình tác nghiệp</p>
          <h2>Từ khảo sát thực địa đến bản đồ số VR360 hoàn chỉnh</h2>
        </div>
        <div className="timeline premium-timeline">
          {workflow.map((item, index) => (
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
