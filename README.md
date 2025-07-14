# Stock Management The5ers

## Project Overview

A modern, full-stack stock management system with:

- **Backend:** NestJS, MongoDB (Mongoose), JWT Auth, modular clean architecture
- **Frontend:** Vite + React + TypeScript (MobX, Ant Design, Axios)
- **Dockerized:** All services run via Docker Compose for easy local/dev setup
- **Testing:** Unit, integration, and e2e tests with Jest and mongodb-memory-server

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
    │   │       └── database/
    │   ├── test/
    │   ├── package.json
    │   └── jest.config.js
    └── frontend/
        └── ...
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

- Start MongoDB container:
  ```sh
  docker-compose up -d mongo
  ```
- In `apps/backend/.env`, set:
  ```
  MONGO_URI=mongodb://localhost:27017/appdb
  ```
- Start backend:
  ```sh
  cd apps/backend
  npm run start:dev
  ```

### 2. **Full Stack (Docker Compose)**

- Copy `.env.example` to `.env` and fill in values as needed
- Start all services:
  ```sh
  docker-compose up --build
  ```
- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)

---

## API Overview

- **POST /users/signup**: Register a new user
- **POST /auth/login**: Login and receive JWT
- **Protected routes:** Use `@UseGuards(JwtAuthGuard)` in NestJS

---

## Testing

- **Unit/Integration:** Place `.spec.ts` files next to modules (e.g., `src/modules/users/users.service.spec.ts`)
- **E2E:** Place in `apps/backend/test/` (e.g., `app.e2e-spec.ts`)
- **Run tests:**
  ```sh
  npm run test         # unit/integration
  npm run test:watch   # watch mode
  npm run test:cov     # coverage
  npm run test:e2e     # e2e tests
  ```

---

## Development Workflow

- Modular, clean architecture in backend
- All code and tests reside in `apps/backend` or `apps/frontend`
- Use Docker Compose for consistent dev environments
- Use `.env` files for configuration
- Commit in logical steps with clear messages

---

## Progress

- [x] Project structure scaffolded
- [x] Backend (NestJS) and Frontend (Vite React) initialized
- [x] Docker Compose and environment setup
- [x] Users, Auth, and Database modules implemented
- [x] JWT authentication and protected routes
- [x] Unit, integration, and e2e test setup
- [x] Local and Docker Compose workflows tested and working

---

For any questions or contributions, please open an issue or PR!
