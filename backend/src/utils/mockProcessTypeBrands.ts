export const PROCESS_BRAND_TYPES = [
  {
    processType: "Sem título",
    title: "Sem título",
    regex: /^sem\s+t[íi]tulo$/i,
  },
  {
    processType: "Exigência formal",
    title: "Exigência formal",
    regex: /^exigência\s+formal\b/i,
  },
  {
    processType: "Publicação de pedido de registro para oposição",
    title: "Publicação de pedido de registro para oposição (exame formal de designação concluído)",
    regex: /^publicação\s+de\s+pedido\s+de\s+registro\s+para\s+oposição\b/i,
  },
  {
    processType: "Republicação de designação",
    title: "Republicação de designação",
    regex: /^republicação\s+de\s+designação\b/i,
  },
  {
    processType: "Republicação de pedido",
    title: "Republicação de pedido",
    regex: /^republicação\s+de\s+pedido\b/i,
  },
  {
    processType: "Notificação de oposição",
    title: "Notificação de oposição",
    regex: /^notificação\s+de\s+oposição\b/i,
  },
  {
    processType: "Exigência de mérito",
    title: "Exigência de mérito",
    regex: /^exigência\s+de\s+mérito\b/i,
  },
  {
    processType: "Exigência de mérito em designação",
    title: "Exigência de mérito em designação",
    regex: /^exigência\s+de\s+mérito\s+em\s+designação\b/i,
  },
  {
    processType: "Sobrestamento do exame de mérito",
    title: "Sobrestamento do exame de mérito",
    regex: /^sobrestamento\s+do\s+exame\s+de\s+mérito\b/i,
  },
  {
    processType: "Sobrestamento do exame de mérito de designação",
    title: "Sobrestamento do exame de mérito de designação",
    regex: /^sobrestamento\s+do\s+exame\s+de\s+mérito\s+de\s+designação\b/i,
  },
  {
    processType: "Indeferimento do pedido",
    title: "Indeferimento do pedido",
    regex: /^indeferimento\s+do\s+pedido\b/i,
  },
  {
    processType: "Indeferimento de designação",
    title: "Indeferimento de designação",
    regex: /^indeferimento\s+de\s+designação\b/i,
  },
  {
    processType: "Deferimento do pedido",
    title: "Deferimento do pedido",
    regex: /^deferimento\s+do\s+pedido\b/i,
  },
  {
    processType: "Deferimento da petição",
    title: "Deferimento da petição",
    regex: /^deferimento\s+da\s+petição\b/i,
  },
  {
    processType: "Deferimento de designação",
    title: "Deferimento de designação",
    regex: /^deferimento\s+de\s+designação\b/i,
  },
  {
    processType: "Deferimento parcial de designação",
    title: "Deferimento parcial de designação",
    regex: /^deferimento\s+parcial\s+de\s+designação\b/i,
  },
  {
    processType: "Decisão de considerar pedido inexistente por falta de pagamento",
    title: "Decisão de considerar pedido inexistente por falta de pagamento",
    regex: /^decisão\s+de\s+considerar\s+pedido\s+inexistente\s+por\s+falta\s+de\s+pagamento\b/i,
  },
  {
    processType: "Decisão de considerar pedido inexistente por exigência de pagamento não respondida",
    title: "Decisão de considerar pedido inexistente por exigência de pagamento não respondida",
    regex: /^decisão\s+de\s+considerar\s+pedido\s+inexistente\s+por\s+exigência\s+de\s+pagamento\s+não\s+respondida\b/i,
  },
  {
    processType: "Decisão de considerar pedido inexistente por exigência formal não respondida",
    title: "Decisão de considerar pedido inexistente por exigência formal não respondida",
    regex: /^decisão\s+de\s+considerar\s+pedido\s+inexistente\s+por\s+exigência\s+formal\s+não\s+respondida\b/i,
  },
  {
    processType: "Arquivamento definitivo de pedido de registro por falta de procuração",
    title: "Arquivamento definitivo de pedido de registro por falta de procuração",
    regex: /^arquivamento\s+definitivo\s+de\s+pedido\s+de\s+registro\s+por\s+falta\s+de\s+procuração\b/i,
  },
  {
    processType: "Arquivamento definitivo de pedido de registro por falta de documentos de marca de certificação",
    title: "Arquivamento definitivo de pedido de registro por falta de documentos de marca de certificação",
    regex: /^arquivamento\s+definitivo\s+de\s+pedido\s+de\s+registro\s+por\s+falta\s+de\s+documentos\s+de\s+marca\s+de\s+certificação\b/i,
  },
  {
    processType: "Arquivamento definitivo de pedido de registro por falta de documentos de marca coletiva",
    title: "Arquivamento definitivo de pedido de registro por falta de documentos de marca coletiva",
    regex: /^arquivamento\s+definitivo\s+de\s+pedido\s+de\s+registro\s+por\s+falta\s+de\s+documentos\s+de\s+marca\s+coletiva\b/i,
  },
  {
    processType: "Arquivamento definitivo de pedido de registro por falta de cumprimento de exigência de mérito",
    title: "Arquivamento definitivo de pedido de registro por falta de cumprimento de exigência de mérito",
    regex: /^arquivamento\s+definitivo\s+de\s+pedido\s+de\s+registro\s+por\s+falta\s+de\s+cumprimento\s+de\s+exigência\s+de\s+mérito\b/i,
  },
  {
    processType: "Arquivamento definitivo de designação por falta de cumprimento de exigência de mérito",
    title: "Arquivamento definitivo de designação por falta de cumprimento de exigência de mérito",
    regex: /^arquivamento\s+definitivo\s+de\s+designação\s+por\s+falta\s+de\s+cumprimento\s+de\s+exigência\s+de\s+mérito\b/i,
  },
  {
    processType: "Arquivamento definitivo de pedido de registro por falta de pagamento da concessão",
    title: "Arquivamento definitivo de pedido de registro por falta de pagamento da concessão",
    regex: /^arquivamento\s+definitivo\s+de\s+pedido\s+de\s+registro\s+por\s+falta\s+de\s+pagamento\s+da\s+concessão\b/i,
  },
  {
    processType: "Concessão de registro",
    title: "Concessão de registro",
    regex: /^concessão\s+de\s+registro\b/i,
  },
  {
    processType: "Extinção de registro pela expiração do prazo de vigência",
    title: "Extinção de registro pela expiração do prazo de vigência",
    regex: /^extinção\s+de\s+registro\s+pela\s+expiração\s+do\s+prazo\s+de\s+vigência\b/i,
  },
  {
    processType: "Extinção de registro pela caducidade",
    title: "Extinção de registro pela caducidade",
    regex: /^extinção\s+de\s+registro\s+pela\s+caducidade\b/i,
  },
  {
    processType: "Cancelamento de ofício de registro de marca",
    title: "Cancelamento de ofício de registro de marca",
    regex: /^cancelamento\s+de\s+ofício\s+de\s+registro\s+de\s+marca\b/i,
  },
  {
    processType: "Recurso provido",
    title: "Recurso provido (decisão reformada para: Deferimento)",
    regex: /^recurso\s+provido\b/i,
  },
  {
    processType: "Exigência de mérito (em petição)",
    title: "Exigência de mérito (em petição)",
    regex: /^exigência\s+de\s+mérito\s*\(em\s+petição\)\b/i,
  },
  {
    processType: "Anulação de despacho",
    title: "Anulação de despacho (em processo)",
    regex: /^anulação\s+de\s+despacho\b/i,
  },
  {
    processType: "Notificação de procedimento judicial",
    title: "Notificação de procedimento judicial",
    regex: /^notificação\s+de\s+procedimento\s+judicial\b/i,
  },
  {
    processType: "Publicação de decisão judicial transitada em julgado",
    title: "Publicação de decisão judicial transitada em julgado",
    regex: /^publicação\s+de\s+decisão\s+judicial\s+transitada\s+em\s+julgado\b/i,
  },
  {
    processType: "Emissão de segunda via de certificado de registro",
    title: "Emissão de segunda via de certificado de registro",
    regex: /^emissão\s+de\s+segunda\s+via\s+de\s+certificado\s+de\s+registro\b/i,
  },
];