import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'

export default function Dashboard(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <div className="glass-card soft-rounded p-4">
          <div className="font-semibold">Good morning, Alex</div>
          <div className="text-sm text-slate-600 mt-2">Here's a gentle start to your day.</div>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="subtle">Talk to AI</Button>
            <Button variant="subtle">Track Mood</Button>
            <Button variant="subtle">Write Journal</Button>
            <Button variant="subtle">Explore Resources</Button>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card soft-rounded p-4">
          <SectionHeading title="Today's Check-in" />
          <div className="mt-2">How are you feeling right now?</div>
        </div>

        <div className="glass-card soft-rounded p-4">
          <SectionHeading title="AI Companion" />
          <div className="text-sm text-slate-600">Short supportive suggestions and prompts.</div>
        </div>

        <div className="glass-card soft-rounded p-4">
          <SectionHeading title="Recent Journal Entries" />
          <div className="text-sm text-slate-600 mt-2">No entries yet — start by writing a short reflection.</div>
        </div>

        <div className="glass-card soft-rounded p-4">
          <SectionHeading title="Weekly Mood" />
          <div className="text-sm text-slate-600 mt-2">(placeholder for chart)</div>
        </div>
      </div>

    </div>
  )
}
