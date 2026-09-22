import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'

export default function Profile(){
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeading title="Profile" subtitle="Manage your account and preferences." />
      <div className="glass-card soft-rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full p-3 rounded-md border border-slate-200" defaultValue="Alex" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full p-3 rounded-md border border-slate-200" defaultValue="alex@example.com" />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}
