import type { Metadata } from "next";
import Link from "next/link";
import { ARVOR_CNPJ, ARVOR_CONTACT_EMAIL } from "@/lib/arvor";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false },
};

const UPDATED_AT = "31 de março de 2026";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7f2e8_0%,#e5ddc9_42%,#d9d1bc_100%)] text-[#2f3c4c]">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#2f3c4c]/70 transition-colors hover:text-[#2f3c4c]"
        >
          ← Voltar ao site
        </Link>

        <h1 className="text-3xl font-semibold">Termos de Uso</h1>
        <p className="mt-2 text-sm text-[#2f3c4c]/60">
          Última atualização: {UPDATED_AT}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#2f3c4c]/85">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              1. Sobre este site
            </h2>
            <p>
              Este site é operado pela <strong>Arvor Insurance</strong>, CNPJ{" "}
              {ARVOR_CNPJ}, corretora de seguros autorizada a operar no
              território nacional. Ao acessar e utilizar este site, você
              concorda com os presentes Termos de Uso.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              2. Uso do site
            </h2>
            <p>
              O site destina-se exclusivamente à apresentação institucional da
              Arvor Insurance e ao recebimento de solicitações de cotação de
              planos de saúde. É vedado o uso para fins ilícitos, fraudulentos
              ou que possam prejudicar a empresa, seus parceiros ou terceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              3. Solicitação de cotação
            </h2>
            <p>
              O preenchimento do formulário de cotação constitui uma
              manifestação de interesse, não um contrato ou proposta vinculante.
              A Arvor Insurance entrará em contato para apresentar as opções
              disponíveis conforme o perfil informado. Os dados fornecidos serão
              tratados conforme nossa{" "}
              <Link
                href="/privacidade"
                className="underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              4. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo deste site — incluindo textos, logotipos, imagens
              e elementos visuais — é de propriedade da Arvor Insurance ou de
              seus licenciantes. É proibida a reprodução, distribuição ou uso
              comercial sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              5. Limitação de responsabilidade
            </h2>
            <p>
              A Arvor Insurance não se responsabiliza por eventuais
              indisponibilidades do site, erros de navegação ou danos
              decorrentes do uso das informações aqui disponibilizadas. As
              informações publicadas têm caráter meramente informativo e não
              substituem orientação profissional individualizada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              6. Alterações
            </h2>
            <p>
              Estes Termos podem ser atualizados a qualquer momento. A data de
              última atualização será sempre indicada no topo desta página.
              Recomendamos a consulta periódica.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              7. Foro
            </h2>
            <p>
              Fica eleito o foro da Comarca de São Paulo/SP para dirimir
              quaisquer controvérsias decorrentes destes Termos, com renúncia
              expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[#2f3c4c]">
              8. Contato
            </h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para:{" "}
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
