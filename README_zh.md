[![English](https://img.shields.io/badge/English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/中文-red.svg)](README_zh.md)

---

# 🌸 小可爱日程时钟

一个童趣风格的日程时钟网页应用——零依赖，随处运行。

## 为什么做这个？

小朋友需要一个简单、直观的方式来看每天的日程。这个应用用可爱的动物贴纸和彩色日程卡片展示实时时钟。到了练钢琴或上英语课的时间，会响起友好的闹铃提醒。

不用框架，不用构建工具，不用注册账号。打开 `index.html` 就能用。

## 功能特点

- 🕐 实时模拟时钟 + 数字时间显示
- 🎨 8 种课程图标（钢琴、跳舞、英语、绘画、阅读、运动、音乐、美术）
- 📅 每周固定时间日程计划
- 🔔 到点双音闹铃提醒
- 🐰 可爱动物贴纸（小兔、小熊、小猫）+ 闪烁动画
- 📱 移动端自适应
- 💾 LocalStorage 自动保存数据

## 快速开始

### 前置条件

现代浏览器（Chrome、Firefox、Safari、Edge）。

### 安装

```bash
git clone https://github.com/YOUR_USERNAME/schedule-clock.git
cd schedule-clock
```

### 使用

直接在浏览器中打开：

```bash
open index.html
```

或使用本地服务器：

```bash
npx serve .
# 或
python3 -m http.server
```

然后访问 `http://localhost:8080`（或你服务器使用的端口）。

## AI Agent 指南

本项目为 AI agent 交互而设计：

1. **克隆并运行**
   ```bash
   git clone https://github.com/YOUR_USERNAME/schedule-clock.git
   cd schedule-clock
   open index.html
   ```

2. **架构**
   - `index.html` — 页面结构（纯 HTML）
   - `styles.css` — 全部样式
   - `icons.svg` — SVG 图标定义
   - `js/storage.js` — LocalStorage 封装 + 共享常量
   - `js/clock.js` — 时钟显示 + 指针动画
   - `js/alarm.js` — 闹钟检测 + Web Audio 播放
   - `js/schedule.js` — 日程 CRUD、列表渲染、弹窗交互
   - `js/app.js` — 主入口，初始化各模块

3. **关键模式**
   - 全局 `window.App` 命名空间（无 ES Modules，无构建工具）
   - 脚本加载顺序：`icons.js` → `storage.js` → `clock.js` → `alarm.js` → `schedule.js` → `app.js`
   - 数据持久化到 `localStorage`，键名 `schedule_clock_data`

4. **修改方式**
   - 视觉改动编辑 `styles.css`
   - 行为改动编辑对应的 `js/*.js` 文件
   - 无需构建步骤——刷新浏览器即可看到效果

## 贡献

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交改动（`git commit -m 'feat: add amazing feature'`）
4. 推送分支（`git push origin feature/amazing-feature`）
5. 创建 Pull Request

## 许可证

MIT 许可证 — 详见 [LICENSE](LICENSE)。
