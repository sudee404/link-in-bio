import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "h-5 w-5 rounded border border-gray-200 flex items-center justify-center",
            "peer-checked:bg-blue-500 peer-checked:border-blue-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
            className
          )}>
            <Check className="h-3.5 w-3.5 text-white hidden peer-checked:block" />
          </div>
        </div>
        <span className="text-sm text-gray-700">
          {props['aria-label']}
        </span>
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

