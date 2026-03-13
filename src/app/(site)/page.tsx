import { Reveal } from "@/components/ui/reveal";
import { QuoteStepper } from "@/components/site/quote-stepper";
import {
  ARVOR_CONTACT_EMAIL,
  ARVOR_CNPJ,
  ARVOR_INSTAGRAM,
  ARVOR_LINKEDIN,
  toWhatsappUrl,
} from "@/lib/arvor";
import { CopyEmail } from "@/components/ui/copy-email";

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
        {/* Hero */}
        <section id="inicio" className="relative overflow-hidden">
          {/* Ambient blobs */}
          <div className="animate-blob pointer-events-none absolute -top-32 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#8fa286]/20 blur-3xl" />
          <div className="animate-blob pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[#ae905e]/20 blur-3xl [animation-delay:-4s]" />

          <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-28">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div className="space-y-6">
                <p className="animate-hero-item [animation-delay:80ms] inline-block rounded-full border border-[#ae905e] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ae905e]">
                  Corretora Sustentável
                </p>
                <h1 className="animate-hero-item [animation-delay:180ms] text-balance text-4xl font-semibold leading-tight md:text-5xl">
                  Soluções em saúde e vida para empresas e famílias.
                </h1>
                <p className="animate-hero-item [animation-delay:280ms] max-w-xl text-lg leading-relaxed text-[#2f3c4c]/80">
                  Atendimento consultivo para Plano de Saúde Empresarial e
                  Seguro de Vida, com propósito socioambiental no centro da
                  operação.
                </p>
                <div className="animate-hero-item [animation-delay:360ms] flex flex-col gap-3 sm:flex-row">
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
              <div className="animate-hero-item [animation-delay:320ms] rounded-3xl border border-[#ae905e]/65 bg-[#2f3c4c]/88 p-8 text-[#e5ddc9] shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-wider text-[#8fa286]">
                  Diferencial Arvor
                </p>
                <h2 className="mt-3 text-balance text-2xl font-semibold">
                  Proteção com impacto positivo
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/90">
                  Parte do FCF da corretora é destinada a iniciativas
                  socioambientais, reforçando crescimento, proteção e
                  longevidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="bg-[#2f3c4c]/90 py-16 text-[#e5ddc9]">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <Reveal className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#8fa286]">
                Quem somos
              </p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Missão",
                  desc: "Estruturar soluções em saúde e benefícios com atendimento próximo e responsável para empresas e famílias.",
                },
                {
                  num: "02",
                  title: "Proposta de Valor",
                  desc: "Redução de absenteísmo, retenção de talentos e aumento de produtividade com desenho de benefícios aderente ao contexto de cada cliente.",
                },
                {
                  num: "03",
                  title: "Abrangência",
                  desc: "Atendimento nacional para PF, Coletivo por Adesão, PJ e MEI com apoio consultivo em toda a jornada.",
                },
              ].map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={(i + 1) as 1 | 2 | 3}
                  className="h-full"
                >
                  <article className="relative h-full overflow-hidden rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#e5ddc9]/15 hover:shadow-lg">
                    <span className="pointer-events-none absolute right-4 bottom-2 select-none text-7xl font-bold leading-none text-[#e5ddc9]/[0.07]">
                      {item.num}
                    </span>
                    <h2 className="relative text-balance text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#e5ddc9]/85">
                      {item.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sustentável */}
        <section
          id="sustentavel"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8"
        >
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#8fa286]">
              Nossa causa
            </p>
            <h2 className="text-balance text-3xl font-semibold">
              Projeto Sustentável
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#2f3c4c]/80">
              O propósito socioambiental da Arvor está integrado ao modelo de
              negócio: parte dos resultados é direcionada a iniciativas de
              impacto, reforçando que cada contratação também contribui para um
              mundo melhor.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                name: "SOS Mata Atlântica",
                desc: "Proteção e restauração da Mata Atlântica, um dos biomas mais ameaçados do planeta.",
              },
              {
                name: "ONG ZOE",
                desc: "Combate à pobreza extrema e ao tráfico de seres humanos em contextos de vulnerabilidade.",
              },
            ].map((org, i) => (
              <Reveal key={org.name} delay={(i + 1) as 1 | 2}>
                <div className="rounded-2xl border border-[#8fa286]/35 bg-[#8fa286]/8 p-5">
                  <p className="text-sm font-semibold text-[#8fa286]">
                    {org.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#2f3c4c]/75">
                    {org.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Produtos */}
        <section
          id="produtos"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8"
        >
          <Reveal className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#8fa286]">
              O que oferecemos
            </p>
            <h2 className="text-balance text-3xl font-semibold">Produtos</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
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
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i + 1) as 1 | 2 | 3}
                className="h-full"
              >
                <article className="h-full rounded-2xl border border-[#ae905e]/65 bg-[#f9f5ea]/55 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ae905e] hover:shadow-xl">
                  <h3 className="text-balance text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2f3c4c]/80">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section
          id="como-funciona"
          className="bg-[#2f3c4c]/92 py-16 text-[#e5ddc9]"
        >
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <Reveal className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#8fa286]">
                Processo
              </p>
              <h2 className="text-balance text-3xl font-semibold">
                Como funciona
              </h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  num: "01",
                  step: "Cotar",
                  desc: "Preencha o formulário em 3 etapas com seus dados e preferências de plano.",
                },
                {
                  num: "02",
                  step: "Escolher",
                  desc: "Nossa equipe apresenta as melhores opções para o seu perfil e orçamento.",
                },
                {
                  num: "03",
                  step: "Contratar",
                  desc: "Assinatura digital e envio de documentos com suporte consultivo completo.",
                },
              ].map((item, i) => (
                <Reveal key={item.step} delay={(i + 1) as 1 | 2 | 3}>
                  <div className="relative overflow-hidden rounded-2xl border border-[#8fa286]/45 bg-[#e5ddc9]/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#e5ddc9]/15">
                    <span className="pointer-events-none absolute right-3 bottom-2 select-none text-7xl font-bold leading-none text-[#e5ddc9]/[0.08] tabular-nums">
                      {item.num}
                    </span>
                    <p className="relative text-xl font-semibold">
                      {item.step}
                    </p>
                    <p className="relative mt-2 text-sm leading-relaxed text-[#e5ddc9]/75">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <QuoteStepper />

        {/* Falar com Especialista */}
        <section className="bg-[#2f3c4c]/90 py-16 text-[#e5ddc9]">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#8fa286]">
                Atendimento consultivo
              </p>
              <h2 className="text-balance text-3xl font-semibold">
                Prefere falar com um especialista?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[#e5ddc9]/80">
                Para empresas, casos complexos ou quem prefere orientação
                personalizada — nossa equipe está pronta para apresentar as
                melhores opções para o seu perfil.
              </p>
              <a
                href={toWhatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#8fa286] px-8 py-3 font-semibold text-[#2f3c4c] transition hover:bg-[#7c8f75]"
              >
                Falar com especialista via WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2f3c4c]/15 bg-[#f4ede0] py-8">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-semibold">Arvor Insurance</p>
              <p className="mt-1 text-sm text-[#2f3c4c]/60">
                Corretora Sustentável
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Contato</p>
              <p className="mt-1">
                <CopyEmail email={ARVOR_CONTACT_EMAIL} />
              </p>
              <p className="mt-1 text-[#2f3c4c]/60">
                Atendimento nacional · PF, Coletivo, PJ e MEI
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Redes sociais</p>
              <div className="mt-1 flex gap-4">
                <a
                  href={ARVOR_INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2f3c4c]/70 underline hover:text-[#2f3c4c]"
                >
                  Instagram
                </a>
                <a
                  href={ARVOR_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2f3c4c]/70 underline hover:text-[#2f3c4c]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-[#2f3c4c]/10 pt-4 text-xs text-[#2f3c4c]/50">
            © {new Date().getFullYear()} Arvor Insurance · CNPJ {ARVOR_CNPJ} ·
            Corretora de Seguros · Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
