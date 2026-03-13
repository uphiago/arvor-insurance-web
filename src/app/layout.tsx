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

export const metadata: Metadata = {
  title: {
    default: "Arvor Insurance",
    template: "%s | Arvor Insurance",
  },
  description:
    "Corretora sustentavel especializada em planos de saude empresarial e seguro de vida.",
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
        {children}
      </body>
    </html>
  );
}
