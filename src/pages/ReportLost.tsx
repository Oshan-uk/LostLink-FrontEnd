import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package,
  MapPin,
  CalendarDays,
  Image
} from 'lucide-react'

import FormField from '../components/FormField'
import { createLostItem } from '../services/item.service'

const provinces = [
  'Western',
  'Central',
  'Southern',
  'Northern',
  'Eastern',
  'North Western',
  'North Central',
  'Uva',
  'Sabaragamuwa'
]

function ReportLost() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    province: '',
    district: '',
    city: '',
    specificPlace: '',
    date: '',
    imageUrl: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      await createLostItem({
        ...formData,
        specificPlace: formData.specificPlace.trim(),
        imageUrl: formData.imageUrl.trim()
      })

      navigate('/')
    } catch (error) {
      console.error('Lost item submission error:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your report. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Report a Lost Item
          </h1>

          <p className="mt-3">
            Provide the details below to help others identify and return
            your lost item.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sk-panel space-y-6 rounded-2xl p-6 md:p-8"
        >

          <FormField
            label="Item Name"
            name="name"
            placeholder="e.g. Black Samsung Phone"
            icon={Package}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <div className="sk-well rounded-xl p-3">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Documents">Documents</option>
                <option value="Clothing">Clothing</option>
                <option value="Bags">Bags</option>
                <option value="Accessories">Accessories</option>
                <option value="Keys">Keys</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <div className="sk-well rounded-xl p-3">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your lost item, including its colour, brand, or unique features..."
                rows={4}
                required
                className="w-full resize-y bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="mb-5 text-xl font-semibold">
              Last Known Location
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Province
                </label>

                <div className="sk-well rounded-xl p-3">
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="">Select province</option>

                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <FormField
                label="District"
                name="district"
                placeholder="e.g. Colombo"
                icon={MapPin}
                value={formData.district}
                onChange={handleChange}
                required
              />

              <FormField
                label="City / Locality"
                name="city"
                placeholder="e.g. Dehiwala"
                icon={MapPin}
                value={formData.city}
                onChange={handleChange}
                required
              />

              <FormField
                label="Specific Place (Optional)"
                name="specificPlace"
                placeholder="e.g. Near the railway station"
                icon={MapPin}
                value={formData.specificPlace}
                onChange={handleChange}
              />

            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="mb-5 text-xl font-semibold">
              Additional Information
            </h2>

            <FormField
              label="Date Lost"
              name="date"
              type="date"
              icon={CalendarDays}
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />

            <div className="mt-5">
              <FormField
                label="Image URL (Optional)"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                icon={Image}
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="sk-button w-full rounded-xl px-6 py-4 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Lost Item Report'}
          </button>

        </form>
      </div>
    </main>
  )
}

export default ReportLost