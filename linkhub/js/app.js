const App = {
  isEditMode: false,

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
    if (!wrap || !input || !form) return;

    const collapse = () => {
      wrap.classList.remove('is-expanded');
      overlay.classList.remove('is-visible');
      document.body.classList.remove('modal-open');
      input.blur();
    };

    const expand = () => {
      if (this.isEditMode) return;
      wrap.classList.add('is-expanded');
      overlay.classList.add('is-visible');
      document.body.classList.add('modal-open');
      setTimeout(() => input.focus(), 80);
    };

    input.addEventListener('focus', () => {
      if (!wrap.classList.contains('is-expanded')) expand();
    });

    overlay.addEventListener('click', collapse);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrap.classList.contains('is-expanded')) {
        collapse();
      }
    });

    form.addEventListener('submit', () => {
      const q = input.value.trim();
      if (!q) {
        input.focus();
        return;
      }
      setTimeout(() => collapse(), 300);
    });
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