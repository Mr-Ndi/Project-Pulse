
# Project Pulse FrontEnd

A modern, responsive project management dashboard built with React, Vite, and Tailwind CSS.

## Features
- User authentication (Login, Signup)
- Dashboard with project status circles and project list
- Professional user profile card and registration table
- Responsive layouts for all pages
- Navigation via React Router
- Consistent UI with Nav and Footer components
- Contact and Features pages

## Tech Stack
- React 19.x
- Vite
- Tailwind CSS
- React Router

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```

### Build
```bash
pnpm run build
```

### Preview
```bash
pnpm run preview
```

## Project Structure
```
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── assets/
├── public/
└── src/
	├── App.css
	├── App.tsx
	├── index.css
	├── main.tsx
	└── components/
		├── Footer/
		├── Hero/
		├── Nav/
		└── Pages/
			├── Dashboard/
			├── Features/
			├── Login/
			├── Signup/
			├── Profile/
			└── Contact/
```

## Customization
- Update Tailwind config for custom themes.
- Add new pages/components in `src/components` or `src/Pages`.

## License
MIT

---

> Built by Mr-Ndi and contributors.