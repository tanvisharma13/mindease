import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mindease_users")) || [];

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === form.email.toLowerCase() &&
        item.password === form.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("mindease_user", JSON.stringify(user));

    navigate("/dashboard");
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
              Welcome back
            </p>

            <h1 className="text-3xl font-serif text-[#263D31]">
              Good to see you again
            </h1>

            <p className="text-[#718078] mt-3 text-sm">
              Take a breath. You&apos;re in a safe place.
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
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none transition focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#3E5145]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#52745D] hover:underline"
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
                className="w-full rounded-xl border border-[#D7DFD5] bg-[#FCFCF9] px-4 py-3 text-[#263D31] outline-none transition focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#3F604B] px-5 py-3.5 text-white font-medium transition hover:bg-[#314C3B] active:scale-[0.99]"
            >
              Sign in
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E7E0]" />
            <span className="text-xs text-[#879289]">or</span>
            <div className="h-px flex-1 bg-[#E2E7E0]" />
          </div>

          <p className="text-center text-sm text-[#718078]">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#3F604B] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#879289] mt-6">
          Your wellbeing matters. Take things one step at a time.
        </p>
      </div>
    </div>
  );
}

export default Login;