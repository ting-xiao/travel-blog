(() => {
  "use strict";

  const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  const entries = window.TRAVEL_ENTRIES || {};
  const site = window.TRAVEL_SITE || {};
  const countryLabels = {
    "156": { en: "China", zh: "中国" }
  };

  const copy = {
    en: {
      mapEyebrow: "Travel journal",
      mapHeading: "Choose a country",
      mapInstruction: "Select any country to see its journal preview.",
      loading: "Drawing the map…",
      loadError: "The map could not load. Check your connection and refresh the page.",
      hasStory: "Journal available",
      noStory: "No entry yet",
      mapHint: "Drag to move · scroll to zoom",
      footer: "Built as a living archive—one place, photograph, and reflection at a time.",
      introTitle: "Start with the map",
      introText: "Select a country to open a short preview. Countries in coral already have a journal entry.",
      journeyCount: "sample journal entries ready to replace",
      sampleBadge: "Sample content",
      openJournal: "Open the full journal",
      emptyTitle: "No story here—yet",
      emptyText: "This country is ready for photographs, places, and the thoughts you want to remember.",
      emptyHint: "Use this Map ID as the entry key in assets/js/travel-data.js.",
      mapId: "Map ID",
      close: "Close preview"
    },
    zh: {
      mapEyebrow: "旅行记录",
      mapHeading: "选择一个国家",
      mapInstruction: "点击任意国家，查看它的旅行摘要。",
      loading: "正在绘制地图…",
      loadError: "地图未能加载。请检查网络连接后刷新页面。",
      hasStory: "已有游记",
      noStory: "尚未记录",
      mapHint: "拖动地图 · 滚动缩放",
      footer: "把它作为一份持续生长的档案：一个地点、一张照片、一段感受。",
      introTitle: "从地图开始",
      introText: "选择一个国家打开旅行摘要。珊瑚色国家已经包含一篇游记。",
      journeyCount: "个可替换的示例游记",
      sampleBadge: "示例内容",
      openJournal: "阅读全文与照片",
      emptyTitle: "这里还没有故事",
      emptyText: "这个国家正在等待你的照片、地点和想要留下的感受。",
      emptyHint: "在 assets/js/travel-data.js 中使用这个 Map ID 新增条目。",
      mapId: "地图编号",
      close: "关闭摘要"
    }
  };

  const panel = document.querySelector("#country-panel");
  const panelContent = document.querySelector("#panel-content");
  const panelClose = document.querySelector("#panel-close");
  const mapStatus = document.querySelector("#map-status");
  const tooltip = document.querySelector("#map-tooltip");
  const languageButtons = [...document.querySelectorAll("[data-language]")];

  let language = localStorage.getItem("wanderAtlasLanguage") || "en";
  let currentFeature = null;
  let countrySelection = null;
  let mapSvg = null;
  let mapGroup = null;
  let zoomBehavior = null;

  if (!copy[language]) language = "en";

  const getText = (value) => {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[language] || value.en || value.zh || "";
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const normalizeId = (value) => {
    const id = String(value ?? "");
    return /^\d+$/.test(id) ? id.padStart(3, "0") : id;
  };

  const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

  function countryName(feature) {
    const id = normalizeId(feature.id);
    const entry = entries[id];
    return entry ? getText(entry.name) : getText(countryLabels[id]) || feature.properties?.name || id;
  }

  function applyLanguage() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    localStorage.setItem("wanderAtlasLanguage", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (copy[language][key]) element.textContent = copy[language][key];
    });

    document.querySelectorAll("[data-site-title]").forEach((element) => {
      element.textContent = getText(site.title) || "Wander Atlas";
    });
    document.querySelectorAll("[data-owner]").forEach((element) => {
      element.textContent = getText(site.owner) || "Your name";
    });
    document.querySelectorAll("[data-site-intro]").forEach((element) => {
      element.textContent = getText(site.introduction);
    });

    languageButtons.forEach((button) => {
      const isActive = button.dataset.language === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    panelClose.setAttribute("aria-label", copy[language].close);

    if (countrySelection) {
      countrySelection.attr("aria-label", (feature) => countryName(feature));
    }

    if (currentFeature) renderCountry(currentFeature);
    else renderIntro();
  }

  function renderIntro() {
    panel.classList.remove("is-open");
    panelContent.innerHTML = `
      <div class="panel-intro">
        <div>
          <div class="panel-orbit" aria-hidden="true"></div>
          <h2>${escapeHtml(copy[language].introTitle)}</h2>
          <p>${escapeHtml(copy[language].introText)}</p>
        </div>
        <p class="panel-count">
          <strong>${Object.keys(entries).length}</strong>
          ${escapeHtml(copy[language].journeyCount)}
        </p>
      </div>
    `;
  }

  function renderCountry(feature) {
    const id = normalizeId(feature.id);
    const entry = entries[id];
    const fallbackName = countryName(feature);
    panel.classList.add("is-open");

    if (!entry) {
      panelContent.innerHTML = `
        <div class="empty-panel">
          <div>
            <p class="eyebrow">${escapeHtml(fallbackName)}</p>
            <h2>${escapeHtml(copy[language].emptyTitle)}</h2>
            <p>${escapeHtml(copy[language].emptyText)}</p>
            <span class="empty-map-id">${escapeHtml(copy[language].mapId)}: ${escapeHtml(id)}</span>
          </div>
          <p class="empty-note">${escapeHtml(copy[language].emptyHint)}</p>
        </div>
      `;
      return;
    }

    const thumbnails = (entry.highlights || []).slice(0, 3).map((photo) => `
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(getText(photo.alt))}" loading="lazy" />
    `).join("");

    panelContent.innerHTML = `
      <article class="country-preview">
        <div class="preview-cover">
          <img src="${escapeHtml(entry.cover)}" alt="${escapeHtml(getText(entry.highlights?.[0]?.alt) || getText(entry.name))}" />
          <div class="preview-country-mark">
            <span aria-hidden="true">${escapeHtml(entry.flag || "◎")}</span>
            <span>${escapeHtml(getText(entry.kicker))}</span>
          </div>
        </div>
        <div class="preview-body">
          ${entry.sample ? `<span class="sample-badge">${escapeHtml(copy[language].sampleBadge)}</span>` : ""}
          <h2>${escapeHtml(getText(entry.name))}</h2>
          <p class="preview-summary">${escapeHtml(getText(entry.summary))}</p>
          <ul class="preview-meta">
            <li>${icon("calendar")}<span>${escapeHtml(getText(entry.dates))}</span></li>
            <li>${icon("pin")}<span>${escapeHtml(getText(entry.places))}</span></li>
            <li>${icon("spark")}<span>${escapeHtml(getText(entry.mood))}</span></li>
          </ul>
          <div class="preview-thumbnails">${thumbnails}</div>
          <a class="journal-link" href="journey.html?country=${encodeURIComponent(id)}">
            <span>${escapeHtml(copy[language].openJournal)}</span>
            ${icon("arrow")}
          </a>
        </div>
      </article>
    `;
  }

  function selectCountry(event, feature) {
    currentFeature = feature;
    countrySelection?.classed("is-selected", (candidate) => candidate === feature);
    renderCountry(feature);
  }

  function showTooltip(event, feature) {
    tooltip.textContent = countryName(feature);
    tooltip.hidden = false;
    moveTooltip(event);
  }

  function moveTooltip(event) {
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  async function drawMap() {
    try {
      if (!window.d3 || !window.topojson) throw new Error("Map libraries unavailable");

      const response = await fetch(WORLD_URL);
      if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
      const topology = await response.json();
      const allCountries = topojson.feature(topology, topology.objects.countries).features;
      const topologyCountries = topology.objects.countries.geometries || [];
      const chinaParts = topologyCountries.filter((geometry) => {
        const id = normalizeId(geometry.id);
        return id === "156" || id === "158";
      });
      const mergedChinaGeometry = chinaParts.length
        ? topojson.merge(topology, chinaParts)
        : null;
      const countries = allCountries
        .filter((feature) => {
          const id = normalizeId(feature.id);
          return id !== "010" && id !== "158";
        })
        .map((feature) => {
          if (normalizeId(feature.id) !== "156" || !mergedChinaGeometry) return feature;
          return {
            type: "Feature",
            id: "156",
            properties: { ...feature.properties, name: "China" },
            geometry: mergedChinaGeometry
          };
        });
      const collection = { type: "FeatureCollection", features: countries };

      mapSvg = d3.select("#map-svg");
      const projection = d3.geoNaturalEarth1().fitExtent([[28, 22], [1072, 588]], collection);
      const path = d3.geoPath(projection);
      const graticule = d3.geoGraticule10();

      mapGroup = mapSvg.append("g").attr("class", "map-pan-layer");
      mapGroup.append("path")
        .datum(graticule)
        .attr("class", "map-graticule")
        .attr("d", path);

      countrySelection = mapGroup.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("class", (feature) => `country${entries[normalizeId(feature.id)] ? " has-entry" : ""}`)
        .attr("d", path)
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr("aria-label", (feature) => countryName(feature))
        .attr("data-country-id", (feature) => normalizeId(feature.id))
        .on("click", selectCountry)
        .on("keydown", (event, feature) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectCountry(event, feature);
          }
        })
        .on("pointerenter", showTooltip)
        .on("pointermove", moveTooltip)
        .on("pointerleave", hideTooltip)
        .on("focus", (event, feature) => {
          tooltip.textContent = countryName(feature);
          tooltip.hidden = false;
          const box = event.currentTarget.getBoundingClientRect();
          tooltip.style.left = `${box.left + box.width / 2}px`;
          tooltip.style.top = `${box.top + box.height / 2}px`;
        })
        .on("blur", hideTooltip);

      zoomBehavior = d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent([[-120, -80], [1220, 690]])
        .on("zoom", (event) => mapGroup.attr("transform", event.transform));

      mapSvg.call(zoomBehavior).on("dblclick.zoom", null);
      mapStatus.classList.add("is-hidden");
    } catch (error) {
      console.error(error);
      mapStatus.classList.add("is-error");
      mapStatus.innerHTML = `<span>${escapeHtml(copy[language].loadError)}</span>`;
    }
  }

  document.querySelector("#zoom-in").addEventListener("click", () => {
    if (mapSvg && zoomBehavior) mapSvg.call(zoomBehavior.scaleBy, 1.45);
  });

  document.querySelector("#zoom-out").addEventListener("click", () => {
    if (mapSvg && zoomBehavior) mapSvg.call(zoomBehavior.scaleBy, 0.69);
  });

  document.querySelector("#zoom-reset").addEventListener("click", () => {
    if (mapSvg && zoomBehavior) mapSvg.call(zoomBehavior.transform, d3.zoomIdentity);
  });

  panelClose.addEventListener("click", () => {
    currentFeature = null;
    countrySelection?.classed("is-selected", false);
    renderIntro();
  });

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      language = button.dataset.language;
      applyLanguage();
    });
  });

  applyLanguage();
  drawMap();
})();
