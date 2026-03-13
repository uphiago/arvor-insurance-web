export const ARVOR_CONTACT_EMAIL = "dimitricontro@arvorin.com.br";

export const ARVOR_WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.";

export function toWhatsappUrl() {
  return `https://wa.me/?text=${encodeURIComponent(ARVOR_WHATSAPP_MESSAGE)}`;
}
