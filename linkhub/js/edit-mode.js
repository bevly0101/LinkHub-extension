const EditMode = {
  removeItem(id) {
    const el = document.querySelector(`.shortcut-item--edit[data-id="${id}"]`);
    if (el) {
      el.classList.add("is-removing");
      setTimeout(() => {
        Storage.removeItem(id);
        if (window.App) App.refresh();
      }, 300);
    } else {
      Storage.removeItem(id);
      if (window.App) App.refresh();
    }
  },
};

window.EditMode = EditMode;
