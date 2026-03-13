"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "E-mail copiado" : `Copiar e-mail ${email}`}
      className="cursor-pointer underline transition hover:text-[#ae905e]"
    >
      {copied ? "E-mail copiado!" : email}
    </button>
  );
}
