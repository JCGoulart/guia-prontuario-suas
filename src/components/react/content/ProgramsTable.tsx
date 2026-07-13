import React, { useState, type ReactElement } from 'react'
import { cn } from '@/lib/utils'
import type { Program } from '@/types'
import {
  Banknote,
  Accessibility,
  Briefcase,
  Scale,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

interface Props {
  programs: Program[]
  className?: string
}

type SortColumn = keyof Pick<Program, 'name' | 'org' | 'eligibility' | 'registration'>
type SortDirection = 'asc' | 'desc'

const ICON_MAP: Record<string, LucideIcon> = {
  Banknote,
  Accessibility,
  Briefcase,
  Scale,
}

const HEADERS: readonly { key: SortColumn; label: string }[] = [
  { key: 'name', label: 'Programa' },
  { key: 'org', label: 'Órgão' },
  { key: 'eligibility', label: 'Elegibilidade' },
  { key: 'registration', label: 'Cadastro' },
] as const

function renderIcon(iconName: string): ReactElement | null {
  const Icon = ICON_MAP[iconName]
  if (!Icon) return null
  return <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
}

export default function ProgramsTable({ programs, className }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedPrograms = [...programs].sort((a, b) => {
    if (!sortColumn) return 0
    const aVal = a[sortColumn].toLowerCase()
    const bVal = b[sortColumn].toLowerCase()
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse" aria-label="Programas sociais disponíveis">
        <thead>
          <tr className="border-b-2 border-slate-200 dark:border-slate-700">
            <th className="w-10 px-3 py-3" aria-label="Expandir linha" />
            {HEADERS.map(({ key, label }) => (
              <th
                key={key}
                className="px-3 py-3 text-left"
                aria-sort={
                  sortColumn === key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                <button
                  onClick={() => handleSort(key)}
                  className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-700 focus-visible:text-slate-700 focus-visible:outline-none dark:text-slate-400 dark:hover:text-slate-200 dark:focus-visible:text-slate-200"
                >
                  {label}
                  {sortColumn === key &&
                    (sortDirection === 'asc' ? (
                      <ArrowUp className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                    ))}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPrograms.map((program) => {
            const isExpanded = expandedRow === program.id

            return (
              <React.Fragment key={program.id}>
              <tr
                onClick={() => toggleRow(program.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleRow(program.id)
                  }
                }}
                className={cn(
                  'cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-institucional-blue dark:border-slate-700/50 dark:hover:bg-slate-800/50 dark:focus-visible:bg-slate-800/50',
                  isExpanded && 'bg-slate-50 dark:bg-slate-800/30',
                )}
              >
                <td className="px-3 py-3">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  )}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    {renderIcon(program.icon)}
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {program.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{program.org}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{program.eligibility}</span>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{program.registration}</span>
                </td>
              </tr>
              {isExpanded && (
                <tr
                  className="border-b border-slate-100 dark:border-slate-700/50"
                >
                  <td colSpan={2} />
                  <td colSpan={3} className="px-3 py-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Documentos necessários
                        </h4>
                        <ul className="list-inside list-disc space-y-0.5">
                          {program.details.documentos.map((doc, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-400">
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Prazo
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{program.details.prazo}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Observações
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{program.details.observacoes}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
