import { Link, NavLink } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

const linkBase =
  'sk-emboss-soft rounded-xl px-4 py-2 text-sm font-bold transition-colors hover:text-cyan-700'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? 'sk-pressed' : ''}`

  const close = () => setMenuOpen(false)

  return (
    <header className="sk-metal sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">

        <Link to="/" className="flex items-center gap-3">
          <span className="sk-gem h-11 w-11">
            <Search size={22} strokeWidth={2.5} />
          </span>

          <span>
            <span className="sk-emboss block font-['Plus_Jakarta_Sans'] text-xl font-extrabold leading-tight tracking-tight">
              Lost<span className="text-cyan-700">Link</span>
            </span>
            <span className="sk-emboss-soft hidden text-[10px] font-bold tracking-widest sm:block">
              RECONNECT WHAT MATTERS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <a href="/#recent" className={linkBase}>Browse Items</a>
          <a href="/#how-it-works" className={linkBase}>How It Works</a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="sk-btn sk-btn-steel rounded-xl px-5 py-2.5 text-sm">
            Log In
          </Link>
          <Link to="/register" className="sk-btn rounded-xl px-5 py-2.5 text-sm">
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="sk-btn sk-btn-steel h-11 w-11 rounded-xl md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? 'visible max-h-[30rem] opacity-100' : 'invisible max-h-0 opacity-0'
        }`}
      >
        <div className="sk-groove" />
        <div className="flex flex-col gap-4 px-5 pb-6 pt-5">
          <Link to="/" onClick={close} className="sk-btn sk-btn-steel w-full rounded-xl py-3">Home</Link>
          <a href="/#recent" onClick={close} className="sk-btn sk-btn-steel w-full rounded-xl py-3">Browse Items</a>
          <a href="/#how-it-works" onClick={close} className="sk-btn sk-btn-steel w-full rounded-xl py-3">How It Works</a>
          <Link to="/login" onClick={close} className="sk-btn sk-btn-steel w-full rounded-xl py-3">Log In</Link>
          <Link to="/register" onClick={close} className="sk-btn w-full rounded-xl py-3">Get Started</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar