import { memo, useState, useCallback } from 'react'
import {
  ReactFlow,
  Controls,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import type { Node, Edge, NodeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type GovernanceData = {
  badge: string
  title: string
  subtitle: string
  variant: 'blue' | 'green' | 'cyan' | 'purple' | 'orange' | 'emerald'
}

type CrasData = {
  badge: string
  title: string
  subtitle: string
  variant: 'blue' | 'purple' | 'emerald' | 'indigo' | 'cyan' | 'green' | 'orange'
}

type PaifLabelData = { label: string; subtitle: string }
type PaifLabelNodeType = Node<PaifLabelData, 'paifLabel'>

type GovernanceNodeType = Node<GovernanceData, 'governance'>
type CrasNodeType = Node<CrasData, 'cras'>

// ─── Variant styles ───────────────────────────────────────────────────────────

const variantStyles = {
  blue: { border: 'border-blue-600 dark:border-blue-500', card: 'from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-800', icon: 'from-blue-600 to-blue-500', badge: 'bg-blue-600 text-white', title: 'text-blue-800 dark:text-blue-300' },
  green: { border: 'border-green-600 dark:border-green-500', card: 'from-green-50 to-white dark:from-green-950/40 dark:to-slate-800', icon: 'from-green-600 to-green-500', badge: 'bg-green-600 text-white', title: 'text-green-800 dark:text-green-300' },
  cyan: { border: 'border-cyan-600 dark:border-cyan-500', card: 'from-cyan-50 to-white dark:from-cyan-950/40 dark:to-slate-800', icon: 'from-cyan-600 to-cyan-500', badge: 'bg-cyan-600 text-white', title: 'text-cyan-800 dark:text-cyan-300' },
  purple: { border: 'border-purple-600 dark:border-purple-500', card: 'from-purple-50 to-white dark:from-purple-950/40 dark:to-slate-800', icon: 'from-purple-600 to-purple-500', badge: 'bg-purple-600 text-white', title: 'text-purple-800 dark:text-purple-300' },
  orange: { border: 'border-orange-500 dark:border-orange-400', card: 'from-orange-50 to-white dark:from-orange-950/40 dark:to-slate-800', icon: 'from-orange-500 to-orange-400', badge: 'bg-orange-500 text-white', title: 'text-orange-800 dark:text-orange-300' },
  emerald: { border: 'border-emerald-600 dark:border-emerald-500', card: 'from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-800', icon: 'from-emerald-600 to-emerald-500', badge: 'bg-emerald-600 text-white', title: 'text-emerald-800 dark:text-emerald-300' },
  indigo: { border: 'border-indigo-600 dark:border-indigo-500', card: 'from-indigo-50 to-white dark:from-indigo-950/40 dark:to-slate-800', icon: 'from-indigo-600 to-indigo-500', badge: 'bg-indigo-600 text-white', title: 'text-indigo-800 dark:text-indigo-300' },
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

const icons: Record<string, string> = {
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>`,
  file: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  brain: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  graduation: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
}

// ─── Custom Nodes ─────────────────────────────────────────────────────────────

const GovernanceNode = memo(function GovernanceNode({ data }: NodeProps<GovernanceNodeType>) {
  const vs = variantStyles[data.variant]
  return (
    <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 bg-gradient-to-br shadow-md transition-all duration-200 bg-white dark:bg-slate-800 cursor-pointer hover:shadow-lg ${vs.border} ${vs.card}`} style={{ width: 320 }}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${vs.icon}`} dangerouslySetInnerHTML={{ __html: icons[data.badge] ?? icons.shield }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit ${vs.badge}`}>{data.badge}</span>
        <h3 className={`text-base font-bold m-0 ${vs.title}`}>{data.title}</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">{data.subtitle}</p>
      </div>
    </div>
  )
})

const CrasNode = memo(function CrasNode({ data }: NodeProps<CrasNodeType>) {
  const vs = variantStyles[data.variant]
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border-2 bg-gradient-to-br shadow-md transition-all duration-200 bg-white dark:bg-slate-800 cursor-pointer hover:shadow-lg ${vs.border} ${vs.card}`} style={{ width: 280 }}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${vs.icon}`} dangerouslySetInnerHTML={{ __html: icons[data.badge] ?? icons.briefcase }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit ${vs.badge}`}>{data.badge}</span>
        <h3 className={`text-base font-bold m-0 ${vs.title}`}>{data.title}</h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 m-0">{data.subtitle}</p>
      </div>
    </div>
  )
})


// Lightweight badge label — no handles, just a visual tag (like Login flow's "Pré-requisito")
const PaifLabelNode = memo(function PaifLabelNode({ data }: NodeProps<PaifLabelNodeType>) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 shadow-sm">
      <div className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">{data.label}</span>
      <span className="text-[9px] text-emerald-600/70 dark:text-emerald-400/70 hidden sm:inline">{data.subtitle}</span>
    </div>
  )
})

const nodeTypes = { governance: GovernanceNode, cras: CrasNode, paifLabel: PaifLabelNode }

// ─── Data ─────────────────────────────────────────────────────────────────────

const allNodes: Node[] = [
  // Admin Federal (top)
  { id: 'admin-federal', type: 'governance', position: { x: 480, y: 0 }, data: { badge: 'FEDERAL', title: 'Administrador Federal', subtitle: 'Gestão nacional do Prontuário SUAS', variant: 'blue' as const } },

  // Row 2: Gestor Estadual, Gestor Municipal, Conselheiro
  { id: 'gestor-estadual', type: 'governance', position: { x: 100, y: 160 }, data: { badge: 'ESTADUAL', title: 'Gestor Estadual', subtitle: 'Monitora e avalia ações municipais', variant: 'green' as const } },
  { id: 'gestor-municipal', type: 'governance', position: { x: 480, y: 160 }, data: { badge: 'MUNICIPAL', title: 'Gestor Municipal', subtitle: 'Administra acessos no município', variant: 'cyan' as const } },
  { id: 'conselheiro', type: 'governance', position: { x: 860, y: 160 }, data: { badge: 'CONTROLE', title: 'Conselheiro', subtitle: 'Fiscaliza políticas públicas', variant: 'purple' as const } },

  // Row 3: Técnico Gestão Estadual, Técnico Gestão Municipal
  { id: 'tec-gestao-estadual', type: 'governance', position: { x: 100, y: 320 }, data: { badge: 'TÉC. ESTADUAL', title: 'Técnico da Gestão Estadual', subtitle: 'Suporte e capacitação aos municípios', variant: 'emerald' as const } },
  { id: 'tec-gestao-municipal', type: 'governance', position: { x: 480, y: 320 }, data: { badge: 'TÉC. MUNICIPAL', title: 'Técnico da Gestão Municipal', subtitle: 'Apoio ao planejamento municipal', variant: 'emerald' as const } },

  // CRAS — Coordenador (top, centered)
  { id: 'coordenador', type: 'cras', position: { x: 480, y: 540 }, data: { badge: 'COORD', title: 'Coordenador', subtitle: 'Supervisiona registros e equipe', variant: 'blue' as const } },

  // CRAS — Todos os profissionais lado a lado (mesmo nível, sem hierarquia entre si)
  { id: 'apoio-admin', type: 'cras', position: { x: 20, y: 800 }, data: { badge: 'APOIO', title: 'Apoio Administrativo', subtitle: 'Suporte ao CadÚnico, documentos e fluxos internos', variant: 'orange' as const } },
  { id: 'tecnico-medio', type: 'cras', position: { x: 330, y: 800 }, data: { badge: 'NÍVEL MÉDIO', title: 'Téc. Nível Médio', subtitle: 'Registro de oficinas, grupos e relatórios', variant: 'cyan' as const } },
  { id: 'assistente-social', type: 'cras', position: { x: 640, y: 800 }, data: { badge: 'PAIF', title: 'Assistente Social', subtitle: 'Estudo social e acompanhamento familiar', variant: 'emerald' as const } },
  { id: 'psicologo', type: 'cras', position: { x: 950, y: 800 }, data: { badge: 'PAIF', title: 'Psicólogo', subtitle: 'Atendimento psicossocial e acolhimento', variant: 'purple' as const } },
  { id: 'tecnico-superior', type: 'cras', position: { x: 1260, y: 800 }, data: { badge: 'NÍVEL SUP.', title: 'Téc. Nível Superior', subtitle: 'Intervenções individuais, grupais e comunitárias', variant: 'indigo' as const } },
  { id: 'educador-social', type: 'cras', position: { x: 1570, y: 800 }, data: { badge: 'EDUCADOR', title: 'Educador Social', subtitle: 'Ações socioeducativas e acompanhamento', variant: 'green' as const } },

  // PAIF label — floating badge centered above Assistente Social + Psicólogo
  { id: 'paif-label', type: 'paifLabel', position: { x: 795, y: 752 }, data: { label: 'Equipe PAIF', subtitle: 'Proteção Social Básica' } },
]

const allEdges: Edge[] = [
  // Admin Federal → children
  { id: 'e-admin-gestor-estadual', source: 'admin-federal', target: 'gestor-estadual', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 16, height: 16 } },
  { id: 'e-admin-gestor-municipal', source: 'admin-federal', target: 'gestor-municipal', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 16, height: 16 } },
  { id: 'e-admin-conselheiro', source: 'admin-federal', target: 'conselheiro', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 16, height: 16 } },

  // Gestor Estadual → Técnico da Gestão Estadual
  { id: 'e-gestor-estadual-tec', source: 'gestor-estadual', target: 'tec-gestao-estadual', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 16, height: 16 } },
  // Gestor Municipal → Técnico da Gestão Municipal
  { id: 'e-gestor-municipal-tec', source: 'gestor-municipal', target: 'tec-gestao-municipal', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 16, height: 16 } },

  // Coordenador → all CRAS professionals directly (flat, peer supervision)
  { id: 'e-coord-assistente', source: 'coordenador', target: 'assistente-social', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
  { id: 'e-coord-psicologo', source: 'coordenador', target: 'psicologo', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
  { id: 'e-coord-tec-sup', source: 'coordenador', target: 'tecnico-superior', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
  { id: 'e-coord-apoio', source: 'coordenador', target: 'apoio-admin', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
  { id: 'e-coord-tec-med', source: 'coordenador', target: 'tecnico-medio', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
  { id: 'e-coord-educador', source: 'coordenador', target: 'educador-social', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 12, height: 12 } },
]

// ─── Role detail data (for click → slide-in panel) ────────────────────────────

type RoleVariant = 'blue' | 'green' | 'cyan' | 'purple' | 'orange' | 'emerald' | 'indigo'

interface RoleDetail {
  title: string
  badge: string
  variant: RoleVariant
  icon: string
  description: string
  level?: string
}

const ROLE_DETAILS: Record<string, RoleDetail> = {
  'admin-federal': {
    title: 'Administrador Federal', badge: 'FEDERAL', variant: 'blue', icon: 'shield',
    description: 'Responsável pela gestão nacional do Prontuário Eletrônico do SUAS. Gerencia acessos e perfis na Rede SUAS, coordena e integra o sistema em todo o país, define normas e diretrizes nacionais de uso, e apoia o monitoramento e planejamento com dados agregados.',
  },
  'gestor-estadual': {
    title: 'Gestor Estadual', badge: 'ESTADUAL', variant: 'green', icon: 'map',
    description: 'Responsável pela gestão macro das informações do Prontuário SUAS no estado, apoiando e orientando os municípios. Monitora e avalia ações municipais com base em dados consolidados, planeja ações estratégicas, presta apoio técnico aos municípios, e garante a qualidade e segurança dos dados em nível estadual, sem acesso a prontuários individuais.',
  },
  'gestor-municipal': {
    title: 'Gestor Municipal', badge: 'MUNICIPAL', variant: 'cyan', icon: 'building',
    description: 'Responsável pela administração dos acessos e permissões no Prontuário SUAS no âmbito municipal. Acompanha o uso do sistema garantindo consistência e qualidade dos registros, e utiliza dados consolidados para gestão estratégica, sem acesso a prontuários individuais.',
  },
  conselheiro: {
    title: 'Conselheiro', badge: 'CONTROLE', variant: 'purple', icon: 'eye',
    description: 'Atua na gestão e no controle social, sem acesso a dados individualizados. Fiscaliza políticas públicas por meio de relatórios e dados agregados.',
  },
  'tec-gestao-estadual': {
    title: 'Técnico da Gestão Estadual', badge: 'TÉC. ESTADUAL', variant: 'emerald', icon: 'file',
    description: 'Atua no acompanhamento do Prontuário SUAS em nível estadual, assegurando a qualidade das informações. Monitora dados registrados pelos municípios, apoia o planejamento estadual com dados agregados, oferece suporte e capacitação, e define normas e rotinas de uso do sistema. Apenas profissionais vinculados ao órgão gestor e cadastrados no CadSUAS como "TÉCNICO(A) DE NÍVEL SUPERIOR" ou "COORDENADOR(A)/DIRIGENTE" possuem acesso a esse perfil.',
  },
  'tec-gestao-municipal': {
    title: 'Técnico da Gestão Municipal', badge: 'TÉC. MUNICIPAL', variant: 'emerald', icon: 'clock',
    description: 'Atua no acompanhamento do Prontuário SUAS em nível municipal, assegurando a qualidade das informações. Apoia o planejamento municipal com dados agregados, oferece suporte e capacitação, e define normas e rotinas de uso do sistema. Apenas profissionais vinculados ao órgão gestor e cadastrados no CadSUAS como "TÉCNICO(A) DE NÍVEL SUPERIOR" ou "COORDENADOR(A)/DIRIGENTE" possuem acesso a esse perfil.',
  },
  coordenador: {
    title: 'Coordenador', badge: 'COORD', variant: 'blue', icon: 'shield', level: 'Nível Superior',
    description: 'Responsável pela gestão operacional do sistema e pela supervisão dos atendimentos. Supervisiona registros e atendimentos realizados pela equipe, garante sigilo e segurança das informações, planeja e avalia ações com base em dados do sistema, e articula a comunicação interna e com a rede socioassistencial.',
  },
  'apoio-admin': {
    title: 'Apoio Administrativo – CRAS', badge: 'APOIO', variant: 'orange', icon: 'clipboard', level: 'Apoio',
    description: 'Auxilia na organização dos prontuários e no suporte às equipes do CRAS. Insere informações básicas nos sistemas do SUAS, apoia processos relacionados ao CadÚnico, emite documentos e relatórios, e apoia os fluxos internos de atendimento.',
  },
  'tecnico-medio': {
    title: 'Técnico de Nível Médio', badge: 'NÍVEL MÉDIO', variant: 'cyan', icon: 'file', level: 'Nível Médio',
    description: 'Registra as ações socioeducativas e o acompanhamento de usuários, garantindo organização e continuidade do atendimento. Produz relatórios e pareceres, registra oficinas, grupos e atividades socioeducativas, documenta atendimentos, orientações e encaminhamentos, contribui com o plano de acompanhamento familiar, identifica e registra riscos e vulnerabilidades, mantém registros alinhados às normas do SUAS, e registra articulações com a rede de serviços.',
  },
  'assistente-social': {
    title: 'Assistente Social', badge: 'PAIF', variant: 'emerald', icon: 'heart', level: 'Nível Superior',
    description: 'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento e atendimentos especializados, fortalece vínculos familiares e comunitários, orienta e encaminha para serviços e benefícios da rede, realiza intervenções individuais, grupais e comunitárias, emite documentos técnicos quando necessário, e atua em equipe multiprofissional.',
  },
  psicologo: {
    title: 'Psicólogo', badge: 'PAIF', variant: 'purple', icon: 'brain', level: 'Nível Superior',
    description: 'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento e atendimentos especializados, fortalece vínculos familiares e comunitários, orienta e encaminha para serviços e benefícios da rede, realiza intervenções individuais, grupais e comunitárias, emite documentos técnicos quando necessário, e atua em equipe multiprofissional.',
  },
  'tecnico-superior': {
    title: 'Técnico de Nível Superior', badge: 'NÍVEL SUP.', variant: 'indigo', icon: 'graduation', level: 'Nível Superior',
    description: 'Registra, planeja e acompanha ações socioassistenciais no Prontuário SUAS. Realiza acolhimento e atendimentos especializados, fortalece vínculos familiares e comunitários, orienta e encaminha para serviços e benefícios da rede, realiza intervenções individuais, grupais e comunitárias, emite documentos técnicos quando necessário, e atua em equipe multiprofissional.',
  },
  'educador-social': {
    title: 'Educador Social', badge: 'EDUCADOR', variant: 'green', icon: 'book', level: 'Nível Médio',
    description: 'Registra as ações socioeducativas e o acompanhamento de usuários, garantindo organização e continuidade do atendimento. Produz relatórios e pareceres, registra oficinas, grupos e atividades socioeducativas, documenta atendimentos, contribui com o plano de acompanhamento familiar, identifica e registra riscos e vulnerabilidades, mantém registros alinhados às normas do SUAS, e registra articulações com a rede de serviços.',
  },
}

// IDs that should trigger the panel (exclude decorative labels)
const CLICKABLE_IDS = new Set(Object.keys(ROLE_DETAILS))

// ─── Slide-in keyframes ──────────────────────────────────────────────────────

const SLIDE_IN_STYLE = `
@keyframes slide-in-right { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfissionaisFlowDiagram() {
  const [nodes] = useNodesState(allNodes)
  const [edges] = useEdgesState(allEdges)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (CLICKABLE_IDS.has(node.id)) {
      setSelectedNodeId(node.id)
    }
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const detail = selectedNodeId ? ROLE_DETAILS[selectedNodeId] : null
  const vs = detail ? variantStyles[detail.variant] : null

  return (
    <div className="w-full h-full relative">
      <style>{SLIDE_IN_STYLE}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnDoubleClick={true}
        preventScrolling={true}
        proOptions={{ hideAttribution: true }}
        className="!bg-transparent"
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
          <defs>
            <pattern id="dot-grid-prof" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.5" fill="currentColor" className="text-slate-900 dark:text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-prof)" />
        </svg>
        <Controls
          className="!rounded-xl !border !border-slate-200 dark:!border-slate-700 !shadow-md !bg-white/90 dark:!bg-slate-800/90 !backdrop-blur-sm"
          position="bottom-right"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-3 text-[10px]">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
          <span className="w-3 h-0.5 bg-slate-400" />
          Hierarquia direta
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
          <span className="w-3 h-0.5 bg-slate-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 4px, transparent 4px, transparent 8px)' }} />
          Relação com CRAS
        </span>
      </div>

      {/* Detail panel — slides in from the right */}
      {detail && vs && (
        <>
          {/* Backdrop (click to close) */}
          <div className="absolute inset-0 z-20 bg-black/10 dark:bg-black/30 animate-[fade-out_0.15s_ease-out_reverse]" onClick={onPaneClick} />

          <aside
            className="absolute top-4 right-4 bottom-4 z-30 w-[400px] max-w-[85vw]
                       rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800 overflow-hidden flex flex-col
                       animate-[slide-in-right_0.25s_ease-out]"
          >
            {/* Header */}
            <div className={`flex items-center gap-3 p-4 border-b-2 bg-gradient-to-r ${vs.card} ${vs.border}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${vs.icon}`}
                dangerouslySetInnerHTML={{ __html: icons[detail.icon] ?? icons.briefcase }}
              />
              <div className="flex-1 min-w-0">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit mb-1 ${vs.badge}`}>
                  {detail.badge}
                </span>
                <h3 className={`text-[15px] font-bold leading-tight ${vs.title}`}>{detail.title}</h3>
                {detail.level && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">{detail.level}</span>
                )}
              </div>
              <button
                onClick={onPaneClick}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.description}</p>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
