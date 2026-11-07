import { useState } from "react";

const resources = [
  {
    category: "Breathing",
    icon: "◎",
    time: "3 min",
    title: "4-7-8 Breathing",
    description:
      "A gentle breathing practice for slowing down and creating a little space.",
    steps: [
      "Breathe in gently for 4 seconds.",
      "Hold for 7 seconds.",
      "Slowly breathe out for 8 seconds.",
      "Repeat at a comfortable pace.",
    ],
  },
  {
    category: "Grounding",
    icon: "◇",
    time: "5 min",
    title: "5-4-3-2-1 Grounding",
    description:
      "Bring your attention back to the present using your five senses.",
    steps: [
      "Notice 5 things you can see.",
      "Notice 4 things you can touch.",
      "Notice 3 things you can hear.",
      "Notice 2 things you can smell.",
      "Notice 1 thing you can taste.",
    ],
  },
  {
    category: "Mindfulness",
    icon: "□",
    time: "8 min",
    title: "Body Scan",
    description:
      "Reconnect with your body by noticing sensations without judging them.",
    steps: [
      "Find a comfortable position.",
      "Notice your natural breathing.",
      "Move your attention slowly from head to feet.",
      "Notice sensations without trying to change them.",
    ],
  },
  {
    category: "Reflection",
    icon: "✦",
    time: "5 min",
    title: "Three Good Things",
    description:
      "A short reflection to notice small moments that mattered today.",
    steps: [
      "Think of three things that went reasonably well.",
      "Write them down.",
      "Notice why each one mattered.",
    ],
  },
  {
    category: "Relaxation",
    icon: "○",
    time: "10 min",
    title: "Quiet Reset",
    description:
      "Create a little distance between a stressful moment and your next step.",
    steps: [
      "Put your phone somewhere away from you.",
      "Take five slow breaths.",
      "Relax your shoulders and jaw.",
      "Notice your surroundings for a few minutes.",
    ],
  },
  {
    category: "Reflection",
    icon: "◌",
    time: "5 min",
    title: "Thought Check-In",
    description:
      "Pause and observe a difficult thought without immediately acting on it.",
    steps: [
      "Notice the thought.",
      "Name what emotion it brings up.",
      "Ask yourself whether the thought is a fact or an interpretation.",
      "Return your attention to the present moment.",
    ],
  },
];

function Resources() {
  const [category, setCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = [
    "All",
    "Breathing",
    "Grounding",
    "Mindfulness",
    "Reflection",
    "Relaxation",
  ];

  const filteredResources =
    category === "All"
      ? resources
      : resources.filter(
          (resource) => resource.category === category
        );

  return (
    <div className="min-h-screen bg-[#f4f5ef] px-5 py-12 text-[#18231f] md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#557486]">
            TAKE A MOMENT
          </p>

          <h1 className="font-serif text-5xl font-normal md:text-6xl">
            Wellness resources
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-[#60766e]">
            Gentle exercises for calming your mind, grounding yourself,
            and making a little room to breathe.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-9 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-2.5 text-sm transition ${
                category === item
                  ? "border-[#557a6a] bg-[#557a6a] text-white"
                  : "border-[#d8ddd7] bg-transparent text-[#60766e] hover:border-[#557a6a]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Resources */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <article
              key={resource.title}
              className="flex min-h-[310px] flex-col rounded-3xl border border-[#d8ddd7] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ef] text-xl text-[#557a6a]">
                  {resource.icon}
                </div>

                <span className="rounded-full bg-[#f0f3ef] px-3 py-1.5 text-xs text-[#365a4c]">
                  {resource.time}
                </span>
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-[#557486]">
                {resource.category}
              </p>

              <h2 className="mt-3 font-serif text-2xl">
                {resource.title}
              </h2>

              <p className="mt-3 flex-1 leading-7 text-[#60766e]">
                {resource.description}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedResource(resource)
                }
                className="mt-5 text-left font-semibold text-[#365a4c]"
              >
                Try this →
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#18231f]/40 p-5"
          onClick={() => setSelectedResource(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-[#f4f5ef] p-7 shadow-2xl md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedResource(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#e5e8e1] text-xl"
            >
              ×
            </button>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#557486]">
              {selectedResource.category}
            </p>

            <h2 className="mt-3 font-serif text-4xl font-normal">
              {selectedResource.title}
            </h2>

            <p className="mt-4 leading-7 text-[#60766e]">
              {selectedResource.description}
            </p>

            <ol className="mt-7 space-y-4">
              {selectedResource.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 leading-7"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dce7e1] text-sm font-semibold text-[#365a4c]">
                    {index + 1}
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => setSelectedResource(null)}
              className="mt-8 rounded-full bg-[#557a6a] px-7 py-3.5 font-semibold text-white hover:bg-[#365a4c]"
            >
              Finish exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resources;