import { Link } from 'react-router-dom'
import { Search, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react'
import FormField from '../components/FormField'
import Screws from '../components/Screws'

function Register() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center px-5 py-12 sm:py-16">

      <div className="sk-panel relative w-full max-w-2xl rounded-3xl p-7 sm:p-12">

        <div className="mb-8 text-center sm:mb-10">
          <Link to="/" className="mb-7 inline-flex items-center gap-3">
            <span className="sk-gem h-12 w-12">
              <Search size={23} />
            </span>
            <span className="sk-emboss text-xl font-extrabold">
              Lost<span className="text-cyan-700">Link</span>
            </span>
          </Link>

          <h1 className="sk-emboss text-3xl font-extrabold tracking-tight">
            Create Your Account
          </h1>
          <p className="sk-emboss-soft mt-3 text-sm">
            Join the community and help reconnect lost belongings.
          </p>
        </div>

        <form onSubmit={(event) => event.preventDefault()}>

          <FormField label="Full Name" icon={User} type="text" placeholder="Enter your full name" required />
          <FormField label="Email Address" icon={Mail} type="email" placeholder="you@example.com" required />
          <FormField label="Phone Number" icon={Phone} type="tel" placeholder="Enter your phone number" />
          <FormField label="Password" icon={Lock} type="password" placeholder="Create a password" minLength={8} required />
          <FormField label="Confirm Password" icon={Lock} type="password" placeholder="Confirm your password" minLength={8} required />

          <label className="sk-emboss-soft mb-8 flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input type="checkbox" required className="sk-check mt-0.5" />
            I agree to use LostLink responsibly and provide accurate
            information when reporting items.
          </label>

          <button type="submit" className="sk-btn w-full rounded-2xl py-4">
            Create Account
            <ArrowRight size={18} />
          </button>

        </form>

        <p className="sk-emboss-soft mt-9 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-cyan-700 hover:text-cyan-800">
            Sign In
          </Link>
        </p>

        <Screws />
      </div>

    </main>
  )
}

export default Register