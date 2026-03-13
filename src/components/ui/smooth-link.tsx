"use client";

import type { AnchorHTMLAttributes } from "react";

interface SmoothLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string; // section id without #
}

export function SmoothLink({
  to,
  children,
  onClick,
  ...props
}: SmoothLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
    onClick?.(e);
  }

  return (
    <a href={`#${to}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
