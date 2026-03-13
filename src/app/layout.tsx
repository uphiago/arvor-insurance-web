import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const SITE_URL = "https://www.arvorin.com.br";
const DESCRIPTION =
  "Corretora sustentável especializada em planos de saúde empresarial e seguro de vida.";

export const metadata: Metadata = {
  title: {
    default: "Arvor Insurance",
    template: "%s | Arvor Insurance",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arvor Insurance",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Arvor Insurance",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvor Insurance",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${raleway.variable} antialiased`}
      >
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#2f3c4c] focus:px-3 focus:py-2 focus:text-[#e5ddc9]"
        >
          Pular para conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
