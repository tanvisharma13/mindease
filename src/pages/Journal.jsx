import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

const mockEntries = [
  {id:1,title:'Morning reflection',excerpt:'I woke up feeling...'},
  {id:2,title:'Work stress',excerpt:'Today I felt overwhelmed because...'}
]

export default function Journal(){
  const [entries,setEntries] = useState(mockEntries)
  const [query,setQuery] = useState('')

  const filtered = entries.filter(e=> e.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <SectionHeading title="Journal" subtitle="Private reflections kept just for you." />
        <Button onClick={()=>alert('Open editor (mock)')}>New entry</Button>
      </div>

      <div className="mt-4">
        <input placeholder="Search entries" value={query} onChange={e=>setQuery(e.target.value)} className="w-full p-3 rounded-md border border-slate-200" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length===0 ? (
          <div className="glass-card soft-rounded p-6 text-slate-600">No entries yet — try writing a short reflection.</div>
        ) : filtered.map(e=> (
          <div key={e.id} className="glass-card soft-rounded p-4">
            <div className="font-semibold">{e.title}</div>
            <div className="text-sm text-slate-600 mt-1">{e.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
