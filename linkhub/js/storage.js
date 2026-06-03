const STORAGE_KEY = "linkhub-v1";

const GUIDE_ICONS = [
  "home", "work", "public", "theater_comedy",
  "code", "school", "shopping_cart", "music_note",
  "photo_camera", "map", "favorite", "star",
];

const FOLDER_COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#F97316",
  "#8B5CF6",
];

function generateId() {
  return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
}

function generateGuideId() {
  return "guide_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
}

function createSeedData() {
  const google = { type: "link", name: "Google", url: "https://www.google.com", icon: null };
  const youtube = { type: "link", name: "YouTube", url: "https://www.youtube.com", icon: null };
  const github = { type: "link", name: "Github", url: "https://github.com", icon: null };
  const jira = { type: "link", name: "Jira", url: "https://www.atlassian.com/software/jira", icon: null };
  const slack = { type: "link", name: "Slack", url: "https://slack.com", icon: null };
  const notion = { type: "link", name: "Notion", url: "https://www.notion.so", icon: null };
  const gmail = { type: "link", name: "Gmail", url: "https://mail.google.com", icon: null };

  const ids = {
    google: "seed_google", youtube: "seed_youtube", github: "seed_github",
    work: "seed_work", jira: "seed_jira", slack: "seed_slack",
    notion: "seed_notion", gmail: "seed_gmail",
  };

  return {
    version: 2,
    activeGuide: "guide_home",
    guides: {
      guide_home: { id: "guide_home", name: "Home", icon: "home", order: [ids.google, ids.youtube, ids.github, ids.work] },
      guide_work: { id: "guide_work", name: "Work", icon: "work", order: [] },
      guide_social: { id: "guide_social", name: "Social", icon: "public", order: [] },
      guide_entertainment: { id: "guide_entertainment", name: "Entertainment", icon: "theater_comedy", order: [] },
    },
    guideOrder: ["guide_home", "guide_work", "guide_social", "guide_entertainment"],
    items: {
      [ids.google]: google, [ids.youtube]: youtube, [ids.github]: github,
      [ids.work]: { type: "folder", name: "Trabalho", color: FOLDER_COLORS[0], icon: "folder", children: [ids.jira, ids.slack, ids.notion, ids.gmail] },
      [ids.jira]: jira, [ids.slack]: slack, [ids.notion]: notion, [ids.gmail]: gmail,
    },
  };
}

function migrateV1toV2(v1data) {
  const homeId = "guide_home";
  const guides = {
    [homeId]: { id: homeId, name: "Home", icon: "home", order: [...(v1data.rootOrder || [])] },
  };
  const extraGuides = [
    { id: "guide_work", name: "Work", icon: "work" },
    { id: "guide_social", name: "Social", icon: "public" },
    { id: "guide_entertainment", name: "Entertainment", icon: "theater_comedy" },
  ];
  extraGuides.forEach((g) => {
    guides[g.id] = { id: g.id, name: g.name, icon: g.icon, order: [] };
  });
  return {
    version: 2,
    activeGuide: homeId,
    guides,
    guideOrder: [homeId, ...extraGuides.map((g) => g.id)],
    items: v1data.items || {},
  };
}

const Storage = {
  _data: null,

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this._data = JSON.parse(raw);
        if (!this._data.version || this._data.version === 1) {
          this._data = migrateV1toV2(this._data);
          this.save();
        }
        return this._data;
      }
    } catch (e) {
      console.warn("LinkHub: falha ao carregar localStorage", e);
    }
    this._data = createSeedData();
    this.save();
    return this._data;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    } catch (e) {
      console.warn("LinkHub: falha ao salvar", e);
    }
  },

  getData() {
    if (!this._data) this.load();
    return this._data;
  },

  getItem(id) {
    return this.getData().items[id] || null;
  },

  /* ---- Guides ---- */
  getGuides() {
    const data = this.getData();
    return data.guideOrder.map((id) => data.guides[id]).filter(Boolean);
  },

  getActiveGuide() {
    const data = this.getData();
    return data.guides[data.activeGuide] || data.guides[data.guideOrder[0]];
  },

  setActiveGuide(id) {
    const data = this.getData();
    if (data.guides[id]) {
      data.activeGuide = id;
      this.save();
      return true;
    }
    return false;
  },

  addGuide({ name, icon }) {
    const id = generateGuideId();
    const data = this.getData();
    data.guides[id] = { id, name, icon: icon || "star", order: [] };
    data.guideOrder.push(id);
    data.activeGuide = id;
    this.save();
    return id;
  },

  updateGuide(id, { name, icon }) {
    const data = this.getData();
    const guide = data.guides[id];
    if (!guide) return false;
    if (name !== undefined) guide.name = name;
    if (icon !== undefined) guide.icon = icon;
    this.save();
    if (window.App) {
      App.renderSidebar();
    }
    return true;
  },

  removeGuide(id) {
    const data = this.getData();
    if (!data.guides[id] || data.guideOrder.length <= 1) return false;

    const guide = data.guides[id];
    (guide.order || []).forEach((itemId) => this.removeItem(itemId));

    const idx = data.guideOrder.indexOf(id);
    if (idx >= 0) data.guideOrder.splice(idx, 1);
    delete data.guides[id];
    if (data.activeGuide === id) {
      data.activeGuide = data.guideOrder[0];
    }
    this.save();
    return true;
  },

  reorderGuide(fromId, toId, position) {
    const data = this.getData();
    const fromIdx = data.guideOrder.indexOf(fromId);
    const toIdx = data.guideOrder.indexOf(toId);
    if (fromIdx < 0 || toIdx < 0) return;

    data.guideOrder.splice(fromIdx, 1);
    const newToIdx = data.guideOrder.indexOf(toId);
    const insertAt = position === "after" ? newToIdx + 1 : newToIdx;
    data.guideOrder.splice(insertAt, 0, fromId);
    this.save();
    if (window.App) App.renderSidebar();
  },

  getGuideOrder(guideId) {
    const data = this.getData();
    const guide = guideId ? data.guides[guideId] : this.getActiveGuide();
    return guide ? [...guide.order] : [];
  },

  setGuideOrder(order, guideId) {
    const data = this.getData();
    const guide = guideId ? data.guides[guideId] : this.getActiveGuide();
    if (guide) {
      guide.order = order;
      this.save();
    }
  },

  /* ---- Legacy compatibility ---- */
  getRootOrder() {
    return this.getGuideOrder();
  },

  setRootOrder(order) {
    this.setGuideOrder(order);
  },

  /* ---- Items CRUD ---- */
  addLink({ name, url, icon = null, parentId = null, guideId = null }) {
    const id = generateId();
    const item = { type: "link", name, url, icon };
    this.getData().items[id] = item;

    if (parentId) {
      const folder = this.getItem(parentId);
      if (folder && folder.type === "folder") {
        if (!folder.children) folder.children = [];
        folder.children.push(id);
      }
    } else {
      const data = this.getData();
      const gId = guideId || data.activeGuide;
      const guide = data.guides[gId];
      if (guide) guide.order.push(id);
    }

    this.save();
    return id;
  },

  updateLink(id, { name, url, icon }) {
    const item = this.getItem(id);
    if (!item || item.type !== "link") return false;
    if (name !== undefined) item.name = name;
    if (url !== undefined) item.url = url;
    if (icon !== undefined) item.icon = icon;
    this.save();
    return true;
  },

  addFolder({ name, color, icon = "folder", parentId = null, guideId = null }) {
    const id = generateId();
    const item = { type: "folder", name, color: color || FOLDER_COLORS[0], icon, children: [] };
    this.getData().items[id] = item;

    if (parentId) {
      const parent = this.getItem(parentId);
      if (parent && parent.type === "folder") {
        if (!parent.children) parent.children = [];
        parent.children.push(id);
      }
    } else {
      const data = this.getData();
      const gId = guideId || data.activeGuide;
      const guide = data.guides[gId];
      if (guide) guide.order.push(id);
    }

    this.save();
    return id;
  },

  updateFolder(id, { name, color, icon }) {
    const item = this.getItem(id);
    if (!item || item.type !== "folder") return false;
    if (name !== undefined) item.name = name;
    if (color !== undefined) item.color = color;
    if (icon !== undefined) item.icon = icon;
    this.save();
    return true;
  },

  removeItem(id) {
    const data = this.getData();
    const item = data.items[id];
    if (!item) return false;

    if (item.type === "folder" && item.children) {
      item.children.forEach((childId) => this.removeItem(childId));
    }

    Object.values(data.guides).forEach((guide) => {
      guide.order = guide.order.filter((x) => x !== id);
    });

    Object.values(data.items).forEach((it) => {
      if (it.type === "folder" && it.children) {
        it.children = it.children.filter((x) => x !== id);
      }
    });

    delete data.items[id];
    this.save();
    return true;
  },

  exportData() {
    const data = this.getData();
    const clone = JSON.parse(JSON.stringify(data));
    clone._exportedAt = new Date().toISOString();
    clone._version = "linkhub-backup-v1";
    return JSON.stringify(clone, null, 2);
  },

  importData(json) {
    try {
      const data = JSON.parse(json);
      if (!data.version || !data.items || !data.guides || !data.guideOrder) {
        return { success: false, error: "Formato de arquivo inválido." };
      }
      this._data = {
        version: data.version,
        activeGuide: data.activeGuide || data.guideOrder[0],
        guides: data.guides,
        guideOrder: data.guideOrder,
        items: data.items,
      };
      this.save();
      return { success: true };
    } catch (e) {
      return { success: false, error: "Arquivo corrompido ou inválido." };
    }
  },

  getFaviconUrl(url) {
    try {
      let href = url;
      if (!href.startsWith("http")) href = "https://" + href;
      const hostname = new URL(href).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch {
      return null;
    }
  },

  normalizeUrl(url) {
    let href = url.trim();
    if (!href) throw new Error("URL vazia");
    if (!/^https?:\/\//i.test(href)) href = "https://" + href;
    new URL(href);
    return href;
  },

  FOLDER_COLORS,
  GUIDE_ICONS,
};

window.Storage = Storage;