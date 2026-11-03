import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: LucideIcon
}

function FormField({ label, icon: Icon, id, ...props }: FormFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className="mb-5">
      <label htmlFor={inputId} className="sk-emboss mb-2 block text-sm font-bold">
        {label}
      </label>

      <div className="sk-well flex items-center gap-3 px-2.5 py-2">
        <span className="sk-knob">
          <Icon size={16} />
        </span>

        <input
          {...props}
          id={inputId}
          className="w-full min-w-0 bg-transparent py-1.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  )
}

export default FormField