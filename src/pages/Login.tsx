import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mail, Lock, ArrowRight } from 'lucide-react'

import FormField from '../components/FormField'
import Screws from '../components/Screws'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      await login({
        email,
        password,
      })

      navigate('/dashboard')
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const response = (
          error as {
            response?: {
              data?: {
                message?: string
              }
            }
          }
        ).response

        setError(response?.data?.message || 'Login failed')
      } else {
        setError('Unable to connect to the server')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

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

          <form onSubmit={handleSubmit}>

            <FormField
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <FormField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && (
              <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="sk-btn w-full rounded-2xl py-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="sk-emboss-soft mt-9 text-center text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-cyan-700 hover:text-cyan-800"
            >
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