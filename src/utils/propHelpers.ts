import type {
  ReactCreditCardsProps,
  ReactCreditCardsPlaceholdersType,
} from "../ReactCreditCards";

export function validateForMandatoryProps(
  props: ReactCreditCardsProps
): ReactCreditCardsProps {
  const requiredPropKeys: (keyof ReactCreditCardsProps)[] = [
    "number",
    "name",
    "cvc",
    "expiry",
  ];
  // if any of required props aren't passed in (i.e. they are undefined), then throw an error
  const missingKeys: string[] = [];
  requiredPropKeys.forEach((key) => {
    if (props[key] === undefined) {
      missingKeys.push(key);
    }
  });
  if (missingKeys.length > 0) {
    throw new Error(
      `ReactCreditCards2 - Missing mandatory prop(s): ${missingKeys.join(", ")}`
    );
  }
  return props;
}

export function normalizePlaceholdersInput(
  placeholders: ReactCreditCardsProps["placeholders"]
): Required<ReactCreditCardsPlaceholdersType> {
  return {
    name: placeholders?.name ?? "YOUR NAME HERE",
  };
}
