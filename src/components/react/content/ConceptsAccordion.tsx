import { cn } from '@/lib/utils'

interface ConceptItem {
  id: string
  title: string
  description: string
  exemplo: string
  icon: string
  accent: 'blue' | 'green'
}

const CONCEPTS: ConceptItem[] = [
  {
    id: 'atendimento',
    title: 'Atendimento',
    description:
      'Ação imediata de prestação de serviços socioassistenciais, realizada por profissionais do SUAS para acolher, orientar e encaminhar cidadãos em situação de vulnerabilidade social. Caracteriza-se pela resposta direta e pontual às demandas apresentadas pela população.',
    exemplo:
      'Um cidadão procura o CRAS relatando dificuldades financeiras. O técnico registra o atendimento inicial, coleta dados básicos e agenda o retorno para estudo social.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    accent: 'blue',
  },
  {
    id: 'acompanhamento-social',
    title: 'Acompanhamento Social',
    description:
      'Processo planejado e continuado de intervenção profissional, com objetivos definidos e metodologia própria. Envolve visitas domiciliares, entrevistas, encaminhamentos e articulação da rede socioassistencial, visando à superação das situações de vulnerabilidade identificadas.',
    exemplo:
      'A família Silva é acompanhada mensalmente com visitas domiciliares e atualização do plano de acompanhamento, registrando cada evolução no prontuário.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    accent: 'green',
  },
  {
    id: 'articulacao-intersetorial',
    title: 'Articulação Intersetorial',
    description:
      'Coordenação entre diferentes políticas públicas — saúde, educação, habitação, trabalho e assistência social — para garantir atenção integral às famílias. O SUAS atua como articulador, estabelecendo fluxos e protocolos que integram serviços de setores diversos em torno do mesmo território.',
    exemplo:
      'O CRAS articula com a UBS local o encaminhamento de gestante em vulnerabilidade, compartilhando informações essenciais via relatório técnico.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    accent: 'blue',
  },
  {
    id: 'busca-ativa',
    title: 'Busca Ativa',
    description:
      'Estratégia de prospecção territorial para identificar famílias e indivíduos em situação de vulnerabilidade que não acessam espontaneamente os serviços socioassistenciais. Realizada por equipes volantes, utiliza mapeamento territorial e sistemas de informação para alcançar populações invisibilizadas.',
    exemplo:
      'Equipe volante identifica famílias em ocupação irregular não cadastradas, realiza abordagem e insere os dados no sistema para início do acompanhamento.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    accent: 'green',
  },
  {
    id: 'diagnostico-social',
    title: 'Diagnóstico Social',
    description:
      'Estudo sistemático do território que fundamenta a oferta de serviços socioassistenciais. Compreende a coleta e análise de dados demográficos, socioeconômicos e culturais, identificando demandas, potencialidades e riscos sociais para orientar o planejamento das ações da política de assistência social.',
    exemplo:
      'O técnico cruza dados do CadÚnico com visita domiciliar para identificar que 60% das famílias do território têm renda per capita abaixo de 1/4 do salário mínimo.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.5 16.5 16 19"/></svg>',
    accent: 'blue',
  },
  {
    id: 'escuta-qualificada',
    title: 'Escuta Qualificada',
    description:
      'Técnica de acolhimento profissional baseada no respeito, na empatia e na não-judgmentalidade. Pressupõe que o profissional estabeleça vínculo de confiança com o usuário, reconhecendo sua autonomia e protagonismo, para além da coleta de informações objetivas sobre a situação apresentada.',
    exemplo:
      'Durante a entrevista, o profissional acolhe o relato de violência doméstica sem julgamento, registra no prontuário e aciona a rede de proteção.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 17.5 5 21l3-5.5"/><path d="M8.5 2.5a6.5 6.5 0 0 1 6.5 6.5c0 2.5-1.8 4.5-3 5.5l-1 1v3H9v-3l-1-1C6.8 13.5 5 11.5 5 9A6.5 6.5 0 0 1 8.5 2.5z"/><path d="M15.5 6.5a3.5 3.5 0 0 1 0 7"/></svg>',
    accent: 'green',
  },
  {
    id: 'pratica-reflexiva',
    title: 'Prática Reflexiva',
    description:
      'Processo de formação contínua em que profissionais do SUAS analisam criticamente sua própria atuação, articulando teoria e prática. Fundamenta-se na sistematização da experiência, no estudo de casos e na supervisão técnica, promovendo o aperfeiçoamento permanente da intervenção socioassistencial.',
    exemplo:
      'Em reunião de equipe, os técnicos discutem um caso complexo, revisam abordagens anteriores e propõem nova estratégia de intervenção fundamentada teoricamente.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    accent: 'blue',
  },
]

const ACCENT_CARD: Record<'blue' | 'green', { border: string; borderLeft: string; from: string; to: string }> = {
  blue: {
    border: 'border-blue-500/40 dark:border-blue-500/30',
    borderLeft: 'border-l-blue-500',
    from: 'from-blue-500',
    to: 'to-blue-400',
  },
  green: {
    border: 'border-green-500/40 dark:border-green-500/30',
    borderLeft: 'border-l-green-500',
    from: 'from-green-500',
    to: 'to-green-400',
  },
}

const ACCENT_EXEMPLO: Record<'blue' | 'green', string> = {
  blue: 'border-blue-300 dark:border-blue-600',
  green: 'border-green-300 dark:border-green-600',
}

export default function ConceptsAccordion() {
  return (
    <div className="space-y-6">
      {CONCEPTS.map((concept) => {
        const cardStyle = ACCENT_CARD[concept.accent]
        return (
          <div
            key={concept.id}
            className={cn(
              'rounded-xl border-2 border-l-4 bg-gradient-to-br shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all p-6',
              'bg-white dark:bg-slate-800',
              cardStyle.border,
              cardStyle.borderLeft,
            )}
          >
            <div className="flex items-start gap-4">
              {/* Large icon in colored circle */}
              <div
                className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br text-white',
                  cardStyle.from,
                  cardStyle.to,
                )}
              >
                <span dangerouslySetInnerHTML={{ __html: concept.icon }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {concept.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {concept.description}
                </p>
                <div
                  className={cn(
                    'border-l-2 pl-3 text-xs text-slate-500 dark:text-slate-400 italic',
                    ACCENT_EXEMPLO[concept.accent],
                  )}
                >
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    Na prática:{' '}
                  </span>
                  {concept.exemplo}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
