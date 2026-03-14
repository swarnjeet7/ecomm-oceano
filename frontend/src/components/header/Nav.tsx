export function Nav() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="text-gray-700 hover:text-gray-900">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
