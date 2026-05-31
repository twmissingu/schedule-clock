[![English](https://img.shields.io/badge/English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/中文-red.svg)](README_zh.md)

---

# 🌸 Schedule Clock

A cute, kid-friendly schedule clock web app — zero dependencies, runs anywhere.

## Why This Project?

Kids need a simple, visual way to see their daily routine. This app shows a real-time clock with adorable animal stickers and color-coded schedule cards. When it's time for piano practice or English class, a friendly alarm goes off.

No frameworks. No build tools. No accounts. Just open `index.html` and it works.

## Features

- 🕐 Real-time analog + digital clock display
- 🎨 8 course icons (piano, dance, English, art, reading, sports, music, drawing)
- 📅 Weekly recurring schedule planner
- 🔔 Two-tone alarm when a scheduled time arrives
- 🐰 Cute animal stickers (bunny, bear, cat) with sparkle animations
- 📱 Mobile-first responsive design
- 💾 Auto-save to LocalStorage

## Quick Start

### Prerequisites

A modern web browser (Chrome, Firefox, Safari, Edge).

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/schedule-clock.git
cd schedule-clock
```

### Usage

Open directly in browser:

```bash
open index.html
```

Or use a local server:

```bash
npx serve .
# or
python3 -m http.server
```

Then visit `http://localhost:8080` (or whatever port your server uses).

## For AI Agents

This project is designed for seamless AI agent interaction:

1. **Clone and run**
   ```bash
   git clone https://github.com/YOUR_USERNAME/schedule-clock.git
   cd schedule-clock
   open index.html
   ```

2. **Architecture**
   - `index.html` — page structure (HTML only)
   - `styles.css` — all styling
   - `icons.svg` — SVG symbol definitions
   - `js/storage.js` — LocalStorage wrapper + shared constants
   - `js/clock.js` — clock display + hand animation
   - `js/alarm.js` — alarm detection + Web Audio playback
   - `js/schedule.js` — schedule CRUD, list rendering, modal interaction
   - `js/app.js` — main entry, initializes all modules

3. **Key patterns**
   - Global `window.App` namespace (no ES Modules, no build tools)
   - Script loading order: `icons.js` → `storage.js` → `clock.js` → `alarm.js` → `schedule.js` → `app.js`
   - Data persists to `localStorage` under key `schedule_clock_data`

4. **Modifying**
   - Edit `styles.css` for visual changes
   - Edit individual `js/*.js` files for behavior changes
   - No build step required — refresh browser to see changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.
