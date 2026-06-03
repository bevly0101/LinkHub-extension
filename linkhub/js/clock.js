const Clock = {
  el: null,
  intervalId: null,

  init(selector) {
    this.el = document.querySelector(selector);
    if (!this.el) return;
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  },

  tick() {
    if (!this.el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    this.el.textContent = `${h}:${m}`;
  },
};

window.Clock = Clock;
