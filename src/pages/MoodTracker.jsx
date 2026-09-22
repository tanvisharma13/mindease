import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

const moods = [
  {id:5,label:'😄 Great'},
  {id:4,label:'🙂 Good'},
  {id:3,label:'😐 Okay'},
  {id:2,label:'😔 Low'},
  {id:1,label:'😢 Very Low'},
]

export default function MoodTracker(){
  const [mood,setMood] = useState(null)
  const [stress,setStress] = useState(3)
  const [sleep,setSleep] = useState(7)
  const [note,setNote] = useState('')

  function submit(e){
    e.preventDefault()
    // mock submit
    alert('Saved (mock)')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="glass-card soft-rounded p-6">
        <SectionHeading title="Daily Mood Check-in" />
        <form onSubmit={submit} className="space-y-4">
          <div className="flex gap-2">
            {moods.map(m=> (
              <button key={m.id} type="button" onClick={()=>setMood(m.id)} className={`p-3 rounded-md flex-1 ${mood===m.id ? 'bg-[#526B58] text-white' : 'bg-white'}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div>
            <div className="text-sm mb-1">Stress level</div>
            <input type="range" min="1" max="5" value={stress} onChange={e=>setStress(e.target.value)} />
          </div>

          <div>
            <div className="text-sm mb-1">Sleep (hours)</div>
            <input type="number" min="0" max="24" value={sleep} onChange={e=>setSleep(e.target.value)} className="w-28 p-2 rounded-md border border-slate-200" />
          </div>

          <div>
            <div className="text-sm mb-1">Optional note</div>
            <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full p-3 rounded-md border border-slate-200" rows={4} />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Check-in</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 glass-card soft-rounded p-4">
        <SectionHeading title="Weekly Mood" />
        <div className="text-sm text-slate-600">(placeholder chart with mock data)</div>
      </div>
    </div>
  )
}
