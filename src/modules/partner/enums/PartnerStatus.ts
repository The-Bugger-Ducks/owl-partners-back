export type PartnerStatus =
	| 'EmProspeccao' // 'Em prospecção'
	| 'PrimeiroContatoFeito' // 'Primeiro contato feito'
	| 'PrimeiraReuniaoMarcadaRealizada' // 'Primeira reunião marcada/realizada',
	| 'DocumentacaoEnviadaEmAnalise_Parceiro' // 'Documentação enviada/em análise (Parceiro)',
	| 'DocumentacaoDevolvida_EmAnaliseAcademy' // 'Documentação devolvida (Em análise Academy)',
	| 'DocumentacaoDevolvida_EmAnaliseLegal' // 'Documentação devolvida (Em análise Legal)',
	| 'DocumentacaoAnalisadaDevolvida_Parceiro' // 'Documentação Analisada devolvida (Parceiro)',
	| 'EmPreparacaoDeExecutiveSummary_Academy' // 'Em preparação de Executive Sumary (Academy)',
	| 'ESEmAnalise_Legal' // 'ES em analise (Legal)',
	| 'ESEmAnaliseAcademy_Global' // 'ES em analise (Academy Global)',
	| 'ProntoParaAssinatura' // 'Pronto para assinatura',
	| 'ParceriaFirmada'; // 'Parceria Firmada',
