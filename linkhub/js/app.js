const SEARCH_ENGINES = {
  google:   { name: 'Google',      url: 'https://www.google.com/search?q=',    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=64',    placeholder: 'Pesquisar no Google...' },
  bing:     { name: 'Bing',        url: 'https://www.bing.com/search?q=',      logo: 'https://www.google.com/s2/favicons?domain=bing.com&sz=64',      placeholder: 'Pesquisar no Bing...' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=',         logo: 'https://www.google.com/s2/favicons?domain=duckduckgo.com&sz=64', placeholder: 'Pesquisar no DuckDuckGo...' },
  yahoo:    { name: 'Yahoo',       url: 'https://search.yahoo.com/search?p=',  logo: 'https://www.google.com/s2/favicons?domain=yahoo.com&sz=64',     placeholder: 'Pesquisar no Yahoo...' },
  brave:    { name: 'Brave',       url: 'https://search.brave.com/search?q=',  logo: 'https://www.google.com/s2/favicons?domain=brave.com&sz=64',    placeholder: 'Pesquisar no Brave...' },
};

const App = {
  isEditMode: false,
  _selectedEngine: 'google',
  _suggestionIdx: -1,

  _reorderItem(dragId, targetId, position) {
    const order = Storage.getGuideOrder();
    const fromIdx = order.indexOf(dragId);
    const toIdx = order.indexOf(targetId);
    if (fromIdx < 0 || toIdx < 0) return;
    order.splice(fromIdx, 1);
    const newToIdx = order.indexOf(targetId);
    const insertAt = position === 'after' ? newToIdx + 1 : newToIdx;
    order.splice(insertAt, 0, dragId);
    Storage.setGuideOrder(order);
    this.refresh();
  },

  init() {
    Storage.load();
    this.applySettings();
    Render.init("#shortcut-grid", "#folder-grid", "#sidebar-nav", "#search-results-grid");
    Clock.init("#digital-clock");
    Modals.init();

    DragManager.makeSortable(document.getElementById("shortcut-grid"), {
      onReorder: (dragId, targetId, position) => this._reorderItem(dragId, targetId, position),
    });

    DragManager.makeSortable(document.getElementById("folder-grid"), {
      itemSelector: '.folder-card',
      onReorder: (dragId, targetId, position) => this._reorderItem(dragId, targetId, position),
    });

    Search.init("#search-input", (query) => this.refresh(query));
    this.initWebSearch();
    this.initParallax();

    document.getElementById("edit-grid-btn")?.addEventListener("click", () => {
      this.enterEditMode();
    });

    document.getElementById("btn-done-edit")?.addEventListener("click", () => {
      this.exitEditMode();
    });

    document.getElementById("btn-add-guide")?.addEventListener("click", () => {
      Modals.openGuideModal();
    });

    document.getElementById("app-main")?.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      Modals.showEmptyAreaContextMenu(e.clientX, e.clientY);
    });

    this.initFolderDrop();
    this.renderSidebar();
    this.refresh();
  },

  initFolderDrop() {
    document.addEventListener('dragover', (e) => {
      const dragId = DragManager._activeDragId;
      if (!dragId) return;
      const item = Storage.getItem(dragId);
      if (!item || item.type !== 'link') return;

      document.querySelectorAll('.is-drop-target-folder').forEach((el) => {
        el.classList.remove('is-drop-target-folder');
      });

      const folderCard = e.target.closest('.folder-card');
      if (!folderCard || folderCard.dataset.id === dragId) return;
      folderCard.classList.add('is-drop-target-folder');
    });

    document.addEventListener('drop', (e) => {
      const dragId = DragManager._activeDragId;
      if (!dragId) return;
      const item = Storage.getItem(dragId);
      if (!item || item.type !== 'link') return;

      const folderCard = e.target.closest('.folder-card');
      if (!folderCard || folderCard.dataset.id === dragId) return;

      e.preventDefault();
      this._addItemToFolder(dragId, folderCard.dataset.id);
    });

    document.addEventListener('dragend', () => {
      document.querySelectorAll('.is-drop-target-folder').forEach((el) => {
        el.classList.remove('is-drop-target-folder');
      });
    });
  },

  _addItemToFolder(dragId, folderId) {
    const folder = Storage.getItem(folderId);
    if (!folder || folder.type !== 'folder') return;

    if (!folder.children) folder.children = [];
    if (folder.children.includes(dragId)) return;

    const data = Storage.getData();
    Object.values(data.guides).forEach((guide) => {
      guide.order = guide.order.filter((id) => id !== dragId);
    });
    Object.values(data.items).forEach((it) => {
      if (it.type === 'folder' && it.children) {
        it.children = it.children.filter((id) => id !== dragId);
      }
    });

    folder.children.push(dragId);
    Storage.save();
    this.refresh();
  },

  initParallax() {
    document.addEventListener('mousemove', (e) => {
      const blobs = document.querySelectorAll('.bg-blob');
      if (!blobs.length) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      blobs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      if (blobs[1]) {
        blobs[1].style.transform = `translate(${x * -30}px, ${y * -30}px)`;
      }
    });
  },

  initWebSearch() {
    const wrap = document.getElementById('web-search-wrap');
    const overlay = document.getElementById('web-search-overlay');
    const input = document.getElementById('web-search-input');
    const form = document.getElementById('web-search-form');
    const engineBtn = document.getElementById('web-search-engine-btn');
    const engineDropdown = document.getElementById('web-search-engine-dropdown');
    const suggestionsEl = document.getElementById('web-search-suggestions');
    if (!wrap || !input || !form) return;

    // restore saved engine
    this._selectedEngine = localStorage.getItem('linkhub-search-engine') || 'google';
    this._applyEngine(this._selectedEngine);

    const collapse = () => {
      wrap.classList.remove('is-expanded');
      overlay.classList.remove('is-visible');
      document.body.classList.remove('modal-open');
      this._closeSuggestions();
      this._closeEngineDropdown();
      input.blur();
    };

    const expand = () => {
      if (this.isEditMode) return;
      wrap.classList.add('is-expanded');
      overlay.classList.add('is-visible');
      document.body.classList.add('modal-open');
      setTimeout(() => input.focus(), 80);
    };

    /* ---- expand/collapse ---- */
    input.addEventListener('focus', () => {
      if (!wrap.classList.contains('is-expanded')) expand();
    });

    overlay.addEventListener('click', collapse);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (engineDropdown.classList.contains('is-open')) {
          this._closeEngineDropdown();
          return;
        }
        if (suggestionsEl.classList.contains('is-open')) {
          this._closeSuggestions();
          return;
        }
        if (wrap.classList.contains('is-expanded')) {
          collapse();
        }
      }
    });

    /* ---- form submit ---- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      this._saveRecentSearch(q);
      this._closeSuggestions();
      const engine = SEARCH_ENGINES[this._selectedEngine];
      window.open(engine.url + encodeURIComponent(q), '_top');
      setTimeout(() => collapse(), 300);
    });

    /* ---- engine switcher ---- */
    engineBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      engineDropdown.classList.toggle('is-open');
      this._closeSuggestions();
    });

    engineDropdown.querySelectorAll('.web-search-engine-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const engineId = opt.dataset.engine;
        this._selectEngine(engineId);
        this._closeEngineDropdown();
        input.focus();
      });
    });

    document.addEventListener('click', () => {
      this._closeEngineDropdown();
    });

    engineDropdown.addEventListener('click', (e) => e.stopPropagation());

    /* ---- suggestions ---- */
    let suggestTimer = null;
    input.addEventListener('input', () => {
      clearTimeout(suggestTimer);
      const q = input.value.trim();
      if (q.length < 1) {
        this._closeSuggestions();
        return;
      }
      suggestTimer = setTimeout(() => this._buildSuggestions(q), 100);
    });

    input.addEventListener('keydown', (e) => {
      const items = suggestionsEl.querySelectorAll('.web-search-suggestion');
      if (!suggestionsEl.classList.contains('is-open') || !items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._highlightSuggestion(Math.min(this._suggestionIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._highlightSuggestion(Math.max(this._suggestionIdx - 1, 0));
      } else if (e.key === 'Enter' && this._suggestionIdx >= 0) {
        e.preventDefault();
        const text = items[this._suggestionIdx]?.dataset?.query;
        if (text) {
          input.value = text;
          this._saveRecentSearch(text);
          this._closeSuggestions();
          const engine = SEARCH_ENGINES[this._selectedEngine];
          window.open(engine.url + encodeURIComponent(text), '_top');
          setTimeout(() => collapse(), 300);
        }
      }
    });

    /* ---- close suggestions on blur (with delay for click) ---- */
    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (!suggestionsEl.matches(':hover')) {
          this._closeSuggestions();
        }
      }, 200);
    });
  },

  /* ============ SEARCH ENGINE ============ */
  _applyEngine(engineId) {
    const engine = SEARCH_ENGINES[engineId];
    if (!engine) return;
    const input = document.getElementById('web-search-input');
    const engineIcon = document.getElementById('web-search-engine-icon');
    const engineBtn = document.getElementById('web-search-engine-btn');
    if (input) input.placeholder = engine.placeholder;
    if (engineIcon) {
      engineIcon.src = engine.logo;
      engineIcon.alt = engine.name;
    }
    if (engineBtn) {
      engineBtn.title = `Motor: ${engine.name} — Clique para alterar`;
    }
    document.querySelectorAll('.web-search-engine-option').forEach((opt) => {
      opt.classList.toggle('is-selected', opt.dataset.engine === engineId);
    });
  },

  _selectEngine(engineId) {
    if (!SEARCH_ENGINES[engineId]) return;
    this._selectedEngine = engineId;
    localStorage.setItem('linkhub-search-engine', engineId);
    this._applyEngine(engineId);
  },

  _closeEngineDropdown() {
    const dd = document.getElementById('web-search-engine-dropdown');
    if (dd) dd.classList.remove('is-open');
  },

  /* ============ SUGGESTIONS ============ */
  _getRecentSearches() {
    try {
      const raw = localStorage.getItem('linkhub-recent-searches');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  },

  _saveRecentSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;
    let searches = this._getRecentSearches();
    searches = searches.filter((s) => s.toLowerCase() !== q);
    searches.unshift(query.trim());
    if (searches.length > 10) searches = searches.slice(0, 10);
    localStorage.setItem('linkhub-recent-searches', JSON.stringify(searches));
  },

  _buildSuggestions(query) {
    const q = query.trim().toLowerCase();
    if (!q) { this._closeSuggestions(); return; }

    const el = document.getElementById('web-search-suggestions');
    if (!el) return;
    el.innerHTML = '';

    // 1) match stored links
    const data = Storage.getData();
    const linkResults = [];
    Object.values(data.guides).forEach((guide) => {
      (guide.order || []).forEach((itemId) => {
        const item = data.items[itemId];
        if (!item) return;
        if (item.type === 'link') {
          if ((item.name && item.name.toLowerCase().includes(q)) ||
              (item.url && item.url.toLowerCase().includes(q))) {
            linkResults.push({ text: item.name, sub: 'link', icon: 'link' });
          }
        }
        if (item.type === 'folder' && item.children) {
          item.children.forEach((childId) => {
            const child = data.items[childId];
            if (child && child.type === 'link' &&
                ((child.name && child.name.toLowerCase().includes(q)) ||
                 (child.url && child.url.toLowerCase().includes(q)))) {
              linkResults.push({ text: child.name, sub: 'link', icon: 'link' });
            }
          });
        }
      });
    });

    // 2) match recent searches
    const recentSearches = this._getRecentSearches();
    const recentResults = recentSearches.filter((s) =>
      s.toLowerCase().includes(q)
    ).map((s) => ({ text: s, sub: 'recente', icon: 'history' }));

    // deduplicate: prefer recent over link
    const seen = new Set();
    const deduped = [];
    [...recentResults, ...linkResults].forEach((r) => {
      const key = r.text.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(r);
      }
    });

    if (!deduped.length) { this._closeSuggestions(); return; }

    if (deduped.length > 8) deduped.length = 8;

    this._renderSuggestions(deduped);
    this._openSuggestions();
    this._suggestionIdx = -1;
  },

  _renderSuggestions(results) {
    const el = document.getElementById('web-search-suggestions');
    if (!el) return;
    el.innerHTML = '';

    // header
    const header = document.createElement('div');
    header.className = 'web-search-suggestions__header';
    header.textContent = 'Sugestões';
    el.appendChild(header);

    results.forEach((r, i) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'web-search-suggestion' +
        (r.sub === 'recente' ? ' web-search-suggestion--recent' : ' web-search-suggestion--link');
      item.dataset.index = i;
      item.dataset.query = r.text;
      item.innerHTML = `
        <span class="material-symbols-outlined">${r.icon}</span>
        <span class="web-search-suggestion__text">${this._escapeHtml(r.text)}</span>
        <span class="web-search-suggestion__badge">${r.sub}</span>
      `;
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const input = document.getElementById('web-search-input');
        if (input) {
          input.value = r.text;
          this._saveRecentSearch(r.text);
          this._closeSuggestions();
          const engine = SEARCH_ENGINES[this._selectedEngine];
          window.open(engine.url + encodeURIComponent(r.text), '_top');
          setTimeout(() => {
            const wrap = document.getElementById('web-search-wrap');
            if (wrap) {
              wrap.classList.remove('is-expanded');
              document.getElementById('web-search-overlay')?.classList.remove('is-visible');
              document.body.classList.remove('modal-open');
            }
          }, 300);
        }
      });
      el.appendChild(item);
    });
  },

  _openSuggestions() {
    const el = document.getElementById('web-search-suggestions');
    if (el) el.classList.add('is-open');
  },

  _closeSuggestions() {
    const el = document.getElementById('web-search-suggestions');
    if (el) {
      el.classList.remove('is-open');
      el.innerHTML = '';
    }
    this._suggestionIdx = -1;
  },

  _highlightSuggestion(idx) {
    const el = document.getElementById('web-search-suggestions');
    if (!el) return;
    el.querySelectorAll('.web-search-suggestion').forEach((item, i) => {
      item.classList.toggle('is-highlighted', i === idx);
    });
    this._suggestionIdx = idx;
    const highlighted = el.querySelector('.is-highlighted');
    if (highlighted) {
      highlighted.scrollIntoView({ block: 'nearest' });
    }
  },

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  applySettings() {
    const s = Storage.getSettings();
    document.body.classList.toggle('hide-clock', !s.showClock);
    document.body.classList.toggle('hide-search', !s.showSearch);
    document.body.classList.toggle('hide-web-search', !s.showWebSearch);
    ['left', 'right', 'top', 'bottom'].forEach((pos) => {
      document.body.classList.toggle('sidebar-' + pos, s.sidebarPosition === pos);
    });
    document.documentElement.dataset.theme = s.theme || 'ultra-glass-depth';
  },

  renderSidebar() {
    const guides = Storage.getGuides();
    const activeGuide = Storage.getActiveGuide();
    Render.renderSidebar(guides, activeGuide.id, {
      onGuideClick: (guideId) => this.switchGuide(guideId),
      onGuideContextMenu: (guideId, e) => this._handleGuideContextMenu(guideId, e),
    });
  },

  switchGuide(guideId) {
    if (this.isEditMode) return;
    Storage.setActiveGuide(guideId);
    this.renderSidebar();
    this.refresh();
  },

  _handleContextMenu(id, item, event) {
    Modals.showContextMenu(event.clientX, event.clientY, id, item);
  },

  _handleGuideContextMenu(guideId, event) {
    const guide = Storage.getData().guides[guideId];
    if (guide) {
      Modals.showGuideContextMenu(event.clientX, event.clientY, guideId, guide.name);
    }
  },

  _handleRemove(id) {
    EditMode.removeItem(id);
  },

  refresh(filter) {
    const query = filter !== undefined ? filter : Search.getQuery();
    const isSearching = !this.isEditMode && query.trim().length > 0;

    const searchSection = document.getElementById("search-section");
    const normalSections = document.querySelectorAll(".content-main > .section:not(#search-section)");

    if (isSearching) {
      normalSections.forEach((s) => (s.style.display = "none"));
      if (searchSection) searchSection.style.display = "";

      Render.renderSearchResults(query, {
        onFolderClick: (id) => Modals.openFolderView(id),
        onRemove: (id) => this._handleRemove(id),
        onContextMenu: (id, item, e) => this._handleContextMenu(id, item, e),
      });
      return;
    }

    normalSections.forEach((s) => (s.style.display = ""));
    if (searchSection) searchSection.style.display = "none";

    if (this.isEditMode) {
      Render.renderRootGrid({
        editMode: true,
        filter: "",
        callbacks: {
          onFolderClick: (id) => Modals.openFolderView(id),
          onEdit: (id, item) => {
            if (item.type === "link") {
              Modals.openShortcutModal({ editId: id });
            }
          },
          onRemove: (id) => EditMode.removeItem(id),
          onAddLink: () => Modals.openShortcutModal(),
        },
      });
      return;
    }

    Render.renderRootGrid({
      editMode: false,
      filter: query,
      callbacks: {
        onFolderClick: (id) => Modals.openFolderView(id),
        onRemove: (id) => this._handleRemove(id),
        onContextMenu: (id, item, e) => this._handleContextMenu(id, item, e),
        onAddLink: () => Modals.openShortcutModal(),
      },
    });

    Render.renderFolderCards({
      onFolderClick: (id) => Modals.openFolderView(id),
      onRemove: (id) => this._handleRemove(id),
      onContextMenu: (id, item, e) => this._handleContextMenu(id, item, e),
    });
  },

  enterEditMode() {
    this.isEditMode = true;
    document.body.classList.add("edit-mode");

    const editHeader = document.getElementById("edit-header");
    const tipCard = document.getElementById("edit-tip-card");
    if (editHeader) editHeader.classList.remove("hidden");
    if (tipCard) tipCard.classList.remove("hidden");

    Search.clear();
    this.refresh();
  },

  exitEditMode() {
    this.isEditMode = false;
    document.body.classList.remove("edit-mode");

    const editHeader = document.getElementById("edit-header");
    const tipCard = document.getElementById("edit-tip-card");
    if (editHeader) editHeader.classList.add("hidden");
    if (tipCard) tipCard.classList.add("hidden");

    this.refresh();
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());

window.App = App;