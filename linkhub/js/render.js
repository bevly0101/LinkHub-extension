const Render = {
  gridEl: null,
  folderGridEl: null,
  sidebarNavEl: null,
  searchGridEl: null,

  init(gridSelector, folderGridSelector, sidebarNavSelector, searchGridSelector) {
    this.gridEl = document.querySelector(gridSelector);
    this.folderGridEl = document.querySelector(folderGridSelector);
    this.sidebarNavEl = document.querySelector(sidebarNavSelector);
    this.searchGridEl = document.querySelector(searchGridSelector);
  },

  dragGuideId: null,

  /* ---- Sidebar ---- */
  renderSidebar(guides, activeGuideId, callbacks = {}) {
    if (!this.sidebarNavEl) return;
    this.sidebarNavEl.innerHTML = "";

    guides.forEach((guide) => {
      const isActive = guide.id === activeGuideId;
      const link = document.createElement("a");
      link.className = "sidebar__link" + (isActive ? " is-active" : "");
      link.href = "#";
      link.dataset.guideId = guide.id;
      link.setAttribute("aria-label", guide.name);
      link.draggable = true;

      const icon = document.createElement("span");
      icon.className = "material-symbols-outlined";
      icon.textContent = guide.icon || "star";
      link.appendChild(icon);

      const label = document.createElement("span");
      label.className = "sidebar__link-label";
      label.textContent = guide.name;
      link.appendChild(label);

      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (callbacks.onGuideClick) callbacks.onGuideClick(guide.id);
      });

      link.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (callbacks.onGuideContextMenu) callbacks.onGuideContextMenu(guide.id, e);
      });

      link.addEventListener("dragstart", (e) => {
        this.dragGuideId = guide.id;
        link.classList.add("is-dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", guide.id);
      });

      link.addEventListener("dragend", () => {
        link.classList.remove("is-dragging");
        this.dragGuideId = null;
        document.querySelectorAll(".sidebar__link").forEach((l) => l.classList.remove("drag-over"));
      });

      link.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        document.querySelectorAll(".sidebar__link").forEach((l) => l.classList.remove("drag-over"));
        link.classList.add("drag-over");
      });

      link.addEventListener("dragleave", () => {
        link.classList.remove("drag-over");
      });

      link.addEventListener("drop", (e) => {
        e.preventDefault();
        document.querySelectorAll(".sidebar__link").forEach((l) => l.classList.remove("drag-over"));
        const fromId = this.dragGuideId;
        const toId = guide.id;
        if (!fromId || fromId === toId) return;

        const rect = link.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const position = e.clientY < midpoint ? "before" : "after";

        Storage.reorderGuide(fromId, toId, position);
        this.dragGuideId = null;
      });

      this.sidebarNavEl.appendChild(link);
    });
  },

  /* ---- Item rendering ---- */
  getIconHtml(item) {
    if (item.type === "folder") {
      const color = item.color || Storage.FOLDER_COLORS[0];
      const dots = (item.children || [])
        .slice(0, 4)
        .map(() => `<span style="background:${color}"></span>`)
        .join("");
      return dots || '<span></span><span></span><span></span><span></span>';
    }
    return null;
  },

  appendIconContent(iconWrap, item) {
    if (item.type === "folder") {
      const dotsWrap = document.createElement("div");
      dotsWrap.className = "shortcut-item__folder-dots";
      dotsWrap.innerHTML = this.getIconHtml(item);
      iconWrap.appendChild(dotsWrap);
      return;
    }

    const setFallback = () => {
      iconWrap.innerHTML = "";
      const span = document.createElement("span");
      span.className = "material-symbols-outlined";
      span.textContent = "language";
      iconWrap.appendChild(span);
    };

    let src = item.icon;
    if (!src && item.url) src = Storage.getFaviconUrl(item.url);

    if (src) {
      const img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      img.src = src;
      img.addEventListener("error", setFallback);
      iconWrap.appendChild(img);
    } else {
      setFallback();
    }
  },

  _addRemoveButton(el, id, onRemove) {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "shortcut-item__remove";
    removeBtn.setAttribute("aria-label", "Remover");
    removeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (onRemove) onRemove(id);
    });
    el.appendChild(removeBtn);
  },

  _addContextMenu(el, id, item, onContextMenu) {
    if (!onContextMenu) return;
    el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu(id, item, e);
    });
  },

  createShortcutElement(id, item, options = {}) {
    const { editMode = false, onFolderClick, onEdit, onRemove, onContextMenu } = options;
    const isFolder = item.type === "folder";
    const el = document.createElement("div");

    el.className = "shortcut-item";
    el.dataset.id = id;
    el.draggable = true;

    if (isFolder) {
      el.classList.add("shortcut-item--folder");
      if (editMode) {
        el.classList.add("shortcut-item--edit");
      } else {
        el.setAttribute("role", "button");
        el.tabIndex = 0;
      }
    } else if (editMode) {
      el.classList.add("shortcut-item--edit");
    }

    this._addRemoveButton(el, id, onRemove);
    this._addContextMenu(el, id, item, onContextMenu);

    if (editMode && !isFolder) {
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "shortcut-item__edit";
      editBtn.setAttribute("aria-label", "Editar");
      editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (onEdit) onEdit(id, item);
      });
      el.appendChild(editBtn);
    }

    const iconWrap = document.createElement("div");
    iconWrap.className = "shortcut-item__icon-wrap";
    this.appendIconContent(iconWrap, item);
    el.appendChild(iconWrap);

    const label = document.createElement("span");
    label.className = "shortcut-item__label";
    const inner = document.createElement("span");
    inner.className = "shortcut-item__label-inner";
    inner.textContent = item.name;
    label.appendChild(inner);
    el.appendChild(label);

    if (!editMode) {
      if (isFolder && onFolderClick) {
        el.addEventListener("click", () => onFolderClick(id, item));
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFolderClick(id, item);
          }
        });
      } else if (!isFolder && item.url) {
        el.addEventListener("click", () => {
          window.location.href = item.url;
        });
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.location.href = item.url;
          }
        });
      }
    }

    return el;
  },

  createFolderCardElement(id, item, callbacks = {}) {
    const el = document.createElement("div");
    el.className = "folder-card";
    el.dataset.id = id;
    el.draggable = true;
    el.setAttribute("role", "button");
    el.tabIndex = 0;

    const iconWrap = document.createElement("div");
    iconWrap.className = "folder-card__icon";
    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.textContent = "folder";
    iconWrap.appendChild(icon);
    el.appendChild(iconWrap);

    const body = document.createElement("div");
    body.className = "folder-card__body";

    const header = document.createElement("div");
    header.className = "folder-card__header";

    const name = document.createElement("h3");
    name.className = "folder-card__name";
    name.textContent = item.name;
    header.appendChild(name);

    const count = document.createElement("span");
    count.className = "folder-card__count";
    const childCount = (item.children || []).filter((id) => {
      const c = Storage.getItem(id);
      return c && c.type === "link";
    }).length;
    count.textContent = `${childCount} links`;
    header.appendChild(count);

    body.appendChild(header);

    const desc = document.createElement("p");
    desc.className = "folder-card__desc";
    desc.textContent = `${item.name} resources and tools.`;
    body.appendChild(desc);

    el.appendChild(body);

    this._addRemoveButton(el, id, callbacks.onRemove);
    this._addContextMenu(el, id, item, callbacks.onContextMenu);

    el.addEventListener("click", () => {
      if (callbacks.onFolderClick) callbacks.onFolderClick(id, item);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (callbacks.onFolderClick) callbacks.onFolderClick(id, item);
      }
    });

    return el;
  },

  renderRootGrid({ editMode = false, filter = "", callbacks = {} }) {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = "";
    const order = Storage.getGuideOrder();
    const q = filter.trim().toLowerCase();

    order.forEach((id) => {
      const item = Storage.getItem(id);
      if (!item) return;

      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        const matchUrl =
          item.type === "link" && item.url.toLowerCase().includes(q);
        if (!matchName && !matchUrl) {
          const el = document.createElement("div");
          el.className = "shortcut-item shortcut-item--filtered-out";
          el.style.display = "none";
          this.gridEl.appendChild(el);
          return;
        }
      }

      if (editMode || item.type === "link") {
        const el = this.createShortcutElement(id, item, {
          editMode,
          onFolderClick: callbacks.onFolderClick,
          onEdit: callbacks.onEdit,
          onRemove: callbacks.onRemove,
          onContextMenu: callbacks.onContextMenu,
        });
        this.gridEl.appendChild(el);
      }
    });

    const addSlot = document.createElement("div");
    addSlot.className = "shortcut-item shortcut-item--add-slot";
    addSlot.setAttribute("role", "button");
    addSlot.tabIndex = 0;
    addSlot.innerHTML = `
      <div class="shortcut-item__icon-wrap">
        <span class="material-symbols-outlined">add</span>
      </div>
      <span class="shortcut-item__label">Adicionar link</span>
    `;
    addSlot.addEventListener("click", () => {
      if (callbacks.onAddLink) callbacks.onAddLink();
    });
    this.gridEl.appendChild(addSlot);
  },

  renderFolderCards(callbacks = {}) {
    if (!this.folderGridEl) return;
    this.folderGridEl.innerHTML = "";
    const order = Storage.getGuideOrder();
    const items = Storage.getData().items;

    order.forEach((id) => {
      const item = items[id];
      if (item && item.type === "folder") {
        const el = this.createFolderCardElement(id, item, {
          onFolderClick: callbacks.onFolderClick,
          onRemove: callbacks.onRemove,
          onContextMenu: callbacks.onContextMenu,
        });
        this.folderGridEl.appendChild(el);
      }
    });
  },

  _searchAllGuides(query) {
    const data = Storage.getData();
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results = [];
    const seen = new Set();

    data.guideOrder.forEach((guideId) => {
      const guide = data.guides[guideId];
      if (!guide) return;

      (guide.order || []).forEach((itemId) => {
        if (seen.has(itemId)) return;
        const item = data.items[itemId];
        if (!item) return;

        const matchName = item.name && item.name.toLowerCase().includes(q);
        const matchUrl =
          item.type === "link" && item.url && item.url.toLowerCase().includes(q);

        if (matchName || matchUrl) {
          seen.add(itemId);
          results.push({ id: itemId, item, guideId: guide.id, guideName: guide.name });
        }

        if (item.type === "folder" && item.children) {
          item.children.forEach((childId) => {
            if (seen.has(childId)) return;
            const child = data.items[childId];
            if (!child || child.type !== "link") return;

            const cMatchName = child.name && child.name.toLowerCase().includes(q);
            const cMatchUrl = child.url && child.url.toLowerCase().includes(q);

            if (cMatchName || cMatchUrl) {
              seen.add(childId);
              results.push({ id: childId, item: child, guideId: guide.id, guideName: guide.name });
            }
          });
        }
      });
    });

    return results;
  },

  renderSearchResults(query, callbacks = {}) {
    if (!this.searchGridEl) return;
    this.searchGridEl.innerHTML = "";
    const countEl = document.getElementById("search-results-count");

    const results = this._searchAllGuides(query);

    if (countEl) countEl.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""}`;

    if (results.length === 0) {
      this.searchGridEl.innerHTML = '<p class="search-no-results">Nenhum resultado encontrado.</p>';
      return;
    }

    results.forEach(({ id, item, guideName }) => {
      const el = this.createShortcutElement(id, item, {
        onRemove: callbacks.onRemove,
        onContextMenu: callbacks.onContextMenu,
        onFolderClick: callbacks.onFolderClick,
      });

      const badge = document.createElement("span");
      badge.className = "search-result__guide";
      badge.textContent = guideName;
      el.appendChild(badge);

      this.searchGridEl.appendChild(el);
    });
  },

  renderFolderChildren(folderId, containerEl, callbacks = {}) {
    if (!containerEl) return;
    containerEl.innerHTML = "";
    const folder = Storage.getItem(folderId);
    if (!folder || folder.type !== "folder") return;

    const children = folder.children || [];
    children.forEach((id) => {
      const item = Storage.getItem(id);
      if (!item || item.type !== "link") return;
      const el = this.createShortcutElement(id, item, {
        onRemove: callbacks.onRemove,
        onContextMenu: callbacks.onContextMenu,
      });
      containerEl.appendChild(el);
    });

    const addSlot = document.createElement("div");
    addSlot.className = "shortcut-item shortcut-item--add-slot";
    addSlot.setAttribute("role", "button");
    addSlot.tabIndex = 0;
    addSlot.innerHTML = `
      <div class="shortcut-item__icon-wrap">
        <span class="material-symbols-outlined">add</span>
      </div>
      <span class="shortcut-item__label">Adicionar link</span>
    `;
    addSlot.addEventListener("click", () => {
      if (callbacks.onAddLink) callbacks.onAddLink();
    });
    containerEl.appendChild(addSlot);
  },
};

window.Render = Render;