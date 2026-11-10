import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-surface">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="footer-logo text-3xl font-serif font-semibold"
            >
              mindease
            </Link>

            <p className="footer-copy mt-4 max-w-md text-sm leading-7">
              A quiet space to check in with yourself, understand
              your feelings, and take things one moment at a time.
            </p>

            <p className="footer-muted mt-6 text-sm">
              You don&apos;t have to have everything figured out.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="footer-heading text-sm font-semibold uppercase tracking-wider">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="footer-link text-sm transition"
              >
                Home
              </Link>

              <Link
                to="/chat"
                className="footer-link text-sm transition"
              >
                AI Companion
              </Link>

              <Link
                to="/mood"
                className="footer-link text-sm transition"
              >
                Mood Tracker
              </Link>

              <Link
                to="/journal"
                className="footer-link text-sm transition"
              >
                Journal
              </Link>
            </div>
          </div>

          {/* Wellness */}
          <div>
            <h3 className="footer-heading text-sm font-semibold uppercase tracking-wider">
              Wellness
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/wellness"
                className="footer-link text-sm transition"
              >
                Exercises
              </Link>

              <Link
                to="/help-someone"
                className="footer-link text-sm transition"
              >
                Help Someone
              </Link>

              <Link
                to="/profile"
                className="footer-link text-sm transition"
              >
                Profile
              </Link>

              <Link
                to="/login"
                className="footer-link text-sm transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-separator mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between gap-4">
          <p className="footer-muted text-xs">
            © {new Date().getFullYear()} MindEase. All rights reserved.
          </p>

          <p className="footer-muted text-xs">
            MindEase is not a replacement for professional mental-health care.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;