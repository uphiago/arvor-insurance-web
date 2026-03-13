import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2 text-sm shadow-sm transition placeholder:text-[#2f3c4c]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fa286]/45",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
