
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await register(
        form.name.trim(),
        form.email.trim(),
        form.password
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="block text-center text-3xl font-serif font-semibold text-[#365443] mb-8"
        >
          mindease
        </Link>

        <div className="bg-white border border-[#DCE3D9] rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-sm text-[#6B7B70] mb-2">
              A quiet space for you
            </p>

            <h1 className="text-3xl font-serif text-[#263D31]">
              Create your account
            </h1>

            <p className="text-[#718078] mt-3 text-sm">
              Start your journey toward a little more ease.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#3E5145] mb-2"
              >
                Your name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="What should we call you?"
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3E5145] mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3E5145] mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#3E5145] mb-2"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#3F604B] px-5 py-3.5 text-white font-medium transition hover:bg-[#314C3B] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-[#718078] mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#3F604B] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#879289] mt-6">
          Your information stays private in this prototype.
        </p>
      </div>
    </div>
  );
}

export default Register;
