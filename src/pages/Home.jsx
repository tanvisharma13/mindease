
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
    tone: "bg-[#E8EEE5]",
  },
  {
    icon: "🍃",
    title: "Stress",
    description: "When everyday demands feel overwhelming.",
    slug: "stress",
    tone: "bg-[#EEECE1]",
  },
  {
    icon: "🌧️",
    title: "Low mood",
    description: "Understanding sadness and low motivation.",
    slug: "low-mood",
    tone: "bg-[#E9E9E5]",
  },
  {
    icon: "🕯️",
    title: "Burnout",
    description: "Recognising exhaustion and the need for rest.",
    slug: "burnout",
    tone: "bg-[#EFE9E1]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F6F0] text-[#304737]"
      style={{ fontFamily: '"DM Sans", Arial, sans-serif' }}
    >

      {/* Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .home-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 500;
          letter-spacing: -0.035em;
        }

        .home-body {
          font-family: 'DM Sans', Arial, sans-serif;
        }

        .home-link {
          transition: color 180ms ease;
        }

        .home-link:hover {
          color: #304737;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page *,
          .home-page *::before,
          .home-page *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="home-page">

        {/* ================= HERO ================= */}
        <section className="relative px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24">

          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Left side */}
            <div className="relative z-10 text-center lg:text-left">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DCE4D8] bg-white/70 px-4 py-2">
                <span className="text-sm">✳</span>
                <span className="text-[11px] font-semibold tracking-[0.13em] text-[#66806B]">
                  A SPACE TO BE YOURSELF
                </span>
              </div>

              <h1 className="home-heading text-[4rem] leading-[0.91] text-[#304737] sm:text-7xl lg:text-[6.5rem]">
                Your mind
                <br />
                deserves
                <br />
                <span className="italic text-[#82977D]">
                  a little care.
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-lg text-[15px] leading-8 text-[#718078] lg:mx-0">
                A place to pause, understand your feelings,
                express what's on your mind and discover
                gentle ways to care for your wellbeing.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-[#3F604B] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#304D3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D] focus-visible:ring-offset-2"
                >
                  Begin your journey
                </Link>

                <Link
                  to="/wellness"
                  className="inline-flex items-center justify-center rounded-full border border-[#C9D5C7] px-8 py-4 text-sm font-medium text-[#52745D] transition hover:bg-[#EAF0E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D]"
                >
                  Explore MindEase
                </Link>

              </div>

              <p className="mt-6 text-xs tracking-wide text-[#8A968D]">
                A gentle reminder that you matter, too.
              </p>

            </div>

            {/* Right visual */}
            <div className="relative mx-auto w-full max-w-[530px]">

              <div className="absolute -right-8 top-4 h-64 w-64 rounded-full bg-[#DDE7D8] opacity-70 blur-3xl" />

              <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-[#E9E2D4] opacity-70 blur-3xl" />

              <div className="relative">

                <div className="overflow-hidden rounded-[48%_48%_24px_24px] bg-[#DDE6D9] px-6 pb-8 pt-12 sm:px-10 sm:pt-16">

                  <div className="mx-auto max-w-sm text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/60 text-5xl shadow-sm">
                      🌷
                    </div>

                    <p className="home-heading mt-8 text-4xl leading-tight text-[#304737] sm:text-5xl">
                      Give yourself
                      <br />
                      permission to pause.
                    </p>

                    <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-[#637767]">
                      Not every day needs to be productive.
                      Sometimes, simply taking a breath is enough.
                    </p>

                    <div className="mx-auto mt-8 h-px w-16 bg-[#A9BBA5]" />

                    <p className="mt-5 text-xs tracking-[0.15em] text-[#637767]">
                      SLOW DOWN · BREATHE · BEGIN
                    </p>

                  </div>

                </div>

                {/* Floating note */}
                <div className="absolute -left-3 top-1/3 rounded-2xl border border-[#E8E9DF] bg-white px-4 py-3 shadow-md sm:-left-8">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <p className="text-xs font-semibold text-[#304737]">
                        One step at a time
                      </p>
                      <p className="mt-1 text-[10px] text-[#8A968D]">
                        Your pace is enough.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 bottom-8 rounded-2xl border border-[#E8E9DF] bg-white px-4 py-3 shadow-md sm:-right-7">
                  <p className="text-xs text-[#52745D]">
                    ✨ A space for reflection
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* ================= INTRODUCTION ================= */}
        <section className="border-y border-[#E7E7DC] bg-[#F0F1E9] px-5 py-20 sm:px-8 md:py-24">

          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-20">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#82977D]">
                A little about us
              </p>

              <h2 className="home-heading mt-5 text-4xl leading-[1.08] text-[#304737] sm:text-5xl md:text-6xl">
                Because taking care of yourself should feel accessible.
              </h2>
            </div>

            <div className="md:pl-8">

              <p className="text-[15px] leading-8 text-[#718078]">
                Life brings different emotions, expectations and
                challenges. Yet we don't always find the time
                or space to understand what we're experiencing.
              </p>

              <p className="mt-5 text-[15px] leading-8 text-[#718078]">
                MindEase brings together journaling, mood check-ins,
                wellness resources and an AI companion to make
                self-reflection a little easier.
              </p>

              <p className="mt-6 border-l-2 border-[#82977D] pl-4 text-sm italic leading-7 text-[#60766E]">
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

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#82977D]">
                What you can explore
              </p>

              <h2 className="home-heading mt-4 text-4xl leading-tight text-[#304737] sm:text-5xl md:text-6xl">
                Different ways to care for your mind.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#718078]">
                Explore tools that help you notice your feelings,
                put thoughts into words and practise everyday
                wellness at your own pace.
              </p>

            </div>

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">

              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group grid grid-cols-[64px_1fr] gap-5 border-b border-[#E1E5DC] pb-8"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9EEE5] text-3xl">
                    {feature.icon}
                  </div>

                  <div>

                    <h3 className="home-heading text-3xl text-[#304737]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#718078]">
                      {feature.description}
                    </p>

                    <Link
                      to={feature.link}
                      className="home-link mt-5 inline-block text-sm font-semibold text-[#66806B] underline decoration-[#B9C9B5] underline-offset-4"
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

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#304737] px-6 py-14 sm:px-10 md:px-16 md:py-20">

            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#6D886C]/20 blur-2xl" />

            <div className="absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-[#82977D]/15 blur-2xl" />

            <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#BFD1C0]">
                  A conversation, at your pace
                </p>

                <h2 className="home-heading mt-5 text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                  You don't always need the perfect words.
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-8 text-[#D0DDD1]">
                  Sometimes it helps to express what you're
                  feeling, even when you don't know exactly
                  where to start. The MindEase AI Companion
                  offers a space for supportive conversations
                  and gentle suggestions.
                </p>

                <div className="mt-6 inline-flex flex-wrap items-center gap-2 text-sm text-[#E0E9DE]">
                  <span>English</span>
                  <span className="text-[#82977D]">·</span>
                  <span>Hindi</span>
                  <span className="text-[#82977D]">·</span>
                  <span>Hinglish</span>
                </div>

                <p className="mt-2 text-xs text-[#AFC2B2]">
                  Communicate in the language that feels comfortable.
                </p>

                <Link
                  to="/chat"
                  className="mt-9 inline-flex items-center justify-center rounded-full bg-[#F7F4EC] px-8 py-4 text-sm font-semibold text-[#304737] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#304737]"
                >
                  Talk to MindEase
                </Link>

                <p className="mt-5 max-w-md text-xs leading-6 text-[#AFC2B2]">
                  AI conversations are not a substitute for
                  professional mental-health care or emergency support.
                </p>

              </div>

              {/* Conversation preview */}
              <div className="mx-auto w-full max-w-md">

                <div className="rounded-[2rem] border border-white/10 bg-[#405B48] p-5 shadow-xl sm:p-7">

                  <div className="flex items-center gap-3 border-b border-white/10 pb-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DDE8DC] text-2xl">
                      🌿
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        MindEase Companion
                      </p>

                      <p className="mt-1 text-xs text-[#C2D3C2]">
                        AI wellness companion
                      </p>
                    </div>

                  </div>

                  <div className="space-y-5 py-7">

                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#55715C] p-4 text-sm leading-6 text-white">
                      Hi! You can share whatever is on your mind.
                    </div>

                    <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#E1E9DC] p-4 text-sm leading-6 text-[#304737]">
                      Aaj thoda overwhelmed feel ho raha hai.
                    </div>

                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#55715C] p-4 text-sm leading-6 text-white">
                      That's okay. Would you like to talk about
                      what's been making today difficult?
                    </div>

                  </div>

                  <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-5 py-4">
                    <span className="text-xs text-[#C2D3C2]">
                      Share what's on your mind...
                    </span>
                    <span className="text-[#DDE8DC]">✦</span>
                  </div>

                  <p className="mt-4 text-center text-[10px] tracking-wide text-[#B7C9B6]">
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

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#82977D]">
                  Explore and learn
                </p>

                <h2 className="home-heading mt-4 text-4xl leading-tight text-[#304737] sm:text-5xl md:text-6xl">
                  Understanding is a good place to start.
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#718078]">
                  Explore approachable information about common
                  mental-health experiences and discover helpful
                  practices.
                </p>

              </div>

              <Link
                to="/wellness"
                className="home-link whitespace-nowrap text-sm font-semibold text-[#66806B] underline decoration-[#B9C9B5] underline-offset-4"
              >
                View all topics
              </Link>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/wellness?topic=${encodeURIComponent(topic.slug)}`}
                  className="group rounded-3xl border border-[#E5E7DF] bg-white p-6 transition-colors hover:border-[#B8C9B5] hover:bg-[#FCFCF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D]"
                >

                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${topic.tone}`}>
                    {topic.icon}
                  </div>

                  <h3 className="home-heading mt-6 text-2xl text-[#304737]">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#718078]">
                    {topic.description}
                  </p>

                  <span className="mt-5 inline-block text-xs font-semibold text-[#66806B] underline decoration-[#B9C9B5] underline-offset-4">
                    Read more
                  </span>

                </Link>
              ))}

            </div>

            <p className="mt-7 text-xs leading-6 text-[#8A968D]">
              Educational information only. MindEase does not diagnose
              or treat mental-health conditions.
            </p>

          </div>
        </section>


        {/* ================= HELP SOMEONE ================= */}
        <section className="border-y border-[#E7E7DC] bg-[#F0F1E9] px-5 py-16 sm:px-8 md:py-20">

          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto]">

            <div className="max-w-2xl">

              <div className="flex items-center gap-3">
                <span className="text-3xl">🤝</span>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#82977D]">
                  Care goes both ways
                </p>
              </div>

              <h2 className="home-heading mt-5 text-4xl leading-tight text-[#304737] sm:text-5xl">
                Sometimes, being there for someone makes all the difference.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#718078]">
                Learn how to recognise when someone might be
                struggling, start a supportive conversation and
                encourage them to find help when they need it.
              </p>

            </div>

            <Link
              to="/help-someone"
              className="inline-flex items-center justify-center rounded-full border border-[#B9C9B5] px-7 py-4 text-sm font-semibold text-[#52745D] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D]"
            >
              How to support someone
            </Link>

          </div>
        </section>


        {/* ================= SAFETY STRIP ================= */}
        <section className="px-5 pb-8 pt-12 sm:px-8">

          <div className="mx-auto max-w-6xl rounded-3xl border border-[#DCE4DA] bg-[#E9EFE6] p-6 sm:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="max-w-xl">

                <h2 className="home-heading text-3xl text-[#304737] sm:text-4xl">
                  Support is available.
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#60766E]">
                  If you or someone you know needs mental-health
                  support in India, you don't have to navigate
                  the difficult moments alone.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <a
                  href="tel:14416"
                  className="min-w-[130px] rounded-2xl border border-[#D6E0D3] bg-white px-5 py-4 transition hover:bg-[#FAFCF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D]"
                >
                  <span className="block text-xs text-[#718078]">
                    Tele-MANAS
                  </span>

                  <span className="mt-1 block text-2xl font-semibold text-[#304737]">
                    14416
                  </span>
                </a>

                <a
                  href="tel:112"
                  className="min-w-[130px] rounded-2xl border border-[#D6E0D3] bg-white px-5 py-4 transition hover:bg-[#FAFCF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D]"
                >
                  <span className="block text-xs text-[#718078]">
                    Emergency
                  </span>

                  <span className="mt-1 block text-2xl font-semibold text-[#304737]">
                    112
                  </span>
                </a>

              </div>

            </div>

            <p className="mt-5 border-t border-[#D6E0D3] pt-4 text-xs leading-6 text-[#718078]">
              Tele-MANAS offers free, 24/7 mental-health support
              in multiple Indian languages. Call 112 for emergencies.
            </p>

          </div>
        </section>


        {/* ================= FINAL CTA ================= */}
        <section className="px-5 py-20 sm:px-8 md:py-28">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-3xl">🌷</span>

            <h2 className="home-heading mt-6 text-5xl leading-[1.02] text-[#304737] sm:text-6xl md:text-7xl">
              Start where
              <br />
              you are.
            </h2>

            <p className="mx-auto mt-7 max-w-lg text-sm leading-8 text-[#718078]">
              You don't need to change everything at once.
              Give yourself a little time and take the next
              step whenever you're ready.
            </p>

            <Link
              to="/register"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-[#3F604B] px-9 py-4 text-sm font-semibold text-white transition hover:bg-[#304D3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52745D] focus-visible:ring-offset-2"
            >
              Begin your journey
            </Link>

          </div>
        </section>

      </div>
    </div>
  );
}
