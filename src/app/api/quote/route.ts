import { z } from "zod";

const quoteRequestSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  state: z.string().min(2),
  region: z.string().min(2),
  modality: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const payload = quoteRequestSchema.parse(await request.json());
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    console.log("[quote] webhookUrl present:", !!webhookUrl);

    if (!webhookUrl) {
      return Response.json(
        { error: "GOOGLE_SHEETS_WEBHOOK_URL não configurada." },
        { status: 500 },
      );
    }

    const body = JSON.stringify({
      createdAt: new Date().toISOString(),
      source: "arvor-site",
      ...payload,
    });

    console.log("[quote] sending to webhook:", body);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();
    console.log(
      "[quote] webhook status:",
      response.status,
      "body:",
      responseText,
    );

    if (!response.ok) {
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
