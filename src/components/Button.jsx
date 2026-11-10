export default function Button({children,variant='primary',className='',...props}){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium btn-smooth'
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    subtle: 'btn-subtle'
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>{children}</button>
  )
}
