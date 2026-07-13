import { useState } from 'react'
import {
  HeartPulse,
  FlaskConical,
  School,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================

interface Indicator {
  id: string
  category: 'saude' | 'educacao'
  label: string
  icon: React.ElementType
  description: string
  encounter: string
  color: 'blue' | 'green'
}

// ============================================================================
// DATA
// ============================================================================

const indicators: Indicator[] = [
  {
    id: 'doenca-grave',
    category: 'saude',
    label: 'Doença Grave',
    icon: HeartPulse,
    description:
      'Sinaliza condição crônica que demanda cuidados contínuos, afeta a renda e reconfigura a dinâmica familiar.',
    encounter: 'Articular com UBS de referência para garantir acompanhamento regular.',
    color: 'blue',
  },
  {
    id: 'uso-abusivo',
    category: 'saude',
    label: 'Uso Abusivo de Álcool/Drogas',
    icon: FlaskConical,
    description:
      'Indicador de vulnerabilidade social — não diagnóstico clínico. Avalia-se o impacto sobre vínculos, capacidade laboral e acesso a direitos.',
    encounter:
      'Articular com CAPS-AD e CREAS quando houver ruptura de vínculos familiares.',
    color: 'blue',
  },
  {
    id: 'frequencia-escolar',
    category: 'educacao',
    label: 'Frequência Escolar',
    icon: School,
    description:
      'Crianças e adolescentes fora da escola são um dos sinais mais contundentes de desproteção social.',
    encounter:
      'Articular com Secretaria de Educação e, em casos graves, com o Conselho Tutelar.',
    color: 'green',
  },
  {
    id: 'analfabetismo',
    category: 'educacao',
    label: 'Analfabetismo Funcional',
    icon: BookOpen,
    description:
      'Adultos que não sabem ler/escrever têm dificuldade de acessar direitos e navegar pelos serviços públicos.',
    encounter: 'Articular com EJA e programas de alfabetização de adultos.',
    color: 'green',
  },
]

// ============================================================================
// HELPERS
// ============================================================================

function cardBorderClasses(color: 'blue' | 'green', expanded: boolean): string {
  if (expanded) {
    return color === 'blue'
      ? 'border-blue-500 dark:border-blue-400 shadow-lg'
      : 'border-green-500 dark:border-green-400 shadow-lg'
  }
  return 'border-slate-200 dark:border-slate-700'
}

function cardIconClasses(color: 'blue' | 'green'): string {
  return color === 'blue'
    ? 'text-institucional-blue'
    : 'text-institucional-green'
}

const categoryBadgeClasses: Record<string, string> = {
  saude:
    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  educacao:
    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
}

const encounterBoxClasses: Record<string, string> = {
  blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50',
  green:
    'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/50',
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface IndicatorCardProps {
  indicator: Indicator
  expanded: boolean
  onToggle: () => void
}

function IndicatorCard({ indicator, expanded, onToggle }: IndicatorCardProps) {
  const Icon = indicator.icon

  return (
    <div
      className={cn(
        'rounded-xl border-2 overflow-hidden transition-all duration-300 bg-white dark:bg-slate-800',
        cardBorderClasses(indicator.color, expanded),
        !expanded && 'hover:shadow-md hover:-translate-y-0.5',
      )}
    >
      {/* Header */}
      <div
        className="p-5 cursor-pointer flex items-start gap-3"
        onClick={onToggle}
      >
        <Icon
          className={cn(
            'w-6 h-6 shrink-0 mt-0.5',
            cardIconClasses(indicator.color),
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {indicator.label}
            </span>
            <span className={cn('shrink-0', categoryBadgeClasses[indicator.category])}>
              {indicator.category === 'saude' ? 'SAÚDE' : 'EDUCAÇÃO'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {indicator.description}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300',
            expanded && 'rotate-180',
          )}
        />
      </div>

      {/* Expandable body */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-500',
          expanded ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div
          className={cn(
            'p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50',
          )}
        >
          <div
            className={cn(
              'flex items-start gap-2 p-3 rounded-lg border',
              encounterBoxClasses[indicator.color],
            )}
          >
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Encaminhamento intersetorial →
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {indicator.encounter}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HealthEducationIndicators() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Indicadores de Saúde e Educação
        </h3>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({indicators.length} marcadores)
        </span>
      </div>

      {/* 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {indicators.map((indicator) => (
          <IndicatorCard
            key={indicator.id}
            indicator={indicator}
            expanded={expandedId === indicator.id}
            onToggle={() => handleToggle(indicator.id)}
          />
        ))}
      </div>

      {/* Info footer */}
      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Estes indicadores não substituem diagnósticos setoriais — são janelas de
          observação que permitem ao técnico do SUAS identificar rapidamente
          situações que demandam ação intersetorial.
        </p>
      </div>
    </div>
  )
}
