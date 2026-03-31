import { z } from "zod";

const quoteRequestSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  modality: z.string().min(2),
  personCount: z.number().int().min(1),
  ages: z.array(z.string()).min(1),
});

const ALLOWED_ORIGINS = [
  "https://www.arvorin.com.br",
  "https://arvorin.com.br",
];

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
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
        createdAt: (() => {
          const now = new Date(Date.now() - 3 * 60 * 60 * 1000); // BRT = UTC-3
          const p = (n: number) => String(n).padStart(2, "0");
          return `${p(now.getUTCDate())}/${p(now.getUTCMonth() + 1)}/${now.getUTCFullYear()} ${p(now.getUTCHours())}:${p(now.getUTCMinutes())}`;
        })(),
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
