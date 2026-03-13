import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { describe, expect, it } from "vitest";

async function advanceToStepTwo() {
  fireEvent.change(screen.getByLabelText("Nome completo"), {
    target: { value: "Maria Silva" },
  });
  fireEvent.change(screen.getByLabelText("Telefone"), {
    target: { value: "(11) 91234-5678" },
  });
  fireEvent.change(screen.getByLabelText("E-mail"), {
    target: { value: "maria@exemplo.com" },
  });
  fireEvent.click(
    screen.getByLabelText(
      "Declaro que li e concordo com os Termos de Uso e a Política de Dados da Arvor Insurance.",
    ),
  );
  fireEvent.click(screen.getByRole("button", { name: "Avançar" }));
  await screen.findByLabelText("Estado");
}

async function advanceToStepThree() {
  fireEvent.change(screen.getByLabelText("Estado"), {
    target: { value: "SP" },
  });
  fireEvent.click(screen.getByText("Pessoa Física"));
  fireEvent.click(screen.getByRole("button", { name: "Avançar" }));
  await screen.findByText("Documentos necessários");
}

describe("Quote flow UX", () => {
  it("does not ask for manual region selection in step 2", async () => {
    render(<HomePage />);
    await advanceToStepTwo();

    await waitFor(() => {
      expect(screen.queryByLabelText("Região")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Região identificada automaticamente"),
      ).not.toBeInTheDocument();
    });
  });

  it("uses solicitacao CTA and removes copy-email action in step 3", async () => {
    render(<HomePage />);
    await advanceToStepTwo();
    await advanceToStepThree();

    expect(
      screen.getByRole("button", { name: "Solicitar cotação" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Copiar e-mail" }),
    ).not.toBeInTheDocument();
  });
});
