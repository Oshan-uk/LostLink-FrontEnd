import { FilePlus2, Search, Handshake } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Report an Item',
    description: 'Lost something or found an item? Submit a report with the relevant details.',
    icon: FilePlus2,
    gem: 'sk-gem',
  },
  {
    number: '02',
    title: 'Discover Matches',
    description: 'Search reports and discover items that may match what you lost or found.',
    icon: Search,
    gem: 'sk-gem sk-gem-blue',
  },
  {
    number: '03',
    title: 'Reconnect',
    description: 'Coordinate safely with the other person and help the item reach its owner.',
    icon: Handshake,
    gem: 'sk-gem sk-gem-lime',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
            Simple process
          </span>
          <h2 className="sk-emboss mt-4 font-['Plus_Jakarta_Sans'] text-3xl font-extrabold tracking-tight sm:text-4xl">
            How LostLink Works
          </h2>
          <p className="sk-emboss-soft mt-4 leading-7">
            Reuniting people with their belongings through a simple,
            community-powered process.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="sk-panel sk-panel-lift rounded-3xl p-7 sm:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <span className={`${step.gem} h-16 w-16 rounded-2xl`}>
                    <Icon size={29} />
                  </span>
                  <span className="sk-deboss text-5xl font-extrabold">{step.number}</span>
                </div>

                <div className="sk-groove mb-5" />

                <h3 className="sk-emboss text-xl font-extrabold">{step.title}</h3>
                <p className="sk-emboss-soft mt-3 leading-7">{step.description}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks