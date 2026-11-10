
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const topics = [
  {
    id: "anxiety",
    title: "Anxiety",
    description:
      "When worry, nervousness, or a sense of unease starts taking up more space than you'd like.",
    emoji: "🌿",
    keywords: ["worry", "fear", "nervous", "panic", "overthinking"],
    experiencing: [
      "Racing or repetitive thoughts",
      "Feeling restless or on edge",
      "Difficulty concentrating",
      "Physical tension or a fast heartbeat",
      "Worrying about what might happen",
    ],
    canHelp: [
      "Trying slow breathing and grounding exercises",
      "Breaking overwhelming tasks into smaller steps",
      "Reducing caffeine if it makes symptoms worse",
      "Talking to someone you trust",
      "Keeping a regular sleep and movement routine",
    ],
    try: [
      "Name five things you can see around you.",
      "Take five slow, comfortable breaths.",
      "Write down the worry and one thing you can actually do about it.",
      "Take a short walk without your phone.",
    ],
    next: {
      exercise: "5-4-3-2-1 Grounding and breathing",
      description: "Try a grounding exercise or a gentle breathing practice.",
    },
  },
  {
    id: "depression",
    title: "Low mood & depression",
    description:
      "When sadness, emptiness, low motivation, or loss of interest begins to affect everyday life.",
    emoji: "🌧️",
    keywords: ["sad", "empty", "hopeless", "low", "motivation"],
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
    next: {
      exercise: "Name the Feeling",
      description: "Pause and identify what you are feeling without judging it.",
    },
  },
  {
    id: "stress",
    title: "Stress",
    description:
      "When demands, responsibilities, or uncertainty leave you feeling overloaded.",
    emoji: "🍃",
    keywords: ["pressure", "tension", "workload", "overwhelmed"],
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
      "Try a short breathing pause.",
      "Put your phone away for fifteen minutes.",
      "Ask yourself: What can wait until tomorrow?",
    ],
    next: {
      exercise: "Quiet Reset",
      description: "Take a short pause before deciding what to do next.",
    },
  },
  {
    id: "burnout",
    title: "Burnout",
    description:
      "When prolonged stress leaves you emotionally, mentally, or physically depleted.",
    emoji: "🕯️",
    keywords: ["exhausted", "tired", "drained", "study", "work"],
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
      "Talking with a teacher or trusted person",
      "Making recovery and sleep a priority",
    ],
    try: [
      "Identify one responsibility you can postpone or delegate.",
      "Take a break without trying to be productive.",
      "Create a clear stopping time for work or study.",
      "Do something restful that has no performance goal.",
    ],
    next: {
      exercise: "Quiet Reset",
      description: "Create a little distance from your responsibilities.",
    },
  },
  {
    id: "loneliness",
    title: "Loneliness",
    description:
      "When you feel disconnected, unseen, or like you don't have the connection you need.",
    emoji: "🫶",
    keywords: ["alone", "isolated", "left out", "disconnected", "friends"],
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
    next: {
      exercise: "Name the Feeling",
      description: "Give your feelings a name and explore what you need.",
    },
  },
  {
    id: "panic",
    title: "Panic",
    description:
      "A sudden wave of intense fear or physical alarm that can feel overwhelming.",
    emoji: "🌊",
    keywords: ["panic attack", "heart racing", "breathing", "fear"],
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
      "Breathe slowly and comfortably rather than forcing deep breaths.",
    ],
    next: {
      exercise: "Grounding and gentle breathing",
      description: "Use your surroundings to reconnect with the present.",
    },
  },
  {
    id: "grief",
    title: "Grief & loss",
    description:
      "When you're adjusting to the loss of someone, something, or a future you expected.",
    emoji: "🌙",
    keywords: ["death", "loss", "mourning", "missing", "change"],
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
    next: {
      exercise: "Three Good Things",
      description: "Use gentle reflection to notice small moments in your day.",
    },
  },
  {
    id: "body-image",
    title: "Body image",
    description:
      "When thoughts about your appearance, body, or how others see you become difficult to switch off.",
    emoji: "🌱",
    keywords: ["appearance", "body", "looks", "weight", "beauty"],
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
      "Talking with a professional if body concerns significantly affect daily life",
    ],
    try: [
      "Unfollow one account that consistently makes you compare yourself.",
      "Describe your body without using positive or negative judgments.",
      "Do something enjoyable that has nothing to do with appearance.",
      "Notice what your body helps you do today.",
    ],
    next: {
      exercise: "Name the Feeling",
      description: "Notice the emotions behind appearance-related thoughts.",
    },
  },
  {
    id: "sleep",
    title: "Sleep Problems",
    description:
      "When difficulty falling asleep, staying asleep, or maintaining a regular sleep routine affects your day.",
    emoji: "🌙",
    keywords: ["insomnia", "sleeping", "night", "tired", "rest", "bedtime"],
    experiencing: [
      "Taking a long time to fall asleep",
      "Waking up repeatedly during the night",
      "Feeling tired even after spending time in bed",
      "A racing mind when trying to sleep",
      "Difficulty concentrating or feeling rested during the day",
    ],
    canHelp: [
      "Keeping a reasonably consistent sleep and wake-up time",
      "Making your sleeping space quiet, dark and comfortable",
      "Reducing screen use before bedtime where possible",
      "Avoiding caffeine close to bedtime",
      "Getting regular daytime movement and natural light",
    ],
    try: [
      "Choose a realistic bedtime routine for tonight.",
      "Put your phone away a little before going to bed.",
      "Write down tomorrow's tasks so you don't have to keep rehearsing them.",
      "Try the Sleep Wind-Down exercise in Resources.",
    ],
    next: {
      exercise: "Sleep Wind-Down",
      description: "Try a gentle routine to slow down before bedtime.",
    },
  },
  {
    id: "academic",
    title: "Exam & Academic Pressure",
    description:
      "When exams, deadlines, grades, competition, or expectations make studying feel overwhelming.",
    emoji: "📚",
    keywords: ["exam", "college", "school", "grades", "marks", "study", "failure"],
    experiencing: [
      "Constantly worrying about exams or results",
      "Difficulty starting or organizing study tasks",
      "Comparing your marks or progress with classmates",
      "Feeling guilty whenever you take a break",
      "Trouble sleeping or concentrating because of deadlines",
    ],
    canHelp: [
      "Breaking large subjects into smaller study sessions",
      "Setting realistic daily priorities",
      "Taking short breaks instead of studying continuously",
      "Talking to a teacher or mentor when you feel stuck",
      "Remembering that your worth is not determined by grades",
    ],
    try: [
      "Write down the three most important tasks for today.",
      "Study one topic for a manageable period, then take a break.",
      "Ask a classmate or teacher about something you don't understand.",
      "Make time for sleep rather than sacrificing every night to study.",
    ],
    next: {
      exercise: "Quiet Reset",
      description: "Take a pause and break the pressure into smaller steps.",
    },
  },
  {
    id: "social-media",
    title: "Social Media & Comparison",
    description:
      "When online content, likes, trends, or seeing other people's lives makes you question your own.",
    emoji: "📱",
    keywords: ["instagram", "comparison", "likes", "followers", "online", "fomo"],
    experiencing: [
      "Comparing your appearance or achievements with online posts",
      "Feeling left out when seeing other people's activities",
      "Checking notifications or feeds more often than intended",
      "Feeling worse after scrolling for a long time",
      "Feeling pressure to present a perfect version of yourself",
    ],
    canHelp: [
      "Noticing which accounts or content affect your mood",
      "Muting or unfollowing accounts that repeatedly trigger comparison",
      "Taking breaks from scrolling, especially before bedtime",
      "Making time for offline interests and relationships",
      "Remembering that online posts show selected moments, not someone's entire life",
    ],
    try: [
      "Take a short break from one app today.",
      "Mute one account that makes you feel inadequate.",
      "Notice how you feel before and after scrolling.",
      "Do one activity that makes you feel good without posting it.",
    ],
    next: {
      exercise: "Name the Feeling",
      description: "Reflect on how online comparison is making you feel.",
    },
  },
  {
    id: "relationships",
    title: "Relationships & Breakups",
    description:
      "When friendship conflicts, relationship difficulties, rejection, or a breakup feel emotionally difficult.",
    emoji: "💛",
    keywords: ["breakup", "love", "friendship", "rejection", "conflict", "partner"],
    experiencing: [
      "Repeatedly thinking about conversations or arguments",
      "Feeling rejected, hurt, confused, or disappointed",
      "Missing someone after a relationship ends",
      "Difficulty concentrating on everyday responsibilities",
      "Feeling uncertain about boundaries or what to do next",
    ],
    canHelp: [
      "Giving yourself time before making emotionally difficult decisions",
      "Talking with someone you trust who will listen without judging",
      "Communicating your needs and boundaries clearly when it is safe",
      "Maintaining routines and activities outside the relationship",
      "Seeking support if a relationship involves fear, control, threats, or harm",
    ],
    try: [
      "Write down what happened and how it made you feel.",
      "Think about one boundary that would help you feel safer or respected.",
      "Take a break from repeatedly checking someone's profile or messages.",
      "Reach out to a trusted friend rather than handling everything alone.",
    ],
    next: {
      exercise: "Thought Check-In",
      description: "Explore a difficult thought without immediately reacting to it.",
    },
  },
  {
    id: "family",
    title: "Family Expectations",
    description:
      "When family responsibilities, expectations, disagreements, or pressure about your future become difficult to manage.",
    emoji: "🏡",
    keywords: ["parents", "family pressure", "expectations", "career", "arguments"],
    experiencing: [
      "Feeling pressure to meet expectations about grades or career choices",
      "Finding it difficult to express your own preferences",
      "Feeling guilty when your choices differ from your family's",
      "Frequent disagreements or tension at home",
      "Feeling caught between personal goals and family responsibilities",
    ],
    canHelp: [
      "Identifying which expectations are realistic and which are not",
      "Talking when everyone has time to listen, if it feels safe",
      "Explaining your goals and concerns calmly",
      "Seeking guidance from a trusted teacher, counsellor, or relative",
      "Remembering that needing support does not make you ungrateful",
    ],
    try: [
      "Write down what you want, separate from what others expect.",
      "Identify one concern you would like your family to understand.",
      "Talk through your options with someone you trust.",
      "Take a short break when a discussion becomes overwhelming.",
    ],
    next: {
      exercise: "Thought Check-In",
      description: "Separate what you know from what you fear or assume.",
    },
  },
  {
    id: "self-esteem",
    title: "Self-Esteem & Confidence",
    description:
      "When self-doubt, harsh self-criticism, or fear of judgment makes it difficult to recognize your own value.",
    emoji: "🌻",
    keywords: ["confidence", "self worth", "insecurity", "failure", "judgment"],
    experiencing: [
      "Frequently criticizing yourself",
      "Feeling that you are not good enough",
      "Finding it difficult to accept compliments",
      "Being afraid of making mistakes",
      "Comparing your progress or abilities with others",
    ],
    canHelp: [
      "Noticing when your inner self-talk becomes overly critical",
      "Setting small goals that are meaningful to you",
      "Recognizing effort as well as outcomes",
      "Spending time with people who treat you with respect",
      "Seeking support when self-doubt begins affecting everyday life",
    ],
    try: [
      "Write down one thing you handled well today.",
      "Notice one strength that is not related to appearance or achievement.",
      "Speak to yourself as you would speak to a friend.",
      "Try something small even if you are not completely confident.",
    ],
    next: {
      exercise: "Three Good Things",
      description: "Notice small moments and efforts worth acknowledging.",
    },
  },
];

const sources = [
  {
    name: "WHO – Stress",
    url: "https://www.who.int/news-room/questions-and-answers/item/stress",
  },
  {
    name: "WHO – Adolescent Mental Health",
    url: "https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health",
  },
  {
    name: "NIMHANS – College Students & Youth",
    url: "https://cam.nimhans.ac.in/preventive-intervention-package/",
  },
  {
    name: "India – Student Support Resources",
    url: "https://ntf.education.gov.in/student-support-resources/",
  },
];

function Wellness() {
  const [selectedTopic, setSelectedTopic] = useState("anxiety");
  const [search, setSearch] = useState("");

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return topics;

    return topics.filter((topic) => {
      const searchableText = [
        topic.title,
        topic.description,
        ...topic.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [search]);

  const activeTopic =
    topics.find((topic) => topic.id === selectedTopic) || topics[0];

  const selectTopic = (id) => {
    setSelectedTopic(id);
  };

  return (
    <div className="min-h-screen page">
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {/* Header */}
        <section className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium text-brand">
            Mental health library
          </p>

          <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">
            Understand what you're experiencing.
          </h1>

          <p className="mt-5 text-base leading-8 text-muted md:text-lg">
            A gentle starting point for learning about common mental-health
            experiences, finding things you can try, and knowing when extra
            support may help.
          </p>

          <div className="relative mt-7 max-w-xl">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sleep, exams, anxiety, relationships..."
              aria-label="Search mental health topics"
              className="w-full rounded-2xl border border-line-strong surface-card px-5 py-4 text-sm text-ink    /10"
            />
          </div>
        </section>

        {/* Topic buttons */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-2">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => selectTopic(topic.id)}
                aria-pressed={selectedTopic === topic.id}
                className={`rounded-full px-4 py-2.5 text-sm transition ${
                  selectedTopic === topic.id
                    ? "btn-primary"
                    : "border-line surface-card text-muted hover-brand-soft"
                }`}
              >
                {topic.emoji} {topic.title}
              </button>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="mt-6 rounded-2xl border border-line surface-card p-6">
              <p className="text-sm text-muted">
                We couldn't find that topic. Try another word or browse the
                topics above.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-3 text-sm font-medium text-brand hover:underline"
              >
                Show all topics
              </button>
            </div>
          )}
        </section>

        {/* Main topic */}
        {filteredTopics.length > 0 && (
          <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Topic introduction */}
            <aside className="h-fit rounded-3xl tile-brand p-6 lg:sticky lg:top-28">
              <div className="mb-5 text-4xl">
                {activeTopic.emoji}
              </div>

              <h2 className="font-serif text-2xl text-ink">
                {activeTopic.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                {activeTopic.description}
              </p>

              <div className="mt-7 border-t border-line-strong pt-5">
                <p className="text-sm font-semibold text-muted">
                  Remember
                </p>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Reading about an experience can help you understand
                  yourself, but it cannot tell you whether you have a
                  diagnosis.
                </p>
              </div>
            </aside>

            <div className="space-y-5">
              {/* What you might experience */}
              <article className="rounded-3xl border border-line surface-card p-6 md:p-8">
                <p className="text-sm font-medium text-brand">
                  01
                </p>

                <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                  What you might be experiencing
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {activeTopic.experiencing.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl tile-brand px-4 py-4 text-sm text-muted"
                    >
                      <span className="mr-2 text-brand-mid">•</span>
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              {/* What can help */}
              <article className="rounded-3xl border border-line surface-card p-6 md:p-8">
                <p className="text-sm font-medium text-brand">
                  02
                </p>

                <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                  What can help
                </h2>

                <div className="mt-6 space-y-3">
                  {activeTopic.canHelp.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full tile-brand text-xs text-brand">
                        ✓
                      </span>

                      <p className="text-sm leading-6 text-muted">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Things to try */}
              <article className="rounded-3xl panel-dark on-dark-strong p-6 md:p-8">
                <p className="text-sm font-medium on-dark-faint">
                  03
                </p>

                <h2 className="mt-2 font-serif text-2xl md:text-3xl">
                  Things you can try
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {activeTopic.try.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl chat-card p-5"
                    >
                      <span className="text-xs on-dark-faint">
                        Try {index + 1}
                      </span>

                      <p className="mt-2 text-sm leading-6 on-dark">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* What to do next */}
              <article className="rounded-3xl border border-line surface-card p-6 md:p-8">
                <p className="text-sm font-medium text-brand">
                  04
                </p>

                <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                  What to do next
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted">
                  Learning about something is a good first step. You can
                  continue at your own pace using the other MindEase
                  features.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Link
                    to="/resources"
                    className="rounded-2xl tile-brand p-5 transition hover-brand-soft"
                  >
                    <span className="text-2xl">🌿</span>

                    <h3 className="mt-3 font-semibold text-ink">
                      Try an exercise
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted">
                      {activeTopic.next.exercise}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-brand">
                      Explore Resources →
                    </p>
                  </Link>

                  <Link
                    to="/chat"
                    className="rounded-2xl tile-sand p-5 transition hover-sand"
                  >
                    <span className="text-2xl">💬</span>

                    <h3 className="mt-3 font-semibold text-ink">
                      Talk it through
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted">
                      Use the MindEase chatbot to put your thoughts into
                      words.
                    </p>

                    <p className="mt-3 text-xs font-semibold text-brand">
                      Open Chat →
                    </p>
                  </Link>

                  <Link
                    to="/mood"
                    className="rounded-2xl tile-sand p-5 transition hover-sand"
                  >
                    <span className="text-2xl">💚</span>

                    <h3 className="mt-3 font-semibold text-ink">
                      Log how you feel
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted">
                      Record your mood and notice patterns over time.
                    </p>

                    <p className="mt-3 text-xs font-semibold text-brand">
                      Open Mood Tracker →
                    </p>
                  </Link>
                </div>

                <p className="mt-4 text-xs leading-5 text-faint">
                  {activeTopic.next.description}
                </p>
              </article>

              {/* Professional support */}
              <article className="rounded-3xl strip-warm p-6 md:p-8">
                <h2 className="font-serif text-2xl text-ink">
                  When to reach out for more support
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted">
                  If what you're experiencing is persistent, getting in the
                  way of daily life, or becoming difficult to manage on your
                  own, consider speaking with a qualified mental-health
                  professional or another trusted support person. You do
                  not need to wait until things become unbearable to ask
                  for help.
                </p>

                <div className="mt-6 rounded-2xl surface-card p-5">
                  <p className="text-sm font-semibold text-brand">
                    Need someone to talk to in India?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    Tele-MANAS provides free mental-health support, 24 hours
                    a day, 7 days a week, in multiple languages.
                  </p>

                  <a
                    href="tel:14416"
                    className="mt-4 inline-flex items-center justify-center rounded-full btn-primary px-6 py-3 text-sm font-semibold transition"
                  >
                    Call Tele-MANAS: 14416
                  </a>

                  <p className="mt-3 text-xs text-muted">
                    You can also call 1800-891-4416.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-brand">
                  <Link to="/resources" className="hover:underline">
                    Explore exercises
                  </Link>

                  <Link to="/chat" className="hover:underline">
                    Talk it through
                  </Link>

                  <Link to="/mood" className="hover:underline">
                    Log your mood
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Crisis note */}
        <section className="mt-8 rounded-2xl strip-warm px-5 py-4">
          <p className="text-sm leading-6 text-muted">
            <strong>
              If you are in immediate danger or think you may hurt yourself
              or someone else,
            </strong>{" "}
            contact your local emergency service or go to the nearest
            emergency department. In India, call 112 for emergency
            assistance.
          </p>
        </section>

        {/* Sources and review information */}
        <footer className="mt-10 border-t border-line pt-6">
        

        

       

          <p className="mt-4 text-xs leading-5 text-faint">
            It is not a diagnostic tool
            and does not replace professional mental-health care.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Wellness;
