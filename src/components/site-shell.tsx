import { Link } from "@tanstack/react-router";
import { instagramUrl } from "@/lib/site";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/visit", label: "Visit" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="nav-links">
          {navLinks.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link to="/" className="nav-wordmark" aria-label="The Little Hair Shop home">
          The Little Hair Shop
        </Link>
        <a className="nav-instagram" href={instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-script">The Little Hair Shop</Link>
      <div className="footer-rule" />
      <nav className="footer-links" aria-label="Footer navigation">
        {navLinks.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
      </nav>
      <p>Women-owned hair salon · Point Loma, San Diego · 1360 Rosecrans St, Suite J · (619) 403-0551</p>
    </footer>
  );
}

export function PageHeader({ label, title }: { label: string; title: string }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <span className="gold-diamond" aria-hidden="true" />
    </header>
  );
}
