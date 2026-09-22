import SectionHeading from '../components/SectionHeading'
import FeatureCard from '../components/FeatureCard'
import Button from '../components/Button'

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{lineHeight:1.05}}>A calmer space for your mind.</h1>
          <p className="mt-4 text-slate-700">MindEase is an AI-powered companion designed to help you reflect, track mood, and discover gentle exercises to support your wellbeing.</p>
          <div className="mt-6 flex gap-3">
            <Button>Get Started</Button>
            <Button variant="ghost">Learn More</Button>
          </div>
        </div>
        <div className="">
          <div className="glass-card soft-rounded-lg p-8">
            <h4 className="font-semibold">Daily Check-in</h4>
            <p className="text-sm text-slate-600 mt-2">How are you feeling today?</p>
            <div className="mt-4 flex gap-3">
              <Button variant="subtle">🙂 Good</Button>
              <Button variant="subtle">😔 Low</Button>
              <Button variant="subtle">😄 Great</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="How it works" subtitle="Three simple steps to find calm" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Check in" desc="Quick mood and sleep check-ins to build awareness." />
          <FeatureCard title="Reflect" desc="Private journaling with gentle prompts." />
          <FeatureCard title="Practice" desc="Short guided exercises and breathing tools." />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="AI Wellness Companion" subtitle="Short, supportive conversations when you need them." />
        <div className="glass-card soft-rounded p-6">
          <p className="text-slate-700">Chat with the companion for coping strategies, grounding exercises, and quick reflections. Not a replacement for professional care.</p>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="Mood Tracking" subtitle="Observe trends and patterns over time." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Daily Mood" desc="Log in seconds and move on with your day." />
          <FeatureCard title="Weekly Summary" desc="See trends and spot patterns." />
          <FeatureCard title="Insights" desc="Personalized tips based on your entries." />
        </div>
      </section>

    </div>
  )
}
