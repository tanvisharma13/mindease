import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("mindease_user"));

  const moodEntries =
    JSON.parse(localStorage.getItem("mindease_moods")) || [];

  const journalEntries =
    JSON.parse(localStorage.getItem("mindease_journal")) || [];

  if (!user) {
    navigate("/login");
    return null;
  }

  const latestMood = moodEntries[moodEntries.length - 1];

  const logout = () => {
    localStorage.removeItem("mindease_user");
    navigate("/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-sm text-[#6B7B70] mb-2">
              {getGreeting()}, {user.name.split(" ")[0]}
            </p>

            <h1 className="text-4xl md:text-5xl font-serif text-[#263D31]">
              How are you feeling today?
            </h1>

            <p className="mt-3 text-[#718078]">
              There&apos;s no right answer. Just check in with yourself.
            </p>
          </div>

          <button
            onClick={logout}
            className="self-start rounded-full border border-[#CDD8CE] px-5 py-2.5 text-sm text-[#486052] hover:bg-white transition"
          >
            Sign out
          </button>
        </div>

        <section className="bg-[#DDE8DC] rounded-3xl p-7 md:p-9 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#52705A] mb-3">
              A small reminder
            </p>

            <h2 className="text-3xl md:text-4xl font-serif text-[#294332]">
              You don&apos;t have to have everything figured out.
            </h2>

            <p className="mt-4 text-[#53685A] leading-relaxed">
              Take things one moment at a time. MindEase is here whenever
              you need a quiet place to pause.
            </p>

            <Link
              to="/chat"
              className="inline-block mt-6 rounded-full bg-[#3F604B] text-white px-6 py-3 text-sm font-medium hover:bg-[#314C3B] transition"
            >
              Talk to your companion →
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-5 mb-8">
          <Link
            to="/mood"
            className="bg-white border border-[#DCE3D9] rounded-2xl p-6 hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-5">🌿</div>

            <h3 className="text-xl font-serif text-[#304737]">
              Mood tracker
            </h3>

            <p className="text-sm text-[#718078] mt-2">
              Check in and understand your emotional patterns.
            </p>

            <span className="inline-block mt-5 text-sm font-medium text-[#52745D]">
              Check in →
            </span>
          </Link>

          <Link
            to="/journal"
            className="bg-white border border-[#DCE3D9] rounded-2xl p-6 hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-5">📖</div>

            <h3 className="text-xl font-serif text-[#304737]">
              Private journal
            </h3>

            <p className="text-sm text-[#718078] mt-2">
              Put your thoughts into words in your own private space.
            </p>

            <span className="inline-block mt-5 text-sm font-medium text-[#52745D]">
              Write something →
            </span>
          </Link>

          <Link
            to="/wellness"
            className="bg-white border border-[#DCE3D9] rounded-2xl p-6 hover:-translate-y-1 transition"
          >
            <div className="text-3xl mb-5">🫧</div>

            <h3 className="text-xl font-serif text-[#304737]">
              Wellness
            </h3>

            <p className="text-sm text-[#718078] mt-2">
              Try breathing, grounding and mindfulness exercises.
            </p>

            <span className="inline-block mt-5 text-sm font-medium text-[#52745D]">
              Explore →
            </span>
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-[#DCE3D9] rounded-2xl p-6">
            <p className="text-sm text-[#7A887E]">
              Latest mood
            </p>

            {latestMood ? (
              <>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-4xl">
                    {latestMood.emoji || "🙂"}
                  </span>

                  <div>
                    <h3 className="text-xl font-serif text-[#304737]">
                      {latestMood.mood}
                    </h3>

                    <p className="text-sm text-[#7A887E]">
                      {new Date(latestMood.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <p className="text-[#718078]">
                  You haven&apos;t logged a mood yet.
                </p>

                <Link
                  to="/mood"
                  className="inline-block mt-4 text-sm font-medium text-[#52745D]"
                >
                  Log your first mood →
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white border border-[#DCE3D9] rounded-2xl p-6">
            <p className="text-sm text-[#7A887E]">
              Journal entries
            </p>

            <p className="text-4xl font-serif text-[#304737] mt-3">
              {journalEntries.length}
            </p>

            <p className="text-sm text-[#718078] mt-1">
              entries written so far
            </p>

            <Link
              to="/journal"
              className="inline-block mt-4 text-sm font-medium text-[#52745D]"
            >
              Open journal →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;