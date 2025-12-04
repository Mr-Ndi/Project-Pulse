# 🎨 Project Pulse Frontend

A modern, responsive project management dashboard built with React, Vite, TypeScript, and Tailwind CSS.

> 📖 **Main Documentation**: See [`../README.md`](../README.md) for project overview and quick start guide.

---

## 🎯 Overview

Project Pulse Frontend is a single-page application (SPA) that provides an intuitive interface for managing projects. It features a clean dashboard, user authentication, and real-time project status tracking.

---

## ✨ Features

- 🔐 **User Authentication** – Login and signup with JWT tokens
- 📊 **Dashboard** – Visual project status tracking with circular progress indicators
- 📝 **Project Management** – Create, edit, and delete projects
- 🎨 **Modern UI** – Clean, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** – Responsive layouts for all screen sizes
- 🔄 **Real-time Updates** – Instant project status updates
- 👤 **User Profile** – View user information and profile details

---

## 🛠️ Tech Stack

- **React 19** – UI library
- **Vite** – Fast build tool and dev server
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Client-side routing
- **React Icons** – Icon library

---

## 📁 Project Structure

```
FrontEnd/
├── src/
│   ├── api/                    # API service layer
│   │   ├── projectPulseApi.ts  # API client functions
│   │   └── useProjectPulseApi.ts # React hooks for API calls
│   ├── Components/             # Reusable components
│   │   ├── Nav/               # Navigation component
│   │   └── Footer/            # Footer component
│   ├── Pages/                 # Page components
│   │   ├── Dashboard/         # Main dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   └── ProjectForm.tsx
│   │   ├── Login/             # Login page
│   │   ├── Signup/            # Signup page
│   │   ├── Profile/           # User profile page
│   │   ├── Contact/           # Contact page
│   │   ├── Features/          # Features page
│   │   └── Heru/              # Hero/Landing page
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── Dockerfile                 # Docker build file
├── package.json               # Dependencies
└── vite.config.ts            # Vite configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** (or npm/yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/Mr-Ndi/Project-Pulse.git
cd Project-Pulse/FrontEnd
```

### 2. Install Dependencies

```bash
pnpm install
```

Or with npm:
```bash
npm install
```

### 3. Configure API Endpoint

Update the API base URL in `src/api/projectPulseApi.ts`:

```typescript
const BASE_URL = "http://localhost:8000"; // Your backend URL
```

### 4. Start Development Server

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
pnpm run build
```

The production build will be in the `dist/` directory.

### 6. Preview Production Build

```bash
pnpm run preview
```

---

## 🐳 Docker Deployment

### Build the Image

```bash
docker build -t project-pulse-frontend:latest .
```

### Run with Docker

```bash
docker run -d -p 3000:3000 --name project-pulse-frontend project-pulse-frontend:latest
```

The app will be available at `http://localhost:3000`

### Pull from Docker Hub

```bash
docker pull ninshuti/project-pulse-frontend:latest
docker run -d -p 3000:3000 ninshuti/project-pulse-frontend:latest
```

---

## 🎨 Features Overview

### Dashboard
- **Status Cards** – Visual representation of project statuses (Not Started, In Progress, Completed)
- **Project List** – Table view of all projects with edit/delete functionality
- **Add Project Form** – Quick project creation with name, description, and status

### Authentication
- **Login** – Secure user authentication
- **Signup** – User registration with validation
- **Protected Routes** – Automatic redirect to login for unauthenticated users

### Project Management
- **Create Projects** – Add new projects with name, description, and initial status
- **Edit Projects** – Update project details (name, description, status)
- **Delete Projects** – Remove projects with confirmation
- **Status Updates** – Change project status (only when editing)

### User Profile
- **Profile View** – Display user information from JWT token
- **User Details** – Name, email, user ID, and role

---

## 🔧 Configuration

### API Configuration

The API base URL is configured in `src/api/projectPulseApi.ts`:

```typescript
const BASE_URL = "http://localhost:8000"; // Change to your backend URL
```

### Environment Variables (Optional)

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Then update `projectPulseApi.ts` to use it:

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
```

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

---

## 🧪 Development

### Linting

```bash
pnpm run lint
```

### Type Checking

```bash
pnpm run build  # TypeScript checks are included in build
```

---

## 🎨 Customization

### Styling

- **Tailwind CSS** – Modify `tailwind.config.js` for custom themes
- **Global Styles** – Edit `src/index.css` for global styles
- **Component Styles** – Use Tailwind utility classes in components

### Adding New Pages

1. Create a new component in `src/Pages/`
2. Add route in `src/App.tsx`:

```typescript
<Route path="/new-page" element={<NewPage />} />
```

### Adding New Components

Create reusable components in `src/Components/` and import where needed.

---

## 🐛 Troubleshooting

### Build Errors

- **TypeScript Errors**: Fix type errors shown in the build output
- **Missing Dependencies**: Run `pnpm install` again
- **Port Already in Use**: Change the port in `vite.config.ts` or kill the process using the port

### API Connection Issues

- Verify backend is running
- Check API base URL in `projectPulseApi.ts`
- Ensure CORS is enabled on the backend
- Check browser console for error messages

### Authentication Issues

- Verify JWT token is being stored in localStorage
- Check token expiration
- Ensure backend authentication endpoints are working

---

## 📦 Build Output

The production build creates:
- `dist/index.html` – Main HTML file
- `dist/assets/` – Optimized JavaScript and CSS bundles
- `dist/` – Static assets from `public/`

---

## 📄 License

MIT License

---

## 🔗 Related Documentation

- **Main Project**: [`../README.md`](../README.md)
- **Backend API**: [`../BackEnd/README.md`](../BackEnd/README.md)

---

## 👤 Author

**Mr-Ndi**  

🔗 [LinkedIn](https://www.linkedin.com/in/mr-ndi/)  

💻 [GitHub](https://github.com/Mr-Ndi/)
