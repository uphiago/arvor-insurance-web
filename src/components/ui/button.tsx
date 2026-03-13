import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[#2f3c4c] px-6 py-3 text-[#e5ddc9] hover:bg-[#24303d]",
        secondary:
          "border border-[#8fa286] bg-[#8fa286]/15 px-6 py-3 text-[#2f3c4c] hover:bg-[#8fa286]/25",
        outline:
          "border border-[#2f3c4c]/35 bg-transparent px-5 py-2 text-[#2f3c4c] hover:bg-[#2f3c4c]/5",
        accent:
          "border border-[#8fa286]/80 bg-[#8fa286]/80 px-4 py-2 text-[#2f3c4c] hover:bg-[#7c8f75]",
      },
      size: {
        default: "",
        lg: "text-base px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
