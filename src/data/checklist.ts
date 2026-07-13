import type { ChecklistItem } from '@/types'

export const checklistProntuario: ChecklistItem[] = [
  { id: 'cp1', text: 'O profissional realizou login com seu perfil de acesso correto?' },
  { id: 'cp2', text: 'A família já possui prontuário aberto? (Evitar duplicidade)' },
  { id: 'cp3', text: 'O NIS e os dados do CadÚnico estão atualizados?' },
  { id: 'cp4', text: 'O diagnóstico socioeconômico foi preenchido com informações obtidas em entrevista?' },
  { id: 'cp5', text: 'As condições de trabalho, educação e saúde foram registradas para todos os membros?' },
  { id: 'cp6', text: 'As vulnerabilidades identificadas estão documentadas com data e técnico responsável?' },
  { id: 'cp7', text: 'O plano de acompanhamento foi elaborado com metas observáveis?' },
  { id: 'cp8', text: 'Os encaminhamentos realizados foram registrados com data e área de destino?' },
  { id: 'cp9', text: 'O atendimento coletivo (se houver) foi registrado com lista de participantes?' },
  { id: 'cp10', text: 'Dados sensíveis estão protegidos — a tela não está visível para terceiros não autorizados?' },
  { id: 'cp11', text: 'O registro está completo antes de fechar o prontuário? (Revisar campos obrigatórios)' },
  { id: 'cp12', text: 'Em caso de migração, o prontuário foi transferido para a unidade correta do território?' },
]
