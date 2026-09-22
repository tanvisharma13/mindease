export default function FeatureCard({title,desc,icon}){
  return (
    <div className="glass-card soft-rounded p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#A8BFA3]/20 flex items-center justify-center text-[#526B58]">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-slate-600 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}
