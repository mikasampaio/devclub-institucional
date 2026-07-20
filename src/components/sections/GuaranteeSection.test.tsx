import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GuaranteeSection from "./GuaranteeSection";

describe("<GuaranteeSection />", () => {
  it("interpola o número de dias vindo via prop no selo e no aria-label", () => {
    render(
      <GuaranteeSection
        title="E se eu não curtir?"
        description="Peça reembolso integral, sem burocracia."
        days={30}
      />,
    );

    // Prazo interpolado no aria-label do selo (role="img").
    expect(
      screen.getByRole("img", { name: "Garantia de 30 dias" }),
    ).toBeInTheDocument();

    // E interpolado no texto visível do selo.
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("usa 15 dias como padrão quando `days` não é informado", () => {
    render(
      <GuaranteeSection
        title="E se eu não curtir?"
        description="Peça reembolso integral, sem burocracia."
      />,
    );

    expect(
      screen.getByRole("img", { name: "Garantia de 15 dias" }),
    ).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renderiza o título como heading semântico (h2) e a descrição", () => {
    render(
      <GuaranteeSection
        title="E se eu não curtir?"
        description="Peça reembolso integral, sem burocracia."
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "E se eu não curtir?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Peça reembolso integral, sem burocracia."),
    ).toBeInTheDocument();
  });
});
