import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wellnessOpen, setWellnessOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("mindease_user"));

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Mood", path: "/mood" },
    { name: "Journal", path: "/journal" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("mindease_user");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E3E8E0] bg-[#F7F4EC]/95 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#365443]"
          >
            mindease
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-full text-sm transition ${
                    isActive
                      ? "bg-[#3F604B] text-white"
                      : "text-[#53675A] hover:bg-[#E7EEE4]"
                  }`
                }
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
                className="px-4 py-2.5 rounded-full text-sm text-[#53675A] hover:bg-[#E7EEE4] transition flex items-center gap-1.5"
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
                  <div className="bg-white border border-[#DCE3D9] rounded-2xl shadow-lg p-2">

                    <Link
                      to="/resources"
                      onClick={() => setWellnessOpen(false)}
                      className="block rounded-xl px-4 py-3 hover:bg-[#F0F4EE] transition"
                    >
                      <span className="block text-sm font-medium text-[#304737]">
                        Resources
                      </span>

                      <span className="block text-xs text-[#7A887E] mt-1">
                        Exercises, guides & practical tools
                      </span>
                    </Link>

                    <Link
                      to="/wellness"
                      onClick={() => setWellnessOpen(false)}
                      className="block rounded-xl px-4 py-3 hover:bg-[#F0F4EE] transition"
                    >
                      <span className="block text-sm font-medium text-[#304737]">
                        Mental Health Library
                      </span>

                      <span className="block text-xs text-[#7A887E] mt-1">
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
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-full text-sm transition ${
                  isActive
                    ? "bg-[#3F604B] text-white"
                    : "text-[#53675A] hover:bg-[#E7EEE4]"
                }`
              }
            >
              Help Someone
            </NavLink>
          </div>

          {/* Desktop Account */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full border border-[#D3DDD1] px-4 py-2 text-sm text-[#4A6051] hover:bg-white transition"
                >
                  <span className="w-7 h-7 rounded-full bg-[#DDE8DC] flex items-center justify-center text-xs font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>

                  <span>{user.name?.split(" ")[0]}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm text-[#718078] hover:text-[#3F604B] transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm text-[#4A6051] hover:text-[#304737]"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-[#3F604B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#314C3B]"
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
            className="lg:hidden w-10 h-10 rounded-full border border-[#D5DED3] flex items-center justify-center text-[#3F604B]"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#E3E8E0] py-5">

            <div className="flex flex-col gap-1">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm ${
                      isActive
                        ? "bg-[#3F604B] text-white"
                        : "text-[#53675A] hover:bg-[#E7EEE4]"
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
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-[#53675A] hover:bg-[#E7EEE4]"
                >
                  Wellness
                  <span>
                    {wellnessOpen ? "−" : "+"}
                  </span>
                </button>

                {wellnessOpen && (
                  <div className="ml-4 mt-1 border-l border-[#D7DFD5] pl-3">

                    <Link
                      to="/resources"
                      onClick={() => {
                        setMenuOpen(false);
                        setWellnessOpen(false);
                      }}
                      className="block px-4 py-3 rounded-xl text-sm text-[#607067] hover:bg-[#E7EEE4]"
                    >
                      Resources
                    </Link>

                    <Link
                      to="/wellness"
                      onClick={() => {
                        setMenuOpen(false);
                        setWellnessOpen(false);
                      }}
                      className="block px-4 py-3 rounded-xl text-sm text-[#607067] hover:bg-[#E7EEE4]"
                    >
                      Mental Health Library
                    </Link>

                  </div>
                )}
              </div>

              <NavLink
                to="/help-someone"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm ${
                    isActive
                      ? "bg-[#3F604B] text-white"
                      : "text-[#53675A] hover:bg-[#E7EEE4]"
                  }`
                }
              >
                Help Someone
              </NavLink>
            </div>

            {/* Mobile account */}
            <div className="mt-4 pt-4 border-t border-[#E3E8E0]">
              {user ? (
                <div className="flex flex-col gap-2">

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm text-[#53675A] hover:bg-[#E7EEE4]"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-3 rounded-xl text-sm text-[#53675A] hover:bg-[#E7EEE4]"
                  >
                    Sign out
                  </button>

                </div>
              ) : (
                <div className="flex flex-col gap-2">

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm text-[#53675A] hover:bg-[#E7EEE4]"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl bg-[#3F604B] text-white text-sm text-center"
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