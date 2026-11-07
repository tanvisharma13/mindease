
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";

const moods = [
  { value: 1, emoji: "😔", label: "Struggling" },
  { value: 2, emoji: "😞", label: "Low" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😊", label: "Great" },
];

const factors = [
  "Sleep",
  "Work",
  "Exercise",
  "Social",
  "Diet",
  "Outdoors",
  "Stress",
];

// Convert a date into the user's local YYYY-MM-DD format
const getDateKey = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Convert backend mood label into frontend numeric value
const getMoodValue = (label) => {
  return moods.find((mood) => mood.label === label)?.value || 0;
};

// Get emoji for a backend mood label
const getMoodEmoji = (label) => {
  return moods.find((mood) => mood.label === label)?.emoji || "🙂";
};

function MoodTracker() {
  const [entries, setEntries] = useState([]);

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const today = getDateKey(new Date());

  // Fetch mood history from MongoDB
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/moods");

        const moodEntries = response.moods || [];

        setEntries(moodEntries);

        // Restore today's existing mood if available
        const existingTodayEntry = moodEntries.find(
          (entry) => getDateKey(entry.date) === today
        );

        if (existingTodayEntry) {
          setSelectedMood(getMoodValue(existingTodayEntry.mood));
          setSelectedFactors(existingTodayEntry.factors || []);
          setNote(existingTodayEntry.note || "");
        }
      } catch (err) {
        setError(err.message || "Unable to load mood history.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  // Find today's existing entry
  const todayEntry = entries.find(
    (entry) => getDateKey(entry.date) === today
  );

  const selectMood = (value) => {
    setSelectedMood(value);
    setMessage("");
    setError("");
  };

  // Select or deselect mood factors
  const toggleFactor = (factor) => {
    setSelectedFactors((current) =>
      current.includes(factor)
        ? current.filter((item) => item !== factor)
        : [...current, factor]
    );

    setMessage("");
  };

  // Save or update today's mood
  const saveMood = async () => {
    if (!selectedMood) {
      setMessage("Please choose how you're feeling first.");
      return;
    }

    const selectedMoodData = moods.find(
      (mood) => mood.value === selectedMood
    );

    if (!selectedMoodData) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const moodData = {
        mood: selectedMoodData.label,
        factors: selectedFactors,
        note: note.trim(),
        date: new Date(`${today}T12:00:00`).toISOString(),
      };

      let response;

      if (todayEntry) {
        // Update existing mood entry
        response = await apiRequest(`/moods/${todayEntry._id}`, {
          method: "PUT",
          body: moodData,
        });
      } else {
        // Create a new mood entry
        response = await apiRequest("/moods", {
          method: "POST",
          body: moodData,
        });
      }

      const savedMood = response.mood;

      // Update frontend state using the backend response
      setEntries((current) => [
        savedMood,
        ...current.filter(
          (entry) =>
            entry._id !== savedMood._id &&
            getDateKey(entry.date) !== today
        ),
      ]);

      setMessage(
        todayEntry
          ? "Your mood has been updated successfully."
          : "Your mood has been saved successfully."
      );
    } catch (err) {
      setError(err.message || "Unable to save your mood.");
    } finally {
      setSaving(false);
    }
  };

  // Calculate average mood
  const averageMood = useMemo(() => {
    if (entries.length === 0) return "—";

    const validValues = entries
      .map((entry) => getMoodValue(entry.mood))
      .filter((value) => value > 0);

    if (validValues.length === 0) return "—";

    const total = validValues.reduce(
      (sum, value) => sum + value,
      0
    );

    return (total / validValues.length).toFixed(1);
  }, [entries]);

  // Find highest recorded mood
  const bestMood =
    entries.length > 0
      ? Math.max(
          ...entries.map((entry) => getMoodValue(entry.mood))
        )
      : null;

  // Prepare last 14 mood entries for chart
  const chartEntries = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14);

  return (
    <div className="min-h-screen bg-[#f4f5ef] px-5 py-12 text-[#18231f] md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#557486]">
            DAILY CHECK-IN
          </p>

          <h1 className="font-serif text-5xl font-normal tracking-tight md:text-6xl">
            Mood tracker
          </h1>

          <p className="mt-3 max-w-xl text-lg leading-8 text-[#60766e]">
            A gentle daily check-in to notice how you're feeling
            without judging it.
          </p>
        </div>

        {/* Mood Form */}
        <section className="rounded-3xl border border-[#d8ddd7] bg-white p-6 shadow-sm md:p-9">

          <h2 className="font-serif text-2xl">
            How are you feeling right now?
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {moods.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => selectMood(mood.value)}
                className={`rounded-2xl border-2 p-5 transition ${
                  selectedMood === mood.value
                    ? "border-[#557a6a] bg-[#e5ede8]"
                    : "border-transparent bg-[#f1f3ee] hover:border-[#cbd7d0]"
                }`}
              >
                <span className="block text-3xl">
                  {mood.emoji}
                </span>

                <span className="mt-2 block text-sm font-semibold">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {/* Factors */}
          <h2 className="mt-10 font-serif text-2xl">
            What's influencing your mood?
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {factors.map((factor) => (
              <button
                key={factor}
                type="button"
                onClick={() => toggleFactor(factor)}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  selectedFactors.includes(factor)
                    ? "border-[#557a6a] bg-[#557a6a] text-white"
                    : "border-[#d8ddd7] bg-white text-[#60766e] hover:border-[#557a6a]"
                }`}
              >
                {factor}
              </button>
            ))}
          </div>

          {/* Note */}
          <textarea
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
              setMessage("");
            }}
            placeholder="Add a note about your day (optional)..."
            className="mt-7 min-h-32 w-full resize-y rounded-2xl border border-[#d8ddd7] bg-[#f5f6f1] p-5 text-[#18231f] outline-none placeholder:text-[#8a9993] focus:border-[#557a6a]"
          />

          {/* Save Button */}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={saveMood}
              disabled={!selectedMood || saving || loading}
              className="rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white transition hover:bg-[#365a4c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving
                ? "Saving..."
                : todayEntry
                  ? "Update today's mood"
                  : "Log mood"}
            </button>

            {message && (
              <span className="text-sm font-medium text-[#365a4c]">
                {message}
              </span>
            )}

            {error && (
              <span className="text-sm font-medium text-red-600">
                {error}
              </span>
            )}
          </div>
        </section>

        {/* Statistics */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {loading ? "..." : averageMood}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Average mood
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {loading ? "..." : entries.length}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Check-ins
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {loading
                ? "..."
                : bestMood
                  ? getMoodEmoji(
                      moods.find((mood) => mood.value === bestMood)?.label
                    )
                  : "—"}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Best recently
            </p>
          </div>

        </div>

        {/* Mood Chart */}
        <section className="mt-5 rounded-3xl border border-[#d8ddd7] bg-white p-6 md:p-8">

          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">
              Mood over time
            </h2>

            <span className="text-sm text-[#60766e]">
              Last {Math.min(entries.length, 14)} check-ins
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-[#60766e]">
              Loading your mood history...
            </div>
          ) : error && entries.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center text-center text-red-600">
              Unable to load mood history. Please try refreshing.
            </div>
          ) : chartEntries.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center text-[#60766e]">
              <span className="text-4xl text-[#557a6a]">
                ◇
              </span>

              <p className="mt-3">
                Your mood history will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-8 flex h-72 items-end gap-2 border-b border-dashed border-[#d8ddd7] px-2 md:gap-4">
              {chartEntries.map((entry) => {
                const value = getMoodValue(entry.mood);

                return (
                  <div
                    key={entry._id}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      title={`${entry.mood}: ${value}/5`}
                      className="w-full max-w-10 rounded-t-lg bg-[#557a6a]"
                      style={{
                        height: `${value * 20}%`,
                        minHeight: "10px",
                      }}
                    />

                    <span className="text-[10px] text-[#60766e] md:text-xs">
                      {new Date(entry.date).toLocaleDateString(
                        "en",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default MoodTracker;
