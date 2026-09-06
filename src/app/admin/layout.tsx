"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "grid" },
  { label: "Editorial / Home", href: "/admin/editorial", icon: "layout" },
  { label: "Articles & News", href: "/admin/articles", icon: "file-text" },
  { label: "Profile", href: "/admin/profile", icon: "user" },
  { label: "Site Settings", href: "/admin/site-settings", icon: "settings" },
  { label: "Services", href: "/admin/services", icon: "briefcase" },
  { label: "Work", href: "/admin/work", icon: "folder" },
  { label: "Insights", href: "/admin/insights", icon: "book" },
  { label: "Speaking", href: "/admin/speaking", icon: "mic" },
  { label: "Press", href: "/admin/press", icon: "newspaper" },
  { label: "Recognition", href: "/admin/recognition", icon: "award" },
  { label: "Education", href: "/admin/education", icon: "graduation" },
  { label: "Principles", href: "/admin/principles", icon: "compass" },
  { label: "Navigation", href: "/admin/navigation", icon: "menu" },
  { label: "Media", href: "/admin/media", icon: "image" },
];

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    layout: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    user: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    settings: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    briefcase: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    folder: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    book: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    mic: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    newspaper: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    award: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    graduation: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    compass: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    menu: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    image: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  };
  return <>{icons[name] || icons.grid}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      setAuthenticated(true);
      return;
    }

    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAuthenticated(true);
          setAdminEmail(data.email);
        }
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setChecking(false));
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f14",
        color: "#888",
        fontFamily: "system-ui, sans-serif",
      }}>
        Loading...
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="adm-root">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="adm-sidebar-header">
          <div className="adm-logo">
            <span className="adm-logo-icon">A</span>
            <span className="adm-logo-text">Admin Panel</span>
          </div>
        </div>

        <nav className="adm-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`adm-nav-item ${pathname === item.href ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="adm-main-wrapper">
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="adm-mobile-title">Dashboard</span>
          </div>
          
          <div className="adm-topbar-right">
            <Link href="/" className="adm-view-site-btn" target="_blank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="hide-mobile">View Site</span>
            </Link>
            
            <div className="adm-user-info">
              <div className="adm-user-avatar">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <div className="adm-user-details hide-mobile">
                <span className="adm-user-email">{adminEmail}</span>
                <span className="adm-user-role">Admin</span>
              </div>
            </div>

            <button className="adm-logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hide-mobile">Logout</span>
            </button>
          </div>
        </header>

        <main className="adm-main">
          {children}
        </main>
      </div>

      <style jsx global>{`
        .adm-root {
          display: flex;
          min-height: 100vh;
          background: #0f0f14;
          font-family: system-ui, -apple-system, sans-serif;
          color: #e4e4e7;
        }
        .adm-root * { box-sizing: border-box; }

        /* Sidebar */
        .adm-sidebar {
          width: 260px;
          min-height: 100vh;
          background: #15151c;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        .adm-sidebar-header {
          padding: 1.25rem 1.25rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .adm-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .adm-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
        }
        .adm-logo-text {
          font-weight: 700;
          font-size: 1.05rem;
          color: #f1f1f1;
        }

        /* Navigation */
        .adm-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem;
        }
        .adm-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          color: #999;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.15s;
          margin-bottom: 2px;
        }
        .adm-nav-item:hover {
          background: rgba(255,255,255,0.04);
          color: #e4e4e7;
        }
        .adm-nav-item.active {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        /* Topbar & User Info */
        .adm-main-wrapper {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f9fafb;
          color: #111827;
        }
        .adm-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 90;
        }
        .adm-topbar-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .adm-hamburger {
          display: none;
          background: none;
          border: none;
          color: #111827;
          cursor: pointer;
          padding: 0.25rem;
        }
        .adm-mobile-title {
          display: none;
          font-weight: 600;
          font-size: 1rem;
          color: #111827;
        }
        
        .adm-topbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .adm-user-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .adm-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .adm-user-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .adm-user-email {
          font-size: 0.78rem;
          color: #374151;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }
        .adm-user-role {
          font-size: 0.7rem;
          color: #6b7280;
        }
        .adm-logout-btn, .adm-view-site-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.85rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          color: #374151;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
        }
        .adm-logout-btn:hover {
          background: #fef2f2;
          color: #ef4444;
          border-color: #fecaca;
        }
        .adm-view-site-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        /* Main content */
        .adm-main {
          flex: 1;
          padding: 2rem;
        }

        .adm-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
        }

        @media (max-width: 768px) {
          .adm-sidebar {
            transform: translateX(-100%);
          }
          .adm-sidebar.open {
            transform: translateX(0);
          }
          .adm-overlay {
            display: block;
          }
          .adm-main-wrapper {
            margin-left: 0;
          }
          .adm-hamburger {
            display: block;
          }
          .adm-mobile-title {
            display: block;
          }
          .hide-mobile {
            display: none !important;
          }
          .adm-topbar {
            padding: 0.75rem 1rem;
          }
          .adm-topbar-right {
            gap: 0.75rem;
          }
          .adm-logout-btn, .adm-view-site-btn {
            padding: 0.5rem;
          }
          .adm-main {
            padding: 1rem;
          }
        }

        /* Admin common form styles */
        .adm-page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .adm-page-desc {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0 0 2rem;
        }
        .adm-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .adm-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 1rem;
        }
        .adm-field {
          margin-bottom: 1rem;
        }
        .adm-field label {
          display: block;
          color: #4b5563;
          font-size: 0.82rem;
          font-weight: 500;
          margin-bottom: 0.4rem;
        }
        .adm-field input,
        .adm-field textarea,
        .adm-field select {
          width: 100%;
          padding: 0.6rem 0.85rem;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          color: #111827;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }
        .adm-field textarea {
          min-height: 100px;
          resize: vertical;
        }
        .adm-field input:focus,
        .adm-field textarea:focus,
        .adm-field select:focus {
          border-color: #10b981;
          background: #ffffff;
          box-shadow: 0 0 0 1px #10b981;
        }
        .adm-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border: none;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .adm-btn-primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
        }
        .adm-btn-primary:hover {
          opacity: 0.9;
        }
        .adm-btn-secondary {
          background: #ffffff;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        .adm-btn-secondary:hover {
          background: #f3f4f6;
        }
        .adm-btn-danger {
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
        }
        .adm-btn-danger:hover {
          background: #fee2e2;
        }
        .adm-btn-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .adm-success {
          padding: 0.75rem 1rem;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 8px;
          color: #059669;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .adm-error {
          padding: 0.75rem 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .adm-table {
          width: 100%;
          border-collapse: collapse;
        }
        .adm-table th {
          text-align: left;
          padding: 0.75rem;
          color: #6b7280;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }
        .adm-table td {
          padding: 0.75rem;
          font-size: 0.88rem;
          border-bottom: 1px solid #f3f4f6;
          color: #374151;
        }
        .adm-table tr:hover td {
          background: #f9fafb;
        }
        .adm-badge {
          display: inline-flex;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
        }
        .adm-badge-green {
          background: #ecfdf5;
          color: #059669;
        }
        .adm-badge-blue {
          background: #eff6ff;
          color: #2563eb;
        }
        .adm-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .adm-stat-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          padding: 1.25rem;
        }
        .adm-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          line-height: 1;
        }
        .adm-stat-label {
          color: #6b7280;
          font-size: 0.82rem;
          margin-top: 0.35rem;
        }
        .adm-empty {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .adm-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          color: #6b7280;
        }
        .adm-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .adm-modal {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-radius: 16px;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          color: #111827;
        }
        .adm-modal-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 1.5rem;
        }

        /* Tiptap Editor Styles */
        .tiptap-editor .ProseMirror {
          min-height: 300px;
          outline: none;
        }
        .tiptap-editor .ProseMirror p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .tiptap-editor .ProseMirror h2, .tiptap-editor .ProseMirror h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .tiptap-editor .ProseMirror h2 { font-size: 1.5rem; }
        .tiptap-editor .ProseMirror h3 { font-size: 1.25rem; }
        .tiptap-editor .ProseMirror ul, .tiptap-editor .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .tiptap-editor .ProseMirror ul { list-style-type: disc; }
        .tiptap-editor .ProseMirror ol { list-style-type: decimal; }
        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          margin-bottom: 1rem;
          font-style: italic;
          color: #4b5563;
        }
        .tiptap-editor .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
