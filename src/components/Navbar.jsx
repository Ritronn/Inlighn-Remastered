import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navItems = ['Home', 'About', 'Programs', 'Verify', 'Contact'];

  const getNavLink = (item) => {
    switch(item) {
      case 'Home':
        return '/';
      case 'Verify':
        return '/verify-certificate';
      default:
        return `/${item.toLowerCase()}`;
    }
  };

  return (
    <nav className="fixed top-1 left-1/2 -translate-x-1/2 z-50 bg-gray-100/95 backdrop-blur-md border border-green-400/30 text-gray-800 px-8 py-4 rounded-2xl w-[calc(100%-8px)] max-w-[1200px] shadow-2xl shadow-green-400/10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-green-600">Inlighn</span>
        </div>

        {/* Links */}
        <ul className="flex gap-10 text-base font-medium">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                to={getNavLink(item)}
                className="relative px-4 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300">
          Join Now
        </button>
      </div>
    </nav>
  );
}