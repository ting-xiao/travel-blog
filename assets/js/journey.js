(() => {
  "use strict";

  const entries = window.TRAVEL_ENTRIES || {};
  const site = window.TRAVEL_SITE || {};
  const root = document.querySelector("#journey-content");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  const languageButtons = [...document.querySelectorAll("[data-language]")];

  const copy = {
    en: {
      backToMap: "Back to the map",
      sampleBadge: "Sample content — replace with your own",
      dateLabel: "When",
      placeLabel: "Places",
      moodLabel: "Mood",
      openingLabel: "Field notes",
      galleryTitle: "Highlights",
      galleryText: "Select a photograph to view it at full size.",
      closingLabel: "Closing note",
      mapLink: "Return to the world map",
      footer: "A personal travel archive",
      missingTitle: "Journal not found",
      missingText: "This country does not have a journal entry yet. Return to the map and choose a country shown in coral.",
      imageLabel: "Open photograph"
    },
    zh: {
      backToMap: "返回世界地图",
      sampleBadge: "示例内容——请替换为你的照片与文字",
      dateLabel: "时间",
      placeLabel: "地点",
      moodLabel: "感受",
      openingLabel: "旅行手记",
      galleryTitle: "精选照片",
      galleryText: "点击照片可以全屏查看。",
      closingLabel: "结尾",
      mapLink: "返回世界地图",
      footer: "一份个人旅行档案",
      missingTitle: "没有找到这篇游记",
      missingText: "这个国家还没有游记。请返回地图，选择一个珊瑚色的国家。",
      imageLabel: "打开照片"
    }
  };

  const requested = new URLSearchParams(window.location.search).get("country") || "";
  const entryId = entries[requested]
    ? requested
    : Object.keys(entries).find((id) => entries[id].slug === requested);
  const entry = entryId ? entries[entryId] : null;

  let language = localStorage.getItem("wanderAtlasLanguage") || "en";
  let activePhoto = 0;
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

  const icon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

  function applySharedLanguage() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    localStorage.setItem("wanderAtlasLanguage", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (copy[language][key]) element.textContent = copy[language][key];
    });

    document.querySelectorAll("[data-site-title]").forEach((element) => {
      element.textContent = getText(site.title) || "Wander Atlas";
    });

    languageButtons.forEach((button) => {
      const isActive = button.dataset.language === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderError() {
    root.innerHTML = `
      <section class="journey-error">
        <p class="eyebrow">404</p>
        <h1>${escapeHtml(copy[language].missingTitle)}</h1>
        <p>${escapeHtml(copy[language].missingText)}</p>
        <a href="index.html">${escapeHtml(copy[language].backToMap)}</a>
      </section>
    `;
  }

  function renderJourney() {
    if (!entry) {
      renderError();
      return;
    }

    document.title = `${getText(entry.name)} — ${getText(site.title) || "Wander Atlas"}`;

    const storySections = entry.sections.map((section, index) => `
      <article class="story-section">
        <span class="story-number">0${index + 1}</span>
        <h2>${escapeHtml(getText(section.title))}</h2>
        <p>${escapeHtml(getText(section.body))}</p>
      </article>
    `).join("");

    const gallery = entry.highlights.map((photo, index) => {
      const caption = getText(photo.caption);
      const alt = getText(photo.alt);
      return `
        <button
          class="photo-button"
          type="button"
          data-photo-index="${index}"
          data-caption="${escapeHtml(caption)}"
          aria-label="${escapeHtml(`${copy[language].imageLabel}: ${alt}`)}"
        >
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(alt)}" loading="lazy" />
        </button>
      `;
    }).join("");

    root.innerHTML = `
      <article>
        <section class="journey-hero">
          <img class="journey-hero-image" src="${escapeHtml(entry.cover)}" alt="${escapeHtml(getText(entry.highlights[0]?.alt) || getText(entry.name))}" />
          <div class="journey-hero-content">
            <p class="journey-kicker">
              <span class="flag" aria-hidden="true">${escapeHtml(entry.flag || "◎")}</span>
              <span>${escapeHtml(getText(entry.kicker))}</span>
              ${entry.sample ? `<span>· ${escapeHtml(copy[language].sampleBadge)}</span>` : ""}
            </p>
            <h1>${escapeHtml(getText(entry.name))}</h1>
            <p class="journey-hero-summary">${escapeHtml(getText(entry.summary))}</p>
          </div>
        </section>

        <section class="journey-meta-wrap" aria-label="Journey details">
          <div class="journey-meta">
            <div class="journey-meta-item">
              ${icon("calendar")}
              <div><span>${escapeHtml(copy[language].dateLabel)}</span><strong>${escapeHtml(getText(entry.dates))}</strong></div>
            </div>
            <div class="journey-meta-item">
              ${icon("pin")}
              <div><span>${escapeHtml(copy[language].placeLabel)}</span><strong>${escapeHtml(getText(entry.places))}</strong></div>
            </div>
            <div class="journey-meta-item">
              ${icon("spark")}
              <div><span>${escapeHtml(copy[language].moodLabel)}</span><strong>${escapeHtml(getText(entry.mood))}</strong></div>
            </div>
          </div>
        </section>

        <section class="journal-content">
          <div class="journal-opening">
            <p class="journal-opening-label">${escapeHtml(copy[language].openingLabel)}</p>
            <p class="journal-lead">${escapeHtml(getText(entry.lead))}</p>
          </div>
          <div class="story-sections">${storySections}</div>
        </section>

        <section class="gallery-section" aria-labelledby="gallery-title">
          <div class="gallery-inner">
            <div class="gallery-heading">
              <h2 id="gallery-title">${escapeHtml(copy[language].galleryTitle)}</h2>
              <p>${escapeHtml(copy[language].galleryText)}</p>
            </div>
            <div class="photo-grid">${gallery}</div>
          </div>
        </section>

        <section class="closing-section" aria-label="${escapeHtml(copy[language].closingLabel)}">
          <blockquote>${escapeHtml(getText(entry.closing))}</blockquote>
        </section>

        <footer class="journey-footer">
          <span>${escapeHtml(copy[language].footer)} · ${escapeHtml(getText(site.owner))}</span>
          <a href="index.html">${icon("arrow-left")}<span>${escapeHtml(copy[language].mapLink)}</span></a>
        </footer>
      </article>
    `;

    document.querySelectorAll("[data-photo-index]").forEach((button) => {
      button.addEventListener("click", () => openLightbox(Number(button.dataset.photoIndex)));
    });
  }

  function updateLightbox() {
    if (!entry) return;
    const photo = entry.highlights[activePhoto];
    lightboxImage.src = photo.src;
    lightboxImage.alt = getText(photo.alt);
    lightboxCaption.textContent = getText(photo.caption);
  }

  function openLightbox(index) {
    activePhoto = index;
    updateLightbox();
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  }

  function moveLightbox(direction) {
    if (!entry) return;
    activePhoto = (activePhoto + direction + entry.highlights.length) % entry.highlights.length;
    updateLightbox();
  }

  document.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
  document.querySelector("[data-lightbox-prev]").addEventListener("click", () => moveLightbox(-1));
  document.querySelector("[data-lightbox-next]").addEventListener("click", () => moveLightbox(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      language = button.dataset.language;
      applySharedLanguage();
      renderJourney();
      if (lightbox.open) updateLightbox();
    });
  });

  applySharedLanguage();
  renderJourney();
})();
