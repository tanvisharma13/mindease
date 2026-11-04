
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const prompts = [
  "What's one thing you're carrying today that you'd like to set down?",
  "What felt a little easier today?",
  "What do you need more of this week?",
  "What is something you're proud of yourself for?",
  "What would you say to a friend feeling the way you do?",
];

function Journal() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const prompt = prompts[new Date().getDate() % prompts.length];

  // Load journal entries from MongoDB
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/journal");

        setEntries(response.journals || []);
      } catch (error) {
        setError(error.message || "Unable to load journal entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Warn before refreshing or closing the browser
  useEffect(() => {
    if (!isWriting || !hasUnsavedChanges) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [isWriting, hasUnsavedChanges]);

  // Check before discarding unsaved writing
  const confirmDiscard = () => {
    if (!hasUnsavedChanges) return true;

    return window.confirm(
      "You have unsaved changes. Are you sure you want to discard them?"
    );
  };

  // Start a new journal entry
  const startNewEntry = () => {
    if (isWriting && !confirmDiscard()) return;

    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setSelectedPrompt("");
    setHasUnsavedChanges(false);
    setError("");
    setIsWriting(true);
  };

  // Start writing using today's prompt
  const writePrompt = () => {
    if (isWriting && !confirmDiscard()) return;

    setSelectedEntry(null);
    setTitle("");
    setContent(`Prompt: ${prompt}\n\n`);
    setSelectedPrompt(prompt);
    setHasUnsavedChanges(false);
    setError("");
    setIsWriting(true);
  };

  // Edit an existing entry
  const editEntry = (entry) => {
    if (isWriting && !confirmDiscard()) return;

    setSelectedEntry(entry);
    setTitle(entry.title || "");
    setContent(entry.content || "");
    setSelectedPrompt(entry.prompt || "");
    setHasUnsavedChanges(false);
    setError("");
    setIsWriting(true);
  };

  // Save a new entry or update an existing one
  const saveEntry = async () => {
    if (!content.trim()) {
      setError("Please write something before saving your entry.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const entryData = {
        title: title.trim() || "Untitled reflection",
        content: content.trim(),
        prompt: selectedPrompt,
        entryDate: selectedEntry
          ? selectedEntry.entryDate
          : new Date().toISOString(),
      };

      let response;

      if (selectedEntry?._id) {
        response = await apiRequest(
          `/journal/${selectedEntry._id}`,
          {
            method: "PUT",
            body: entryData,
          }
        );
      } else {
        response = await apiRequest("/journal", {
          method: "POST",
          body: entryData,
        });
      }

      const savedEntry = response.journal;

      setEntries((previousEntries) => {
        const updatedEntries = previousEntries.filter(
          (entry) => entry._id !== savedEntry._id
        );

        return [savedEntry, ...updatedEntries].sort(
          (a, b) =>
            new Date(b.entryDate) - new Date(a.entryDate)
        );
      });

      setSelectedEntry(savedEntry);
      setIsWriting(false);
      setTitle("");
      setContent("");
      setSelectedPrompt("");
      setHasUnsavedChanges(false);
    } catch (error) {
      setError(error.message || "Unable to save your journal entry.");
    } finally {
      setSaving(false);
    }
  };

  // Delete an entry from MongoDB
  const deleteEntry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this journal entry?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiRequest(`/journal/${id}`, {
        method: "DELETE",
      });

      setEntries((previousEntries) =>
        previousEntries.filter((entry) => entry._id !== id)
      );

      setSelectedEntry(null);
      setIsWriting(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      setError(error.message || "Unable to delete journal entry.");
    }
  };

  // Cancel writing
  const cancelWriting = () => {
    if (!confirmDiscard()) return;

    setIsWriting(false);
    setHasUnsavedChanges(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f4f5ef] px-4 py-12 text-[#18231f] md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#557486]">
              PRIVATE REFLECTIONS
            </p>

            <h1 className="font-serif text-5xl font-normal md:text-6xl">
              Your journal
            </h1>

            <p className="mt-3 text-[#60766e]">
              {entries.length}{" "}
              {entries.length === 1 ? "entry" : "entries"}.
              Private, always.
            </p>
          </div>

          <button
            type="button"
            onClick={startNewEntry}
            className="rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white transition hover:bg-[#365a4c]"
          >
            + New entry
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[350px_1fr]">

          {/* Sidebar */}
          <aside className="space-y-3">

            {/* Today's prompt */}
            <div className="rounded-3xl border border-[#eadfcd] bg-[#f7f1e8] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9b785d]">
                TODAY'S PROMPT
              </p>

              <p className="mt-4 font-serif text-lg italic leading-8 text-[#604f43]">
                {prompt}
              </p>

              <button
                type="button"
                onClick={writePrompt}
                className="mt-5 text-sm font-semibold text-[#365a4c] underline underline-offset-4"
              >
                Write to this
              </button>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="rounded-2xl bg-white p-5 text-center text-[#60766e]">
                Loading your journal entries...
              </div>
            )}

            {/* Journal entries */}
            {!loading && entries.map((entry) => (
              <button
                type="button"
                key={entry._id}
                onClick={() => {
                  if (isWriting && !confirmDiscard()) return;

                  setSelectedEntry(entry);
                  setIsWriting(false);
                  setHasUnsavedChanges(false);
                  setError("");
                }}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selectedEntry?._id === entry._id && !isWriting
                    ? "border-[#557a6a] bg-[#e8eee9]"
                    : "border-[#d8ddd7] bg-white hover:border-[#aebeb6]"
                }`}
              >
                <strong className="block">
                  {entry.title}
                </strong>

                <span className="mt-1 block text-xs text-[#60766e]">
                  {new Date(
                    entry.entryDate
                  ).toLocaleDateString(undefined, {
                    dateStyle: "medium",
                  })}
                </span>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#60766e]">
                  {entry.content}
                </p>
              </button>
            ))}

            {!loading && entries.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#d8ddd7] bg-white p-6 text-center text-sm text-[#60766e]">
                Your journal is empty. Start with a small reflection.
              </div>
            )}
          </aside>

          {/* Main section */}
          <section className="min-h-[600px] rounded-3xl border border-[#d8ddd7] bg-white">

            {/* Writing section */}
            {isWriting && (
              <div className="p-6 md:p-9">

                <input
                  type="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  placeholder="Give this entry a title..."
                  className="w-full border-b border-[#d8ddd7] bg-transparent py-4 font-serif text-3xl outline-none placeholder:text-[#a1aaa5]"
                />

                <textarea
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  placeholder="Write whatever is on your mind..."
                  className="mt-6 min-h-[400px] w-full resize-y border-none leading-8 outline-none placeholder:text-[#9aa6a0]"
                  autoFocus
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={cancelWriting}
                    disabled={saving}
                    className="rounded-full border border-[#d8ddd7] px-6 py-3 font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveEntry}
                    disabled={saving}
                    className="rounded-full bg-[#557a6a] px-6 py-3 font-semibold text-white hover:bg-[#365a4c] disabled:opacity-60"
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
                      {selectedEntry.title}
                    </h2>

                    <p className="mt-2 text-sm text-[#60766e]">
                      {new Date(
                        selectedEntry.entryDate
                      ).toLocaleDateString(undefined, {
                        dateStyle: "long",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editEntry(selectedEntry)}
                      className="rounded-xl bg-[#e8eee9] px-4 py-2 text-sm font-semibold text-[#365a4c]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteEntry(selectedEntry._id)}
                      className="rounded-xl bg-[#f5e5e2] px-4 py-2 text-sm font-semibold text-[#a05046]"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-[#34433d]">
                  {selectedEntry.content}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!isWriting && !selectedEntry && (
              <div className="flex min-h-[600px] flex-col items-center justify-center px-5 text-center">
                <span className="text-5xl text-[#557a6a]">
                  □
                </span>

                <h2 className="mt-5 font-serif text-2xl">
                  A quiet space for your thoughts
                </h2>

                <p className="mt-2 text-[#60766e]">
                  Select an entry or start writing something new.
                </p>

                <button
                  type="button"
                  onClick={startNewEntry}
                  className="mt-6 rounded-full bg-[#557a6a] px-6 py-3 font-semibold text-white"
                >
                  Start writing
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Journal;
