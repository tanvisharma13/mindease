
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await login(form.email, form.password);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="block text-center text-3xl font-serif font-semibold text-ink mb-8"
        >
          mindease
        </Link>

        <div className="surface-card border border-line rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-sm text-faint mb-2">
              Welcome back
            </p>

            <h1 className="text-3xl font-serif text-ink">
              Good to see you again
            </h1>

            <p className="text-muted mt-3 text-sm">
              Take a breath. You&apos;re in a safe place.
            </p>
          </div>

          {error && (
            <div className="error-soft mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink mb-2"
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
                className="form-input w-full rounded-xl border px-4 py-3 transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-ink"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-brand hover:underline"
                  onClick={() =>
                    alert("Password reset can be connected to your backend later.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input w-full rounded-xl border px-4 py-3 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full rounded-xl px-5 py-3.5 font-medium transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-faint">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <p className="text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-brand hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-faint mt-6">
          Your wellbeing matters. Take things one step at a time.
        </p>
      </div>
    </div>
  );
}

export default Login;
