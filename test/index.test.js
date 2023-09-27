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

    expect(rccsCard).toHaveTextContent("•••• •••• •••• ••••");
    expect(rccsCard).toHaveTextContent("YOUR NAME HERE");
    expect(rccsCard).toHaveTextContent("valid thru");
    expect(rccsCard).toHaveTextContent("••/••");
  });

  it("should handle locale and placeholders updates", () => {
    const currentProps = {
      ...props,
      placeholders: { name: "------------" },
      locale: { valid: "Expiration" },
    };
    renderCreditCards(currentProps);

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard).toHaveTextContent(currentProps.placeholders.name);
    expect(rccsCard).toHaveTextContent(currentProps.locale.valid);
  });

  it("should handle new number props (American Express)", () => {
    const currentProps = {
      ...props,
      number: "378282246310005",
      focused: "number",
    };
    renderCreditCards(currentProps);

    const rccs = screen.getByTestId("rccs");
    const rccsCard = within(rccs).getByTestId("rccs__card");

    expect(rccsCard).toHaveTextContent("3782 822463 10005");
    expect(rccsCard.querySelector(".rccs__number")).toHaveClass(
      "rccs--focused"
    );
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback.mock.calls[0][0]).toStrictEqual({
      maxLength: 15,
      issuer: "american-express",
    });
  });
});
