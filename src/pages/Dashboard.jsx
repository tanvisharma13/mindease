
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

// Mood levels used by the MindEase mood tracker
const MOOD_LEVELS = {
  struggling: { emoji: "😔" },
  low: { emoji: "😞" },
  okay: { emoji: "😐" },
  good: { emoji: "🙂" },
  great: { emoji: "😊" },
};

// Daily affirmations
const AFFIRMATIONS = [
  "I am allowed to grow at my own pace. Every small step matters.",
  "I deserve the same kindness and patience that I give to others.",
  "I do not have to be perfect to be worthy.",
  "My feelings are valid, and it is okay to take a break.",
  "I am stronger than I think, and I can handle today one step at a time.",
  "I choose to focus on what I can control and let go of what I cannot.",
  "Every day is a new opportunity to take care of myself.",
  "I am proud of myself for continuing, even when things feel difficult.",
  "I give myself permission to rest without feeling guilty.",
  "Small progress is still progress.",
  "I am learning, growing, and becoming better every day.",
  "I deserve peace, happiness, and healthy relationships.",
  "I can make mistakes and still be worthy of love and respect.",
  "Today, I choose to be gentle with myself.",
];

// Get mood emoji
const getMoodEmoji = (mood) => {
  return MOOD_LEVELS[mood?.toLowerCase()]?.emoji || "🙂";
};

// Format activity dates
const formatActivityDate = (date) => {
  if (!date) return "";

  const activityDate = new Date(date);

  if (Number.isNaN(activityDate.getTime())) return "";

  return activityDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Get a consistent affirmation for the current day
const getDailyAffirmationIndex = () => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const dayNumber = Math.floor(startOfDay.getTime() / 86400000);

  return dayNumber % AFFIRMATIONS.length;
};

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Daily affirmation state
  const [affirmationIndex, setAffirmationIndex] = useState(
    getDailyAffirmationIndex
  );

  // Fetch dashboard information
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/dashboard");
        setDashboard(response.dashboard);
      } catch (err) {
        setError(err.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const latestMood = dashboard?.latestMood;
  const latestJournals = dashboard?.latestJournals || [];
  const journalCount = dashboard?.journalCount ?? 0;

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
  };

  // Show another affirmation
  const showAnotherAffirmation = () => {
    setAffirmationIndex((previousIndex) => {
      return (previousIndex + 1) % AFFIRMATIONS.length;
    });
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

        {/* Welcome Section */}
        <section className="mb-10">
          <p className="text-sm text-[#6B7B70] mb-2">
            {getGreeting()}, {user?.name?.split(" ")[0] || "there"}
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-[#263D31]">
            How are you feeling today?
          </h1>

          <p className="mt-3 text-[#718078]">
            There's no right answer. Just check in with yourself.
          </p>
        </section>

        {/* Daily Affirmation */}
        <section className="bg-[#E8EDE2] border border-[#D6E0D2] rounded-3xl p-6 md:p-7 mb-8">

          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-[#66806A]">
              A MOMENT FOR YOU
            </p>

            <span className="text-2xl">🌿</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-[#304737] mt-3">
            Today's Affirmation
          </h2>

          <p className="text-lg md:text-xl font-serif italic text-[#365342] leading-relaxed mt-4">
            "{AFFIRMATIONS[affirmationIndex]}"
          </p>

          <p className="text-sm text-[#718078] mt-3">
            Take a breath. Read it. Believe it.
          </p>

          <button
            type="button"
            onClick={showAnotherAffirmation}
            className="mt-5 rounded-full border border-[#78917D] text-[#3F604B] px-5 py-2.5 text-sm font-medium hover:bg-[#DDE8DC] transition"
          >
            Show another affirmation ↻
          </button>
        </section>

        {/* Feature Cards */}
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

        {/* Dashboard Statistics */}
        <section className="grid md:grid-cols-2 gap-5 mb-8">

          {/* Latest Mood */}
          <div className="bg-white border border-[#DCE3D9] rounded-2xl p-6">
            <p className="text-sm text-[#7A887E]">
              Latest mood
            </p>

            {loading ? (
              <p className="mt-4 text-[#718078]">
                Loading your mood...
              </p>
            ) : error ? (
              <p className="mt-4 text-sm text-red-600">
                Unable to load mood information.
              </p>
            ) : latestMood ? (
              <div className="flex items-center gap-4 mt-4">
                <span className="text-4xl">
                  {latestMood.emoji || getMoodEmoji(latestMood.mood)}
                </span>

                <div>
                  <h3 className="text-xl font-serif text-[#304737]">
                    {latestMood.mood}
                  </h3>

                  <p className="text-sm text-[#7A887E]">
                    {formatActivityDate(latestMood.date)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-[#718078]">
                  You haven't logged a mood yet.
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

          {/* Journal Count */}
          <div className="bg-white border border-[#DCE3D9] rounded-2xl p-6">
            <p className="text-sm text-[#7A887E]">
              Journal entries
            </p>

            {loading ? (
              <p className="mt-4 text-[#718078]">
                Loading your journal...
              </p>
            ) : error ? (
              <p className="mt-4 text-sm text-red-600">
                Unable to load journal information.
              </p>
            ) : (
              <>
                <p className="text-4xl font-serif text-[#304737] mt-3">
                  {journalCount}
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
              </>
            )}
          </div>

        </section>

        {/* Recent Activity */}
        <section className="bg-white border border-[#DCE3D9] rounded-3xl p-6 md:p-8 mb-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-[#7A887E]">
                YOUR JOURNEY
              </p>

              <h2 className="text-2xl md:text-3xl font-serif text-[#304737] mt-2">
                Recent Activity
              </h2>

              <p className="text-sm text-[#718078] mt-2">
                A little look at the moments you've recorded.
              </p>
            </div>

            <span className="text-2xl">🌱</span>
          </div>

          {loading ? (
            <p className="text-[#718078] py-5">
              Loading your recent activity...
            </p>
          ) : error ? (
            <p className="text-sm text-red-600 py-5">
              Unable to load recent activity.
            </p>
          ) : latestMood || latestJournals.length > 0 ? (
            <div className="space-y-4">

              {/* Latest Mood Activity */}
              {latestMood && (
                <Link
                  to="/mood"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#F3F6F0] hover:bg-[#EAF0E7] transition"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#DDE8DC] flex items-center justify-center text-2xl">
                    {latestMood.emoji || getMoodEmoji(latestMood.mood)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#304737]">
                      You checked in with your mood
                    </p>

                    <p className="text-sm text-[#718078] mt-1">
                      You were feeling {latestMood.mood}.
                    </p>

                    <p className="text-xs text-[#8A968D] mt-1">
                      {formatActivityDate(latestMood.date)}
                    </p>
                  </div>

                  <span className="text-[#78917D]">→</span>
                </Link>
              )}

              {/* Recent Journal Activities */}
              {latestJournals.map((entry, index) => {
                const journalText =
                  entry.title ||
                  entry.content ||
                  entry.text ||
                  "You added a new reflection.";

                const journalDate =
                  entry.entryDate ||
                  entry.createdAt ||
                  entry.updatedAt;

                return (
                  <Link
                    to="/journal"
                    key={entry._id || index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#F3F6F0] hover:bg-[#EAF0E7] transition"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#E8E5D9] flex items-center justify-center text-2xl">
                      📖
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#304737]">
                        You added a journal entry
                      </p>

                      <p className="text-sm text-[#718078] mt-1 truncate">
                        {journalText}
                      </p>

                      <p className="text-xs text-[#8A968D] mt-1">
                        {formatActivityDate(journalDate)}
                      </p>
                    </div>

                    <span className="text-[#78917D]">→</span>
                  </Link>
                );
              })}

            </div>
          ) : (
            <div className="text-center py-10 rounded-2xl bg-[#F3F6F0]">
              <div className="text-4xl mb-3">🌿</div>

              <h3 className="text-lg font-serif text-[#304737]">
                Your journey starts here
              </h3>

              <p className="text-sm text-[#718078] mt-2">
                Your mood check-ins and journal entries will appear here.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-5">
                <Link
                  to="/mood"
                  className="rounded-full bg-[#3F604B] text-white px-5 py-2.5 text-sm hover:bg-[#314C3B] transition"
                >
                  Track your mood
                </Link>

                <Link
                  to="/journal"
                  className="rounded-full border border-[#9DAF9F] text-[#3F604B] px-5 py-2.5 text-sm hover:bg-[#E8EEE6] transition"
                >
                  Write a journal
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-5">
            <Link
              to="/mood"
              className="text-sm font-semibold text-[#52745D] hover:text-[#304737] transition"
            >
              View mood tracker →
            </Link>

            <Link
              to="/journal"
              className="text-sm font-semibold text-[#52745D] hover:text-[#304737] transition"
            >
              View journal →
            </Link>
          </div>
        </section>

        {/* My Account Section */}
        <section className="bg-white border border-[#DCE3D9] rounded-3xl p-6 md:p-8 mb-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-[#7A887E]">
                ACCOUNT SETTINGS
              </p>

              <h2 className="text-2xl font-serif text-[#304737] mt-1">
                My Account
              </h2>
            </div>

            <span className="text-2xl">👤</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            <div className="w-16 h-16 shrink-0 rounded-full bg-[#DDE8DC] flex items-center justify-center text-2xl font-semibold text-[#31503E]">
              {initial}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif text-[#304737]">
                {user?.name || "MindEase User"}
              </h3>

              <p className="text-sm text-[#7A887E] mt-1 break-all">
                {user?.email || "Email not available"}
              </p>

              <p className="text-xs text-[#8B978E] mt-2">
                Your personal account information
              </p>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3F604B] px-6 py-3 text-sm font-medium text-white hover:bg-[#314C3B] transition"
            >
              <span>✎</span>
              Edit Profile
            </Link>

          </div>
        </section>

        {/* Mental Health Support - Tele MANAS */}
        <section className="bg-[#E8EDE5] border border-[#D5DFD2] rounded-3xl p-6 md:p-8 mb-6">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-2xl">
              💚
            </div>

            <div className="flex-1">

              <p className="text-xs uppercase tracking-[0.15em] font-medium text-[#66806A]">
                YOU DON'T HAVE TO FACE IT ALONE
              </p>

              <h2 className="text-2xl md:text-3xl font-serif text-[#304737] mt-2">
                Need someone to talk to?
              </h2>

              <p className="text-sm md:text-base text-[#53685A] leading-relaxed mt-3">
                If you are experiencing emotional distress or need
                professional mental health support, you can reach out
                to Tele-MANAS, a free 24/7 mental health helpline
                provided by the Government of India.
              </p>

              <div className="mt-5 bg-white rounded-2xl p-5">

                <p className="text-sm font-medium text-[#66806A]">
                  TELE-MANAS HELPLINE
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">

                  <a
                    href="tel:14416"
                    className="text-3xl font-serif font-semibold text-[#304737] hover:text-[#52745D] transition"
                  >
                    14416
                  </a>

                  <span className="hidden sm:block text-[#A1ADA2]">
                    or
                  </span>

                  <a
                    href="tel:18008914416"
                    className="text-xl font-medium text-[#52745D] hover:text-[#304737] transition"
                  >
                    1800-89-14416
                  </a>

                </div>

                <p className="text-xs text-[#718078] mt-3">
                  Free • Available 24 hours a day • Across India
                </p>

                <a
                  href="https://telemanas.mohfw.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold text-[#52745D] hover:text-[#304737] transition"
                >
                  Visit official Tele-MANAS website →
                </a>

              </div>

              <p className="text-xs text-[#718078] leading-relaxed mt-5">
                MindEase is not an emergency or crisis response service.
                If you or someone else is in immediate danger, contact
                local emergency services or visit the nearest emergency
                department.
              </p>

            </div>
          </div>
        </section>

        {/* Footer Note */}
        <p className="text-center text-xs text-[#8A968D] py-3">
          Take care of yourself. You matter. 💚
        </p>

      </main>
    </div>
  );
}

export default Dashboard;
