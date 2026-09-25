import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || null;

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [message, setMessage] = useState("");

  const saveProfile = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Please complete all fields.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser?.id) {
        return {
          ...user,
          name: name.trim(),
          email: email.trim(),
        };
      }

      return user;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedCurrentUser = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    setMessage("Your profile has been updated.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!currentUser) {
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

  const initial =
    name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#f4f5ef] px-5 py-14 text-[#18231f]">
      <div className="mx-auto max-w-3xl">

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

        <section className="rounded-3xl border border-[#d8ddd7] bg-white p-6 shadow-sm md:p-9">

          <form onSubmit={saveProfile}>

            <label className="block text-sm font-semibold">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="mt-2 h-14 w-full rounded-xl border border-[#d8ddd7] bg-[#fafbf8] px-4 outline-none focus:border-[#557a6a]"
            />

            <label className="mt-6 block text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="mt-2 h-14 w-full rounded-xl border border-[#d8ddd7] bg-[#fafbf8] px-4 outline-none focus:border-[#557a6a]"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white hover:bg-[#365a4c]"
              >
                Save changes
              </button>

              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-[#f5e5e2] px-7 py-3.5 font-semibold text-[#a05046]"
              >
                Log out
              </button>
            </div>

            {message && (
              <p className="mt-5 text-sm font-medium text-[#365a4c]">
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default Profile;