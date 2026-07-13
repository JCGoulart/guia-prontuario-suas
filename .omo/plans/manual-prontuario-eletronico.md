# Plano: Manual do Prontuário Eletrônico SUAS — Material de Capacitação Web

> **Status**: Aguardando revisão do Momus
> **Criado**: 2026-07-10
> **Projeto**: `/home/predator/projects/teste_prontuario`
> **Referência**: `mds-manual_prontuario-defeso.pdf` (147p, A4 paisagem, 35.7MB)

---

## 1. Objetivo

Transformar o PDF do Manual do Prontuário Eletrônico SUAS (MDS, Dez/2025) em um material de estudo web elegante, interativo e acessível, seguindo o mesmo padrão arquitetural dos projetos de referência:

- **guia-vigilancia-socioassistencial** (`/home/predator/projects/guia-vigilancia-socioassistencial`)
- **caderno-suas-astro** (`/home/predator/projects/cadernos_suas/caderno-suas-astro`)

O material deve preservar fielmente as ~128 screenshots do sistema Prontuário Eletrônico e os textos descritivos com balões numerados que compõem o manual.

---

## 2. Diagnóstico do PDF

### 2.1 Estrutura

| Faixa de Páginas | Conteúdo | Quantidade | Abordagem |
|---|---|---|---|
| 1-3 | Capa, expediente, sumário | 3 | Reconstruir como componentes Astro |
| 4-11 | Apresentação, conceitos gerais, papéis profissionais | 8 | Reconstruir como componentes Astro |
| 12-15 | Instruções de login (texto + screenshots pequenas) | 4 | Híbrido: texto Astro + imagens extraídas |
| 16-21 | Capítulos introdutórios, QR codes, transições | 6 | Híbrido: texto Astro + imagens extraídas |
| 22-146 | Tutorial do sistema (screenshots full-page + anotações) | 125 | Screenshots extraídas + texto Astro |
| 147 | Contracapa | 1 | Reconstruir como componente Astro |

### 2.2 Imagens

- **492** imagens totais no PDF (metade são máscaras de transparência SMask)
- **128** páginas contêm screenshots full-page do sistema (~1664×2485px a 300dpi)
- Screenshots são JPEG2000 (JPX) embutidas — precisam ser extraídas e convertidas
- As imagens pequenas (logotipos, ícones, QR codes) aparecem nas páginas 1-21

### 2.3 Formato de anotação

Cada página de tutorial segue o padrão:
- Cabeçalho: "Manual de uso: Prontuário Eletrônico" + "Dezembro 2025"
- Corpo: screenshot do sistema com círculos numerados (➊ ➁ ➂...➓)
- Lateral: texto descritivo referenciando cada número
- Rodapé: número da página

---

## 3. Decisão Arquitetural

### 3.1 Stack (herdado dos projetos de referência)

```
Astro 6 + React 19 + Tailwind 3 + TypeScript
├── react-pageflip (efeito livro)
├── @radix-ui/react-accordion (blocos expansíveis)
├── lucide-react (ícones)
├── pagefind (busca full-text)
├── tailwindcss-animate
└── Inter (fonte)
```

### 3.2 Por que NÃO converter para SVG

- Screenshots são raster (JPEG2000), não vetoriais
- SVG embutindo base64 de screenshots 1664×2485px resultaria em arquivos de ~3-5MB cada
- Total estimado: **~500MB de SVG vs ~30MB de PNG/WebP otimizado**
- Renderização de SVG complexo (InDesign export) é inconsistente entre browsers
- Acessibilidade muito pior que HTML semântico

### 3.3 Estratégia adotada: Extração + Reconstrução Híbrida

| Tipo de Página | Método | Formato |
|---|---|---|
| Textuais (capa, sumário, apresentação) | Componentes Astro puros | `.astro` |
| Screenshots do sistema | Extraídos como PNG → convertidos para WebP | `.webp` (public/assets/) |
| Anotações numeradas | Reconstruídas como HTML sobreposto ou junto ao texto | `.astro` |
| Cabeçalhos/rodapés repetitivos | Template de layout | `BaseLayout.astro` |

### 3.4 Organização de diretórios (espelhando os projetos de referência)

```
src/
├── components/
│   ├── astro/
│   │   ├── capitulos/       # Um .astro por capítulo/seção
│   │   │   ├── Capa.astro
│   │   │   ├── Expediente.astro
│   │   │   ├── Sumario.astro
│   │   │   ├── Apresentacao.astro
│   │   │   ├── ConceitosGerais.astro
│   │   │   ├── PapeisProfissionais.astro
│   │   │   ├── LoginSistema.astro
│   │   │   ├── AtendimentoIndividual.astro
│   │   │   ├── AtendimentoColetivo.astro
│   │   │   ├── MigrarProntuario.astro
│   │   │   ├── PainelEstatistico.astro
│   │   │   ├── ContraCapa.astro
│   │   │   └── SecaoTutorial.astro  # Componente reutilizável para páginas de tutorial
│   │   └── layout/
│   │       ├── Sidebar.astro
│   │       ├── ReadingModeToggle.astro
│   │       └── ThemeToggle.astro
│   └── react/
│       └── layout/
│           ├── BookViewport.tsx
│           ├── BlockAccordion.tsx
│           ├── WelcomeModal.tsx
│           └── ScrollToTop.tsx
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── data/
│   └── chapters.ts          # Metadados dos capítulos, sidebar config
├── lib/
│   └── constants.ts         # Cores, acentos, blocos
├── styles/
│   └── global.css           # CSS custom properties, temas, impressão
└── types/
    └── index.ts
```

---

## 4. Fases de Execução

### FASE 0 — Scaffolding do Projeto

**Objetivo**: Criar o esqueleto do projeto Astro copiando a estrutura base dos projetos de referência.

**Tarefas**:

| # | Tarefa | Arquivos | Verificação |
|---|---|---|---|
| 0.1 | Inicializar projeto Astro com React e TypeScript | `package.json`, `tsconfig.json`, `astro.config.mjs` | `npm run dev` funciona |
| 0.2 | Configurar Tailwind 3 + tailwindcss-animate + PostCSS + autoprefixer | `tailwind.config.ts`, `postcss.config.js` | Classes Tailwind funcionam |
| 0.3 | Copiar e adaptar `global.css` (temas, variáveis CSS, dark mode, impressão, daltonismo) | `src/styles/global.css` | Tema claro/escuro funcional |
| 0.4 | Criar `BaseLayout.astro` com metadados, fontes, theme toggle, a11y toggle, print button | `src/layouts/BaseLayout.astro` | Layout base renderiza |
| 0.5 | Criar `constants.ts` com paleta de cores institucionais do MDS/SUAS e acentos por bloco | `src/lib/constants.ts` | Constantes exportadas corretamente |
| 0.6 | Instalar dependências: react-pageflip, @radix-ui/react-accordion, lucide-react, pagefind, clsx, tailwind-merge, class-variance-authority | `package.json` | `npm install` sem erros |
| 0.7 | Criar `index.astro` vazio com `BaseLayout` | `src/pages/index.astro` | Página renderiza com layout |

**Cor institucional MDS**: O PDF original usa azul escuro governamental. As cores exatas serão extraídas da capa do PDF ou definidas como:
- Primária: azul institucional (~#004b87 ou similar do governo federal)
- Secundária: verde (~#009b3a)
- Acentos por bloco: tons de azul, verde, ciano, âmbar

**Entregável**: Projeto Astro rodando em `localhost:4321` com layout base, theme toggle, e estrutura de diretórios.

---

### FASE 1 — Extração e Preparação de Assets

**Objetivo**: Extrair todas as imagens do PDF e organizá-las otimizadas para web.

**Tarefas**:

| # | Tarefa | Comando/Método | Verificação |
|---|---|---|---|
| 1.1 | Extrair screenshots full-page (páginas 22-146) como PNG a 150dpi | `pdftoppm -r 150 -png -f 22 -l 146 manual.pdf public/assets/screenshots/page` | ~125 arquivos PNG gerados |
| 1.2 | Extrair páginas textuais (1-21) como PNG para referência visual | `pdftoppm -r 150 -png -f 1 -l 21 manual.pdf public/assets/pages/page` | 21 arquivos PNG de referência |
| 1.3 | Extrair imagens individuais do PDF (logotipos, ícones) | `pdfimages -png manual.pdf public/assets/images/img` | Imagens extraídas |
| 1.4 | Converter PNGs para WebP com qualidade 85% | `for f in public/assets/screenshots/*.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done` | WebPs gerados, ~70% menores que PNG |
| 1.5 | Script de automação da extração | `scripts/extract-assets.sh` | Script reproduzível |
| 1.6 | Remover PNGs não utilizados após conversão | — | Apenas WebPs no diretório final |

**Estimativa de tamanho**:
- PNGs (150dpi): ~250KB por screenshot → ~31MB total
- WebPs (q=85): ~80KB por screenshot → ~10MB total

**Entregável**: Diretório `public/assets/screenshots/` com ~125 WebPs otimizados, nomeados `page-022.webp` a `page-146.webp`.

---

### FASE 2 — Componentes de Layout e Navegação

**Objetivo**: Implementar a infraestrutura de navegação (sidebar, accordion, book viewport) copiada dos projetos de referência.

**Tarefas**:

| # | Tarefa | Arquivos | Verificação |
|---|---|---|---|
| 2.1 | Criar `Sidebar.astro` com navegação hierárquica dos capítulos | `src/components/astro/layout/Sidebar.astro` | Sidebar renderiza, links navegam |
| 2.2 | Criar `ReadingModeToggle.astro` (modo scroll vs livro) | `src/components/astro/layout/ReadingModeToggle.astro` | Toggle funcional |
| 2.3 | Criar `ThemeToggle.astro` (claro/escuro) — extrair do BaseLayout | `src/components/astro/layout/ThemeToggle.astro` | Alterna tema |
| 2.4 | Criar `BookViewport.tsx` usando react-pageflip | `src/components/react/layout/BookViewport.tsx` | Modo livro funcional |
| 2.5 | Criar `BlockAccordion.tsx` com Radix Accordion | `src/components/react/layout/BlockAccordion.tsx` | Blocos expandem/recolhem |
| 2.6 | Criar `WelcomeModal.tsx` (modal de boas-vindas no primeiro acesso) | `src/components/react/layout/WelcomeModal.tsx` | Modal aparece no primeiro acesso |
| 2.7 | Criar `ScrollToTop.tsx` | `src/components/react/layout/ScrollToTop.tsx` | Botão funcional |
| 2.8 | Integrar todos os componentes no `index.astro` | `src/pages/index.astro` | Navegação completa funcional |

**Entregável**: Single-page app com sidebar navegável, accordion blocks, modo livro (react-pageflip), dark mode, e modal de boas-vindas.

---

### FASE 3 — Páginas Textuais (Componentes Astro)

**Objetivo**: Reconstruir as ~19 páginas iniciais (capa, sumário, apresentação, conceitos) como componentes Astro elegantes, seguindo o estilo dos projetos de referência.

**Tarefas**:

| # | Tarefa | Arquivo | Conteúdo do PDF |
|---|---|---|---|
| 3.1 | **Capa** com SVG responsivo (mobile + desktop), cores institucionais MDS | `Capa.astro` | p.1 |
| 3.2 | **Expediente** / Ficha Técnica | `Expediente.astro` | p.2 |
| 3.3 | **Sumário** interativo com links para seções | `Sumario.astro` | p.3-4 |
| 3.4 | **Apresentação** do manual | `Apresentacao.astro` | p.5-6 |
| 3.5 | **Conceitos Gerais** — objetivos, escopo | `ConceitosGerais.astro` | p.7-9 |
| 3.6 | **Profissionais do SUAS** — tabela de papéis e atribuições | `PapeisProfissionais.astro` | p.10-12 |
| 3.7 | **Login no Sistema** — instruções passo a passo + screenshots | `LoginSistema.astro` | p.13-16 |
| 3.8 | **Termo de Uso** — texto formatado | `TermoUso.astro` | p.17 |
| 3.9 | **Contracapa** | `ContraCapa.astro` | p.147 |

**Padrão de qualidade por componente**:
- SVG inline para capa (sem dependência de imagens externas)
- Tipografia: Inter, com variações de peso (300-800)
- Cores via CSS custom properties (funciona em dark mode)
- Animações de entrada (fade-in-up, stagger)
- Responsivo (mobile-first com breakpoints md/lg)
- Estilos de impressão (A4, page breaks)

**Entregável**: ~9 componentes Astro, cada um renderizando uma seção completa do material.

---

### FASE 4 — Páginas de Tutorial (Screenshots + Anotações)

**Objetivo**: Criar o componente reutilizável `SecaoTutorial.astro` e instanciá-lo para cada uma das ~125 páginas de tutorial.

**Tarefas**:

| # | Tarefa | Detalhe |
|---|---|---|
| 4.1 | Criar `SecaoTutorial.astro` — componente que recebe props: `screenshotSrc`, `titulo`, `anotacoes[]`, `numeroPagina` | Layout: screenshot à direita (ou fundo), texto à esquerda |
| 4.2 | Mapear os 4 grandes capítulos do manual em `data/chapters.ts` | Atendimento Individual (p.22-92), Atendimento Coletivo (p.93-128), Migrar Prontuário (p.129-139), Painel Estatístico (p.140-146) |
| 4.3 | Para cada subseção, criar um arquivo `.astro` que instancia `SecaoTutorial` com os dados corretos | Ex: `InformacoesFamilia.astro`, `ComposicaoFamiliar.astro`, `FormaIngresso.astro`, etc. |
| 4.4 | **Transcrever os textos descritivos** de cada página do PDF para os componentes | Texto extraído via `pdftotext` e formatado em Markdown → Astro |

**Estrutura do `SecaoTutorial.astro`**:

```astro
---
interface Anotacao {
  numero: number      // ➊ ➁ ➂...
  texto: string       // Descrição do elemento
  destaque?: boolean  // Destaque visual
}

interface Props {
  screenshotSrc: string    // Caminho para o WebP
  titulo: string           // Título da seção
  subtitulo?: string
  anotacoes: Anotacao[]
  paginaFisica: number     // Número da página no PDF original
  observacao?: string      // Nota de rodapé/observação
}
---

<section class="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 ...">
  <div class="texto-descritivo">
    <h3>{titulo}</h3>
    {subtitulo && <p class="subtitulo">{subtitulo}</p>}
    <ol class="anotacoes">
      {anotacoes.map(a => (
        <li>
          <span class="numero-balao">{a.numero}</span>
          <span>{a.texto}</span>
        </li>
      ))}
    </ol>
    {observacao && <aside class="observacao">{observacao}</aside>}
  </div>
  <div class="screenshot-container">
    <img src={screenshotSrc} alt={titulo} loading="lazy" />
    <span class="pagina-indicator">p. {paginaFisica}</span>
  </div>
</section>
```

**Mapeamento dos capítulos**:

### Capítulo 1: Atendimento Individual e Familiar (p.22-92, ~70 seções)

| Subseção | Páginas PDF | Componente |
|---|---|---|
| Informações do Prontuário | 22-25 | `InformacoesProntuario.astro` |
| Excluir Prontuário | 26-29 | `ExcluirProntuario.astro` |
| Informações da Família | 30 | `InformacoesFamilia.astro` |
| Composição Familiar | 31 | `ComposicaoFamiliar.astro` |
| Forma de Ingresso / Motivo Atendimento | 32-33 | `FormaIngresso.astro` |
| Condições de Trabalho e Rendimento | 34-48 | `CondicoesTrabalho.astro` |
| Registro de Atendimentos | 49-55 | `RegistroAtendimentos.astro` |
| Situações de Vulnerabilidade | 56-65 | `Vulnerabilidades.astro` |
| Planejamento e Evolução | 66-71 | `PlanejamentoEvolucao.astro` |
| Encaminhamentos | 72-82 | `Encaminhamentos.astro` |
| Participação em Serviços | 83-91 | `ParticipacaoServicos.astro` |
| Medidas Socioeducativas | 92-100 | `MedidasSocioeducativas.astro` |
| Histórico de Acolhimento | 101 | `HistoricoAcolhimento.astro` |

### Capítulo 2: Atendimento Coletivo (p.102-128, ~27 seções)

| Subseção | Páginas PDF | Componente |
|---|---|---|
| Formulário de Controle de Encaminhamentos | 102-116 | `ControleEncaminhamentos.astro` |
| Relatório Simplificado | 117-128 | `RelatorioSimplificado.astro` |

### Capítulo 3: Migrar Prontuário (p.129-139, ~11 seções)

| Subseção | Páginas PDF |
|---|---|
| Migrar Prontuário | 129-139 |

### Capítulo 4: Painel Estatístico (p.140-146, ~7 seções)

| Subseção | Páginas PDF |
|---|---|
| Painel Estatístico | 140-146 |

**Entregável**: ~40-50 componentes Astro de tutorial, cada um com screenshot WebP + texto transcrito + anotações formatadas.

---

### FASE 5 — Dados e Configuração

**Objetivo**: Criar os arquivos de dados e configuração que alimentam a sidebar, blocos e busca.

**Tarefas**:

| # | Tarefa | Arquivo |
|---|---|---|
| 5.1 | Criar `data/chapters.ts` com a estrutura hierárquica completa dos capítulos | Define sidebar, blocos, acentos de cor |
| 5.2 | Definir constantes de cores e acentos por bloco (4 blocos = 4 cores) | `lib/constants.ts` |
| 5.3 | Configurar pagefind para busca full-text | `scripts/postbuild.sh` ou npm script |
| 5.4 | Configurar scripts npm: `dev`, `build`, `preview`, `postbuild` | `package.json` |

**Entregável**: Sidebar populada, busca funcional, build otimizado.

---

### FASE 6 — Polimento e Acessibilidade

**Objetivo**: Garantir qualidade visual, acessibilidade e performance.

**Tarefas**:

| # | Tarefa | Critério de Aceite |
|---|---|---|
| 6.1 | Revisar todos os componentes para responsividade mobile | Layout funcional em 375px-1920px |
| 6.2 | Garantir que todos os textos transcritos conferem com o PDF original | Spot-check de 20% das páginas |
| 6.3 | Dark mode em todos os componentes | Nenhum elemento "quebra" no tema escuro |
| 6.4 | Modos de daltonismo (3 variantes) funcionais | Cores distinguíveis em todos os modos |
| 6.5 | Estilos de impressão (A4, @page, page-breaks) | PDF gerado pelo browser equivale ao original |
| 6.6 | Performance: Lighthouse > 90 em todos os scores | Audit com Playwright |
| 6.7 | Adicionar meta tags OG, favicon, manifest | Compartilhamento em redes sociais funcional |
| 6.8 | `loading="lazy"` em todas as screenshots | Lazy loading funcional |
| 6.9 | Script de patch do pageflip (copiar `scripts/patch-pageflip.js`) | Modo livro sem erros de console |

---

### FASE 7 — Build e Deploy

**Objetivo**: Gerar build de produção estático.

**Tarefas**:

| # | Tarefa | Verificação |
|---|---|---|
| 7.1 | `npm run build` (astro check + astro build + pagefind) | Build sem erros |
| 7.2 | Gerar HTML self-contained (`inline.mjs` → `manual-self-contained.html`) | Arquivo único offline funcional |
| 7.3 | Testar deploy estático (GitHub Pages ou similar) | Site público acessível |

---

## 5. Estimativa de Esforço

| Fase | Descrição | Esforço | Paralelizável? |
|---|---|---|---|
| 0 | Scaffolding | 2-3h | Não (dependências sequenciais) |
| 1 | Extração de assets | 1-2h (automatizado) | Sim (roda em background) |
| 2 | Layout e navegação | 3-4h | Parcialmente (após Fase 0) |
| 3 | Páginas textuais (9 componentes) | 6-8h | Sim (componentes independentes) |
| 4 | Páginas de tutorial (~45 componentes) | 20-30h | Sim (maior parte paralelizável) |
| 5 | Dados e configuração | 2-3h | Parcialmente |
| 6 | Polimento e acessibilidade | 4-6h | Parcialmente |
| 7 | Build e deploy | 1-2h | Não |
| **Total** | | **~40-58h** | |

### Pipeline de paralelização ideal

```
Fase 0 (sequencial)
  ↓
Fase 1 (background) ∥ Fase 2 (principal)
  ↓                      ↓
Fase 3 (9 paralelo)     Fase 5 (config)
  ↓
Fase 4 (45 componentes — 5 batches de 9 paralelos)
  ↓
Fase 6 (polimento)
  ↓
Fase 7 (build)
```

---

## 6. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Screenshots conterem informações sensíveis (dados de exemplo) | Média | Alto | Revisar cada screenshot antes do deploy; borrar dados se necessário |
| Transcrição manual de ~125 páginas ser inviável | Alta | Alto | Usar `pdftotext` para extrair texto base; revisar apenas; priorizar capítulos principais se necessário |
| react-pageflip performance com ~125 "páginas" virtuais | Média | Médio | Virtualização; carregar apenas páginas visíveis + buffer; dividir em capítulos menores |
| Tamanho do build final (>50MB) | Baixa | Médio | WebP com qualidade 80%; lazy loading; CDN |
| Inconsistência entre texto extraído e screenshot | Média | Baixo | O PDF é de Dez/2025 — sistema pode ter mudado; adicionar nota de versão |

---

## 7. Critérios de Sucesso

- [ ] Projeto Astro compila sem erros (`npm run build`)
- [ ] Todas as 147 páginas do conteúdo original estão representadas
- [ ] Screenshots do sistema são fiéis ao PDF original
- [ ] Modo livro (react-pageflip) funcional com navegação por teclado
- [ ] Dark mode e modos de daltonismo funcionais
- [ ] Impressão gera PDF limpo em A4
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] Busca full-text (pagefind) indexa todo o conteúdo
- [ ] Sidebar com navegação hierárquica completa
- [ ] Site publicável como estático puro (sem servidor)

---

## 8. Notas Técnicas

### Extração de screenshots com crop de cabeçalho

O cabeçalho "Manual de uso: Prontuário Eletrônico / Dezembro 2025" se repete em todas as páginas de tutorial. Idealmente, o crop remove esse cabeçalho da imagem, já que ele será renderizado pelo template Astro. Ferramenta: `pdfcrop` ou `imagemagick` com coordenadas fixas.

### Formato dos balões numerados

Os números circulados (➊-➓) no PDF são elementos gráficos do InDesign. No material web, serão renderizados como CSS puro:

```css
.numero-balao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--institucional-blue);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
}
```

### Scripts de automação

```
scripts/
├── extract-assets.sh      # Fase 1: extrai e converte assets
├── extract-text.sh        # Fase 4: extrai texto do PDF por página
├── patch-pageflip.js      # Fase 6: patch para react-pageflip
└── inline.mjs             # Fase 7: gera HTML self-contained
```

---

## 9. Próximos Passos (após aprovação do Momus)

1. Executar Fase 0 (scaffolding)
2. Executar Fase 1 (extração de assets) em paralelo com Fase 2 (layout)
3. Submeter cada componente da Fase 3 para revisão individual
4. Iniciar Fase 4 por capítulo (começando pelo Atendimento Individual)
5. Review completo pela Momus ao final da Fase 6
