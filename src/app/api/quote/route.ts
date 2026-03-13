import { z } from "zod";

const quoteRequestSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  state: z.string().min(2),
  region: z.string().min(2),
  modality: z.string().min(2),
  documents: z.array(z.string()).min(1),
});

export async function POST(request: Request) {
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date().toISOString(),
        source: "arvor-site",
        ...payload,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Falha ao registrar solicitação no Google Sheets." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Não foi possível processar a solicitação." },
      { status: 400 },
    );
  }
}
