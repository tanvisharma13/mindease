import { useState } from 'react'
import Button from '../components/Button'

const samplePrompts = [
  'How can I manage stress?',
  'Help me calm down.',
  "I've had a difficult day.",
  'Give me a breathing exercise.'
]

export default function Chat(){
  const [messages,setMessages] = useState([])
  const [value,setValue] = useState('')

  function send(){
    if(!value) return
    setMessages(m=>[...m,{from:'user',text:value}])
    setValue('')
    setTimeout(()=>{
      setMessages(m=>[...m,{from:'ai',text:'I hear you. Take a slow breath. Can you tell me more?'}])
    },600)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-card soft-rounded p-4 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-auto p-2 space-y-3">
          {messages.length===0 && (
            <div className="text-center text-slate-600 mt-8">Start a conversation with your AI companion. Try a prompt below.</div>
          )}

          {messages.map((m,i)=> (
            <div key={i} className={`max-w-[80%] ${m.from==='user' ? 'ml-auto bg-[#FFFDF8] text-right' : 'mr-auto bg-white'} p-3 rounded-lg` }>
              <div className="text-sm">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <div className="flex gap-2 mb-3">
            {samplePrompts.map((p,i)=> (
              <button key={i} className="text-sm text-slate-600 bg-white/60 px-3 py-1 rounded-md" onClick={()=>{setValue(p)}}>{p}</button>
            ))}
          </div>

          <div className="flex gap-2">
            <input value={value} onChange={e=>setValue(e.target.value)} placeholder="Write a message" className="flex-1 p-3 rounded-md border border-slate-200" />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
