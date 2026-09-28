# Wander Atlas / 旅迹地图

这是一个无需构建工具的静态双语旅行网站，可以直接部署到 GitHub Pages。

## 文件结构

```text
index.html                         世界地图主页
journey.html                       自动生成的国家游记页
assets/css/styles.css              全站样式
assets/js/map.js                   地图与国家摘要交互
assets/js/journey.js               游记详情页与相册交互
assets/js/travel-data.js           你主要编辑的内容文件
assets/images/                     旅行照片
```

## 最常用的修改

### 1. 修改网站名称和简介

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

### 2. 添加一个国家

点击主页上尚未记录的国家，摘要面板会显示它的三位数 `Map ID`。在
`assets/js/travel-data.js` 中复制一个现有国家条目，并把对象键改成这个编号。

例如，法国的地图编号显示为 `250`，则使用：

```js
"250": {
  slug: "france",
  sample: false,
  flag: "🇫🇷",
  name: { en: "France", zh: "法国" },
  // 继续填写 dates、places、summary、highlights、sections 等字段
}
```

不需要新建 HTML 页面。链接会自动使用：

```text
journey.html?country=250
```

### 3. 替换照片

把照片放进 `assets/images/`。建议：

- 使用 `.webp` 或压缩后的 `.jpg`；
- 横向照片建议至少 1600px 宽；
- 文件名使用英文小写和连字符，例如 `france-paris-evening.webp`；
- 在 `travel-data.js` 中填写相对路径，例如：

```js
src: "assets/images/france-paris-evening.webp"
```

每条 `highlights` 都包含图片路径、中英文替代文字和中英文说明。可以继续增加照片，
相册页面会自动生成。前三张会显示在地图摘要中。

### 4. 写中英文内容

每段内容都采用相同结构：

```js
summary: {
  en: "English text here.",
  zh: "中文写在这里。"
}
```

如果暂时只写一种语言，可以先把同一段内容放在两个字段中，之后再翻译。

### 5. 删除示例标识

当一个国家已经换成真实照片和文字后，将：

```js
sample: true
```

改成：

```js
sample: false
```

## 上传到 GitHub Pages

把这个文件夹中的全部内容上传到你的 GitHub Pages 仓库根目录。确保
`index.html`、`journey.html` 和 `assets/` 位于同一级。

## 地图说明

世界地图使用 Natural Earth 边界数据，通过 `world-atlas`、D3 和 TopoJSON 的 CDN
版本加载。网站部署后需要网络连接才能首次读取地图；照片和游记文件均保存在你自己的仓库中。

## 示例素材

附带的三张图片和三篇国家内容仅用于展示布局与交互。它们不是你的真实旅行记录，
上线前请替换为自己的照片和文字。
