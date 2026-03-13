import { QuoteStepper } from "@/components/site/quote-stepper";
import { ARVOR_CONTACT_EMAIL, ARVOR_WHATSAPP_MESSAGE } from "@/lib/arvor";

function toWhatsappUrl() {
  return `https://wa.me/?text=${encodeURIComponent(ARVOR_WHATSAPP_MESSAGE)}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7f2e8_0%,#e5ddc9_42%,#d9d1bc_100%)] text-[#2f3c4c]">
      <header className="sticky top-0 z-20 border-b border-[#ae905e]/35 bg-[#e5ddc9]/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a
            href="#inicio"
            className="cursor-pointer text-lg font-semibold tracking-wide"
          >
            Arvor Insurance
          </a>
          <nav
            className="hidden items-center gap-5 text-sm md:flex"
            aria-label="Navegação principal"
          >
            <a
              href="#sobre"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Sobre
            </a>
            <a
              href="#sustentavel"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Projeto Sustentável
            </a>
            <a
              href="#produtos"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Produtos
            </a>
            <a
              href="#autoatendimento"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Cotar
            </a>
          </nav>
          <a
            href={toWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-full border border-[#8fa286]/80 bg-[#8fa286]/80 px-4 py-2 text-sm font-semibold text-[#2f3c4c] shadow-sm transition hover:bg-[#7c8f75]"
          >
            Falar com Especialista
          </a>
        </div>
      </header>

      <main id="conteudo-principal">
        <section
          id="inicio"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24"
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6">
              <p className="inline-block rounded-full border border-[#ae905e] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ae905e]">
                Corretora Sustentável
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
                Soluções em saúde e vida para empresas e famílias.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#2f3c4c]/80">
                Atendimento consultivo para Plano de Saúde Empresarial e Seguro
                de Vida, com propósito socioambiental no centro da operação.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#autoatendimento"
                  className="inline-flex items-center justify-center rounded-full bg-[#2f3c4c] px-6 py-3 text-center font-semibold text-[#e5ddc9] transition hover:bg-[#24303d]"
                >
                  Cotar agora
                </a>
                <a
                  href={toWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#c5874a] px-6 py-3 text-center font-semibold text-[#c5874a] transition hover:bg-[#c5874a] hover:text-[#e5ddc9]"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-[#ae905e]/65 bg-[#2f3c4c]/88 p-8 text-[#e5ddc9] shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-wider text-[#8fa286]">
                Diferencial Arvor
              </p>
              <h2 className="mt-3 text-balance text-2xl font-semibold">
                Proteção com impacto positivo
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/90">
                Parte do FCF da corretora é destinada a iniciativas
                socioambientais, reforçando crescimento, proteção e longevidade.
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-[#2f3c4c]/90 py-16 text-[#e5ddc9]">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-3 md:px-8">
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-balance text-xl font-semibold">Missão</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/85">
                Estruturar soluções em saúde e benefícios com atendimento
                próximo e responsável para empresas e famílias.
              </p>
            </article>
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-balance text-xl font-semibold">
                Proposta de Valor
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/85">
                Redução de absenteísmo, retenção de talentos e aumento de
                produtividade com desenho de benefícios aderente ao contexto de
                cada cliente.
              </p>
            </article>
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-balance text-xl font-semibold">
                Abrangência
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/85">
                Atendimento nacional para PF, Coletivo por Adesão, PJ e MEI com
                apoio consultivo em toda a jornada.
              </p>
            </article>
          </div>
        </section>

        <section
          id="sustentavel"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8"
        >
          <h2 className="text-balance text-3xl font-semibold">
            Projeto Sustentável
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#2f3c4c]/80">
            O propósito socioambiental da Arvor está integrado ao modelo de
            negócio: parte dos resultados é direcionada a ONGs, tornando cada
            contratação também uma contribuição para iniciativas de impacto.
          </p>
        </section>

        <section
          id="produtos"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8"
        >
          <h2 className="text-balance text-3xl font-semibold">Produtos</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Plano de Saúde Empresarial",
                desc: "Cobertura para equipes de qualquer porte, com foco em rede credenciada, custo e perfil do colaborador.",
              },
              {
                title: "Coletivo por Adesão",
                desc: "Planos acessíveis via associação ou diploma, ideais para profissionais liberais e autônomos.",
              },
              {
                title: "Seguro de Vida",
                desc: "Proteção para colaboradores e famílias, com coberturas ajustadas ao contexto de cada empresa.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#ae905e]/65 bg-[#f9f5ea]/55 p-6 shadow-lg backdrop-blur-md"
              >
                <h3 className="text-balance text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2f3c4c]/80">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="como-funciona"
          className="bg-[#2f3c4c]/92 py-16 text-[#e5ddc9]"
        >
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <h2 className="text-balance text-3xl font-semibold">
              Como funciona
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "1. Cotar",
                  desc: "Preencha o formulário em 3 etapas com seus dados e preferências de plano.",
                },
                {
                  step: "2. Escolher",
                  desc: "Nossa equipe apresenta as melhores opções para o seu perfil e orçamento.",
                },
                {
                  step: "3. Contratar",
                  desc: "Assinatura digital e envio de documentos com suporte consultivo completo.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#8fa286]/45 bg-[#e5ddc9]/10 p-6 backdrop-blur-md"
                >
                  <p className="text-xl font-semibold">{item.step}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#e5ddc9]/75">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QuoteStepper />
      </main>

      <footer className="border-t border-[#2f3c4c]/15 bg-[#f4ede0] py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 text-sm md:px-8">
          <p className="font-semibold">
            Arvor Insurance · Corretora Sustentável
          </p>
          <p>
            Contato para cotações:{" "}
            <a href={`mailto:${ARVOR_CONTACT_EMAIL}`} className="underline">
              {ARVOR_CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-[#2f3c4c]/70">
            Atendimento nacional para PF, Coletivo por Adesão, PJ e MEI.
          </p>
        </div>
      </footer>
    </div>
  );
}
