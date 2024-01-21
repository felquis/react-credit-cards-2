import React from "react";
import ReactCreditCards from "../src";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockCallback = jest.fn();

const props = {
  name: "",
  number: "",
  expiry: "",
  cvc: "",
  focused: "",
  acceptedCards: [],
  callback: mockCallback,
};

const renderCreditCards = (ownProps = props) =>
  render(<ReactCreditCards {...ownProps} />);

describe("ReactCreditCards", () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it("should render properly", () => {
    renderCreditCards();

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard).toHaveClass("rccs__card--unknown");
  });

  it("should render the card front", () => {
    renderCreditCards();

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("•••• •••• •••• ••••");
    expect(rccsCard.querySelector(".rccs__name").textContent).toBe("YOUR NAME HERE");
    expect(rccsCard.querySelector(".rccs__expiry__valid").textContent).toBe("valid thru");
    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("••/••");
  });

  it("should handle locale and placeholders updates", () => {
    renderCreditCards({
      ...props,
      placeholders: { name: "------------" },
      locale: { valid: "Expiration" },
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__name").textContent).toBe("------------");
    expect(rccsCard.querySelector(".rccs__expiry__valid").textContent).toBe("Expiration");
  });

  it("should handle new number props (American Express)", () => {
    renderCreditCards({
      ...props,
      number: "378282246310005",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("3782 822463 10005");
    expect(rccsCard).toHaveClass("rccs__card--american-express");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 15,
      issuer: "american-express",
    });
  });

  it("should handle new number props (Dankort)", () => {
    renderCreditCards({
      ...props,
      number: "5019717010103742",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("5019 7170 1010 3742");
    expect(rccsCard).toHaveClass("rccs__card--dankort");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "dankort",
    });
  });

  it("should handle new number props (Diners)", () => {
    renderCreditCards({
      ...props,
      number: "30569309025904",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("3056 930902 5904");
    expect(rccsCard).toHaveClass("rccs__card--diners-club");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 14,
      issuer: "diners-club",
    });
  });

  it("should handle new number props (Discover)", () => {
    renderCreditCards({
      ...props,
      number: "6011111111111117",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("6011 1111 1111 1117");
    expect(rccsCard).toHaveClass("rccs__card--discover");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "discover",
    });
  });

  it("should handle new number props (Elo)", () => {
    renderCreditCards({
      ...props,
      number: "6362970000457013",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("6362 9700 0045 7013");
    expect(rccsCard).toHaveClass("rccs__card--elo");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "elo",
    });
  });

  it("should handle new number props (Hipercard)", () => {
    renderCreditCards({
      ...props,
      number: "3841005899088180330",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("3841 0058 9908 8180330");
    expect(rccsCard).toHaveClass("rccs__card--hipercard");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 19,
      issuer: "hipercard",
    });
  });

  it("should handle new number props (JCB)", () => {
    renderCreditCards({
      ...props,
      number: "3530111333300000",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("3530 1113 3330 0000");
    expect(rccsCard).toHaveClass("rccs__card--jcb");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "jcb",
    });
  });

  it("should handle new number props (Laser)", () => {
    renderCreditCards({
      ...props,
      number: "6709359636227382",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("6709 3596 3622 7382");
    expect(rccsCard).toHaveClass("rccs__card--laser");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "laser",
    });
  });

  it("should handle new number props (Maestro)", () => {
    renderCreditCards({
      ...props,
      number: "6304414232839699",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("6304 4142 3283 9699");
    expect(rccsCard).toHaveClass("rccs__card--maestro");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "maestro",
    });
  });

  it("should handle new number props (Mastercard)", () => {
    renderCreditCards({
      ...props,
      number: "5105105105105100",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("5105 1051 0510 5100");
    expect(rccsCard).toHaveClass("rccs__card--mastercard");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 19,
      issuer: "mastercard",
    });
  });

  it("should handle new number props (Unionpay)", () => {
    renderCreditCards({
      ...props,
      number: "6240008631401148",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("6240 0086 3140 1148");
    expect(rccsCard).toHaveClass("rccs__card--unionpay");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "unionpay",
    });
  });

  it("should handle new number props (Visa)", () => {
    renderCreditCards({
      ...props,
      number: "4012888888881881",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("4012 8888 8888 1881");
    expect(rccsCard).toHaveClass("rccs__card--visa");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 19,
      issuer: "visa",
    });
  });

  it("should handle new number props (Visa with 16 digits)", () => {
    renderCreditCards({
      ...props,
      number: "4111111111111111",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("4111 1111 1111 1111");
    expect(rccsCard).toHaveClass("rccs__card--visa");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 19,
      issuer: "visa",
    });
  });

  it("should handle new number props (Visa Electron)", () => {
    renderCreditCards({
      ...props,
      number: "4508269706217171",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("4508 2697 0621 7171");
    expect(rccsCard).toHaveClass("rccs__card--visa-electron");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 16,
      issuer: "visa-electron",
    });
  });

  it("should handle new number props with extra digits", () => {
    renderCreditCards({
      ...props,
      number: "5512888888881881000000",
      focused: "number",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("5512 8888 8888 1881000");
    expect(rccsCard).toHaveClass("rccs__card--mastercard");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 19,
      issuer: "mastercard",
    });
  });

  it("should handle new name props", () => {
    renderCreditCards({
      ...props,
      name: "John Smith",
      focused: "name",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__name").textContent).toBe("John Smith");
    expect(rccsCard.querySelector(".rccs__name")).toHaveClass("rccs--focused");
  });

  it("should handle partial expiry props", () => {
    renderCreditCards({
      ...props,
      expiry: "12/1",
      focused: "expiry",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("12/1•");
    expect(rccsCard.querySelector(".rccs__expiry")).toHaveClass(
      "rccs--focused"
    );
  });

  it("should handle long expiry props", () => {
    renderCreditCards({
      ...props,
      expiry: "01/2025",
      focused: "expiry",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("01/25");
    expect(rccsCard.querySelector(".rccs__expiry")).toHaveClass(
      "rccs--focused"
    );
  });

  it("should handle new expiry props", () => {
    renderCreditCards({
      ...props,
      expiry: "1218",
      focused: "expiry",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("12/18");
    expect(rccsCard.querySelector(".rccs__expiry")).toHaveClass(
      "rccs--focused"
    );
  });

  it("should handle empty expiry props", () => {
    renderCreditCards({
      ...props,
      expiry: "",
      focused: "expiry",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("••/••");
    expect(rccsCard.querySelector(".rccs__expiry")).toHaveClass(
      "rccs--focused"
    );
  });

  it("should handle malformatted expiry props", () => {
    renderCreditCards({
      ...props,
      expiry: "/",
      focused: "expiry",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__expiry__value").textContent).toBe("••/••");
    expect(rccsCard.querySelector(".rccs__expiry")).toHaveClass(
      "rccs--focused"
    );
  });

  it("should handle new CVC props", () => {
    renderCreditCards({
      ...props,
      cvc: "121",
      focused: "cvc",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__cvc").textContent).toBe("121");
    expect(rccsCard.querySelector(".rccs__cvc")).toHaveClass("rccs--focused");
  });

  it("should format a number into string", () => {
    renderCreditCards({
      ...props,
      number: 4111111111111111,
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(typeof rccsCard.querySelector(".rccs__number").textContent).toBe(
      "string"
    );
  });

  it("should handle preview", () => {
    renderCreditCards({
      ...props,
      number: "**** **** **** 7056",
      preview: true,
      issuer: "hipercard",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("**** **** **** 7056");
    expect(rccsCard).toHaveClass("rccs__card--hipercard");
  });

  it("should fail with preview set to false", () => {
    renderCreditCards({
      ...props,
      number: "**** **** **** 1234",
      preview: false,
      issuer: "elo",
    });

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard.querySelector(".rccs__number").textContent).toBe("•••• •••• •••• ••••");
    expect(rccsCard).not.toHaveClass("rccs__card--elo");
  });
});
