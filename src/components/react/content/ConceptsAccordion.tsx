import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConceptItem {
  id: string
  title: string
  description: string
  accent: 'blue' | 'green'
}

const CONCEPTS: ConceptItem[] = [
  {
    id: 'atendimento',
    title: 'Atendimento',
    description:
      'Ação imediata de prestação de serviços socioassistenciais, realizada por profissionais do SUAS para acolher, orientar e encaminhar cidadãos em situação de vulnerabilidade social. Caracteriza-se pela resposta direta e pontual às demandas apresentadas pela população.',
    accent: 'blue',
  },
  {
    id: 'acompanhamento-social',
    title: 'Acompanhamento Social',
    description:
      'Processo planejado e continuado de intervenção profissional, com objetivos definidos e metodologia própria. Envolve visitas domiciliares, entrevistas, encaminhamentos e articulação da rede socioassistencial, visando à superação das situações de vulnerabilidade identificadas.',
    accent: 'green',
  },
  {
    id: 'articulacao-intersetorial',
    title: 'Articulação Intersetorial',
    description:
      'Coordenação entre diferentes políticas públicas — saúde, educação, habitação, trabalho e assistência social — para garantir atenção integral às famílias. O SUAS atua como articulador, estabelecendo fluxos e protocolos que integram serviços de setores diversos em torno do mesmo território.',
    accent: 'blue',
  },
  {
    id: 'busca-ativa',
    title: 'Busca Ativa',
    description:
      'Estratégia de prospecção territorial para identificar famílias e indivíduos em situação de vulnerabilidade que não acessam espontaneamente os serviços socioassistenciais. Realizada por equipes volantes, utiliza mapeamento territorial e sistemas de informação para alcançar populações invisibilizadas.',
    accent: 'green',
  },
  {
    id: 'diagnostico-social',
    title: 'Diagnóstico Social',
    description:
      'Estudo sistemático do território que fundamenta a oferta de serviços socioassistenciais. Compreende a coleta e análise de dados demográficos, socioeconômicos e culturais, identificando demandas, potencialidades e riscos sociais para orientar o planejamento das ações da política de assistência social.',
    accent: 'blue',
  },
  {
    id: 'escuta-qualificada',
    title: 'Escuta Qualificada',
    description:
      'Técnica de acolhimento profissional baseada no respeito, na empatia e na não-judgmentalidade. Pressupõe que o profissional estabeleça vínculo de confiança com o usuário, reconhecendo sua autonomia e protagonismo, para além da coleta de informações objetivas sobre a situação apresentada.',
    accent: 'green',
  },
  {
    id: 'pratica-reflexiva',
    title: 'Prática Reflexiva',
    description:
      'Processo de formação contínua em que profissionais do SUAS analisam criticamente sua própria atuação, articulando teoria e prática. Fundamenta-se na sistematização da experiência, no estudo de casos e na supervisão técnica, promovendo o aperfeiçoamento permanente da intervenção socioassistencial.',
    accent: 'blue',
  },
]

const ACCENT_STYLES: Record<'blue' | 'green', string> = {
  blue: 'border-institucional-blue dark:border-blue-400 bg-institucional-lightBlue dark:bg-blue-900/30',
  green: 'border-institucional-green dark:border-green-400 bg-institucional-lightGreen dark:bg-green-900/30',
}

const ACCENT_BORDER: Record<'blue' | 'green', string> = {
  blue: 'border-l-institucional-blue dark:border-l-blue-400',
  green: 'border-l-institucional-green dark:border-l-green-400',
}

export default function ConceptsAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = CONCEPTS.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const expandedCount = expandedId !== null ? 1 : 0

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
    setSearchQuery('')
  }

  return (
    <div className="space-y-4">
      {/* Barra de busca */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar conceito..."
          className={cn(
            'w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border',
            'bg-white dark:bg-slate-800',
            'text-slate-700 dark:text-slate-200',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'border-slate-200 dark:border-slate-700',
            'focus:outline-none focus:ring-2 focus:ring-institucional-blue focus:ring-offset-2 dark:focus:ring-offset-slate-900',
            'transition-colors',
          )}
          aria-label="Buscar conceitos do SUAS"
        />
      </div>

      {/* Contador */}
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {expandedCount} de {CONCEPTS.length} conceitos expandidos
      </p>

      {/* Lista de conceitos */}
      <div className="space-y-3">
        {filtered.length === 0 && searchQuery !== '' && (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
            Nenhum conceito encontrado para &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {filtered.map((concept) => {
          const isExpanded = expandedId === concept.id

          return (
            <div
              key={concept.id}
              className={cn(
                'rounded-lg border bg-white dark:bg-slate-800 overflow-hidden transition-colors',
                isExpanded
                  ? ACCENT_STYLES[concept.accent]
                  : 'border-slate-200 dark:border-slate-700',
              )}
            >
              <button
                onClick={() => toggle(concept.id)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 text-left',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                  'transition-colors',
                )}
                aria-expanded={isExpanded}
                aria-controls={`concept-${concept.id}`}
              >
                <span
                  id={`concept-label-${concept.id}`}
                  className={cn(
                    'font-medium text-sm',
                    isExpanded
                      ? 'text-slate-800 dark:text-slate-100'
                      : 'text-slate-700 dark:text-slate-300',
                  )}
                >
                  {concept.title}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-300',
                    isExpanded && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`concept-${concept.id}`}
                role="region"
                aria-labelledby={`concept-label-${concept.id}`}
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      'px-4 pb-4 pt-0 border-l-4 ml-3',
                      isExpanded && ACCENT_BORDER[concept.accent],
                    )}
                  >
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {concept.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
