# SubseçãoPRO — Fluxo e Arquitetura do Projeto

> Documento de referência para continuidade de implementação.  
> Gerado em: 29/05/2026 — Versão do projeto: v1.0

---

## 1. Visão Geral

**SubseçãoPRO** é uma Progressive Web App (PWA) mobile-first desenvolvida como plataforma digital da subseção da OAB (Ordem dos Advogados do Brasil), direcionada inicialmente à subseção de Cidade Exemplo/SP. O app serve dois públicos distintos com navegação e funcionalidades diferentes:

| Perfil | Acesso | Funcionalidades |
|---|---|---|
| **Público geral** | Sem login | Feed institucional, busca de advogados, IA de triagem, serviços |
| **Advogado inscrito** | Login com OAB + senha | Todas do público + salas, reservas, clube de benefícios, perfil |

O design imita um smartphone dentro de uma tela desktop (moldura de celular com `sm:border-[10px] sm:border-slate-900`), tornando a experiência de demonstração imersiva.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Runtime/Framework | TanStack Start (SSR sobre Vite + Nitro) | ^1.167 |
| Roteamento | TanStack Router (file-based) | ^1.168 |
| Gerenciamento de estado remoto | TanStack Query | ^5.83 |
| UI base | React 19 | ^19.2 |
| Componentes | Radix UI + shadcn/ui | variadas |
| Estilos | Tailwind CSS v4 | ^4.2 |
| Bundler | Vite 7 | ^7.3 |
| Server adapter | Nitro (Cloudflare Workers como alvo padrão) | 3.0 beta |
| Linguagem | TypeScript | ^5.8 |
| Package manager | Bun | — |
| Ícones | Lucide React | ^0.575 |
| Formulários | React Hook Form + Zod | ^7 / ^3.24 |
| Notificações toast | Sonner | ^2 |
| Hospedagem | Lovable.dev (com Vite config customizado) | — |

---

## 3. Estrutura de Diretórios

```
subse-opro/
├── src/
│   ├── assets/              # Logos (dark/light)
│   ├── components/
│   │   ├── layout/
│   │   │   └── MobileShell.tsx    # Shell principal: header, nav, login dialog
│   │   ├── ui/                    # Componentes shadcn/ui (não editar diretamente)
│   │   ├── ElectionBrowser.tsx    # Modal de votação eleitoral
│   │   └── Logo.tsx               # Componente de logo SVG
│   ├── hooks/
│   │   └── use-mobile.tsx         # Hook de detecção de viewport mobile
│   ├── lib/
│   │   ├── mockData.ts            # FONTE DE DADOS ATUAL (ver seção 5)
│   │   ├── mode.tsx               # Context de autenticação e modo (público/advogado)
│   │   ├── theme.tsx              # Context de tema (light/dark/system)
│   │   ├── config.server.ts       # Configurações server-only (nunca vai ao browser)
│   │   ├── utils.ts               # Utilitário cn() para classes condicionais
│   │   ├── error-capture.ts       # Captura de erros client-side
│   │   └── error-page.ts          # Página de erro SSR
│   ├── routes/                    # Rotas file-based (ver seção 4)
│   │   ├── __root.tsx             # Shell HTML, providers globais
│   │   ├── index.tsx              # Home (/)
│   │   ├── lawyers/
│   │   │   ├── index.tsx          # Lista de advogados (/lawyers)
│   │   │   └── $id.tsx            # Perfil de advogado (/lawyers/:id)
│   │   ├── rooms/
│   │   │   ├── index.tsx          # Lista de salas (/rooms)
│   │   │   └── $id.tsx            # Detalhe/reserva de sala (/rooms/:id)
│   │   ├── club/
│   │   │   ├── index.tsx          # Clube de benefícios (/club)
│   │   │   └── $id.tsx            # Detalhe do parceiro (/club/:id)
│   │   ├── services/
│   │   │   ├── index.tsx          # Lista de serviços (/services)
│   │   │   └── $slug.tsx          # Serviço específico (/services/:slug)
│   │   ├── ai.tsx                 # IA de triagem jurídica (/ai)
│   │   ├── about.tsx              # Sobre a subseção (/about)
│   │   ├── profile.tsx            # Perfil do advogado logado (/profile)
│   │   ├── reservations.tsx       # Minhas reservas (/reservations)
│   │   ├── configuracoes.tsx      # Configurações do app (/configuracoes)
│   │   ├── privacidade.tsx        # Política de privacidade (/privacidade)
│   │   ├── termos.tsx             # Termos de uso (/termos)
│   │   └── README.md              # Convenções de rotas
│   ├── routeTree.gen.ts           # Auto-gerado pelo TanStack Router — NÃO EDITAR
│   ├── router.tsx                 # Instância do router + QueryClient
│   ├── server.ts                  # Entry point SSR (wrapper de erro)
│   ├── start.ts                   # Entry point cliente
│   └── styles.css                 # Estilos globais Tailwind
├── docs/                          # Documentação do projeto (esta pasta)
├── vite.config.ts                 # Config via @lovable.dev/vite-tanstack-config
├── package.json
├── tsconfig.json
└── components.json                # Config shadcn/ui
```

---

## 4. Sistema de Roteamento

O projeto usa **TanStack Router com roteamento baseado em arquivos**. O arquivo `routeTree.gen.ts` é **auto-gerado** pelo plugin Vite — nunca editar manualmente.

### Convenções de nomenclatura

| Padrão de arquivo | URL gerada | Tipo |
|---|---|---|
| `index.tsx` | `/` | Rota raiz |
| `about.tsx` | `/about` | Rota estática |
| `lawyers/index.tsx` | `/lawyers` | Índice de segmento |
| `lawyers/$id.tsx` | `/lawyers/:id` | Rota dinâmica |
| `services/$slug.tsx` | `/services/:slug` | Rota dinâmica |
| `__root.tsx` | (todas) | Shell/layout raiz |

### Mapa completo de rotas

```
/                       → index.tsx              (Home — feed, banners, atalhos)
/lawyers                → lawyers/index.tsx      (Busca de advogados)
/lawyers/:id            → lawyers/$id.tsx        (Perfil individual)
/rooms                  → rooms/index.tsx        (Lista de salas) [lawyer only]
/rooms/:id              → rooms/$id.tsx          (Detalhe + reserva de sala)
/reservations           → reservations.tsx       (Minhas reservas) [lawyer only]
/club                   → club/index.tsx         (Clube de benefícios) [lawyer only]
/club/:id               → club/$id.tsx           (Detalhe do parceiro)
/ai                     → ai.tsx                 (IA de triagem jurídica)
/services               → services/index.tsx     (Serviços da subseção)
/services/:slug         → services/$slug.tsx     (Serviço específico)
/about                  → about.tsx              (Sobre a subseção)
/profile                → profile.tsx            (Perfil do advogado logado)
/configuracoes          → configuracoes.tsx      (Configurações do app)
/privacidade            → privacidade.tsx        (Política de privacidade)
/termos                 → termos.tsx             (Termos de uso)
```

---

## 5. Camada de Dados

### 5.1 Estado atual: Mock Data

Toda a persistência de dados é atualmente **estática e em memória**, localizada em [`src/lib/mockData.ts`](../src/lib/mockData.ts). Não há banco de dados, API externa ou backend conectado.

### 5.2 Entidades e tipos definidos

```typescript
// Advogado inscrito na subseção
Lawyer {
  id, name, oab, city, specialties[], bio,
  rating, online, whatsapp, email,
  address, availability, color, initials, photo
}

// Sala da subseção disponível para reserva
Room {
  id, name, description, features[],
  capacity, pricePerHour, free,
  status: "available" | "occupied" | "request",
  color
}

// Post do feed institucional
Post {
  id, date, image, photo, caption, likes
}

// Banner do carrossel na home
Banner {
  id, title, subtitle, cta, color, photo, to, params?
}

// Parceiro do Clube SubseçãoPRO
Partner {
  id, name,
  category: "Saúde" | "Educação" | "Alimentação" | "Tecnologia" | "Serviços",
  discount, description, validity, color
}

// Notificação do sino no header
Notification {
  id, icon, text, date, forLawyer?, href
}

// Reserva de sala
Reservation {
  id, roomName, date, time,
  status: "confirmed" | "cancelled" | "pending",
  amount
}
```

### 5.3 Dados mockados disponíveis

| Variável exportada | Conteúdo |
|---|---|
| `lawyers[]` | 8 advogados com especialidades variadas |
| `rooms[]` | 5 salas (reunião, audiência, coworking, vídeo, auditório) |
| `posts[]` | 6 posts do feed institucional |
| `banners[]` | 3 banners do carrossel da home |
| `partners[]` | 10 parceiros em 5 categorias |
| `notifications[]` | 3 notificações (1 exclusiva para advogado) |
| `currentLawyer` | Objeto com dados do advogado logado (Dr. Thiago — demo) |
| `myReservations[]` | 4 reservas do advogado logado |
| `transactions[]` | Subset das reservas com valor > 0 |
| `articles[]` | 6 artigos jurídicos (slug, título, ícone, resumo) |

### 5.4 Plano de migração para backend real

Quando o backend for conectado, os pontos de substituição são:

1. **`mockData.ts`** → substituir exports estáticos por funções que chamam API  
2. **`mode.tsx` → função `login()`** → substituir simulação por chamada real de autenticação (JWT/OAuth)  
3. **`lib/api/`** → pasta existente com placeholder `example.functions.ts` — ponto designado para server functions do TanStack Start  
4. **`config.server.ts`** → adicionar variáveis de ambiente reais (`DATABASE_URL`, tokens de API)

---

## 6. Sistema de Autenticação e Modo Dual

### 6.1 Contexto `ModeContext` (`src/lib/mode.tsx`)

Gerencia dois estados críticos simultaneamente:

```
mode: "public" | "lawyer"    → define qual navegação e conteúdo exibir
isAuthenticated: boolean     → controla acesso a funcionalidades protegidas
user: Lawyer | null          → dados do advogado logado (currentLawyer no mock)
```

**Fluxo de login atual (mock):**
```
Usuário clica "Entrar" no header
  → LoginDialog abre (em MobileShell.tsx)
  → Usuário informa número OAB + senha (min. 4 chars cada)
  → login() simula delay de 650ms
  → Qualquer OAB válido (≥4 dígitos) + senha ≥4 chars → autentica
  → mode vira "lawyer", isAuthenticated = true
  → user recebe objeto currentLawyer (Dr. Thiago Barbosa Reis)
  → Toast "Bem-vindo, Dr. Thiago!"
  → Navegação inferior muda de publicTabs → lawyerTabs
```

**Conta demo hardcoded:** OAB `378901` + senha `demo123` (botão de atalho no dialog)

### 6.2 Navegação dual por modo

```typescript
// Modo público (visitante)
publicTabs = [ Home, Advogados(/lawyers), IA(/ai), Serviços(/services), Sobre(/about) ]

// Modo advogado (logado)
lawyerTabs = [ Home, Salas(/rooms), Busca(/lawyers), Clube(/club), Perfil(/profile) ]
```

### 6.3 Filtragem de notificações por modo

Notificações marcadas com `forLawyer: true` só aparecem quando `mode === "lawyer"`.

---

## 7. Layout e Shell Principal

### 7.1 Hierarquia de componentes

```
RootShell (<html>)
  └── RootComponent
        ├── QueryClientProvider
        ├── ThemeProvider
        ├── ModeProvider
        └── MobileShell
              ├── AppHeader (sticky top)
              │     ├── Logo + nome da subseção
              │     ├── Botão de notificações (Sheet lateral)
              │     └── Botão login / Avatar do advogado (Popover)
              ├── <main> (com key={pathname} para animação fade-in)
              │     └── <Outlet /> → página atual renderiza aqui
              ├── <nav> (fixed bottom)
              │     └── Tabs de navegação (muda por modo)
              └── LoginDialog (Dialog controlado por estado)
```

### 7.2 Tema (`src/lib/theme.tsx`)

- Suporta `light`, `dark` e `system`
- Persiste em `localStorage` com chave `"oab-theme"`
- Aplica classe `dark` no `<html>` + `colorScheme` CSS
- Escuta `prefers-color-scheme` media query para modo sistema

---

## 8. Funcionalidades por Tela

### 8.1 Home (`/`)
- Carrossel de banners com auto-rotação a cada 4,5s (pausa em hover/touch)
- Atalhos rápidos: 4 botões contextuais por modo
- Feed institucional com posts (curtir, salvar, compartilhar via Web Share API)
- Post destacado de eleições com modal de votação (`ElectionBrowser`)
- Saudação personalizada por modo/usuário

### 8.2 Advogados (`/lawyers`, `/lawyers/:id`)
- Busca em tempo real por nome, especialidade ou bairro
- Filtros por: Área de atuação, Modalidade (presencial/online), Bairro
- Contagem de filtros ativos com botão de limpar
- Cards com foto, especialidades, bio, disponibilidade
- Ações: WhatsApp direto e ver perfil completo

### 8.3 Salas (`/rooms`, `/rooms/:id`) — somente advogado
- Lista de salas com status visual (disponível/ocupada/sob solicitação)
- Informações: capacidade, recursos, preço por hora
- Salas gratuitas sinalizadas (Coworking)
- Sala de auditório exige solicitação via secretaria (sem reserva online)

### 8.4 Reservas (`/reservations`) — somente advogado
- Lista de reservas com status (confirmada/pendente/cancelada)
- Cancelamento com confirmação nativa (`confirm()`)
- Valor exibido (ou "Gratuito")

### 8.5 Clube de Benefícios (`/club`, `/club/:id`) — somente advogado
- Grid de parceiros filtráveis por categoria
- 10 parceiros em 5 categorias: Saúde, Educação, Alimentação, Tecnologia, Serviços
- Banners da home linkam para parceiros específicos

### 8.6 IA Jurídica (`/ai`)
- Interface de chat simulando triagem jurídica
- Conversa inicial pré-preenchida como exemplo (demissão trabalhista)
- Ao identificar área, exibe cards de advogados especializados
- Disclaimer claro: "não substitui advogado"
- Respostas subsequentes são placeholders (integração real pendente)

### 8.7 Perfil (`/profile`) — somente advogado
- 4 sub-views: menu principal, editar perfil, histórico financeiro, notificações
- Upload de foto via `FileReader` (client-side, não persiste)
- Seleção de áreas de atuação e forma de atendimento
- Toggle de visibilidade pública
- Histórico financeiro com total do mês calculado

### 8.8 Eleições (`ElectionBrowser`)
- Modal com simulação de browser embutido (barra de endereço, loading bar)
- 3 chapas candidatas com fluxo: selecionar → confirmar → registrado
- Gera protocolo aleatório ao confirmar
- Estado `voted` persiste apenas na sessão (React state)

---

## 9. Fluxo de Dados — Diagrama

```
┌─────────────────────────────────────────────────────────┐
│                     mockData.ts                         │
│  lawyers[] rooms[] posts[] banners[] partners[]         │
│  notifications[] myReservations[] currentLawyer         │
└──────────────────────────┬──────────────────────────────┘
                           │ import direto (sem API)
              ┌────────────▼─────────────┐
              │       Rotas/Telas        │
              │  (src/routes/*.tsx)      │
              │                          │
              │  Leitura: direto         │
              │  Escrita: useState local │
              │  (não persiste)          │
              └────────────┬─────────────┘
                           │
              ┌────────────▼─────────────┐
              │   ModeContext            │
              │   mode / isAuth / user   │
              │   login() / logout()     │
              └────────────┬─────────────┘
                           │
              ┌────────────▼─────────────┐
              │   ThemeContext           │
              │   theme → localStorage  │
              └──────────────────────────┘
```

**Importante:** toda mutação de dados (curtir post, salvar, cancelar reserva, editar perfil, votar) existe apenas em `useState` local do componente. Ao navegar para outra tela ou recarregar, o estado é perdido. Isso é intencional na fase de protótipo — a integração com backend substituirá cada ponto.

---

## 10. Convenções de Código

### 10.1 Importações com alias
O alias `@/` mapeia para `src/`. Configurado via `vite-tsconfig-paths`.
```typescript
import { useMode } from "@/lib/mode";
import { Button } from "@/components/ui/button";
```

### 10.2 Classes condicionais
Sempre usar `cn()` de `@/lib/utils` (wrapper de `clsx` + `tailwind-merge`):
```typescript
cn("base-class", condition && "conditional-class", variant === "x" && "x-class")
```

### 10.3 Componentes shadcn/ui
Todos os componentes de UI base estão em `src/components/ui/`. São baseados em Radix UI. Não editar diretamente — regenerar via CLI shadcn se necessário.

### 10.4 Rotas com parâmetros
```typescript
// Definição
export const Route = createFileRoute("/lawyers/$id")({ component: LawyerDetail });

// Leitura do parâmetro
const { id } = Route.useParams();

// Link tipado
<Link to="/lawyers/$id" params={{ id: lawyer.id }}>
```

### 10.5 Server functions
Funções server-side devem usar o padrão do TanStack Start:
```typescript
// src/lib/api/example.functions.ts
import { createServerFn } from "@tanstack/react-start";
export const fetchData = createServerFn().handler(async () => { ... });
```

---

## 11. Variáveis de Ambiente

| Variável | Onde usar | Finalidade |
|---|---|---|
| `VITE_*` | Client + Server | Config pública (analytics, URLs públicas) |
| `process.env.*` | Apenas `.server.ts` | Secrets, DB, APIs privadas |
| `NODE_ENV` | `config.server.ts` | Detecção de ambiente |

Arquivo `.env` não está commitado. Criar `.env.local` para desenvolvimento.

---

## 12. Deploy e Build

- **Plataforma:** Lovable.dev com Vite config customizado (`@lovable.dev/vite-tanstack-config`)
- **Server adapter:** Nitro com target Cloudflare Workers (padrão)
- **Build:** `bun run build`
- **Dev:** `bun run dev`
- **Preview:** `bun run preview`

O arquivo `src/server.ts` é o entry point SSR — contém wrapper de erro para o servidor Nitro. `src/start.ts` é o entry point cliente.

---

## 13. Próximos Passos de Implementação

A seguir, as principais lacunas identificadas para transformar o protótipo em produto funcional:

### Prioridade Alta
1. **Backend/API real** — substituir `mockData.ts` por endpoints (REST ou tRPC via server functions)
2. **Autenticação real** — integrar `login()` em `mode.tsx` com sistema OAB (JWT, OAuth ou SSO)
3. **Persistência de reservas** — fluxo completo em `/rooms/$id.tsx` com seleção de data/hora e pagamento
4. **Banco de dados** — definir schema para: Lawyers, Rooms, Reservations, Partners, Posts

### Prioridade Média
5. **IA Jurídica real** — conectar `/ai` à API da Anthropic/OpenAI com system prompt jurídico
6. **Sistema de votação** — `ElectionBrowser` com backend de votos auditável e validação por OAB
7. **Upload de foto real** — integrar storage (S3, Cloudflare R2) para foto de perfil
8. **Notificações push** — implementar Web Push API com service worker

### Prioridade Baixa
9. **Mapa real** — substituir mapa placeholder em `/about` por Google Maps ou Leaflet
10. **Compartilhamento** — Web Share API já implementada, adicionar URL canônica dos posts
11. **PWA completo** — adicionar `manifest.json` e service worker para instalação

---

## 14. Pontos de Atenção para o Próximo Arquiteto

- **`routeTree.gen.ts` nunca deve ser editado manualmente** — é regenerado automaticamente pelo plugin Vite ao salvar qualquer arquivo em `src/routes/`
- **`vite.config.ts` usa wrapper Lovable** — não adicionar plugins que já estão inclusos (listados no comentário do arquivo): `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`
- **Modo "advogado" é apenas estado React** — não há sessão persistida em cookie/localStorage. Recarregar a página desloga o usuário. Isso precisa ser corrigido na integração com backend real
- **`config.server.ts` com sufixo `.server.ts`** — o Vite impede que este arquivo seja enviado ao bundle do cliente. Qualquer novo arquivo com segredos deve seguir esse padrão de nomenclatura
- **Tailwind v4** — usa sintaxe diferente do v3. CSS utilities são importadas via `@import "tailwindcss"` em vez de `@tailwind base/components/utilities`. Verificar compatibilidade ao adicionar plugins
- **React 19** — projeto usa a versão mais recente do React. Alguns pacotes do ecossistema podem ainda não ser compatíveis — verificar `peerDependencies` antes de adicionar dependências
