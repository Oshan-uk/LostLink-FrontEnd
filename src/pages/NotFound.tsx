import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-5 py-12">

      <div className="sk-panel w-full max-w-md rounded-3xl p-8 text-center sm:p-12">

        <div className="sk-lcd mx-auto w-fit px-8 py-4 text-6xl font-bold tracking-[0.2em] sm:text-7xl">
          404
        </div>

        <h2 className="sk-emboss mt-8 text-2xl font-extrabold">
          Page Not Found
        </h2>

        <p className="sk-emboss-soft mt-3">
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="sk-btn mt-9 rounded-xl px-7 py-3.5">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

      </div>

    </main>
  )
}

export default NotFound