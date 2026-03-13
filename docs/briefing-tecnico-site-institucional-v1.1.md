# ARVOR INSURANCE

## Corredora Sustentável

**Briefing Técnico — Desenvolvimento do Site Institucional com Autoatendimento**

**Documento de uso interno**  
**Versão 1.1 — Março 2026**

> Esta versão registra o briefing revisado enviado em 13 de março de 2026 e passa a ser a referência mais recente para conteúdo e arquitetura do projeto.

---

## 1. Visão Geral do Projeto

A Arvor Insurance é uma corretora especializada em planos de saúde empresarial e seguro de vida, com um diferencial de propósito: parte dos resultados da corretora é direcionada a iniciativas socioambientais, reforçando o conceito de **Corredora Sustentável**.

| Item             | Detalhe                                             |
| ---------------- | --------------------------------------------------- |
| Nome comercial   | Arvor Insurance                                     |
| Conceito         | Corredora Sustentável                               |
| Segmentos        | Plano de Saúde Empresarial · Seguro de Vida         |
| Projeto          | Parte do FCF será doado para ONGs                   |
| Abrangência      | Nacional                                            |
| Modalidades      | PF (Pessoa Física) · Coletivo por Adesão · PJ · MEI |
| Contato cotações | dimitricontro@arvorin.com.br                        |

---

## 2. Identidade Visual

### 2.1 Símbolo e Conceito

O símbolo da marca é uma árvore minimalista, que reforça os conceitos de crescimento, proteção, estabilidade e longevidade, valores diretamente associados ao seguro de vida e aos planos de saúde.

### 2.2 Paleta de Cores

Usar exclusivamente as cores abaixo. Não utilizar cores fora desta paleta.

| Hex       | Uso sugerido                                              |
| --------- | --------------------------------------------------------- |
| `#2f3c4c` | Azul escuro — cor primária, textos, fundos institucionais |
| `#8fa286` | Verde — cor secundária, botões, acentos sustentáveis      |
| `#ae905e` | Dourado — destaques premium, ícones, bordas               |
| `#c5874a` | Laranja — chamadas de ação secundárias, badges            |
| `#e5ddc9` | Bege — fundos suaves, cards, seções alternadas            |

### 2.3 Tipografia

As fontes são parte central da identidade. Devem ser carregadas via Google Fonts ou Fontshare. Se Sansation não estiver disponível no Google Fonts, usar Raleway como fallback para títulos.

| Aplicação         | Fonte oficial | Fallback          |
| ----------------- | ------------- | ----------------- |
| Títulos (H1-H3)   | Sansation     | Raleway           |
| Corpo, labels, UI | Montserrat    | Inter / Open Sans |

### 2.4 Direção Estética

- Linha sofisticada, minimalista, confiável e institucional.
- Forte associação à segurança, propósito e sustentabilidade.
- Evitar distorção do logo e alteração indevida de proporções.
- Não usar cores fora da paleta oficial.
- Não usar combinações que comprometam a legibilidade.

---

## 3. Arquitetura do Site

O site será uma **single-page application (SPA)** ou experiência multi-seção com scroll suave, composto pelas seções abaixo na ordem indicada:

| #   | Seção                  | Conteúdo / Função                                                                   |
| --- | ---------------------- | ----------------------------------------------------------------------------------- |
| 1   | Header / Navbar        | Logo Arvor + navegação por âncoras + botão CTA `Falar com Especialista`             |
| 2   | Hero                   | Headline principal + subheadline + 2 CTAs: `Cotar agora` e `Falar com especialista` |
| 3   | Sobre a Arvor          | Missão, proposta de valor, diferenciais da corretora                                |
| 4   | Projeto Sustentável    | Propósito socioambiental, parte do FCF doado a ONGs                                 |
| 5   | Produtos               | Cards: Plano de Saúde Empresarial · Coletivo por Adesão · Individual                |
| 6   | Como funciona          | Passo a passo visual: Cotar → Escolher → Contratar                                  |
| 7   | Autoatendimento        | Fluxo de cotação em 3 steps                                                         |
| 8   | Falar com Especialista | CTA para WhatsApp / integração Arvor (consulta personalizada)                       |
| 9   | Footer                 | Links, e-mail de contato, redes sociais, aviso legal                                |

---

## 4. Fluxo de Autoatendimento (Cotação)

O autoatendimento será um componente de cotação em **3 etapas (stepper)**, inspirado no modelo ClickPlanos. O usuário preenche os dados de forma autônoma. Ao finalizar, os dados são enviados por e-mail para a corretora, que retorna com a proposta.

### Step 1 — Sobre Você

- Campo: Nome completo (obrigatório)
- Campo: Telefone com máscara `(XX) XXXXX-XXXX` (obrigatório)
- Campo: E-mail (obrigatório, com validação de formato)
- Checkbox: `Declaro que li e concordo com os Termos de Uso e a Política de Dados da Arvor Insurance` (obrigatório para avançar)
- Botão: `Avançar` → Step 2

### Step 2 — Sobre o Plano

- Dropdown: Estado (lista completa de UFs)
- Dropdown: Região (carrega dinamicamente com base no estado selecionado)
- Seleção de Modalidade (radio cards visuais):
  - Pessoa Física — Ideal para você e sua família. (Mínimo 1 pessoa)
  - Coletivo por Adesão — Planos via associação/diploma. (Mínimo 1 pessoa)
  - Pessoa Jurídica (PJ) — Ideal para sua empresa com CNPJ ativo. (Mínimo 1 pessoa)
  - MEI — Para Microempreendedores Individuais com CNPJ ativo há mais de 6 meses. (Mínimo 1 pessoa)
- Botão: `Avançar` → Step 3

### Step 3 — Contratação / Envio de Documentos

- Exibir resumo das seleções do Step 1 e do Step 2
- Exibir lista de documentos necessários conforme a modalidade selecionada

#### Pessoa Física / Coletivo por Adesão

- RG, CPF ou CNH
- E-mail
- Telefone
- Comprovante de endereço
- Selfie com documento
- Diploma acadêmico (obrigatório para coletivo por adesão)

#### Pessoa Jurídica / MEI

- Contrato social
- RG, CPF ou CNH
- E-mail
- Telefone
- Comprovante de endereço

#### Mensagens e Ações

- Mensagem final: `Envie os documentos listados para: dimitricontro@arvorin.com.br`
- Subtexto: `Nossa equipe entrará em contato em até 24h úteis.`
- Botão primário: `Enviar por E-mail` (abre cliente de e-mail com template pré-preenchido)
- Botão secundário: `Copiar e-mail`
- Botão alternativo: `Falar com especialista` (redireciona para WhatsApp)

> Atenção: planos coletivos por adesão exigem vínculo com uma associação, na maioria dos casos via diploma acadêmico. Verificar caso a caso.

---

## 5. Funcionalidade: Falar com Especialista

Paralela ao autoatendimento, esta opção direciona o usuário a um atendimento consultivo personalizado. É indicada para empresas, casos complexos e clientes que preferem orientação humana.

- CTA presente no Header (fixo), Hero e ao final do fluxo de autoatendimento.
- Ao clicar: redirecionar para WhatsApp com mensagem pré-preenchida.
- Mensagem sugerida: `Olá! Gostaria de falar com um especialista da Arvor Insurance sobre planos de saúde.`
- Integração com API da Arvor conforme link/endpoint fornecido pela equipe.
- O botão deve ser visualmente diferenciado do CTA de autoatendimento.

---

## 6. Regras Técnicas de Desenvolvimento

### 6.1 Stack recomendada

- Framework: React (Next.js) ou HTML/CSS/JS puro
- Estilização: Tailwind CSS ou CSS Modules
- Fontes: Google Fonts (Montserrat) + Fontshare ou CDN para Sansation
- Deploy: Vercel, Netlify ou servidor próprio

### 6.2 Comportamento do Stepper

- Navegação linear: o usuário só avança se todos os campos obrigatórios do step atual estiverem válidos
- É possível voltar ao step anterior sem perder os dados já preenchidos
- Barra de progresso visual no topo, semelhante ao ClickPlanos
- Step concluído exibe ícone de check na barra de progresso
- Em mobile: stepper responsivo ocupando 100% da largura

### 6.3 Validações obrigatórias

- Nome: mínimo de 2 palavras
- Telefone: máscara e validação de 10 a 11 dígitos
- E-mail: formato válido (regex padrão)
- Checkbox de termos: obrigatório para prosseguir ao Step 2
- Estado e Região: obrigatórios no Step 2
- Modalidade: pelo menos uma opção selecionada

### 6.4 E-mail automático (Step 3)

Ao clicar em `Enviar por E-mail`, abrir cliente de e-mail com:

- Para: `dimitricontro@arvorin.com.br`
- Assunto: `[Cotação Arvor] {modalidade} — {estado} — {nome}`
- Corpo: template com todos os dados preenchidos e lista de documentos necessários

### 6.5 Responsividade

- Mobile-first: design pensado primeiramente para dispositivos móveis
- Breakpoints: `375px` / `768px` / `1024px` / `1440px`
- Todos os dropdowns e campos devem ser touch-friendly

---

## 7. Sites de Referência

Os sites abaixo devem ser estudados para referência de UX/UI do cotador:

- ClickPlanos (fluxo de autoatendimento): <https://www.app.clickplanos.com.br>
- Planos de Saúde Todos Aqui: <https://www.planosdesaudetodosaqui.com.br/simulador/>
- Compare Plano de Saúde (Bradesco): <https://vendas.compareplanodesaude.com.br/bradesco-saude/>
- Amil Cuidado Certo: <https://planos.amilcuidadocerto.com.br/>
- Porto Seguro Saúde: <https://www.portoseguro.com.br/porto-seguro-saude>
- RB Planos SulAmérica: <https://rbplanosdesaude.com.br/sulamerica/>
- Qualicorp SulAmérica: <https://escolha.qualicorp.com.br/sulamerica/>

### Pontos de referência

- Stepper de 3 etapas com barra de progresso
- Dropdowns de Estado e Região com carregamento dinâmico
- Radio cards visuais para seleção de modalidade
- Layout clean, fundo claro, tipografia sans-serif
- CTAs com alto contraste e hierarquia clara

---

## 8. Missão, Proposta de Valor e Propósito

### 8.1 Missão

Estruturar soluções em saúde e benefícios para empresas e famílias, com atendimento consultivo, próximo e responsável, promovendo segurança, bem-estar, confiança e impacto positivo na vida das pessoas.

### 8.2 Proposta de Valor

A Arvor Insurance apoia empresas na construção de benefícios de saúde com foco em:

- Retenção de talentos
- Aumento de produtividade
- Redução de absenteísmo e presenteísmo

Também atende famílias com soluções compatíveis em rede, atendimento e custo-benefício.

### 8.3 Propósito Socioambiental

Transformar parte dos resultados da corretora em apoio a iniciativas socioambientais.

Este propósito deve estar visível e bem comunicado no site, pois é um diferencial competitivo e reforça a identidade da marca.
