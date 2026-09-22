import { useMemo, useState } from "react";

const moods = [
  {
    value: 1,
    emoji: "😔",
    label: "Struggling",
  },
  {
    value: 2,
    emoji: "😞",
    label: "Low",
  },
  {
    value: 3,
    emoji: "😐",
    label: "Okay",
  },
  {
    value: 4,
    emoji: "🙂",
    label: "Good",
  },
  {
    value: 5,
    emoji: "😊",
    label: "Great",
  },
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

function MoodTracker() {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("moodEntries")) || [];
  });

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const todayEntry = entries.find((entry) => entry.date === today);

  const selectMood = (value) => {
    setSelectedMood(value);
    setMessage("");
  };

  const toggleFactor = (factor) => {
    setSelectedFactors((current) =>
      current.includes(factor)
        ? current.filter((item) => item !== factor)
        : [...current, factor]
    );
  };

  const saveMood = () => {
    if (!selectedMood) {
      setMessage("Please choose how you're feeling first.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: today,
      value: selectedMood,
      factors: selectedFactors,
      note: note.trim(),
    };

    const updatedEntries = [
      ...entries.filter((entry) => entry.date !== today),
      newEntry,
    ];

    localStorage.setItem(
      "moodEntries",
      JSON.stringify(updatedEntries)
    );

    setEntries(updatedEntries);
    setMessage("Your mood has been saved.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const averageMood = useMemo(() => {
    if (entries.length === 0) {
      return "—";
    }

    const total = entries.reduce(
      (sum, entry) => sum + Number(entry.value),
      0
    );

    return (total / entries.length).toFixed(1);
  }, [entries]);

  const bestMood =
    entries.length > 0
      ? Math.max(...entries.map((entry) => Number(entry.value)))
      : null;

  const chartEntries = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
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

        {/* Mood form */}
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
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add a note about your day (optional)..."
            className="mt-7 min-h-32 w-full resize-y rounded-2xl border border-[#d8ddd7] bg-[#f5f6f1] p-5 text-[#18231f] outline-none placeholder:text-[#8a9993] focus:border-[#557a6a]"
          />

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={saveMood}
              disabled={!selectedMood}
              className="rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white transition hover:bg-[#365a4c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {todayEntry ? "Update today's mood" : "Log mood"}
            </button>

            {message && (
              <span className="text-sm font-medium text-[#365a4c]">
                {message}
              </span>
            )}
          </div>
        </section>

        {/* Statistics */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {averageMood}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Average mood
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {entries.length}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Check-ins
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8ddd7] bg-white p-6 text-center">
            <strong className="font-serif text-4xl">
              {bestMood
                ? moods.find((mood) => mood.value === bestMood)?.emoji
                : "—"}
            </strong>

            <p className="mt-2 text-sm text-[#60766e]">
              Best recently
            </p>
          </div>
        </div>

        {/* Chart */}
        <section className="mt-5 rounded-3xl border border-[#d8ddd7] bg-white p-6 md:p-8">

          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">
              Mood over time
            </h2>

            <span className="text-sm text-[#60766e]">
              Last {Math.min(entries.length, 14)} check-ins
            </span>
          </div>

          {chartEntries.length === 0 ? (
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
              {chartEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    title={`${entry.date}: ${entry.value}/5`}
                    className="w-full max-w-10 rounded-t-lg bg-[#557a6a]"
                    style={{
                      height: `${entry.value * 20}%`,
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MoodTracker;