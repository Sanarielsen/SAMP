export function getErrorMessage(
  error: any
): string | undefined {

  if (!error) {
    return undefined;
  }

  if (
    typeof error.message === "string"
  ) {
    return error.message;
  }
  const nestedKeys = [
    "cep",
    "street",
    "number",
    "district",
    "city",
    "state",
    "country",
  ];

  for (const key of nestedKeys) {
    const nestedError = error[key];

    if (
      nestedError &&
      typeof nestedError.message ===
        "string"
    ) {
      return nestedError.message;
    }
  }

  return undefined;
}