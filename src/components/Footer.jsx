export default function Footer(){
  return (
    <footer className="w-full border-t border-slate-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-semibold">MindEase</div>
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} MindEase — A calmer space for your mind</div>
        </div>
        <div className="text-sm text-slate-600">Built with care • Privacy first</div>
      </div>
    </footer>
  )
}
