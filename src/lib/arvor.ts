export const ARVOR_CONTACT_EMAIL = "dimitricontro@arvorin.com.br";

/** Número WhatsApp com DDI+DDD, sem espaços. Ex: "5511999999999" */
export const ARVOR_WHATSAPP_PHONE = "55XXXXXXXXXXX"; // TODO: substituir pelo número real

export const ARVOR_WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.";

export const ARVOR_INSTAGRAM = "https://instagram.com/arvorinsurance"; // TODO: confirmar handle
export const ARVOR_LINKEDIN = "https://linkedin.com/company/arvor-insurance"; // TODO: confirmar URL
export const ARVOR_CNPJ = "XX.XXX.XXX/0001-XX"; // TODO: substituir pelo CNPJ real

export function toWhatsappUrl() {
  return `https://wa.me/${ARVOR_WHATSAPP_PHONE}?text=${encodeURIComponent(ARVOR_WHATSAPP_MESSAGE)}`;
}
