import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar(){
  const [open,setOpen] = useState(false)
  return (
    <header className="w-full bg-transparent backdrop-blur-sm py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8B9A8] to-[#C9C4D9] flex items-center justify-center text-white shadow-md">ME</div>
          <div>
            <div className="text-lg font-semibold">MindEase</div>
            <div className="text-xs text-slate-500">A calmer space for your mind</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <Link to="/" className="hover:text-sage-dark">Home</Link>
          <Link to="/resources" className="hover:text-sage-dark">Resources</Link>
          <a href="#about" className="hover:text-sage-dark">About</a>
          <Link to="/login" className="text-sage-dark font-medium">Login</Link>
          <Link to="/register" className="ml-2 bg-[#526B58] text-white px-4 py-2 rounded-md shadow-sm btn-smooth">Get Started</Link>
        </nav>

        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-md bg-white/60 glass-card">
          <Menu size={18} />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-3 px-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="py-2 px-3 rounded-md">Home</Link>
            <Link to="/resources" className="py-2 px-3 rounded-md">Resources</Link>
            <Link to="/login" className="py-2 px-3 rounded-md">Login</Link>
            <Link to="/register" className="py-2 px-3 rounded-md bg-[#526B58] text-white rounded-md">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}
