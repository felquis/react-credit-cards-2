import { useState } from "react";

import ReactCreditCards, { Focused } from "../..";
import "./App.css";
import "../../dist/es/styles-compiled.css";

const CardNumbers = [
  "",
  "4242424242424242",
  "5200828282828210",
  6011000990139424,
];
const CardNames = ["", "John Doe"];
const CardFocusStates: Focused[] = ["number", "name", "cvc", "expiry"];

function App() {
  const [number, setNumber] = useState<string | number>("");
  const [name, setName] = useState<string>("");
  const [focused, setFocused] = useState<Focused | null>(null);

  return (
    <div className="App">
      <h1>React-Credit-Cards-2 Testing</h1>
      <ReactCreditCards
        cvc="123"
        name={name}
        number={number}
        expiry=""
        {...(focused ? { focused } : {})}
      />

      <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
        <div>
          <p>Set a card number</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardNumbers.map((cardNumber) => (
              <button key={cardNumber} onClick={() => setNumber(cardNumber)}>
                {cardNumber === "" ? "Empty" : cardNumber}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a name</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardNames.map((cardName) => (
              <button key={cardName} onClick={() => setName(cardName)}>
                {cardName === "" ? "Empty" : cardName}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a focus state</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {["", ...CardFocusStates].map((cardFocus) => (
              <button
                key={cardFocus}
                onClick={() =>
                  setFocused(cardFocus ? (cardFocus as any) : null)
                }
              >
                {cardFocus === "" ? "Empty" : cardFocus}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
