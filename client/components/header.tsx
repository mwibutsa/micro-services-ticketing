import Link from "next/link";
import { CurrentUser } from "../types/user";

interface HeaderProps {
  currentUser: CurrentUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig): linkConfig is { label: string; href: string } => Boolean(linkConfig))
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            href={href}
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link className="text-xl font-bold text-indigo-600" href="/">
          GitTix
        </Link>

        <ul className="flex items-center space-x-6">{links}</ul>
      </nav>
    </header>
  );
};

export default Header;
