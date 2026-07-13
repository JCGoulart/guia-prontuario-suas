import type { ComparisonRow } from '@/types'

export const resumoVisualProntuario: ComparisonRow[] = [
  {
    item: 'Registrar dados obtidos em entrevista com a família',
    status: 'pode',
    condition: 'Desde que a informação seja relevante para o acompanhamento socioassistencial.',
  },
  {
    item: 'Consultar prontuário de família fora do seu território',
    status: 'condicao',
    condition: 'Permitido apenas com justificativa registrada e autorização da coordenação.',
  },
  {
    item: 'Compartilhar dados do prontuário com a rede (Saúde, Educação)',
    status: 'condicao',
    condition: 'Exige consentimento da família ou previsão legal. Dados sensíveis requerem cuidado redobrado (LGPD).',
  },
  {
    item: 'Alterar dados já registrados por outro técnico',
    status: 'condicao',
    condition: 'Apenas com justificativa documentada. O sistema mantém histórico de alterações.',
  },
  {
    item: 'Excluir prontuário sem justificativa',
    status: 'nao',
    condition: 'A exclusão exige justificativa formal e é irreversível. Certifique-se antes de prosseguir.',
  },
  {
    item: 'Utilizar o prontuário para fins não relacionados ao SUAS',
    status: 'nao',
    condition: 'Os dados são protegidos pela LGPD e destinados exclusivamente à política de assistência social.',
  },
  {
    item: 'Imprimir ou exportar dados do prontuário',
    status: 'condicao',
    condition: 'Permitido para relatórios internos, prestação de contas ou requisição judicial formal.',
  },
  {
    item: 'Acessar prontuário sem estar em atendimento ativo',
    status: 'condicao',
    condition: 'Exige justificativa registrada (supervisão, auditoria, pesquisa autorizada).',
  },
  {
    item: 'Registrar encaminhamentos sem diagnóstico prévio',
    status: 'nao',
    condition: 'O encaminhamento deve estar fundamentado em necessidade identificada no diagnóstico socioeconômico.',
  },
  {
    item: 'Deixar campos obrigatórios em branco',
    status: 'nao',
    condition: 'O sistema valida campos obrigatórios. Dados incompletos comprometem a qualidade do acompanhamento.',
  },
  {
    item: 'Migrar prontuário para unidade de outro município',
    status: 'limite',
    condition: 'Depende de acordo entre os municípios e aprovação do órgão gestor estadual.',
  },
  {
    item: 'Utilizar painel estatístico para planejamento da unidade',
    status: 'pode',
    condition: 'Recomendado. O painel consolida dados anonimizados para gestão e não expõe informações individuais.',
  },
]
