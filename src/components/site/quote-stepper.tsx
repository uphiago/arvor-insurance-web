"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { toWhatsappUrl } from "@/lib/arvor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEP_LABELS = ["Sobre você", "Sobre o plano", "Solicitar Cotação"];

const MODALITIES = [
  {
    value: "pf",
    title: "Pessoa Física",
    description: "Ideal para você e sua família. (Mínimo 1 pessoa)",
  },
  {
    value: "adesao",
    title: "Coletivo por Adesão",
    description:
      "Contratado por meio de uma entidade de classe ou associação profissional, com intermediação de uma administradora de benefícios.",
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

const STEP_ONE_SCHEMA = z.object({
  fullName: z
    .string()
    .min(1, "Informe seu nome completo.")
    .refine((v) => v.trim().split(/\s+/).length >= 2, {
      message: "Informe nome e sobrenome.",
    }),
  phone: z
    .string()
    .min(1, "Informe seu telefone.")
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Telefone precisa ter 10 ou 11 dígitos.",
    })
    .refine((v) => v.replace(/\D/g, "").length <= 11, {
      message: "Telefone precisa ter 10 ou 11 dígitos.",
    }),
  email: z.string().email("Informe um e-mail válido."),
  acceptedTerms: z
    .boolean()
    .refine((v) => v, "Você precisa aceitar os termos para avançar."),
});

const STEP_TWO_SCHEMA = z.object({
  modality: z.string().min(1, "Selecione uma modalidade."),
});

type StepOneData = z.infer<typeof STEP_ONE_SCHEMA>;
type StepTwoData = z.infer<typeof STEP_TWO_SCHEMA>;
type StepTwoValidatedData = {
  modality: Modality;
  personCount: number;
  ages: string[];
};

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function modalityLabel(modality: Modality) {
  return MODALITIES.find((item) => item.value === modality)?.title ?? modality;
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

  const [personCount, setPersonCount] = useState(1);
  const [ages, setAges] = useState<string[]>([""]);
  const [ageError, setAgeError] = useState("");

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(STEP_ONE_SCHEMA),
    mode: "onChange",
    defaultValues: { fullName: "", phone: "", email: "", acceptedTerms: false },
  });

  const stepTwoForm = useForm<StepTwoData>({
    resolver: zodResolver(STEP_TWO_SCHEMA),
    mode: "onChange",
    defaultValues: { modality: "" },
  });

  const watchedModality = useWatch({
    control: stepTwoForm.control,
    name: "modality",
  });
  const watchedPhone = useWatch({
    control: stepOneForm.control,
    name: "phone",
  });

  function resetAll() {
    setStep(1);
    setStepOneData(null);
    setStepTwoData(null);
    setSubmitStatus("idle");
    setSubmitMessage("");
    setPersonCount(1);
    setAges([""]);
    setAgeError("");
    stepOneForm.reset();
    stepTwoForm.reset();
  }

  function changePersonCount(delta: number) {
    const next = Math.max(1, personCount + delta);
    setPersonCount(next);
    setAges((prev) => {
      if (next > prev.length)
        return [...prev, ...Array<string>(next - prev.length).fill("")];
      return prev.slice(0, next);
    });
    setAgeError("");
  }

  function updateAge(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 3);
    setAges((prev) => prev.map((a, i) => (i === index ? digits : a)));
    setAgeError("");
  }

  function onSubmitStepOne(values: StepOneData) {
    setStepOneData(values);
    setStep(2);
  }

  function onSubmitStepTwo(values: StepTwoData) {
    if (!MODALITIES.some((item) => item.value === values.modality)) return;
    if (ages.some((a) => a.trim() === "")) {
      setAgeError("Informe a idade de todas as pessoas.");
      return;
    }
    const invalidAge = ages.some((a) => {
      const n = Number(a);
      return isNaN(n) || n < 0 || n > 110;
    });
    if (invalidAge) {
      setAgeError("Idades devem estar entre 0 e 110 anos.");
      return;
    }
    setStepTwoData({
      modality: values.modality as Modality,
      personCount,
      ages,
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
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: stepOneData.fullName,
          phone: stepOneData.phone,
          email: stepOneData.email,
          modality: modalityLabel(stepTwoData.modality),
          personCount: stepTwoData.personCount,
          ages: stepTwoData.ages,
        }),
        signal: controller.signal,
      });
      if (response.ok) {
        setSubmitStatus("success");
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

  const s1Errors = stepOneForm.formState.errors;

  return (
    <section
      id="autoatendimento"
      className="mx-auto w-full max-w-4xl px-5 py-16 md:px-8"
    >
      <h2 className="text-balance text-3xl font-semibold">
        Autoatendimento de Cotação
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#2f3c4c]/90">
        Preencha os dados em 3 etapas. Ao concluir, registramos sua solicitação
        e a equipe entra em contato. Entraremos em contato em até 24h.
      </p>

      {/* Step indicators */}
      <div className="mt-8 grid grid-cols-3 gap-2">
        {STEP_LABELS.map((label, index) => {
          const n = index + 1;
          const allDone = submitStatus === "success";
          const done = allDone || step > n;
          const active = !allDone && step === n;
          return (
            <div
              key={label}
              aria-current={active ? "step" : undefined}
              className={[
                "flex h-14 items-center justify-center rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-all duration-300 md:text-sm",
                done
                  ? "border-[#8fa286] bg-[#8fa286] text-[#2f3c4c]"
                  : active
                    ? "border-[#ae905e] bg-[#ae905e]/20 text-[#2f3c4c]"
                    : "border-[#2f3c4c]/20 bg-[#e5ddc9] text-[#2f3c4c]/85",
              ].join(" ")}
            >
              {done ? "✓ " : ""}
              {label}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
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

      {/* Card */}
      <div className="mt-6 min-h-[480px] rounded-3xl border border-[#2f3c4c]/20 bg-[#f8f3e8]/90 p-5 shadow-lg backdrop-blur-sm md:p-8">
        {/* ── Step 1 ── */}
        {step === 1 && (
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
                aria-invalid={!!s1Errors.fullName}
                aria-describedby="fullName-error"
                {...stepOneForm.register("fullName")}
              />
              <p
                id="fullName-error"
                role="alert"
                className="mt-1 min-h-4 text-xs text-[#c5874a]"
              >
                {s1Errors.fullName?.message ?? ""}
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
                aria-invalid={!!s1Errors.phone}
                aria-describedby="phone-error"
                value={watchedPhone ?? ""}
                onChange={(e) =>
                  stepOneForm.setValue("phone", formatPhone(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
              <p
                id="phone-error"
                role="alert"
                className="mt-1 min-h-4 text-xs text-[#c5874a]"
              >
                {s1Errors.phone?.message ?? ""}
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
                aria-invalid={!!s1Errors.email}
                aria-describedby="email-error"
                {...stepOneForm.register("email")}
              />
              <p
                id="email-error"
                role="alert"
                className="mt-1 min-h-4 text-xs text-[#c5874a]"
              >
                {s1Errors.email?.message ?? ""}
              </p>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ae905e]"
                aria-describedby="terms-error"
                {...stepOneForm.register("acceptedTerms")}
              />
              <span>
                Declaro que li e concordo com os{" "}
                <Link
                  href="/termos"
                  target="_blank"
                  className="underline underline-offset-2 hover:text-[#2f3c4c]"
                >
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link
                  href="/privacidade"
                  target="_blank"
                  className="underline underline-offset-2 hover:text-[#2f3c4c]"
                >
                  Política de Privacidade
                </Link>{" "}
                da Arvor Insurance.
              </span>
            </label>
            <p
              id="terms-error"
              role="alert"
              className="min-h-4 text-xs text-[#c5874a]"
            >
              {s1Errors.acceptedTerms?.message ?? ""}
            </p>

            <Button type="submit" variant="primary">
              Avançar
            </Button>
          </form>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <form
            key="step-2"
            className="animate-step-in space-y-6"
            onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}
          >
            {/* Contador de pessoas */}
            <div>
              <Label>Quantas pessoas serão incluídas no plano?</Label>
              <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                Informe o número total de vidas que serão cobertas, incluindo
                titulares e dependentes. Quanto mais vidas, melhores condições
                podemos oferecer.
              </p>
              <div className="mt-3 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Diminuir número de pessoas"
                  onClick={() => changePersonCount(-1)}
                  disabled={personCount <= 1}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2f3c4c]/25 bg-[#fffdf8] text-lg font-semibold transition-colors hover:bg-[#2f3c4c]/8 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="w-8 text-center text-xl font-semibold tabular-nums"
                >
                  {personCount}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar número de pessoas"
                  onClick={() => changePersonCount(1)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2f3c4c]/25 bg-[#fffdf8] text-lg font-semibold transition-colors hover:bg-[#2f3c4c]/8"
                >
                  +
                </button>
                <span className="text-sm text-[#2f3c4c]/75">
                  {personCount === 1 ? "1 pessoa" : `${personCount} pessoas`}
                </span>
              </div>
            </div>

            {/* Idades */}
            <div>
              <Label>Qual a idade de cada pessoa?</Label>
              <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                Informe a idade de cada pessoa que será incluída no plano. A
                idade influencia diretamente no valor da mensalidade.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {ages.map((age, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Idade"
                      value={age}
                      onChange={(e) => updateAge(i, e.target.value)}
                      aria-label={`Idade da pessoa ${i + 1}`}
                      aria-invalid={
                        ageError !== "" &&
                        (age.trim() === "" || Number(age) > 110)
                      }
                    />
                    <span className="shrink-0 text-sm text-[#2f3c4c]/75">
                      anos
                    </span>
                  </div>
                ))}
              </div>
              <p
                id="age-error"
                role="alert"
                className="mt-1 min-h-4 text-xs text-[#c5874a]"
              >
                {ageError}
              </p>
            </div>

            {/* Modalidade */}
            <fieldset>
              <legend className="text-sm font-semibold">Modalidade</legend>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {MODALITIES.map((item) => (
                  <label
                    key={item.value}
                    className={[
                      "flex cursor-pointer flex-col rounded-2xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ae905e] has-[:focus-visible]:ring-offset-1 md:p-4",
                      watchedModality === item.value
                        ? "border-[#8fa286] bg-[#8fa286]/15"
                        : "border-[#2f3c4c]/20 bg-[#fffdf8]",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      value={item.value}
                      className="sr-only"
                      {...stepTwoForm.register("modality")}
                    />
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#2f3c4c]/80">
                      {item.description}
                    </p>
                  </label>
                ))}
              </div>
              <p role="alert" className="mt-1 min-h-4 text-xs text-[#c5874a]">
                {stepTwoForm.formState.errors.modality?.message ?? ""}
              </p>
            </fieldset>

            <div className="flex flex-wrap items-center gap-3">
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
        )}

        {/* ── Step 3 ── */}
        {step === 3 &&
          stepOneData &&
          stepTwoData &&
          (submitStatus === "success" ? (
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
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#8fa286] bg-[#8fa286]/15 px-6 py-3 font-semibold text-[#2f3c4c] transition-colors hover:bg-[#8fa286]/30"
              >
                Falar com especialista
              </a>
              <button
                type="button"
                onClick={resetAll}
                className="text-sm text-[#2f3c4c]/60 underline underline-offset-2 transition-colors hover:text-[#2f3c4c]"
              >
                Fazer nova cotação
              </button>
            </div>
          ) : (
            <div key="step-3" className="animate-step-in space-y-5">
              {/* Resumo */}
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
                  <strong>Pessoas:</strong> {stepTwoData.personCount}
                </p>
                <p>
                  <strong>Idades:</strong> {stepTwoData.ages.join(", ")} anos
                </p>
                <p className="md:col-span-2">
                  <strong>Modalidade:</strong>{" "}
                  {modalityLabel(stepTwoData.modality)}
                </p>
              </div>

              {/* Aviso de contato */}
              <div className="rounded-2xl border border-[#ae905e]/60 bg-[#ae905e]/15 p-4 text-sm">
                <p className="leading-relaxed text-[#2f3c4c]/85">
                  Após a solicitação, nossa equipe entrará em contato via
                  WhatsApp em até 24h úteis.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={submitStatus === "loading"}
                >
                  Voltar
                </Button>
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
                  role="alert"
                  aria-live="polite"
                  className="text-sm text-[#c5874a]"
                >
                  {submitMessage}
                </p>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
