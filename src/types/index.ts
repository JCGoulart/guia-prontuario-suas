export interface ChapterSection {
  id: string
  title: string
  anchor: string
  pageStart?: number
  pageEnd?: number
}

export interface Chapter {
  id: string
  title: string
  accent: 'gestao' | 'planejamento' | 'reprogramacao' | 'controle'
  items: ChapterSection[]
}

export interface Anotacao {
  numero: number
  texto: string
  destaque?: boolean
}

export interface CarouselPage {
  screenshotSrc: string
  paginaFisica: number
  tituloPagina: string
  anotacoes: Anotacao[]
  textoExplicativo?: string
}

export interface TutorialProps {
  screenshotSrc: string
  titulo: string
  subtitulo?: string
  anotacoes: Anotacao[]
  paginaFisica: number
  observacao?: string
}

export interface Rule {
  number: number
  title: string
  description: string
  highlight?: boolean
  highlightColor?: string
}

export interface ChecklistItem {
  id: string
  text: string
}

export interface ComparisonRow {
  item: string
  status: 'pode' | 'nao' | 'condicao' | 'limite'
  condition: string
}

export interface Program {
  id: string
  name: string
  icon: string
  org: string
  eligibility: string
  registration: string
  details: {
    documentos: string[]
    prazo: string
    observacoes: string
  }
}
