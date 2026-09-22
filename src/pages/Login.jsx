import Button from '../components/Button'

export default function Login(){
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card soft-rounded p-6">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-slate-600 mt-2">Sign in to access your MindEase space.</p>
        <form className="mt-4 space-y-4">
          <label className="block">
            <div className="text-sm mb-1">Email</div>
            <input className="w-full p-3 rounded-md border border-slate-200" placeholder="you@example.com" />
          </label>
          <label className="block">
            <div className="text-sm mb-1">Password</div>
            <input type="password" className="w-full p-3 rounded-md border border-slate-200" placeholder="••••••" />
          </label>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox"/> Remember me</label>
            <a href="#" className="text-sm text-slate-600">Forgot password?</a>
          </div>
          <div className="mt-4 flex gap-2">
            <Button type="submit">Sign in</Button>
            <Button variant="ghost">Sign in with demo</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
