
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Shared breathing phase definitions.
// The timer and animation both use these same definitions.
const BREATHING_PHASES = [
  {
    name: "Breathe in",
    duration: 4,
    instruction: "Gently breathe in through your nose.",
    motion: "grow",
  },
  {
    name: "Hold",
    duration: 7,
    instruction: "Hold your breath gently, without straining.",
    motion: "stay-large",
  },
  {
    name: "Breathe out",
    duration: 8,
    instruction: "Slowly and comfortably breathe out.",
    motion: "shrink",
  },
];

const BOX_BREATHING_PHASES = [
  {
    name: "Breathe in",
    duration: 4,
    instruction: "Gently breathe in through your nose.",
    motion: "grow",
  },
  {
    name: "Hold",
    duration: 4,
    instruction: "Hold comfortably, without straining.",
    motion: "stay-large",
  },
  {
    name: "Breathe out",
    duration: 4,
    instruction: "Gently breathe out.",
    motion: "shrink",
  },
  {
    name: "Pause",
    duration: 4,
    instruction: "Rest gently before the next breath.",
    motion: "stay-small",
  },
];

const getBreathingPhases = (type) =>
  type === "box" ? BOX_BREATHING_PHASES : BREATHING_PHASES;

const resources = [
  {
    id: "grounding",
    category: "Grounding",
    icon: "🌿",
    time: "5 min",
    title: "5-4-3-2-1 Grounding",
    description: "Bring your attention back to the present using your five senses.",
    badge: "Start here",
    need: ["anxious", "overwhelmed"],
    steps: [
      "Notice 5 things you can see around you.",
      "Notice 4 things you can physically touch.",
      "Notice 3 things you can hear.",
      "Notice 2 things you can smell.",
      "Notice 1 thing you can taste.",
    ],
  },
  {
    id: "breathing",
    category: "Breathing",
    icon: "🌬️",
    time: "About 1 min 20 sec",
    title: "4-7-8 Breathing",
    description: "A gentle breathing practice for slowing down and creating a little space.",
    need: ["anxious", "overwhelmed"],
    type: "breathing",
    steps: [
      "Breathe in gently for 4 seconds.",
      "Hold for 7 seconds.",
      "Slowly breathe out for 8 seconds.",
    ],
  },
  {
    id: "box",
    category: "Breathing",
    icon: "🫁",
    time: "2 min",
    title: "Box Breathing",
    description: "A simple breathing rhythm with four equal parts.",
    need: ["anxious", "focus"],
    type: "box",
    steps: [
      "Breathe in gently for 4 seconds.",
      "Hold comfortably for 4 seconds.",
      "Breathe out gently for 4 seconds.",
      "Pause for 4 seconds before the next breath.",
    ],
  },
  {
    id: "body-scan",
    category: "Mindfulness",
    icon: "🧘",
    time: "8 min",
    title: "Body Scan",
    description: "Reconnect with your body by noticing sensations without judging them.",
    need: ["overwhelmed", "sleep"],
    caution: "If this makes you feel worse, stop and try grounding instead.",
    steps: [
      "Find a comfortable position.",
      "Notice your natural breathing.",
      "Bring your attention to your head and face.",
      "Slowly move your attention to your shoulders, arms and hands.",
      "Notice sensations around your chest and stomach.",
      "Move your attention towards your legs and feet.",
      "Take a moment to notice your whole body. There is nothing you need to change.",
    ],
  },
  {
    id: "three-things",
    category: "Reflection",
    icon: "✨",
    time: "5 min",
    title: "Three Good Things",
    description: "Notice small moments that mattered to you today.",
    need: ["overwhelmed"],
    type: "reflection",
    steps: [
      "Think of one thing that went reasonably well today.",
      "What is another small thing you appreciated?",
      "Think of one more moment that brought you comfort or happiness.",
      "Why did these moments matter to you?",
    ],
  },
  {
    id: "quiet-reset",
    category: "Relaxation",
    icon: "🌙",
    time: "5 min",
    title: "Quiet Reset",
    description: "Create a little distance between a stressful moment and your next step.",
    need: ["overwhelmed", "focus"],
    steps: [
      "Put your phone somewhere away from you, if possible.",
      "Take five comfortable, unforced breaths.",
      "Relax your shoulders and jaw.",
      "Notice the space around you.",
      "Ask yourself: What is one small thing I need right now?",
    ],
  },
  {
    id: "thought-check",
    category: "Reflection",
    icon: "💭",
    time: "5 min",
    title: "Thought Check-In",
    description: "Observe a difficult thought without immediately acting on it.",
    need: ["anxious", "overwhelmed"],
    type: "reflection",
    steps: [
      "What thought has been taking up space in your mind?",
      "What emotion does this thought bring up?",
      "Ask yourself: Is this thought a fact, or an interpretation?",
      "What is another way you could look at this situation?",
    ],
  },
  {
    id: "sleep",
    category: "Relaxation",
    icon: "🌙",
    time: "5 min",
    title: "Sleep Wind-Down",
    description: "A gentle routine to help you slow down before bedtime.",
    need: ["sleep"],
    steps: [
      "Dim the lights and make your surroundings comfortable.",
      "Put away screens for a little while, if possible.",
      "Relax your shoulders, jaw and hands.",
      "Take a few slow, comfortable breaths.",
      "Think of one thing you can leave for tomorrow.",
      "Allow yourself to rest without needing to solve everything tonight.",
    ],
  },
  {
    id: "muscle",
    category: "Relaxation",
    icon: "🧘",
    time: "5 min",
    title: "Progressive Muscle Relaxation",
    description: "Notice and release tension in different parts of your body.",
    need: ["sleep", "overwhelmed"],
    caution: "Skip any area that's painful or injured, and don't tense hard.",
    steps: [
      "Find a comfortable seated or lying position.",
      "Gently tense your hands for a few seconds, then release.",
      "Gently tense your shoulders, then let them relax.",
      "Notice your face and jaw. Soften any tension.",
      "Gently tense your feet, then release.",
      "Notice the difference between tension and relaxation.",
    ],
  },
  {
    id: "emotion",
    category: "Reflection",
    icon: "💚",
    time: "3 min",
    title: "Name the Feeling",
    description: "Give your emotions a name and make space to understand them.",
    need: ["anxious", "overwhelmed", "focus"],
    type: "reflection",
    steps: [
      "Pause and notice what you are feeling right now.",
      "Can you give this feeling a name?",
      "Where do you notice this feeling in your body?",
      "What might this feeling be trying to tell you?",
      "What is one kind thing you can do for yourself?",
    ],
  },
  {
    id: "movement",
    category: "Mindfulness",
    icon: "🌱",
    time: "2 min",
    title: "Gentle Movement",
    description: "Take a short movement break and reconnect with your body.",
    need: ["focus", "overwhelmed"],
    caution: "Stop if anything hurts.",
    steps: [
      "Stand or sit comfortably, whichever feels right.",
      "Gently roll your shoulders backwards a few times.",
      "Slowly turn your head from side to side without forcing it.",
      "Stretch your arms gently if comfortable.",
      "Take a moment to notice how your body feels.",
    ],
  },
];

const categories = [
  "All",
  "Breathing",
  "Grounding",
  "Mindfulness",
  "Reflection",
  "Relaxation",
];

const quickPicks = [
  { id: "sleep", label: "I can't sleep", icon: "🌙" },
  { id: "anxious", label: "I'm anxious right now", icon: "💚" },
  { id: "overwhelmed", label: "I'm overwhelmed", icon: "🌿" },
  { id: "focus", label: "I can't focus", icon: "✨" },
];

const getInitialBreathingState = () => ({
  phaseIndex: 0,
  secondsLeft: 4,
  cycle: 1,
  totalCycles: 4,
});

function Resources() {
  const [category, setCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState(null);
  const [quickPick, setQuickPick] = useState(null);

  const [sessionStarted, setSessionStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [breathing, setBreathing] = useState(getInitialBreathingState);
  const [breathingActive, setBreathingActive] = useState(false);

  const isBreathing =
    selectedResource &&
    ["breathing", "box"].includes(selectedResource.type);

  // Get the one shared phase list for both the timer and animation.
  const currentBreathingPhases = isBreathing
    ? getBreathingPhases(selectedResource.type)
    : [];

  const currentPhase = isBreathing
    ? currentBreathingPhases[breathing.phaseIndex]
    : null;

  // Breathing timer.
  // The timer advances using the same phase definitions as the animation.
  useEffect(() => {
    if (
      !breathingActive ||
      !selectedResource ||
      !["breathing", "box"].includes(selectedResource.type)
    ) {
      return;
    }

    const phases = getBreathingPhases(selectedResource.type);

    const timer = setTimeout(() => {
      if (breathing.secondsLeft > 1) {
        setBreathing((previous) => ({
          ...previous,
          secondsLeft: previous.secondsLeft - 1,
        }));
        return;
      }

      const nextPhaseIndex = breathing.phaseIndex + 1;

      if (nextPhaseIndex >= phases.length) {
        if (breathing.cycle >= breathing.totalCycles) {
          setBreathingActive(false);
          setCompleted(true);
          return;
        }

        setBreathing((previous) => ({
          ...previous,
          phaseIndex: 0,
          secondsLeft: phases[0].duration,
          cycle: previous.cycle + 1,
        }));

        return;
      }

      setBreathing((previous) => ({
        ...previous,
        phaseIndex: nextPhaseIndex,
        secondsLeft: phases[nextPhaseIndex].duration,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [breathingActive, breathing, selectedResource]);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      category === "All" || resource.category === category;

    const matchesNeed =
      !quickPick || resource.need.includes(quickPick);

    return matchesCategory && matchesNeed;
  });

  const openResource = (resource) => {
    setSelectedResource(resource);
    setSessionStarted(false);
    setCompleted(false);
    setStepIndex(0);
    setBreathing(getInitialBreathingState());
    setBreathingActive(false);
  };

  const closeResource = () => {
    setSelectedResource(null);
    setSessionStarted(false);
    setCompleted(false);
    setBreathingActive(false);
  };

  const startExercise = () => {
    setSessionStarted(true);
    setCompleted(false);
    setStepIndex(0);
    setBreathing(getInitialBreathingState());

    if (
      selectedResource &&
      ["breathing", "box"].includes(selectedResource.type)
    ) {
      setBreathingActive(true);
    }
  };

  const nextStep = () => {
    if (!selectedResource) return;

    if (stepIndex < selectedResource.steps.length - 1) {
      setStepIndex((previous) => previous + 1);
    } else {
      setCompleted(true);
    }
  };

  const previousStep = () => {
    if (stepIndex > 0) {
      setStepIndex((previous) => previous - 1);
    }
  };

  const handleQuickPick = (need) => {
    setQuickPick((previous) => (previous === need ? null : need));
    setCategory("All");
  };

  const chooseAnother = () => {
    closeResource();
    setCategory("All");
    setQuickPick(null);
  };

  const progress = selectedResource
    ? isBreathing
      ? ((breathing.cycle - 1) / breathing.totalCycles) * 100
      : ((stepIndex + 1) / selectedResource.steps.length) * 100
    : 0;

  // Static circle sizes for the hold and pause phases.
  const getStaticCircleClass = () => {
    if (currentPhase?.motion === "stay-large") {
      return "scale-110";
    }

    if (currentPhase?.motion === "stay-small") {
      return "scale-75";
    }

    return "";
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] px-5 py-12 text-[#263D31] sm:px-8">
      <main className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium text-[#52745D]">
            Take a moment for yourself
          </p>

          <h1 className="font-serif text-4xl font-normal md:text-6xl">
            Wellness resources
          </h1>

          <p className="mt-4 text-base leading-8 text-[#718078] md:text-lg">
            You don't have to figure everything out at once.
            Explore gentle exercises to help you pause, breathe,
            reflect and reconnect with yourself.
          </p>
        </section>

        {/* Quick Picks */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl text-[#304737]">
            What do you need right now?
          </h2>

          <p className="mt-2 text-sm text-[#718078]">
            Choose what feels closest to how you're feeling.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {quickPicks.map((pick) => {
              const active = quickPick === pick.id;

              return (
                <button
                  key={pick.id}
                  type="button"
                  onClick={() => handleQuickPick(pick.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-3 text-sm transition ${
                    active
                      ? "border-[#3F604B] bg-[#3F604B] text-white"
                      : "border-[#DCE3D9] bg-white text-[#3F604B] hover:border-[#779783]"
                  }`}
                >
                  <span className="mr-2">{pick.icon}</span>
                  {pick.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="mb-4 font-serif text-xl text-[#304737]">
            Explore by category
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  category === item
                    ? "border-[#3F604B] bg-[#3F604B] text-white"
                    : "border-[#DCE3D9] bg-white text-[#60766e] hover:border-[#3F604B]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Resource Cards */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[#304737]">
              {quickPick
                ? "Suggested for you"
                : category === "All"
                  ? "Explore exercises"
                  : category}
            </h2>

            <span className="text-sm text-[#8A968D]">
              {filteredResources.length} exercises
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <article
                  key={resource.id}
                  className="flex min-h-[310px] flex-col rounded-3xl border border-[#DCE3D9] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-2xl">
                      {resource.icon}
                    </div>

                    <span className="rounded-full bg-[#F3F6F0] px-3 py-1.5 text-xs text-[#52745D]">
                      {resource.time}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#52745D]">
                      {resource.category}
                    </p>

                    {resource.badge && (
                      <span className="rounded-full bg-[#DDE8DC] px-3 py-1 text-xs font-medium text-[#365342]">
                        {resource.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-serif text-2xl text-[#304737]">
                    {resource.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#718078]">
                    {resource.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => openResource(resource)}
                    className="mt-6 w-full rounded-full bg-[#3F604B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#314C3B]"
                  >
                    {resource.type === "breathing" || resource.type === "box"
                      ? "Start breathing"
                      : resource.type === "reflection"
                        ? "Start reflecting"
                        : "Start exercise"}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#DCE3D9] bg-white p-10 text-center">
              <p className="text-3xl">🌿</p>

              <h3 className="mt-4 font-serif text-xl text-[#304737]">
                No exercises found
              </h3>

              <p className="mt-2 text-sm text-[#718078]">
                Try another category or choose a different feeling.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuickPick(null);
                  setCategory("All");
                }}
                className="mt-5 text-sm font-semibold text-[#52745D]"
              >
                Show all exercises
              </button>
            </div>
          )}
        </section>

        {/* Gentle Reminder */}
        <section className="mt-12 rounded-3xl bg-[#DDE8DC] p-7 md:p-8">
          <p className="text-sm font-medium text-[#52705A]">
            A gentle reminder
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#294332]">
            Go at your own pace.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#53685A]">
            You don't have to complete every exercise or follow every
            step perfectly. Pause whenever you need to. Choose what
            feels comfortable for you.
          </p>
        </section>
      </main>

      {/* Guided Exercise Modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#18231f]/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeResource();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exercise-title"
            className="relative my-auto w-full max-w-xl rounded-3xl bg-[#F7F4EC] p-6 shadow-2xl sm:p-9"
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeResource}
              aria-label="Close exercise"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EDE2] text-2xl text-[#365342] hover:bg-[#DDE8DC]"
            >
              ×
            </button>

            {/* Exercise Introduction */}
            {!sessionStarted && !completed && (
              <>
                <p className="text-sm font-medium text-[#52745D]">
                  {selectedResource.category} · {selectedResource.time}
                </p>

                <div className="mt-6 text-4xl">
                  {selectedResource.icon}
                </div>

                <h2
                  id="exercise-title"
                  className="mt-4 font-serif text-3xl text-[#304737]"
                >
                  {selectedResource.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#718078]">
                  {selectedResource.description}
                </p>

                <div className="mt-7 rounded-2xl bg-[#EAF0E8] p-5">
                  <p className="text-sm font-medium text-[#365342]">
                    Before you begin
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#60766e]">
                    Find a comfortable position and move through this
                    exercise at your own pace. You can stop whenever
                    you want.
                  </p>

                  {selectedResource.caution && (
                    <p className="mt-3 border-t border-[#D2DFD0] pt-3 text-sm leading-6 text-[#765F4D]">
                      {selectedResource.caution}
                    </p>
                  )}
                </div>

                {(selectedResource.type === "breathing" ||
                  selectedResource.type === "box") && (
                  <p className="mt-4 text-xs leading-6 text-[#8A796E]">
                    This exercise has four short cycles. Do not force
                    your breath or hold it if uncomfortable. Return
                    to natural breathing if you feel dizzy or uneasy.
                  </p>
                )}

                <button
                  type="button"
                  onClick={startExercise}
                  className="mt-7 w-full rounded-full bg-[#3F604B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#314C3B]"
                >
                  Begin exercise
                </button>
              </>
            )}

            {/* Guided Breathing */}
            {sessionStarted && isBreathing && !completed && (
              <>
                <p className="text-sm font-medium text-[#52745D]">
                  Guided breathing
                </p>

                <h2
                  id="exercise-title"
                  className="mt-3 font-serif text-3xl text-[#304737]"
                >
                  {selectedResource.title}
                </h2>

                <div className="mt-6 flex items-center justify-between text-sm text-[#718078]">
                  <span>
                    Cycle {breathing.cycle} of {breathing.totalCycles}
                  </span>

                  <span>
                    {breathing.phaseIndex + 1} of {currentBreathingPhases.length} phases
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E1E9DF]">
                  <div
                    className="h-full rounded-full bg-[#779783] transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="flex min-h-[300px] flex-col items-center justify-center py-8 text-center">
                  <div
                    key={`${selectedResource.id}-${breathing.cycle}-${breathing.phaseIndex}`}
                    className={`breathing-circle flex h-44 w-44 items-center justify-center rounded-full bg-[#DDE8DC] text-center ${getStaticCircleClass()}`}
                    style={
                      currentPhase.motion === "grow"
                        ? {
                            animation: `breathe-grow ${currentPhase.duration}s linear both`,
                          }
                        : currentPhase.motion === "shrink"
                          ? {
                              animation: `breathe-shrink ${currentPhase.duration}s linear both`,
                            }
                          : undefined
                    }
                  >
                    <div>
                      <p className="font-serif text-2xl text-[#365342]">
                        {currentPhase.name}
                      </p>

                      <p className="mt-2 text-4xl font-semibold tabular-nums text-[#52745D]">
                        {breathing.secondsLeft}
                      </p>
                    </div>
                  </div>

                  <p className="mt-7 text-sm text-[#718078]">
                    {currentPhase.instruction}
                  </p>

                  <p className="mt-3 text-xs text-[#8A968D]">
                    Follow the timing only if it feels comfortable.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBreathingActive(false);
                    setCompleted(true);
                  }}
                  className="w-full rounded-full border border-[#A7B9A8] px-6 py-3 text-sm font-medium text-[#52745D] hover:bg-[#EAF0E8]"
                >
                  Stop exercise
                </button>
              </>
            )}

            {/* Guided Step-by-Step Exercise */}
            {sessionStarted && !isBreathing && !completed && (
              <>
                <p className="text-sm font-medium text-[#52745D]">
                  Step {stepIndex + 1} of {selectedResource.steps.length}
                </p>

                <h2
                  id="exercise-title"
                  className="mt-3 font-serif text-3xl text-[#304737]"
                >
                  {selectedResource.title}
                </h2>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#E1E9DF]">
                  <div
                    className="h-full rounded-full bg-[#779783] transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="flex min-h-[240px] flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DDE8DC] text-xl font-semibold text-[#365342]">
                    {stepIndex + 1}
                  </div>

                  <p className="mt-7 max-w-md font-serif text-2xl leading-relaxed text-[#304737]">
                    {selectedResource.steps[stepIndex]}
                  </p>

                  <p className="mt-4 text-sm text-[#8A968D]">
                    Take your time. There is no rush.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={stepIndex === 0}
                    className="flex-1 rounded-full border border-[#A7B9A8] px-5 py-3 text-sm font-medium text-[#52745D] transition hover:bg-[#EAF0E8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 rounded-full bg-[#3F604B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#314C3B]"
                  >
                    {stepIndex === selectedResource.steps.length - 1
                      ? "Finish exercise"
                      : "Next step"}
                  </button>
                </div>
              </>
            )}

            {/* Completion Screen */}
            {completed && (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DDE8DC] text-3xl">
                  🌿
                </div>

                <p className="mt-6 text-sm font-medium text-[#52745D]">
                  A moment for yourself
                </p>

                <h2
                  id="exercise-title"
                  className="mt-3 font-serif text-3xl text-[#304737]"
                >
                  Nice work taking a pause.
                </h2>

                <p className="mt-4 leading-7 text-[#718078]">
                  You made some time for yourself. How are you feeling now?
                  There's no right or wrong answer.
                </p>

                <Link
                  to="/mood"
                  onClick={closeResource}
                  className="mt-7 block w-full rounded-full bg-[#3F604B] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#314C3B]"
                >
                  Check in with your mood
                </Link>

                {selectedResource.type === "reflection" && (
                  <Link
                    to="/journal"
                    onClick={closeResource}
                    className="mt-3 block w-full rounded-full border border-[#A7B9A8] px-6 py-3 text-center text-sm font-medium text-[#52745D] hover:bg-[#EAF0E8]"
                  >
                    Continue reflecting in your journal
                  </Link>
                )}

                <button
                  type="button"
                  onClick={chooseAnother}
                  className="mt-3 w-full rounded-full border border-[#A7B9A8] px-6 py-3 text-sm font-medium text-[#52745D] hover:bg-[#EAF0E8]"
                >
                  Try another exercise
                </button>

                <button
                  type="button"
                  onClick={closeResource}
                  className="mt-4 w-full text-sm text-[#718078] hover:text-[#304737]"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Breathing animation and reduced-motion support */}
      <style>{`
        @keyframes breathe-grow {
          from {
            transform: scale(0.75);
          }
          to {
            transform: scale(1.1);
          }
        }

        @keyframes breathe-shrink {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(0.75);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .breathing-circle {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Resources;
