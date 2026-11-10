
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wellnessOpen, setWellnessOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();

  // Keep all feature links visible to everyone.
  // ProtectedRoute will handle access when a visitor clicks them.
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Mood", path: "/mood" },
    { name: "Journal", path: "/journal" },
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setWellnessOpen(false);
    navigate("/login");
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setWellnessOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2.5 rounded-full text-sm transition ${
      isActive
        ? "nav-link-active"
        : "nav-link"
    }`;

  return (
    <header className="nav-header sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="nav-logo text-2xl sm:text-3xl font-serif font-semibold tracking-tight"
          >
            mindease
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={navLinkClass}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Wellness Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWellnessOpen(true)}
              onMouseLeave={() => setWellnessOpen(false)}
            >
              <button
                type="button"
                onClick={() => setWellnessOpen(!wellnessOpen)}
                aria-expanded={wellnessOpen}
                className="nav-link px-4 py-2.5 rounded-full text-sm transition flex items-center gap-1.5"
              >
                Wellness
                <span
                  className={`text-xs transition-transform ${
                    wellnessOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {wellnessOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="nav-dropdown border rounded-2xl shadow-lg p-2">

                    <Link
                      to="/resources"
                      onClick={closeMenus}
                      className="nav-item block rounded-xl px-4 py-3 transition"
                    >
                      <span className="nav-dropdown-title block text-sm font-medium">
                        Resources
                      </span>
                      <span className="nav-dropdown-caption block text-xs mt-1">
                        Exercises, guides & practical tools
                      </span>
                    </Link>

                    <Link
                      to="/wellness"
                      onClick={closeMenus}
                      className="nav-item block rounded-xl px-4 py-3 transition"
                    >
                      <span className="nav-dropdown-title block text-sm font-medium">
                        Mental Health Library
                      </span>
                      <span className="nav-dropdown-caption block text-xs mt-1">
                        Understand what you may be experiencing
                      </span>
                    </Link>

                  </div>
                </div>
              )}
            </div>

            {/* Help Someone */}
            <NavLink
              to="/help-someone"
              className={navLinkClass}
            >
              Help Someone
            </NavLink>
          </div>

          {/* Desktop Account */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <span className="nav-action text-sm">
                Loading...
              </span>
            ) : user ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-account flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition"
                >
                  <span className="nav-avatar w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>

                  <span>{user.name?.split(" ")[0]}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-action text-sm transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-signin px-4 py-2.5 text-sm"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="btn btn-primary px-5 py-2.5"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-toggle lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="nav-mobile-separator lg:hidden border-t py-5">

            <div className="flex flex-col gap-1">

              {/* Main Navigation */}
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm ${
                      isActive
                        ? "nav-link-active"
                        : "nav-link"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Wellness */}
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => setWellnessOpen(!wellnessOpen)}
                  aria-expanded={wellnessOpen}
                  className="nav-link nav-item w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm"
                >
                  Wellness
                  <span>
                    {wellnessOpen ? "−" : "+"}
                  </span>
                </button>

                {wellnessOpen && (
                  <div className="nav-mobile-submenu ml-4 mt-1 border-l pl-3">

                    <Link
                      to="/resources"
                      onClick={closeMenus}
                      className="nav-link nav-item block px-4 py-3 rounded-xl text-sm"
                    >
                      Resources
                    </Link>

                    <Link
                      to="/wellness"
                      onClick={closeMenus}
                      className="nav-link nav-item block px-4 py-3 rounded-xl text-sm"
                    >
                      Mental Health Library
                    </Link>

                  </div>
                )}
              </div>

              {/* Help Someone */}
              <NavLink
                to="/help-someone"
                onClick={closeMenus}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm ${
                    isActive
                      ? "nav-link-active"
                      : "nav-link"
                  }`
                }
              >
                Help Someone
              </NavLink>
            </div>

            {/* Mobile Account */}
            <div className="nav-mobile-separator mt-4 pt-4 border-t">

              {loading ? (
                <p className="nav-action px-4 py-3 text-sm">
                  Loading account...
                </p>
              ) : user ? (
                <div className="flex flex-col gap-2">

                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="nav-link nav-item px-4 py-3 rounded-xl text-sm"
                  >
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-link nav-item text-left px-4 py-3 rounded-xl text-sm"
                  >
                    Sign out
                  </button>

                </div>
              ) : (
                <div className="flex flex-col gap-2">

                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="nav-link nav-item px-4 py-3 rounded-xl text-sm"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="btn btn-primary px-4 py-3 text-sm text-center"
                  >
                    Get started
                  </Link>

                </div>
              )}

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
