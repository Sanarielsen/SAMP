import type { FieldValues, Path } from "react-hook-form";

import type { GridProps } from "@mui/material";

import type { OptionsControlledBox } from "@shared/types/values";


export type ApiState =
  | "IDLE"
  | "LOADING"
  | "ERROR"
  | "EMPTY"
  | "SUCCESS";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select";

export interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: FieldType;
  options?: OptionsControlledBox[];
  grid?: GridProps["size"];
}