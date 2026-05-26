import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "../../components/PublicHeader";
import { getSiteBySlug, heritageSites } from "../../lib/data";

export function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export default async function SiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  const publicPoints = site.tourPoints.filter((point) => point.status === "published");

  return (
    <main>
      <PublicHeader />
      <header className="detail-hero">
        <Image src={site.banner} alt={site.name} fill priority sizes="100vw" className="detail-hero-image" />
        <div className="detail-overlay" />
        <div className="detail-content animate-in">
          <Link href="/di-tich" className="back-link on-dark-text">
            ← Danh sách di tích
          </Link>
          <p className="eyebrow">{site.type}</p>
          <h1>{site.name}</h1>
          <p>{site.shortDescription}</p>
          <div className="hero-actions">
            <Link
              className={publicPoints.length ? "primary-button" : "primary-button disabled"}
              href={publicPoints.length ? `/tham-quan/${site.slug}` : "#diem-tham-quan"}
            >
              Bắt đầu tham quan 360
            </Link>
            <Link className="secondary-button on-dark" href="#tu-lieu">
              Xem tư liệu
            </Link>
          </div>
        </div>
      </header>

      <section className="detail-layout">
        <article className="detail-main">
          <p className="eyebrow">Giới thiệu</p>
          {site.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="info-split">
            <section>
              <h2>Lịch sử hình thành</h2>
              <p>{site.history}</p>
            </section>
            <section>
              <h2>Giá trị văn hóa</h2>
              <p>{site.culturalValue}</p>
            </section>
          </div>

          <div className="heritage-plan-block">
            <section>
              <h2>Phân bổ cụm không gian VR360</h2>
              <ul>
                {site.spatialPlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Nguyên tắc bảo tồn</h2>
              <ul>
                {site.preservationNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        <aside className="detail-aside">
          <div>
            <span>Địa chỉ</span>
            <strong>{site.address}</strong>
          </div>
          <div>
            <span>Đơn vị phụ trách</span>
            <strong>{site.responsibleUnit}</strong>
          </div>
          <div>
            <span>Cập nhật</span>
            <strong>{site.updatedAt}</strong>
          </div>
          <div>
            <span>Hình thức</span>
            <strong>{publicPoints.length ? "Có tham quan VR360" : "Đang bổ sung VR360"}</strong>
          </div>
        </aside>
      </section>

      <section className="section" id="diem-tham-quan">
        <div className="section-heading">
          <p className="eyebrow">Điểm tham quan</p>
          <h2>Các vị trí trong hành trình VR360</h2>
          <p>
            Danh sách điểm dừng được trình bày cho người xem theo ngôn ngữ dễ hiểu,
            không hiển thị thông tin kỹ thuật dành riêng cho quản trị.
          </p>
        </div>
        {publicPoints.length ? (
          <div className="point-grid">
            {publicPoints.map((point) => (
              <article className="point-card reveal-card" key={point.id}>
                <div className="point-image">
                  <Image src={point.preview} alt={point.name} fill sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <h3>{point.name}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">Nội dung tham quan VR360 của di tích này đang được bổ sung.</div>
        )}
      </section>

      <section className="section" id="tu-lieu">
        <div className="section-heading">
          <p className="eyebrow">Tư liệu</p>
          <h2>Album ảnh và nội dung giới thiệu</h2>
          <p>Hình ảnh tư liệu giúp người xem nhận diện không gian, kiến trúc và cảnh quan của di tích.</p>
        </div>
        <div className="gallery-grid">
          {site.gallery.map((image) => (
            <div className="gallery-item reveal-card" key={image}>
              <Image src={image} alt={`${site.name} tư liệu`} fill sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
