import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Users, User, ScanEye } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Criterion {
  id: string
  label: string
  coletivo: string
  individual: string
  tooltipColetivo: string
  tooltipIndividual: string
}

const CRITERIA: Criterion[] = [
  {
    id: 'natureza',
    label: 'Natureza',
    coletivo: 'Grupal, socioeducativa',
    individual: 'Particularizada',
    tooltipColetivo:
      'Ex: grupo de convivência para idosos com atividades socioeducativas semanais.',
    tooltipIndividual:
      'Ex: atendimento psicossocial individualizado para uma pessoa em situação de violação de direitos.',
  },
  {
    id: 'publico',
    label: 'Público',
    coletivo: 'Famílias, grupos, comunidades',
    individual: 'Pessoa, família',
    tooltipColetivo:
      'Ex: oficina com famílias do território sobre prevenção ao trabalho infantil.',
    tooltipIndividual:
      'Ex: atendimento particularizado a uma família em descumprimento de condicionalidades do PBF.',
  },
  {
    id: 'frequencia',
    label: 'Frequência',
    coletivo: 'Sazonal, semanal',
    individual: 'Agendamento',
    tooltipColetivo:
      'Ex: grupo de mulheres com encontros semanais às quartas-feiras, das 14h às 16h.',
    tooltipIndividual:
      'Ex: atendimento agendado conforme disponibilidade do técnico de referência e da família.',
  },
  {
    id: 'registro',
    label: 'Registro',
    coletivo: 'Lista de presença',
    individual: 'Prontuário individual',
    tooltipColetivo:
      'Ex: lista de presença nominal com assinatura dos participantes e registro fotográfico autorizado.',
    tooltipIndividual:
      'Ex: prontuário SUAS com evolução do caso, plano de acompanhamento familiar e relatórios técnicos.',
  },
  {
    id: 'equipe',
    label: 'Equipe',
    coletivo: 'Técnicos + facilitadores',
    individual: 'Técnico de referência',
    tooltipColetivo:
      'Ex: assistente social conduz a atividade com apoio de um orientador social e oficineiro de artesanato.',
    tooltipIndividual:
      'Ex: técnico de referência designado realiza escuta qualificada, visita domiciliar e articulação intersetorial.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface CardHeaderProps {
  icon: LucideIcon
  title: string
  colorClass: string
  bgClass: string
}

function CardHeader({ icon: Icon, title, colorClass, bgClass }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-t-lg border-b',
        bgClass,
      )}
    >
      <Icon className={cn('h-5 w-5', colorClass)} aria-hidden="true" />
      <h3 className={cn('text-sm font-semibold', colorClass)}>{title}</h3>
    </div>
  )
}

function Tooltip({ text }: { text: string }) {
  return (
    <div
      role="tooltip"
      className={cn(
        'pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2',
        'w-64 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs leading-relaxed text-slate-600 shadow-lg',
        'dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300',
        'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
        'z-20',
      )}
    >
      {text}
      <div
        className={cn(
          'absolute left-1/2 top-full -translate-x-1/2',
          'border-4 border-transparent border-t-white dark:border-t-slate-700',
        )}
        aria-hidden="true"
      />
    </div>
  )
}

interface CardRowProps {
  criterion: Criterion
  value: string
  tooltipText: string
  highlight: boolean
}

function CardRow({ criterion, value, tooltipText, highlight }: CardRowProps) {
  const differs =
    CRITERIA.find((c) => c.id === criterion.id)!.coletivo !==
    CRITERIA.find((c) => c.id === criterion.id)!.individual

  return (
    <div className="group relative">
      <div
        className={cn(
          'flex items-start justify-between px-4 py-3 transition-colors',
          'hover:bg-slate-50 dark:hover:bg-slate-700/50',
          highlight && differs && 'ring-2 ring-amber-500 dark:ring-amber-400 rounded-md',
        )}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {criterion.label}
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 text-right max-w-[60%]">
          {value}
        </span>
      </div>
      <Tooltip text={tooltipText} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  className?: string
}

/**
 * Comparativo side-by-side entre Atendimento Coletivo e Individual no SUAS.
 *
 * - 5 critérios reais (Natureza, Público, Frequência, Registro, Equipe).
 * - Cada card exibe os valores do respectivo modo de atendimento.
 * - Botão "Destacar diferenças" aplica `ring-2 ring-amber-500` nas células
 *   cujos valores divergem entre os dois modos.
 * - Hover em qualquer linha revela um tooltip com exemplo prático.
 */
export default function ColetivoVsIndividual({ className }: Props) {
  const [highlightMode, setHighlightMode] = useState(false)

  return (
    <div className={cn('space-y-4', className)}>
      {/* ── Toggle ────────────────────────────────────────────────────── */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setHighlightMode((prev) => !prev)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all',
            'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue focus-visible:ring-offset-2',
            highlightMode
              ? 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-900/30 dark:text-amber-300'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
          )}
        >
          <ScanEye className="h-4 w-4" aria-hidden="true" />
          {highlightMode ? 'Diferenças em destaque' : 'Destacar diferenças'}
        </button>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coletivo */}
        <div
          className={cn(
            'rounded-lg border border-emerald-200 bg-white shadow-sm',
            'dark:border-emerald-800 dark:bg-slate-800',
          )}
        >
          <CardHeader
            icon={Users}
            title="Atendimento Coletivo"
            colorClass="text-emerald-700 dark:text-emerald-400"
            bgClass="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
          />

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {CRITERIA.map((criterion) => (
              <CardRow
                key={criterion.id}
                criterion={criterion}
                value={criterion.coletivo}
                tooltipText={criterion.tooltipColetivo}
                highlight={highlightMode}
              />
            ))}
          </div>
        </div>

        {/* Individual */}
        <div
          className={cn(
            'rounded-lg border border-blue-200 bg-white shadow-sm',
            'dark:border-blue-800 dark:bg-slate-800',
          )}
        >
          <CardHeader
            icon={User}
            title="Atendimento Individual"
            colorClass="text-blue-700 dark:text-blue-400"
            bgClass="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"
          />

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {CRITERIA.map((criterion) => (
              <CardRow
                key={criterion.id}
                criterion={criterion}
                value={criterion.individual}
                tooltipText={criterion.tooltipIndividual}
                highlight={highlightMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Legend ────────────────────────────────────────────────────── */}
      {highlightMode && (
        <p className="text-center text-[11px] text-amber-600 dark:text-amber-400">
          Células com <span className="font-semibold">anel âmbar</span> indicam
          valores que diferem entre os modos de atendimento.
        </p>
      )}
    </div>
  )
}
