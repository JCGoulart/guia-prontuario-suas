/**
 * Welcome Modal configuration and content
 * Manual do Prontuário Eletrônico — SUAS
 */

export const WELCOME_CONFIG = {
  localStorageKey: 'prontuario-welcome-seen',
  showDelayMs: 600,
}

export const WELCOME_CONTENT = {
  title: 'Manual do Prontuário Eletrônico',
  subtitle: 'Sistema Único de Assistência Social — SUAS',
  description:
    'Este manual apresenta o passo a passo para utilização do Prontuário Eletrônico do SUAS, abordando desde o login no sistema até o registro de atendimentos individuais, familiares e coletivos. O material é destinado aos profissionais da assistência social que atuam nos CRAS, CREAS e demais unidades socioassistenciais.',
  teamLabel: 'Equipe Responsável',
  otherCadernosLabel: 'Materiais Relacionados',
  otherCadernosEmpty: 'Outros materiais serão disponibilizados em breve.',
  dontShowAgainLabel: 'Não mostrar novamente',
  ctaLabel: 'Iniciar leitura',
}

export const WELCOME_TEAM = [
  {
    unit: 'Coordenação Estadual de Vigilância Socioassistencial (COOVIG)',
    role: 'Desenvolvimento do Manual',
    responsible: 'Junier Goulart',
    support: 'Matheus Lopes e Matheus de Freitas',
    email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  },
]

export const WELCOME_CONTACT = {
  phone: '(21) 3231-3658',
  email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  address: 'Secretaria de Estado de Desenvolvimento Social e Direitos Humanos — Rio de Janeiro/RJ',
}

export const OTHER_CADERNOS = [
  {
    href: 'https://guia-vigilancia.gofsuasrj.org',
    label: 'Guia de Implantação da Vigilância Socioassistencial',
    description: '4 etapas para a formalização da Vigilância Socioassistencial nos Municípios',
    accentClass: 'bg-institucional-blue',
  },
  {
    href: 'https://caderno.gofsuasrj.org',
    label: 'Caderno de Execução Orçamentária e Financeira do SUAS',
    description: 'Orientações para gestão dos recursos do cofinanciamento estadual',
    accentClass: 'bg-institucional-green',
  },
]
