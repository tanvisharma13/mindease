import Button from '../components/Button'

export default function Register(){
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card soft-rounded p-6">
        <h2 className="text-2xl font-semibold">Create your MindEase account</h2>
        <p className="text-sm text-slate-600 mt-2">Join and start tracking your wellbeing.</p>
        <form className="mt-4 space-y-4">
          <label className="block">
            <div className="text-sm mb-1">Name</div>
            <input className="w-full p-3 rounded-md border border-slate-200" placeholder="Your name" />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Email</div>
            <input className="w-full p-3 rounded-md border border-slate-200" placeholder="you@example.com" />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Password</div>
            <input type="password" className="w-full p-3 rounded-md border border-slate-200" placeholder="Create a password" />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Confirm password</div>
            <input type="password" className="w-full p-3 rounded-md border border-slate-200" placeholder="Confirm password" />
          </label>
          <div className="mt-4">
            <Button>Create account</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
