export default function FeatureCard({title,desc,icon}){
  return (
    <div className="glass-card soft-rounded p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg tile-brand flex items-center justify-center text-brand">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}
