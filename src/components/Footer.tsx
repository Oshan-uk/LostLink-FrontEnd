import { Link } from 'react-router-dom'
import { Search, Mail, MapPin, Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="sk-dark text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-8">

        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <span className="sk-gem h-11 w-11">
              <Search size={22} />
            </span>
            <span className="sk-engrave text-xl font-extrabold">
              Lost<span className="text-cyan-400">Link</span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            Helping people across Sri Lanka reconnect with their lost
            belongings through a simple and accessible platform.
          </p>
        </div>

        <div>
          <h3 className="sk-engrave mb-3 font-bold">Quick Links</h3>
          <div className="sk-groove-dark mb-5" />
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/" className="w-fit transition-colors hover:text-cyan-300">Home</Link>
            <Link to="/login" className="w-fit transition-colors hover:text-cyan-300">Login</Link>
            <Link to="/register" className="w-fit transition-colors hover:text-cyan-300">Register</Link>
            <a href="/#how-it-works" className="w-fit transition-colors hover:text-cyan-300">How It Works</a>
          </div>
        </div>

        <div>
          <h3 className="sk-engrave mb-3 font-bold">Explore</h3>
          <div className="sk-groove-dark mb-5" />
          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <a href="/#recent" className="w-fit transition-colors hover:text-cyan-300">Recent Reports</a>
            <a href="/#categories" className="w-fit transition-colors hover:text-cyan-300">Categories</a>
            <a href="/#search" className="w-fit transition-colors hover:text-cyan-300">Search Items</a>
          </div>
        </div>

        <div>
          <h3 className="sk-engrave mb-3 font-bold">Contact</h3>
          <div className="sk-groove-dark mb-5" />
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <span className="sk-well-dark flex h-9 w-9 shrink-0 items-center justify-center">
                <Mail size={16} className="text-cyan-400" />
              </span>
              <span className="break-all">support@lostlink.lk</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="sk-well-dark flex h-9 w-9 shrink-0 items-center justify-center">
                <MapPin size={16} className="text-blue-400" />
              </span>
              <span>Sri Lanka</span>
            </div>
          </div>
        </div>

      </div>

      <div className="sk-groove-dark" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center text-xs text-slate-500 sm:flex-row lg:px-8">
        <p>© {new Date().getFullYear()} LostLink. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Built with <Heart size={13} className="fill-lime-500 text-lime-500" /> for Sri Lanka
        </p>
      </div>

    </footer>
  )
}

export default Footer