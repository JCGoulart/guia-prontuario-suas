import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Brain,
  Heart,
  Scale,
  Stethoscope,
  ClipboardList,
  Phone,
  GraduationCap,
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
      'Responsável pela gestão da unidade CRAS, articulação da rede socioassistencial e supervisão das equipes técnicas.',
  },
  {
    id: 'psicologo',
    role: 'Psicólogo',
    level: 'superior',
    icon: Brain,
    accent: 'border-t-purple-500 dark:border-t-purple-400',
    description:
      'Atendimento psicossocial individual e em grupo, acolhimento e acompanhamento familiar no PAIF.',
  },
  {
    id: 'assistente-social',
    role: 'Assistente Social',
    level: 'superior',
    icon: Heart,
    accent: 'border-t-emerald-500 dark:border-t-emerald-400',
    description:
      'Estudo social, visita domiciliar, encaminhamento à rede e elaboração do plano de acompanhamento familiar.',
  },
  {
    id: 'advogado',
    role: 'Advogado',
    level: 'superior',
    icon: Scale,
    accent: 'border-t-amber-500 dark:border-t-amber-400',
    description:
      'Orientação jurídica, mediação de conflitos e garantia de acesso à justiça para famílias em vulnerabilidade.',
  },
  {
    id: 'estagiario',
    role: 'Estagiário',
    level: 'superior',
    icon: GraduationCap,
    accent: 'border-t-teal-500 dark:border-t-teal-400',
    description:
      'Apoio às equipes técnicas, observação participante e desenvolvimento de atividades acadêmico-profissionais.',
  },
  {
    id: 'tecnico-enfermagem',
    role: 'Técnico em Enfermagem',
    level: 'medio',
    icon: Stethoscope,
    accent: 'border-t-cyan-500 dark:border-t-cyan-400',
    description:
      'Aferição de sinais vitais, curativos, administração de medicamentos e acompanhamento de saúde dos usuários.',
  },
  {
    id: 'auxiliar-administrativo',
    role: 'Auxiliar Administrativo',
    level: 'medio',
    icon: ClipboardList,
    accent: 'border-t-orange-500 dark:border-t-orange-400',
    description:
      'Suporte administrativo, organização de prontuários, controle de agendas e atendimento ao público.',
  },
  {
    id: 'recepcionista',
    role: 'Recepcionista',
    level: 'apoio',
    icon: Phone,
    accent: 'border-t-rose-500 dark:border-t-rose-400',
    description:
      'Primeiro acolhimento, agendamento de atendimentos e triagem inicial das demandas dos usuários.',
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
