import FeatureCard from '../components/FeatureCard'
import SectionHeading from '../components/SectionHeading'

const categories = [
  'Stress','Anxiety','Sleep','Meditation','Exam Stress','Relationships','Self-care'
]

export default function Resources(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeading title="Resources" subtitle="Categories to explore gentle practices and information." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(c=> (
          <FeatureCard key={c} title={c} desc={`Helpful articles and exercises for ${c}.`} />
        ))}
      </div>
    </div>
  )
}
