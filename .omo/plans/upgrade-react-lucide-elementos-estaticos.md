# Plano de Upgrade Visual — Elementos Estáticos para React + Lucide

**Data**: 2026-07-10
**Contexto**: Após o upgrade estrutural (Fases 1–6 do plano anterior), auditoria revelou 124 elementos estáticos em 26 arquivos passíveis de upgrade para React + Lucide.
**Já concluído**: `VulnerabilityMap.tsx`, `HealthEducationIndicators.tsx`, `ChecklistGrid.tsx`

---

## 1. Diagnóstico

| Padrão | Ocorrências | Arquivos |
|---|---|---|
| `border-t-4` card com badge + descrição | 48 cards em 14 grids | Apresentacao (11x), AtendimentoColetivo (6x), Encaminhamentos (3x), Metodologia (3x), Migracao (6x), PainelEstatistico (7x), LoginSistema (2x) |
| `border-l-4` callout | 20 instâncias | Apresentacao (8x), TermoUso (2x), LoginSistema (4x), GestaoProntuario (2x), Vulnerabilidades (1x) |
| Tabela HTML estática | 3 tabelas | DiagnosticoSocioeconomico, BeneficiosEventuais, AtendimentoColetivo |
| "Boas Práticas" com lista numerada | 6 instâncias | Diagnostico, Beneficios, Metodologia, Encaminhamentos, CondicoesVida, GestaoProntuario |
| "Veja Também" cross-reference | 11 instâncias | Todos os 10 expandidas + TiposRegistro |
| Cards de perfil profissional | 8 cards + 3 cards acesso + 7 conceitos | Apresentacao |
| SVG fluxograma customizado | 2 diagramas | FluxoAtendimento, CicloAcompanhamento |

---

## 2. Plano de Implementação

### FASE 1 — Reutilizáveis Astro (3 componentes, baixo esforço, alto retorno)

| # | Arquivo | Descrição | Substitui em |
|---|---|---|---|
| 1.1 | `src/components/astro/content/BestPracticesList.astro` | Componente de lista numerada "Boas Práticas" com 3 variantes de cor (blue/green/amber) e ícones Lucide via `set:html` | GestaoProntuario, DiagnosticoSocioeconomico, BeneficiosEventuais, VulnerabilidadesProtecoes, CondicoesVida, EncaminhamentosIntersetorialidade |
| 1.2 | `src/components/astro/content/FeatureCard.astro` | Card reutilizável `border-t-4` com badge, ícone Lucide e descrição. Aceita props: `title`, `description`, `accent`, `icon`, `badge?` | Apresentacao (11x), AtendimentoColetivo (6x), Encaminhamentos (3x), Metodologia (3x), Migracao (6x), PainelEstatistico (7x), LoginSistema (2x) |
| 1.3 | `src/components/astro/content/SeeAlso.astro` | Componente "Veja também" com InfoCard wrapper + array de links com ícones Lucide. Substitui as 11 seções idênticas | Todos os 10 expandidas + TiposRegistro |

**Validação**: `npx astro check` após cada componente, `npm run build` ao final da fase.

---

### FASE 2 — React Interativos (4 componentes, médio esforço)

| # | Arquivo | Descrição | Referência visual |
|---|---|---|---|
| 2.1 | `src/components/react/content/ProfessionalProfiles.tsx` | Grid 2×4 de cards de perfil profissional com filtro por nível (Superior/Médio/Apoio), Lucide icons por cargo, hover expande detalhes. Dados inline no componente. | Apresentacao.astro linhas 147–163 |
| 2.2 | `src/components/react/content/ConceptsAccordion.tsx` | Accordion com 7 conceitos do SUAS. Cada item expansível com Lucide icon. Barra de busca no topo para filtrar. Contador "N de 7 conceitos". | Apresentacao.astro linhas 73–102 |
| 2.3 | `src/components/react/content/ProgramsTable.tsx` | Tabela sortable com Lucide icons por programa. Colunas clicáveis para ordenar. Linhas expansíveis com detalhes adicionais. Reutilizável para BeneficiosEventuais. | DiagnosticoSocioeconomico.astro linhas 59–96, BeneficiosEventuais.astro linhas 63–105 |
| 2.4 | `src/components/react/content/ColetivoVsIndividual.tsx` | Cards side-by-side em vez de tabela. Lucide icons (Users vs User). Toggle de destaque de diferenças. Hover revela exemplos. | AtendimentoColetivoExpandido.astro linhas 82–117 |

**Especificações de cada componente**:

#### 2.1 ProfessionalProfiles.tsx
```ts
// Dados inline — 8 perfis
const profiles = [
  { id: 'coordenador', role: 'Coordenador – CRAS', level: 'superior', icon: Briefcase, accent: 'blue',
    description: 'Gestão operacional do sistema e supervisão dos atendimentos...' },
  { id: 'psicologo', role: 'Psicólogo – CRAS', level: 'superior', icon: Brain, accent: 'green',
    description: 'Registra, planeja e acompanha ações socioassistenciais...' },
  // ... 6 more
]
```
- **Estado**: `activeFilter: 'all' | 'superior' | 'medio' | 'apoio'`
- **Filtro**: Pills no topo — "Todos (8)", "Nível Superior (5)", "Nível Médio (2)", "Apoio (1)"
- **Cards**: `border-t-4` com cor alternada, badge com nome do cargo, Lucide icon, descrição
- **Hover**: scale 1.02 + shadow-lg + tooltip com atribuições detalhadas
- **Dark mode**: completo

#### 2.2 ConceptsAccordion.tsx
```ts
const concepts = [
  { id: 'atendimento', title: 'Atendimento', icon: Handshake, accent: 'blue',
    description: 'Ação imediata de prestação ou oferta de atenção — participação das famílias...' },
  // ... 6 more alternating blue/green
]
```
- **Estado**: `expandedId: string | null`, `searchQuery: string`
- **Busca**: Input com Lucide `Search` que filtra conceitos em tempo real
- **Accordion**: Apenas 1 item aberto por vez. Transição `max-height` com `duration-500`
- **Chevron**: `ChevronDown` rotaciona 180° no expandir
- **Contador**: "3 de 7 conceitos" abaixo da busca (tracking de quantos o usuário expandiu)
- **Dark mode**: completo

#### 2.3 ProgramsTable.tsx
```ts
interface Program {
  id: string; name: string; icon: LucideIcon; org: string; eligibility: string; registration: string; details: string;
}
```
- **Estado**: `sortColumn: string | null`, `sortDirection: 'asc' | 'desc'`, `expandedRow: string | null`
- **Ordenação**: Clique no header da coluna alterna asc/desc. Indicador visual com `ArrowUp`/`ArrowDown`
- **Expandir linha**: Clique revela detalhes adicionais (documentação, prazo, observações) com animação
- **Lucide icons**: `Banknote` (Bolsa Família), `Accessibility` (BPC), `Briefcase` (Seguro), `Scale` (Pensão)
- **Reaproveitável**: Mesmo componente usado para BeneficiosEventuais com dados diferentes

#### 2.4 ColetivoVsIndividual.tsx
```ts
const criteria = [
  { label: 'Natureza da intervenção', coletivo: 'Grupal, socioeducativa, comunitária', individual: 'Particularizada, personalizada' },
  // ... 4 more rows
]
```
- **Estado**: `highlightMode: boolean`
- **Layout**: Dois cards lado a lado (não tabela). Esquerda = Coletivo (verde), Direita = Individual (azul)
- **Toggle**: Botão "Destacar diferenças" que aplica `ring-2 ring-amber-500` nas células com valores diferentes
- **Icons**: `Users` (coletivo), `User` (individual) nos headers
- **Hover**: Revela tooltip com exemplo prático de cada critério

**Validação**: `npx astro check` + `npm run build` ao final de cada componente, antes de prosseguir.

---

### FASE 3 — Integração (editar arquivos existentes)

#### 3.1 Apresentacao.astro (3 substituições)

| Linhas | Substituir por |
|---|---|
| 32–54 (3 cards Estrutura) | `<FeatureCard>` × 3 |
| 73–102 (7 conceitos) | `<ConceptsAccordion client:load />` |
| 125–163 (perfis + profissionais) | `<FeatureCard>` para Admin + Gestores + `<ProfessionalProfiles client:load />` para 8 CRAS |

#### 3.2 Expandidas — BestPracticesList (6 substituições)

| Arquivo | Linhas do bloco "Boas Práticas" |
|---|---|
| `GestaoProntuario.astro` | ~84–110 |
| `DiagnosticoSocioeconomico.astro` | ~99–126 |
| `BeneficiosEventuais.astro` | ~108–135 |
| `VulnerabilidadesProtecoes.astro` | ~89–109 |
| `CondicoesVida.astro` | ~83–111 |
| `EncaminhamentosIntersetorialidade.astro` | ~109–155 |

Cada substituição: ~30 linhas de HTML → `<BestPracticesList title="..." items={[...]} accent="..." />`

#### 3.3 Expandidas — FeatureCard (14 grids)

| Arquivo | Grids com `border-t-4` |
|---|---|
| `AtendimentoColetivoExpandido.astro` | Tipos de Atividades (3 cards) + Boas Práticas (3 cards) |
| `MetodologiaAcompanhamento.astro` | Boas Práticas (3 cards) |
| `MigracaoProntuarioExpandido.astro` | Dados Transferidos (2 cards) + Boas Práticas (4 cards) |
| `PainelEstatisticoExpandido.astro` | Indicadores (3 cards) + Boas Práticas (4 cards) |

#### 3.4 Expandidas — SeeAlso (11 substituições)

Todos os 10 expandidas + `TiposRegistro.astro`: substituir `<InfoCard title="Veja também">` + lista de links por `<SeeAlso links={[...]} accent="..." />`

#### 3.5 Expandidas — ProgramsTable (2 substituições)

| Arquivo | Linhas da tabela |
|---|---|
| `DiagnosticoSocioeconomico.astro` | 59–96 → `<ProgramsTable client:load programs={...} />` |
| `BeneficiosEventuais.astro` | 63–105 → `<ProgramsTable client:load programs={...} />` |

#### 3.6 AtendimentoColetivoExpandido.astro — ColetivoVsIndividual (1 substituição)

| Linhas | Substituir por |
|---|---|
| 82–117 | `<ColetivoVsIndividual client:load />` |

---

## 3. Ordem de Execução

| Ordem | Fase | Arquivos | Dependências |
|---|---|---|---|
| 1 | 1.1 | `BestPracticesList.astro` | Nenhuma |
| 2 | 1.2 | `FeatureCard.astro` | Nenhuma |
| 3 | 1.3 | `SeeAlso.astro` | Nenhuma |
| 4 | **BUILD CHECK** | `npm run build` | — |
| 5 | 3.2 | 6 expandidas (BestPracticesList) | Fase 1.1 |
| 6 | 3.3 | 5 expandidas (FeatureCard) | Fase 1.2 |
| 7 | 3.4 | 11 expandidas (SeeAlso) | Fase 1.3 |
| 8 | **BUILD CHECK** | `npm run build` | — |
| 9 | 2.1 | `ProfessionalProfiles.tsx` | Nenhuma |
| 10 | 2.2 | `ConceptsAccordion.tsx` | Nenhuma |
| 11 | 2.3 | `ProgramsTable.tsx` | Nenhuma |
| 12 | 2.4 | `ColetivoVsIndividual.tsx` | Nenhuma |
| 13 | **BUILD CHECK** | `npm run build` | — |
| 14 | 3.1 | `Apresentacao.astro` (3 integrações) | Fases 2.1 + 2.2 + 1.2 |
| 15 | 3.5 | Diagnostico + Beneficios (ProgramsTable) | Fase 2.3 |
| 16 | 3.6 | AtendimentoColetivo (ColetivoVsIndividual) | Fase 2.4 |
| 17 | **FINAL BUILD** | `npm run build && npx pagefind` | — |

---

## 4. Critérios de Sucesso

- [ ] `npm run build` passa com 0 errors, 0 warnings, 0 hints em todos os checkpoints
- [ ] `BestPracticesList` renderiza listas numeradas com 3 variantes de cor
- [ ] `FeatureCard` substitui 40+ cards `border-t-4` com props consistentes
- [ ] `SeeAlso` substitui 11 seções "Veja também" idênticas
- [ ] `ProfessionalProfiles` filtra 8 perfis por nível (Superior/Médio/Apoio)
- [ ] `ConceptsAccordion` expande 1 item por vez com busca funcional
- [ ] `ProgramsTable` ordena por coluna em ambas as tabelas (Diagnostico + Beneficios)
- [ ] `ColetivoVsIndividual` destaca diferenças entre os modos de atendimento
- [ ] Todos os componentes têm dark mode completo
- [ ] Nenhum SVG inline permanece nos arquivos editados (substituídos por Lucide)
- [ ] pagefind indexa conteúdo novo
- [ ] ~400 linhas de HTML repetido eliminadas
