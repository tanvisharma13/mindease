import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#304737] text-[#E8EFE6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-3xl font-serif font-semibold"
            >
              mindease
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#C5D2C6]">
              A quiet space to check in with yourself, understand
              your feelings, and take things one moment at a time.
            </p>

            <p className="mt-6 text-sm text-[#AEBEAF]">
              You don&apos;t have to have everything figured out.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#EAF1E8]">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/chat"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                AI Companion
              </Link>

              <Link
                to="/mood"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Mood Tracker
              </Link>

              <Link
                to="/journal"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Journal
              </Link>
            </div>
          </div>

          {/* Wellness */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#EAF1E8]">
              Wellness
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/wellness"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Exercises
              </Link>

              <Link
                to="/help-someone"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Help Someone
              </Link>

              <Link
                to="/profile"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Profile
              </Link>

              <Link
                to="/login"
                className="text-sm text-[#C5D2C6] hover:text-white transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#526557] flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-[#AEBEAF]">
            © {new Date().getFullYear()} MindEase. All rights reserved.
          </p>

          <p className="text-xs text-[#AEBEAF]">
            MindEase is not a replacement for professional mental-health care.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;