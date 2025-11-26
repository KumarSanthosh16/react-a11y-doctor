# react-a11y-doctor

Automatic **accessibility fixer** for React (JSX / TSX).  
It analyzes your React source code and automatically **adds or fixes missing accessibility attributes**.

No warnings.  
No lists of errors.  
It **directly fixes** your code.

---

## 🚀 Features

### ✔ Auto-add missing accessibility attributes
- `alt=""` for images  
- `aria-label=""` for buttons  
- `role="button"` for clickable `div`/`span`  
- `tabIndex={0}` for interactive non-button elements  
- Generate `<title>` for SVG icons  
- Auto-generate `htmlFor=""` for labels  
- Warn about incorrect heading structure  

---

## 🔍 Smart Guessing Engine

When generating labels:

- If button has visible text → use it  
- If button has only icons → use component name (e.g., `DeleteIcon`)  
- For images → use filename (e.g., `login-bg.png` → `"Login bg"`)  
- If nothing found → fallback to `"interactive element"`  

---

## 📦 Installation

```sh
npm install -g react-a11y-doctor
