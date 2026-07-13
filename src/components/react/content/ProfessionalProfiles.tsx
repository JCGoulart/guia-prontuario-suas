import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Brain,
  Heart,
  BookOpen,
  ClipboardList,
  UserCheck,
  FileText,
} from 'lucide-react'

type ProfileLevel = 'superior' | 'medio' | 'apoio'
type FilterValue = 'all' | ProfileLevel

interface Profile {
  id: string
  role: string
  level: ProfileLevel
  icon: LucideIcon
  accent: string
  description: string
}

const PROFILES: Profile[] = [
  {
    id: 'coordenador',
    role: 'Coordenador',
    level: 'superior',
    icon: Briefcase,
    accent: 'border-t-blue-500 dark:border-t-blue-400',
    description:
      'Responsável pela gestão operacional do sistema e pela supervisão dos atendimentos, garantindo sigilo e segurança das informações.',
  },
  {
    id: 'psicologo',
    role: 'Psicólogo',
    level: 'superior',
    icon: Brain,
    accent: 'border-t-purple-500 dark:border-t-purple-400',
    description:
      'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento, atendimentos especializados e fortalece vínculos familiares e comunitários.',
  },
  {
    id: 'assistente-social',
    role: 'Assistente Social',
    level: 'superior',
    icon: Heart,
    accent: 'border-t-emerald-500 dark:border-t-emerald-400',
    description:
      'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento, orientação, encaminhamentos e emissão de documentos técnicos.',
  },
  {
    id: 'tecnico-superior',
    role: 'Técnico de Nível Superior',
    level: 'superior',
    icon: UserCheck,
    accent: 'border-t-indigo-500 dark:border-t-indigo-400',
    description:
      'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento, atua em equipe multiprofissional, realiza intervenções individuais, grupais e comunitárias.',
  },
  {
    id: 'tecnico-medio',
    role: 'Técnico de Nível Médio',
    level: 'medio',
    icon: FileText,
    accent: 'border-t-cyan-500 dark:border-t-cyan-400',
    description:
      'Produz relatórios e pareceres, registra oficinas e grupos, documenta atendimentos, contribui com o plano de acompanhamento familiar.',
  },
  {
    id: 'educador-social',
    role: 'Educador Social',
    level: 'medio',
    icon: BookOpen,
    accent: 'border-t-green-500 dark:border-t-green-400',
    description:
      'Registra ações socioeducativas e o acompanhamento de usuários, produzindo relatórios, registrando oficinas e contribuindo com o plano de acompanhamento familiar.',
  },
  {
    id: 'apoio-administrativo',
    role: 'Apoio Administrativo – CRAS',
    level: 'apoio',
    icon: ClipboardList,
    accent: 'border-t-orange-500 dark:border-t-orange-400',
    description:
      'Insere informações básicas nos sistemas do SUAS, apoia processos relacionados ao CadÚnico, emite documentos e relatórios, apoia fluxos internos de atendimento.',
  },
]

interface FilterPill {
  value: FilterValue
  label: string
  count: number
}

function buildFilters(profiles: Profile[]): FilterPill[] {
  const counts: Record<ProfileLevel, number> = { superior: 0, medio: 0, apoio: 0 }
  for (const p of profiles) {
    counts[p.level]++
  }
  return [
    { value: 'all', label: 'Todos', count: profiles.length },
    { value: 'superior', label: 'Nível Superior', count: counts.superior },
    { value: 'medio', label: 'Nível Médio', count: counts.medio },
    { value: 'apoio', label: 'Apoio', count: counts.apoio },
  ]
}

export default function ProfessionalProfiles() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  const filters = useMemo(() => buildFilters(PROFILES), [])

  const filteredProfiles = useMemo(
    () =>
      activeFilter === 'all'
        ? PROFILES
        : PROFILES.filter((p) => p.level === activeFilter),
    [activeFilter],
  )

  const handleFilter = useCallback((value: FilterValue) => {
    setActiveFilter(value)
  }, [])

  return (
    <div>
      {/* Filter Pills */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por nível profissional">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value
          return (
            <button
              key={filter.value}
              onClick={() => handleFilter(filter.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institucional-blue focus-visible:ring-offset-2',
                isActive
                  ? 'bg-institucional-blue text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700',
              )}
              aria-pressed={isActive}
            >
              {filter.label}
              <span
                className={cn(
                  'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold',
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
                )}
              >
                {filter.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Cards Grid */}
      {filteredProfiles.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          Nenhum perfil encontrado para este filtro.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProfiles.map((profile) => {
            const Icon = profile.icon
            return (
              <article
                key={profile.id}
                className={cn(
                  'group flex flex-col rounded-lg border bg-white p-5 shadow-sm transition-all duration-200',
                  'border-slate-200 dark:border-slate-700 dark:bg-slate-800',
                  'hover:scale-[1.02] hover:shadow-md',
                  'border-t-4',
                  profile.accent,
                  'hover:border-t-[5px]',
                )}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500',
                      'dark:bg-slate-700 dark:text-slate-300',
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      'inline-block rounded px-2 py-0.5 text-xs font-medium',
                      profile.level === 'superior' &&
                        'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
                      profile.level === 'medio' &&
                        'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
                      profile.level === 'apoio' &&
                        'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
                    )}
                  >
                    {profile.level === 'superior'
                      ? 'Nível Superior'
                      : profile.level === 'medio'
                        ? 'Nível Médio'
                        : 'Apoio'}
                  </span>
                </div>

                <h3 className="mb-1.5 text-base font-semibold text-slate-800 dark:text-slate-100">
                  {profile.role}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {profile.description}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
