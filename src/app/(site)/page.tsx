"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const CONTACT_EMAIL = "dimitricontro@arvorin.com.br";
const WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.";

const STEP_LABELS = ["Sobre você", "Sobre o plano", "Contratação"];

const MODALITIES = [
  {
    value: "pf",
    title: "Pessoa Física",
    description: "Ideal para você e sua família. (Mínimo 1 pessoa)",
  },
  {
    value: "adesao",
    title: "Coletivo por Adesão",
    description: "Planos via associação/diploma. (Mínimo 1 pessoa)",
  },
  {
    value: "pj",
    title: "Pessoa Jurídica (PJ)",
    description: "Ideal para sua empresa com CNPJ ativo. (Mínimo 1 pessoa)",
  },
  {
    value: "mei",
    title: "MEI",
    description:
      "Para Microempreendedores Individuais com CNPJ ativo há mais de 6 meses. (Mínimo 1 pessoa)",
  },
] as const;
type Modality = (typeof MODALITIES)[number]["value"];

const UF_LIST = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
] as const;

const REGION_BY_UF: Record<string, string[]> = {
  AC: ["Norte"],
  AL: ["Nordeste"],
  AP: ["Norte"],
  AM: ["Norte"],
  BA: ["Nordeste"],
  CE: ["Nordeste"],
  DF: ["Centro-Oeste"],
  ES: ["Sudeste"],
  GO: ["Centro-Oeste"],
  MA: ["Nordeste"],
  MT: ["Centro-Oeste"],
  MS: ["Centro-Oeste"],
  MG: ["Sudeste"],
  PA: ["Norte"],
  PB: ["Nordeste"],
  PR: ["Sul"],
  PE: ["Nordeste"],
  PI: ["Nordeste"],
  RJ: ["Sudeste"],
  RN: ["Nordeste"],
  RS: ["Sul"],
  RO: ["Norte"],
  RR: ["Norte"],
  SC: ["Sul"],
  SP: ["Sudeste"],
  SE: ["Nordeste"],
  TO: ["Norte"],
};

const STEP_ONE_SCHEMA = z.object({
  fullName: z
    .string()
    .min(1, "Informe seu nome completo.")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Informe nome e sobrenome.",
    }),
  phone: z
    .string()
    .min(1, "Informe seu telefone.")
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Telefone precisa ter 10 ou 11 dígitos.",
    })
    .refine((value) => value.replace(/\D/g, "").length <= 11, {
      message: "Telefone precisa ter 10 ou 11 dígitos.",
    }),
  email: z.string().email("Informe um e-mail válido."),
  acceptedTerms: z
    .boolean()
    .refine((value) => value, "Você precisa aceitar os termos para avançar."),
});

const STEP_TWO_SCHEMA = z.object({
  state: z.string().min(1, "Selecione o estado."),
  modality: z.string().min(1, "Selecione uma modalidade."),
});

type StepOneData = z.infer<typeof STEP_ONE_SCHEMA>;
type StepTwoData = z.infer<typeof STEP_TWO_SCHEMA>;
type StepTwoValidatedData = {
  state: string;
  region: string;
  modality: Modality;
};

const DOCUMENTS_BY_MODALITY: Record<Modality, string[]> = {
  pf: [
    "RG, CPF ou CNH",
    "E-mail",
    "Telefone",
    "Comprovante de endereço",
    "Selfie com documento",
  ],
  adesao: [
    "RG, CPF ou CNH",
    "E-mail",
    "Telefone",
    "Comprovante de endereço",
    "Selfie com documento",
    "Diploma acadêmico",
  ],
  pj: [
    "Contrato social",
    "RG, CPF ou CNH",
    "E-mail",
    "Telefone",
    "Comprovante de endereço",
  ],
  mei: [
    "Contrato social",
    "RG, CPF ou CNH",
    "E-mail",
    "Telefone",
    "Comprovante de endereço",
  ],
};

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function toWhatsappUrl() {
  return `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function modalityLabel(modality: Modality) {
  const selected = MODALITIES.find((item) => item.value === modality);
  return selected?.title ?? modality;
}

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoValidatedData | null>(
    null,
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(STEP_ONE_SCHEMA),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      acceptedTerms: false,
    },
  });

  const stepTwoForm = useForm<StepTwoData>({
    resolver: zodResolver(STEP_TWO_SCHEMA),
    mode: "onChange",
    defaultValues: {
      state: "",
      modality: undefined,
    },
  });

  const watchedState = useWatch({
    control: stepTwoForm.control,
    name: "state",
  });
  const watchedModality = useWatch({
    control: stepTwoForm.control,
    name: "modality",
  });
  const watchedPhone = useWatch({
    control: stepOneForm.control,
    name: "phone",
  });

  const selectedModality = stepTwoData?.modality
    ? stepTwoData.modality
    : MODALITIES.some((item) => item.value === watchedModality)
      ? (watchedModality as Modality)
      : undefined;
  const docs =
    selectedModality && DOCUMENTS_BY_MODALITY[selectedModality]
      ? DOCUMENTS_BY_MODALITY[selectedModality]
      : [];

  function onSubmitStepOne(values: StepOneData) {
    setStepOneData(values);
    setStep(2);
  }

  function onSubmitStepTwo(values: StepTwoData) {
    if (!MODALITIES.some((item) => item.value === values.modality)) {
      return;
    }
    setStepTwoData({
      state: values.state,
      region: REGION_BY_UF[values.state]?.[0] ?? "",
      modality: values.modality as Modality,
    });
    setStep(3);
  }

  async function handleQuoteRequest() {
    if (!stepOneData || !stepTwoData) {
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("Enviando solicitação...");

    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: stepOneData.fullName,
        phone: stepOneData.phone,
        email: stepOneData.email,
        state: stepTwoData.state,
        region: stepTwoData.region,
        modality: modalityLabel(stepTwoData.modality),
        documents: docs,
      }),
    });

    if (response.ok) {
      setSubmitStatus("success");
      setSubmitMessage(
        "Solicitação enviada com sucesso. Você receberá confirmação no seu e-mail.",
      );
      return;
    }

    setSubmitStatus("error");
    setSubmitMessage(
      "Não foi possível enviar automaticamente. Tente novamente em instantes.",
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7f2e8_0%,#e5ddc9_42%,#d9d1bc_100%)] text-[#2f3c4c]">
      <header className="sticky top-0 z-20 border-b border-[#ae905e]/35 bg-[#e5ddc9]/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a href="#inicio" className="text-lg font-semibold tracking-wide">
            Arvor Insurance
          </a>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            <a href="#sobre" className="hover:text-[#8fa286]">
              Sobre
            </a>
            <a href="#sustentavel" className="hover:text-[#8fa286]">
              Projeto Sustentável
            </a>
            <a href="#produtos" className="hover:text-[#8fa286]">
              Produtos
            </a>
            <a href="#autoatendimento" className="hover:text-[#8fa286]">
              Cotar
            </a>
          </nav>
          <a
            href={toWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#8fa286]/80 bg-[#8fa286]/80 px-4 py-2 text-sm font-semibold text-[#2f3c4c] shadow-sm transition hover:bg-[#7c8f75]"
          >
            Falar com Especialista
          </a>
        </div>
      </header>

      <main>
        <section
          id="inicio"
          className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24"
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6">
              <p className="inline-block rounded-full border border-[#ae905e] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ae905e]">
                Corredora Sustentável
              </p>
              <h1 className="text-4xl leading-tight font-semibold md:text-6xl">
                Soluções em saúde e vida para empresas e famílias.
              </h1>
              <p className="max-w-xl text-lg text-[#2f3c4c]/80">
                Atendimento consultivo para Plano de Saúde Empresarial e Seguro
                de Vida, com propósito socioambiental no centro da operação.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#autoatendimento"
                  className="rounded-full bg-[#2f3c4c] px-6 py-3 text-center font-semibold text-[#e5ddc9] transition hover:bg-[#24303d]"
                >
                  Cotar agora
                </a>
                <a
                  href={toWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#c5874a] px-6 py-3 text-center font-semibold text-[#c5874a] transition hover:bg-[#c5874a] hover:text-[#e5ddc9]"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-[#ae905e]/65 bg-[#2f3c4c]/88 p-8 text-[#e5ddc9] shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-wider text-[#8fa286]">
                Diferencial Arvor
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Proteção com impacto positivo
              </h2>
              <p className="mt-3 text-sm text-[#e5ddc9]/90">
                Parte do FCF da corretora é destinada a iniciativas
                socioambientais, reforçando crescimento, proteção e longevidade.
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-[#2f3c4c]/90 py-16 text-[#e5ddc9]">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-3 md:px-8">
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold">Missão</h2>
              <p className="mt-3 text-sm leading-6 text-[#e5ddc9]/85">
                Estruturar soluções em saúde e benefícios com atendimento
                próximo e responsável para empresas e famílias.
              </p>
            </article>
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold">Proposta de Valor</h2>
              <p className="mt-3 text-sm leading-6 text-[#e5ddc9]/85">
                Redução de absenteísmo, retenção de talentos e aumento de
                produtividade com desenho de benefícios aderente ao contexto de
                cada cliente.
              </p>
            </article>
            <article className="rounded-2xl border border-[#8fa286]/35 bg-[#e5ddc9]/10 p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold">Abrangência</h2>
              <p className="mt-3 text-sm leading-6 text-[#e5ddc9]/85">
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
          <h2 className="text-3xl font-semibold">Projeto Sustentável</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#2f3c4c]/80">
            O propósito socioambiental da Arvor está integrado ao modelo de
            negócio: parte dos resultados é direcionada a ONGs, tornando cada
            contratação também uma contribuição para iniciativas de impacto.
          </p>
        </section>

        <section
          id="produtos"
          className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8"
        >
          <h2 className="text-3xl font-semibold">Produtos</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Plano de Saúde Empresarial",
              "Coletivo por Adesão",
              "Seguro de Vida",
            ].map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-[#ae905e]/65 bg-[#f9f5ea]/55 p-6 shadow-lg backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-2 text-sm text-[#2f3c4c]/80">
                  Consultoria para identificar cobertura, rede e custo-benefício
                  mais aderentes ao perfil do cliente.
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
            <h2 className="text-3xl font-semibold">Como funciona</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["1. Cotar", "2. Escolher", "3. Contratar"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#8fa286]/45 bg-[#e5ddc9]/10 p-5 backdrop-blur-md"
                >
                  <p className="text-xl font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="autoatendimento"
          className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8"
        >
          <h2 className="text-3xl font-semibold">Autoatendimento de Cotação</h2>
          <p className="mt-2 text-sm text-[#2f3c4c]/80">
            Preencha os dados em 3 etapas. A solicitação abre seu e-mail com
            envio para a equipe Arvor e cópia para você.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2">
            {STEP_LABELS.map((label, index) => {
              const currentStep = index + 1;
              const done = step > currentStep;
              const active = step === currentStep;

              return (
                <div
                  key={label}
                  className={`flex h-14 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold md:text-sm ${
                    done
                      ? "border-[#8fa286] bg-[#8fa286] text-[#2f3c4c]"
                      : active
                        ? "border-[#ae905e] bg-[#ae905e]/20 text-[#2f3c4c]"
                        : "border-[#2f3c4c]/20 bg-[#e5ddc9] text-[#2f3c4c]/70"
                  }`}
                >
                  {done ? "✓ " : ""}
                  {label}
                </div>
              );
            })}
          </div>

          <div className="mt-6 min-h-[560px] rounded-3xl border border-[#2f3c4c]/20 bg-[#f8f3e8]/70 p-5 shadow-lg backdrop-blur-xl md:p-8">
            {step === 1 ? (
              <form
                className="space-y-4"
                onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)}
              >
                <div>
                  <label className="text-sm font-semibold" htmlFor="fullName">
                    Nome completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="mt-1 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2"
                    {...stepOneForm.register("fullName")}
                  />
                  {stepOneForm.formState.errors.fullName?.message ? (
                    <p className="mt-1 text-xs text-[#c5874a]">
                      {stepOneForm.formState.errors.fullName.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm font-semibold" htmlFor="phone">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="mt-1 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2"
                    value={watchedPhone ?? ""}
                    onChange={(event) =>
                      stepOneForm.setValue(
                        "phone",
                        formatPhone(event.target.value),
                        {
                          shouldValidate: true,
                        },
                      )
                    }
                  />
                  {stepOneForm.formState.errors.phone?.message ? (
                    <p className="mt-1 text-xs text-[#c5874a]">
                      {stepOneForm.formState.errors.phone.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm font-semibold" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2"
                    {...stepOneForm.register("email")}
                  />
                  {stepOneForm.formState.errors.email?.message ? (
                    <p className="mt-1 text-xs text-[#c5874a]">
                      {stepOneForm.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1"
                    {...stepOneForm.register("acceptedTerms")}
                  />
                  <span>
                    Declaro que li e concordo com os Termos de Uso e a Política
                    de Dados da Arvor Insurance.
                  </span>
                </label>
                {stepOneForm.formState.errors.acceptedTerms?.message ? (
                  <p className="text-xs text-[#c5874a]">
                    {stepOneForm.formState.errors.acceptedTerms.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="rounded-full bg-[#2f3c4c] px-6 py-3 font-semibold text-[#e5ddc9] transition hover:bg-[#24303d]"
                >
                  Avançar
                </button>
              </form>
            ) : null}

            {step === 2 ? (
              <form
                className="space-y-4"
                onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold" htmlFor="state">
                      Estado
                    </label>
                    <select
                      id="state"
                      className="mt-1 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2"
                      value={watchedState ?? ""}
                      onChange={(event) => {
                        stepTwoForm.setValue("state", event.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <option value="">Selecione</option>
                      {UF_LIST.map((item) => (
                        <option key={item.uf} value={item.uf}>
                          {item.name} ({item.uf})
                        </option>
                      ))}
                    </select>
                    {stepTwoForm.formState.errors.state?.message ? (
                      <p className="mt-1 text-xs text-[#c5874a]">
                        {stepTwoForm.formState.errors.state.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#2f3c4c]/70">
                      Cobertura regional
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Definida automaticamente pelo estado selecionado
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">Modalidade</p>
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    {MODALITIES.map((item) => (
                      <label
                        key={item.value}
                        className={`flex min-h-28 cursor-pointer flex-col justify-between rounded-2xl border p-4 transition ${
                          watchedModality === item.value
                            ? "border-[#8fa286] bg-[#8fa286]/15"
                            : "border-[#2f3c4c]/20 bg-[#fffdf8]"
                        }`}
                      >
                        <input
                          type="radio"
                          value={item.value}
                          className="sr-only"
                          {...stepTwoForm.register("modality")}
                        />
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-xs text-[#2f3c4c]/80">
                          {item.description}
                        </p>
                      </label>
                    ))}
                  </div>
                  {stepTwoForm.formState.errors.modality?.message ? (
                    <p className="mt-1 text-xs text-[#c5874a]">
                      {stepTwoForm.formState.errors.modality.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-[#2f3c4c]/30 px-5 py-2 font-semibold"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#2f3c4c] px-6 py-3 font-semibold text-[#e5ddc9] transition hover:bg-[#24303d]"
                  >
                    Avançar
                  </button>
                </div>
              </form>
            ) : null}

            {step === 3 && stepOneData && stepTwoData ? (
              <div className="space-y-5">
                <div className="grid gap-3 rounded-2xl bg-[#fffdf8] p-4 text-sm md:grid-cols-2">
                  <p>
                    <strong>Nome:</strong> {stepOneData.fullName}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {stepOneData.phone}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {stepOneData.email}
                  </p>
                  <p>
                    <strong>Estado:</strong> {stepTwoData.state}
                  </p>
                  <p className="md:col-span-2">
                    <strong>Modalidade:</strong>{" "}
                    {modalityLabel(stepTwoData.modality)}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffdf8] p-4">
                  <h3 className="text-lg font-semibold">
                    Documentos necessários
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
                    {docs.map((doc) => (
                      <li key={doc}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#ae905e]/60 bg-[#ae905e]/15 p-4 text-sm">
                  <p>
                    Envie os documentos listados para:{" "}
                    <strong>{CONTACT_EMAIL}</strong>
                  </p>
                  <p className="mt-1 text-[#2f3c4c]/80">
                    Você receberá esta solicitação em cópia no seu e-mail e
                    nossa equipe entrará em contato em até 24h úteis.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleQuoteRequest}
                    disabled={submitStatus === "loading"}
                    className="rounded-full bg-[#2f3c4c] px-6 py-3 font-semibold text-[#e5ddc9] transition hover:bg-[#24303d]"
                  >
                    {submitStatus === "loading"
                      ? "Enviando..."
                      : "Solicitar cotação"}
                  </button>
                  <a
                    href={toWhatsappUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#8fa286] bg-[#8fa286]/15 px-6 py-3 font-semibold text-[#2f3c4c]"
                  >
                    Falar com especialista
                  </a>
                </div>
                {submitMessage ? (
                  <p
                    className={`text-sm ${
                      submitStatus === "error"
                        ? "text-[#c5874a]"
                        : "text-[#2f3c4c]/80"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm font-semibold text-[#2f3c4c]/70 underline"
                >
                  Voltar para editar dados
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="especialista"
          className="mx-auto w-full max-w-6xl px-5 pb-16 text-center md:px-8"
        >
          <h2 className="text-3xl font-semibold">
            Prefere atendimento consultivo?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#2f3c4c]/80">
            Para empresas com cenários complexos, nossa equipe atende no
            WhatsApp para montar uma recomendação personalizada.
          </p>
          <a
            href={toWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-[#8fa286] px-8 py-3 font-semibold text-[#2f3c4c] transition hover:bg-[#7c8f75]"
          >
            Falar com Especialista
          </a>
        </section>
      </main>

      <footer className="border-t border-[#2f3c4c]/20 bg-[#2f3c4c] py-10 text-[#e5ddc9]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p>Arvor Insurance · Corredora Sustentável</p>
          <p>Contato para cotações: {CONTACT_EMAIL}</p>
          <p>Atuação nacional · PF · Coletivo por Adesão · PJ · MEI</p>
        </div>
      </footer>
    </div>
  );
}
