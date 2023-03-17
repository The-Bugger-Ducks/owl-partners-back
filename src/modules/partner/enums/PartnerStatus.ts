export type PartnerStatus =
  | 'P' // 'Em prospecção'
  | 'PC' // 'Primeiro contato feito'
  | 'PR' // 'Primeira reunião marcada/realizada',
  | 'ADOCE' // 'Documentação enviada/em análise (Parceiro)',
  | 'ADOCDA' // 'Documentação devolvida (Em análise Academy)',
  | 'ADOCD' // 'Documentação devolvida (Em análise Legal)',
  | 'DOCD' // 'Documentação Analisada devolvida (Parceiro)',
  | 'PREPES' // 'Em preparação de Executive Sumary (Academy)',
  | 'AESL' // 'ES em analise (Legal)',
  | 'AESAG' // 'ES em analise (Academy Global)',
  | 'PA' // 'Pronto para assinatura',
  | 'PF'; // 'Parceria Firmada',
