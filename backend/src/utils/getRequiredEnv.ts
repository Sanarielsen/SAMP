import { MissingEnvironmentVariableError } from "@/services/errors/missing-environment-variable-error";


export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new MissingEnvironmentVariableError();
  }

  return value;
}