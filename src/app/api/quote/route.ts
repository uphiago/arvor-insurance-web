import { z } from "zod";

const quoteRequestSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  modality: z.string().min(2),
  personCount: z.number().int().min(1),
  ages: z.array(z.string()).min(1),
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
    return Response.json({ error: "Origem não permitida." }, { status: 403 });
  }

  try {
    const payload = quoteRequestSchema.parse(await request.json());
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return Response.json(
        { error: "GOOGLE_SHEETS_WEBHOOK_URL não configurada." },
        { status: 500 },
      );
    }

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
        { error: "Falha ao registrar solicitação no Google Sheets." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[quote] error:", err);
    return Response.json(
      { error: "Não foi possível processar a solicitação." },
      { status: 400 },
    );
  }
}
