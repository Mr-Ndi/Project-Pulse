# Project Pulse Backend API

## Overview
Project Pulse is a FastAPI-based backend for project management, featuring JWT authentication, PostgreSQL database integration, Alembic migrations, and Docker support.

## Features
- FastAPI RESTful API
- JWT authentication for all endpoints
- Project and profile management
- PostgreSQL database (asyncpg)
- Alembic migrations
- Password hashing (argon2)
- Redis for token blacklisting
- CORS enabled for all origins
- Dockerized deployment

## Folder Structure
```
BackEnd/
├── alembic/                # Alembic migration scripts
├── src/
│   ├── controller/         # Business logic controllers
│   ├── middleware/         # Request validation and middleware
│   ├── model/              # SQLModel data models
│   ├── routes/             # FastAPI routers
│   ├── service/            # Service layer for business logic
│   └── utilities/          # JWT, password hashing utilities
├── index.py                # FastAPI app entrypoint
├── dbhandler.py            # Database engine setup
├── Dockerfile              # Docker build file
├── requirement.txt         # Python dependencies
└── alembic.ini             # Alembic config
```

## Quick Start
### 1. Clone the repository
```bash
git clone https://github.com/Mr-Ndi/Project-Pulse.git
cd Project-Pulse/BackEnd
```

### 2. Install dependencies
```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirement.txt
```

### 3. Configure environment variables
Create a `.env` file in the root with your settings:
```
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/projectpulse
SECRET_KEY=your_jwt_secret
REDIS_URL=redis://localhost:6379/0
```

### 4. Run Alembic migrations
```bash
alembic upgrade head
```

### 5. Start the server
```bash
uvicorn index:app --reload --host 127.0.0.1 --port 5000
```

### 6. Run with Docker
Build and run the Docker image:
```bash
docker pull ninshuti/project-pulse-backend:latest
docker run -p 3500:3500 ninshuti/project-pulse-backend:latest
```

## API Endpoints
- `/api/auth/*` — Authentication endpoints
- `/plan/register` — Register a new project (JWT required)
- `/plan/all` — Get all projects (JWT required)
- `/api/profile/update` — Update profile (JWT required)

## Development
- All endpoints are protected with JWT (see `src/utilities/jwtGenerator.py`)
- Alembic migrations are required for DB schema changes
- CORS is enabled for all origins in `index.py`

## License
MIT

---
For more details, see the source code and comments in each module.
