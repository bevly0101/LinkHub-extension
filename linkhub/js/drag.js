const DragManager = {
  _instances: new Map(),

  makeSortable(containerEl, options = {}) {
    if (!containerEl) return;
    this.destroy(containerEl);

    const state = {
      containerEl,
      opts: {
        itemSelector: '.shortcut-item',
        ignoreSelector: '.shortcut-item--add-slot',
        ...options,
      },
      dragId: null,
      _lastTargetId: null,
      _lastPosition: null,
      _placeholderEl: null,
    };

    const clearAll = () => {
      containerEl.querySelectorAll('.is-dragging-source, .is-drop-target, .is-drop-before, .is-drop-after').forEach((el) => {
        el.classList.remove('is-dragging-source', 'is-drop-target', 'is-drop-before', 'is-drop-after');
      });
      if (state._placeholderEl) {
        state._placeholderEl.remove();
        state._placeholderEl = null;
      }
      state._lastTargetId = null;
      state._lastPosition = null;
    };

    const getPosition = (item, cx, cy) => {
      const rect = item.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const isHorizontal = rect.width < rect.height * 1.5;
      return isHorizontal
        ? (cx < midX ? 'before' : 'after')
        : (cy < rect.top + rect.height / 2 ? 'before' : 'after');
    };

    const h = {
      onDragStart: (e) => {
        const item = e.target.closest(state.opts.itemSelector);
        if (!item || !item.dataset.id) return;
        if (state.opts.ignoreSelector && item.matches(state.opts.ignoreSelector)) return;

        state.dragId = item.dataset.id;
        DragManager._activeDragId = item.dataset.id;
        item.classList.add('is-dragging-source');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.dataset.id);
      },

      onDragOver: (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (!state.dragId) return;

        const item = e.target.closest(state.opts.itemSelector);
        if (!item || !item.dataset.id || item.dataset.id === state.dragId) return;
        if (state.opts.ignoreSelector && item.matches(state.opts.ignoreSelector)) return;

        const targetId = item.dataset.id;
        const position = getPosition(item, e.clientX, e.clientY);

        if (state._lastTargetId === targetId && state._lastPosition === position) return;
        state._lastTargetId = targetId;
        state._lastPosition = position;

        containerEl.querySelectorAll('.is-drop-target, .is-drop-before, .is-drop-after').forEach((el) => {
          el.classList.remove('is-drop-target', 'is-drop-before', 'is-drop-after');
        });

        item.classList.add('is-drop-target', 'is-drop-' + position);

        if (!state._placeholderEl) {
          const baseClass = state.opts.itemSelector.replace('.', '');
          state._placeholderEl = document.createElement('div');
          state._placeholderEl.className = baseClass + ' drag-placeholder';
          state._placeholderEl.style.pointerEvents = 'none';
        }
        if (position === 'before') {
          item.parentNode.insertBefore(state._placeholderEl, item);
        } else {
          item.parentNode.insertBefore(state._placeholderEl, item.nextElementSibling);
        }
      },

      onDragLeave: (e) => {
        if (!containerEl.contains(e.relatedTarget)) {
          containerEl.querySelectorAll('.is-drop-target, .is-drop-before, .is-drop-after').forEach((el) => {
            el.classList.remove('is-drop-target', 'is-drop-before', 'is-drop-after');
          });
          if (state._placeholderEl) {
            state._placeholderEl.remove();
            state._placeholderEl = null;
          }
          state._lastTargetId = null;
          state._lastPosition = null;
        }
      },

      onDrop: (e) => {
        e.preventDefault();
        const dragId = state.dragId;
        const targetId = state._lastTargetId;
        const position = state._lastPosition;
        if (!dragId || !targetId || dragId === targetId) return;
        if (state.opts.onReorder) {
          state.opts.onReorder(dragId, targetId, position);
        }
      },

      onDragEnd: (e) => {
        clearAll();
        state.dragId = null;
        DragManager._activeDragId = null;
      },
    };

    state.handlers = h;

    containerEl.addEventListener('dragstart', h.onDragStart);
    containerEl.addEventListener('dragover', h.onDragOver);
    containerEl.addEventListener('dragleave', h.onDragLeave);
    containerEl.addEventListener('drop', h.onDrop);
    containerEl.addEventListener('dragend', h.onDragEnd);

    this._instances.set(containerEl, state);
  },

  destroy(containerEl) {
    const state = this._instances.get(containerEl);
    if (!state) return;
    const h = state.handlers;
    containerEl.removeEventListener('dragstart', h.onDragStart);
    containerEl.removeEventListener('dragover', h.onDragOver);
    containerEl.removeEventListener('dragleave', h.onDragLeave);
    containerEl.removeEventListener('drop', h.onDrop);
    containerEl.removeEventListener('dragend', h.onDragEnd);
    if (state._placeholderEl) state._placeholderEl.remove();
    this._instances.delete(containerEl);
  },
};

window.DragManager = DragManager;
