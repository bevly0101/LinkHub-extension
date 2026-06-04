const Modals = {
  shortcutOverlay: null,
  folderOverlay: null,
  folderViewOverlay: null,
  guideOverlay: null,
  fabMenu: null,
  contextMenuEl: null,

  editingLinkId: null,
  shortcutParentId: null,
  selectedFolderColor: "#4F46E5",
  currentFolderViewId: null,

  editingGuideId: null,

  init() {
    this.shortcutOverlay = document.getElementById("modal-shortcut");
    this.folderOverlay = document.getElementById("modal-folder");
    this.folderViewOverlay = document.getElementById("modal-folder-view");
    this.guideOverlay = document.getElementById("modal-guide");
    this.fabMenu = document.getElementById("fab-menu");
    this.contextMenuEl = document.getElementById("context-menu");

    this.bindShortcutModal();
    this.bindFolderModal();
    this.bindFolderViewModal();
    this.bindFabMenu();
    this.bindColorDots();
    this.bindSettingsModal();
    this.bindGuideModal();
    this.bindContextMenu();

    this.renderGuideIcons();
  },

  renderGuideIcons() {
    const container = document.getElementById("guide-icons");
    if (!container) return;
    container.innerHTML = "";
    Storage.GUIDE_ICONS.forEach((icon, i) => {
      const label = document.createElement("label");
      label.className = "guide-icon-option";
      label.innerHTML = `
        <input type="radio" name="guide-icon" value="${icon}"${i === 0 ? " checked" : ""} />
        <span class="material-symbols-outlined">${icon}</span>
      `;
      container.appendChild(label);
    });
  },

  open(overlay) {
    if (!overlay) return;
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
  },

  close(overlay) {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    if (!document.querySelector(".modal-overlay.is-open")) {
      document.body.classList.remove("modal-open");
      document.body.classList.remove("is-blurred");
    }
  },

  /* ---- Context Menu ---- */
  bindContextMenu() {
    document.addEventListener("click", () => this.hideContextMenu());
    document.addEventListener("contextmenu", () => this.hideContextMenu());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.hideContextMenu();
    });
  },

  showContextMenu(x, y, id, item) {
    if (!this.contextMenuEl) return;
    const menu = this.contextMenuEl;
    menu.innerHTML = "";
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.dataset.itemId = id;
    menu.dataset.itemType = item.type;
    menu.classList.remove("hidden");

    const option = document.createElement("button");
    option.type = "button";
    option.className = "context-menu__item";
    option.innerHTML = `<span class="material-symbols-outlined">edit</span> Editar ${item.type === "folder" ? "pasta" : "atalho"}`;
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      if (item.type === "folder") {
        this.openFolderEditModal(id);
      } else {
        this.openShortcutModal({ editId: id });
      }
    });
    menu.appendChild(option);

    const deleteOption = document.createElement("button");
    deleteOption.type = "button";
    deleteOption.className = "context-menu__item context-menu__item--danger";
    deleteOption.innerHTML = `<span class="material-symbols-outlined">delete</span> Remover`;
    deleteOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      if (window.App) App._handleRemove(id);
    });
    menu.appendChild(deleteOption);

    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = (x - rect.width) + "px";
    }
    if (rect.bottom > window.innerHeight) {
      menu.style.top = (y - rect.height) + "px";
    }
  },

  showGuideContextMenu(x, y, guideId, guideName) {
    if (!this.contextMenuEl) return;
    const menu = this.contextMenuEl;
    menu.innerHTML = "";
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.dataset.itemType = "guide";
    menu.dataset.itemId = guideId;
    menu.classList.remove("hidden");

    const editOption = document.createElement("button");
    editOption.type = "button";
    editOption.className = "context-menu__item";
    editOption.innerHTML = `<span class="material-symbols-outlined">edit</span> Editar guia`;
    editOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      this.openGuideModal({ editId: guideId });
    });
    menu.appendChild(editOption);

    const deleteOption = document.createElement("button");
    deleteOption.type = "button";
    deleteOption.className = "context-menu__item context-menu__item--danger";
    deleteOption.innerHTML = `<span class="material-symbols-outlined">delete</span> Remover guia`;
    deleteOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      Storage.removeGuide(guideId);
      if (window.App) {
        App.renderSidebar();
        App.refresh();
      }
    });
    menu.appendChild(deleteOption);

    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = (x - rect.width) + "px";
    }
    if (rect.bottom > window.innerHeight) {
      menu.style.top = (y - rect.height) + "px";
    }
  },

  showEmptyAreaContextMenu(x, y) {
    if (!this.contextMenuEl) return;
    const menu = this.contextMenuEl;
    menu.innerHTML = "";
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.dataset.itemType = "empty";
    menu.classList.remove("hidden");

    const linkOption = document.createElement("button");
    linkOption.type = "button";
    linkOption.className = "context-menu__item";
    linkOption.innerHTML = `<span class="material-symbols-outlined">link</span> Criar atalho`;
    linkOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      this.openShortcutModal();
    });
    menu.appendChild(linkOption);

    const folderOption = document.createElement("button");
    folderOption.type = "button";
    folderOption.className = "context-menu__item";
    folderOption.innerHTML = `<span class="material-symbols-outlined">create_new_folder</span> Criar pasta`;
    folderOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      this.openFolderModal();
    });
    menu.appendChild(folderOption);

    const editOption = document.createElement("button");
    editOption.type = "button";
    editOption.className = "context-menu__item";
    //editOption.innerHTML = `<span class="material-symbols-outlined">edit</span> Editar grid`;
    editOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      if (window.App) App.enterEditMode();
    });
    menu.appendChild(editOption);

    const settingsOption = document.createElement("button");
    settingsOption.type = "button";
    settingsOption.className = "context-menu__item";
    settingsOption.innerHTML = `<span class="material-symbols-outlined">tune</span> Personalizar`;
    settingsOption.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideContextMenu();
      this.openSettingsModal();
    });
    menu.appendChild(settingsOption);

    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = (x - rect.width) + "px";
    }
    if (rect.bottom > window.innerHeight) {
      menu.style.top = (y - rect.height) + "px";
    }
  },

  hideContextMenu() {
    if (this.contextMenuEl) {
      this.contextMenuEl.classList.add("hidden");
    }
  },

  /* ---- FAB Menu ---- */
  bindFabMenu() {
    const fab = document.getElementById("fab");
    if (!fab || !this.fabMenu) return;

    fab.addEventListener("click", (e) => {
      e.stopPropagation();
      this.fabMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
    });

    this.fabMenu.addEventListener("click", (e) => e.stopPropagation());

    document.getElementById("fab-new-link")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      this.openShortcutModal();
    });

    document.getElementById("fab-new-folder")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      this.openFolderModal();
    });

    /**document.getElementById("fab-edit-grid")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      if (window.App) App.enterEditMode();
    });**/

    document.getElementById("fab-settings")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      this.openSettingsModal();
    });

    document.getElementById("fab-export")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      this.handleExport();
    });

    document.getElementById("fab-import")?.addEventListener("click", () => {
      this.fabMenu.classList.add("hidden");
      this.handleImport();
    });
  },

  handleExport() {
    const json = Storage.exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkhub-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = Storage.importData(ev.target.result);
        if (result.success) {
          if (window.App) {
            App.renderSidebar();
            App.refresh();
          }
          this.openImportSuccessModal();
        } else {
          this.openImportErrorModal(result.error);
        }
      };
      reader.readAsText(file);
    });
    input.click();
  },

  openImportSuccessModal() {
    this.hideContextMenu();
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay is-open";
    overlay.style.zIndex = "300";
    overlay.innerHTML = `
      <div class="modal-panel glass-panel" style="max-width:360px;text-align:center;padding:2.5rem">
        <span class="material-symbols-outlined" style="font-size:3rem;color:var(--color-primary);margin-bottom:1rem">check_circle</span>
        <h2 style="font-family:var(--font-headline-md);font-size:var(--font-headline-md-size);font-weight:600;margin-bottom:0.5rem">Importado!</h2>
        <p style="color:var(--color-on-surface-variant);margin-bottom:1.5rem">Seus dados foram restaurados com sucesso.</p>
        <button type="button" class="btn-primary" id="import-success-ok">OK</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#import-success-ok").addEventListener("click", () => {
      overlay.remove();
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  },

  openImportErrorModal(msg) {
    this.hideContextMenu();
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay is-open";
    overlay.style.zIndex = "300";
    overlay.innerHTML = `
      <div class="modal-panel glass-panel" style="max-width:360px;text-align:center;padding:2.5rem">
        <span class="material-symbols-outlined" style="font-size:3rem;color:var(--color-error);margin-bottom:1rem">error</span>
        <h2 style="font-family:var(--font-headline-md);font-size:var(--font-headline-md-size);font-weight:600;margin-bottom:0.5rem">Erro na importação</h2>
        <p style="color:var(--color-on-surface-variant);margin-bottom:1.5rem">${msg}</p>
        <button type="button" class="btn-primary" id="import-error-ok">OK</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#import-error-ok").addEventListener("click", () => {
      overlay.remove();
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  },

  /* ---- Shortcut Modal ---- */
  bindShortcutModal() {
    const form = document.getElementById("form-shortcut");
    const urlInput = document.getElementById("shortcut-url");
    const nameInput = document.getElementById("shortcut-name");
    const cancelBtn = document.getElementById("shortcut-cancel");
    const overlay = this.shortcutOverlay;

    const updatePreview = () => {
      const namePreview = document.getElementById("shortcut-name-preview");
      const faviconImg = document.getElementById("shortcut-favicon-preview");
      if (namePreview) {
        namePreview.textContent = nameInput.value.trim() || "Novo atalho";
      }
      if (!faviconImg) return;
      const val = urlInput.value.trim();
      if (val && val.includes(".")) {
        try {
          const favicon = Storage.getFaviconUrl(val);
          if (favicon) {
            faviconImg.hidden = false;
            faviconImg.src = favicon;
            faviconImg.classList.remove("is-placeholder");
            return;
          }
        } catch { /* ignore */ }
      }
      faviconImg.removeAttribute("src");
      faviconImg.hidden = true;
      faviconImg.classList.add("is-placeholder");
    };

    urlInput?.addEventListener("input", updatePreview);
    nameInput?.addEventListener("input", updatePreview);

    cancelBtn?.addEventListener("click", () => this.closeShortcutModal());
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) this.closeShortcutModal();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveShortcut();
    });
  },

  openShortcutModal({ editId = null, parentId = null } = {}) {
    this.editingLinkId = editId;
    this.shortcutParentId = parentId;

    const title = document.getElementById("shortcut-modal-title");
    const submitBtn = document.getElementById("shortcut-submit");
    const urlInput = document.getElementById("shortcut-url");
    const nameInput = document.getElementById("shortcut-name");
    const iconUrlInput = document.getElementById("shortcut-icon-url");
    const errorEl = document.getElementById("shortcut-error");
    const urlGroup = document.getElementById("shortcut-url-group");

    if (errorEl) errorEl.textContent = "";

    if (editId) {
      const item = Storage.getItem(editId);
      if (item && item.type === "link") {
        if (title) title.textContent = "Editar atalho";
        if (submitBtn) submitBtn.textContent = "Salvar";
        urlInput.value = item.url || "";
        nameInput.value = item.name || "";
        if (iconUrlInput) iconUrlInput.value = item.icon || "";
        if (urlGroup) urlGroup.style.display = "block";
      }
    } else {
      if (title) title.textContent = "Novo atalho";
      if (submitBtn) submitBtn.textContent = "Salvar atalho";
      urlInput.value = "";
      nameInput.value = "";
      if (iconUrlInput) iconUrlInput.value = "";
      if (urlGroup) urlGroup.style.display = "block";
    }

    urlInput?.dispatchEvent(new Event("input"));
    this.open(this.shortcutOverlay);
  },

  closeShortcutModal() {
    this.editingLinkId = null;
    this.shortcutParentId = null;
    this.close(this.shortcutOverlay);
  },

  saveShortcut() {
    const urlInput = document.getElementById("shortcut-url");
    const nameInput = document.getElementById("shortcut-name");
    const iconUrlInput = document.getElementById("shortcut-icon-url");
    const errorEl = document.getElementById("shortcut-error");

    const name = nameInput.value.trim();
    const iconUrl = iconUrlInput?.value.trim() || null;
    let url;
    try {
      url = Storage.normalizeUrl(urlInput.value);
    } catch {
      if (errorEl) errorEl.textContent = "Informe uma URL válida.";
      return;
    }

    if (!name) {
      if (errorEl) errorEl.textContent = "Informe um nome para exibição.";
      return;
    }

    if (this.editingLinkId) {
      Storage.updateLink(this.editingLinkId, { name, url, icon: iconUrl });
    } else {
      const activeGuide = Storage.getActiveGuide();
      Storage.addLink({
        name,
        url,
        icon: iconUrl,
        parentId: this.shortcutParentId,
        guideId: activeGuide.id,
      });
    }

    this.closeShortcutModal();

    if (this.shortcutParentId && this.currentFolderViewId) {
      this.refreshFolderView(this.currentFolderViewId);
    }

    if (window.App) App.refresh();
  },

  /* ---- Folder Modal ---- */
  bindFolderModal() {
    const form = document.getElementById("form-folder");
    const nameInput = document.getElementById("folder-name");
    const cancelBtn = document.getElementById("folder-cancel");
    const overlay = this.folderOverlay;

    nameInput?.addEventListener("input", () => {
      const previewText = document.getElementById("folder-preview-text");
      if (previewText) {
        previewText.textContent = nameInput.value.trim() || "Nova pasta";
      }
    });

    cancelBtn?.addEventListener("click", () => this.closeFolderModal());
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) this.closeFolderModal();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveFolder();
    });
  },

  openFolderModal({ editId = null } = {}) {
    const nameInput = document.getElementById("folder-name");
    const previewText = document.getElementById("folder-preview-text");
    const previewBox = document.getElementById("folder-preview-box");
    const title = document.getElementById("folder-modal-title");
    const submitBtn = document.getElementById("folder-submit");
    const colorGroup = document.getElementById("folder-color-group");
    const errorEl = document.getElementById("folder-error");

    if (errorEl) errorEl.textContent = "";

    if (editId) {
      const item = Storage.getItem(editId);
      if (item && item.type === "folder") {
        this.editingLinkId = editId;
        if (title) title.textContent = "Editar pasta";
        if (submitBtn) submitBtn.textContent = "Salvar";
        nameInput.value = item.name || "";
        this.selectedFolderColor = item.color || Storage.FOLDER_COLORS[0];
        if (colorGroup) colorGroup.style.display = "block";
        document.querySelectorAll(".color-dot").forEach((d) => {
          d.classList.toggle("is-active", d.dataset.color === this.selectedFolderColor);
        });
        if (previewBox) previewBox.style.backgroundColor = this.selectedFolderColor;
        if (previewText) previewText.textContent = item.name || "Nova pasta";
      }
    } else {
      this.editingLinkId = null;
      if (title) title.textContent = "Criar pasta";
      if (submitBtn) submitBtn.textContent = "Criar pasta";
      if (nameInput) nameInput.value = "";
      this.selectedFolderColor = Storage.FOLDER_COLORS[0];
      if (colorGroup) colorGroup.style.display = "block";
      document.querySelectorAll(".color-dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === 0);
      });
      if (previewBox) previewBox.style.backgroundColor = this.selectedFolderColor;
      if (previewText) previewText.textContent = "Nova pasta";
    }

    this.open(this.folderOverlay);
  },

  closeFolderModal() {
    this.editingLinkId = null;
    this.close(this.folderOverlay);
  },

  saveFolder() {
    const nameInput = document.getElementById("folder-name");
    const errorEl = document.getElementById("folder-error");
    const name = nameInput.value.trim();

    if (!name) {
      if (errorEl) errorEl.textContent = "Informe um nome para a pasta.";
      return;
    }
    if (errorEl) errorEl.textContent = "";

    if (this.editingLinkId) {
      Storage.updateFolder(this.editingLinkId, {
        name,
        color: this.selectedFolderColor,
      });
    } else {
      const activeGuide = Storage.getActiveGuide();
      Storage.addFolder({
        name,
        color: this.selectedFolderColor,
        guideId: activeGuide.id,
      });
    }

    this.closeFolderModal();
    if (window.App) App.refresh();
  },

  openFolderEditModal(folderId) {
    this.openFolderModal({ editId: folderId });
  },

  /* ---- Color Dots ---- */
  bindColorDots() {
    document.querySelectorAll(".color-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        document.querySelectorAll(".color-dot").forEach((d) =>
          d.classList.remove("is-active")
        );
        dot.classList.add("is-active");
        this.selectedFolderColor = dot.dataset.color || Storage.FOLDER_COLORS[0];
        const previewBox = document.getElementById("folder-preview-box");
        if (previewBox) previewBox.style.backgroundColor = this.selectedFolderColor;
      });
    });
  },

  /* ---- Folder View ---- */
  bindFolderViewModal() {
    const overlay = this.folderViewOverlay;
    const closeBtn = document.getElementById("folder-view-close");
    const addBtn = document.getElementById("folder-view-add");

    closeBtn?.addEventListener("click", () => this.closeFolderView());
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) this.closeFolderView();
    });

    addBtn?.addEventListener("click", () => {
      if (this.currentFolderViewId) {
        this.openShortcutModal({ parentId: this.currentFolderViewId });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay?.classList.contains("is-open")) {
        this.closeFolderView();
      }
    });
  },

  _initFolderViewDrag() {
    const grid = document.getElementById("folder-view-grid");
    if (!grid) return;
    DragManager.makeSortable(grid, {
      itemSelector: '.shortcut-item',
      ignoreSelector: '.shortcut-item--add-slot',
      onReorder: (dragId, targetId, position) => {
        const folderId = this.currentFolderViewId;
        if (!folderId) return;
        const folder = Storage.getItem(folderId);
        if (!folder || !folder.children) return;
        const children = folder.children;
        const fromIdx = children.indexOf(dragId);
        const toIdx = children.indexOf(targetId);
        if (fromIdx < 0 || toIdx < 0) return;
        children.splice(fromIdx, 1);
        const newToIdx = children.indexOf(targetId);
        const insertAt = position === 'after' ? newToIdx + 1 : newToIdx;
        children.splice(insertAt, 0, dragId);
        Storage.save();
        this.refreshFolderView(folderId);
      },
    });
  },

  openFolderView(folderId) {
    const folder = Storage.getItem(folderId);
    if (!folder || folder.type !== "folder") return;

    this.currentFolderViewId = folderId;
    document.body.classList.add("is-blurred");

    const title = document.getElementById("folder-view-title");
    const count = document.getElementById("folder-view-count");
    const grid = document.getElementById("folder-view-grid");

    if (title) title.textContent = folder.name;
    const childCount = (folder.children || []).filter((id) => {
      const c = Storage.getItem(id);
      return c && c.type === "link";
    }).length;
    if (count) count.textContent = `${childCount} recurso${childCount !== 1 ? "s" : ""}`;

    Render.renderFolderChildren(folderId, grid, {
      onRemove: (id) => {
        if (window.App) App._handleRemove(id);
      },
      onContextMenu: (id, item, e) => {
        this.showContextMenu(e.clientX, e.clientY, id, item);
      },
      onAddLink: () => {
        this.openShortcutModal({ parentId: folderId });
      },
    });
    this._initFolderViewDrag();
    this.open(this.folderViewOverlay);
  },

  refreshFolderView(folderId) {
    if (this.currentFolderViewId !== folderId) return;
    const folder = Storage.getItem(folderId);
    const count = document.getElementById("folder-view-count");
    const grid = document.getElementById("folder-view-grid");
    if (folder && count) {
      const childCount = (folder.children || []).filter((id) => {
        const c = Storage.getItem(id);
        return c && c.type === "link";
      }).length;
      count.textContent = `${childCount} recurso${childCount !== 1 ? "s" : ""}`;
    }
    Render.renderFolderChildren(folderId, grid, {
      onRemove: (id) => {
        if (window.App) App._handleRemove(id);
      },
      onContextMenu: (id, item, e) => {
        this.showContextMenu(e.clientX, e.clientY, id, item);
      },
      onAddLink: () => {
        this.openShortcutModal({ parentId: folderId });
      },
    });
    this._initFolderViewDrag();
  },

  closeFolderView() {
    const grid = document.getElementById("folder-view-grid");
    if (grid) DragManager.destroy(grid);
    this.currentFolderViewId = null;
    document.body.classList.remove("is-blurred");
    this.close(this.folderViewOverlay);
  },

  /* ---- Settings Modal ---- */
  bindSettingsModal() {
    const form = document.getElementById("form-settings");
    const cancelBtn = document.getElementById("settings-cancel");
    const overlay = document.getElementById("modal-settings");

    cancelBtn?.addEventListener("click", () => this.closeSettingsModal());
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) this.closeSettingsModal();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveSettings();
    });
  },

  openSettingsModal() {
    const settings = Storage.getSettings();

    const clockChk = document.getElementById("settings-clock");
    const searchChk = document.getElementById("settings-search");
    const webChk = document.getElementById("settings-web-search");
    const errorEl = document.getElementById("settings-error");

    if (errorEl) errorEl.textContent = "";
    if (clockChk) clockChk.checked = settings.showClock;
    if (searchChk) searchChk.checked = settings.showSearch;
    if (webChk) webChk.checked = settings.showWebSearch;

    document.querySelectorAll('input[name="sidebar-pos"]').forEach((inp) => {
      inp.checked = inp.value === settings.sidebarPosition;
    });

    const currentTheme = settings.theme || 'ultra-glass-depth';
    document.querySelectorAll('input[name="theme"]').forEach((inp) => {
      inp.checked = inp.value === currentTheme;
    });

    const overlay = document.getElementById("modal-settings");
    this.open(overlay);
  },

  closeSettingsModal() {
    const overlay = document.getElementById("modal-settings");
    this.close(overlay);
  },

  saveSettings() {
    const clockChk = document.getElementById("settings-clock");
    const searchChk = document.getElementById("settings-search");
    const webChk = document.getElementById("settings-web-search");
    const errorEl = document.getElementById("settings-error");

    let sidebarPosition = "left";
    document.querySelectorAll('input[name="sidebar-pos"]').forEach((inp) => {
      if (inp.checked) sidebarPosition = inp.value;
    });

    let theme = "ultra-glass-depth";
    document.querySelectorAll('input[name="theme"]').forEach((inp) => {
      if (inp.checked) theme = inp.value;
    });

    Storage.updateSettings({
      showClock: clockChk?.checked ?? true,
      showSearch: searchChk?.checked ?? true,
      showWebSearch: webChk?.checked ?? true,
      sidebarPosition,
      theme,
    });

    this.closeSettingsModal();

    if (window.App) {
      App.applySettings();
      App.renderSidebar();
    }
  },

  /* ---- Guide Modal ---- */
  bindGuideModal() {
    const form = document.getElementById("form-guide");
    const cancelBtn = document.getElementById("guide-cancel");

    cancelBtn?.addEventListener("click", () => this.closeGuideModal());
    this.guideOverlay?.addEventListener("click", (e) => {
      if (e.target === this.guideOverlay) this.closeGuideModal();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveGuide();
    });
  },

  openGuideModal({ editId = null } = {}) {
    const nameInput = document.getElementById("guide-name");
    const errorEl = document.getElementById("guide-error");
    const title = document.getElementById("guide-modal-title");
    const submitBtn = document.getElementById("guide-submit");

    if (errorEl) errorEl.textContent = "";

    if (editId) {
      const guide = Storage.getData().guides[editId];
      if (guide) {
        this.editingGuideId = editId;
        if (title) title.textContent = "Editar guia";
        if (submitBtn) submitBtn.textContent = "Salvar";
        if (nameInput) nameInput.value = guide.name || "";

        document.querySelectorAll('input[name="guide-icon"]').forEach((inp) => {
          inp.checked = inp.value === guide.icon;
        });
      }
    } else {
      this.editingGuideId = null;
      if (title) title.textContent = "Nova guia";
      if (submitBtn) submitBtn.textContent = "Criar guia";
      if (nameInput) nameInput.value = "";
      document.querySelectorAll('input[name="guide-icon"]').forEach((inp, i) => {
        inp.checked = i === 0;
      });
    }

    this.open(this.guideOverlay);
  },

  closeGuideModal() {
    this.editingGuideId = null;
    this.close(this.guideOverlay);
  },

  saveGuide() {
    const nameInput = document.getElementById("guide-name");
    const errorEl = document.getElementById("guide-error");
    const name = nameInput.value.trim();

    if (!name) {
      if (errorEl) errorEl.textContent = "Informe um nome para a guia.";
      return;
    }
    if (errorEl) errorEl.textContent = "";

    let icon = "star";
    document.querySelectorAll('input[name="guide-icon"]').forEach((inp) => {
      if (inp.checked) icon = inp.value;
    });

    if (this.editingGuideId) {
      Storage.updateGuide(this.editingGuideId, { name, icon });
    } else {
      Storage.addGuide({ name, icon });
    }

    this.closeGuideModal();

    if (window.App) {
      App.renderSidebar();
      App.refresh();
    }
  },
};

window.Modals = Modals;