"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEP_LABELS = ["Sobre você", "Perfil do plano", "Situação atual"];

/* ── Perfis por número de vidas ─────────────────────────────── */

const LIVES_RANGES = [
  {
    value: "2-5",
    title: "2 a 5 pessoas",
    description: "Família ou pequena equipe.",
    min: 2,
    max: 5,
    detailed: true,
  },
  {
    value: "6-10",
    title: "6 a 10 pessoas",
    description: "Pequena empresa em crescimento.",
    min: 6,
    max: 10,
    detailed: true,
  },
  {
    value: "11-50",
    title: "11 a 50 vidas",
    description: "Empresa de pequeno a médio porte.",
    min: 11,
    max: 50,
    detailed: false,
  },
  {
    value: "51-100",
    title: "51 a 100 vidas",
    description: "Empresa de médio porte.",
    min: 51,
    max: 100,
    detailed: false,
  },
  {
    value: "100+",
    title: "Mais de 100 vidas",
    description: "Grandes contratos corporativos.",
    min: 101,
    max: 10000,
    detailed: false,
  },
] as const;
type LivesRange = (typeof LIVES_RANGES)[number]["value"];

const MODALITIES = [
  {
    value: "pj",
    title: "Pessoa Jurídica (PJ)",
    description: "Para empresas com CNPJ ativo.",
  },
  {
    value: "mei",
    title: "MEI",
    description: "CNPJ de Microempreendedor ativo há 6+ meses.",
  },
] as const;
type Modality = (typeof MODALITIES)[number]["value"];

const BUDGET_OPTIONS = [
  "Até R$ 5 mil/mês",
  "R$ 5 mil a R$ 15 mil/mês",
  "R$ 15 mil a R$ 50 mil/mês",
  "Acima de R$ 50 mil/mês",
  "Ainda não sei / primeiro plano",
] as const;

const MIGRATION_REASONS = [
  "Reajuste / preço alto",
  "Rede de atendimento",
  "Qualidade do atendimento",
  "Benefício para colaboradores",
  "Revisão geral do contrato",
  "Outro",
] as const;

/* ── Schemas ────────────────────────────────────────────────── */

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
type StepOneData = z.infer<typeof STEP_ONE_SCHEMA>;

type StepTwoValidatedData = {
  livesRange: LivesRange;
  modality?: Modality;
  personCount?: number;
  ages?: string[];
  cnpj?: string;
  livesApprox?: string;
  monthlyBudget?: string;
};

type StepThreeValidatedData = {
  hasActivePlan: boolean;
  currentOperator?: string;
  currentSpend?: string;
  migrationReason?: string;
};

/* ── Helpers ────────────────────────────────────────────────── */

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCnpj(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function rangeConfig(value: LivesRange | "") {
  return LIVES_RANGES.find((r) => r.value === value);
}

function modalityLabel(modality?: Modality) {
  if (!modality) return "";
  return MODALITIES.find((m) => m.value === modality)?.title ?? modality;
}

const cardClass = (selected: boolean) =>
  [
    "flex cursor-pointer flex-col rounded-2xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ae905e] has-[:focus-visible]:ring-offset-1 md:p-4",
    selected
      ? "border-[#8fa286] bg-[#8fa286]/15"
      : "border-[#2f3c4c]/20 bg-[#fffdf8]",
  ].join(" ");

const selectClass =
  "mt-1 h-10 w-full rounded-xl border border-[#2f3c4c]/25 bg-[#fffdf8] px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ae905e]";

const errorClass = "mt-1 min-h-4 text-xs text-[#c5874a]";

/* ── Componente ─────────────────────────────────────────────── */

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

  /* Step 2 state */
  const [livesRange, setLivesRange] = useState<LivesRange | "">("");
  const [modality, setModality] = useState<Modality | "">("");
  const [personCount, setPersonCount] = useState(1);
  const [ages, setAges] = useState<string[]>([""]);
  const [cnpj, setCnpj] = useState("");
  const [livesApprox, setLivesApprox] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [stepTwoError, setStepTwoError] = useState("");

  /* Step 3 state */
  const [hasActivePlan, setHasActivePlan] = useState<"" | "yes" | "no">("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [currentSpend, setCurrentSpend] = useState("");
  const [migrationReason, setMigrationReason] = useState("");
  const [stepThreeError, setStepThreeError] = useState("");

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(STEP_ONE_SCHEMA),
    mode: "onChange",
    defaultValues: { fullName: "", phone: "", email: "", acceptedTerms: false },
  });
  const watchedPhone = useWatch({
    control: stepOneForm.control,
    name: "phone",
  });
  const s1Errors = stepOneForm.formState.errors;

  const range = rangeConfig(livesRange);
  const isDetailed = !!range?.detailed;
  const needsCnpjSmall = true;

  function resetAll() {
    setStep(1);
    setStepOneData(null);
    setStepTwoData(null);
    setSubmitStatus("idle");
    setSubmitMessage("");
    setLivesRange("");
    setModality("");
    setPersonCount(1);
    setAges([""]);
    setCnpj("");
    setLivesApprox("");
    setMonthlyBudget("");
    setStepTwoError("");
    setHasActivePlan("");
    setCurrentOperator("");
    setCurrentSpend("");
    setMigrationReason("");
    setStepThreeError("");
    stepOneForm.reset();
  }

  function selectLivesRange(value: LivesRange) {
    setLivesRange(value);
    setStepTwoError("");
    const cfg = rangeConfig(value);
    if (cfg?.detailed) {
      const start = cfg.min;
      setPersonCount(start);
      setAges((prev) => {
        const next = [...prev];
        if (start > next.length)
          return [...next, ...Array<string>(start - next.length).fill("")];
        return next.slice(0, start);
      });
    }
  }

  function changePersonCount(delta: number) {
    if (!range) return;
    const next = Math.min(range.max, Math.max(range.min, personCount + delta));
    setPersonCount(next);
    setAges((prev) => {
      if (next > prev.length)
        return [...prev, ...Array<string>(next - prev.length).fill("")];
      return prev.slice(0, next);
    });
    setStepTwoError("");
  }

  function updateAge(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 3);
    setAges((prev) => prev.map((a, i) => (i === index ? digits : a)));
    setStepTwoError("");
  }

  function onSubmitStepOne(values: StepOneData) {
    setStepOneData(values);
    setStep(2);
  }

  function onSubmitStepTwo(e: React.FormEvent) {
    e.preventDefault();
    if (!range) {
      setStepTwoError("Selecione para quantas vidas é o plano.");
      return;
    }
    if (isDetailed) {
      if (!modality) {
        setStepTwoError("Selecione a modalidade do plano.");
        return;
      }
      if (ages.some((a) => a.trim() === "")) {
        setStepTwoError("Informe a idade de todas as pessoas.");
        return;
      }
      if (
        ages.some((a) => {
          const n = Number(a);
          return isNaN(n) || n < 0 || n > 110;
        })
      ) {
        setStepTwoError("Idades devem estar entre 0 e 110 anos.");
        return;
      }
      if (needsCnpjSmall && cnpj.replace(/\D/g, "").length !== 14) {
        setStepTwoError("Informe um CNPJ válido (14 dígitos).");
        return;
      }
      setStepTwoData({
        livesRange: range.value,
        modality: modality as Modality,
        personCount,
        ages,
        cnpj: needsCnpjSmall ? cnpj : undefined,
      });
    } else {
      if (cnpj.replace(/\D/g, "").length !== 14) {
        setStepTwoError("Informe um CNPJ válido (14 dígitos).");
        return;
      }
      const lives = Number(livesApprox);
      if (!livesApprox || isNaN(lives) || lives < range.min) {
        setStepTwoError(
          `Informe o número aproximado de vidas (mínimo ${range.min}).`,
        );
        return;
      }
      if (!monthlyBudget) {
        setStepTwoError("Selecione a faixa de investimento mensal.");
        return;
      }
      setStepTwoData({
        livesRange: range.value,
        cnpj,
        livesApprox,
        monthlyBudget,
      });
    }
    setStepTwoError("");
    setStep(3);
  }

  function validateStepThree(): StepThreeValidatedData | null {
    if (hasActivePlan === "") {
      setStepThreeError("Informe se você já possui um plano ativo.");
      return null;
    }
    if (hasActivePlan === "yes") {
      if (!currentOperator.trim()) {
        setStepThreeError("Informe qual é o plano/operadora atual.");
        return null;
      }
      if (!currentSpend.trim()) {
        setStepThreeError("Informe quanto você investe hoje no plano.");
        return null;
      }
      if (!migrationReason) {
        setStepThreeError("Selecione o principal motivo da migração.");
        return null;
      }
      return {
        hasActivePlan: true,
        currentOperator: currentOperator.trim(),
        currentSpend: currentSpend.trim(),
        migrationReason,
      };
    }
    return { hasActivePlan: false };
  }

  async function handleQuoteRequest(e: React.FormEvent) {
    e.preventDefault();
    const stepThreeData = validateStepThree();
    if (!stepThreeData) return;
    if (!stepOneData || !stepTwoData) {
      setSubmitStatus("error");
      setSubmitMessage("Dados incompletos. Volte e preencha todos os campos.");
      return;
    }
    setStepThreeError("");
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
          livesRange: stepTwoData.livesRange,
          companyName: "",
          modality: modalityLabel(stepTwoData.modality),
          personCount: stepTwoData.personCount ?? null,
          ages: stepTwoData.ages ?? [],
          cnpj: stepTwoData.cnpj ?? "",
          livesApprox: stepTwoData.livesApprox ?? "",
          monthlyBudget: stepTwoData.monthlyBudget ?? "",
          hasActivePlan: stepThreeData.hasActivePlan,
          currentOperator: stepThreeData.currentOperator ?? "",
          currentSpend: stepThreeData.currentSpend ?? "",
          migrationReason: stepThreeData.migrationReason ?? "",
          firstPlan: !stepThreeData.hasActivePlan,
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
        e nossa equipe entra em contato o mais breve possível.
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
        {/* ── Step 1: Sobre você ── */}
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
              <p id="fullName-error" role="alert" className={errorClass}>
                {s1Errors.fullName?.message ?? ""}
              </p>
            </div>

            <div>
              <Label htmlFor="phone">Telefone (WhatsApp)</Label>
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
              <p id="phone-error" role="alert" className={errorClass}>
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
              <p id="email-error" role="alert" className={errorClass}>
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

        {/* ── Step 2: Perfil do plano ── */}
        {step === 2 && (
          <form
            key="step-2"
            className="animate-step-in space-y-6"
            onSubmit={onSubmitStepTwo}
          >
            <div>
              <Label id="lives-label">Para quantas vidas é o plano?</Label>
              <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                Atendemos empresas com CNPJ ativo, a partir de 2 vidas. Quanto
                mais vidas, melhores as condições que conseguimos negociar.
              </p>
              <div
                role="radiogroup"
                aria-labelledby="lives-label"
                className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3"
              >
                {LIVES_RANGES.map((item) => (
                  <label
                    key={item.value}
                    className={cardClass(livesRange === item.value)}
                  >
                    <input
                      type="radio"
                      name="livesRange"
                      value={item.value}
                      checked={livesRange === item.value}
                      onChange={() => selectLivesRange(item.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                      {item.description}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Perfil detalhado: até 10 vidas */}
            {isDetailed && range && (
              <>
                <div>
                  <Label id="modality-label">Modalidade</Label>
                  <div
                    role="radiogroup"
                    aria-labelledby="modality-label"
                    className="mt-2 grid gap-3 md:grid-cols-2"
                  >
                    {MODALITIES.map((item) => (
                      <label
                        key={item.value}
                        className={cardClass(modality === item.value)}
                      >
                        <input
                          type="radio"
                          name="modality"
                          value={item.value}
                          checked={modality === item.value}
                          onChange={() => {
                            setModality(item.value);
                            setStepTwoError("");
                          }}
                          className="sr-only"
                        />
                        <span className="text-sm font-semibold">
                          {item.title}
                        </span>
                        <span className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                          {item.description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {range.max > 1 && (
                  <div>
                    <Label>Quantas pessoas exatamente?</Label>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        type="button"
                        aria-label="Diminuir número de pessoas"
                        onClick={() => changePersonCount(-1)}
                        disabled={personCount <= range.min}
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
                        disabled={personCount >= range.max}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2f3c4c]/25 bg-[#fffdf8] text-lg font-semibold transition-colors hover:bg-[#2f3c4c]/8 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                      <span className="text-sm text-[#2f3c4c]/75">
                        {personCount === 1
                          ? "1 pessoa"
                          : `${personCount} pessoas`}
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Qual a idade de cada pessoa?</Label>
                  <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                    A idade influencia diretamente no valor da mensalidade.
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
                        />
                        <span className="shrink-0 text-sm text-[#2f3c4c]/75">
                          anos
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {needsCnpjSmall && (
                  <div>
                    <Label htmlFor="cnpj-small">CNPJ da empresa</Label>
                    <Input
                      id="cnpj-small"
                      type="text"
                      inputMode="numeric"
                      placeholder="00.000.000/0000-00"
                      className="mt-1"
                      value={cnpj}
                      onChange={(e) => {
                        setCnpj(formatCnpj(e.target.value));
                        setStepTwoError("");
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Perfil corporativo: 11+ vidas */}
            {range && !isDetailed && (
              <>
                <div>
                  <Label htmlFor="cnpj-corp">CNPJ da empresa</Label>
                  <Input
                    id="cnpj-corp"
                    type="text"
                    inputMode="numeric"
                    placeholder="00.000.000/0000-00"
                    className="mt-1"
                    value={cnpj}
                    onChange={(e) => {
                      setCnpj(formatCnpj(e.target.value));
                      setStepTwoError("");
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="livesApprox">
                    Número aproximado de vidas
                  </Label>
                  <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                    Titulares e dependentes que devem entrar no plano.
                  </p>
                  <Input
                    id="livesApprox"
                    type="text"
                    inputMode="numeric"
                    placeholder={`Ex.: ${range.min + 4}`}
                    className="mt-1 max-w-40"
                    value={livesApprox}
                    onChange={(e) => {
                      setLivesApprox(
                        e.target.value.replace(/\D/g, "").slice(0, 5),
                      );
                      setStepTwoError("");
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="monthlyBudget">
                    Investimento mensal estimado em saúde
                  </Label>
                  <p className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                    Quanto a empresa investe hoje (ou pretende investir) no
                    benefício.
                  </p>
                  <select
                    id="monthlyBudget"
                    className={selectClass}
                    value={monthlyBudget}
                    onChange={(e) => {
                      setMonthlyBudget(e.target.value);
                      setStepTwoError("");
                    }}
                  >
                    <option value="">Selecione uma faixa</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <p role="alert" className={errorClass}>
              {stepTwoError}
            </p>

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
        )}

        {/* ── Step 3: Situação atual + envio ── */}
        {step === 3 && submitStatus !== "success" && (
          <form
            key="step-3"
            className="animate-step-in space-y-6"
            onSubmit={handleQuoteRequest}
          >
            <div>
              <Label id="active-plan-label">
                Você (ou sua empresa) já possui plano de saúde ativo?
              </Label>
              <div
                role="radiogroup"
                aria-labelledby="active-plan-label"
                className="mt-2 grid gap-3 sm:grid-cols-2"
              >
                <label className={cardClass(hasActivePlan === "yes")}>
                  <input
                    type="radio"
                    name="hasActivePlan"
                    value="yes"
                    checked={hasActivePlan === "yes"}
                    onChange={() => {
                      setHasActivePlan("yes");
                      setStepThreeError("");
                    }}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">
                    Sim, já tenho plano
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                    Quero comparar, reduzir custo ou migrar.
                  </span>
                </label>
                <label className={cardClass(hasActivePlan === "no")}>
                  <input
                    type="radio"
                    name="hasActivePlan"
                    value="no"
                    checked={hasActivePlan === "no"}
                    onChange={() => {
                      setHasActivePlan("no");
                      setStepThreeError("");
                    }}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">
                    Não, será o primeiro plano
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[#2f3c4c]/75">
                    Quero contratar pela primeira vez.
                  </span>
                </label>
              </div>
            </div>

            {hasActivePlan === "yes" && (
              <>
                <div>
                  <Label htmlFor="currentOperator">
                    Qual é o plano/operadora atual?
                  </Label>
                  <Input
                    id="currentOperator"
                    type="text"
                    placeholder="Ex.: Unimed, Bradesco Saúde, Amil..."
                    className="mt-1"
                    value={currentOperator}
                    onChange={(e) => {
                      setCurrentOperator(e.target.value);
                      setStepThreeError("");
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="currentSpend">
                    Quanto investe hoje no plano?
                  </Label>
                  <Input
                    id="currentSpend"
                    type="text"
                    placeholder="Ex.: R$ 2.500/mês"
                    className="mt-1 max-w-60"
                    value={currentSpend}
                    onChange={(e) => {
                      setCurrentSpend(e.target.value);
                      setStepThreeError("");
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="migrationReason">
                    Principal motivo para buscar mudança
                  </Label>
                  <select
                    id="migrationReason"
                    className={selectClass}
                    value={migrationReason}
                    onChange={(e) => {
                      setMigrationReason(e.target.value);
                      setStepThreeError("");
                    }}
                  >
                    <option value="">Selecione o motivo</option>
                    {MIGRATION_REASONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Resumo */}
            {stepOneData && stepTwoData && (
              <div className="rounded-2xl border border-[#2f3c4c]/15 bg-[#fffdf8] p-4 text-sm leading-relaxed">
                <p className="font-semibold">Resumo da solicitação</p>
                <p className="mt-1 text-[#2f3c4c]/85">
                  {stepOneData.fullName} · {stepOneData.phone} ·{" "}
                  {stepOneData.email}
                </p>
                <p className="text-[#2f3c4c]/85">
                  {rangeConfig(stepTwoData.livesRange)?.title}
                  {stepTwoData.modality
                    ? ` · ${modalityLabel(stepTwoData.modality)}`
                    : ""}
                  {stepTwoData.personCount
                    ? ` · ${stepTwoData.personCount} pessoa(s), idades: ${stepTwoData.ages?.join(", ")}`
                    : ""}
                  {stepTwoData.livesApprox
                    ? ` · ~${stepTwoData.livesApprox} vidas`
                    : ""}
                  {stepTwoData.monthlyBudget
                    ? ` · ${stepTwoData.monthlyBudget}`
                    : ""}
                  {stepTwoData.cnpj ? ` · CNPJ ${stepTwoData.cnpj}` : ""}
                </p>
              </div>
            )}

            <p role="alert" className={errorClass}>
              {stepThreeError ||
                (submitStatus === "error" ? submitMessage : "")}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading"
                  ? "Enviando..."
                  : "Solicitar Cotação"}
              </Button>
            </div>
          </form>
        )}

        {/* ── Sucesso ── */}
        {step === 3 && submitStatus === "success" && (
          <div className="animate-step-in flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8fa286] text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-semibold">Solicitação registrada!</h3>
            <p className="max-w-md text-sm leading-relaxed text-[#2f3c4c]/85">
              Recebemos seus dados e nossa equipe vai preparar sua cotação
              personalizada. Entraremos em contato pelo WhatsApp ou e-mail o
              mais breve possível.
            </p>
            <Button type="button" variant="outline" onClick={resetAll}>
              Fazer nova solicitação
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
