# Stock Management The5ers

## Project Overview

A modern, full-stack stock management system for tracking and analyzing stock portfolios.

- **Backend:** NestJS, MongoDB (Mongoose), JWT Auth, modular clean architecture, FMP API integration
- **Frontend:** Vite + React + TypeScript (MobX, Ant Design, Axios), clean state management, responsive UI
- **Testing:** Unit, integration, and e2e tests with Jest and mongodb-memory-server
- **DevOps:** Docker Compose for local/dev setup

---

## Folder Structure

```
stock_management_the5ers/
├── .env / .env.example
├── docker-compose.yml
├── README.md
└── apps/
    ├── backend/
    │   ├── src/
    │   │   └── modules/
    │   │       ├── users/
    │   │       ├── auth/
    │   │       ├── database/
    │   │       ├── fmp-client/
    │   │       └── portfolio/
    │   ├── test/
    │   ├── package.json
    │   └── Dockerfile
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── AppLayout/
        │   │   ├── ErrorBoundary/
        │   │   ├── ThemeToggle/
        │   │   ├── AuthForm/
        │   │   ├── Portfolio/
        │   │   └── StockDetail/
        │   ├── pages/
        │   ├── stores/
        │   ├── hooks/
        │   ├── services/
        │   └── theme/
        ├── package.json
        └── Dockerfile
```

---

## Tech Stack

- **Backend:** NestJS, Mongoose, MongoDB, Passport, JWT, bcryptjs
- **Frontend:** Vite, React, TypeScript, MobX, Ant Design, Axios
- **Testing:** Jest, Supertest, mongodb-memory-server
- **DevOps:** Docker, Docker Compose

---

## Setup & Running

### 1. **Local Backend Only**

```sh
docker-compose up -d mongo
# Set MONGO_URI in apps/backend/.env
cd apps/backend
npm install
npm run start:dev
```

### 2. **Full Stack (Docker Compose)**

```sh
cp .env.example .env  # Fill in values as needed
docker-compose up --build
```

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)

---

## Backend Overview

### **Modules**

- **users:** User registration, login, user schema, DTOs, and tests
- **auth:** JWT authentication, guards, strategies, and tests
- **portfolio:** User portfolio management (add, remove, list stocks), DTOs, schema, repository, and tests
- **fmp-client:** Integration with Financial Modeling Prep API (search, quote), DTOs, and tests

### **Key Endpoints**

- `POST /users/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT
- `GET /portfolio` — List user’s stocks (JWT required)
- `POST /portfolio` — Add stock to portfolio (JWT required)
- `DELETE /portfolio/:symbol` — Remove stock (JWT required)
- `GET /fmp-client/search-symbol` — Search stocks by symbol
- `GET /fmp-client/search-name` — Search stocks by name
- `GET /fmp-client/quote?symbol=TSLA` — Get real-time quote for a stock

### **Testing**

- Unit and integration tests for all modules (see `src/modules/*/*.spec.ts`)
- E2E tests in `apps/backend/test/`
- Run with:
  ```sh
  npm run test         # unit/integration
  npm run test:watch   # watch mode
  npm run test:cov     # coverage
  npm run test:e2e     # e2e tests
  ```

---

## Frontend Overview

### **Structure**

- **components/** — Modular, reusable UI components (Portfolio, StockDetail, Auth, Layout, etc.)
- **pages/** — Top-level pages (Portfolio, StockDetail, Login, Signup, Home)
- **stores/** — MobX stores for state management (`portfolioStore`, `useAuth`)
- **hooks/** — Custom hooks (`useAxios`, `useDebounce`)
- **services/** — Shared axios instance for API calls
- **theme/** — Theming and style overrides

### **Key Features**

- **Authentication:** Login, signup, JWT session management, protected routes
- **Portfolio Management:** Add/remove stocks, view portfolio, responsive UI
- **Stock Search:** Search by symbol or name, debounced input, add to portfolio
- **Stock Detail:** Real-time quote, percentage change, all key stats, skeleton loading, error handling, retry
- **State Management:** MobX for global and per-page state, clean separation of concerns
- **UI/UX:** Ant Design, skeleton loaders, error boundaries, theme toggle, accessible navigation

### **Best Practices**

- All API calls use a shared axios instance or the `useAxios` hook
- Types and interfaces are centralized in `types.ts` files
- CSS modules for component-level styles
- Clean, modular, and testable code

---

## Development Workflow

- Use Docker Compose for consistent dev environments
- Use `.env` files for configuration
- Commit in logical steps with clear, professional messages
- All code and tests reside in `apps/backend` or `apps/frontend`
- Modular, clean architecture in backend and frontend

---

## Progress

- [x] Project structure scaffolded
- [x] Backend (NestJS) and Frontend (Vite React) initialized
- [x] Docker Compose and environment setup
- [x] Users, Auth, and Database modules implemented
- [x] JWT authentication and protected routes
- [x] FmpClient module for FMP API integration (search, quote, etc.)
- [x] Portfolio module (add, list, remove stocks per user)
- [x] Unit, integration, and e2e test setup for all modules
- [x] Local and Docker Compose workflows tested and working
- [x] Frontend: MobX state, modular components, skeleton loaders, error handling, retry, and clean architecture

---

## Contributing

For questions or contributions, please open an issue or PR.  
All contributions should follow the project’s code style and commit message conventions.
