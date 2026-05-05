# ARVOR INSURANCE

## Corretora Sustentável

**Briefing Técnico — Site Institucional com Autoatendimento**

**Documento de uso interno**
**Versão 2.0 — Março 2026**

---

## 1. Visão Geral

| Item           | Detalhe                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| Nome comercial | Arvor Insurance                                                              |
| Conceito       | Primeira Corretora Sustentável do Brasil                                     |
| CNPJ           | 65.597.264/0001-10                                                           |
| Segmentos      | Plano de Saúde Empresarial · Coletivo por Adesão · Plano de Saúde Individual |
| Abrangência    | Nacional                                                                     |
| Contato        | dimitricontro@arvorin.com.br · (11) 91489-2878                               |
| URL            | https://www.arvorin.com.br                                                   |

---

## 2. Stack Técnica

| Item        | Tecnologia                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router)            |
| Linguagem   | TypeScript + React 19              |
| Estilização | Tailwind CSS v4 (CSS-first config) |
| Fontes      | Montserrat + Raleway (next/font)   |
| Deploy      | Vercel                             |
| Formulários | React Hook Form + Zod              |
| Integração  | Google Sheets via Apps Script      |

---

## 3. Paleta de Cores

| Hex       | Uso                                              |
| --------- | ------------------------------------------------ |
| `#2f3c4c` | Azul escuro — primária, textos, fundos           |
| `#8fa286` | Verde — secundária, botões, acentos sustentáveis |
| `#ae905e` | Dourado — destaques premium, badges, bordas      |
| `#c5874a` | Laranja — erros, alertas                         |
| `#e5ddc9` | Bege — fundos suaves, cards                      |

---

## 4. Estrutura de Seções

| #   | Seção                  | Descrição                                                        |
| --- | ---------------------- | ---------------------------------------------------------------- |
| 1   | Header / Navbar        | Logo tipografia + nav por âncoras + CTA "Falar com Especialista" |
| 2   | Hero                   | Imagem full-bleed + badge ECO + headline + CTAs                  |
| 3   | Sobre a Arvor          | Cards Missão / Visão / Valores                                   |
| 4   | Projeto Sustentável    | Propósito socioambiental e FCF                                   |
| 5   | Produtos               | Cards: Empresarial · Coletivo por Adesão · Individual            |
| 6   | Como funciona          | Passo a passo: Cotar → Escolher → Contratar                      |
| 7   | Autoatendimento        | Stepper de cotação em 3 etapas                                   |
| 8   | Falar com Especialista | CTA para WhatsApp                                                |
| 9   | Footer                 | E-mail, WhatsApp, Instagram, LinkedIn, CNPJ                      |

---

## 5. Fluxo de Autoatendimento (Stepper)

### Step 1 — Sobre Você

- Nome completo (mínimo 2 palavras)
- Telefone com máscara `(XX) XXXXX-XXXX`
- E-mail com validação de formato
- Checkbox de aceite dos Termos de Uso

### Step 2 — Sobre o Plano

- **Quantidade de pessoas:** contador + / − (mínimo 1)
- **Idade de cada pessoa:** campos dinâmicos por pessoa (0–110 anos)
- **Modalidade:** radio cards visuais
  - Pessoa Física
  - Coletivo por Adesão
  - Pessoa Jurídica (PJ)
  - MEI

### Step 3 — Solicitar Cotação

- Resumo dos dados preenchidos
- Aviso: "Nossa equipe entrará em contato via WhatsApp em até 24h úteis."
- Botão: `Solicitar cotação` → envia para Google Sheets
- Tela de sucesso com CTA para WhatsApp e link "Fazer nova cotação"

---

## 6. Integrações

### Google Sheets

- Webhook via Google Apps Script
- Variável de ambiente: `GOOGLE_SHEETS_WEBHOOK_URL`
- GCP Project: `conversia-483618` (number: `395487330744`)
- OAuth client: `arvor-leads`
- Campos registrados: `createdAt`, `name`, `phone`, `email`, `modality`, `personCount`, `ages`, `source`

### WhatsApp

- Variável: `NEXT_PUBLIC_WHATSAPP_PHONE=5511914892878`
- Mensagem pré-preenchida: `Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.`

### Redes Sociais

- Instagram: `NEXT_PUBLIC_INSTAGRAM_URL`
- LinkedIn: `https://www.linkedin.com/company/arvor-in/`

---

## 7. Variáveis de Ambiente

| Variável                     | Onde usar | Descrição                       |
| ---------------------------- | --------- | ------------------------------- |
| `GOOGLE_SHEETS_WEBHOOK_URL`  | Vercel    | URL do web app do Apps Script   |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Vercel    | Número WhatsApp com DDI (55...) |
| `NEXT_PUBLIC_CONTACT_EMAIL`  | Vercel    | E-mail de contato               |
| `NEXT_PUBLIC_INSTAGRAM_URL`  | Vercel    | URL do Instagram                |
| `NEXT_PUBLIC_LINKEDIN_URL`   | Vercel    | URL do LinkedIn                 |
| `NEXT_PUBLIC_CNPJ`           | Vercel    | CNPJ formatado                  |

---

## 8. SEO

- `title`: "Arvor Insurance"
- `description`: "Corretora sustentável especializada em planos de saúde empresarial e seguro de vida."
- `canonical`: `https://www.arvorin.com.br`
- `robots`: index + follow habilitados
- `openGraph`: configurado para pt_BR
- `keywords`: plano de saúde empresarial, individual, coletivo por adesão, MEI, etc.
- **Pendente:** imagem OG (`/public/og-image.png`, 1200×630px)
