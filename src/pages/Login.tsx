import { Link } from 'react-router-dom'
import { Search, Mail, Lock, ArrowRight } from 'lucide-react'
import FormField from '../components/FormField'
import Screws from '../components/Screws'

function Login() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center px-5 py-12 sm:py-16">

      <div className="sk-panel relative grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2">

        <div className="sk-dark relative hidden flex-col justify-between p-12 text-white lg:flex">
          <Link to="/" className="flex items-center gap-3">
            <span className="sk-gem h-11 w-11">
              <Search size={22} />
            </span>
            <span className="sk-engrave text-xl font-extrabold">
              Lost<span className="text-cyan-400">Link</span>
            </span>
          </Link>

          <div>
            <h2 className="sk-title-dark text-4xl font-extrabold leading-tight">
              Welcome Back.
              <br />
              Your Community
              <br />
              Is Here.
            </h2>
            <p className="mt-6 leading-8 text-slate-400">
              Sign in to manage your reports, discover potential matches
              and help reconnect people with their belongings.
            </p>
          </div>

          <p className="flex items-center gap-2.5 text-xs text-slate-500">
            <span className="sk-led" />
            Reconnecting what matters across Sri Lanka.
          </p>
        </div>

        <div className="p-7 sm:p-12">

          <div className="mb-8 sm:mb-9">
            <span className="sk-eyebrow text-sm font-bold uppercase tracking-widest">
              Welcome back
            </span>
            <h1 className="sk-emboss mt-3 text-3xl font-extrabold tracking-tight">
              Sign in to LostLink
            </h1>
            <p className="sk-emboss-soft mt-3 text-sm leading-6">
              Enter your account details to continue.
            </p>
          </div>

          <form onSubmit={(event) => event.preventDefault()}>

            <FormField label="Email Address" icon={Mail} type="email" placeholder="you@example.com" required />
            <FormField label="Password" icon={Lock} type="password" placeholder="Enter your password" required />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="sk-emboss-soft flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" className="sk-check" />
                Remember me
              </label>

              <button type="button" className="font-bold text-cyan-700 transition-colors hover:text-cyan-800">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="sk-btn w-full rounded-2xl py-4">
              Sign In
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="sk-emboss-soft mt-9 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-cyan-700 hover:text-cyan-800">
              Create Account
            </Link>
          </p>

        </div>

        <Screws />
      </div>

    </main>
  )
}

export default Login