import type { Metadata } from "next";
import Link from "next/link";
import { ARVOR_CNPJ, ARVOR_CONTACT_EMAIL } from "@/lib/arvor";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false },
};

const UPDATED_AT = "31 de março de 2026";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7f2e8_0%,#e5ddc9_42%,#d9d1bc_100%)] text-[#2f3c4c]">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#2f3c4c]/70 transition-colors hover:text-[#2f3c4c]"
        >
          ← Voltar ao site
        </Link>

        <h1 className="text-3xl font-semibold">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-[#2f3c4c]/60">
          Última atualização: {UPDATED_AT}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#2f3c4c]/85">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              1. Controlador dos dados
            </h2>
            <p>
              A <strong>Arvor Insurance</strong>, CNPJ {ARVOR_CNPJ}, é a
              controladora dos dados pessoais coletados neste site, nos termos
              da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              2. Dados coletados
            </h2>
            <p>Ao preencher o formulário de cotação, coletamos:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Nome completo</li>
              <li>Telefone</li>
              <li>E-mail</li>
              <li>Quantidade de pessoas e faixas etárias</li>
              <li>Modalidade de plano desejada</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              3. Finalidade e base legal
            </h2>
            <p>
              Os dados são coletados com base no{" "}
              <strong>legítimo interesse</strong> e no{" "}
              <strong>consentimento</strong> do titular, com as seguintes
              finalidades:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Responder à solicitação de cotação de plano de saúde</li>
              <li>Entrar em contato via WhatsApp ou e-mail</li>
              <li>Registro interno de leads para gestão comercial</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              4. Compartilhamento de dados
            </h2>
            <p>
              Os dados são armazenados em planilha interna (Google Sheets) e
              acessados exclusivamente pela equipe da Arvor Insurance. Não
              vendemos, alugamos nem compartilhamos dados com terceiros para
              fins de marketing sem consentimento explícito.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              5. Prazo de retenção
            </h2>
            <p>
              Os dados são mantidos pelo tempo necessário ao atendimento
              comercial e cumprimento de obrigações legais, ou até que o titular
              solicite sua exclusão.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              6. Direitos do titular
            </h2>
            <p>
              Nos termos da LGPD, você tem direito a confirmar a existência de
              tratamento, acessar seus dados, corrigir informações incompletas,
              solicitar anonimização ou exclusão, e revogar o consentimento a
              qualquer momento. Para exercer esses direitos, entre em contato
              pelo e-mail abaixo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              7. Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus
              dados contra acesso não autorizado, perda ou destruição. A
              transmissão dos dados é feita por conexão segura (HTTPS).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              8. Contato e encarregado (DPO)
            </h2>
            <p>
              Para dúvidas, solicitações ou exercício de direitos relacionados à
              privacidade, entre em contato:
            </p>
            <p className="mt-2">
              <a
                href={`mailto:${ARVOR_CONTACT_EMAIL}`}
                className="underline underline-offset-2"
              >
                {ARVOR_CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
