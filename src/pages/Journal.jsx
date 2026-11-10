
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";

const prompts = [
  "What's one thing you're carrying today that you'd like to set down?",
  "What felt a little easier today?",
  "What do you need more of this week?",
  "What is something you're proud of yourself for?",
  "What would you say to a friend feeling the way you do?",
  "What made you smile today?",
  "What is one small thing you are looking forward to?",
  "When did you feel most like yourself today?",
  "What is something you wish someone understood about you?",
  "What is one thing you would like to forgive yourself for?",
  "What is something ordinary that brought you comfort?",
  "If today had a colour, what would it be and why?",
  "What is one thing you need to hear right now?",
  "What is something you did today, however small, that deserves credit?",
];

const DRAFT_KEY = "mindease_journal_draft_v1";
const DRAFT_EXPIRY = 24 * 60 * 60 * 1000;

const moodDetails = {
  Struggling: { emoji: "😔", label: "Struggling" },
  Low: { emoji: "😞", label: "Low" },
  Okay: { emoji: "😐", label: "Okay" },
  Good: { emoji: "🙂", label: "Good" },
  Great: { emoji: "😊", label: "Great" },
};

const getDateKey = (date) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatShortDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const formatLongDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    dateStyle: "long",
  });

const getEntryTitle = (entry) => {
  if (entry.title?.trim()) return entry.title;

  const text = entry.content?.trim() || "";
  const firstWords = text.split(/\s+/).slice(0, 6).join(" ");

  if (firstWords) {
    return firstWords.length < text.length
      ? `${firstWords}...`
      : firstWords;
  }

  return `Reflection · ${formatShortDate(entry.entryDate)}`;
};

function Journal() {
  const [entries, setEntries] = useState([]);
  const [moodEntries, setMoodEntries] = useState([]);

  const [selectedEntry, setSelectedEntry] = useState(null);

  const [isWriting, setIsWriting] = useState(false);
  const [isShortEntry, setIsShortEntry] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [feedback, setFeedback] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [promptIndex, setPromptIndex] = useState(
    new Date().getDate() % prompts.length
  );

  const [pendingAction, setPendingAction] = useState(null);
  const [mobileView, setMobileView] = useState("list");
  const [viewMode, setViewMode] = useState("list");

  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [calendarDate, setCalendarDate] = useState(
    () => getDateKey(new Date())
  );

  const [draftCandidate, setDraftCandidate] = useState(null);
  const [draftNotice, setDraftNotice] = useState("");

  const prompt = prompts[promptIndex];

  // Load journal entries and mood history.
  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setLoadingError("");

      try {
        const journalResponse = await apiRequest("/journal");

        if (active) {
          setEntries(journalResponse.journals || []);
        }
      } catch (error) {
        if (active) {
          setLoadingError(
            error.message || "Unable to load your journal entries."
          );
        }
      }

      try {
        const moodResponse = await apiRequest("/moods");

        if (active) {
          setMoodEntries(moodResponse.moods || []);
        }
      } catch {
        if (active) setMoodEntries([]);
      }

      if (active) setLoading(false);
    };

    loadData();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Check for a previously saved local draft.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);

      if (!saved) return;

      const draft = JSON.parse(saved);
      const age = Date.now() - Number(draft.savedAt);

      if (
        age < 0 ||
        age > DRAFT_EXPIRY ||
        typeof draft.content !== "string" ||
        !draft.content.trim()
      ) {
        sessionStorage.removeItem(DRAFT_KEY);
        return;
      }

      setDraftCandidate(draft);
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  // Automatically save unfinished writing in this browser tab.
  useEffect(() => {
    if (!isWriting || !hasUnsavedChanges || draftCandidate) return;

    const timeout = window.setTimeout(() => {
      try {
        const draft = {
          title,
          content,
          selectedPrompt,
          isShortEntry,
          editingEntryId: selectedEntry?._id || null,
          entryDate: selectedEntry?.entryDate || null,
          savedAt: Date.now(),
        };

        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setDraftNotice("Draft saved in this tab.");
      } catch {
        setDraftNotice(
          "Unable to save the draft in this browser session."
        );
      }
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [
    title,
    content,
    selectedPrompt,
    isShortEntry,
    isWriting,
    hasUnsavedChanges,
    selectedEntry,
    draftCandidate,
  ]);

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // Storage may be unavailable.
    }

    setDraftNotice("");
  };

  // Restore an unfinished draft.
  const restoreDraft = () => {
    if (!draftCandidate) return;

    const existingEntry = draftCandidate.editingEntryId
      ? entries.find(
          (entry) => entry._id === draftCandidate.editingEntryId
        )
      : null;

    setSelectedEntry(existingEntry || null);
    setTitle(draftCandidate.title || "");
    setContent(draftCandidate.content || "");
    setSelectedPrompt(draftCandidate.selectedPrompt || "");
    setIsShortEntry(Boolean(draftCandidate.isShortEntry));

    setIsWriting(true);
    setHasUnsavedChanges(true);
    setMobileView("content");

    setDraftCandidate(null);
    setDraftNotice("Your unfinished draft has been restored.");
  };

  const discardRecoveredDraft = () => {
    clearDraft();
    setDraftCandidate(null);
  };

  // Warn before closing or refreshing while writing.
  useEffect(() => {
    if (!isWriting || !hasUnsavedChanges) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isWriting, hasUnsavedChanges]);

  // Close confirmation dialog with Escape.
  useEffect(() => {
    if (!pendingAction) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPendingAction(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [pendingAction]);

  // Start a new entry.
  const beginNewEntry = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setSelectedPrompt("");
    setIsShortEntry(false);
    setHasUnsavedChanges(false);
    setFeedback(null);
    setIsWriting(true);
    setMobileView("content");
  };

  // Start an entry from the daily prompt.
  const beginPromptEntry = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent(`Prompt: ${prompt}\n\n`);
    setSelectedPrompt(prompt);
    setIsShortEntry(false);
    setHasUnsavedChanges(false);
    setFeedback(null);
    setIsWriting(true);
    setMobileView("content");
  };

  // Start a short reflection.
  const beginShortEntry = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setSelectedPrompt("");
    setIsShortEntry(true);
    setHasUnsavedChanges(false);
    setFeedback(null);
    setIsWriting(true);
    setMobileView("content");
  };

  // Edit an existing entry.
  const beginEditEntry = (entry) => {
    setSelectedEntry(entry);
    setTitle(entry.title || "");
    setContent(entry.content || "");
    setSelectedPrompt(entry.prompt || "");
    setIsShortEntry(false);
    setHasUnsavedChanges(false);
    setFeedback(null);
    setIsWriting(true);
    setMobileView("content");
  };

  // Open an existing entry.
  const showEntry = (entry) => {
    setSelectedEntry(entry);
    setIsWriting(false);
    setIsShortEntry(false);
    setHasUnsavedChanges(false);
    setFeedback(null);
    setMobileView("content");
  };

  // Perform an action.
  const executeAction = (action) => {
    if (!action) return;

    switch (action.type) {
      case "new":
        beginNewEntry();
        break;

      case "prompt":
        beginPromptEntry();
        break;

      case "short":
        beginShortEntry();
        break;

      case "edit":
        beginEditEntry(action.entry);
        break;

      case "select":
        showEntry(action.entry);
        break;

      case "cancel":
        clearDraft();
        setIsWriting(false);
        setHasUnsavedChanges(false);
        setFeedback(null);
        setMobileView("list");
        break;

      default:
        break;
    }
  };

  // Ask before leaving unsaved writing.
  const requestAction = (action) => {
    if (saving || deleting) return;

    if (isWriting && hasUnsavedChanges) {
      setPendingAction(action);
      return;
    }

    executeAction(action);
  };

  const confirmPendingAction = () => {
    const action = pendingAction;

    if (!action) return;

    setPendingAction(null);
    clearDraft();
    setHasUnsavedChanges(false);
    executeAction(action);
  };

  // Save a new entry or update an existing one.
  const saveEntry = async () => {
    if (!content.trim()) {
      setFeedback({
        type: "validation",
        message: "Please write something before saving.",
      });
      return;
    }

    try {
      setSaving(true);
      setFeedback(null);

      const entryData = {
        title:
          title.trim() ||
          `Reflection · ${formatShortDate(
            selectedEntry?.entryDate || new Date()
          )}`,
        content: content.trim(),
        prompt: selectedPrompt,
        entryDate: selectedEntry
          ? selectedEntry.entryDate
          : new Date().toISOString(),
      };

      let response;

      if (selectedEntry?._id) {
        response = await apiRequest(`/journal/${selectedEntry._id}`, {
          method: "PUT",
          body: entryData,
        });
      } else {
        response = await apiRequest("/journal", {
          method: "POST",
          body: entryData,
        });
      }

      const savedEntry = response.journal;

      if (!savedEntry) {
        throw new Error("The server did not return the saved journal entry.");
      }

      setEntries((previous) => {
        const updated = previous.filter(
          (entry) => entry._id !== savedEntry._id
        );

        return [savedEntry, ...updated].sort(
          (a, b) =>
            new Date(b.entryDate) - new Date(a.entryDate)
        );
      });

      setSelectedEntry(savedEntry);
      setIsWriting(false);
      setIsShortEntry(false);
      setTitle("");
      setContent("");
      setSelectedPrompt("");
      setHasUnsavedChanges(false);
      clearDraft();
      setMobileView("content");

      setFeedback({
        type: "success",
        message: "Your reflection has been saved.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to save your journal entry.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete an entry.
  const performDelete = async (id) => {
    try {
      setDeleting(true);
      setFeedback(null);

      await apiRequest(`/journal/${id}`, {
        method: "DELETE",
      });

      setEntries((previous) =>
        previous.filter((entry) => entry._id !== id)
      );

      setSelectedEntry(null);
      setIsWriting(false);
      setHasUnsavedChanges(false);
      setMobileView("list");

      setFeedback({
        type: "success",
        message: "Journal entry deleted.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Unable to delete journal entry.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = (id) => {
    setPendingAction({
      type: "delete",
      id,
    });
  };

  const confirmDelete = () => {
    const id = pendingAction?.id;

    setPendingAction(null);

    if (id) performDelete(id);
  };

  const showAnotherPrompt = () => {
    setPromptIndex((previous) => (previous + 1) % prompts.length);
  };

  const updateTitle = (value) => {
    setTitle(value);
    setHasUnsavedChanges(true);
    setFeedback(null);
  };

  const updateContent = (value) => {
    setContent(value);
    setHasUnsavedChanges(true);
    setFeedback(null);
  };

  // Map moods by local calendar date.
  const moodByDate = useMemo(() => {
    const map = new Map();

    moodEntries.forEach((entry) => {
      const dateKey = getDateKey(entry.date);

      if (dateKey && !map.has(dateKey)) {
        map.set(dateKey, entry);
      }
    });

    return map;
  }, [moodEntries]);

  // Group journal entries by date.
  const entriesByDate = useMemo(() => {
    const map = new Map();

    entries.forEach((entry) => {
      const dateKey = getDateKey(entry.entryDate);

      if (!dateKey) return;

      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }

      map.get(dateKey).push(entry);
    });

    return map;
  }, [entries]);

  // Prepare calendar cells.
  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      ),
    ];
  }, [calendarMonth]);

  const selectedDateEntries = entriesByDate.get(calendarDate) || [];

  const selectedEntryMood = selectedEntry
    ? moodByDate.get(getDateKey(selectedEntry.entryDate))
    : null;

  const changeCalendarMonth = (amount) => {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + amount,
          1
        )
    );
  };

  const selectedEntryIsActive = (entry) =>
    selectedEntry?._id === entry._id && !isWriting;

  const isDeleteDialog = pendingAction?.type === "delete";

  return (
    <div className="min-h-screen page px-4 py-10 text-ink md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-brand">
              A space for yourself
            </p>

            <h1 className="font-serif text-5xl font-normal md:text-6xl">
              Your journal
            </h1>

            <p className="mt-3 text-sm text-muted">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}.
              Your thoughts, at your own pace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => requestAction({ type: "new" })}
            className="rounded-full btn-primary px-7 py-3.5 font-semibold  transition    "
          >
            + New entry
          </button>
        </div>

        {/* List / Calendar toggle */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-line surface-card p-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                viewMode === "list"
                  ? "btn-primary "
                  : "text-muted hover-brand-soft"
              }`}
            >
              List
            </button>

            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              aria-pressed={viewMode === "calendar"}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                viewMode === "calendar"
                  ? "btn-primary "
                  : "text-muted hover-brand-soft"
              }`}
            >
              Calendar
            </button>
          </div>

          {draftNotice && (
            <p role="status" className="text-xs text-muted">
              {draftNotice}
            </p>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            role={feedback.type === "error" ? "alert" : "status"}
            className={`mb-5 rounded-xl border px-5 py-3 text-sm ${
              feedback.type === "validation"
                ? "strip-warm text-muted"
                : feedback.type === "success"
                  ? "success-soft"
                  : "error-soft"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Loading error */}
        {loadingError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-sand error-soft px-5 py-4 text-sm text-error"
          >
            <p>{loadingError}</p>

            <button
              type="button"
              onClick={() => setReloadKey((previous) => previous + 1)}
              className="mt-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Compact Calendar */}
        {viewMode === "calendar" && (
          <section className="mx-auto mb-5 max-w-2xl rounded-3xl border border-line surface-card p-4 shadow-sm sm:p-5">

            {/* Calendar Header */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeCalendarMonth(-1)}
                aria-label="Previous month"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-brand transition hover-brand-soft"
              >
                ←
              </button>

              <h2 className="font-serif text-xl text-ink">
                {calendarMonth.toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                type="button"
                onClick={() => changeCalendarMonth(1)}
                aria-label="Next month"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-brand transition hover-brand-soft"
              >
                →
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <div key={day} className="py-1.5">
                    {day}
                  </div>
                )
              )}
            </div>

            {/* Calendar Dates */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`blank-${index}`}
                      className="h-9 sm:h-10"
                    />
                  );
                }

                const dateKey = getDateKey(
                  new Date(
                    calendarMonth.getFullYear(),
                    calendarMonth.getMonth(),
                    day
                  )
                );

                const hasEntries =
                  (entriesByDate.get(dateKey) || []).length > 0;

                const isSelected = calendarDate === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setCalendarDate(dateKey)}
                    aria-pressed={isSelected}
                    className={`flex h-9 flex-col items-center justify-center rounded-lg text-xs transition sm:h-10 sm:text-sm ${
                      isSelected
                        ? "tab-selected font-semibold"
                        : hasEntries
                          ? "journal-date-recorded font-semibold"
                          : "journal-date"
                    }`}
                  >
                    <span>{day}</span>

                    {hasEntries && (
                      <span
                        className={`mt-0.5 h-1 w-1 rounded-full ${
                          isSelected ? "surface-card" : "journal-date-dot"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Date Entries */}
            <div className="mt-4 border-t border-line pt-3">
              <h3 className="font-serif text-base text-ink">
                {new Date(`${calendarDate}T12:00:00`).toLocaleDateString(
                  undefined,
                  { dateStyle: "long" }
                )}
              </h3>

              {selectedDateEntries.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {selectedDateEntries.map((entry) => (
                    <button
                      key={entry._id}
                      type="button"
                      onClick={() => {
                        setViewMode("list");
                        requestAction({ type: "select", entry });
                      }}
                      className="block w-full rounded-xl border border-line px-3 py-2.5 text-left transition hover-brand-soft"
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {getEntryTitle(entry)}
                      </span>

                      <span className="mt-1 block text-xs text-muted">
                        {entry.content?.slice(0, 75)}
                        {entry.content?.length > 75 ? "..." : ""}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-xs text-muted">
                  No entries for this date.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Main list and editor */}
        {viewMode === "list" && (
          <div className="grid gap-5 lg:grid-cols-[350px_1fr]">

            {/* Sidebar */}
            <aside
              className={`space-y-4 ${
                mobileView === "content" ? "hidden lg:block" : "block"
              }`}
            >
              {/* Daily prompt */}
              <div className="rounded-3xl border border-sand strip-warm p-6">
                <p className="text-sm font-medium text-muted">
                  Today's prompt
                </p>

                <p className="mt-4 font-serif text-xl italic leading-8 text-ink">
                  {prompt}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  <button
                    type="button"
                    onClick={() => requestAction({ type: "prompt" })}
                    className="text-sm font-semibold text-brand underline underline-offset-4"
                  >
                    Write to this
                  </button>

                  <button
                    type="button"
                    onClick={showAnotherPrompt}
                    className="text-sm font-medium text-muted underline underline-offset-4"
                  >
                    Show another prompt
                  </button>
                </div>
              </div>

              {/* Short reflection */}
              <button
                type="button"
                onClick={() => requestAction({ type: "short" })}
                className="flex w-full items-center gap-4 rounded-2xl border border-line surface-card p-5 text-left transition hover-line-strong"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl tile-brand text-xl">
                  ✍️
                </span>

                <span>
                  <span className="block font-semibold">
                    Just one line
                  </span>

                  <span className="mt-1 block text-sm text-muted">
                    A small thought is enough.
                  </span>
                </span>
              </button>

              {/* Loading skeleton */}
              {loading && (
                <div
                  className="space-y-3"
                  aria-label="Loading journal entries"
                  aria-busy="true"
                >
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="motion-safe:animate-pulse rounded-2xl border border-line surface-card p-5"
                    >
                      <div className="h-4 w-2/3 rounded skeleton-line" />
                      <div className="mt-3 h-3 w-1/3 rounded skeleton-line" />
                      <div className="mt-4 h-3 w-full rounded skeleton-line" />
                    </div>
                  ))}
                </div>
              )}

              {/* Entry list */}
              {!loading &&
                !loadingError &&
                entries.map((entry) => {
                  const active = selectedEntryIsActive(entry);

                  return (
                    <button
                      type="button"
                      key={entry._id}
                      onClick={() =>
                        requestAction({ type: "select", entry })
                      }
                      aria-current={active ? "true" : undefined}
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        active
                          ? "journal-entry-active"
                          : "journal-entry"
                      }`}
                    >
                      <span className="block font-semibold">
                        {getEntryTitle(entry)}
                      </span>

                      <span className="mt-1 block text-xs text-muted">
                        {formatShortDate(entry.entryDate)}
                      </span>

                      <span className="mt-3 block line-clamp-2 text-sm leading-6 text-muted">
                        {entry.content}
                      </span>
                    </button>
                  );
                })}

              {!loading && !loadingError && entries.length === 0 && (
                <div className="rounded-2xl border border-dashed border-line surface-card p-7 text-center">
                  <span className="text-4xl">📖</span>

                  <p className="mt-4 font-serif text-xl">
                    Your journal is waiting.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    Start with a small reflection. Even one line is enough.
                  </p>
                </div>
              )}
            </aside>

            {/* Main content */}
            <section
              className={`min-w-0 rounded-3xl border border-line surface-card ${
                mobileView === "list" ? "hidden lg:block" : "block"
              }`}
            >
              {/* Mobile back button */}
              <div className="border-b border-line px-5 py-4 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  ← All entries
                </button>
              </div>

              {/* Editor */}
              {isWriting && (
                <div className="flex min-h-[420px] flex-col">
                  <div className="flex-1 p-6 md:p-9">
                    {isShortEntry && (
                      <p className="mb-5 text-sm text-muted">
                        No need to write a lot. Just start wherever you are.
                      </p>
                    )}

                    <input
                      type="text"
                      value={title}
                      onChange={(event) => updateTitle(event.target.value)}
                      placeholder="Give this entry a title..."
                      aria-label="Journal entry title"
                      className="journal-field w-full border-b border-line py-4 font-serif text-3xl"
                    />

                    <textarea
                      value={content}
                      onChange={(event) => updateContent(event.target.value)}
                      placeholder={
                        isShortEntry
                          ? "One thing on my mind is..."
                          : "Write whatever is on your mind..."
                      }
                      aria-label="Journal entry content"
                      rows={isShortEntry ? 2 : 12}
                      className={`journal-field mt-6 w-full resize-y border-none font-serif text-lg leading-9 ${
                        isShortEntry
                          ? "min-h-[100px]"
                          : "min-h-[320px] md:min-h-[400px]"
                      }`}
                      autoFocus
                    />

                    {isShortEntry && (
                      <p className="mt-2 text-xs text-faint">
                        You can always write more if you feel like it.
                      </p>
                    )}
                  </div>

                  {/* Sticky action bar */}
                  <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-b-3xl border-t border-line surface-card px-5 py-4 backdrop-blur-sm md:px-9">
                    <button
                      type="button"
                      onClick={() => requestAction({ type: "cancel" })}
                      disabled={saving}
                      className="rounded-full border border-line px-6 py-3 font-semibold text-muted hover-brand-soft disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveEntry}
                      disabled={saving}
                      className="rounded-full btn-primary px-6 py-3 font-semibold   disabled:opacity-60"
                    >
                      {saving
                        ? "Saving..."
                        : selectedEntry
                          ? "Update entry"
                          : "Save entry"}
                    </button>
                  </div>
                </div>
              )}

              {/* Selected entry */}
              {!isWriting && selectedEntry && (
                <div className="p-6 md:p-10">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="font-serif text-4xl font-normal">
                        {getEntryTitle(selectedEntry)}
                      </h2>

                      <p className="mt-2 text-sm text-muted">
                        {formatLongDate(selectedEntry.entryDate)}
                      </p>

                      {/* Mood association */}
                      <div className="mt-4 inline-flex items-center gap-2 rounded-2xl tile-brand px-4 py-3">
                        {selectedEntryMood ? (
                          <>
                            <span className="text-xl">
                              {moodDetails[selectedEntryMood.mood]?.emoji || "🙂"}
                            </span>

                            <span className="text-sm text-brand">
                              Mood recorded that day:{" "}
                              <strong>
                                {moodDetails[selectedEntryMood.mood]?.label ||
                                  selectedEntryMood.mood}
                              </strong>
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-muted">
                            No mood recorded that day.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          requestAction({
                            type: "edit",
                            entry: selectedEntry,
                          })
                        }
                        className="rounded-xl tile-brand px-4 py-2 text-sm font-semibold text-brand hover-brand-soft"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(selectedEntry._id)}
                        disabled={deleting}
                        className="rounded-xl border border-sand px-4 py-2 text-sm font-medium text-muted  disabled:opacity-50"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 whitespace-pre-wrap font-serif text-lg leading-9 text-ink">
                    {selectedEntry.content}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!isWriting && !selectedEntry && (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-5 py-16 text-center lg:min-h-[600px]">
                  <span className="text-5xl">📖</span>

                  <h2 className="mt-5 font-serif text-2xl">
                    A quiet space for your thoughts
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                    Select an entry or start writing something new. There is
                    no right or wrong way to use your journal.
                  </p>

                  <button
                    type="button"
                    onClick={() => requestAction({ type: "new" })}
                    className="mt-6 rounded-full btn-primary px-6 py-3 font-semibold  "
                  >
                    Start writing
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Restore draft dialog */}
      {draftCandidate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center dialog-backdrop p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="draft-title"
            className="w-full max-w-md rounded-3xl border border-line page p-7 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl tile-brand text-2xl">
              📝
            </div>

            <h2 id="draft-title" className="mt-5 font-serif text-2xl">
              An unfinished draft was found
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted">
              A draft from this browser tab is available. It is stored locally
              in this tab's session and has not been sent to your account.
              Restore it to continue, or discard it.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={discardRecoveredDraft}
                className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-brand hover-brand-soft"
              >
                Discard draft
              </button>

              <button
                type="button"
                onClick={restoreDraft}
                disabled={loading}
                className="rounded-full btn-primary px-6 py-3 text-sm font-semibold  disabled:opacity-60"
              >
                {loading ? "Loading entries..." : "Restore draft"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard / Delete confirmation */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dialog-backdrop p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-description"
            className="w-full max-w-md rounded-3xl border border-line page p-7 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl tile-brand text-2xl">
              {isDeleteDialog ? "📖" : "✍️"}
            </div>

            <h2 id="confirm-title" className="mt-5 font-serif text-2xl">
              {isDeleteDialog
                ? "Delete this entry?"
                : "Leave this reflection?"}
            </h2>

            <p
              id="confirm-description"
              className="mt-3 text-sm leading-7 text-muted"
            >
              {isDeleteDialog
                ? "This journal entry will be permanently deleted. You won't be able to recover it."
                : "You have unsaved changes. If you leave now, your writing will be discarded."}
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-brand hover-brand-soft"
              >
                {isDeleteDialog ? "Keep it" : "Keep writing"}
              </button>

              <button
                type="button"
                onClick={
                  isDeleteDialog
                    ? confirmDelete
                    : confirmPendingAction
                }
                className="rounded-full border border-sand px-6 py-3 text-sm font-medium text-muted hover-sand"
              >
                {isDeleteDialog ? "Delete" : "Discard"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;
