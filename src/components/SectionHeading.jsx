export default function SectionHeading({title,subtitle}){
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-[#26332A]">{title}</h3>
      {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
    </div>
  )
}
