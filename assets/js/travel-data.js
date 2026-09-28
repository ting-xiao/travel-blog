/*
  EDIT THIS FILE TO ADD YOUR OWN JOURNEYS.

  1. Each country has one map entry.
  2. Add as many objects as you need inside its visits array.
  3. Keep visits in newest-first order so the timeline runs upward in time.
  4. Each visit can contain any number of photographs; rows wrap after five.
  5. Set sample: false when the entry contains your real content.

  Map note: IDs 156 and 158 are displayed and handled together as China (156).
*/

window.TRAVEL_SITE = {
  title: {
    en: "Wander Atlas",
    zh: "旅迹地图"
  },
  owner: {
    en: "Your name",
    zh: "你的名字"
  },
  introduction: {
    en: "A personal atlas of places, photographs, and the thoughts that stayed with me.",
    zh: "一部收集地点、照片，以及旅途中留下的感受的个人地图。"
  }
};

const SAMPLE_PHOTOS = {
  harbor: {
    src: "assets/images/sample-harbor.webp",
    alt: { en: "A quiet harbor at sunrise", zh: "清晨安静的港湾" },
    caption: { en: "A quiet beginning by the water.", zh: "从水边安静地开始。" }
  },
  train: {
    src: "assets/images/sample-train.webp",
    alt: { en: "Landscape seen through a train window", zh: "从火车窗外看到的风景" },
    caption: { en: "The view between destinations.", zh: "目的地之间的风景。" }
  },
  coast: {
    src: "assets/images/sample-coast.webp",
    alt: { en: "A coastal path at dusk", zh: "黄昏时的海岸小径" },
    caption: { en: "The path at the end of the day.", zh: "一天结束时的海岸小路。" }
  }
};

window.TRAVEL_ENTRIES = {
  "208": {
    slug: "denmark",
    sample: true,
    flag: "🇩🇰",
    name: { en: "Denmark", zh: "丹麦" },
    kicker: { en: "Sample country journal", zh: "示例国家游记" },
    dates: { en: "2 sample visits", zh: "2 次示例旅行" },
    places: { en: "Copenhagen · the coast", zh: "哥本哈根 · 海岸" },
    mood: { en: "Slow mornings", zh: "缓慢的清晨" },
    summary: {
      en: "A country journal can hold repeated visits. Each point on the timeline keeps its own date, place, photographs, and reflection.",
      zh: "同一个国家可以记录多次到访。时间线上的每个节点，都拥有独立的日期、地点、照片和文字。"
    },
    cover: "assets/images/sample-harbor.webp",
    highlights: [SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.coast],
    visits: [
      {
        date: { en: "Spring 2026 · sample", zh: "2026 年春 · 示例" },
        place: { en: "Copenhagen & Helsingør", zh: "哥本哈根与赫尔辛格" },
        photos: [
          SAMPLE_PHOTOS.harbor,
          SAMPLE_PHOTOS.train,
          SAMPLE_PHOTOS.coast,
          SAMPLE_PHOTOS.harbor,
          SAMPLE_PHOTOS.train,
          SAMPLE_PHOTOS.coast,
          SAMPLE_PHOTOS.harbor
        ],
        text: {
          en: "This sample visit contains seven photographs to demonstrate automatic wrapping after the fifth image. Replace them with any number of your own photographs, then write the memory or reflection for this visit here.",
          zh: "这次示例旅行放了七张照片，用来展示第五张之后自动换行的效果。你可以替换成任意数量的照片，并在这里写下这一次旅行的记忆或感受。"
        }
      },
      {
        date: { en: "Autumn 2024 · sample", zh: "2024 年秋 · 示例" },
        place: { en: "Copenhagen", zh: "哥本哈根" },
        photos: [SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.coast, SAMPLE_PHOTOS.harbor],
        text: {
          en: "An earlier visit sits lower on the line. Keeping visits separate lets the same country accumulate different seasons, routes, and perspectives over time.",
          zh: "更早的一次旅行位于时间线下方。把每次到访分开记录，可以让同一个国家逐渐积累不同季节、路线与视角。"
        }
      }
    ]
  },

  "752": {
    slug: "sweden",
    sample: true,
    flag: "🇸🇪",
    name: { en: "Sweden", zh: "瑞典" },
    kicker: { en: "Sample country journal", zh: "示例国家游记" },
    dates: { en: "2 sample visits", zh: "2 次示例旅行" },
    places: { en: "Cities · forests · trains", zh: "城市 · 森林 · 火车" },
    mood: { en: "In motion", zh: "在路上" },
    summary: {
      en: "Separate visits can follow different routes while remaining together on one country page.",
      zh: "不同路线、不同时间的旅行，可以在同一个国家页面中分别记录并彼此连接。"
    },
    cover: "assets/images/sample-train.webp",
    highlights: [SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.coast, SAMPLE_PHOTOS.harbor],
    visits: [
      {
        date: { en: "Summer 2025 · sample", zh: "2025 年夏 · 示例" },
        place: { en: "Norrköping", zh: "北雪平" },
        photos: [SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.coast],
        text: {
          en: "Use one node for one visit, even when it lasts only a day. The date and place stay compact on the left while the photographs and writing have more space on the right.",
          zh: "即使只停留一天，也可以作为一个独立节点。左侧简洁记录时间与地点，右侧则留给照片和文字。"
        }
      },
      {
        date: { en: "Winter 2023 · sample", zh: "2023 年冬 · 示例" },
        place: { en: "Stockholm", zh: "斯德哥尔摩" },
        photos: [SAMPLE_PHOTOS.coast, SAMPLE_PHOTOS.train],
        text: {
          en: "This second node shows how the journal grows when you return to the same country at another time.",
          zh: "第二个节点展示了再次回到同一个国家时，游记如何沿时间继续生长。"
        }
      }
    ]
  },

  "840": {
    slug: "united-states",
    sample: true,
    flag: "🇺🇸",
    name: { en: "United States", zh: "美国" },
    kicker: { en: "Sample country journal", zh: "示例国家游记" },
    dates: { en: "3 sample visits", zh: "3 次示例旅行" },
    places: { en: "Several cities and routes", zh: "多座城市与路线" },
    mood: { en: "Distance and scale", zh: "距离与尺度" },
    summary: {
      en: "A longer country journal can keep many visits and as many photographs as each visit needs.",
      zh: "较长的国家游记可以容纳许多次到访，每次旅行也可以根据需要添加任意数量的照片。"
    },
    cover: "assets/images/sample-coast.webp",
    highlights: [SAMPLE_PHOTOS.coast, SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.train],
    visits: [
      {
        date: { en: "2026 · sample", zh: "2026 年 · 示例" },
        place: { en: "City and region", zh: "城市与地区" },
        photos: [SAMPLE_PHOTOS.coast, SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.coast],
        text: {
          en: "Replace this with the details and reflection from your most recent visit.",
          zh: "把这里替换为最近一次旅行的细节和感受。"
        }
      },
      {
        date: { en: "2024 · sample", zh: "2024 年 · 示例" },
        place: { en: "Another city", zh: "另一座城市" },
        photos: [SAMPLE_PHOTOS.train, SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.coast],
        text: {
          en: "Every node can have its own number of photographs; nothing needs to match the visit above or below it.",
          zh: "每个节点都可以拥有不同数量的照片，不需要与相邻旅行保持一致。"
        }
      },
      {
        date: { en: "2022 · sample", zh: "2022 年 · 示例" },
        place: { en: "First route", zh: "最初的路线" },
        photos: [SAMPLE_PHOTOS.harbor, SAMPLE_PHOTOS.train],
        text: {
          en: "The earliest visit anchors the bottom of the upward timeline.",
          zh: "最早的一次旅行位于向上延伸的时间线底部。"
        }
      }
    ]
  }
};
