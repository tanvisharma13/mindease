import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="bg-[#F7F4EC] min-h-screen">

      {/* ==================== WELLNESS BANNER ==================== */}
      <section className="w-full px-4 pt-6 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#304737] px-7 py-10 md:px-14 md:py-12 lg:px-20">

            {/* Decorative background shapes */}
            <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#52745D]/30" />

            <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#6F8D75]/20" />

            <div className="absolute top-8 right-10 text-3xl text-white/20">
              ✦
            </div>

            <div className="absolute bottom-8 left-10 text-2xl text-white/10">
              ✦
            </div>

            {/* Banner Content */}
            <div className="relative z-10 max-w-5xl mx-auto">

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left */}
                <div className="text-center md:text-left">

                  <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                      🌿
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                      ☁️
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                      🌱
                    </span>
                  </div>

                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#BFD1C0]">
                    A little space for you
                  </p>

                  <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                    Your wellbeing deserves
                    <br />
                    <span className="italic text-[#DCE8DB]">
                      your attention.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-[#D0DDD1]">
                    Take a moment to understand what you're experiencing,
                    discover something that may help, or simply slow down
                    for a while.
                  </p>

                </div>

                {/* Right CTA */}
<div className="flex-shrink-0 flex flex-col items-center gap-3">

  <Link to="/wellness">
    <button className="w-full sm:w-auto rounded-full bg-white text-[#304737] px-7 py-3.5 text-sm font-medium shadow-sm hover:bg-[#EAF0E8] hover:-translate-y-0.5 transition whitespace-nowrap">
      Explore Wellness Library
      <span className="ml-2">→</span>
    </button>
  </Link>

  <Link to="/chat">
    <button className="w-full sm:w-auto rounded-full border border-white/30 bg-white/5 text-white px-7 py-3.5 text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition whitespace-nowrap">
      💬 Talk to AI Companion
    </button>
  </Link>

</div>

              </div>

              {/* Bottom line */}
              <div className="mt-8 pt-5 border-t border-white/10 flex justify-center md:justify-start">
                <p className="text-xs text-[#AFC2B2]">
                  ✦ Small steps are still steps.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* ==================== HERO ==================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Hero Text */}
          <div>

            <p className="text-sm font-medium text-[#52745D] mb-3">
              Your space to pause, reflect & grow
            </p>

            <h1
              className="text-4xl md:text-6xl font-serif text-[#263D31]"
              style={{ lineHeight: 1.05 }}
            >
              A calmer space
              <br />
              <span className="italic">for your mind.</span>
            </h1>

            <p className="mt-5 text-[#718078] leading-7 max-w-xl">
              MindEase is an AI-powered companion designed to help you
              reflect, track your mood, understand your mental wellbeing,
              and discover gentle ways to feel a little better.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link to="/register">
                <Button>
                  Get Started
                </Button>
              </Link>

              <Link to="/wellness">
                <Button variant="ghost">
                  Explore Wellness
                </Button>
              </Link>

            </div>

          </div>


          {/* Daily Check-in */}
          <div>

            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-8 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-wider text-[#7A887E]">
                    Daily Check-in
                  </p>

                  <h3 className="text-2xl font-serif text-[#304737] mt-2">
                    How are you feeling today?
                  </h3>

                </div>

                <span className="text-3xl">
                  🌿
                </span>

              </div>


              <p className="text-sm text-[#718078] mt-3">
                There is no right or wrong answer. Just check in with yourself.
              </p>


              <div className="mt-6 grid grid-cols-3 gap-3">

                {/* Good */}
                <Link to="/mood">

                  <button className="w-full rounded-2xl bg-[#F3F6F1] border border-[#DCE3D9] p-4 hover:bg-[#EAF0E8] hover:-translate-y-0.5 transition">

                    <span className="text-2xl block">
                      🙂
                    </span>

                    <span className="text-xs text-[#53675A] mt-2 block">
                      Good
                    </span>

                  </button>

                </Link>


                {/* Low */}
                <Link to="/mood">

                  <button className="w-full rounded-2xl bg-[#F3F6F1] border border-[#DCE3D9] p-4 hover:bg-[#EAF0E8] hover:-translate-y-0.5 transition">

                    <span className="text-2xl block">
                      😔
                    </span>

                    <span className="text-xs text-[#53675A] mt-2 block">
                      Low
                    </span>

                  </button>

                </Link>


                {/* Great */}
                <Link to="/mood">

                  <button className="w-full rounded-2xl bg-[#F3F6F1] border border-[#DCE3D9] p-4 hover:bg-[#EAF0E8] hover:-translate-y-0.5 transition">

                    <span className="text-2xl block">
                      😄
                    </span>

                    <span className="text-xs text-[#53675A] mt-2 block">
                      Great
                    </span>

                  </button>

                </Link>

              </div>


              <Link
                to="/mood"
                className="block mt-5 text-center text-sm font-medium text-[#52745D] hover:underline"
              >
                Open Mood Tracker →
              </Link>

            </div>

          </div>

        </section>


        {/* ==================== HOW IT WORKS ==================== */}
        <section className="mt-16">

          <SectionHeading
            title="How it works"
            subtitle="Three simple steps to make space for yourself"
          />


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Check In */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                🌱
              </div>

              <p className="text-xs text-[#8A968D] mt-5">
                01
              </p>

              <h3 className="text-xl font-serif text-[#304737] mt-1">
                Check in
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Take a moment to notice how you're feeling and build a better
                understanding of your emotional wellbeing.
              </p>

            </div>


            {/* Reflect */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="w-12 h-12 rounded-2xl bg-[#F1EDE2] flex items-center justify-center text-2xl">
                ✍️
              </div>

              <p className="text-xs text-[#8A968D] mt-5">
                02
              </p>

              <h3 className="text-xl font-serif text-[#304737] mt-1">
                Reflect
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Use private journaling and gentle prompts to put your thoughts
                into words and understand yourself better.
              </p>

            </div>


            {/* Practice */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="w-12 h-12 rounded-2xl bg-[#E8EEE9] flex items-center justify-center text-2xl">
                🧘
              </div>

              <p className="text-xs text-[#8A968D] mt-5">
                03
              </p>

              <h3 className="text-xl font-serif text-[#304737] mt-1">
                Practice
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Try breathing exercises, grounding techniques, and small
                practices that can help create a sense of calm.
              </p>

            </div>

          </div>

        </section>


        {/* ==================== WELLNESS LIBRARY ==================== */}
        <section className="mt-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">

            <SectionHeading
              title="Explore your wellbeing"
              subtitle="Learn more about common mental-health experiences and discover things you can try."
            />

            <Link
              to="/wellness"
              className="text-sm font-medium text-[#52745D] hover:underline whitespace-nowrap"
            >
              View full library →
            </Link>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Anxiety */}
            <Link
              to="/wellness"
              className="group bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                🌿
              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Anxiety
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Understand worry, nervousness, racing thoughts, and ways to
                find a little calm.
              </p>

              <span className="inline-block mt-5 text-sm text-[#52745D] group-hover:underline">
                Explore →
              </span>

            </Link>


            {/* Stress */}
            <Link
              to="/wellness"
              className="group bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                🍃
              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Stress
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Learn about feeling overwhelmed and discover simple ways to
                create more breathing room.
              </p>

              <span className="inline-block mt-5 text-sm text-[#52745D] group-hover:underline">
                Explore →
              </span>

            </Link>


            {/* Low Mood */}
            <Link
              to="/wellness"
              className="group bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                🌧️
              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Low Mood
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Explore persistent sadness, low motivation, loss of interest,
                and gentle steps that may help.
              </p>

              <span className="inline-block mt-5 text-sm text-[#52745D] group-hover:underline">
                Explore →
              </span>

            </Link>


            {/* Burnout */}
            <Link
              to="/wellness"
              className="group bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                🕯️
              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Burnout
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Learn about emotional exhaustion, prolonged stress, and
                creating space for recovery.
              </p>

              <span className="inline-block mt-5 text-sm text-[#52745D] group-hover:underline">
                Explore →
              </span>

            </Link>

          </div>

        </section>


        {/* ==================== MOOD TRACKING ==================== */}
        <section className="mt-16">

          <SectionHeading
            title="Mood Tracking"
            subtitle="Observe your patterns and understand yourself over time."
          />


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Daily Mood */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] flex items-center justify-center text-2xl">
                  😊
                </div>

                <span className="text-xs text-[#9AA59D]">
                  Every day
                </span>

              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Daily Mood
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Log how you're feeling in just a few seconds and move on with
                your day.
              </p>

            </div>


            {/* Weekly Summary */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-2xl bg-[#F1EDE2] flex items-center justify-center text-2xl">
                  📊
                </div>

                <span className="text-xs text-[#9AA59D]">
                  Weekly
                </span>

              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Weekly Summary
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Look back at your entries and notice changes or patterns in
                your mood.
              </p>

            </div>


            {/* Insights */}
            <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-sm transition">

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-2xl bg-[#E8EEE9] flex items-center justify-center text-2xl">
                  💡
                </div>

                <span className="text-xs text-[#9AA59D]">
                  Reflect
                </span>

              </div>

              <h3 className="text-xl font-serif text-[#304737] mt-5">
                Insights
              </h3>

              <p className="text-sm leading-6 text-[#718078] mt-2">
                Use your mood and journal entries to reflect on what may be
                affecting your wellbeing.
              </p>

            </div>

          </div>


          <div className="mt-6 text-center">

            <Link
              to="/mood"
              className="text-sm font-medium text-[#52745D] hover:underline"
            >
              Open your Mood Tracker →
            </Link>

          </div>

        </section>


      </main>
    </div>
  );
}