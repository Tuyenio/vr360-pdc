import Link from "next/link";
import { PublicHeader } from "../components/PublicHeader";
import { SiteDirectory } from "../components/SiteDirectory";
import { getPublishedSites } from "../lib/data";

export default function SitesPage() {
  return (
    <main>
      <PublicHeader />
      <header className="subpage-hero">
        <Link href="/" className="back-link">
          ← Trang chủ
        </Link>
        <p className="eyebrow">Thư viện di tích</p>
        <h1>Danh sách di tích phường Định Công</h1>
        <p>
          Tra cứu thông tin, xem ảnh tư liệu và lựa chọn không gian tham quan trực tuyến
          theo từng di tích đã được xuất bản.
        </p>
      </header>
      <SiteDirectory sites={getPublishedSites()} />
    </main>
  );
}
