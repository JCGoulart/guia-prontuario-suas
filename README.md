# Guia do Prontuário Eletrônico — SUAS

**SUAS / RJ — COOVIG / SEDSODH**

[![Licença: CC BY-SA 4.0](https://img.shields.io/badge/Licen%C3%A7a-CC%20BY--SA%204.0-brightgreen)](./LICENSE)
[![Deploy](https://github.com/JCGoulart/guia-prontuario-suas/actions/workflows/deploy.yml/badge.svg)](https://github.com/JCGoulart/guia-prontuario-suas/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)

> Manual completo do Prontuário Eletrônico do SUAS, com orientações passo a passo para os profissionais da rede socioassistencial. Da gestão do prontuário ao painel estatístico, passando por atendimento individual, coletivo, benefícios eventuais e encaminhamentos.

---

## Sobre

O Prontuário Eletrônico é o módulo do Sistema SUAS destinado ao registro do atendimento das famílias e indivíduos acompanhados pela rede socioassistencial. Este Manual, produzido pela **Coordenação Estadual de Vigilância Socioassistencial (COOVIG)** da Secretaria de Estado de Desenvolvimento Social e Direitos Humanos (SEDSODH), apresenta um roteiro organizado em **4 blocos temáticos**:

| Bloco | Conteúdo |
|---|---|
| **1. Atendimento Individual e Familiar** | Fluxo de atendimento, informações do prontuário, identificação da pessoa de referência, diagnóstico socioeconômico, vulnerabilidades e proteções, metodologia de acompanhamento, ciclo de acompanhamento familiar e tipos de registro |
| **2. Atendimento Coletivo** | Registro e gerenciamento de atividades coletivas, planejamento das ações, público participante, temas e metodologias |
| **3. Encaminhamentos, Benefícios e Migração** | Encaminhamentos intersetoriais, benefícios eventuais, condições de vida, migração de prontuário entre unidades |
| **4. Painel Estatístico** | Parâmetros de consulta, indicadores de atendimento por sexo, raça/cor, faixa etária, GPTE, PBF, BPC e exportação de dados |

Inclui ainda **checklists**, resumo do que pode e não pode, base normativa, dúvidas recorrentes, problemas técnicos frequentes, capacitação e as **Regras de Ouro** do Prontuário Eletrônico.

---

## Acesso

O Guia está publicado em:

👉 **[guia-prontuario.sedsodh.org](https://guia-prontuario.sedsodh.org/)**

---

## Tecnologia

| Camada | Stack |
|---|---|
| Framework | [Astro 6](https://astro.build) (SSG) |
| Componentes interativos | [React 19](https://react.dev) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com) |
| Busca textual | [Pagefind](https://pagefind.app) |
| Hospedagem | VPS (Deploy via SSH) |

---

## Executar localmente

```bash
# Clonar o repositório
git clone https://github.com/JCGoulart/guia-prontuario-suas.git
cd guia-prontuario-suas

# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Contribuir

Sugestões e correções são bem-vindas. Este é um projeto mantido pela COOVIG/SEDSODH com equipe reduzida — contribuições externas serão analisadas conforme disponibilidade.

1. Abra uma **issue** descrevendo a sugestão ou problema encontrado
2. Para alterações de conteúdo técnico, aguarde a revisão da equipe da COOVIG
3. Pull requests são bem-vindos, especialmente para correções de código e acessibilidade

---

## Licença

Este Guia está licenciado sob a **[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](./LICENSE)**.

**Você pode:**
- Compartilhar e adaptar o material para qualquer fim
- Usar, citar e distribuir livremente

**Desde que:**
- Atribua o crédito à SEDSODH/COOVIG
- Mantenha a mesma licença em obras derivadas

---

## Expediente

**Governo do Estado do Rio de Janeiro**  
Secretaria de Estado de Desenvolvimento Social e Direitos Humanos (SEDSODH)  
Coordenação Estadual de Vigilância Socioassistencial (COOVIG)

**Secretário:** Anderson Coelho  
**Subsecretário de Gestão do SUAS:** Felippe de Souza Rodrigues  
**Superintendente de Gestão do SUAS:** Adriana Alves Pinto de Castro  
**Coordenador de Vigilância Socioassistencial:** Matheus Lopes

**Equipe responsável pelo Manual:** Matheus Lopes (coordenação), Junier Goulart, Matheus de Freitas
