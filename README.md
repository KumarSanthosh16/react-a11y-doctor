![npm version](https://img.shields.io/badge/npm_version-v1.0.0-brightgreen?style=for-the-badge)
![license](https://img.shields.io/badge/license-Apache_2.0-orange?style=for-the-badge)
![Github](https://img.shields.io/badge/github-repo-blue?logo=github)


# react-a11y-doctor 🩺

### Automated Accessibility Fixes for React & Next.js Projects

`react-a11y-doctor` scans React source (`.js/.jsx/.ts/.tsx`) and built output HTML
and automatically fixes common accessibility problems, instead of just reporting them.

---

## ✨ Features

| Fix | Example |
|------|---------|
| Missing alt text | `<img src="foo.png">` → `<img src="foo.png" alt="foo">` |
| Missing aria-label | `<button><Icon/></button>` → `aria-label="delete"` |
| Clickable divs | `<div onClick>` → `role="button" tabIndex="0" aria-label="Open"` |
| Missing `<svg><title>` | Adds `<title>` intelligently |
| Heading order warnings | Detects jumps (ex: h1 → h4) |

---

## 🧪 Example

**Before**
```jsx
<button><DeleteIcon /></button>
<img src="/img/user.png" />
<div onClick={open}>Edit</div>
```

**After**
```jsx
<button aria-label="delete"><DeleteIcon /></button>
<img src="/img/user.png" alt="user" />
<div onClick={open} role="button" tabIndex="0" aria-label="Edit">Edit</div>
```
Formatted with Prettier automatically.

---

**🚀 Install**

```bash
npm install react-a11y-doctor --save-dev
```
---

**🔧 Commands**

| Command | Description |
|------|---------|
| `react-a11y-doctor fix src` | Fix JSX/TSX files inside src |
| `react-a11y-doctor auto` | Detect and fix source + built HTML automatically |

---

**🏗 Build integration**

**Next.js**
```json
"scripts": {
  "build": "react-a11y-doctor fix src && next build && react-a11y-doctor auto"
}
```

**Vite / CRA / Astro / Remix**
```json
"build": "react-a11y-doctor fix src && vite build && react-a11y-doctor auto"
```

---

**🧂 Supports**
 - React 18 / 19
 - Next.js (App & Pages router)
 - Vite / CRA / Remix / Astro
 - TypeScript + JSX

---

**📝 License**
Apache-2.0

---

**👤 Author**
Santhoshkumar Ragunathan
[LinkedIn](https://www.linkedin.com/in/santhoshkumar-ragunathan-753067244/) | [GitHub](https://github.com/KumarSanthosh16) | [Portfolio](https://www.consoledotlog.in)

---
