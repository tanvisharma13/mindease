
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const { user, updateUser, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Keep form fields synchronized with the logged-in user
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  // Save profile changes to MongoDB
  const saveProfile = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await apiRequest("/auth/me", {
        method: "PUT",
        body: {
          name: name.trim(),
          email: email.trim(),
        },
      });

      // Update AuthContext so Navbar also shows new details
      updateUser(response.user);

      setMessage("Your profile has been updated successfully.");
    } catch (error) {
      setError(error.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  // Logout using AuthContext
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f5ef] px-5">
        <div className="rounded-3xl border border-[#d8ddd7] bg-white p-10 text-center">
          <h1 className="font-serif text-3xl">
            You're not signed in
          </h1>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 rounded-full bg-[#557a6a] px-6 py-3 font-semibold text-white"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f4f5ef] px-5 py-14 text-[#18231f]">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#557a6a] text-3xl font-semibold text-white">
            {initial}
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-[#557486]">
            YOUR ACCOUNT
          </p>

          <h1 className="mt-2 font-serif text-5xl font-normal">
            Your profile
          </h1>

          <p className="mt-3 text-lg text-[#60766e]">
            Manage your personal information and account.
          </p>
        </div>

        {/* Profile form */}
        <section className="rounded-3xl border border-[#d8ddd7] bg-white p-6 shadow-sm md:p-9">

          <form onSubmit={saveProfile}>

            <label className="block text-sm font-semibold">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 h-14 w-full rounded-xl border border-[#d8ddd7] bg-[#fafbf8] px-4 outline-none focus:border-[#557a6a]"
            />

            <label className="mt-6 block text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 h-14 w-full rounded-xl border border-[#d8ddd7] bg-[#fafbf8] px-4 outline-none focus:border-[#557a6a]"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white hover:bg-[#365a4c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#f5e5e2] px-7 py-3.5 font-semibold text-[#a05046]"
              >
                Log out
              </button>

            </div>

            {message && (
              <p
                role="status"
                className="mt-5 text-sm font-medium text-[#365a4c]"
              >
                {message}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="mt-5 text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}

          </form>
        </section>
      </div>
    </div>
  );
}

export default Profile;
