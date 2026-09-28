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
      timelineEyebrow: "Country journal",
      timelineTitle: "Visits, newest first",
      timelineText: "Each point is a separate visit. The line moves upward from the earliest journey to the latest.",
      visitLabel: "Visit",
      photosLabel: "photographs",
      emptyPhotos: "Add photographs to this visit.",
      mapLink: "Return to the world map",
      footer: "A personal travel archive",
      missingTitle: "Journal not found",
      missingText: "This country does not have a journal entry yet. Return to the map and choose a country shown in coral.",
      imageLabel: "Open photograph"
    },
    zh: {
      backToMap: "返回世界地图",
      sampleBadge: "示例内容——请替换为你的照片与文字",
      timelineEyebrow: "国家游记",
      timelineTitle: "多次到访 · 最近一次在上",
      timelineText: "每个节点代表一次独立旅行；时间线从最早的旅程向上延伸至最近一次。",
      visitLabel: "旅程",
      photosLabel: "张照片",
      emptyPhotos: "在这次旅行中加入照片。",
      mapLink: "返回世界地图",
      footer: "一份个人旅行档案",
      missingTitle: "没有找到这篇游记",
      missingText: "这个国家还没有游记。请返回地图，选择一个珊瑚色的国家。",
      imageLabel: "打开照片"
    }
  };

  const requested = new URLSearchParams(window.location.search).get("country") || "";
  const normalizedRequest = requested === "158" ? "156" : requested;
  const entryId = entries[normalizedRequest]
    ? normalizedRequest
    : Object.keys(entries).find((id) => entries[id].slug === normalizedRequest);
  const entry = entryId ? entries[entryId] : null;

  let language = localStorage.getItem("wanderAtlasLanguage") || "en";
  let activePhoto = 0;
  let galleryPhotos = [];
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

  function renderPhotoGrid(visit) {
    const photos = Array.isArray(visit.photos) ? visit.photos : [];
    if (!photos.length) {
      return `<p class="visit-empty-photos">${escapeHtml(copy[language].emptyPhotos)}</p>`;
    }

    const startIndex = galleryPhotos.length;
    galleryPhotos.push(...photos);
    const columnCount = Math.min(photos.length, 5);

    const buttons = photos.map((photo, index) => {
      const caption = getText(photo.caption);
      const alt = getText(photo.alt) || getText(visit.place) || getText(entry.name);
      return `
        <button
          class="visit-photo"
          type="button"
          data-photo-index="${startIndex + index}"
          aria-label="${escapeHtml(`${copy[language].imageLabel}: ${alt}`)}"
        >
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(alt)}" loading="lazy" />
          ${caption ? `<span>${escapeHtml(caption)}</span>` : ""}
        </button>
      `;
    }).join("");

    return `
      <div class="visit-photo-grid columns-${columnCount}" aria-label="${escapeHtml(`${photos.length} ${copy[language].photosLabel}`)}">
        ${buttons}
      </div>
    `;
  }

  function renderJourney() {
    if (!entry) {
      renderError();
      return;
    }

    document.title = `${getText(entry.name)} — ${getText(site.title) || "Wander Atlas"}`;
    galleryPhotos = [];

    const visits = Array.isArray(entry.visits) ? entry.visits : [];
    const visitItems = visits.map((visit, index) => {
      const chronologicalNumber = String(visits.length - index).padStart(2, "0");
      return `
        <article class="timeline-entry">
          <div class="visit-meta">
            <span class="visit-number">${escapeHtml(copy[language].visitLabel)} ${chronologicalNumber}</span>
            <time>${escapeHtml(getText(visit.date))}</time>
            <p>${escapeHtml(getText(visit.place))}</p>
          </div>

          <div class="visit-axis" aria-hidden="true"><span></span></div>

          <div class="visit-content">
            ${renderPhotoGrid(visit)}
            <p class="visit-text">${escapeHtml(getText(visit.text))}</p>
          </div>
        </article>
      `;
    }).join("");

    const coverAlt = getText(entry.highlights?.[0]?.alt) || getText(entry.name);

    root.innerHTML = `
      <article>
        <section class="journey-hero">
          <img class="journey-hero-image" src="${escapeHtml(entry.cover)}" alt="${escapeHtml(coverAlt)}" />
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

        <section class="timeline-section" aria-labelledby="timeline-title">
          <header class="timeline-heading">
            <p class="eyebrow">${escapeHtml(copy[language].timelineEyebrow)}</p>
            <h2 id="timeline-title">${escapeHtml(copy[language].timelineTitle)}</h2>
            <p>${escapeHtml(copy[language].timelineText)}</p>
          </header>
          <div class="journal-timeline">
            ${visitItems}
          </div>
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
    const photo = galleryPhotos[activePhoto];
    if (!photo) return;
    lightboxImage.src = photo.src;
    lightboxImage.alt = getText(photo.alt);
    lightboxCaption.textContent = getText(photo.caption);
  }

  function openLightbox(index) {
    if (!galleryPhotos[index]) return;
    activePhoto = index;
    updateLightbox();
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  }

  function moveLightbox(direction) {
    if (!galleryPhotos.length) return;
    activePhoto = (activePhoto + direction + galleryPhotos.length) % galleryPhotos.length;
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
