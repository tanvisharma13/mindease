
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../services/api";

const moods = [
  {
    value: 1,
    emoji: "😔",
    label: "Struggling",
    description: "Things feel especially difficult.",
  },
  {
    value: 2,
    emoji: "😞",
    label: "Low",
    description: "I'm feeling a little down.",
  },
  {
    value: 3,
    emoji: "😐",
    label: "Okay",
    description: "I'm somewhere in the middle.",
  },
  {
    value: 4,
    emoji: "🙂",
    label: "Good",
    description: "I'm feeling pretty good.",
  },
  {
    value: 5,
    emoji: "😊",
    label: "Great",
    description: "I'm feeling really positive.",
  },
];

const factors = [
  "Sleep",
  "Studies",
  "Work",
  "Exercise",
  "Relationships",
  "Family",
  "Social",
  "Social media",
  "Diet",
  "Outdoors",
  "Stress",
  "Other",
];

const chartFilters = [
  { label: "7 days", value: "week" },
  { label: "This month", value: "month" },
  { label: "All time", value: "all" },
];

const getDateKey = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getMoodValue = (label) =>
  moods.find((mood) => mood.label === label)?.value || 0;

const getMoodData = (label) =>
  moods.find((mood) => mood.label === label);

const getMoodEmoji = (label) =>
  getMoodData(label)?.emoji || "🙂";

const formatDate = (date, options = {}) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    ...options,
  });

const formatMonth = (date) =>
  date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

const getStartOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

function MoodTracker() {
  const [entries, setEntries] = useState([]);

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState("");

  const [message, setMessage] = useState("");
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [chartFilter, setChartFilter] = useState("week");
  const [historyView, setHistoryView] = useState("calendar");

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() =>
    getDateKey(new Date())
  );

  const today = getDateKey(new Date());

  // Load mood history.
  const fetchMoods = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await apiRequest("/moods");
      const moodEntries = response.moods || [];

      setEntries(moodEntries);

      const existingTodayEntry = moodEntries.find(
        (entry) => getDateKey(entry.date) === today
      );

      if (existingTodayEntry) {
        setSelectedMood(getMoodValue(existingTodayEntry.mood));
        setSelectedFactors(existingTodayEntry.factors || []);
        setNote(existingTodayEntry.note || "");
      }
    } catch (err) {
      setLoadError(
        err.message || "Unable to load your mood history. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
    // Load once when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayEntry = entries.find(
    (entry) => getDateKey(entry.date) === today
  );

  const sortedEntries = useMemo(
    () =>
      [...entries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    [entries]
  );

  const entriesByDate = useMemo(() => {
    const map = {};

    entries.forEach((entry) => {
      const key = getDateKey(entry.date);
      if (key) map[key] = entry;
    });

    return map;
  }, [entries]);

  const selectedDateEntry = entriesByDate[selectedDate];

  // Mood statistics.
  const validMoodValues = useMemo(
    () =>
      entries
        .map((entry) => getMoodValue(entry.mood))
        .filter((value) => value > 0),
    [entries]
  );

  const averageMood = useMemo(() => {
    if (!validMoodValues.length) return "—";

    const average =
      validMoodValues.reduce((sum, value) => sum + value, 0) /
      validMoodValues.length;

    return average.toFixed(1);
  }, [validMoodValues]);

  const mostFrequentMood = useMemo(() => {
    if (!entries.length) return null;

    const counts = {};

    entries.forEach((entry) => {
      if (getMoodValue(entry.mood)) {
        counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      }
    });

    const mostFrequent = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return mostFrequent
      ? {
          label: mostFrequent[0],
          count: mostFrequent[1],
        }
      : null;
  }, [entries]);

  // Current week's entries for a simple reflection.
  const weeklyEntries = useMemo(() => {
    const now = getStartOfDay(new Date());
    const start = new Date(now);
    start.setDate(start.getDate() - 6);

    return entries.filter((entry) => {
      const date = getStartOfDay(entry.date);
      return date >= start && date <= now;
    });
  }, [entries]);

  const weeklyAverage = useMemo(() => {
    const values = weeklyEntries
      .map((entry) => getMoodValue(entry.mood))
      .filter(Boolean);

    if (!values.length) return null;

    return (
      values.reduce((sum, value) => sum + value, 0) / values.length
    ).toFixed(1);
  }, [weeklyEntries]);

  const commonWeeklyFactor = useMemo(() => {
    const counts = {};

    weeklyEntries.forEach((entry) => {
      (entry.factors || []).forEach((factor) => {
        counts[factor] = (counts[factor] || 0) + 1;
      });
    });

    const result = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return result ? result[0] : null;
  }, [weeklyEntries]);

  // Chart filter.
  const chartEntries = useMemo(() => {
    const now = getStartOfDay(new Date());

    let filtered = [...entries];

    if (chartFilter === "week") {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);

      filtered = filtered.filter((entry) => {
        const date = getStartOfDay(entry.date);
        return date >= start && date <= now;
      });
    } else if (chartFilter === "month") {
      filtered = filtered.filter((entry) => {
        const date = new Date(entry.date);

        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        );
      });
    }

    return filtered
      .filter((entry) => getMoodValue(entry.mood) > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-14);
  }, [entries, chartFilter]);

  const selectMood = (value) => {
    setSelectedMood(value);
    setMessage("");
    setSaveError("");
  };

  const toggleFactor = (factor) => {
    setSelectedFactors((current) =>
      current.includes(factor)
        ? current.filter((item) => item !== factor)
        : [...current, factor]
    );

    setMessage("");
    setSaveError("");
  };

  // Save or update today's mood.
  const saveMood = async () => {
    if (!selectedMood) {
      setMessage("Please choose how you're feeling first.");
      return;
    }

    const selectedMoodData = moods.find(
      (mood) => mood.value === selectedMood
    );

    if (!selectedMoodData || saving) return;

    try {
      setSaving(true);
      setSaveError("");
      setMessage("");

      const moodData = {
        mood: selectedMoodData.label,
        factors: selectedFactors,
        note: note.trim(),
        date: new Date(`${today}T12:00:00`).toISOString(),
      };

      let response;

      if (todayEntry) {
        response = await apiRequest(`/moods/${todayEntry._id}`, {
          method: "PUT",
          body: moodData,
        });
      } else {
        response = await apiRequest("/moods", {
          method: "POST",
          body: moodData,
        });
      }

      if (!response.mood) {
        throw new Error("Your mood could not be saved. Please try again.");
      }

      const savedMood = response.mood;

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
          ? "Your check-in has been updated."
          : "Your check-in has been saved. Thank you for checking in."
      );
    } catch (err) {
      setSaveError(err.message || "Unable to save your mood.");
    } finally {
      setSaving(false);
    }
  };

  // Calendar helpers.
  const changeMonth = (amount) => {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1
        )
    );
  };

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const offset = firstDay.getDay();
    const cells = [];

    for (let i = 0; i < offset; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      cells.push({
        day,
        key: getDateKey(date),
      });
    }

    return cells;
  }, [calendarMonth]);

  const monthEntryCount = useMemo(
    () =>
      entries.filter((entry) => {
        const date = new Date(entry.date);

        return (
          date.getFullYear() === calendarMonth.getFullYear() &&
          date.getMonth() === calendarMonth.getMonth()
        );
      }).length,
    [entries, calendarMonth]
  );

  const selectedMoodData = moods.find(
    (mood) => mood.value === selectedMood
  );

  return (
    <div className="min-h-screen page px-4 py-10 text-ink sm:px-6 md:px-10 md:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <header className="mb-9 md:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            YOUR PERSONAL SPACE
          </p>

          <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl">
            Mood tracker
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Take a moment to check in with yourself. Notice how
            you're feeling, without judging or comparing.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="rounded-full tile-brand px-3 py-1.5 text-brand">
              {formatDate(new Date(), {
                weekday: "long",
                year: "numeric",
              })}
            </span>

            {todayEntry && (
              <span className="rounded-full accent-badge px-3 py-1.5">
                Today's check-in saved
              </span>
            )}
          </div>
        </header>

        {/* Check-in form */}
        <section className="rounded-[28px] border border-line surface-card p-5 shadow-sm sm:p-7 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                DAILY CHECK-IN
              </p>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                How are you feeling today?
              </h2>

              <p className="mt-2 text-sm text-muted">
                There's no right or wrong answer.
              </p>
            </div>

            {todayEntry && (
              <span className="rounded-full tile-brand px-3 py-1.5 text-xs font-medium text-action">
                Already checked in
              </span>
            )}
          </div>

          {/* Mood choices */}
          <div
            className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
            role="group"
            aria-label="Choose your mood"
          >
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.value;

              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => selectMood(mood.value)}
                  aria-pressed={isSelected}
                  className={`group rounded-2xl border p-4 text-left transition duration-200     sm:p-5 ${
                    isSelected
                      ? "mood-selected shadow-sm"
                      : "mood-option hover:-translate-y-0.5"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl">
                      {mood.emoji}
                    </span>

                    {isSelected && (
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full mood-check text-xs"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}
                  </span>

                  <span className="mt-3 block text-sm font-semibold text-ink">
                    {mood.label}
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {mood.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected mood message */}
          <div className="mt-4 min-h-6" aria-live="polite">
            {selectedMoodData && (
              <p className="text-sm text-action">
                You selected <strong>{selectedMoodData.label}</strong>.
                Thank yourself for checking in.
              </p>
            )}
          </div>

          {/* Factors */}
          <div className="mt-8 border-t border-line pt-7">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl">
                What's been influencing your mood?
              </h3>

              <p className="mt-2 text-sm text-muted">
                Choose as many as you like. This section is optional.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {factors.map((factor) => {
                const isSelected = selectedFactors.includes(factor);

                return (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => toggleFactor(factor)}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-4 py-2.5 text-sm transition     ${
                      isSelected
                        ? "factor-selected"
                        : "factor-option"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}
                    {factor}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional note */}
          <div className="mt-8 border-t border-line pt-7">
            <label
              htmlFor="mood-note"
              className="font-serif text-xl sm:text-2xl"
            >
              A little more about today
            </label>

            <p className="mt-2 text-sm text-muted">
              Want to put your thoughts into words? You can, but
              you don't have to.
            </p>

            <textarea
              id="mood-note"
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                setMessage("");
                setSaveError("");
              }}
              maxLength={1000}
              placeholder="Write anything that's on your mind..."
              className="form-input mt-4 min-h-32 w-full resize-y rounded-2xl border p-4 text-sm leading-7 sm:p-5"
            />

            <p className="mt-2 text-right text-xs text-faint">
              {note.length}/1000 characters
            </p>
          </div>

          {/* Save feedback */}
          <div className="mt-5" aria-live="polite">
            {message && (
              <p className="success-soft px-4 py-3 text-sm">
                ✓ {message}
              </p>
            )}

            {saveError && (
              <p className="error-soft px-4 py-3 text-sm">
                {saveError}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={saveMood}
              disabled={!selectedMood || saving || loading}
              className="rounded-full brand-fill px-8 py-3.5 text-sm font-semibold  transition      disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving your check-in..."
                : todayEntry
                  ? "Update today's check-in"
                  : "Save today's check-in"}
            </button>

            <p className="text-xs leading-5 text-faint">
              Your check-in is saved to your MindEase account.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-9">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              YOUR JOURNEY
            </p>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
              Little patterns over time
            </h2>

            <p className="mt-2 text-sm text-muted">
              A simple overview of the check-ins you've recorded.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-line surface-card p-6 shadow-sm">
              <p className="text-sm text-muted">
                Average mood
              </p>

              <div className="mt-4 flex items-end gap-2">
                <span className="font-serif text-4xl text-ink">
                  {averageMood}
                </span>

                <span className="mb-1 text-sm text-faint">
                  / 5
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-faint">
                Based on all your recorded check-ins.
              </p>
            </div>

            <div className="rounded-3xl border border-line surface-card p-6 shadow-sm">
              <p className="text-sm text-muted">
                Total check-ins
              </p>

              <div className="mt-4">
                <span className="font-serif text-4xl text-ink">
                  {entries.length}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-faint">
                Every check-in is a moment spent understanding yourself.
              </p>
            </div>

            <div className="rounded-3xl border border-line surface-card p-6 shadow-sm">
              <p className="text-sm text-muted">
                Most frequent mood
              </p>

              {mostFrequentMood ? (
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-3xl">
                    {getMoodEmoji(mostFrequentMood.label)}
                  </span>

                  <div>
                    <p className="font-serif text-2xl text-ink">
                      {mostFrequentMood.label}
                    </p>

                    <p className="text-xs text-faint">
                      Recorded {mostFrequentMood.count}{" "}
                      {mostFrequentMood.count === 1
                        ? "time"
                        : "times"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 font-serif text-2xl text-faint">
                  Not yet
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-faint">
                This is simply the mood you've recorded most often.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly reflection */}
        <section className="mt-8 rounded-3xl border border-line tile-brand p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            A MOMENT TO REFLECT
          </p>

          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
            Your recent week
          </h2>

          {weeklyEntries.length > 0 ? (
            <>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                You've recorded {weeklyEntries.length}{" "}
                {weeklyEntries.length === 1 ? "check-in" : "check-ins"}{" "}
                in the last seven days.
                {weeklyAverage && (
                  <>
                    {" "}
                    Your average recorded mood during this period was{" "}
                    <strong>{weeklyAverage}/5</strong>.
                  </>
                )}
              </p>

              {commonWeeklyFactor && (
                <p className="mt-2 text-sm leading-7 text-muted">
                  <strong>{commonWeeklyFactor}</strong> appeared most
                  often among the factors you selected this week.
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-muted">
                These observations describe your recorded entries;
                they are not a mental health assessment.
              </p>
            </>
          ) : (
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Your weekly reflection will appear here once you've
              recorded a check-in. There's no need to rush.
            </p>
          )}
        </section>

        {/* Mood chart */}
        <section className="mt-9 rounded-3xl border border-line surface-card p-5 shadow-sm sm:p-7 md:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                MOOD HISTORY
              </p>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                Your mood over time
              </h2>

              <p className="mt-2 text-sm text-muted">
                Each bar represents one recorded check-in.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-1 rounded-full tile-brand p-1"
              aria-label="Filter mood chart"
            >
              {chartFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setChartFilter(filter.value)}
                  aria-pressed={chartFilter === filter.value}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition    ${
                    chartFilter === filter.value
                      ? "filter-selected shadow-sm"
                      : "filter-inactive"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mt-8 flex min-h-64 items-center justify-center text-sm text-muted">
              Loading your mood history...
            </div>
          ) : loadError ? (
            <div className="mt-8 rounded-2xl error-soft p-6 text-center">
              <p className="text-sm text-error">{loadError}</p>

              <button
                type="button"
                onClick={fetchMoods}
                className="mt-4 rounded-full brand-fill px-5 py-2.5 text-sm font-medium  "
              >
                Try again
              </button>
            </div>
          ) : chartEntries.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <span className="text-4xl" aria-hidden="true">
                🌱
              </span>

              <h3 className="mt-4 font-serif text-xl">
                Your story is just beginning
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                Record a mood check-in and your history will start
                appearing here.
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <div className="mb-3 flex justify-between text-xs text-faint">
                <span>Higher mood</span>
                <span>Scale: 1–5</span>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-9">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >
                      <span className="w-3 text-xs text-faint">
                        {value}
                      </span>

                      <div className="h-px flex-1 border-t border-dashed border-line" />
                    </div>
                  ))}
                </div>

                <div className="relative flex h-64 items-end gap-2 overflow-x-auto px-7 pb-9 sm:gap-3">
                  {chartEntries.map((entry) => {
                    const value = getMoodValue(entry.mood);
                    const moodData = getMoodData(entry.mood);

                    return (
                      <div
                        key={entry._id}
                        className="flex h-full min-w-9 flex-1 flex-col items-center justify-end"
                        title={`${moodData?.label || entry.mood} — ${formatDate(entry.date, {
                          year: "numeric",
                        })} — ${value}/5`}
                      >
                        <span className="mb-2 text-sm">
                          {getMoodEmoji(entry.mood)}
                        </span>

                        <div
                          className={`w-full max-w-10 rounded-t-lg chart-bar chart-bar-${value} transition-all duration-300`}
                        />

                        <span className="mt-2 whitespace-nowrap text-[10px] text-muted sm:text-xs">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-2 text-center text-xs text-faint">
                Showing up to 14 check-ins for the selected period.
              </p>
            </div>
          )}
        </section>

        {/* Calendar and history */}
        <section className="mt-9 rounded-3xl border border-line surface-card p-5 shadow-sm sm:p-7 md:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                LOOK BACK GENTLY
              </p>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                Your check-in history
              </h2>

              <p className="mt-2 text-sm text-muted">
                Revisit the moods you've recorded.
              </p>
            </div>

            <div className="flex w-fit gap-1 rounded-full tile-brand p-1">
              <button
                type="button"
                onClick={() => setHistoryView("calendar")}
                aria-pressed={historyView === "calendar"}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  historyView === "calendar"
                    ? "brand-fill "
                    : "filter-inactive"
                }`}
              >
                Calendar
              </button>

              <button
                type="button"
                onClick={() => setHistoryView("list")}
                aria-pressed={historyView === "list"}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  historyView === "list"
                    ? "brand-fill "
                    : "filter-inactive"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted">
              Loading your entries...
            </div>
          ) : loadError ? (
            <div className="mt-6 rounded-2xl error-soft p-5 text-sm text-error">
              Your history could not be loaded. Please use the retry
              option above.
            </div>
          ) : entries.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center text-center">
              <span className="text-4xl" aria-hidden="true">
                📅
              </span>

              <h3 className="mt-4 font-serif text-xl">
                No check-ins yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                Your recorded moods will appear here. Start with
                today's check-in whenever you're ready.
              </p>
            </div>
          ) : historyView === "calendar" ? (
            <div className="mx-auto mt-7 max-w-2xl">
              {/* Calendar navigation */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  className="flex h-10 w-10 items-center justify-center rounded-full icon-button text-lg transition"
                >
                  ←
                </button>

                <div className="text-center">
                  <h3 className="font-serif text-xl text-ink">
                    {formatMonth(calendarMonth)}
                  </h3>

                  <p className="mt-1 text-xs text-faint">
                    {monthEntryCount}{" "}
                    {monthEntryCount === 1 ? "check-in" : "check-ins"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                  disabled={
                    calendarMonth.getFullYear() ===
                      new Date().getFullYear() &&
                    calendarMonth.getMonth() === new Date().getMonth()
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full icon-button text-lg transition disabled:cursor-not-allowed disabled:opacity-30"
                >
                  →
                </button>
              </div>

              {/* Weekday labels */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <span
                      key={day}
                      className="py-2 text-xs font-medium text-faint"
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />;
                  }

                  const entry = entriesByDate[day.key];
                  const isSelected = selectedDate === day.key;
                  const isToday = today === day.key;

                  return (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => setSelectedDate(day.key)}
                      aria-label={`${day.day}${entry ? `, mood ${entry.mood}` : ""}${isToday ? ", today" : ""}`}
                      aria-pressed={isSelected}
                      className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition    ${
                        isSelected
                          ? "calendar-selected"
                          : isToday
                            ? "today-highlight"
                            : "calendar-day"
                      }`}
                    >
                      <span className="font-medium">{day.day}</span>

                      {entry ? (
                        <span className="mt-0.5 text-sm leading-none">
                          {getMoodEmoji(entry.mood)}
                        </span>
                      ) : (
                        <span className="mt-1 h-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-faint">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
                  Today
                </span>

                <span>Emoji = recorded mood</span>
              </div>

              {/* Selected date details */}
              <div className="mt-7 rounded-2xl border border-line surface-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">
                  SELECTED DAY
                </p>

                <h3 className="mt-2 font-serif text-xl">
                  {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                    "en-IN",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </h3>

                {selectedDateEntry ? (
                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {getMoodEmoji(selectedDateEntry.mood)}
                      </span>

                      <div>
                        <p className="font-semibold text-ink">
                          {selectedDateEntry.mood}
                        </p>

                        <p className="text-xs text-faint">
                          Your recorded mood
                        </p>
                      </div>
                    </div>

                    {(selectedDateEntry.factors || []).length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-muted">
                          Factors you selected
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedDateEntry.factors.map((factor) => (
                            <span
                              key={factor}
                              className="rounded-full tile-brand px-3 py-1.5 text-xs text-action"
                            >
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedDateEntry.note && (
                      <div className="mt-4 border-t border-line pt-4">
                        <p className="text-xs font-medium text-muted">
                          Your note
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted">
                          {selectedDateEntry.note}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-faint">
                    No mood check-in was recorded on this day.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* List view */
            <div className="mt-6 space-y-3">
              {sortedEntries.map((entry) => (
                <button
                  key={entry._id}
                  type="button"
                  onClick={() => {
                    setSelectedDate(getDateKey(entry.date));
                    setCalendarMonth(
                      new Date(
                        new Date(entry.date).getFullYear(),
                        new Date(entry.date).getMonth(),
                        1
                      )
                    );
                    setHistoryView("calendar");
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl history-row p-4 text-left transition"
                >
                  <span className="text-3xl">
                    {getMoodEmoji(entry.mood)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">
                      {entry.mood}
                    </span>

                    <span className="mt-1 block text-xs text-faint">
                      {formatDate(entry.date, {
                        weekday: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>

                  <span className="text-sm text-muted">
                    View →
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Gentle reminder */}
        <div className="mt-8 rounded-2xl border border-line tile-brand p-5 text-center sm:p-6">
          <p className="font-serif text-lg text-brand">
            Every feeling deserves a little space.
          </p>

          <p className="mt-2 text-sm leading-6 text-muted">
            Your mood does not define you. These check-ins are simply
            a way to understand yourself a little better.
          </p>

          <Link
            to="/journal"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-action transition "
          >
            Continue with your journal →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default MoodTracker;
