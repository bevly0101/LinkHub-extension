const Search = {
  input: null,
  onFilter: null,

  init(inputSelector, onFilter) {
    this.input = document.querySelector(inputSelector);
    this.onFilter = onFilter;
    if (!this.input) return;

    this.input.addEventListener("input", () => {
      if (this.onFilter) this.onFilter(this.input.value);
    });
  },

  getQuery() {
    return this.input ? this.input.value : "";
  },

  clear() {
    if (this.input) this.input.value = "";
  },
};

window.Search = Search;
