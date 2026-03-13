import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { describe, expect, it } from "vitest";

describe("HomePage", () => {
  it("renders institutional sections and quote flow heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Soluções em saúde e vida para empresas e famílias.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Autoatendimento de Cotação" }),
    ).toBeInTheDocument();
  });
});
