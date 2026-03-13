"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { ARVOR_CONTACT_EMAIL, toWhatsappUrl } from "@/lib/arvor";
import { CopyEmail } from "@/components/ui/copy-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

function modalityLabel(modality: Modality) {
  const selected = MODALITIES.find((item) => item.value === modality);
  return selected?.title ?? modality;
}

export function QuoteStepper() {
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
      modality: "",
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
      setSubmitStatus("error");
      setSubmitMessage("Dados incompletos. Volte e preencha todos os campos.");
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    setSubmitStatus("loading");
    setSubmitMessage("Enviando solicitação...");

    try {
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
        }),
        signal: controller.signal,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Solicitação registrada com sucesso. Nossa equipe retornará em até 24h úteis.",
        );
        return;
      }

      setSubmitStatus("error");
      setSubmitMessage(
        "Não foi possível enviar automaticamente. Tente novamente em instantes.",
      );
    } catch (err) {
      const timedOut = err instanceof Error && err.name === "AbortError";
      setSubmitStatus("error");
      setSubmitMessage(
        timedOut
          ? "A solicitação demorou muito. Verifique sua conexão e tente novamente."
          : "Não foi possível enviar automaticamente. Tente novamente em instantes.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section
      id="autoatendimento"
      className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8"
    >
      <h2 className="text-balance text-3xl font-semibold">
        Autoatendimento de Cotação
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#2f3c4c]/80">
        Preencha os dados em 3 etapas. Ao concluir, registramos sua solicitação
        e a equipe entra em contato.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2">
        {STEP_LABELS.map((label, index) => {
          const currentStep = index + 1;
          const allDone = submitStatus === "success";
          const done = allDone || step > currentStep;
          const active = !allDone && step === currentStep;

          return (
            <div
              key={label}
              aria-current={active ? "step" : undefined}
              className={`flex h-14 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-all duration-300 md:text-sm ${
                done
                  ? "border-[#8fa286] bg-[#8fa286] text-[#2f3c4c]"
                  : active
                    ? "border-[#ae905e] bg-[#ae905e]/20 text-[#2f3c4c]"
                    : "border-[#2f3c4c]/20 bg-[#e5ddc9] text-[#2f3c4c]/85"
              }`}
            >
              {done ? "✓ " : ""}
              {label}
            </div>
          );
        })}
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#2f3c4c]/10">
        <div
          className="h-full rounded-full bg-[#8fa286] transition-all duration-500 ease-out"
          style={{
            width:
              submitStatus === "success"
                ? "100%"
                : `${((step - 1) / (STEP_LABELS.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="mt-6 min-h-[480px] rounded-3xl border border-[#2f3c4c]/20 bg-[#f8f3e8]/70 p-5 shadow-lg backdrop-blur-xl md:p-8">
        {step === 1 ? (
          <form
            key="step-1"
            className="animate-step-in space-y-4"
            onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)}
          >
            <div>
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                className="mt-1"
                {...stepOneForm.register("fullName")}
              />
              <p className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepOneForm.formState.errors.fullName?.message ?? ""}
              </p>
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="mt-1"
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
              <p className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepOneForm.formState.errors.phone?.message ?? ""}
              </p>
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                className="mt-1"
                {...stepOneForm.register("email")}
              />
              <p className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepOneForm.formState.errors.email?.message ?? ""}
              </p>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ae905e]"
                {...stepOneForm.register("acceptedTerms")}
              />
              <span>
                Declaro que li e concordo com os Termos de Uso e a Política de
                Dados da Arvor Insurance.
              </span>
            </label>
            <p className="min-h-4 text-xs text-[#c5874a]">
              {stepOneForm.formState.errors.acceptedTerms?.message ?? ""}
            </p>

            <Button type="submit" variant="primary">
              Avançar
            </Button>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            key="step-2"
            className="animate-step-in space-y-4"
            onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}
          >
            <div>
              <Label htmlFor="state">Estado</Label>
              <select
                id="state"
                name="state"
                autoComplete="address-level1"
                className="mt-1 flex h-11 w-full rounded-xl border border-[#2f3c4c]/20 bg-[#fffdf8] px-3 py-2 text-base md:text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ae905e]/50"
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
              <p className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepTwoForm.formState.errors.state?.message ?? ""}
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">Modalidade</legend>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {MODALITIES.map((item) => (
                  <label
                    key={item.value}
                    className={`flex cursor-pointer flex-col rounded-2xl border p-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ae905e] has-[:focus-visible]:ring-offset-1 md:p-4 ${
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
                    <p className="text-sm font-semibold md:text-base">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#2f3c4c]/80">
                      {item.description}
                    </p>
                  </label>
                ))}
              </div>
              <p className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepTwoForm.formState.errors.modality?.message ?? ""}
              </p>
            </fieldset>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              <Button type="submit" variant="primary">
                Avançar
              </Button>
            </div>
          </form>
        ) : null}

        {step === 3 && stepOneData && stepTwoData ? (
          submitStatus === "success" ? (
            <div
              key="step-3-success"
              className="animate-step-in flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8fa286] text-3xl text-white">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold">Solicitação enviada!</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#2f3c4c]/75">
                  Nossa equipe retornará em até 24h úteis com as melhores opções
                  para o seu perfil.
                </p>
              </div>
              <a
                href={toWhatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#8fa286] bg-[#8fa286]/15 px-6 py-3 font-semibold text-[#2f3c4c] transition hover:bg-[#8fa286]/30"
              >
                Falar com especialista
              </a>
            </div>
          ) : (
            <div key="step-3" className="animate-step-in space-y-5">
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
                <p>Após a solicitação, envie os documentos listados para:</p>
                <div className="mt-2 font-semibold">
                  <CopyEmail email={ARVOR_CONTACT_EMAIL} />
                </div>
                <p className="mt-2 text-[#2f3c4c]/80">
                  Nossa equipe retorna em até 24h úteis.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {submitStatus !== "loading" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleQuoteRequest}
                  disabled={submitStatus === "loading"}
                  variant="primary"
                  className="min-w-44"
                >
                  {submitStatus === "loading"
                    ? "Enviando..."
                    : "Solicitar cotação"}
                </Button>
              </div>

              {submitStatus === "error" && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm text-[#c5874a]"
                >
                  {submitMessage}
                </p>
              )}
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}
