"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "../../lib/data";

export function AdminFrame({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin/dashboard" className="brand admin-brand">
          <span>VR360</span>
          Quản trị
        </Link>
        <nav aria-label="Menu quản trị">
          {adminNavItems.map((item) => (
            <Link className={pathname === item.href ? "active" : ""} href={item.href} key={item.href}>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-top">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-top-actions">
            <Link className="secondary-button" href="/">
              Xem website
            </Link>
            <Link className="secondary-button" href="/admin">
              Đăng xuất
            </Link>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
