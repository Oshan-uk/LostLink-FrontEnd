import { FileText, Search, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { title: 'Total Reports', value: '00', icon: FileText, gem: 'sk-gem' },
  { title: 'Lost Items', value: '00', icon: Search, gem: 'sk-gem sk-gem-blue' },
  { title: 'Found Items', value: '00', icon: CheckCircle, gem: 'sk-gem sk-gem-lime' },
  { title: 'Pending Reports', value: '00', icon: Clock, gem: 'sk-gem' },
]

function Dashboard() {
  return (
    <main className="min-h-[85vh] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
              Your account
            </span>
            <h1 className="sk-emboss mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome to Your Dashboard
            </h1>
            <p className="sk-emboss-soft mt-2">
              Manage your lost and found reports in one place.
            </p>
          </div>

          <Link to="/register" className="sk-btn w-fit rounded-xl px-6 py-3">
            <Plus size={19} />
            Report an Item
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="sk-panel sk-panel-lift p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="sk-emboss-soft text-sm font-bold">{stat.title}</span>
                  <span className={`${stat.gem} h-11 w-11 rounded-xl`}>
                    <Icon size={20} />
                  </span>
                </div>

                <div className="sk-lcd mt-5 px-4 py-2.5 text-3xl font-bold tracking-[0.25em]">
                  {stat.value}
                </div>
              </div>
            )
          })}
        </div>

        <div className="sk-panel mt-8 rounded-3xl p-8 text-center sm:p-12">
          <span className="sk-gem mx-auto h-16 w-16 rounded-2xl">
            <FileText size={30} />
          </span>

          <h2 className="sk-emboss mt-6 text-xl font-extrabold">
            Your Reports Will Appear Here
          </h2>

          <p className="sk-emboss-soft mx-auto mt-3 max-w-md leading-7">
            Once you report a lost or found item, you can manage its
            details and status from this dashboard.
          </p>

          <Link to="/register" className="sk-btn sk-btn-steel mt-8 rounded-xl px-6 py-3">
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </main>
  )
}

export default Dashboard