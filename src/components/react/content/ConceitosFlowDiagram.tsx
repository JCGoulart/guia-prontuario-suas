import { memo, useState, useCallback } from 'react'
import {
  ReactFlow,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import type { Node, Edge, NodeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type ConceptData = {
  title: string
  subtitle: string
  accent: 'blue' | 'green'
  icon: string
}

type ConceptNodeType = Node<ConceptData, 'concept'>

interface ConceptDetail {
  title: string
  accent: 'blue' | 'green'
  icon: string
  oQueE: string
  objetivo: string
  noProntuario: string
  quemRealiza: string
  naPratica: string
}

// ─── Accent styles ────────────────────────────────────────────────────────────

const accentStyles = {
  blue: { border: 'border-blue-600 dark:border-blue-500', card: 'from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-800', icon: 'from-blue-600 to-blue-500', badge: 'bg-blue-600 text-white', title: 'text-blue-800 dark:text-blue-300' },
  green: { border: 'border-green-600 dark:border-green-500', card: 'from-green-50 to-white dark:from-green-950/40 dark:to-slate-800', icon: 'from-green-600 to-green-500', badge: 'bg-green-600 text-white', title: 'text-green-800 dark:text-green-300' },
}

// ─── Custom Node ──────────────────────────────────────────────────────────────

const ConceptNode = memo(function ConceptNode({ data }: NodeProps<ConceptNodeType>) {
  const as = accentStyles[data.accent]
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border-2 bg-gradient-to-br shadow-md transition-all duration-200 bg-white dark:bg-slate-800 cursor-pointer hover:shadow-lg ${as.border} ${as.card}`} style={{ width: 300 }}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${as.icon}`} dangerouslySetInnerHTML={{ __html: data.icon }} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3 className={`text-[13px] font-bold leading-tight m-0 ${as.title}`}>{data.title}</h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 m-0">{data.subtitle}</p>
      </div>
    </div>
  )
})

const nodeTypes = { concept: ConceptNode }

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONCEPTS: { id: string; title: string; subtitle: string; accent: 'blue' | 'green'; icon: string }[] = [
  { id: 'atendimento', title: 'Atendimento', subtitle: 'Resposta direta e pontual às demandas', accent: 'blue', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  { id: 'acompanhamento-social', title: 'Acompanhamento Social', subtitle: 'Processo planejado e continuado', accent: 'green', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
  { id: 'articulacao-intersetorial', title: 'Articulação Intersetorial', subtitle: 'Coordenação entre políticas públicas', accent: 'blue', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' },
  { id: 'busca-ativa', title: 'Busca Ativa', subtitle: 'Prospecção territorial proativa', accent: 'green', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
  { id: 'diagnostico-social', title: 'Diagnóstico Social', subtitle: 'Estudo sistemático do território', accent: 'blue', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.5 16.5 16 19"/></svg>' },
  { id: 'escuta-qualificada', title: 'Escuta Qualificada', subtitle: 'Acolhimento com empatia e respeito', accent: 'green', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 17.5 5 21l3-5.5"/><path d="M8.5 2.5a6.5 6.5 0 0 1 6.5 6.5c0 2.5-1.8 4.5-3 5.5l-1 1v3H9v-3l-1-1C6.8 13.5 5 11.5 5 9A6.5 6.5 0 0 1 8.5 2.5z"/><path d="M15.5 6.5a3.5 3.5 0 0 1 0 7"/></svg>' },
  { id: 'pratica-reflexiva', title: 'Prática Reflexiva', subtitle: 'Análise crítica da atuação profissional', accent: 'blue', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>' },
  { id: 'familia', title: 'Família', subtitle: 'Matricialidade sociofamiliar — base do SUAS', accent: 'green', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { id: 'territorio', title: 'Território', subtitle: 'Centralidade territorial — onde o SUAS acontece', accent: 'blue', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
]

// ─── Cloud layout — concepts positioned spatially, no edges ──────────────────
//
//     Território (fundação)
//    Prática Reflexiva (transversal)
//   Busca Ativa          Diagnóstico Social
//   Escuta Qualificada   Atendimento   Articulação Intersetorial
//       Acompanhamento Social
//            Família (base)

const allNodes: Node[] = [
  // Row -1 (y=-240): Território — fundamento territorial
  { id: 'territorio', type: 'concept', position: { x: 480, y: -240 }, data: CONCEPTS[8] },

  // Row 0 (y=-80): Prática Reflexiva — meta
  { id: 'pratica-reflexiva', type: 'concept', position: { x: 480, y: -80 }, data: CONCEPTS[6] },

  // Row 1 (y=120): Inputs — Busca Ativa, Diagnóstico Social
  { id: 'busca-ativa', type: 'concept', position: { x: 100, y: 120 }, data: CONCEPTS[3] },
  { id: 'diagnostico-social', type: 'concept', position: { x: 860, y: 120 }, data: CONCEPTS[4] },

  // Row 2 (y=320): Core — Escuta Qualificada, Atendimento, Articulação
  { id: 'escuta-qualificada', type: 'concept', position: { x: 100, y: 320 }, data: CONCEPTS[5] },
  { id: 'atendimento', type: 'concept', position: { x: 480, y: 320 }, data: CONCEPTS[0] },
  { id: 'articulacao-intersetorial', type: 'concept', position: { x: 860, y: 320 }, data: CONCEPTS[2] },

  // Row 3 (y=520): Acompanhamento Social
  { id: 'acompanhamento-social', type: 'concept', position: { x: 480, y: 520 }, data: CONCEPTS[1] },

  // Row 4 (y=720): Família — matricialidade sociofamiliar
  { id: 'familia', type: 'concept', position: { x: 480, y: 720 }, data: CONCEPTS[7] },
]

// ─── No edges — cloud of concepts; relationships explained in detail panel ───

const allEdges: Edge[] = []

// ─── Detail data ──────────────────────────────────────────────────────────────

const DETAILS: Record<string, ConceptDetail> = {
  atendimento: {
    title: 'Atendimento', accent: 'blue', icon: CONCEPTS[0].icon,
    oQueE: 'No âmbito do SUAS, uma ação imediata de prestação ou oferta de atenção — a participação das famílias, um ou mais de seus membros, nas ações de acolhida, ações particularizadas, oficinas, ações comunitárias e/ou encaminhamentos. O atendimento pode se encerrar na resolução de uma demanda específica, com ou sem retorno, ou pode dar início a um processo de acompanhamento familiar.',
    objetivo: 'Prestar resposta imediata e qualificada às demandas da população, promovendo o primeiro acolhimento e a inserção no sistema de proteção social.',
    noProntuario: 'Registrado na funcionalidade "Atendimento Individual" ou "Atendimento Coletivo" do Prontuário SUAS, com campos para tipo de atendimento, profissional responsável, data e encaminhamentos realizados.',
    quemRealiza: 'Todos os técnicos do CRAS — Assistentes Sociais, Psicólogos, Técnicos de Nível Superior, Técnicos de Nível Médio e Educadores Sociais.',
    naPratica: 'Um cidadão procura o CRAS relatando dificuldades financeiras. O técnico registra o atendimento inicial, coleta dados básicos e agenda o retorno para estudo social.',
  },
  'acompanhamento-social': {
    title: 'Acompanhamento Social', accent: 'green', icon: CONCEPTS[1].icon,
    oQueE: 'No âmbito do SUAS, é o conjunto de atividades desenvolvidas por meio de atendimentos sistemáticos e planejados, com objetivos estabelecidos, que possibilitem às famílias/indivíduos o acesso a um espaço onde possam refletir sobre sua realidade, construir novos projetos de vida e transformar suas relações familiares ou comunitárias. Trata-se de um processo de caráter continuado e planejado, por período determinado, no qual são definidas estratégias de ação e objetivos a serem alcançados a partir da compreensão das vulnerabilidades, demandas e potencialidades apresentadas pela família.',
    objetivo: 'Promover a superação planejada das situações de vulnerabilidade por meio de intervenções continuadas com metas definidas e avaliação periódica dos resultados.',
    noProntuario: 'Registrado no Plano de Acompanhamento Familiar (PAF) do Prontuário SUAS, com campos para metas, evoluções periódicas, revisões e indicadores de resultados. Cada interação é documentada como evolução do plano.',
    quemRealiza: 'Assistente Social, Psicólogo e Técnico de Nível Superior, com apoio do Educador Social e Técnico de Nível Médio para registros de evolução.',
    naPratica: 'A família Silva é acompanhada mensalmente com visitas domiciliares e atualização do plano de acompanhamento, registrando cada evolução no prontuário.',
  },
  'articulacao-intersetorial': {
    title: 'Articulação Intersetorial', accent: 'blue', icon: CONCEPTS[2].icon,
    oQueE: 'Coordenação entre diferentes políticas públicas — saúde, educação, habitação, trabalho e assistência social — para garantir atenção integral às famílias. O SUAS atua como articulador, estabelecendo fluxos e protocolos que integram serviços de setores diversos em torno do mesmo território.',
    objetivo: 'Garantir atenção integral às famílias, articulando serviços de saúde, educação, habitação e trabalho em torno do mesmo território, evitando a fragmentação do cuidado.',
    noProntuario: 'Registrada nos encaminhamentos e contrarreferências do Prontuário SUAS, documentando a comunicação entre setores e o acompanhamento dos casos compartilhados.',
    quemRealiza: 'Coordenador do CRAS, Assistentes Sociais e Psicólogos, com participação dos demais técnicos de nível superior.',
    naPratica: 'O CRAS articula com a UBS local o encaminhamento de gestante em vulnerabilidade, compartilhando informações essenciais via relatório técnico.',
  },
  'busca-ativa': {
    title: 'Busca Ativa', accent: 'green', icon: CONCEPTS[3].icon,
    oQueE: 'Estratégia de prospecção territorial para identificar famílias e indivíduos em situação de vulnerabilidade que não acessam espontaneamente os serviços socioassistenciais. Realizada por equipes volantes, utiliza mapeamento territorial e sistemas de informação para alcançar populações invisibilizadas.',
    objetivo: 'Alcançar populações em situação de vulnerabilidade que não acessam espontaneamente os serviços, garantindo a universalidade do direito à assistência social.',
    noProntuario: 'As famílias identificadas são inseridas no Prontuário SUAS pela equipe volante, iniciando o registro com dados de identificação, composição familiar e vulnerabilidades detectadas na abordagem.',
    quemRealiza: 'Equipe volante do CRAS, Educador Social e técnicos designados para ações territoriais, com supervisão do Coordenador.',
    naPratica: 'Equipe volante identifica famílias em ocupação irregular não cadastradas, realiza abordagem e insere os dados no sistema para início do acompanhamento.',
  },
  'diagnostico-social': {
    title: 'Diagnóstico Social', accent: 'blue', icon: CONCEPTS[4].icon,
    oQueE: 'Estudo sistemático do território que fundamenta a oferta de serviços socioassistenciais. Compreende a coleta e análise de dados demográficos, socioeconômicos e culturais, identificando demandas, potencialidades e riscos sociais para orientar o planejamento das ações da política de assistência social.',
    objetivo: 'Fundamentar o planejamento territorial com dados reais, identificando demandas, potencialidades e riscos sociais para orientar a oferta de serviços.',
    noProntuario: 'Os dados do Prontuário SUAS e do CadÚnico são cruzados para identificar padrões territoriais — como concentração de famílias em extrema pobreza, prevalência de determinadas vulnerabilidades e lacunas na cobertura de serviços.',
    quemRealiza: 'Técnicos de Nível Superior (Assistente Social, Psicólogo e demais), sob coordenação do Coordenador do CRAS.',
    naPratica: 'O técnico cruza dados do CadÚnico com registros de atendimento para identificar que 60% das famílias do território têm renda per capita abaixo de 1/4 do salário mínimo e 30% não possuem cadastro atualizado.',
  },
  'escuta-qualificada': {
    title: 'Escuta Qualificada', accent: 'green', icon: CONCEPTS[5].icon,
    oQueE: 'Técnica de acolhimento profissional baseada no respeito, na empatia e na não-judgmentalidade. Pressupõe que o profissional estabeleça vínculo de confiança com o usuário, reconhecendo sua autonomia e protagonismo, para além da coleta de informações objetivas sobre a situação apresentada.',
    objetivo: 'Estabelecer vínculo de confiança respeitando a autonomia e o protagonismo do usuário, indo além da coleta de informações objetivas para compreender o contexto integral da situação.',
    noProntuario: 'As observações qualitativas da escuta são registradas no campo de anotações do atendimento no Prontuário SUAS, complementando os dados objetivos com elementos subjetivos relevantes para o acompanhamento.',
    quemRealiza: 'Todos os profissionais do CRAS que realizam atendimento direto à população — em especial Assistentes Sociais e Psicólogos.',
    naPratica: 'Durante a entrevista, o profissional acolhe o relato de violência doméstica sem julgamento, registra no prontuário e aciona a rede de proteção.',
  },
  'pratica-reflexiva': {
    title: 'Prática Reflexiva', accent: 'blue', icon: CONCEPTS[6].icon,
    oQueE: 'Processo de formação contínua em que profissionais do SUAS analisam criticamente sua própria atuação, articulando teoria e prática. Fundamenta-se na sistematização da experiência, no estudo de casos e na supervisão técnica, promovendo o aperfeiçoamento permanente da intervenção socioassistencial.',
    objetivo: 'Promover o aperfeiçoamento contínuo da intervenção socioassistencial por meio da análise crítica da própria atuação, articulando teoria e prática.',
    noProntuario: 'Os dados do Prontuário SUAS alimentam as reuniões de estudo de caso, permitindo que a equipe analise trajetórias de acompanhamento, identifique padrões e revise estratégias de intervenção com base em evidências registradas.',
    quemRealiza: 'Toda a equipe do CRAS, em reuniões periódicas sob supervisão do Coordenador, com participação ativa de Assistentes Sociais, Psicólogos e demais técnicos.',
    naPratica: 'Em reunião de equipe, os técnicos discutem um caso complexo usando os registros do Prontuário SUAS, revisam abordagens anteriores e propõem nova estratégia de intervenção fundamentada teoricamente.',
  },
  familia: {
    title: 'Família', accent: 'green', icon: CONCEPTS[7].icon,
    oQueE: 'Na Política Nacional de Assistência Social (PNAS), a família não é constituída apenas pelos laços consanguíneos, mas também por laços afetivos e de solidariedade. A matricialidade sociofamiliar é a base do trabalho social com famílias no SUAS — parte do pressuposto de que, para a família prevenir, proteger, promover e incluir seus membros, é necessário garantir condições de sustentabilidade. A família é composta pela Referência Familiar (pessoa responsável pelas informações socioeconômicas) e pelos membros da composição familiar que residem no domicílio.',
    objetivo: 'Assegurar a centralidade da família como núcleo social fundamental da política de assistência social, superando a focalização individual e garantindo atenção integral ao grupo familiar.',
    noProntuario: 'A composição familiar é registrada no Prontuário SUAS com dados da Referência Familiar (NIS, renda, escolaridade), membros do domicílio, condições de moradia e vulnerabilidades identificadas. O Plano de Acompanhamento Familiar é estruturado a partir desse núcleo.',
    quemRealiza: 'A Referência Familiar é a principal interlocutora com os técnicos do CRAS, respondendo pelas informações do grupo familiar durante os atendimentos e acompanhamentos.',
    naPratica: 'Dona Maria, avó e responsável pelo neto, é cadastrada como Referência Familiar. O técnico registra os 4 membros do domicílio, identifica que 2 são beneficiários do Bolsa Família e inicia o plano de acompanhamento focado nas vulnerabilidades do grupo.',
  },
  territorio: {
    title: 'Território', accent: 'blue', icon: CONCEPTS[8].icon,
    oQueE: 'Refere-se à centralidade do território como fator determinante para a compreensão das situações de vulnerabilidade e riscos sociais, bem como para seu enfrentamento. A territorialização se materializa a partir da descentralização da Política Nacional de Assistência Social, com a oferta dos serviços socioassistenciais em locais próximos aos seus usuários. O território constitui um espaço humano e habitado — é nos espaços coletivos que se expressam a solidariedade, a extensão das relações familiares para além da consanguinidade e o desenvolvimento do sentimento de pertença e identidade.',
    objetivo: 'Garantir que os serviços socioassistenciais sejam planejados e ofertados a partir da realidade concreta do território, reconhecendo suas especificidades, vulnerabilidades e potencialidades.',
    noProntuario: 'O Prontuário SUAS permite o mapeamento territorial por unidade CRAS, cruzando dados do CadÚnico com registros de atendimento para identificar concentração de vulnerabilidades, lacunas de cobertura e demandas específicas de cada território.',
    quemRealiza: 'Coordenador do CRAS, Técnicos de Nível Superior e equipes volantes que atuam diretamente no território, com apoio dos dados do sistema.',
    naPratica: 'O diagnóstico do território X revela concentração de famílias monoparentais chefiadas por mulheres e baixa cobertura de serviços para idosos. O CRAS reorganiza a oferta de oficinas e prioriza busca ativa nesse perfil.',
  },
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const SLIDE_IN_STYLE = `
@keyframes slide-in-right { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConceitosFlowDiagram() {
  const [nodes] = useNodesState(allNodes)
  const [edges] = useEdgesState(allEdges)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (DETAILS[node.id]) setSelectedId(node.id)
  }, [])

  const onPaneClick = useCallback(() => setSelectedId(null), [])

  const detail = selectedId ? DETAILS[selectedId] : null
  const as = detail ? accentStyles[detail.accent] : null

  return (
    <div className="w-full h-full relative">
      <style>{SLIDE_IN_STYLE}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
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
            <pattern id="dot-grid-conceitos" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.5" fill="currentColor" className="text-slate-900 dark:text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-conceitos)" />
        </svg>
        <Controls
          className="!rounded-xl !border !border-slate-200 dark:!border-slate-700 !shadow-md !bg-white/90 dark:!bg-slate-800/90 !backdrop-blur-sm"
          position="bottom-right"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Detail panel */}
      {detail && as && (
        <>
          <div className="absolute inset-0 z-20 bg-black/10 dark:bg-black/30 animate-[fade-out_0.15s_ease-out_reverse]" onClick={onPaneClick} />
          <aside className="absolute top-4 right-4 bottom-4 z-30 w-[420px] max-w-[85vw] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col animate-[slide-in-right_0.25s_ease-out]">
            {/* Header */}
            <div className={`flex items-center gap-3 p-4 border-b-2 bg-gradient-to-r ${as.card} ${as.border}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${as.icon}`}
                dangerouslySetInnerHTML={{ __html: detail.icon }}
              />
              <div className="flex-1 min-w-0">
                <h3 className={`text-[15px] font-bold leading-tight ${as.title}`}>{detail.title}</h3>
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

            {/* Body — 5 sections */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* O que é */}
              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">O que é</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.oQueE}</p>
              </section>

              {/* Objetivo */}
              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Objetivo</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.objetivo}</p>
              </section>

              {/* No Prontuário SUAS */}
              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">No Prontuário SUAS</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.noProntuario}</p>
              </section>

              {/* Quem realiza */}
              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Quem realiza</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{detail.quemRealiza}</p>
              </section>

              {/* Na prática */}
              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Na prática</h4>
                <div className="border-l-2 border-institucional-blue dark:border-institucional-blue/60 pl-3 text-xs text-slate-500 dark:text-slate-400 italic">
                  {detail.naPratica}
                </div>
              </section>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
