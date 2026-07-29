const LINKS = [
  { href: "#ray", label: "ray" },
  { href: "#builds", label: "builds" },
  { href: "#ki", label: "ki" },
] as const;

export default function HomeNav() {
  return (
    <nav className="home-nav" aria-label="Main">
      <div className="home-nav-inner">
        <ul className="home-nav-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
