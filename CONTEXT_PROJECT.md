# LinkHub — Contexto do Projeto

## 📋 Visão Geral

LinkHub é um hub centralizador de atalhos do navegador. Funciona como uma **Extensão Chrome (Manifest V3)** que substitui a página de nova aba (`chrome_url_overrides.newtab`). Também pode ser aberto via `file://` como SPA.

**Propósito:** Servir como página inicial / nova aba do navegador com atalhos organizados, pastas, busca global, barra de pesquisa Google e persistência via `chrome.storage.local` / `localStorage`.

---

## 🗂️ Estrutura de Arquivos

```
linkhub/
├── index.html                    # Entry point (new tab page)
├── manifest.json                 # Chrome Extension Manifest V3
├── background.js                 # Service worker (abre index.html ao clicar no ícone)
├── CONTEXT_PROJECT.md            # Este arquivo
├── README.md                     # Documentação do usuário
├── abrir-linkhub.bat             # Atalho para abrir index.html no Windows
│
├── assets/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png              # Ícones da extensão
│
├── css/
│   ├── variables.css             # Design tokens (tema ObsidianFlux Purple)
│   ├── base.css                  # Reset, tipografia, glass-panel, squircle, bg-blobs
│   ├── layout.css                # Sidebar, header, content grid, edit header
│   ├── components.css            # Shortcut grid, folder cards, widgets, FAB, forms, context menu, web search
│   ├── modals.css                # Overlays, animações de modais, folder view
│   └── edit-mode.css             # Wiggle, drag feedback, placeholder, remove btn, drop targets
│
└── js/
    ├── app.js                    # Bootstrap, orquestração, initWebSearch, parallax, folder drop
    ├── storage.js                # CRUD localStorage, schema v2, seed data, migração, export/import
    ├── render.js                 # Renderização DOM (grid, sidebar, busca cross-guide, badges)
    ├── drag.js                   # HTML5 Drag & Drop nativo para reordenação
    ├── search.js                 # Filtro em tempo real
    ├── clock.js                  # Relógio digital HH:MM
    ├── modals.js                 # Todos os modais + FAB + context menus + export/import
    └── edit-mode.js              # Modo edição (remover itens)
```

---

## 🎨 Tema Visual (ObsidianFlux Purple)

| Token | Valor | Descrição |
|-------|-------|-----------|
| `--color-background` | `#0F0F1A` | Fundo roxo escuro |
| `--color-primary` | `#d6baff` | Lavanda (acentos, glows, botões) |
| `--color-primary-container` | `#aa73ff` | Roxo vibrante (containers) |
| `--color-tertiary` | `#ffb961` | Âmbar (pastas, acentos secundários) |
| `--color-surface` | `#111125` | Superfície escura |
| `--color-surface-container` | `#1e1e32` | Container de superfície |
| `--color-error` | `#ffb4ab` | Vermelho suave (erros, remover) |
| `--font-display-lg` | `Hanken Grotesk, system-ui, sans-serif` | Títulos grandes |
| `--font-headline-lg` | `Hanken Grotesk, system-ui, sans-serif` | Headlines |
| `--font-body-lg` | `Inter, system-ui, sans-serif` | Corpo |
| `--font-label-md` | `Geist, Inter, system-ui, sans-serif` | Labels e botões |
| `--radius-squircle` | `24%` | Formato squircle para ícones |
| `--radius-modal` | `32px` | Cantos dos modais |
| `--transition-modal` | `0.4s cubic-bezier(0.16, 1, 0.3, 1)` | Curva de animação |

**Ícones:** Material Symbols Outlined via Google Fonts CDN.

**Efeitos:** Glass-panel com `backdrop-filter: blur(40px)`, neon glows primário/terciário/erro, sombras suaves.

---

## 🧠 Modelo de Dados (localStorage)

**Chave:** `linkhub-v1` (schema version 2)

```javascript
{
  version: 2,
  activeGuide: "guide_home",
  guides: {
    "guide_home": { id, name, icon, order: ["itemId1", "itemId2"] }
  },
  guideOrder: ["guide_home", "guide_work", ...],
  items: {
    "itemId1": { type: "link", name, url, icon },
    "itemId2": { type: "folder", name, color, icon, children: ["childId1"] }
  }
}
```

### Tipos de Item

| Tipo | Campos | Descrição |
|------|--------|-----------|
| `link` | `type, name, url, icon` | Atalho para URL |
| `folder` | `type, name, color, icon, children[]` | Pasta contendo links |

### Geração de IDs
- Itens: `generateId()` → `"id_" + Date.now().toString(36) + "_" + random`
- Guias: `generateGuideId()` → `"guide_" + Date.now().toString(36) + "_" + random`

### Cores de Pasta Disponíveis
`#4F46E5` (índigo), `#10B981` (esmeralda), `#F59E0B` (âmbar), `#EF4444` (vermelho), `#F97316` (laranja), `#8B5CF6` (violeta)

---

## 🔧 Módulos JavaScript

### `Storage` (storage.js)
- `load()` — Carrega do localStorage ou cria seed data (com migração v1→v2)
- `save()` — Persiste no localStorage
- `getData()` / `getItem(id)` — Acesso aos dados
- `addLink({ name, url, icon, parentId, guideId })` — Cria link
- `updateLink(id, { name, url, icon })` — Edita link
- `addFolder({ name, color, icon, parentId, guideId })` — Cria pasta
- `updateFolder(id, { name, color, icon })` — Edita pasta
- `removeItem(id)` — Remove item recursivamente
- **`exportData()`** — Exporta dados completos como JSON (com metadados `_exportedAt` e `_version`)
- **`importData(json)`** — Importa e substitui dados do JSON, validando estrutura
- `getGuides()` / `getActiveGuide()` / `setActiveGuide(id)` — Gerenciamento de guias
- `addGuide({ name, icon })` / `updateGuide(id, { name, icon })` / `removeGuide(id)` — CRUD de guias
- `reorderGuide(fromId, toId, position)` — Reordena guias na sidebar
- `getGuideOrder(guideId)` / `setGuideOrder(order, guideId)` — Ordem dos itens na guia
- `getFaviconUrl(url)` — Retorna URL do favicon via Google S2
- `normalizeUrl(url)` — Valida e normaliza URL (prefixo `https://`)
- `FOLDER_COLORS` / `GUIDE_ICONS` — Constantes expostas (6 cores, 12 ícones)

### `Render` (render.js)
- `init(gridSelector, folderGridSelector, sidebarNavSelector, searchGridSelector)` — Inicializa referências do DOM
- `renderSidebar(guides, activeGuideId, callbacks)` — Renderiza sidebar com **drag entre guias** (reordenação)
- `createShortcutElement(id, item, options)` — Cria elemento DOM para link ou pasta
- `createFolderCardElement(id, item, callbacks)` — Cria card de pasta
- `renderRootGrid({ editMode, filter, callbacks })` — Renderiza grid principal
- `renderFolderCards(callbacks)` — Renderiza cards de pasta
- **`_searchAllGuides(query)`** — Busca em **todas as guias** (não só na ativa), retorna resultados com `guideId` e `guideName`
- `renderSearchResults(query, callbacks)` — Resultados da busca com **badge do nome da guia**
- `renderFolderChildren(folderId, containerEl, callbacks)` — Itens dentro de uma pasta

### `Modals` (modals.js)
- **Shortcut Modal** (`#modal-shortcut`): Criar/editar atalho com preview de favicon
- **Folder Modal** (`#modal-folder`): Criar/editar pasta com seletor de cor
- **Folder View** (`#modal-folder-view`): Visualizar conteúdo de pasta em grid com drag
- **Guide Modal** (`#modal-guide`): Criar/editar guia com seletor de ícone
- **FAB Menu** (`#fab`): Menu flutuante (⚙️) → Novo atalho, Nova pasta, Editar painel, **Exportar dados**, **Importar dados**
- **Context Menu**: Clique direito em itens/pastas/guias/área vazia com opções editar/remover
- **`handleExport()`** — Download do JSON de backup
- **`handleImport()`** — Upload de arquivo JSON com validação + modais de sucesso/erro
- **`showGuideContextMenu(x, y, guideId, guideName)`** — Context menu de guias (editar/remover)
- **`showEmptyAreaContextMenu(x, y)`** — Context menu em área vazia (criar atalho/pasta, editar grid)

### `DragManager` (drag.js)
- `makeSortable(containerEl, { itemSelector, ignoreSelector, onReorder })` — Habilita drag-and-drop nativo
- `destroy(containerEl)` — Remove listeners
- **`_activeDragId`** — ID do item sendo arrastado (exposto para interações externas, ex: drag para pasta)

### `Search` (search.js)
- `init(inputSelector, onFilter)` — Liga input de busca ao callback de filtro
- `getQuery()` — Retorna termo atual da busca
- `clear()` — Limpa input

### `Clock` (clock.js)
- `init(selector)` — Inicia relógio HH:MM com atualização a cada 1s

### `EditMode` (edit-mode.js)
- `removeItem(id)` — Remove item com animação (e fallback sem animação)

### `App` (app.js)
- `init()` — Bootstrap: carrega Storage, inicia Render/Clock/Modals/Search/Drag, configura eventos, **parallax**, **folder drop**
- `refresh(filter?)` — Re-renderiza grid, pastas ou resultados de busca
- `enterEditMode()` / `exitEditMode()` — Alterna modo edição (wiggle, drag, remove)
- `switchGuide(guideId)` — Troca de guia ativa
- `renderSidebar()` — Re-renderiza sidebar
- `initWebSearch()` — Inicializa barra de busca Google (expandir/recolher)
- **`initParallax()`** — Efeito parallax nos blobs de fundo (movimento com mouse)
- **`initFolderDrop()`** — Permite arrastar link sobre card de pasta para adicionar
- **`_addItemToFolder(dragId, folderId)`** — Move link para dentro de pasta

---

## 🖥️ Funcionalidades

### Tela Principal
- Sidebar com guias (Home, Work, Social, Entertainment) — **reordenáveis por drag**
- Grid de atalhos em squircles com favicons automáticos
- Cards de pasta com cor, contagem de links e descrição — **drag de link para dentro da pasta**
- Busca global por nome e URL em **todas as guias** (com badge do nome da guia)
- Relógio digital no header
- Widgets estáticos (CPU, Memory, Neon Updates)
- **Efeito parallax** nos blobs decorativos de fundo

### Modais
- **Novo/Editar Atalho:** URL, nome, preview com favicon automático
- **Nova/Editar Pasta:** Nome, seletor de cor, preview squircle
- **Visualização de Pasta:** Grid de atalhos internos com drag & drop
- **Nova/Editar Guia:** Nome, seletor de ícone (12 ícones disponíveis)

### Modo Edição
- Ativado via FAB (⚙️) → "Editar painel" ou menu de contexto
- Itens com animação wiggle, bordas tracejadas
- Botões de editar (✏️) e remover (❌) com animação
- Drag-and-drop nativo para reordenar
- Placeholder pulsante durante o arraste
- Edit header e dica flutuante (agrupamento inteligente)

### Export / Import de Dados
- **Exportar:** Gera arquivo `.json` com todos os dados (guias, itens, ordem) + metadados
- **Importar:** Upload de arquivo `.json` com validação de estrutura; substitui dados atuais
- Modais de sucesso/erro para feedback

### Web Search (Google)
- Barra fixa no canto inferior da tela
- Ao focar: animação para o centro da tela com backdrop blur
- Submete para `https://www.google.com/search?q=...`
- Fecha com Escape ou click no overlay

### Drag & Drop
- **HTML5 Nativo:** `dragstart`, `dragover`, `drop`, `dragend`
- Itens arrastáveis: atalhos no grid, cards de pasta, itens dentro de pasta
- Visual feedback: fonte esmaecido, placeholder com borda tracejada, alvo com linha neon
- **Guias na sidebar** também são reordenáveis por drag
- **Links podem ser arrastados para dentro de pastas** (destacadas com glow)

---

## 📐 CSS Architecture

| Arquivo | Responsabilidade |
|---------|-----------------|
| `variables.css` | Design tokens (cores, tipografia, spacing, radius, efeitos) — tema ObsidianFlux Purple |
| `base.css` | Reset, classes utilitárias (`.glass-panel`, `.liquid-glass`, `.squircle`, `.neon-glow-*`, `.bg-blob`) |
| `layout.css` | Sidebar, main content, search header, content grid, edit header/mode layout |
| `components.css` | Shortcut grid, folder cards, widgets, FAB, buttons, forms, color dots, context menu, web search bar, guide icon picker, search results |
| `modals.css` | Modal overlay, panel, folder view grid |
| `edit-mode.css` | Wiggle animation, drag states, remove/edit buttons, placeholder, drop targets, drag ghost |

### Classes CSS Importantes
- `.glass-panel` — `background: rgba(255,255,255,0.05); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1)`
- `.liquid-glass` — Similar ao glass-panel sem sombra
- `.squircle` — `border-radius: 24%`
- `.neon-glow-primary` / `.neon-glow-tertiary` / `.neon-glow-error` — Box-shadows com glow
- `.is-blurred` — Aplicado ao body quando modal de pasta está aberto
- `.is-open` — Visibilidade do modal
- `.is-expanded` — Barra de busca Google expandida
- `.edit-mode` — Classe no body durante modo edição
- `.is-drop-target-folder` — Folder card destacado durante drag de link
- `.search-result__guide` — Badge com nome da guia nos resultados de busca

---

## 🔄 Fluxo de Dados

```
User Action
  ↓
App (app.js) — orquestra (inclui parallax, folder drop, web search)
  ↓
Storage (storage.js) — CRUD → localStorage (inclui export/import)
  ↓
Render (render.js) — atualiza DOM (inclui busca cross-guide)
  ↑
Search, Drag, Modals, EditMode — interações
```

---

## 🌐 Dependências Externas (CDN)

| Recurso | URL | Necessário para |
|---------|-----|-----------------|
| Google Fonts (Inter) | `fonts.googleapis.com` | Tipografia corpo |
| Google Fonts (Hanken Grotesk) | `fonts.googleapis.com` | Títulos e headlines |
| Google Fonts (Geist) | `fonts.googleapis.com` | Labels e botões |
| Material Symbols | `fonts.googleapis.com` | Ícones |
| Favicons | `google.com/s2/favicons` | Favicons automáticos dos atalhos |

**Nota:** Requer internet na primeira visita. Sem internet, ícones fallback para `language` Material Icon.

---

## 🚀 Como Executar

1. **Como extensão Chrome:** Vá para `chrome://extensions/`, ative "Modo do desenvolvedor", clique em "Carregar sem compactação" e selecione a pasta `linkhub/`. A nova aba usará o LinkHub automaticamente.
2. **Como SPA:** Abra `linkhub/index.html` no navegador (duplo clique)
3. **Atalho Windows:** Execute `abrir-linkhub.bat`

---

## 📝 Convenções de Código

- **JS:** Objetos literais (`const App = { ... }`) expostos em `window`
- **CSS:** Metodologia BEM-like (`.bloco__elemento--modificador`)
- **IDs:** Prefixo `seed_` para dados de exemplo, `id_` para criados pelo usuário
- **Eventos:** Listeners adicionados via JS (poucos inline no HTML)
- **HTML:** Comentários em português para seções; classes semânticas
- **FAB:** Ícone `settings` (⚙️) como gatilho do menu flutuante

---

## ✅ Status do Projeto

| Funcionalidade | Status |
|----------------|--------|
| Grid de atalhos | ✅ Completo |
| Pastas com modal de visualização | ✅ Completo |
| CRUD de links/pastas/guias | ✅ Completo |
| Busca global (em todas as guias) | ✅ Completo |
| Scroll de nome longo no hover (marquee) | ✅ Completo |
| Modo edição com drag & drop | ✅ Completo |
| Sidebar com múltiplas guias (reordenáveis) | ✅ Completo |
| Barra de busca Google (animada) | ✅ Completo |
| Relógio | ✅ Completo |
| Persistência localStorage | ✅ Completo |
| Migração schema v1 → v2 | ✅ Completo |
| Drag de link para dentro de pasta | ✅ Completo |
| Efeito parallax | ✅ Completo |
| Context menu (itens, pastas, guias, área vazia) | ✅ Completo |
| Export/Import JSON | ✅ Completo |
| Extensão Chrome (Manifest V3) | ✅ Completo |
| Graph View (force-graph) | ❌ Removido (era instável com file://) |
| Tema claro | ❌ Futuro |
| Upload de ícones customizados | ❌ Futuro |
