export const ARVOR_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dimitricontro@arvorin.com.br";

export const ARVOR_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "55XXXXXXXXXXX";

export const ARVOR_INSTAGRAM =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://instagram.com/arvorinsurance";

export const ARVOR_LINKEDIN =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ??
  "https://linkedin.com/company/arvor-insurance";

export const ARVOR_CNPJ = process.env.NEXT_PUBLIC_CNPJ ?? "XX.XXX.XXX/0001-XX";

export const ARVOR_WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.";

export function toWhatsappUrl() {
  return `https://wa.me/${ARVOR_WHATSAPP_PHONE}?text=${encodeURIComponent(ARVOR_WHATSAPP_MESSAGE)}`;
}
