import Link from "next/link";
import { publicNavItems } from "../lib/data";

export function PublicHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span>VR360</span>
        Định Công
      </Link>
      <nav aria-label="Điều hướng chính">
        {publicNavItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="header-admin-link" href="/admin">
          Quản trị
        </Link>
      </nav>
    </header>
  );
}
