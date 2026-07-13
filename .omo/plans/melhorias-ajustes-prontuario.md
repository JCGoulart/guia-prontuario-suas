# Reasonix Implementation Prompt — Manual do Prontuário Eletrônico

> **Model**: deepseek-v4-flash  
> **Project path**: `/home/predator/projects/teste_prontuario`  
> **Reference project** (for copying expediente patterns): `/home/predator/projects/guia-vigilancia-socioassistencial`  
> **Content reference PDF**: `/home/predator/projects/teste_prontuario/mds-manual_prontuario-defeso.pdf` (for Wave 5 professional profiles)  
> **Origin**: `ajustes.txt` — 13 improvement items, organized into 6 waves

---

## Project Overview

Astro 5 + React 19 + Tailwind CSS 4 application. It renders a book-like manual ("Manual do Prontuário Eletrônico — SUAS") using the `page-flip` library. The content is organized as a single-page app with collapsible sections.

### File Structure
```
src/
├── components/
│   ├── astro/
│   │   ├── capitulos/
│   │   │   ├── Capa.astro              ← Book cover (SVG)
│   │   │   ├── Expediente.astro        ← Publishing credits
│   │   │   ├── Sumario.astro           ← Table of contents
│   │   │   ├── Apresentacao.astro      ← Presentation + Concepts + Professionals
│   │   │   ├── LoginSistema.astro      ← Login flow
│   │   │   ├── TermoUso.astro          ← Terms of use
│   │   │   └── expandidas/
│   │   │       ├── FluxoAtendimento.astro  ← Vertical flow diagram (reference pattern)
│   │   │       ├── PapelProfissionais.astro ← Professional role cards (reference pattern)
│   │   │       └── ...
│   │   ├── content/
│   │   │   └── FeatureCard.astro       ← Reusable card component (icon + title + description)
│   │   └── layout/
│   │       └── SectionHeader.astro     ← Section title with badge, icon, gradient line
│   └── react/
│       ├── content/
│       │   ├── ConceptsAccordion.tsx    ← Currently an accordion with search bar — NEEDS REDESIGN
│       │   └── ProfessionalProfiles.tsx ← CRAS professional profile cards — NEEDS CORRECTION
│       └── layout/
│           └── WelcomeModal.tsx         ← Portal-based modal dialog — REFERENCE FOR TermoUsoModal
├── data/
│   ├── welcome.ts                      ← Welcome modal config (team, contact, cadernos)
│   └── termo.ts                        ← TO BE CREATED: termo de uso full text
├── lib/
│   └── constants.ts                    ← BLOCKS, BLOCK_ACCENTS, INTRO_SECTIONS, institutional colors
├── pages/
│   └── index.astro                     ← Main page assembling all sections
└── styles/
    └── global.css                      ← Tailwind imports + custom animations
```

### Visual Conventions
- **Institutional colors**: blue `#123e6b`, green `#1a7a3a`
- **Cards**: `border-t-4` colored border, `bg-gradient-to-br`, `hover:-translate-y-0.5`, `shadow-md`
- **Sections**: `animate-fade-in`, `bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 md:p-16`
- **Icons**: SVG inline strings in Astro frontmatter, or Lucide-react imports in React components
- **Dark mode**: Always include `dark:` variants
- **Accessibility**: `aria-label`, `role="dialog"`, `aria-modal`, `aria-labelledby` on interactive components
- **No new npm dependencies** — do NOT add packages. Use existing patterns only.

### React Component Rules
- No `'use client'` directive (Astro handles islands)
- Use `export default function`
- TypeScript strict — no `any`, no `@ts-ignore`
- Client components use `client:load` in Astro

---

## Execution Order

Execute waves sequentially (1 through 6). Waves 1, 2, 3, 4, and 6 are internally parallelizable (their sub-tasks don't depend on each other). Wave 5 depends on Wave 3 completing first (it extracts a section that Wave 3 modifies).

---

## WAVE 1 — Quick Adjustments (Cover + Summary + Font)

### 1.1 — Cover: Center icon + improve title
**File**: `src/components/astro/capitulos/Capa.astro`

The cover contains two SVG blocks (mobile `viewBox="0 0 400 600"` and desktop `viewBox="0 0 1200 1600"`). The central icon (concentric circles + document rectangle) is positioned via `transform="translate(600, 380)"` (desktop) and `translate(200, 170)` (mobile).

**Actions**:
1. Verify the icon group is perfectly centered horizontally. The SVG viewport is 1200 wide — center is 600. The `translate(600, 380)` is already X-centered. Check that the circles' `cx="0"` (relative to group center) works correctly with `text-anchor="middle"` on the title.
2. Improve title hierarchy: the current title stack is `MANUAL DO` (22px), `Prontuário` (82px), `Eletrônico` (82px green). 
   - Add subtle letter-spacing to "MANUAL DO"
   - Ensure adequate vertical rhythm (current Y offsets: 0, 100, 185, 240)
   - Adjust the subtitle "Sistema Único de Assistência Social" font-weight and size for better legibility
3. Same adjustments for the mobile SVG (400x600 viewport)

**Validation**: Visual check — icon centered, title readable at both resolutions.

### 1.2 — Summary: Update reading time estimate
**File**: `src/components/astro/capitulos/Sumario.astro`, line 16

Current: `<span>~15 min de leitura</span>`

**Action**: Update to `~25 min de leitura` (accounting for expanded concepts, new cards, and richer content from these waves).

**Validation**: Verify the span text changed.

### 1.3 — Global: Standardize font
**Files**: `src/styles/global.css`, `tailwind.config.ts`

**Actions**:
1. Check `tailwind.config.ts` → `theme.extend.fontFamily` for the font stack
2. Check `global.css` for any hardcoded `font-family` declarations that differ from the Tailwind config
3. Ensure the `BaseLayout.astro` body element has `font-sans` class
4. If any component hardcodes a different `font-family`, normalize it to the project standard

**Validation**: No orphan `font-family` declarations; all text renders with the same font stack.

---

## WAVE 2 — Expediente Sync (Copy from reference project)

### 2.1 — Expediente page: Replace with full COOVIG/SEDSODH content

**File**: `src/components/astro/capitulos/Expediente.astro`

**Current state**: Simple list showing MDS and SNAS.

**Target**: Replace with the following layout (copied + adapted from reference project):

```astro
---
import SectionHeader from '@/components/astro/layout/SectionHeader.astro'
---
<section id="expediente" class="animate-fade-in bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-12 md:p-16 print:shadow-none print:rounded-none">
  <SectionHeader title="Expediente" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-4 border-institucional-blue pl-4">Gestão</h3>
      <ul class="space-y-3 text-sm text-slate-700 dark:text-slate-300">
        <li><span class="font-semibold text-slate-500 dark:text-slate-400 block text-xs uppercase">Secretário de Desenvolvimento Social e Direitos Humanos</span> Anderson Coelho</li>
        <li><span class="font-semibold text-slate-500 dark:text-slate-400 block text-xs uppercase">Subsecretário de Gestão do SUAS</span> Felippe de Souza Rodrigues</li>
        <li><span class="font-semibold text-slate-500 dark:text-slate-400 block text-xs uppercase">Superintendente de Gestão do SUAS</span> Adriana Alves Pinto de Castro</li>
        <li><span class="font-semibold text-slate-500 dark:text-slate-400 block text-xs uppercase">Coordenador de Vigilância Socioassistencial</span> Matheus Lopes</li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-l-4 border-institucional-green pl-4">Equipe Responsável pelo Manual</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">Manual do Prontuário Eletrônico — SUAS</p>
      <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <li class="flex items-center gap-2">
          <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-institucional-lightGreen dark:bg-institucional-green/20 text-institucional-green">Coordenador</span>
          Matheus Lopes
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-institucional-lightBlue dark:bg-institucional-blue/20 text-institucional-blue">Assessor</span>
          Junier Goulart
        </li>
        <li class="flex items-center gap-2">
          <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-institucional-lightBlue dark:bg-institucional-blue/20 text-institucional-blue">Assessor</span>
          Matheus de Freitas
        </li>
      </ul>
    </div>
  </div>
  <div class="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
    <p><span class="font-semibold">Coordenação Estadual de Vigilância Socioassistencial (COOVIG)</span></p>
    <p>Secretaria de Estado de Desenvolvimento Social e Direitos Humanos do Rio de Janeiro (SEDSODH)</p>
    <p class="mt-2 italic">Versão 1.0 — 2026</p>
  </div>
</section>
```

**Validation**: Page renders with 2-column grid, correct names, footer with COOVIG/SEDSODH.

### 2.2 — Welcome Modal: Update team data

**File**: `src/data/welcome.ts`

**Action**: Replace `WELCOME_TEAM` and `WELCOME_CONTACT` with:

```typescript
export const WELCOME_TEAM = [
  {
    unit: 'Coordenação Estadual de Vigilância Socioassistencial (COOVIG)',
    role: 'Desenvolvimento do Manual',
    responsible: 'Junier Goulart',
    support: 'Matheus Lopes e Matheus de Freitas',
    email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  },
]

export const WELCOME_CONTACT = {
  phone: '(21) 3231-3658',
  email: 'coordvigilanciasgs@sedsdh.rj.gov.br',
  address: 'Secretaria de Estado de Desenvolvimento Social e Direitos Humanos — Rio de Janeiro/RJ',
}
```

Also update `WELCOME_CONTENT.teamLabel` to `'Equipe Responsável'` (matching reference project pattern).

**Do NOT change**: `WELCOME_CONTENT.title`, `subtitle`, `description`, `WELCOME_CONFIG.localStorageKey`, or `OTHER_CADERNOS` — those stay project-specific.

**Validation**: WelcomeModal shows COOVIG team with correct email/phone.

---

## WAVE 3 — Apresentação Restructure

All changes in `src/components/astro/capitulos/Apresentacao.astro`.

### 3.1 — Add "Sigilo das Informações" highlighted box

After the existing "Estrutura do Sistema" `<div class="border-l-4...">` block (around line 24-30), add a second highlighted box with the same visual style but amber accent:

```html
<div class="border-l-4 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/20 rounded-r-xl pl-5 py-3 mb-8 mt-6">
  <h3 class="text-xl font-bold text-slate-800 dark:text-white">Sigilo das Informações</h3>
  <p class="text-sm text-slate-600 dark:text-slate-400 mt-2 italic leading-relaxed">
    Todas as informações registradas no Prontuário Eletrônico do SUAS são protegidas por sigilo profissional e pela Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). O acesso aos dados é restrito aos profissionais autorizados, conforme os perfis definidos no CadSUAS, e qualquer compartilhamento indevido constitui violação ética e legal.
  </p>
</div>
```

**Position**: Right after "Estrutura do Sistema" box, before the prose paragraph about "Por meio do prontuário...".

### 3.2 — Add "Atendimento à Família" FeatureCard

The current grid (line 35) has 3 cards. Change the grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4` and add a new card as the first item:

```astro
<FeatureCard
  title="Atendimento à Família"
  description="Registro do atendimento individualizado e familiar, com escuta qualificada, diagnóstico social, plano de acompanhamento e evolução no prontuário de cada família."
  accent="blue"
  icon="Users"
  badge="Individual"
/>
```

### 3.3 — Reorder all cards

Final order (replace the entire grid):

1. **Atendimento à Família** (new, blue, Users, "Individual")
2. **Atendimento Coletivo** (existing, green, LayoutGrid, "Grupo")  
3. **Migrar Prontuário** (existing, blue, Users, "Transferência")
4. **Painel Estatístico** (existing, purple, BarChart3, "Indicadores")

**Validation**: Grid shows 4 cards in correct order. 2 columns on tablet (`md:`), 4 on desktop (`lg:`).

---

## WAVE 4 — Conceitos Gerais Redesign

**File**: `src/components/react/content/ConceptsAccordion.tsx`

### 4.1 — Remove search, transform accordion into distinct visual cards

**Current state**: Compact accordion with search input at top, filter logic, and simple expand/collapse text.

**Target**: Remove everything accordion-related. Replace with a scrollable list of full-width visual cards, one per concept.

**Detailed changes**:

1. **Remove**: `searchQuery` state, `<input>` search bar, filter logic, `expandedId` state, `toggle()` function, accordion expand/collapse animation, counter text ("X de Y conceitos expandidos"), `ChevronDown` icons, `Search` icon import.

2. **Keep**: The `CONCEPTS` constant data — 7 concepts. For each concept (`id` + `title` + `description` + `accent`), add a new `icon` field with an inline SVG string and an `exemplo` field with a 1-2 sentence practical example.

3. **Define icons for each concept** (inline SVG strings, Lucide-style, `w-8 h-8`):

| Concept ID | Icon (SVG) |
|---|---|
| `atendimento` | Handshake or MessageCircle |
| `acompanhamento-social` | GitBranch or Repeat |
| `articulacao-intersetorial` | Share2 or Network |
| `busca-ativa` | Search or MapPin |
| `diagnostico-social` | FileSearch or ClipboardCheck |
| `escuta-qualificada` | Ear or Mic |
| `pratica-reflexiva` | Lightbulb or BookOpen |

Use simple inline SVGs matching the project pattern:
```
'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">...</svg>'
```

4. **New component structure** — each concept rendered as its own distinct card:

```
<div class="space-y-6">
  {CONCEPTS.map(concept => (
    <div class="rounded-xl border-2 border-l-4 bg-gradient-to-br ... shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all p-6">
      <div class="flex items-start gap-4">
        {/* Large icon in colored circle */}
        <div class="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-{accent}-500 ...">
          <span dangerouslySetInnerHTML={{ __html: concept.icon }} class="text-white" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2">{concept.title}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{concept.description}</p>
          <div class="border-l-2 border-{accent}-300 pl-3 text-xs text-slate-500 dark:text-slate-400 italic">
            <span class="font-semibold text-slate-600 dark:text-slate-300">Na prática: </span>
            {concept.exemplo}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
```

5. **Colors per accent**: `blue` → `border-blue-500`, `from-blue-500 to-blue-400`; `green` → `border-green-500`, `from-green-500 to-green-400`. Alternate blue/green per concept.

6. **Add `exemplo` field to each CONCEPT entry** with a practical real-world example. Examples:

| Concept | Exemplo |
|---|---|
| Atendimento | "Um cidadão procura o CRAS relatando dificuldades financeiras. O técnico registra o atendimento inicial, coleta dados básicos e agenda o retorno para estudo social." |
| Acompanhamento Social | "A família Silva é acompanhada mensalmente com visitas domiciliares e atualização do plano de acompanhamento, registrando cada evolução no prontuário." |
| Articulação Intersetorial | "O CRAS articula com a UBS local o encaminhamento de gestante em vulnerabilidade, compartilhando informações essenciais via relatório técnico." |
| Busca Ativa | "Equipe volante identifica famílias em ocupação irregular não cadastradas, realiza abordagem e insere os dados no sistema para início do acompanhamento." |
| Diagnóstico Social | "O técnico cruza dados do CadÚnico com visita domiciliar para identificar que 60% das famílias do território têm renda per capita abaixo de 1/4 do salário mínimo." |
| Escuta Qualificada | "Durante a entrevista, o profissional acolhe o relato de violência doméstica sem julgamento, registra no prontuário e aciona a rede de proteção." |
| Prática Reflexiva | "Em reunião de equipe, os técnicos discutem um caso complexo, revisam abordagens anteriores e propõem nova estratégia de intervenção fundamentada teoricamente." |

7. **Update the component export**: Keep `export default function ConceptsAccordion()` but rename internally if needed. The calling Astro file (`Apresentacao.astro`) already uses `<ConceptsAccordion client:load />` — no changes needed there.

**Validation**: Each concept renders as a distinct, visually rich card. No search bar. No accordion behavior. Icons visible. Example text shown for each concept.

---

## WAVE 5 — Professional Profiles & Access Roles

### 5.1 — Fix CRAS professional profiles

**File**: `src/components/react/content/ProfessionalProfiles.tsx`

**IMPORTANT**: Before editing, open the PDF at `/home/predator/projects/teste_prontuario/mds-manual_prontuario-defeso.pdf` and locate the section listing "Equipe de Referência do CRAS" or "Profissionais do CRAS". The current `PROFILES` constant contains entries that may not match the official norm.

**Known issue**: `tecnico-enfermagem` (Técnico em Enfermagem) is listed but does NOT belong to the CRAS reference team.

**Actions**:
1. Read the PDF to get the correct list of CRAS professionals
2. Remove `tecnico-enfermagem` from the `PROFILES` array
3. Add any missing professionals found in the PDF (likely candidates: `Pedagogo`, `Sociólogo`, `Orientador Social`, `Educador Social` — but confirm against PDF, do not guess)
4. For each new profile, define: `id` (kebab-case), `role` (display name), `level` (`'superior' | 'medio' | 'apoio'`), `icon` (import from lucide-react), `accent` (`border-t-{color}-500 dark:border-t-{color}-400`), `description` (1-2 sentences about their role in CRAS)

**Available lucide-react icons already used in project**: `Briefcase`, `Brain`, `Heart`, `Scale`, `GraduationCap`, `Stethoscope`, `ClipboardList`, `Phone`. Additional icons available from lucide-react: `BookOpen`, `Users`, `Lightbulb`, `Search`, `Target`, `Star`.

**Validation**: PROFILES array contains ONLY profiles from the PDF. No `tecnico-enfermagem`. All required profiles present.

### 5.2 — Extract "Profissionais do SUAS e Perfis de Acesso" to own file

**Current file**: `src/components/astro/capitulos/Apresentacao.astro` (lines 79-122 — section `#papeis-profissionais`)

**New file**: `src/components/astro/capitulos/ProfissionaisPerfis.astro`

**Actions**:
1. Cut the entire `<section id="papeis-profissionais">...</section>` block (the profissionais + perfis section) from `Apresentacao.astro` and paste into new `ProfissionaisPerfis.astro`
2. Add the `---` frontmatter with imports (`ProfessionalProfiles` from `@/components/react/content/ProfessionalProfiles.tsx`)
3. In `src/pages/index.astro`: 
   - Add `import ProfissionaisPerfis from '@/components/astro/capitulos/ProfissionaisPerfis.astro'`
   - Place `<ProfissionaisPerfis />` between `<Apresentacao />` and `<LoginSistema />`
4. In `src/lib/constants.ts`, update `INTRO_SECTIONS` to include the new section:
```typescript
export const INTRO_SECTIONS = [
  { id: 'capa', title: 'Capa' },
  { id: 'expediente', title: 'Expediente' },
  { id: 'sumario', title: 'Sumário' },
  { id: 'apresentacao', title: 'Apresentação' },
  { id: 'papeis-profissionais', title: 'Profissionais do SUAS e Perfis de Acesso' },
]
```
5. Update `src/components/astro/capitulos/Sumario.astro` — add the new section link in the "Seções Introdutórias" list (between Apresentação and Login no Sistema)

**Validation**: Section renders on its own. Sidebar navigation works. Sumário link works.

### 5.3 — Improve "Perfis de Acesso" card visuals

**File**: `src/components/astro/capitulos/ProfissionaisPerfis.astro` (the new file from 5.2)

The current Perfis de Acesso section uses simple `border-t-4 bg-gradient-to-br` divs without icons or badges. Redesign to match the quality of `ProfessionalProfiles.tsx` cards.

**Replace the 3 access profile cards with this pattern** (inspired by `ProfessionalProfiles.tsx`):

```astro
<!-- Admin Federal — full width -->
<div class="border-t-4 border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
  <div class="flex items-start gap-3">
    <span class="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </span>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500 text-white mb-2">Administrador Federal</span>
      <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Responsável pela gestão nacional do sistema. Gerencia acessos e perfis na Rede SUAS, coordena e integra o sistema em todo o país, define normas e diretrizes nacionais de uso.</p>
    </div>
  </div>
</div>

<!-- Gestores — side by side -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="border-t-4 border-green-500 dark:border-green-400 bg-gradient-to-br from-green-50 to-green-100/60 dark:from-green-950/40 dark:to-green-900/20 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-start gap-3">
      <span class="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
      </span>
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white mb-2">Gestor Municipal</span>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Administração dos acessos e permissões no âmbito municipal. Acompanha o uso do sistema e utiliza dados consolidados para gestão estratégica (sem acesso a prontuários individuais).</p>
      </div>
    </div>
  </div>

  <div class="border-t-4 border-green-500 dark:border-green-400 bg-gradient-to-br from-green-50 to-green-100/60 dark:from-green-950/40 dark:to-green-900/20 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div class="flex items-start gap-3">
      <span class="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </span>
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white mb-2">Gestor Estadual</span>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Gestão macro das informações no estado. Monitora e avalia ações municipais com base em dados consolidados, planeja ações estratégicas e presta apoio técnico aos municípios.</p>
      </div>
    </div>
  </div>
</div>
```

**Validation**: Cards have icons, colored badges, gradient backgrounds, hover effects — matching ProfessionalProfiles quality.

---

## WAVE 6 — Login Flow Diagram + Termo de Uso Modal

### 6.1 — Add visual login flow diagram

**File**: `src/components/astro/capitulos/LoginSistema.astro`

**Reference pattern**: `FluxoAtendimento.astro` — vertical cards connected by animated chevron connectors.

**Action**: Add a visual flow diagram between the introductory paragraph and the existing step-by-step list. The diagram uses the EXACT same pattern as FluxoAtendimento:

```
Card patterns (ASTRO frontmatter):
```
```astro
---
const cardVariantStyles = {
  govbr: {
    card: 'border-blue-600 dark:border-blue-500 from-blue-50 to-white dark:from-blue-950/40 dark:to-slate-800',
    icon: 'from-blue-600 to-blue-500',
    title: 'text-blue-800 dark:text-blue-300',
    badge: 'bg-blue-600 text-white',
  },
  autorizar: {
    card: 'border-green-600 dark:border-green-500 from-green-50 to-white dark:from-green-950/40 dark:to-slate-800',
    icon: 'from-green-600 to-green-500',
    title: 'text-green-800 dark:text-green-300',
    badge: 'bg-green-600 text-white',
  },
  selecionar: {
    card: 'border-cyan-600 dark:border-cyan-500 from-cyan-50 to-white dark:from-cyan-950/40 dark:to-slate-800',
    icon: 'from-cyan-600 to-cyan-500',
    title: 'text-cyan-800 dark:text-cyan-300',
    badge: 'bg-cyan-600 text-white',
  },
  inicial: {
    card: 'border-purple-600 dark:border-purple-500 from-purple-50 to-white dark:from-purple-950/40 dark:to-slate-800',
    icon: 'from-purple-600 to-purple-500',
    title: 'text-purple-800 dark:text-purple-300',
    badge: 'bg-purple-600 text-white',
  },
}
```

**Diagram structure** (4 cards + 3 connectors):

```
Card 1 (govbr):      Acessar gov.br — "Informe CPF e senha no login gov.br"
      ↓ connector
Card 2 (autorizar):  Autorizar dados — "Autorize o uso dos dados pessoais"
      ↓ connector
Card 3 (selecionar): Selecionar unidade e perfil — "Escolha unidade e perfil no CadSUAS"
      ↓ connector
Card 4 (inicial):    Tela inicial — "Sistema liberado conforme permissões do perfil"
```

Each card follows the FluxoAtendimento pattern (flex row with icon circle + badge + title + subtitle):
```html
<div class="w-full animate-fade-in">
  <div class={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 bg-gradient-to-br shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white dark:bg-slate-800 ${cardVariantStyles.govbr.card}`}>
    <div class={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br shrink-0 ${cardVariantStyles.govbr.icon}`}>
      <!-- SVG icon: Lock or LogIn -->
    </div>
    <div class="flex flex-col gap-0.5">
      <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit ${cardVariantStyles.govbr.badge}`}>GOV.BR</span>
      <h3 class={`text-base font-bold m-0 ${cardVariantStyles.govbr.title}`}>Acessar gov.br</h3>
      <p class="text-[11px] text-slate-500 dark:text-slate-400 m-0">Informe CPF e senha no login gov.br</p>
    </div>
  </div>
</div>
```

Connector between cards (reuse from FluxoAtendimento):
```html
<div class="connector-simple animate-fade-in">
  <svg class="arrow-chevron w-4 h-4 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
</div>
```

**Add at bottom of file** (same `<style>` block as FluxoAtendimento):
```css
.connector-simple { height: 26px; display: flex; align-items: center; justify-content: center; }
.arrow-chevron { animation: bounceDown 1.5s ease-in-out infinite; }
@keyframes bounceDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
```

**Icon SVGs for the 4 cards** — use inline SVGs (20x20 viewBox):
- Card 1 (gov.br): Lock icon
- Card 2 (authorize): Check or Shield icon 
- Card 3 (select): Users or Building icon
- Card 4 (home): Layout or Monitor icon

**Validation**: Diagram renders vertically centered, connectors animate, responsive. Original text steps remain below the diagram.

### 6.2 — Termo de Uso: Add modal with full term content

**New file**: `src/data/termo.ts`

```typescript
export const TERMO_CONTEUDO = `Ao utilizar o Prontuário SUAS, o(a) usuário(a) manifesta estar ciente e de acordo com relação ao conteúdo deste Termo de Responsabilidade, e estará legalmente vinculado(a) a todas as condições previstas neste instrumento, na Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), na Portaria SNAS nº 143/2017, e na Resolução CIT nº 29/2025.

1. São obrigações e responsabilidades dos(as) técnicos(as) que acessam o Prontuário SUAS:

1.1. Manter a confidencialidade dos dados acessados;

1.2. Zelar pela precisão e pela veracidade no registro das informações;

1.3. Assegurar que as informações acessadas sejam utilizadas apenas para os fins previstos.

1.4. Resguardar a senha de acesso do gov.br, que é pessoal e intransferível;

1.5. Informar ao respectivo órgão gestor (secretaria municipal, distrital ou estadual de assistência social) qualquer divergência nos dados dos técnicos, como nome, CPF, cargo/função, escolaridade ou data de desligamento da função, para que sejam alterados no CadSUAS.

1.6. Acessar o sistema sempre a partir de redes e equipamentos seguros, e com antivírus e antimalware instalados.

2. O Usuário declara ter ciência que é expressamente proibido:

2.1. Utilizar o Prontuário SUAS para comercialização, venda, ou distribuição de dados obtidos por meio do sistema ou qualquer meio de obtenção de lucro ou vantagem financeira.

2.2. Utilizar as informações para campanhas de marketing, estudos de mercado ou campanhas políticas.

2.3. Compartilhar senha de acesso com qualquer pessoa ou usuário(a), sob quaisquer circunstâncias.

Informamos que todo e qualquer acesso ao Prontuário SUAS será armazenado em log, que registrará quais os dados acessados e quais as alterações realizadas, e ficará disponível para auditoria de órgãos de controle e de justiça.`
```

**New file**: `src/components/react/content/TermoUsoModal.tsx`

Create a modal component modeled after `WelcomeModal.tsx`:

```typescript
import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { TERMO_CONTEUDO } from '@/data/termo'

interface TermoUsoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermoUsoModal({ isOpen, onClose }: TermoUsoModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap & Escape
  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'Tab') { /* focus trap logic same as WelcomeModal */ }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 250)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0',
        )}
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="termo-title"
        className={cn(
          'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto styled-scrollbar',
          'bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900',
          'rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
          isOpen && !isClosing ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4',
          'transition-all duration-300',
        )}
      >
        {/* Header */}
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-amber-500 via-amber-500/70 to-amber-400 pointer-events-none" aria-hidden="true" />
          <button ref={closeButtonRef} onClick={handleClose} aria-label="Fechar"
            className="absolute top-3 right-3 z-10 p-2.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
            dangerouslySetInnerHTML={{ __html: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' }}
          />
          <div className="flex items-start gap-4 pr-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-400 text-white"
              dangerouslySetInnerHTML={{ __html: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }}
            />
            <div>
              <h2 id="termo-title" className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Termo de Responsabilidade</h2>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-0.5">Prontuário Eletrônico do SUAS</p>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="px-4 py-5 sm:p-6">
          <div className="prose prose-sm max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
            {TERMO_CONTEUDO}
          </div>
        </div>
        {/* Footer */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button onClick={handleClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-500/95 hover:to-amber-400/80 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Modify**: `src/components/astro/capitulos/TermoUso.astro`

Add at the bottom of the section (before closing `</section>`):

```astro
---
// Add import in frontmatter:
import TermoUsoModal from '@/components/react/content/TermoUsoModal'
---

<!-- Add to template -->
<div class="mt-8 flex justify-center">
  <button id="termo-modal-trigger" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-500/95 hover:to-amber-400/80 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    Ver Conteúdo Completo do Termo
  </button>
</div>
<TermoUsoModal client:load />
```

But since Astro can't directly pass state to a React island for open/close, use a simple approach: keep the modal state internal and wire the button via a DOM event or use the WelcomeModal pattern with a custom event. **Simplest approach**: Make TermoUsoModal self-contained — always render, default `isOpen={false}`, and expose a global `window.openTermoModal()` function. Wire the button with an inline `onclick`:

```astro
<button onclick="window.openTermoModal?.()" ...>
```

And in TermoUsoModal.tsx:
```typescript
useEffect(() => {
  (window as any).openTermoModal = () => setIsOpen(true)
  return () => { delete (window as any).openTermoModal }
}, [])
```

**Validation**: Click button → modal opens → full term text visible → scroll works → close via X, Escape key, or backdrop click → text matches `ajustes.txt` content.

---

## Final Validation Checklist

After all waves are complete, verify:

- [ ] `npm run build` succeeds without errors
- [ ] All new files have proper TypeScript types (no `any`)
- [ ] Dark mode variants present on all new components
- [ ] Sidebar navigation reaches all sections, including new `ProfissionaisPerfis`
- [ ] Sumário links point to correct sections
- [ ] No orphaned or broken references

Run `npx astro build` to verify the build passes.
