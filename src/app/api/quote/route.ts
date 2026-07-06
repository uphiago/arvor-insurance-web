import { z } from "zod";

const quoteRequestSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  livesRange: z.string().min(1),
  companyName: z.string().optional().default(""),
  modality: z.string().optional().default(""),
  personCount: z.number().int().min(1).nullable().optional(),
  ages: z.array(z.string()).optional().default([]),
  cnpj: z.string().optional().default(""),
  livesApprox: z.string().optional().default(""),
  monthlyBudget: z.string().optional().default(""),
  hasActivePlan: z.boolean(),
  currentOperator: z.string().optional().default(""),
  currentSpend: z.string().optional().default(""),
  migrationReason: z.string().optional().default(""),
  firstPlan: z.boolean().optional().default(false),
});

function isAllowedOrigin(origin: string) {
  if (
    origin === "https://www.arvorin.com.br" ||
    origin === "https://arvorin.com.br"
  )
    return true;
  if (/^https:\/\/arvor-insurance-web[^.]*\.vercel\.app$/.test(origin))
    return true;
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !isAllowedOrigin(origin)) {
    return Response.json({ error: "Origem nao permitida." }, { status: 403 });
  }

  try {
    const payload = quoteRequestSchema.parse(await request.json());
    const webhookUrl =
      process.env.QUOTE_WEBHOOK_URL ??
      "https://arvor-n8n-editor.jmaqs0.easypanel.host/webhook/arvorin-cotacao";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        createdAt: new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
        source: "arvor-site",
        ...payload,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      console.error("[quote] webhook error:", response.status);
      return Response.json(
        { error: "Falha ao registrar a solicitacao." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote] error:", err);
    return Response.json(
      { error: "Nao foi possivel processar a solicitacao." },
      { status: 400 },
    );
  }
}
