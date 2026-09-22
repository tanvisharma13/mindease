import { useState } from "react";

const prompts = [
  "What's one thing you're carrying today that you'd like to set down?",
  "What felt a little easier today?",
  "What do you need more of this week?",
  "What is something you're proud of yourself for?",
  "What would you say to a friend feeling the way you do?",
];

function Journal() {
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("journalEntries")) || [];
  });

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const prompt =
    prompts[new Date().getDate() % prompts.length];

  const startNewEntry = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setIsWriting(true);
  };

  const writePrompt = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent(`Prompt: ${prompt}\n\n`);
    setIsWriting(true);
  };

  const saveEntry = () => {
    if (!content.trim()) {
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: title.trim() || "Untitled reflection",
      content: content.trim(),
      date: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );

    setEntries(updatedEntries);
    setSelectedEntry(newEntry);
    setIsWriting(false);
    setTitle("");
    setContent("");
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(
      (entry) => entry.id !== id
    );

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );

    setEntries(updatedEntries);
    setSelectedEntry(null);
    setIsWriting(false);
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

        <div className="grid gap-5 lg:grid-cols-[350px_1fr]">

          {/* Sidebar */}
          <aside className="space-y-3">

            {/* Prompt */}
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

            {/* Entries */}
            {entries.map((entry) => (
              <button
                type="button"
                key={entry.id}
                onClick={() => {
                  setSelectedEntry(entry);
                  setIsWriting(false);
                }}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selectedEntry?.id === entry.id
                    ? "border-[#557a6a] bg-[#e8eee9]"
                    : "border-[#d8ddd7] bg-white hover:border-[#aebeb6]"
                }`}
              >
                <strong className="block">
                  {entry.title}
                </strong>

                <span className="mt-1 block text-xs text-[#60766e]">
                  {new Date(entry.date).toLocaleDateString(
                    undefined,
                    {
                      dateStyle: "medium",
                    }
                  )}
                </span>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#60766e]">
                  {entry.content}
                </p>
              </button>
            ))}
          </aside>

          {/* Main */}
          <section className="min-h-[600px] rounded-3xl border border-[#d8ddd7] bg-white">

            {/* Writing */}
            {isWriting && (
              <div className="p-6 md:p-9">

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Give this entry a title..."
                  className="w-full border-b border-[#d8ddd7] bg-transparent py-4 font-serif text-3xl outline-none placeholder:text-[#a1aaa5]"
                />

                <textarea
                  value={content}
                  onChange={(event) =>
                    setContent(event.target.value)
                  }
                  placeholder="Write whatever is on your mind..."
                  className="mt-6 min-h-[400px] w-full resize-y border-none leading-8 outline-none placeholder:text-[#9aa6a0]"
                  autoFocus
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="rounded-full border border-[#d8ddd7] px-6 py-3 font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveEntry}
                    className="rounded-full bg-[#557a6a] px-6 py-3 font-semibold text-white hover:bg-[#365a4c]"
                  >
                    Save entry
                  </button>
                </div>
              </div>
            )}

            {/* Selected entry */}
            {!isWriting && selectedEntry && (
              <div className="p-6 md:p-10">

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="font-serif text-4xl font-normal">
                      {selectedEntry.title}
                    </h2>

                    <p className="mt-2 text-sm text-[#60766e]">
                      {new Date(
                        selectedEntry.date
                      ).toLocaleDateString(undefined, {
                        dateStyle: "long",
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteEntry(selectedEntry.id)
                    }
                    className="rounded-xl bg-[#f5e5e2] px-4 py-2 text-sm font-semibold text-[#a05046]"
                  >
                    Delete
                  </button>
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