# Wander Atlas / 旅迹地图

这是一个无需构建工具的静态双语旅行网站，可以直接部署到 GitHub Pages。主页是可点击的世界地图；每个国家的详情页是一条由下向上延伸的旅行时间线，可以记录同一国家的多次到访。

## 文件结构

```text
index.html                         世界地图主页
journey.html                       国家游记时间线页面
assets/css/styles.css              全站样式
assets/js/map.js                   地图与国家摘要交互
assets/js/journey.js               时间线、无限照片与大图浏览
assets/js/travel-data.js           你主要编辑的内容文件
assets/images/                     旅行照片
```

## 修改网站名称和简介

打开 `assets/js/travel-data.js`，编辑最上面的 `TRAVEL_SITE`：

```js
window.TRAVEL_SITE = {
  title: { en: "Wander Atlas", zh: "旅迹地图" },
  owner: { en: "Your name", zh: "你的名字" },
  introduction: {
    en: "Your English introduction.",
    zh: "你的中文简介。"
  }
};
```

## 添加一个国家

点击主页上尚未记录的国家，摘要面板会显示三位数 `Map ID`。复制一个现有国家条目，并把对象键改成这个编号。例如法国使用 `250`：

```js
"250": {
  slug: "france",
  sample: false,
  flag: "🇫🇷",
  name: { en: "France", zh: "法国" },
  kicker: { en: "Country journal", zh: "国家游记" },
  dates: { en: "3 visits", zh: "3 次旅行" },
  places: { en: "Paris · Lyon · Marseille", zh: "巴黎 · 里昂 · 马赛" },
  mood: { en: "Cities and coast", zh: "城市与海岸" },
  summary: {
    en: "A short summary shown on the map and at the top of the journal.",
    zh: "显示在地图摘要和游记顶部的简短介绍。"
  },
  cover: "assets/images/france-cover.webp",
  highlights: [
    {
      src: "assets/images/france-cover.webp",
      alt: { en: "Describe the photograph", zh: "描述照片内容" },
      caption: { en: "Optional caption", zh: "可选图片说明" }
    }
  ],
  visits: []
}
```

不需要新建 HTML 页面。详情链接会自动使用 `journey.html?country=250`。

## 记录同一国家的多次旅行

在该国家的 `visits` 数组里添加任意数量的节点。请把最近一次放在最前面，这样页面上的时间会从底部最早一次向上延伸至最近一次。

```js
visits: [
  {
    date: { en: "May 2026", zh: "2026 年 5 月" },
    place: { en: "Paris", zh: "巴黎" },
    photos: [
      {
        src: "assets/images/paris-01.webp",
        alt: { en: "Street in Paris", zh: "巴黎街道" },
        caption: { en: "Evening walk", zh: "傍晚散步" }
      },
      {
        src: "assets/images/paris-02.webp",
        alt: { en: "View across the river", zh: "河对岸的景色" },
        caption: { en: "Across the Seine", zh: "塞纳河对岸" }
      }
      // 可以继续添加，不限制数量
    ],
    text: {
      en: "Write the memory or reflection for this visit here.",
      zh: "在这里写下这一次旅行的记忆或感受。"
    }
  },
  {
    date: { en: "October 2022", zh: "2022 年 10 月" },
    place: { en: "Lyon", zh: "里昂" },
    photos: [],
    text: { en: "An earlier visit.", zh: "更早的一次旅行。" }
  }
]
```

每个节点右侧的照片每行最多 5 张；第 6 张会自动换到下一行，可以继续换很多行。平板和手机会自动减少每行的照片数量。点击任意照片可放大，并可使用左右按钮或键盘方向键浏览该国家的全部照片。

## 主页精选照片

`highlights` 只用于主页国家摘要，建议放 1–3 张代表性照片。详情页中的全部照片来自各个 `visits[].photos`，数量不受限制。

## 替换照片

把照片放进 `assets/images/`：

- 建议使用 `.webp` 或压缩后的 `.jpg`；
- 横向照片建议至少 1600px 宽；
- 文件名使用英文小写和连字符，例如 `france-paris-evening.webp`；
- 数据中使用相对路径，例如 `assets/images/france-paris-evening.webp`。

## 中国地图说明

地图会把原始边界数据中的 `156` 与 `158` 合并成一个可点击的“中国”，统一使用 Map ID `156`。不要再创建 `158` 条目；即使旧链接使用 `journey.html?country=158`，也会自动转到 `156` 的中国游记。

## 删除示例标识

当一个国家已经换成真实照片和文字后，把 `sample: true` 改成 `sample: false`。

## 上传到 GitHub Pages

把这个文件夹中的全部内容上传到 GitHub Pages 仓库根目录。确保 `index.html`、`journey.html` 和 `assets/` 位于同一级。

世界地图通过 CDN 加载 D3、TopoJSON 和 `world-atlas` 数据，因此访问地图时需要网络连接；你的照片和游记仍保存在自己的仓库中。
