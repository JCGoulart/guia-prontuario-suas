import { memo } from 'react'
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

type FlowStep = {
  badge: string
  title: string
  subtitle: string
  variant: 'blue' | 'green' | 'cyan' | 'purple' | 'amber'
}

type Prerequisite = {
  title: string
  description: string
}

type PostAction = {
  icon: string
  title: string
  description: string
}

type FlowStepNode = Node<FlowStep, 'flowStep'>
type PrerequisiteNode = Node<Prerequisite, 'prerequisite'>
type PostActionNode = Node<PostAction, 'postAction'>

// ─── Variant styles ───────────────────────────────────────────────────────────

const flowVariantStyles: Record<
  FlowStep['variant'],
  { border: string; card: string; icon: string; title: string; badge: string }
> = {
  blue: { border: 'border-blue-600 dark:border-blue-500', card: 'from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-800', icon: 'from-blue-600 to-blue-500', title: 'text-blue-800 dark:text-blue-300', badge: 'bg-blue-600 text-white' },
  green: { border: 'border-green-600 dark:border-green-500', card: 'from-green-50 to-white dark:from-green-950/40 dark:to-slate-800', icon: 'from-green-600 to-green-500', title: 'text-green-800 dark:text-green-300', badge: 'bg-green-600 text-white' },
  cyan: { border: 'border-cyan-600 dark:border-cyan-500', card: 'from-cyan-50 to-white dark:from-cyan-950/40 dark:to-slate-800', icon: 'from-cyan-600 to-cyan-500', title: 'text-cyan-800 dark:text-cyan-300', badge: 'bg-cyan-600 text-white' },
  purple: { border: 'border-purple-600 dark:border-purple-500', card: 'from-purple-50 to-white dark:from-purple-950/40 dark:to-slate-800', icon: 'from-purple-600 to-purple-500', title: 'text-purple-800 dark:text-purple-300', badge: 'bg-purple-600 text-white' },
  amber: { border: 'border-amber-500 dark:border-amber-400', card: 'from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-800', icon: 'from-amber-500 to-amber-400', title: 'text-amber-800 dark:text-amber-300', badge: 'bg-amber-500 text-white' },
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

const icons: Record<string, string> = {
  login: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  cpf: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="16" x2="12" y2="16"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  monitor: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  file: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  alert: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  badge: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
}

const badgeLabels: Record<string, string> = {
  login: 'GOV.BR', cpf: 'CPF', check: 'AÇÃO', shield: 'AUTORIZAR',
  building: 'SELECIONAR', monitor: 'INICIAL', file: 'TERMO',
}

// ─── Custom Nodes ─────────────────────────────────────────────────────────────

const FlowStepNode = memo(function FlowStepNode({ data }: NodeProps<FlowStepNode>) {
  const vs = flowVariantStyles[data.variant]
  return (
    <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 bg-gradient-to-br shadow-md transition-all duration-200 bg-white dark:bg-slate-800 ${vs.border} ${vs.card}`} style={{ width: 340 }}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${vs.icon}`} dangerouslySetInnerHTML={{ __html: icons[data.badge] ?? icons.login }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit ${vs.badge}`}>{badgeLabels[data.badge] ?? data.badge}</span>
        <h3 className={`text-base font-bold m-0 ${vs.title}`}>{data.title}</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">{data.subtitle}</p>
      </div>
    </div>
  )
})

const PrerequisiteNode = memo(function PrerequisiteNode({ data }: NodeProps<PrerequisiteNode>) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg border border-dashed border-amber-400 dark:border-amber-600 bg-gradient-to-br from-amber-50/80 to-amber-100/60 dark:from-amber-950/30 dark:to-amber-900/20 shadow-sm" style={{ width: 260 }}>
      <Handle type="source" position={Position.Right} className="!bg-amber-400 !border-amber-400 !w-2 !h-2" />
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" dangerouslySetInnerHTML={{ __html: icons.alert }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pré-requisito</span>
        <h4 className="text-xs font-bold text-amber-800 dark:text-amber-200 leading-tight">{data.title}</h4>
        <p className="text-[10px] text-amber-700/70 dark:text-amber-300/70 leading-relaxed">{data.description}</p>
      </div>
    </div>
  )
})

const PostActionNode = memo(function PostActionNode({ data }: NodeProps<PostActionNode>) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700 bg-gradient-to-br from-indigo-50/80 to-indigo-100/60 dark:from-indigo-950/30 dark:to-indigo-900/20 shadow-sm" style={{ width: 250 }}>
      <Handle type="target" position={Position.Left} className="!bg-indigo-400 !border-indigo-400 !w-2 !h-2" />
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400" dangerouslySetInnerHTML={{ __html: data.icon }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-200 leading-tight">{data.title}</h4>
        <p className="text-[10px] text-indigo-600/70 dark:text-indigo-300/70 leading-relaxed">{data.description}</p>
      </div>
    </div>
  )
})

const nodeTypes = { flowStep: FlowStepNode, prerequisite: PrerequisiteNode, postAction: PostActionNode }

// ─── Data ─────────────────────────────────────────────────────────────────────

const allNodes: Node[] = [
  // Main spine
  ...[
    { badge: 'login', title: 'Acessar portal gov.br', subtitle: 'Acesse o site gov.br com sua conta', variant: 'blue' as const },
    { badge: 'cpf', title: 'Informar CPF e senha', subtitle: 'Digite o CPF (11 dígitos) e sua senha gov.br', variant: 'blue' as const },
    { badge: 'check', title: 'Clicar em Continuar', subtitle: 'Acione a opção Continuar na tela de login', variant: 'blue' as const },
    { badge: 'shield', title: 'Autorizar uso de dados', subtitle: 'O sistema exibe a tela de Autorização de uso de dados pessoais', variant: 'green' as const },
    { badge: 'building', title: 'Selecionar unidade e perfil', subtitle: 'Escolha a unidade de atendimento e o perfil desejado', variant: 'cyan' as const },
    { badge: 'check', title: 'Confirmar acesso', subtitle: 'Acione Confirmar para entrar no sistema', variant: 'cyan' as const },
    { badge: 'monitor', title: 'Tela inicial do Prontuário', subtitle: 'Sistema liberado conforme permissões do perfil no CadSUAS', variant: 'purple' as const },
    { badge: 'file', title: 'Aceitar Termo de Uso', subtitle: 'No primeiro acesso, preenchimento e aceite são obrigatórios', variant: 'amber' as const },
  ].map((d, i) => ({ id: ['acessar', 'cpf', 'continuar', 'autorizar', 'selecionar', 'confirmar', 'inicial', 'termo'][i], type: 'flowStep' as const, position: { x: 480, y: i * 140 }, data: d })),
  // Prerequisites (left)
  { id: 'pre-nivel', type: 'prerequisite' as const, position: { x: 0, y: 140 }, data: { title: 'Conta gov.br Ouro ou Prata', description: 'Apenas contas com nível de segurança Ouro ou Prata. Contas nível Bronze NÃO permitem acesso ao sistema.' } },
  { id: 'pre-cadsuas', type: 'prerequisite' as const, position: { x: 0, y: 340 }, data: { title: 'Cadastro no CadSUAS', description: 'Profissional deve estar cadastrado e vinculado a uma unidade no CadSUAS (CRAS, CREAS ou órgão gestor).' } },
  { id: 'pre-perfil', type: 'prerequisite' as const, position: { x: 0, y: 540 }, data: { title: 'Perfil de acesso autorizado', description: 'Apenas perfis de Técnico de Nível Superior ou Coordenador(a)/Dirigente possuem acesso ao prontuário.' } },
  // Post-login (right)
  { id: 'post-verificar', type: 'postAction' as const, position: { x: 860, y: 840 }, data: { icon: icons.user, title: 'Verificar dados do usuário', description: 'No canto superior direito: confira CPF, nome e avatar do usuário logado.' } },
  { id: 'post-perfil', type: 'postAction' as const, position: { x: 860, y: 980 }, data: { icon: icons.badge, title: 'Verificar unidade e perfil', description: 'Acione o ícone do avatar para ver unidade de atendimento e perfil ativo.' } },
  { id: 'post-trocar', type: 'postAction' as const, position: { x: 860, y: 1090 }, data: { icon: icons.refresh, title: 'Trocar de perfil', description: 'Caso possua mais de um perfil cadastrado, é possível alternar entre eles.' } },
  { id: 'post-logout', type: 'postAction' as const, position: { x: 860, y: 1200 }, data: { icon: icons.logout, title: 'Sair do sistema (logout)', description: 'Encerre a sessão de forma segura pelo menu do avatar.' } },
  { id: 'post-menu', type: 'postAction' as const, position: { x: 860, y: 1310 }, data: { icon: icons.menu, title: 'Navegar pelo menu SUAS', description: 'No lado esquerdo da tela: menu principal (SUAS) e submenus do sistema.' } },
]

const allEdges: Edge[] = [
  // Main spine
  ...['acessar', 'cpf', 'continuar', 'autorizar', 'selecionar', 'confirmar', 'inicial'].map((src, i) => {
    const targets = ['cpf', 'continuar', 'autorizar', 'selecionar', 'confirmar', 'inicial', 'termo']
    const isTermo = targets[i] === 'termo'
    return {
      id: `e-${src}-${targets[i]}`,
      source: src,
      target: targets[i],
      type: 'smoothstep' as const,
      animated: true,
      style: { stroke: isTermo ? '#d97706' : '#94a3b8', strokeWidth: isTermo ? 1.5 : 2, strokeDasharray: isTermo ? '6 4' : undefined },
      markerEnd: { type: MarkerType.ArrowClosed, color: isTermo ? '#d97706' : '#94a3b8', width: isTermo ? 14 : 16, height: isTermo ? 14 : 16 },
      ...(isTermo ? { label: '1º acesso', labelStyle: { fill: '#d97706', fontSize: 10, fontWeight: 700 } } : {}),
    }
  }),
  // Prerequisites → spine
  { id: 'e-pre-nivel-cpf', source: 'pre-nivel', target: 'cpf', type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5, strokeDasharray: '6 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 12, height: 12 } },
  { id: 'e-pre-cadsuas-cpf', source: 'pre-cadsuas', target: 'cpf', type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5, strokeDasharray: '6 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 12, height: 12 } },
  { id: 'e-pre-perfil-selecionar', source: 'pre-perfil', target: 'selecionar', type: 'smoothstep', style: { stroke: '#d97706', strokeWidth: 1.5, strokeDasharray: '6 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#d97706', width: 12, height: 12 } },
  // Spine → post-login
  { id: 'e-inicial-post-verificar', source: 'inicial', target: 'post-verificar', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 12, height: 12 } },
  { id: 'e-post-verificar-post-perfil', source: 'post-verificar', target: 'post-perfil', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 12, height: 12 } },
  { id: 'e-post-perfil-post-trocar', source: 'post-perfil', target: 'post-trocar', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 12, height: 12 } },
  { id: 'e-post-perfil-post-logout', source: 'post-perfil', target: 'post-logout', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 12, height: 12 } },
  { id: 'e-post-logout-post-menu', source: 'post-logout', target: 'post-menu', type: 'smoothstep', style: { stroke: '#6366f1', strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1', width: 12, height: 12 } },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginFlowDiagram() {
  const [nodes] = useNodesState(allNodes)
  const [edges] = useEdgesState(allEdges)

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnDoubleClick={true}
        preventScrolling={true}
        proOptions={{ hideAttribution: true }}
        className="!bg-transparent"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
          <defs>
            <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.5" fill="currentColor" className="text-slate-900 dark:text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
        <Controls
          className="!rounded-xl !border !border-slate-200 dark:!border-slate-700 !shadow-md !bg-white/90 dark:!bg-slate-800/90 !backdrop-blur-sm"
          position="bottom-right"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-3 text-[10px]">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
          <span className="w-3 h-0.5 bg-amber-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d97706 0, #d97706 4px, transparent 4px, transparent 8px)' }} />
          Pré-requisito
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
          <span className="w-3 h-0.5 bg-indigo-500" />
          Pós-login
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
          <span className="w-3 h-0.5 bg-amber-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d97706 0, #d97706 4px, transparent 4px, transparent 8px)' }} />
          1º acesso
        </span>
      </div>
    </div>
  )
}
