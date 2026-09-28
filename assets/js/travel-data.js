/*
  EDIT THIS FILE TO ADD YOUR OWN JOURNEYS.

  1. Click an empty country on the map to see its three-digit Map ID.
  2. Copy one entry below and use that Map ID as the object key.
  3. Replace the bilingual text and image paths with your own material.
  4. Set sample: false when the entry contains your real content.
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

window.TRAVEL_ENTRIES = {
  "208": {
    slug: "denmark",
    sample: true,
    flag: "🇩🇰",
    name: { en: "Denmark", zh: "丹麦" },
    kicker: { en: "Sample journey", zh: "示例旅程" },
    dates: { en: "Replace with your dates", zh: "替换为你的旅行日期" },
    places: { en: "Copenhagen · the coast", zh: "哥本哈根 · 海岸" },
    mood: { en: "Slow mornings", zh: "缓慢的清晨" },
    summary: {
      en: "This sample shows where a short reflection can sit: a compact memory of arrival, atmosphere, and the detail that made the place stay with you.",
      zh: "这里演示摘要的位置：用一小段文字记录抵达时的感受、城市的气息，以及让这个地方留在记忆中的细节。"
    },
    cover: "assets/images/sample-harbor.webp",
    highlights: [
      {
        src: "assets/images/sample-harbor.webp",
        alt: { en: "A quiet harbor at sunrise", zh: "清晨安静的港湾" },
        caption: { en: "Replace with a favorite city scene.", zh: "替换为你最喜欢的城市画面。" }
      },
      {
        src: "assets/images/sample-train.webp",
        alt: { en: "Landscape seen through a train window", zh: "从火车窗外看到的风景" },
        caption: { en: "A journey between places can be part of the story.", zh: "城市之间的移动，也可以成为故事的一部分。" }
      },
      {
        src: "assets/images/sample-coast.webp",
        alt: { en: "A coastal path at dusk", zh: "黄昏时的海岸小径" },
        caption: { en: "End with the image you still remember.", zh: "用一张仍留在记忆中的照片收尾。" }
      }
    ],
    lead: {
      en: "Use this opening paragraph for the feeling of the journey rather than a list of attractions. What changed between arriving and leaving? What did the photographs fail to capture?",
      zh: "开头可以写旅行带来的感受，而不是景点清单。抵达和离开之间发生了什么变化？有哪些东西是照片无法记录的？"
    },
    sections: [
      {
        title: { en: "First impressions", zh: "初见" },
        body: {
          en: "Begin with a concrete moment: the weather, a sound, an unexpected conversation, or the first street you walked down. Specific details make a personal travel journal feel lived rather than summarized.",
          zh: "从一个具体时刻写起：天气、声音、一次意外的交谈，或者抵达后走过的第一条街。具体细节会让旅行记录更真实，而不只是概括。"
        }
      },
      {
        title: { en: "What stayed with me", zh: "留在记忆里的事" },
        body: {
          en: "This section can hold the reflection that arrived later—after the route, restaurants, and landmarks began to blur. Keep it in your own voice; short and precise is enough.",
          zh: "这里可以写旅行结束后才逐渐清晰的感受——当路线、餐馆和景点开始模糊以后，什么仍然留下来。保持自己的语气，简短而具体就足够。"
        }
      }
    ],
    closing: {
      en: "A final line, observation, or question you carried home.",
      zh: "写下一句你带回家的观察、感受或问题。"
    }
  },

  "752": {
    slug: "sweden",
    sample: true,
    flag: "🇸🇪",
    name: { en: "Sweden", zh: "瑞典" },
    kicker: { en: "Sample journey", zh: "示例旅程" },
    dates: { en: "Replace with your dates", zh: "替换为你的旅行日期" },
    places: { en: "Cities · forests · trains", zh: "城市 · 森林 · 火车" },
    mood: { en: "In motion", zh: "在路上" },
    summary: {
      en: "A second sample entry demonstrates how every country can have its own summary, visual highlights, and longer journal page without creating new page code.",
      zh: "第二个示例说明：每个国家都可以拥有独立摘要、精选图片和完整游记，而不需要重新编写页面代码。"
    },
    cover: "assets/images/sample-train.webp",
    highlights: [
      {
        src: "assets/images/sample-train.webp",
        alt: { en: "Landscape seen through a train window", zh: "从火车窗外看到的风景" },
        caption: { en: "Replace with a photograph about movement.", zh: "替换为一张关于移动与途中感受的照片。" }
      },
      {
        src: "assets/images/sample-coast.webp",
        alt: { en: "A coastal path at dusk", zh: "黄昏时的海岸小径" },
        caption: { en: "Pair places with the feelings they produced.", zh: "把地点与它带来的感受放在一起。" }
      },
      {
        src: "assets/images/sample-harbor.webp",
        alt: { en: "A harbor in soft morning light", zh: "柔和晨光中的港湾" },
        caption: { en: "Close details can sit beside wide landscapes.", zh: "细节照片可以与广阔风景并置。" }
      }
    ],
    lead: {
      en: "This is sample copy. Replace it with the tension, surprise, calm, or curiosity that gave your journey its particular shape.",
      zh: "这是示例文字。请替换成真正塑造这次旅行的紧张、惊喜、平静或好奇。"
    },
    sections: [
      {
        title: { en: "Between destinations", zh: "目的地之间" },
        body: {
          en: "Travel is also waiting, changing trains, watching the landscape, and noticing how distance alters attention. Use this space for the parts usually left outside an itinerary.",
          zh: "旅行也包括等待、换乘、看着窗外变化，以及距离如何改变注意力。这里可以记录那些通常不会出现在行程单里的部分。"
        }
      },
      {
        title: { en: "A detail worth keeping", zh: "值得留下的细节" },
        body: {
          en: "Choose one scene and stay with it. A journal does not need to account for every day when one exact memory can carry the whole trip.",
          zh: "选择一个场景，停留得久一点。旅行记录不必交代每一天，一个准确的记忆也可以承载整段旅程。"
        }
      }
    ],
    closing: {
      en: "Replace this with the sentence that best returns you to the journey.",
      zh: "替换为一句最能让你重新回到这段旅程的话。"
    }
  },

  "840": {
    slug: "united-states",
    sample: true,
    flag: "🇺🇸",
    name: { en: "United States", zh: "美国" },
    kicker: { en: "Sample journey", zh: "示例旅程" },
    dates: { en: "Replace with your dates", zh: "替换为你的旅行日期" },
    places: { en: "A long route · several stops", zh: "一段长途路线 · 多个停靠点" },
    mood: { en: "Distance and scale", zh: "距离与尺度" },
    summary: {
      en: "Use a country entry for one journey or for many visits. The page can hold a compact overview here and a much larger gallery and reflection behind the link.",
      zh: "一个国家条目既可以记录一次旅行，也可以汇总多次到访。这里放简短概览，链接后的页面则容纳更多照片与感受。"
    },
    cover: "assets/images/sample-coast.webp",
    highlights: [
      {
        src: "assets/images/sample-coast.webp",
        alt: { en: "A coast at blue hour", zh: "蓝调时刻的海岸" },
        caption: { en: "Use landscape images to establish scale.", zh: "用风景照片建立旅程的尺度感。" }
      },
      {
        src: "assets/images/sample-harbor.webp",
        alt: { en: "A waterfront street in morning light", zh: "晨光中的滨水街道" },
        caption: { en: "Then move closer to everyday life.", zh: "然后把视线移向日常生活。" }
      },
      {
        src: "assets/images/sample-train.webp",
        alt: { en: "A train journey through a wide landscape", zh: "穿过广阔景观的火车旅程" },
        caption: { en: "Let the route connect otherwise separate memories.", zh: "让路线把原本分散的记忆连接起来。" }
      }
    ],
    lead: {
      en: "This sample page is intentionally neutral. Replace it with your own geography: the cities, distances, people, and shifts in perspective that mattered to you.",
      zh: "这个示例页面刻意保持中性。请换成属于你的地理经验：城市、距离、遇见的人，以及真正改变你视角的时刻。"
    },
    sections: [
      {
        title: { en: "The route", zh: "路线" },
        body: {
          en: "For a large country or repeated visits, organize the narrative around a route, a season, or a question rather than trying to compress everything into one chronology.",
          zh: "面对幅员辽阔的国家或多次旅行，可以围绕一条路线、一个季节或一个问题组织叙事，而不是把所有内容压缩成单一时间线。"
        }
      },
      {
        title: { en: "Looking back", zh: "回望" },
        body: {
          en: "End with what you understand differently now. The most useful travel notes often record a change in perception rather than a recommendation.",
          zh: "最后写下如今理解不同的地方。最有价值的旅行记录，往往保存的是视角的变化，而不是推荐清单。"
        }
      }
    ],
    closing: {
      en: "Your closing reflection belongs here.",
      zh: "把你的结尾感受写在这里。"
    }
  }
};
