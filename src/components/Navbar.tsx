import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import NotificationBell from "./NotificationBell";

const linkBase =
  "sk-emboss-soft rounded-xl px-4 py-2 text-sm font-bold transition-colors hover:text-cyan-700";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? "sk-pressed" : ""}`;

  const close = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <header className="sticky top-3 z-50 mx-3 rounded-2xl border border-white/15 bg-[#ffff]/65 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <span className="sk-gem flex h-11 w-11 items-center justify-center">
            <Search size={22} strokeWidth={2.5} />
          </span>

          <span>
            <span className="sk-emboss block font-['Plus_Jakarta_Sans'] text-xl font-extrabold leading-tight tracking-tight">
              Lost<span className="text-cyan-700">Link</span>
            </span>

            <span className="sk-emboss-soft hidden text-[10px] font-bold tracking-widest sm:block">
              RECONNECT WHAT MATTERS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <a href="/#recent" className={linkBase}>
            Browse Items
          </a>

          <a href="/#how-it-works" className={linkBase}>
            How It Works
          </a>
        </nav>

        {/* Account Actions */}
        <div className="flex items-center gap-3">
          {!isLoading && isAuthenticated && <NotificationBell />}

          {/* Desktop Account Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {!isLoading &&
              (isAuthenticated ? (
                <>
                  <span className="sk-emboss-soft max-w-32 truncate text-sm font-bold">
                    Hi, {user?.name}
                  </span>

                  <Link
                    to="/profile"
                    className="sk-btn rounded-xl px-4 py-2.5 text-sm"
                  >
                    <UserRound size={17} />
                    Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    className="sk-btn sk-btn-steel rounded-xl px-4 py-2.5 text-sm"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="sk-btn rounded-xl px-4 py-2.5 text-sm"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="sk-btn sk-btn-steel rounded-xl px-5 py-2.5 text-sm"
                  >
                    Log In
                  </Link>

                  <Link
                    to="/register"
                    className="sk-btn rounded-xl px-5 py-2.5 text-sm"
                  >
                    Get Started
                  </Link>
                </>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="sk-btn sk-btn-steel flex h-11 w-11 items-center justify-center rounded-xl md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen
            ? "visible max-h-140 opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="sk-groove" />

        <div className="flex flex-col gap-4 px-5 pb-6 pt-5">
          <NavLink
            to="/"
            onClick={close}
            className="sk-btn sk-btn-steel w-full rounded-xl py-3"
          >
            Home
          </NavLink>

          <a
            href="/#recent"
            onClick={close}
            className="sk-btn sk-btn-steel w-full rounded-xl py-3"
          >
            Browse Items
          </a>

          <a
            href="/#how-it-works"
            onClick={close}
            className="sk-btn sk-btn-steel w-full rounded-xl py-3"
          >
            How It Works
          </a>

          {!isLoading &&
            (isAuthenticated ? (
              <>
                <div className="sk-well rounded-xl px-4 py-3 text-center">
                  <p className="sk-emboss-soft text-xs font-semibold">
                    SIGNED IN AS
                  </p>

                  <p className="sk-emboss mt-1 truncate font-bold">
                    {user?.name}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={close}
                  className="sk-btn flex w-full items-center justify-center gap-2 rounded-xl py-3"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                <Link
                  to="/dashboard"
                  onClick={close}
                  className="sk-btn sk-btn-steel flex w-full items-center justify-center gap-2 rounded-xl py-3"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="sk-btn flex w-full items-center justify-center gap-2 rounded-xl py-3"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={close}
                  className="sk-btn sk-btn-steel w-full rounded-xl py-3"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  onClick={close}
                  className="sk-btn w-full rounded-xl py-3"
                >
                  Get Started
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
