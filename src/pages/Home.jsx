import { Link } from "react-router-dom";

const features = [
  {
    icon: "🌿",
    title: "Mood tracking",
    description:
      "Record how you're feeling and revisit your previous check-ins to reflect on your experiences.",
    link: "/mood",
    label: "Explore mood tracking",
  },
  {
    icon: "✍️",
    title: "Personal journaling",
    description:
      "Put your thoughts into words, use guided prompts and create a space for personal reflection.",
    link: "/journal",
    label: "Explore journaling",
  },
  {
    icon: "🧘",
    title: "Wellness exercises",
    description:
      "Explore breathing, grounding and relaxation exercises that you can practise at your own pace.",
    link: "/resources",
    label: "Discover exercises",
  },
  {
    icon: "💬",
    title: "AI companion",
    description:
      "Have a supportive conversation, express your thoughts and explore gentle suggestions.",
    link: "/chat",
    label: "Meet your companion",
  },
];

const topics = [
  {
    icon: "🌿",
    title: "Anxiety",
    description: "When your thoughts feel difficult to quiet.",
    slug: "anxiety",
    tone: "tile-brand",
  },
  {
    icon: "🍃",
    title: "Stress",
    description: "When everyday demands feel overwhelming.",
    slug: "stress",
    tone: "tile-accent",
  },
  {
    icon: "🌧️",
    title: "Low mood",
    description: "Understanding sadness and low motivation.",
    slug: "low-mood",
    tone: "tile-sand",
  },
  {
    icon: "🕯️",
    title: "Burnout",
    description: "Recognising exhaustion and the need for rest.",
    slug: "burnout",
    tone: "tile-brand",
  },
];

export default function Home() {
  return (
    <div className="page min-h-screen overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24">

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left side */}
          <div className="relative z-10 text-center lg:text-left">

            <div className="chip mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-sm">✳</span>
              <span className="text-brand text-[11px] font-semibold tracking-[0.13em]">
                A SPACE TO BE YOURSELF
              </span>
            </div>

            <h1 className="heading-display text-[4rem] leading-[0.91] sm:text-7xl lg:text-[6.5rem]">
              Your mind
              <br />
              deserves
              <br />
              <span className="text-brand-mid italic">
                a little care.
              </span>
            </h1>

            <p className="text-muted mx-auto mt-8 max-w-lg text-[15px] leading-8 lg:mx-0">
              A place to pause, understand your feelings,
              express what's on your mind and discover
              gentle ways to care for your wellbeing.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

              <Link to="/register" className="btn btn-primary">
                Begin your journey
              </Link>

              <Link to="/wellness" className="btn btn-secondary">
                Explore MindEase
              </Link>

            </div>

            <p className="text-faint mt-6 text-xs tracking-wide">
              A gentle reminder that you matter, too.
            </p>

          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[530px]">

            <div className="blob-soft absolute -right-8 top-4 h-64 w-64 rounded-full opacity-70 blur-3xl" />

            <div className="blob-warm absolute -bottom-8 -left-8 h-64 w-64 rounded-full opacity-70 blur-3xl" />

            <div className="relative">

              <div className="hero-panel overflow-hidden rounded-[48%_48%_24px_24px] px-6 pb-8 pt-12 sm:px-10 sm:pt-16">

                <div className="mx-auto max-w-sm text-center">

                  <div className="icon-ring shadow-soft mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl">
                    🌷
                  </div>

                  <p className="heading-display mt-8 text-4xl leading-tight sm:text-5xl">
                    Give yourself
                    <br />
                    permission to pause.
                  </p>

                  <p className="text-muted mx-auto mt-5 max-w-xs text-sm leading-7">
                    Not every day needs to be productive.
                    Sometimes, simply taking a breath is enough.
                  </p>

                  <div className="rule mx-auto mt-8 h-px w-16" />

                  <p className="text-muted mt-5 text-xs tracking-[0.15em]">
                    SLOW DOWN · BREATHE · BEGIN
                  </p>

                </div>

              </div>

              {/* Floating notes */}
              <div className="float-note shadow-soft absolute -left-3 top-1/3 rounded-2xl px-4 py-3 sm:-left-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <p className="text-xs font-semibold">
                      One step at a time
                    </p>
                    <p className="text-faint mt-1 text-[10px]">
                      Your pace is enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="float-note shadow-soft absolute -right-2 bottom-8 rounded-2xl px-4 py-3 sm:-right-7">
                <p className="text-brand text-xs">
                  ✨ A space for reflection
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= INTRODUCTION ================= */}
      <section className="section-alt px-5 py-20 sm:px-8 md:py-24">

        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-20">

          <div>
            <p className="text-brand text-xs font-semibold uppercase tracking-[0.16em]">
              A little about us
            </p>

            <h2 className="heading-display mt-5 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Because taking care of yourself should feel accessible.
            </h2>
          </div>

          <div className="md:pl-8">

            <p className="text-muted text-[15px] leading-8">
              Life brings different emotions, expectations and
              challenges. Yet we don't always find the time
              or space to understand what we're experiencing.
            </p>

            <p className="text-muted mt-5 text-[15px] leading-8">
              MindEase brings together journaling, mood check-ins,
              wellness resources and an AI companion to make
              self-reflection a little easier.
            </p>

            <p className="quote-rule text-muted mt-6 pl-4 text-sm italic leading-7">
              You don't need to have everything figured out
              to begin taking care of yourself.
            </p>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="px-5 py-20 sm:px-8 md:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 max-w-2xl">

            <p className="text-brand text-xs font-semibold uppercase tracking-[0.16em]">
              What you can explore
            </p>

            <h2 className="heading-display mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
              Different ways to care for your mind.
            </h2>

            <p className="text-muted mt-5 max-w-xl text-sm leading-7">
              Explore tools that help you notice your feelings,
              put thoughts into words and practise everyday
              wellness at your own pace.
            </p>

          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">

            {features.map((feature) => (
              <article
                key={feature.title}
                className="feature-row grid grid-cols-[64px_1fr] gap-5 pb-8"
              >

                <div className="tile tile-brand h-14 w-14 rounded-2xl text-3xl">
                  {feature.icon}
                </div>

                <div>

                  <h3 className="heading-display text-3xl">
                    {feature.title}
                  </h3>

                  <p className="text-muted mt-3 text-sm leading-7">
                    {feature.description}
                  </p>

                  <Link
                    to={feature.link}
                    className="link-underline mt-5 inline-block text-sm font-semibold"
                  >
                    {feature.label}
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ================= AI COMPANION ================= */}
      <section className="px-5 py-10 sm:px-8 md:py-16">

        <div className="panel-dark dark-scope relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 md:px-16 md:py-20">

          <div className="blob-dark-a absolute -right-24 -top-24 h-80 w-80 rounded-full blur-2xl" />

          <div className="blob-dark-b absolute -bottom-36 left-1/3 h-80 w-80 rounded-full blur-2xl" />

          <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">

            <div>

              <p className="on-dark text-xs font-semibold uppercase tracking-[0.16em]">
                A conversation, at your pace
              </p>

              <h2 className="heading-display on-dark-strong mt-5 text-4xl leading-tight sm:text-5xl md:text-6xl">
                You don't always need the perfect words.
              </h2>

              <p className="on-dark mt-6 max-w-lg text-sm leading-8">
                Sometimes it helps to express what you're
                feeling, even when you don't know exactly
                where to start. The MindEase AI Companion
                offers a space for supportive conversations
                and gentle suggestions.
              </p>

              <div className="on-dark mt-6 inline-flex flex-wrap items-center gap-2 text-sm">
                <span>English</span>
                <span className="on-dark-faint">·</span>
                <span>Hindi</span>
                <span className="on-dark-faint">·</span>
                <span>Hinglish</span>
              </div>

              <p className="on-dark-faint mt-2 text-xs">
                Communicate in the language that feels comfortable.
              </p>

              <Link to="/chat" className="btn btn-light mt-9">
                Talk to MindEase
              </Link>

              <p className="on-dark-faint mt-5 max-w-md text-xs leading-6">
                AI conversations are not a substitute for
                professional mental-health care or emergency support.
              </p>

            </div>

            {/* Conversation preview */}
            <div className="mx-auto w-full max-w-md">

              <div className="chat-card rounded-[2rem] p-5 shadow-xl sm:p-7">

                <div className="divider-dark flex items-center gap-3 border-b pb-5">

                  <div className="avatar-soft flex h-12 w-12 items-center justify-center rounded-full text-2xl">
                    🌿
                  </div>

                  <div>
                    <p className="on-dark-strong font-semibold">
                      MindEase Companion
                    </p>

                    <p className="on-dark-faint mt-1 text-xs">
                      AI wellness companion
                    </p>
                  </div>

                </div>

                <div className="space-y-5 py-7">

                  <div className="bubble-bot max-w-[88%] rounded-2xl rounded-tl-sm p-4 text-sm leading-6">
                    Hi! You can share whatever is on your mind.
                  </div>

                  <div className="bubble-user ml-auto max-w-[88%] rounded-2xl rounded-tr-sm p-4 text-sm leading-6">
                    Aaj thoda overwhelmed feel ho raha hai.
                  </div>

                  <div className="bubble-bot max-w-[88%] rounded-2xl rounded-tl-sm p-4 text-sm leading-6">
                    That's okay. Would you like to talk about
                    what's been making today difficult?
                  </div>

                </div>

                <div className="chat-input flex items-center justify-between rounded-full px-5 py-4">
                  <span className="on-dark-faint text-xs">
                    Share what's on your mind...
                  </span>
                  <span className="on-dark">✦</span>
                </div>

                <p className="on-dark-faint mt-4 text-center text-[10px] tracking-wide">
                  Illustrative conversation preview
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= WELLNESS LIBRARY ================= */}
      <section className="px-5 py-20 sm:px-8 md:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div className="max-w-2xl">

              <p className="text-brand text-xs font-semibold uppercase tracking-[0.16em]">
                Explore and learn
              </p>

              <h2 className="heading-display mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">
                Understanding is a good place to start.
              </h2>

              <p className="text-muted mt-5 text-sm leading-7">
                Explore approachable information about common
                mental-health experiences and discover helpful
                practices.
              </p>

            </div>

            <Link
              to="/wellness"
              className="link-underline whitespace-nowrap text-sm font-semibold"
            >
              View all topics
            </Link>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {topics.map((topic) => (
              <Link
                key={topic.slug}
                to={`/wellness?topic=${encodeURIComponent(topic.slug)}`}
                className="topic-card rounded-3xl p-6"
              >

                <div className={`tile ${topic.tone} h-12 w-12 rounded-2xl text-2xl`}>
                  {topic.icon}
                </div>

                <h3 className="heading-display mt-6 text-2xl">
                  {topic.title}
                </h3>

                <p className="text-muted mt-2 text-sm leading-6">
                  {topic.description}
                </p>

                <span className="link-underline mt-5 inline-block text-xs font-semibold">
                  Read more
                </span>

              </Link>
            ))}

          </div>

          <p className="text-faint mt-7 text-xs leading-6">
            Educational information only. MindEase does not diagnose
            or treat mental-health conditions.
          </p>

        </div>
      </section>


      {/* ================= HELP SOMEONE ================= */}
      <section className="section-alt px-5 py-16 sm:px-8 md:py-20">

        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto]">

          <div className="max-w-2xl">

            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>

              <p className="text-brand text-xs font-semibold uppercase tracking-[0.14em]">
                Care goes both ways
              </p>
            </div>

            <h2 className="heading-display mt-5 text-4xl leading-tight sm:text-5xl">
              Sometimes, being there for someone makes all the difference.
            </h2>

            <p className="text-muted mt-5 text-sm leading-7">
              Learn how to recognise when someone might be
              struggling, start a supportive conversation and
              encourage them to find help when they need it.
            </p>

          </div>

          <Link to="/help-someone" className="btn btn-secondary">
            How to support someone
          </Link>

        </div>
      </section>


      {/* ================= SAFETY STRIP ================= */}
      <section className="px-5 pb-8 pt-12 sm:px-8">

        <div className="strip-warm mx-auto max-w-6xl rounded-3xl p-6 sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-xl">

              <h2 className="heading-display text-3xl sm:text-4xl">
                Support is available.
              </h2>

              <p className="text-muted mt-3 text-sm leading-7">
                If you or someone you know needs mental-health
                support in India, you don't have to navigate
                the difficult moments alone.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <a href="tel:14416" className="phone-card min-w-[130px] rounded-2xl px-5 py-4">
                <span className="text-muted block text-xs">
                  Tele-MANAS
                </span>

                <span className="mt-1 block text-2xl font-semibold">
                  14416
                </span>
              </a>

              <a href="tel:112" className="phone-card min-w-[130px] rounded-2xl px-5 py-4">
                <span className="text-muted block text-xs">
                  Emergency
                </span>

                <span className="mt-1 block text-2xl font-semibold">
                  112
                </span>
              </a>

            </div>

          </div>

          <p className="strip-divider text-muted mt-5 border-t pt-4 text-xs leading-6">
            Tele-MANAS offers free, 24/7 mental-health support
            in multiple Indian languages. Call 112 for emergencies.
          </p>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="px-5 py-20 sm:px-8 md:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-3xl">🌷</span>

          <h2 className="heading-display mt-6 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            Start where
            <br />
            you are.
          </h2>

          <p className="text-muted mx-auto mt-7 max-w-lg text-sm leading-8">
            You don't need to change everything at once.
            Give yourself a little time and take the next
            step whenever you're ready.
          </p>

          <Link to="/register" className="btn btn-primary mt-9">
            Begin your journey
          </Link>

        </div>
      </section>

    </div>
  );
}