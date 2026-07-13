# Plano de Expansão: Manual do Prontuário Eletrônico SUAS

> **Criado**: 2026-07-10
> **Status**: Aguardando revisão do Momus
> **Projeto**: `/home/predator/projects/teste_prontuario`
> **Referência**: `.omo/plans/manual-prontuario-eletronico.md`

---

## 1. Diagnóstico

### 1.1 Cobertura atual

| Indicador | Construído | Total | Cobertura |
|---|---|---|---|
| Seções introdutórias | 7 | 7 | 100% |
| Bloco 1 — Atendimento Individual | 16 seções (21 screenshots) | ~70 páginas PDF (p.22-92) | ~23% das páginas |
| Bloco 2 — Atendimento Coletivo | 3 seções | ~36 páginas PDF (p.93-128) | ~8% |
| Bloco 3 — Migrar Prontuário | 1 seção | ~11 páginas PDF (p.129-139) | ~9% |
| Bloco 4 — Painel Estatístico | 1 seção | ~7 páginas PDF (p.140-146) | ~14% |
| **Total tutorial** | **21 seções** | **125 screenshots extraídos** | **21 screenshots em uso (17%)** |

### 1.2 Natureza das lacunas

O conteúdo existente é **orientado a anotações**: cada seção é uma screenshot com 2-7 balões numerados descrevendo elementos da interface. Faltam:

- **Contexto conceitual**: o que cada tela significa no fluxo de trabalho do SUAS
- **Regras de negócio**: quando e por que usar cada funcionalidade
- **Boas práticas**: recomendações para o profissional no dia a dia
- **Elementos visuais próprios**: diagramas, fluxogramas, tabelas comparativas — o guia atual depende exclusivamente das screenshots do PDF
- **Conexão entre seções**: como as telas se relacionam (ex: vulnerabilidade → planejamento → evolução)

### 1.3 Correção necessária (bug, não expansão)

O `BLOCKS` em `src/lib/constants.ts` está dessincronizado do conteúdo em `index.astro`. Quatro seções renderizam no HTML mas não aparecem na sidebar nem no sumário:

| ID da seção | Título | Página PDF | Presente no index.astro? | Presente no BLOCKS? |
|---|---|---|---|---|
| `condicoes-educacionais` | Condições Educacionais da Família | 49 | ✅ Sim | ❌ Não |
| `condicoes-saude` | Condições de Saúde da Família | 51 | ✅ Sim | ❌ Não |
| `acesso-beneficios` | Acesso a Benefícios Eventuais | 66 | ✅ Sim | ❌ Não |
| `atendimento-coletivo-lista` | Atendimento Coletivo — Lista | 118 | ✅ Sim | ❌ Não |

**Ação**: Adicionar essas 4 entradas ao array `items` dos respectivos blocos em `constants.ts`.

---

## 2. Estratégia de Expansão

### 2.1 Princípios

1. **1 screenshot âncora por seção expandida** — não transcrever todas as páginas do PDF; usar a tela mais representativa como gancho visual
2. **Conteúdo textual rico** — explicar conceitos, regras de negócio e boas práticas que vão além da descrição da interface
3. **Elementos visuais próprios** — criar SVG inline (diagramas de fluxo, linhas do tempo, mapas conceituais, infográficos, tabelas) que não dependem do PDF
4. **Conexão narrativa** — cada seção expandida deve explicitar como aquela funcionalidade se encaixa no fluxo de trabalho do profissional do SUAS

### 2.2 Arquitetura das seções expandidas

Cada seção expandida será um novo componente em `src/components/astro/capitulos/expandidas/` com a estrutura:

```
┌──────────────────────────────────────────────┐
│ Título + subtítulo contextual                 │
├──────────────────────────────────────────────┤
│ Bloco conceitual (prosa)                      │
│ ┌─────────────┐  ┌───────────────────────┐   │
│ │ Screenshot   │  │ Lista de anotações    │   │
│ │ (SecaoTuto-  │  │ numeradas             │   │
│ │ rial.astro)  │  │                       │   │
│ └─────────────┘  └───────────────────────┘   │
├──────────────────────────────────────────────┤
│ Elemento visual próprio (SVG/tabela)          │
├──────────────────────────────────────────────┤
│ Boas práticas / Pontos de atenção             │
├──────────────────────────────────────────────┤
│ Conexão com outras seções ("Veja também")     │
└──────────────────────────────────────────────┘
```

Reutiliza `SecaoTutorial.astro` como bloco interno para manter consistência visual com as seções existentes.

### 2.3 O que NÃO faremos

- ❌ Transcrever todas as páginas do PDF — ~104 páginas restantes
- ❌ Criar seções puramente anotativas (balões numerados sem contexto) — isso replica o PDF, não expande
- ❌ Extrair screenshots de páginas intermediárias com variações mínimas — uma tela por funcionalidade é suficiente

---

## 3. Expansões Propostas

### 3.1 Visão geral

| # | Seção Expandida | Bloco | Screenshot novo? | Elemento visual próprio | Esforço |
|---|---|---|---|---|---|
| E1 | Gestão do Prontuário | 1 — Atendimento Individual | Não (usa p.22 existente) | Diagrama de estados SVG | Médio |
| E2 | Diagnóstico Socioeconômico | 1 | p.34 (Condições de Trabalho — formulário) | Tabela comparativa de programas | Alto |
| E3 | Vulnerabilidades e Proteções Sociais | 1 | p.75 (Inclusão de vulnerabilidade) | Mapa conceitual SVG | Alto |
| E4 | Metodologia do Acompanhamento Familiar | 1 | p.86 (Evolução do acompanhamento) | Linha do tempo SVG | Alto |
| E5 | Benefícios Eventuais no SUAS | 1 | Não (expande p.66 existente) | Tabela tipológica | Médio |
| E6 | Condições de Vida — Saúde e Educação | 1 | Não (expande p.49 + p.51) | Infográfico de indicadores | Médio |
| E7 | Atendimento Coletivo — Fundamentos e Operação | 2 | p.121 (Inclusão de atividade) | Fluxograma SVG | Alto |
| E8 | Encaminhamentos e Intersetorialidade | 2 | p.104 (Inclusão de encaminhamento) | Diagrama de rede SVG | Alto |
| E9 | Migração de Prontuário — Fluxo Completo | 3 | p.131 (Recebimento da migração) | Fluxograma SVG | Médio |
| E10 | Painel Estatístico — Leitura Gerencial | 4 | p.142 (Indicadores com filtros) | Infográfico de indicadores | Médio |

**Totais**: 10 seções expandidas | 6 screenshots novos | 5 seções textuais (sem screenshot novo) | 8 elementos visuais SVG | 4 tabelas/infográficos

---

### 3.2 Detalhamento por seção

#### E1 — Gestão do Prontuário: Ciclo de Vida e Política de Dados

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshot âncora**: p.22 (já existe — `informacoes-prontuario`)
- **Screenshot novo**: nenhum
- **Conteúdo textual**:
  - O que é o Prontuário Eletrônico no contexto do SUAS (não é ficha, é histórico vivo)
  - Ciclo de vida: Abertura → Ativo → Inativo → Excluído (com regras de transição)
  - Política de exclusão: LGPD, prazos de guarda, irreversibilidade
  - Número do prontuário: como é gerado, o que significa
- **Elemento visual**: Diagrama de estados SVG — "Ciclo de Vida do Prontuário"
  - Estados: Aberto → Ativo (em acompanhamento) → Inativo (sem acompanhamento ativo) → Excluído (com justificativa)
  - Setas com condições de transição
- **Conexões**: linka para E2 (diagnóstico socioeconômico), E4 (acompanhamento)

#### E2 — Diagnóstico Socioeconômico da Família

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshot âncora**: p.56 (já existe — `condicoes-trabalho`) + **novo**: p.34 (formulário completo de condições de trabalho)
- **Conteúdo textual**:
  - Por que o SUAS coleta dados socioeconômicos — além do CadÚnico
  - Condições de trabalho por membro: CTPS, vínculo, renda — o que cada campo revela
  - Programas de transferência de renda: Bolsa Família, BPC/LOAS, Seguro-desemprego, Pensão Alimentícia — como registrar e por que importa
  - Renda per capita familiar: cálculo, interpretação, relação com critérios de vulnerabilidade
- **Elemento visual**: Tabela comparativa de programas sociais
  - Colunas: Programa | Órgão | Critério de elegibilidade | Valor de referência | Como registrar no prontuário
- **Conexões**: linka para E3 (vulnerabilidades), E5 (benefícios eventuais)

#### E3 — Vulnerabilidades e Proteções Sociais

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshot âncora**: p.73 (já existe — `vulnerabilidades`) + **novo**: p.75 (inclusão de vulnerabilidade)
- **Conteúdo textual**:
  - O que são vulnerabilidades e riscos sociais na perspectiva do SUAS
  - Tipificação Nacional dos Serviços Socioassistenciais e como se relaciona com o cadastro de vulnerabilidades
  - Indicadores automáticos (PCD, pessoa idosa) vs. cadastro manual
  - Diferença entre vulnerabilidade, risco e violação de direitos
  - Como o diagnóstico de vulnerabilidades orienta o acompanhamento familiar
- **Elemento visual**: Mapa conceitual SVG — "Vulnerabilidades → Proteções Sociais"
  - Vulnerabilidades (renda, habitação, saúde, educação, vínculos) → Proteção Social Básica (PAIF, SCFV, Benefícios) → Proteção Social Especial (Média e Alta Complexidade)
- **Conexões**: linka para E4 (acompanhamento), E5 (benefícios), E8 (encaminhamentos)

#### E4 — Metodologia do Acompanhamento Familiar

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshot âncora**: p.84 (já existe — `planejamento-evolucao`) + **novo**: p.86 (tela de evolução do acompanhamento)
- **Conteúdo textual**:
  - O que é o acompanhamento familiar no PAIF — não é "visita", é processo sistemático
  - Como estruturar um plano de acompanhamento: objetivos, ações, prazos
  - Registro de evolução: periodicidade, o que documentar, linguagem técnica apropriada
  - Critérios de desligamento: quando e como encerrar um acompanhamento
  - Articulação com a rede: quando acionar CREAS, saúde, educação
- **Elemento visual**: Linha do tempo SVG — "Jornada do Acompanhamento Familiar"
  - Ingresso → Diagnóstico → Plano → Evoluções periódicas → Reavaliação → Desligamento (ou reingresso)
- **Conexões**: linka para E3 (vulnerabilidades), E5 (benefícios), E8 (encaminhamentos)

#### E5 — Benefícios Eventuais no SUAS

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshot âncora**: p.66 (já existe — `acesso-beneficios`)
- **Screenshot novo**: nenhum — expande o existente
- **Conteúdo textual**:
  - Marco legal: LOAS (Lei 8.742/93), Decreto 6.307/2007, Resoluções CNAS
  - Tipologia dos benefícios eventuais: natalidade, funeral, calamidade pública, vulnerabilidade temporária
  - Fluxo de concessão no SUAS: identificação da necessidade → registro no prontuário → encaminhamento → acompanhamento
  - Diferença entre benefício eventual e programas de transferência de renda
- **Elemento visual**: Tabela tipológica
  - Colunas: Tipo | Situação geradora | Documentação necessária | Profissional responsável | Prazo
- **Conexões**: linka para E2 (diagnóstico socioeconômico), E3 (vulnerabilidades)

#### E6 — Condições de Vida: Saúde e Educação no Olhar do SUAS

- **Bloco**: 1 — Atendimento Individual e Familiar
- **Screenshots âncora**: p.49 (já existe — `condicoes-educacionais`) + p.51 (já existe — `condicoes-saude`)
- **Screenshot novo**: nenhum — expande os existentes
- **Conteúdo textual**:
  - Por que o SUAS monitora indicadores de saúde e educação — a perspectiva da matricialidade sociofamiliar
  - Marcadores de saúde: doença grave, medicamentos controlados, uso abusivo de álcool/drogas — o que cada um sinaliza
  - Vulnerabilidade educacional por faixa etária: evasão, defasagem idade-série, analfabetismo
  - Como esses indicadores se articulam com as políticas setoriais (Saúde, Educação) sem substituí-las
  - Quando um marcador deve disparar um encaminhamento intersetorial
- **Elemento visual**: Infográfico de indicadores — "Cruzamento: Vulnerabilidade Social × Saúde × Educação"
  - Ex: criança fora da escola + renda per capita baixa + responsável com doença crônica → prioridade de acompanhamento
- **Conexões**: linka para E3 (vulnerabilidades), E8 (encaminhamentos)

#### E7 — Atendimento Coletivo: Fundamentos e Operação

- **Bloco**: 2 — Atendimento Coletivo
- **Screenshot âncora**: p.118 (já existe — `atendimento-coletivo-lista`) + **novo**: p.121 (inclusão de atividade coletiva)
- **Conteúdo textual**:
  - Marco legal e conceitual: o atendimento coletivo no SUAS — oficinas, palestras, grupos, campanhas
  - Diferença fundamental do atendimento individual: registro único → replicação automática nos prontuários dos participantes
  - Tipos de atividades coletivas e como classificá-las no sistema
  - Fluxo: planejamento da atividade → registro com participantes → visualização nos prontuários individuais
  - Quando usar atendimento coletivo vs. individual — critérios de decisão
- **Elemento visual**: Fluxograma SVG — "Registro de Atividade Coletiva → Replicação nos Prontuários"
  - Atividade Coletiva (1 registro) → Participante A (Prontuário) + Participante B (Prontuário) + Participante C (Prontuário)
- **Conexões**: linka para E4 (acompanhamento), E8 (encaminhamentos)

#### E8 — Encaminhamentos e Intersetorialidade no SUAS

- **Bloco**: 2 — Atendimento Coletivo
- **Screenshot âncora**: p.102 (já existe — `encaminhamentos` / `controle-encaminhamentos`) + **novo**: p.104 (formulário de inclusão de encaminhamento)
- **Conteúdo textual**:
  - O princípio da intersetorialidade no SUAS: saúde, educação, justiça, trabalho, habitação
  - Como registrar um encaminhamento: seleção da pessoa, área de destino, data, motivo
  - Áreas típicas de encaminhamento e o que esperar de cada uma
  - Acompanhamento do encaminhamento: como verificar se a pessoa acessou o serviço
  - Diferença entre encaminhamento e contrarreferência
- **Elemento visual**: Diagrama de rede SVG — "Rede Intersetorial a partir do CRAS"
  - CRAS no centro → setas para: UBS/Hospital, Escola/CRAS Educação, CREAS, Defensoria/Justiça, SINE/Trabalho, Habitação
- **Conexões**: linka para E3 (vulnerabilidades), E4 (acompanhamento), E6 (saúde e educação)

#### E9 — Migração de Prontuário: Fluxo Completo

- **Bloco**: 3 — Migrar Prontuário
- **Screenshot âncora**: p.129 (já existe — `migrar-prontuario`) + **novo**: p.131 (recebimento/confirmação da migração)
- **Conteúdo textual**:
  - Quando migrar um prontuário: mudança de território, reorganização de unidades, correção de cadastro
  - Princípio da vinculação territorial no SUAS
  - Fluxo completo: solicitação (unidade de origem) → recebimento (unidade de destino) → confirmação
  - O que é transferido: dados da família, histórico de atendimentos, vulnerabilidades, planejamento
  - O que NÃO é transferido (dados locais, vínculos específicos)
- **Elemento visual**: Fluxograma SVG — "Processo de Migração de Prontuário"
  - Unidade Origem (solicita) → Sistema (processa) → Unidade Destino (recebe e confirma)
- **Conexões**: linka para E1 (gestão do prontuário), E2 (diagnóstico)

#### E10 — Painel Estatístico: Leitura e Uso Gerencial

- **Bloco**: 4 — Painel Estatístico
- **Screenshot âncora**: p.140 (já existe — `painel-estatistico`) + **novo**: p.142 (indicadores com filtros aplicados)
- **Conteúdo textual**:
  - O que o Painel Estatístico oferece: volume de atendimentos, perfil do público, evolução temporal
  - Como aplicar filtros: período, tipo de atendimento, unidade, perfil do público
  - Principais indicadores e o que revelam sobre a gestão do CRAS
  - Uso para planejamento: identificar demandas reprimidas, sazonalidades, perfil predominante
  - Limitações: o painel complementa, não substitui, a análise qualitativa do técnico
- **Elemento visual**: Infográfico de indicadores-chave — "O que o Painel Estatístico revela"
  - Indicador → O que mede → Decisão gerencial que possibilita
  - Ex: "Atendimentos por tipo" → predominância de encaminhamentos → necessidade de fortalecer rede intersetorial
- **Conexões**: linka para E7 (atendimento coletivo nos números), E8 (encaminhamentos nos indicadores)

---

## 4. Sequência de Execução

### Pré-requisito: Correção do BLOCKS (15 min)

**Ação**: Adicionar as 4 entradas faltantes em `src/lib/constants.ts` e verificar `npm run build`.

### Onda 1 — Fundamentos e Fluxos Essenciais (Bloco 1, seções de alto impacto)

| Ordem | Seção | Esforço | Dependências |
|---|---|---|---|
| 1 | E1 — Gestão do Prontuário | Médio | Nenhuma |
| 2 | E2 — Diagnóstico Socioeconômico | Alto | E1 |
| 3 | E4 — Metodologia do Acompanhamento Familiar | Alto | E2, E3* |

> *E3 pode rodar em paralelo com E2.

### Onda 2 — Diagnóstico e Proteção (Bloco 1, seções complementares)

| Ordem | Seção | Esforço | Dependências |
|---|---|---|---|
| 4 | E3 — Vulnerabilidades e Proteções Sociais | Alto | Nenhuma (paralelo com Onda 1) |
| 5 | E5 — Benefícios Eventuais | Médio | Nenhuma |
| 6 | E6 — Condições de Vida | Médio | Nenhuma |

### Onda 3 — Fluxos Diferenciadores (Blocos 2, 3, 4)

| Ordem | Seção | Esforço | Dependências |
|---|---|---|---|
| 7 | E7 — Atendimento Coletivo | Alto | E4 |
| 8 | E8 — Encaminhamentos e Intersetorialidade | Alto | E3, E6 |
| 9 | E9 — Migração de Prontuário | Médio | E1 |
| 10 | E10 — Painel Estatístico | Médio | Nenhuma |

---

## 5. Paralelização

```
Correção BLOCKS (15 min)
        │
        ├── Onda 1 ─────────────────────────┐
        │   E1 (Médio)                       │
        │   ├── E2 (Alto) ──┐               │
        │   └── E4 (Alto) ◄──┘              │
        │                                    │
        ├── Onda 2 (paralelo com Onda 1) ───┤
        │   E3 (Alto)                        │
        │   E5 (Médio)                       │
        │   E6 (Médio)                       │
        │                                    │
        └── Onda 3 ─────────────────────────┘
            E7 (Alto) ── depende de E4
            E8 (Alto) ── depende de E3, E6
            E9 (Médio)
            E10 (Médio)

Total sequencial: 4 ondas (incluindo correção)
Máximo paralelo: 6 agentes simultâneos (Ondas 1+2)
```

---

## 6. Estimativa de Esforço

| Atividade | Complexidade | Seções | Esforço por seção | Total |
|---|---|---|---|---|
| Correção BLOCKS | Baixa | 1 (4 edições) | 15 min | 15 min |
| Seções com screenshot novo + SVG + texto | Alta | E2, E3, E4, E7, E8 (5) | 1.5-2h cada | ~9h |
| Seções textuais + SVG/tabela | Média | E1, E5, E6, E9, E10 (5) | 45min-1h cada | ~4h |
| **Total** | | **11 itens** | | **~13.5h** |

Comparação com plano original: Fase 4 previa 20-30h para ~45 seções puramente anotativas. Esta expansão gera 10 seções de maior profundidade em ~60% do tempo.

---

## 7. Critérios de Aceite por Seção

Cada seção expandida deve satisfazer:

- [ ] Screenshot âncora renderiza corretamente (com zoom modal funcional)
- [ ] Texto conceitual responde "o que é", "por que existe" e "quando usar"
- [ ] Elemento visual SVG é semanticamente claro, usa cores institucionais, funciona em dark mode
- [ ] Seção de boas práticas contém pelo menos 3 recomendações acionáveis
- [ ] Links "Veja também" conectam com pelo menos 2 outras seções
- [ ] `npm run build` passa sem erros (0 errors, 0 warnings)
- [ ] Conteúdo é indexado pelo pagefind
- [ ] Responsivo: layout funcional em 375px (mobile) e 1920px (desktop)

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Criar conteúdo conceitual incorreto sobre SUAS (alucinações) | Média | Alto | Todo texto deve ser referenciável à PNAS, NOB/SUAS ou ao próprio PDF original como fonte da interface |
| Diagramas SVG ficarem confusos ou inacabados | Média | Médio | Usar padrão de cores institucionais definido no `tailwind.config.ts`; revisar cada SVG com Oracle |
| Screenshots novos não terem correspondência exata com as páginas identificadas | Baixa | Baixo | Inspecionar o WebP visualmente antes de implementar; se página errada, buscar a correta no diretório de screenshots |
| Conteúdo expandido tornar `index.astro` excessivamente longo | Baixa | Médio | Cada seção será um componente separado em `capitulos/expandidas/`, importado em `index.astro` |

---

## 9. Próximos Passos

1. Aprovação do Momus (esta revisão)
2. Correção do `BLOCKS` em `constants.ts`
3. Execução da Onda 1 (E1, E2, E4) — agentes `deep` paralelos
4. Execução da Onda 2 (E3, E5, E6) — em paralelo com possíveis ajustes da Onda 1
5. Execução da Onda 3 (E7, E8, E9, E10)
6. Build final e verificação
