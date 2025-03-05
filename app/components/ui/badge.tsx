import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
     variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        lowQuantity: "border-transparent bg-blue-500 text-white hover:bg-blue-400",
        systemBusy: "border-transparent bg-yellow-500 text-white hover:bg-yellow-400",
        noHistory: "border-transparent bg-gray-500 text-white hover:bg-gray-400",
        badRequest: "border-transparent bg-red-500 text-white hover:bg-red-400",
        positionFail: "border-transparent bg-purple-500 text-white hover:bg-purple-400",
        serverError: "border-transparent bg-orange-500 text-white hover:bg-orange-400",
        responseError: "border-transparent bg-teal-500 text-white hover:bg-teal-400",
        rateLimit: "border-transparent bg-pink-500 text-white hover:bg-pink-400",
        accountIssue: "border-transparent bg-indigo-500 text-white hover:bg-indigo-400",
        permissionError: "border-transparent bg-lime-500 text-white hover:bg-lime-400",
        timeoutError: "border-transparent bg-cyan-600 text-white hover:bg-cyan-500", // Cyan 계열
        orderNotFound: "border-transparent bg-amber-600 text-white hover:bg-amber-500", // Amber 계열
        divisionByZero: "border-transparent bg-green-600 text-white hover:bg-green-500", // Green 계열
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
