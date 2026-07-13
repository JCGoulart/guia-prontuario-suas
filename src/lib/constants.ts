export const INSTITUTIONAL_COLORS = {
  blue: '#123e6b',
  lightBlue: '#e8f0fa',
  green: '#1a7a3a',
  lightGreen: '#e8f5ec',
  dark: '#1e293b',
  gray: '#f8fafc',
}

export const BLOCK_ACCENTS = {
  gestao: {
    border: 'border-block-gestao', light: 'bg-block-gestao-light', color: 'text-block-gestao-text',
    hex: '#123e6b', label: 'azul', badgeBg: 'bg-block-gestao-light', badgeText: 'text-block-gestao-text',
    badgeBorder: 'border-block-gestao/30', lineGradient: 'from-institucional-blue to-blue-300',
    iconBg: 'bg-institucional-blue', iconBgDark: 'dark:bg-blue-800',
  },
  planejamento: {
    border: 'border-block-planejamento', light: 'bg-block-planejamento-light', color: 'text-block-planejamento-text',
    hex: '#1a7a3a', label: 'verde', badgeBg: 'bg-block-planejamento-light', badgeText: 'text-block-planejamento-text',
    badgeBorder: 'border-block-planejamento/30', lineGradient: 'from-institucional-green to-green-300',
    iconBg: 'bg-institucional-green', iconBgDark: 'dark:bg-green-800',
  },
  reprogramacao: {
    border: 'border-block-reprogramacao', light: 'bg-block-reprogramacao-light', color: 'text-block-reprogramacao-text',
    hex: '#0891b2', label: 'ciano', badgeBg: 'bg-block-reprogramacao-light', badgeText: 'text-block-reprogramacao-text',
    badgeBorder: 'border-block-reprogramacao/30', lineGradient: 'from-cyan-500 to-cyan-300',
    iconBg: 'bg-cyan-500', iconBgDark: 'dark:bg-cyan-700',
  },
  controle: {
    border: 'border-block-controle', light: 'bg-block-controle-light', color: 'text-block-controle-text',
    hex: '#be185d', label: 'rosa', badgeBg: 'bg-block-controle-light', badgeText: 'text-block-controle-text',
    badgeBorder: 'border-block-controle/30', lineGradient: 'from-pink-500 to-pink-300',
    iconBg: 'bg-pink-500', iconBgDark: 'dark:bg-pink-700',
  },
}

export const INTRO_SECTIONS = [
  { id: 'capa', title: 'Capa' },
  { id: 'expediente', title: 'Expediente' },
  { id: 'sumario', title: 'Sumário' },
  { id: 'apresentacao', title: 'Apresentação' },
  { id: 'papeis-profissionais', title: 'Profissionais do SUAS e Perfis de Acesso' },
]

export const FINAL_SECTIONS = [
  { id: 'contra-capa', title: 'Contra-Capa' },
]

export const BLOCKS = [
  {
    id: 'atendimento-individual',
    title: 'Bloco 1 — Atendimento Individual e Familiar',
    accent: 'gestao',
    items: [
      { id: 'informacoes-prontuario', title: 'Informações do Prontuário' },
      { id: 'excluir-prontuario', title: 'Excluir Prontuário' },
      { id: 'informacoes-familia', title: 'Informações da Família' },
      { id: 'composicao-familiar', title: 'Composição Familiar' },
      { id: 'forma-ingresso', title: 'Forma de Ingresso e Motivo do Atendimento' },
      { id: 'condicoes-trabalho', title: 'Condições de Trabalho e Rendimento' },
      { id: 'condicoes-educacionais', title: 'Condições Educacionais da Família' },
      { id: 'condicoes-saude', title: 'Condições de Saúde da Família' },
      { id: 'registro-atendimentos', title: 'Registro de Atendimentos' },
      { id: 'acesso-beneficios', title: 'Acesso a Benefícios Eventuais' },
      { id: 'vulnerabilidades', title: 'Situações de Vulnerabilidade' },
      { id: 'planejamento-evolucao', title: 'Planejamento e Evolução' },
      { id: 'encaminhamentos', title: 'Encaminhamentos' },
      { id: 'participacao-servicos', title: 'Participação em Serviços' },
      { id: 'medidas-socioeducativas', title: 'Medidas Socioeducativas' },
      { id: 'historico-acolhimento', title: 'Histórico de Acolhimento' },
    ],
  },
  {
    id: 'atendimento-coletivo',
    title: 'Bloco 2 — Atendimento Coletivo',
    accent: 'planejamento',
    items: [
      { id: 'controle-encaminhamentos', title: 'Controle de Encaminhamentos' },
      { id: 'relatorio-simplificado', title: 'Relatório Simplificado' },
      { id: 'atendimento-coletivo-lista', title: 'Atendimento Coletivo — Lista de Atendimentos' },
    ],
  },
  {
    id: 'migrar-prontuario',
    title: 'Bloco 3 — Migrar Prontuário',
    accent: 'reprogramacao',
    items: [
      { id: 'migrar-prontuario', title: 'Migrar Prontuário' },
    ],
  },
  {
    id: 'painel-estatistico',
    title: 'Bloco 4 — Painel Estatístico',
    accent: 'controle',
    items: [
      { id: 'painel-estatistico', title: 'Painel Estatístico' },
    ],
  },
]
