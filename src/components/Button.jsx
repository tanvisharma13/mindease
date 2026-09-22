export default function Button({children,variant='primary',className='',...props}){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium btn-smooth'
  const variants = {
    primary: 'bg-[#526B58] text-white shadow-sm',
    ghost: 'bg-transparent border border-transparent text-[#526B58]',
    subtle: 'bg-white/60 text-[#526B58]'
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>{children}</button>
  )
}
