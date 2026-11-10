
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
      "Avoid judging, blaming, or comparing their experience with someone else's.",
      "Avoid making the conversation about your own experience before they've had space to speak.",
    ],
  },
  {
    title: "How to ask about suicide",
    icon: "🫶",
    content: [
      "If you are worried about someone's safety, ask clearly and calmly: 'Are you thinking about suicide?'",
      "You can also ask: 'Have you been thinking about hurting yourself?'",
      "Listen to their answer without judgment or panic.",
      "Give them time to respond. Don't rush to change the subject.",
      "Asking directly about suicide does not put the idea into someone's head.",
      "If they say yes, take it seriously and help them connect with professional support.",
      "If they describe immediate danger or a plan to act, seek emergency help.",
    ],
  },
  {
    title: "Help them find support",
    icon: "🧭",
    content: [
      "Offer to help them find a qualified mental health professional.",
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
  {
    title: "If they ask you to keep it a secret",
    icon: "🤝",
    content: [
      "Listen with care, but don't promise to keep a safety risk secret.",
      "You can say: 'I care about you too much to keep this just between us if you're in danger.'",
      "Explain that you want to involve someone who can help keep them safe.",
      "Where possible, involve them in deciding which trusted person or professional to contact.",
      "If there is immediate danger, get help even if they ask you not to tell anyone.",
      "Share information only with people who need to know to help keep them safe.",
    ],
  },
];

const warningSigns = [
  "A major change in behavior or routine",
  "Withdrawing from friends or activities",
  "Persistent sadness, fear, anger, or hopelessness",
  "Difficulty functioning at school, work, or home",
];

const selfCareTips = [
  "Keep healthy personal boundaries.",
  "Speak with someone you trust about your own feelings.",
  "Remember that you cannot solve everything for someone else.",
  "Encourage professional support rather than becoming their only source of care.",
];

function HelpSomeone() {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="min-h-screen page">
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12">

        {/* 1. Header */}
        <section className="max-w-3xl mb-10">
          <p className="text-sm font-medium text-brand mb-3">
            Supporting someone
          </p>

          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-tight">
            Helping someone you care about.
          </h1>

          <p className="mt-5 text-muted text-base md:text-lg leading-8">
            You don't need to have all the answers. Sometimes listening,
            staying present, and helping someone find support can make a real
            difference.
          </p>
        </section>

        {/* Introduction */}
        <section className="tile-brand rounded-3xl p-7 md:p-9 mb-8">
          <p className="text-sm font-medium text-brand">
            A good place to start
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-ink mt-2">
            Be curious, not corrective.
          </h2>

          <p className="text-sm md:text-base leading-7 text-muted mt-4 max-w-3xl">
            You don't need to diagnose their experience or immediately solve
            the problem. Give them room to speak, listen without judgment, and
            ask what kind of support they would actually find useful.
          </p>
        </section>

        {/* 2. What to Notice + Serious Warning */}
        <section className="surface-card border border-line rounded-3xl p-6 md:p-8 mb-8">

          <p className="text-sm font-medium text-brand">
            Pay attention
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-ink mt-2">
            Changes worth noticing
          </h2>

          <p className="text-sm text-muted mt-2 leading-6">
            Changes in someone's behavior can be reasons to check in.
            They do not, by themselves, establish a mental health condition.
          </p>

          <ul className="mt-5 space-y-3">
            {warningSigns.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-muted"
              >
                <span className="text-brand-mid">•</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Highlighted Serious Warning */}
          <div className="mt-7 rounded-2xl strip-warm p-5 md:p-6">

            <div className="flex items-start gap-3">
              <span className="text-2xl">❤️</span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Please take this seriously
                </p>

                <h3 className="text-xl md:text-2xl font-serif text-ink mt-2">
                  When someone says they are a burden or don't want to be here
                </h3>

                <p className="text-sm leading-7 text-muted mt-3">
                  Statements such as "Everyone would be better off without me"
                  or "I don't want to be here anymore" should never be
                  dismissed or taken lightly.
                </p>

                <p className="text-sm leading-7 text-muted mt-2">
                  Listen without judgment, ask directly whether they are
                  thinking about suicide, and help them connect with support.
                </p>

                <a
                  href="#immediate-safety"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-brand-dark hover:underline"
                >
                  Read what to do in this situation ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How to Talk - Accordion */}
        <section className="mb-8">

          <div className="mb-5">
            <p className="text-sm font-medium text-brand">
              Practical guidance
            </p>

            <h2 className="text-2xl md:text-3xl font-serif text-ink mt-2">
              How to talk to them
            </h2>

            <p className="text-sm text-muted mt-2">
              Explore these tips whenever you need a little guidance.
            </p>
          </div>

          <div className="surface-card border border-line rounded-3xl overflow-hidden">
            {sections.map((section, index) => {
              const isOpen = openSection === index;
              const panelId = `help-section-${index}`;

              return (
                <div
                  key={section.title}
                  className="border-b border-line last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenSection(isOpen ? -1 : index)
                    }
                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left hover-cream transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-11 h-11 rounded-full tile-brand flex items-center justify-center text-xl shrink-0">
                        {section.icon}
                      </span>

                      <div>
                        <p className="text-xs text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="text-lg md:text-xl font-serif text-ink">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-xl text-brand"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="px-6 md:px-8 pb-7 pl-[4.5rem] md:pl-[5.5rem]"
                  >
                    <ul className="space-y-3">
                      {section.content.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-6 text-muted"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full  shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Checking In */}
        <section className="tile-brand border border-line rounded-3xl p-6 md:p-8 mb-8">

          <p className="text-sm font-medium text-brand">
            Support doesn't end with one conversation
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-ink mt-2">
            Check in again.
          </h2>

          <p className="text-sm text-muted leading-7 mt-3">
            A small message or a simple invitation can remind someone that
            they haven't been forgotten.
          </p>

          <ul className="mt-5 space-y-3">
            {[
              "Send a simple message asking how they are doing.",
              "Ask how they have been feeling since your last conversation.",
              "Invite them for a walk, a meal, or some company.",
              "Offer to accompany them when seeking professional support.",
              "If you remain concerned about their safety, help them connect with appropriate support rather than relying on occasional messages alone.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-muted"
              >
                <span className="text-brand-mid mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Self Care - Four Points */}
        <section className="panel-dark rounded-3xl p-6 md:p-8 mb-8 on-dark-strong">

          <p className="text-sm font-medium on-dark-faint">
            Take care of yourself too
          </p>

          <h2 className="text-2xl md:text-3xl font-serif mt-2">
            You don't have to carry this alone.
          </h2>

          <p className="text-sm leading-7 on-dark mt-3">
            Supporting someone can be emotionally demanding. Your well-being
            matters too.
          </p>

          <ul className="mt-5 space-y-3">
            {selfCareTips.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 on-dark"
              >
                <span className="on-dark-faint">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/wellness"
            className="inline-block mt-5 text-sm font-medium on-dark hover:underline"
          >
            Explore the mental health library →
          </Link>
        </section>

        {/* 6. Immediate Safety */}
        <section
          id="immediate-safety"
          className="rounded-3xl strip-warm p-6 md:p-8 scroll-mt-8"
        >

          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Important safety information
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-ink mt-2">
            If someone may be in immediate danger
          </h2>

          <p className="text-sm leading-7 text-muted mt-4">
            Take every expression of suicidal thoughts seriously. If someone
            has a plan to hurt themselves, has already harmed themselves, or
            may act soon, seek emergency assistance.
          </p>

          {/* Safety Steps */}
          <div className="mt-6">
            <h3 className="font-semibold text-ink">
              What you can do:
            </h3>

            <ul className="mt-4 space-y-4">
              {[
                {
                  title: "Stay with them",
                  description:
                    "If it is safe, stay nearby and do not leave them alone while urgent help is being arranged.",
                },
                {
                  title: "Stay calm and listen",
                  description:
                    "Speak gently, avoid judgment, and let them know you are there to help.",
                },
                {
                  title: "Reduce immediate risks",
                  description:
                    "If it is safe to do so, help move medicines, sharp objects, weapons, or other potentially dangerous items out of reach. Do not put yourself in danger.",
                },
                {
                  title: "Contact professional help",
                  description:
                    "Call emergency services when there is immediate danger. Involve a trusted person and qualified healthcare professional.",
                },
              ].map((step) => (
                <li key={step.title} className="flex gap-3">
                  <span className="text-muted mt-1">•</span>

                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {step.title}
                    </p>

                    <p className="text-sm leading-6 text-muted mt-1">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Helplines */}
          <div className="mt-7 space-y-4">

            {/* Tele-MANAS */}
            <div className="surface-card rounded-2xl p-5 border border-sand">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Mental health support
              </p>

              <h3 className="text-xl font-serif text-ink mt-2">
                Tele-MANAS
              </h3>

              <p className="text-sm text-muted mt-2">
                Free mental health support, available 24 hours a day,
                7 days a week, in many languages across India.
              </p>

              <a
                href="tel:14416"
                className="inline-block text-3xl font-semibold text-brand mt-3 hover:underline"
              >
                14416
              </a>

              <p className="text-xs text-faint mt-1">
                Tap the number to call.
              </p>
            </div>

            {/* Emergency 112 */}
            <div className="strip-warm rounded-2xl p-5 border border-sand">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Immediate emergency
              </p>

              <h3 className="text-xl font-serif text-ink mt-2">
                India Emergency Number
              </h3>

              <p className="text-sm text-muted mt-2">
                Call 112 if someone's life or immediate safety is at risk.
              </p>

              <a
                href="tel:112"
                className="inline-block text-3xl font-semibold text-brand-dark mt-3 hover:underline"
              >
                112
              </a>

              <p className="text-xs text-faint mt-1">
                India's nationwide emergency response number.
              </p>
            </div>
          </div>

          <p className="text-xs leading-6 text-muted mt-6">
            Do not promise to keep an immediate safety risk secret.
            Share necessary information with people who can help protect
            the person. These suggestions are not a substitute for
            professional assessment or emergency care.
          </p>
        </section>

        {/* Closing Note */}
        <section className="text-center py-10">
          <p className="text-lg font-serif text-ink">
            Sometimes, being there is the first step towards helping. 💚
          </p>

          <p className="text-xs text-faint mt-3 max-w-xl mx-auto leading-6">
            These suggestions are educational guidance, not a diagnosis
            or treatment plan. You do not have to handle difficult
            situations alone.
          </p>
        </section>

      </main>
    </div>
  );
}

export default HelpSomeone;
