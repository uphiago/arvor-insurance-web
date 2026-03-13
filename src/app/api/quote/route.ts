import { Resend } from "resend";
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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "RESEND_API_KEY não configurada." },
        { status: 500 },
      );
    }
    const resend = new Resend(apiKey);

    const to = process.env.QUOTE_RECEIVER_EMAIL ?? "dotmindit@gmail.com";
    const from = process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev";

    const subject = `[Cotação Arvor] ${payload.modality} - ${payload.state} - ${payload.name}`;

    const sharedBody = [
      `Nome: ${payload.name}`,
      `Telefone: ${payload.phone}`,
      `E-mail: ${payload.email}`,
      `Estado: ${payload.state}`,
      `Região: ${payload.region}`,
      `Modalidade: ${payload.modality}`,
      "",
      "Documentos necessários:",
      ...payload.documents.map((doc) => `- ${doc}`),
    ].join("\n");

    await resend.emails.send({
      from,
      to,
      cc: payload.email,
      subject,
      text: [
        "Nova solicitação de cotação Arvor",
        "",
        sharedBody,
        "",
        "Esta mensagem foi enviada com cópia para o cliente.",
      ].join("\n"),
    });

    await resend.emails.send({
      from,
      to: payload.email,
      subject: "Recebemos sua solicitação de cotação - Arvor Insurance",
      text: [
        `Olá, ${payload.name}!`,
        "",
        "Recebemos sua solicitação de cotação.",
        "Nossa equipe retornará em até 24h úteis com os próximos passos.",
        "",
        sharedBody,
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Não foi possível processar a solicitação." },
      { status: 400 },
    );
  }
}
