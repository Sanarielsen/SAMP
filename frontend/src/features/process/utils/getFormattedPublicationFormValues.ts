
import { formatAsVisualOnlyDate } from "@/utils/formatDate2";

import type { Publication } from "@shared/types/publication";


export const getFormattedPublicationFormValues = (publication: Publication) => {
  
  return {
    ...publication,
    grantDate: publication.grantDate
      ? formatAsVisualOnlyDate(publication.grantDate)
      : undefined,
    publicationDate: publication.publicationDate
      ? formatAsVisualOnlyDate(publication.publicationDate)
      : undefined,
    depositDate: publication.depositDate
      ? formatAsVisualOnlyDate(publication.depositDate)
      : undefined,
  }
}