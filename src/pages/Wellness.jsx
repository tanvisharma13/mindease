import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const topics = [
  {
    id: "anxiety",
    title: "Anxiety",
    description:
      "When worry, nervousness, or a sense of unease starts taking up more space than you'd like.",
    emoji: "🌿",
    experiencing: [
      "Racing or repetitive thoughts",
      "Feeling restless or on edge",
      "Difficulty concentrating",
      "Physical tension or a fast heartbeat",
      "Worrying about what might happen",
    ],
    canHelp: [
      "Slow breathing and grounding exercises",
      "Breaking overwhelming tasks into smaller steps",
      "Reducing excessive caffeine if it makes symptoms worse",
      "Talking to someone you trust",
      "Keeping a regular sleep and movement routine",
    ],
    try: [
      "Name five things you can see around you.",
      "Take five slow breaths, making your exhale slightly longer.",
      "Write down the worry and one thing you can actually do about it.",
      "Take a short walk without your phone.",
    ],
  },

  {
    id: "depression",
    title: "Low mood & depression",
    description:
      "When sadness, emptiness, low motivation, or loss of interest begins to affect everyday life.",
    emoji: "🌧️",
    experiencing: [
      "Feeling persistently low or empty",
      "Losing interest in things you normally enjoy",
      "Low energy or motivation",
      "Changes in sleep or appetite",
      "Feeling hopeless, guilty, or disconnected",
    ],
    canHelp: [
      "Keeping basic routines as manageable as possible",
      "Getting some daylight and gentle movement",
      "Staying connected with supportive people",
      "Doing one small meaningful activity each day",
      "Speaking with a mental-health professional when symptoms persist",
    ],
    try: [
      "Choose one task that takes less than ten minutes.",
      "Open a window or step outside for a few minutes.",
      "Send one message to someone you trust.",
      "Write down three things you managed to do today, however small.",
    ],
  },

  {
    id: "stress",
    title: "Stress",
    description:
      "When demands, responsibilities, or uncertainty leave you feeling overloaded.",
    emoji: "🍃",
    experiencing: [
      "Feeling overwhelmed or mentally crowded",
      "Irritability or frustration",
      "Muscle tension or headaches",
      "Difficulty switching off",
      "Trouble sleeping or concentrating",
    ],
    canHelp: [
      "Prioritizing what genuinely needs to happen today",
      "Taking regular breaks",
      "Getting enough sleep and movement",
      "Setting boundaries around work or study",
      "Talking through problems instead of carrying them alone",
    ],
    try: [
      "Make a three-item list for today instead of a twenty-item list.",
      "Try a two-minute breathing pause.",
      "Put your phone away for fifteen minutes.",
      "Ask yourself: 'What can wait until tomorrow?'",
    ],
  },

  {
    id: "burnout",
    title: "Burnout",
    description:
      "When prolonged stress leaves you emotionally, mentally, or physically depleted.",
    emoji: "🕯️",
    experiencing: [
      "Feeling exhausted even after resting",
      "Cynicism or frustration toward responsibilities",
      "Difficulty getting started",
      "Reduced concentration",
      "Feeling that everything is becoming too much",
    ],
    canHelp: [
      "Reducing unnecessary demands where possible",
      "Taking genuine breaks rather than working through them",
      "Setting realistic expectations",
      "Talking with a supervisor, teacher, or trusted person",
      "Making recovery and sleep a priority",
    ],
    try: [
      "Identify one responsibility you can postpone or delegate.",
      "Take a break without trying to be productive.",
      "Create a clear stopping time for work or study.",
      "Do something restful that has no performance goal.",
    ],
  },

  {
    id: "loneliness",
    title: "Loneliness",
    description:
      "When you feel disconnected, unseen, or like you don't have the connection you need.",
    emoji: "🫶",
    experiencing: [
      "Feeling disconnected even around other people",
      "Feeling like nobody understands you",
      "Wanting connection but not knowing how to reach out",
      "Withdrawing from others",
      "Feeling left out or isolated",
    ],
    canHelp: [
      "Making small, regular social connections",
      "Joining an activity based on an interest",
      "Reaching out to one safe person",
      "Spending time in shared spaces",
      "Considering counselling if loneliness is persistent or painful",
    ],
    try: [
      "Send a simple 'How are you?' message.",
      "Sit somewhere where other people are around.",
      "Join one low-pressure group or activity.",
      "Tell someone you trust that you've been feeling disconnected.",
    ],
  },

  {
    id: "panic",
    title: "Panic",
    description:
      "A sudden wave of intense fear or physical alarm that can feel overwhelming.",
    emoji: "🌊",
    experiencing: [
      "Sudden intense fear",
      "Fast heartbeat",
      "Shortness of breath",
      "Dizziness or trembling",
      "Feeling detached or out of control",
    ],
    canHelp: [
      "Reminding yourself that intense sensations can pass",
      "Slowing your breathing rather than taking rapid breaths",
      "Grounding yourself in your surroundings",
      "Moving somewhere quieter if possible",
      "Seeking professional help if panic attacks keep happening",
    ],
    try: [
      "Put both feet firmly on the floor.",
      "Look around and name five things you see.",
      "Relax your shoulders and unclench your jaw.",
      "Breathe slowly and comfortably rather than forcing very deep breaths.",
    ],
  },

  {
    id: "grief",
    title: "Grief & loss",
    description:
      "When you're adjusting to the loss of someone, something, or a future you expected.",
    emoji: "🌙",
    experiencing: [
      "Sadness or longing",
      "Anger or guilt",
      "Numbness or disbelief",
      "Changes in sleep or appetite",
      "Good days followed by unexpectedly difficult days",
    ],
    canHelp: [
      "Giving yourself permission to grieve in your own way",
      "Staying connected with supportive people",
      "Keeping basic routines",
      "Creating meaningful rituals or memories",
      "Seeking additional support when grief becomes difficult to carry",
    ],
    try: [
      "Write a letter to what or who you have lost.",
      "Talk about a memory with someone safe.",
      "Let yourself have a difficult day without judging it.",
      "Keep one small routine that gives your day structure.",
    ],
  },

  {
    id: "body-image",
    title: "Body image",
    description:
      "When thoughts about your appearance, body, or how others see you become difficult to switch off.",
    emoji: "🌱",
    experiencing: [
      "Frequent comparison with other people",
      "Checking or avoiding mirrors",
      "Negative thoughts about your appearance",
      "Feeling uncomfortable being photographed",
      "Letting appearance affect social activities",
    ],
    canHelp: [
      "Reducing exposure to accounts that trigger comparison",
      "Practicing neutral rather than critical body language",
      "Focusing on what your body allows you to experience",
      "Wearing clothes that feel comfortable",
      "Talking with a professional if body concerns are significantly affecting life",
    ],
    try: [
      "Unfollow one account that consistently makes you compare yourself.",
      "Describe your body without using positive or negative judgments.",
      "Do something enjoyable that has nothing to do with appearance.",
      "Notice what your body helps you do today.",
    ],
  },
];

function Wellness() {
  const [selectedTopic, setSelectedTopic] = useState("anxiety");
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return topics;

    return topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
    );
  }, [search]);

  const activeTopic =
    topics.find((topic) => topic.id === selectedTopic) || topics[0];

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        {/* Header */}
        <section className="max-w-3xl mb-12">
          <p className="text-sm font-medium text-[#52745D] mb-3">
            Mental health library
          </p>

          <h1 className="text-4xl md:text-6xl font-serif text-[#263D31] leading-tight">
            Understand what you&apos;re experiencing.
          </h1>

          <p className="mt-5 text-[#718078] text-base md:text-lg leading-8">
            A gentle starting point for learning about common mental-health
            experiences, finding things you can try, and knowing when extra
            support may help.
          </p>

          <div className="mt-7 relative max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anxiety, stress, grief..."
              className="w-full rounded-2xl border border-[#D7DFD5] bg-white px-5 py-4 text-sm text-[#304737] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
            />
          </div>
        </section>

        {/* Topic buttons */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-2">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`rounded-full px-4 py-2.5 text-sm transition ${
                  selectedTopic === topic.id
                    ? "bg-[#3F604B] text-white"
                    : "bg-white border border-[#DCE3D9] text-[#53675A] hover:bg-[#EAF0E8]"
                }`}
              >
                {topic.emoji} {topic.title}
              </button>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <p className="mt-6 text-sm text-[#718078]">
              We couldn&apos;t find that topic. Try another word or browse the
              topics above.
            </p>
          )}
        </section>

        {/* Main topic */}
        <section className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-[#DDE8DC] rounded-3xl p-6 h-fit lg:sticky lg:top-28">
            <div className="text-4xl mb-5">
              {activeTopic.emoji}
            </div>

            <h2 className="text-2xl font-serif text-[#294332]">
              {activeTopic.title}
            </h2>

            <p className="text-sm leading-6 text-[#53685A] mt-3">
              {activeTopic.description}
            </p>

            <div className="mt-7 pt-5 border-t border-[#C7D7C5]">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#607765]">
                Remember
              </p>

              <p className="text-sm leading-6 text-[#53685A] mt-2">
                Reading about an experience can help you understand yourself,
                but it cannot tell you whether you have a diagnosis.
              </p>
            </div>
          </aside>

          <div className="space-y-5">
            {/* What you might experience */}
            <article className="bg-white border border-[#DCE3D9] rounded-3xl p-6 md:p-8">
              <p className="text-sm font-medium text-[#52745D]">
                01
              </p>

              <h2 className="text-2xl md:text-3xl font-serif text-[#304737] mt-2">
                What you might be experiencing
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {activeTopic.experiencing.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#F5F8F3] px-4 py-4 text-sm text-[#53675A]"
                  >
                    <span className="text-[#6C8A72] mr-2">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {/* What can help */}
            <article className="bg-white border border-[#DCE3D9] rounded-3xl p-6 md:p-8">
              <p className="text-sm font-medium text-[#52745D]">
                02
              </p>

              <h2 className="text-2xl md:text-3xl font-serif text-[#304737] mt-2">
                What can help
              </h2>

              <div className="space-y-3 mt-6">
                {activeTopic.canHelp.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 items-start"
                  >
                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#DDE8DC] flex items-center justify-center text-xs text-[#52745D]">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-[#53675A]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Things to try */}
            <article className="bg-[#304737] rounded-3xl p-6 md:p-8 text-white">
              <p className="text-sm font-medium text-[#BFD1C0]">
                03
              </p>

              <h2 className="text-2xl md:text-3xl font-serif mt-2">
                Things you can try
              </h2>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {activeTopic.try.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 border border-white/10 p-5"
                  >
                    <span className="text-xs text-[#BFD1C0]">
                      Try {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-[#E8EFE6] mt-2">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Professional support */}
            <article className="bg-[#EDE9DE] border border-[#DED8C9] rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-serif text-[#4A5148]">
                When to reach out for more support
              </h2>

              <p className="text-sm leading-7 text-[#626960] mt-3">
                If what you&apos;re experiencing is persistent, getting in the
                way of daily life, or becoming difficult to manage on your
                own, consider speaking with a qualified mental-health
                professional or another trusted support person.
              </p>

              <Link
                to="/help-someone"
                className="inline-block mt-5 text-sm font-medium text-[#52745D] hover:underline"
              >
                Learn how to support someone else →
              </Link>
            </article>
          </div>
        </section>

        {/* Crisis note */}
        <section className="mt-8 rounded-2xl border border-[#E4D9D0] bg-[#FAF5F0] px-5 py-4">
          <p className="text-sm leading-6 text-[#665A53]">
            <strong>If you are in immediate danger or think you may hurt
            yourself or someone else,</strong> contact your local emergency
            service or a crisis service in your country, or go to the nearest
            emergency department.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Wellness;