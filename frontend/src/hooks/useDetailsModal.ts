import { useState } from "react";

import type { Field } from "@/utils/field";

type DetailsModalPayload<T = unknown> = {
  title: string;
  data: T;
  fields: Field<T>[];
};

export function useDetailsModal() {
  const [payload, setPayload] = useState<DetailsModalPayload<any> | null>(null);

  return {
    openDetails: <T>(payload: DetailsModalPayload<T>) =>
      setPayload(payload as DetailsModalPayload<any>),
    closeDetails: () => setPayload(null),
    payload,
  };
}