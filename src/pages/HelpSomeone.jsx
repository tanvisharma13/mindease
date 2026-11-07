import { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Start with a conversation",
    icon: "💬",
    content: [
      "Choose a private, reasonably calm moment.",
      "Tell them what you've noticed without making assumptions.",
      "Ask open questions such as 'How have things been for you lately?'",
      "Listen more than you speak.",
      "Let them decide how much they want to share.",
    ],
  },
  {
    title: "What you can say",
    icon: "🤍",
    content: [
      "I'm here if you want to talk.",
      "You don't have to go through this alone.",
      "That sounds really difficult.",
      "Thank you for telling me.",
      "What would feel helpful right now?",
      "Would you like me to stay with you while we figure out what to do next?",
    ],
  },
  {
    title: "What to avoid saying",
    icon: "🌱",
    content: [
      "Just cheer up.",
      "Other people have it worse.",
      "You have nothing to be upset about.",
      "Everything happens for a reason.",
      "You need to get over it.",
      "Making the conversation about your own experience before they've had space to speak.",
    ],
  },
  {
    title: "Help them find support",
    icon: "🧭",
    content: [
      "Offer to help them find a qualified professional.",
      "If they want, help them make an appointment or find a service.",
      "Offer practical support such as going with them.",
      "Respect that asking for help can feel difficult.",
      "Continue checking in rather than expecting one conversation to fix everything.",
    ],
  },
  {
    title: "If they don't want to talk",
    icon: "🌿",
    content: [
      "Don't force the conversation.",
      "Let them know you're available when they're ready.",
      "Continue treating them normally and kindly.",
      "Check in again later.",
      "Remember that you cannot make someone seek help before they're ready, except when there is an immediate safety concern.",
    ],
  },
];

function HelpSomeone() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        {/* Header */}
        <section className="max-w-3xl mb-12">
          <p className="text-sm font-medium text-[#52745D] mb-3">
            Supporting someone
          </p>

          <h1 className="text-4xl md:text-6xl font-serif text-[#263D31] leading-tight">
            Helping someone you care about.
          </h1>

          <p className="mt-5 text-[#718078] text-base md:text-lg leading-8">
            You don't need to have all the answers. Sometimes listening,
            staying present, and helping someone find support can make a real
            difference.
          </p>
        </section>

        {/* Intro */}
        <section className="bg-[#DDE8DC] rounded-3xl p-7 md:p-9 mb-8">
          <p className="text-sm font-medium text-[#52705A]">
            A good place to start
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-[#294332] mt-2">
            Be curious, not corrective.
          </h2>

          <p className="text-sm md:text-base leading-7 text-[#53685A] mt-4 max-w-3xl">
            You don't need to diagnose their experience or immediately solve
            the problem. Give them room to speak, listen without judgment, and
            ask what kind of support they would actually find useful.
          </p>
        </section>

        {/* Conversation guide */}
        <section className="bg-white border border-[#DCE3D9] rounded-3xl overflow-hidden">
          {sections.map((section, index) => {
            const isOpen = openSection === index;

            return (
              <div
                key={section.title}
                className="border-b border-[#E4E9E3] last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(isOpen ? -1 : index)
                  }
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left hover:bg-[#FAFBF8] transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-full bg-[#EAF0E8] flex items-center justify-center text-xl">
                      {section.icon}
                    </span>

                    <div>
                      <p className="text-xs text-[#7A887E]">
                        0{index + 1}
                      </p>

                      <h2 className="text-lg md:text-xl font-serif text-[#304737]">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xl text-[#52745D]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-7 pl-[4.5rem] md:pl-[5.5rem]">
                    <ul className="space-y-3">
                      {section.content.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-[#5C6960]"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6C8A72] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Warning signs */}
        <section className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-[#DCE3D9] rounded-3xl p-6 md:p-7">
            <p className="text-sm font-medium text-[#52745D]">
              Pay attention
            </p>

            <h2 className="text-2xl font-serif text-[#304737] mt-2">
              Changes worth noticing
            </h2>

            <ul className="mt-5 space-y-3">
              {[
                "A major change in behavior or routine",
                "Withdrawing from friends or activities",
                "Persistent sadness, fear, anger, or hopelessness",
                "Difficulty functioning at school, work, or home",
                "Talking about feeling like a burden or not wanting to be here",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-[#5C6960]"
                >
                  <span className="text-[#6C8A72]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#304737] rounded-3xl p-6 md:p-7 text-white">
            <p className="text-sm font-medium text-[#BFD1C0]">
              Take care of yourself too
            </p>

            <h2 className="text-2xl font-serif mt-2">
              You don't have to carry this alone.
            </h2>

            <p className="text-sm leading-7 text-[#D0DDD1] mt-4">
              Supporting someone can be emotionally demanding. Keep your own
              boundaries, speak with someone you trust, and remember that being
              supportive does not mean becoming their only source of care.
            </p>

            <Link
              to="/wellness"
              className="inline-block mt-5 text-sm font-medium text-[#D8E7D8] hover:underline"
            >
              Explore the mental health library →
            </Link>
          </div>
        </section>

        {/* Safety */}
        <section className="mt-8 rounded-3xl border border-[#E4D9D0] bg-[#FAF5F0] p-6 md:p-8">
          <h2 className="text-2xl font-serif text-[#514840]">
            If you are worried about immediate safety
          </h2>

          <p className="text-sm leading-7 text-[#665A53] mt-3">
            If someone says they may hurt themselves or someone else, or you
            believe there is an immediate danger, take it seriously. Stay with
            them if it is safe to do so and contact local emergency services
            or an appropriate crisis service. Do not promise to keep an
            immediate safety risk secret.
          </p>
        </section>
      </main>
    </div>
  );
}

export default HelpSomeone;