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
import { SmoothLink } from "@/components/ui/smooth-link";
import { MobileNav } from "@/components/site/mobile-nav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7f2e8_0%,#e5ddc9_42%,#d9d1bc_100%)] text-[#2f3c4c]">
      <header className="sticky top-0 z-20 border-b border-[#ae905e]/35 bg-[#e5ddc9]/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <SmoothLink
            to="inicio"
            className="cursor-pointer text-lg font-semibold tracking-wide"
          >
            Arvor Insurance
          </SmoothLink>
          <nav
            className="hidden items-center gap-5 text-sm md:flex"
            aria-label="Navegação principal"
          >
            <SmoothLink
              to="sobre"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Sobre
            </SmoothLink>
            <SmoothLink
              to="sustentavel"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Projeto Sustentável
            </SmoothLink>
            <SmoothLink
              to="produtos"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Produtos
            </SmoothLink>
            <SmoothLink
              to="autoatendimento"
              className="cursor-pointer hover:text-[#8fa286] focus-visible:rounded-sm"
            >
              Cotar
            </SmoothLink>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={toWhatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="hidden cursor-pointer rounded-full border border-[#8fa286]/80 bg-[#8fa286]/80 px-4 py-2 text-sm font-semibold text-[#2f3c4c] shadow-sm transition hover:bg-[#7c8f75] md:inline-flex"
            >
              Falar com Especialista
            </a>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="conteudo-principal">
        {/* Hero */}
        <section id="inicio" className="relative overflow-hidden">
          {/* Background image */}
          <img
            src="/hero-image-full.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f3c4c]/80 via-[#2f3c4c]/55 to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-36">
            <div className="max-w-xl space-y-6">
              <p className="animate-hero-item [animation-delay:80ms] inline-block rounded-full border border-[#ae905e] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ae905e]">
                Corretora Sustentável
              </p>
              <h1 className="animate-hero-item [animation-delay:180ms] text-balance text-4xl font-semibold leading-tight text-[#e5ddc9] md:text-5xl">
                Cuide da sua Saúde e do Planeta, conheça a Arvor.
              </h1>
              <p className="animate-hero-item [animation-delay:280ms] text-lg leading-relaxed text-[#e5ddc9]/85">
                A Arvor Insurance é uma corretora especializada em planos de
                saúde empresarial e individual, com um diferencial de propósito:
                parte dos resultados é direcionada a iniciativas
                socioambientais, reforçando o conceito de Corretora Sustentável.
              </p>
              <div className="animate-hero-item [animation-delay:360ms] flex flex-col gap-3 sm:flex-row">
                <SmoothLink
                  to="autoatendimento"
                  className="inline-flex items-center justify-center rounded-full bg-[#e5ddc9] px-6 py-3 text-center font-semibold text-[#2f3c4c] transition hover:bg-[#d9d1bc]"
                >
                  Cotar agora
                </SmoothLink>
                <a
                  href={toWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#e5ddc9]/70 px-6 py-3 text-center font-semibold text-[#e5ddc9] transition hover:bg-[#e5ddc9]/15"
                >
                  Falar com especialista
                </a>
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
                  desc: "Estruturar soluções em saúde e benefícios para empresas e famílias, com atendimento consultivo, próximo e responsável, promovendo segurança, bem-estar, confiança e impacto positivo na vida das pessoas.",
                },
                {
                  num: "02",
                  title: "Visão",
                  desc: "Ser referência em soluções de seguros, saúde e benefícios, reconhecida pela atuação consultiva, sustentável e humana, gerando proteção, confiança e valor duradouro para empresas, famílias e para a sociedade.",
                },
                {
                  num: "03",
                  title: "Valores",
                  desc: "Ética, transparência, sustentabilidade e excelência definem a forma como a Arvor Insurance constrói relações sólidas e entrega soluções com responsabilidade, confiança e alto padrão de atendimento.",
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
                desc: "Cobertura para empresas, com foco em retenção de talentos, aumento de produtividade, ajudando a reduzir o absenteísmo e presenteísmo nas organizações.",
              },
              {
                title: "Coletivo por Adesão",
                desc: "Planos acessíveis via associação ou diploma, ideais para profissionais liberais e autônomos.",
              },
              {
                title: "Plano de Saúde Individual",
                desc: "Planos individuais ou familiares personalizados, com coberturas ajustadas ao contexto de cada um.",
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
                Fale com um especialista da Arvor.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[#e5ddc9]/80">
                Para quem prefere o atendimento humano e orientação
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
              <div className="mt-2 flex gap-3">
                <a
                  href={ARVOR_INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram da Arvor Insurance"
                  className="flex items-center gap-1.5 text-[#2f3c4c]/60 transition hover:text-[#2f3c4c]"
                >
                  {/* Instagram logo */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-xs">Instagram</span>
                </a>
                <a
                  href={ARVOR_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn da Arvor Insurance"
                  className="flex items-center gap-1.5 text-[#2f3c4c]/60 transition hover:text-[#2f3c4c]"
                >
                  {/* LinkedIn logo */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs">LinkedIn</span>
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
