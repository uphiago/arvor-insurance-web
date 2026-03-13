"use client";

import { useState } from "react";
import { SmoothLink } from "@/components/ui/smooth-link";

const NAV_ITEMS = [
  { to: "sobre", label: "Sobre" },
  { to: "sustentavel", label: "Projeto Sustentável" },
  { to: "produtos", label: "Produtos" },
  { to: "autoatendimento", label: "Cotar" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#2f3c4c] transition hover:bg-[#2f3c4c]/10"
      >
        {open ? (
          /* X icon */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Hamburger icon */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer */}
          <nav
            aria-label="Navegação mobile"
            className="fixed top-[61px] right-0 left-0 z-40 border-b border-[#ae905e]/20 bg-[#e5ddc9]/95 px-5 py-4 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <SmoothLink
                    to={item.to}
                    onClick={close}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-[#2f3c4c] transition hover:bg-[#2f3c4c]/8"
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
