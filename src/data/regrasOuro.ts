import type { Rule } from '@/types'

export const regrasOuroProntuario: Rule[] = [
  {
    number: 1,
    title: 'Registre dados reais e verificáveis.',
    description: 'As informações do prontuário devem refletir a realidade concreta da família, sem inferências não fundamentadas. Dados imprecisos comprometem o plano de acompanhamento.',
  },
  {
    number: 2,
    title: 'Atualize o prontuário a cada atendimento.',
    description: 'Cada interação com a família deve gerar um registro no prontuário no mesmo dia. Atrasos criam lacunas que prejudicam a continuidade do acompanhamento.',
  },
  {
    number: 3,
    title: 'Proteja os dados pessoais (LGPD).',
    description: 'O prontuário contém dados sensíveis. O acesso é restrito por perfil; o compartilhamento externo exige consentimento ou previsão legal.',
    highlight: true,
    highlightColor: 'bg-white text-institucional-green',
  },
  {
    number: 4,
    title: 'Justifique exclusões e alterações.',
    description: 'Toda exclusão de registro exige justificativa documentada. O histórico de alterações garante a rastreabilidade e a integridade dos dados.',
  },
  {
    number: 5,
    title: 'Vincule encaminhamentos a diagnósticos.',
    description: 'Cada encaminhamento para a rede deve estar fundamentado em uma vulnerabilidade ou necessidade identificada no diagnóstico socioeconômico.',
  },
  {
    number: 6,
    title: 'Use o Plano de Acompanhamento como guia.',
    description: 'As evoluções devem dialogar com o plano. Registre avanços, retrocessos e reformulações, mantendo a coerência entre planejamento e execução.',
  },
  {
    number: 7,
    title: 'Consulte o Painel Estatístico periodicamente.',
    description: 'O painel consolida dados da unidade. Use-o para planejar ações, identificar padrões de demanda e fundamentar relatórios gerenciais.',
  },
  {
    number: 8,
    title: 'Respeite o território de abrangência.',
    description: 'Ao migrar um prontuário entre unidades, certifique-se de que a família será atendida pelo CRAS de referência do seu território.',
  },
  {
    number: 9,
    title: 'Mantenha a documentação complementar organizada.',
    description: 'Relatórios, declarações e documentos anexos devem ser digitalizados e vinculados ao prontuário, formando um dossiê completo da família.',
  },
  {
    number: 10,
    title: 'Garanta a supervisão técnica dos registros.',
    description: 'Coordenadores e técnicos de referência devem revisar periodicamente a qualidade dos prontuários sob sua responsabilidade.',
  },
]
