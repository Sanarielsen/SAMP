import { useParams } from "react-router";

export function useRequiredParam(key: string): string {
  const params = useParams();
  const value = params[key];

  if (!value) {
    throw new Error(`Missing param: ${key}`);
  }

  return value;
}

export function useParamOptional(
  key: string,
  required = false
): string | undefined {
  const params = useParams();
  const value = params[key];

  if (required && !value) {
    throw new Error(`Missing param: ${key}`);
  }

  return value;
}