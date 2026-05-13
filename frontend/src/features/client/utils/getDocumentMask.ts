import { DOCUMENT_TYPE } from "@/features/client/types/document";

export function getDocumentMask(type: number) {
  return type === DOCUMENT_TYPE.CPF
    ? '999.999.999-99'
    : '99.999.999/9999-99'
}