# Plano de Upgrade Visual — Manual do Prontuário Eletrônico SUAS

**Data**: 2026-07-10
**Base de referência**: Caderno de Gestão Orçamentária e Financeira do SUAS (`/home/predator/projects/cadernos_suas/caderno-suas-astro`)
**Objetivo**: Portar o design system visual do Caderno para o Prontuário, criando um produto didático, pedagógico e visualmente impactante.

---

## 1. Diagnóstico Comparativo

### 1.1 O que o Caderno tem e o Prontuário NÃO tem

| Componente/Pattern | Caderno | Prontuário | Gap |
|---|---|---|---|
| `SectionHeader` (título numerado + badge + barra gradiente) | ✅ em 100% das seções | ❌ headers ad-hoc | **Crítico** |
| `AlertBox` (callout com ícone + fundo gradiente) | ✅ 4 variantes (info/success/warning/danger) | ❌ só `border-l-4` inline | **Crítico** |
| `ProcessStepper` (timeline vertical com dots numerados) | ✅ usado em FasesDespesa | ❌ nenhum | **Crítico** |
| `GoldenRulesGrid` (grid 2-col com cards + badges coloridos) | ✅ usado em RegrasOuro | ❌ nenhum | **Crítico** |
| `ComparisonTable` (tabela Pode x Não Pode com badges coloridos) | ✅ usado em ResumoVisual | ⚠️ tabela ad-hoc sem badges | **Alto** |
| `Timeline` (linha do tempo vertical) | ✅ usado em BaseNormativa | ⚠️ SVG inline, não reutilizável | **Alto** |
| `LearningChecklist` (checklist interativo com localStorage) | ✅ usado como Progresso de Leitura | ❌ nenhum | **Alto** |
| `InfoCard` (card com `border-t-4` accent) | ✅ 5 cores de accent | ❌ apenas `border-l-4` | **Médio** |
| Variant system (6+ esquemas de cor por card) | ✅ em TODOS os componentes | ⚠️ só BLOCK_ACCENTS (4 cores) | **Médio** |
| Animações staggered (`animate-slide-down` + `--delay`) | ✅ em todos os grids | ❌ apenas `animate-fade-in` | **Médio** |
| Chevrons animados entre cards (desktop →, mobile ↓) | ✅ em CicloGestao, ConexaoPlanejamento | ❌ nenhum | **Baixo** |
| Data code visualization (blocos coloridos 4.4.90.52) | ✅ em CategoriasEconomicas | ❌ não aplicável diretamente | **N/A** |
| Flow diagram com cards + conectores | ✅ Cofinanciamento | ⚠️ SVGs estáticos inline | **Médio** |
| Dark mode completo | ✅ classes `dark:` em todos os componentes | ⚠️ parcial (existe nos wrappers mas inconsistente) | **Médio** |

### 1.2 O que o Prontuário já faz bem (manter)

- `SecaoTutorial.astro` — grid 50/50 texto + screenshot com scroll, já refinado
- Estrutura de 4 blocos em `index.astro` com `data-block-*` attributes
- 10 seções expandidas (E1–E10) com prosa conceitual + SVG + tabelas
- `BookViewport` + `BlockAccordion` React — interação de livro
- Sistema de cores institucionais (`#123e6b` azul, `#1a7a3a` verde) via CSS vars
- Configuração `tailwind.config.ts` idêntica à do Caderno (já pronto para os novos componentes)

---

## 2. Plano de Implementação

### FASE 1 — Componentes Reutilizáveis (7 arquivos novos + 1 edit)

Estes componentes serão copiados/adaptados do Caderno e usados em todas as seções.

| # | Arquivo | Origem | Adaptações |
|---|---|---|---|
| 1.1 | `src/components/astro/layout/SectionHeader.astro` | Caderno (cópia direta) | Sem alterações — já genérico |
| 1.2 | `src/components/astro/content/AlertBox.astro` | Caderno (cópia direta) | Sem alterações — já genérico |
| 1.3 | `src/components/astro/content/InfoCard.astro` | Caderno (cópia direta) | Renomear `institucional-lightBlue` se necessário |
| 1.4 | `src/components/astro/content/ProcessStepper.astro` | Caderno (cópia direta) | Sem alterações |
| 1.5 | `src/components/astro/content/GoldenRulesGrid.astro` | Caderno (cópia direta) | Sem alterações |
| 1.6 | `src/components/astro/content/ComparisonTable.astro` | Caderno (cópia direta) | Sem alterações |
| 1.7 | `src/components/astro/content/Timeline.astro` | Caderno (cópia direta) | Sem alterações |
| 1.8 | `tailwind.config.ts` | Editar | Adicionar `slideDown` + `bounceDown`/`bounceRight` keyframes se não existirem |

**Validação**: `npm run build` após cada grupo de 2-3 arquivos.

---

### FASE 2 — Novas Seções Conceituais (6 arquivos novos)

Cada nova seção espelha um item de referência do Caderno aplicado ao contexto do Prontuário.

| # | Arquivo | Referência do Caderno | Conteúdo |
|---|---|---|---|
| 2.1 | `src/components/astro/capitulos/expandidas/CicloAcompanhamento.astro` | CicloGestao.astro | 6 etapas do acompanhamento familiar no prontuário (Abertura → Diagnóstico → Plano → Registro → Evolução → Revisão) usando o pattern de cards com chevrons animados |
| 2.2 | `src/components/astro/capitulos/expandidas/TiposRegistro.astro` | TiposPlano.astro | 2 colunas: Registro Individual/Familiar vs Registro Coletivo — cards com lista de características, badges coloridos |
| 2.3 | `src/components/astro/capitulos/expandidas/FluxoAtendimento.astro` | Cofinanciamento.astro | Fluxo vertical do atendimento: Família → CRAS → Técnico → Prontuário → Rede → Evolução. Cards com ícones + conectores animados + convergence pill |
| 2.4 | `src/components/astro/capitulos/expandidas/PapelProfissionais.astro` | PapelCMAS.astro | Grid 5-col com os papéis: Coordenador, Técnico de Referência, Administrativo, Digitador, Conselho. Com ícones + descrições |
| 2.5 | `src/components/astro/capitulos/expandidas/RegrasOuroProntuario.astro` | RegrasOuro.astro | 10 Regras de Ouro do Prontuário Eletrônico (segurança, completude, LGPD, temporalidade) com GoldenRulesGrid + banner azul escuro com estrela |
| 2.6 | `src/components/astro/capitulos/expandidas/ResumoPodeNaoPode.astro` | ResumoVisual.astro | Tabela "O que Pode e Não Pode no Prontuário" (compartilhar dados, alterar registros, excluir, acessar) com ComparisonTable, badges verde/vermelho/âmbar |

---

### FASE 3 — Novas Seções Interativas (3 arquivos novos + 1 edit)

| # | Arquivo | Referência do Caderno | Descrição |
|---|---|---|---|
| 3.1 | `src/components/astro/capitulos/expandidas/ChecklistProntuario.astro` | ChecklistDespesa.astro | "Checklist: Antes de Usar o Prontuário" — 10+ itens com React `ChecklistGrid` interativo + progress bar + localStorage |
| 3.2 | `src/components/react/content/ChecklistGrid.tsx` | Caderno (cópia) | Mesmo componente interativo, adaptar chave localStorage para `prontuario-checklist` |
| 3.3 | `src/data/checklist.ts` | Novo | Dados: array de `{ id, text }` para o checklist |
| 3.4 | `src/components/astro/capitulos/expandidas/BaseNormativaProntuario.astro` | BaseNormativa.astro | Linha do tempo da base legal (LGPD, NOB-SUAS, PNAS, Lei Orgânica, Resoluções CNAS) usando `Timeline` |

---

### FASE 4 — Upgrade das Seções Existentes (10 edições)

Substituir headers ad-hoc e callouts inline pelos novos componentes reutilizáveis.

**Para cada uma das 10 seções expandidas (E1–E10):**

| Ação | Onde | Substituir por |
|---|---|---|
| Header com ícone + gradiente bar | Todas as 10 expandidas | `SectionHeader` com `number` e `accent` apropriado |
| `border-l-4` callout boxes | E2, E3, E4, E7, E8, E9, E10 | `AlertBox` com `variant` apropriado |
| SVG timelines/fluxogramas | E1 (ciclo de vida), E2, E3, E4, E7, E8, E9, E10 | `ProcessStepper` onde fizer sentido |
| "Veja também" cross-references | E2, E3, E7, E8 | `InfoCard` com `accent` apropriado |
| Adicionar `animate-slide-down` staggered | Todas as 10 | Adicionar `stagger` class no container + `--delay` nos filhos |

**Além das expandidas, editar `index.astro`:**
- Adicionar `LearningChecklist` no topo (após Apresentacao)
- Substituir headers de bloco (`Bloco 1 — ...`) por `SectionHeader`
- Adicionar `AlertBox` para observações importantes nos tutoriais básicos
- Integrar as 6 novas seções (Fase 2) nos blocos apropriados

---

### FASE 5 — Dados e TypeScript (3 arquivos novos/edições)

| # | Arquivo | Conteúdo |
|---|---|---|
| 5.1 | `src/data/regrasOuro.ts` | Array de 10 regras: `{ number, title, description, highlight? }` |
| 5.2 | `src/data/checklist.ts` | Array de items: `{ id, text }` para o checklist pré-uso |
| 5.3 | `src/data/resumoVisual.ts` | Array de: `{ item, status: 'pode'\|'nao'\|'condicao', condition }` |
| 5.4 | `src/types/index.ts` (editar) | Adicionar interfaces: `Rule`, `ChecklistItem`, `ComparisonRow` se não existirem |

---

### FASE 6 — Integração em `index.astro`

Mapeamento de onde cada nova seção será inserida:

```
index.astro (após Apresentacao)
├── [NOVO] LearningChecklist (Fase 3.1)
│
├── Bloco 1 — Atendimento Individual e Familiar
│   ├── [EXISTENTE] Seção tutoriais básicos (já estão)
│   ├── [EXISTENTE] GestaoProntuario (E1) → UPGRADE: SectionHeader + ProcessStepper
│   ├── ...
│   ├── [EXISTENTE] DiagnosticoSocioeconomico (E2) → UPGRADE: SectionHeader + AlertBox
│   ├── ...
│   ├── [EXISTENTE] VulnerabilidadesProtecoes (E3) → UPGRADE: SectionHeader
│   ├── ...
│   ├── [EXISTENTE] MetodologiaAcompanhamento (E4) → UPGRADE: SectionHeader
│   ├── ...
│   ├── [EXISTENTE] BeneficiosEventuais (E5) → UPGRADE: SectionHeader
│   ├── [EXISTENTE] CondicoesVida (E6) → UPGRADE: SectionHeader
│   ├── [NOVO] CicloAcompanhamento (Fase 2.1)
│   ├── [NOVO] TiposRegistro (Fase 2.2)
│   │
├── Bloco 2 — Atendimento Coletivo
│   ├── [EXISTENTE] Seções tutoriais básicos
│   ├── [EXISTENTE] EncaminhamentosIntersetorialidade (E8) → UPGRADE: SectionHeader + AlertBox
│   ├── [EXISTENTE] AtendimentoColetivoExpandido (E7) → UPGRADE: SectionHeader + AlertBox
│   ├── [NOVO] FluxoAtendimento (Fase 2.3)
│   │
├── Bloco 3 — Migrar Prontuário
│   ├── [EXISTENTE] Seção tutorial básica
│   ├── [EXISTENTE] MigracaoProntuarioExpandido (E9) → UPGRADE: SectionHeader
│   ├── [NOVO] PapelProfissionais (Fase 2.4)
│   │
├── Bloco 4 — Painel Estatístico
│   ├── [EXISTENTE] Seção tutorial básica
│   ├── [EXISTENTE] PainelEstatisticoExpandido (E10) → UPGRADE: SectionHeader + AlertBox + ProcessStepper
│   ├── [NOVO] BaseNormativaProntuario (Fase 3.4)
│   │
├── [NOVO] RegrasOuroProntuario (Fase 2.5) — standalone, sem bloco
├── [NOVO] ResumoPodeNaoPode (Fase 2.6) — standalone, sem bloco
├── [NOVO] ChecklistProntuario (Fase 3.1) — ao final
```

---

## 3. Ordem de Execução

| Ordem | Fase | Arquivos | Dependências |
|---|---|---|---|
| 1 | Fase 1 | 7 componentes copiados + tailwind.config | Nenhuma |
| 2 | Fase 5 | 4 arquivos de dados/types | Nenhuma |
| 3 | Fase 3.2-3.3 | ChecklistGrid.tsx + data/checklist.ts | Fase 5 parcial |
| 4 | Fase 2.1-2.6 | 6 novas seções Astro | Fase 1 + Fase 5 |
| 5 | Fase 3.1, 3.4 | ChecklistProntuario + BaseNormativa | Fase 1 + Fase 3.2 |
| 6 | **BUILD CHECK** | `npm run build` | — |
| 7 | Fase 4 | Upgrade 10 expandidas | Fase 1 (componentes) |
| 8 | **BUILD CHECK** | `npm run build` | — |
| 9 | Fase 6 | Integração em index.astro | Todas as fases anteriores |
| 10 | **FINAL BUILD** | `npm run build && npx pagefind` | — |

---

## 4. Critérios de Sucesso

- [ ] `npm run build` passa com 0 errors, 0 warnings, 0 hints
- [ ] Todos os 7 componentes reutilizáveis funcionam com dark mode
- [ ] `GoldenRulesGrid` renderiza 10 regras com cores variadas
- [ ] `ComparisonTable` renderiza tabela Pode x Não Pode com badges coloridos
- [ ] `ProcessStepper` renderiza timeline vertical com dots numerados
- [ ] `LearningChecklist` persiste estado em localStorage
- [ ] 6 novas seções conceituais integradas com stagger animations
- [ ] 10 seções expandidas existentes atualizadas com `SectionHeader` + `AlertBox`
- [ ] `index.astro` mantém estrutura de 4 blocos com todas as novas seções
- [ ] pagefind indexa o conteúdo novo
