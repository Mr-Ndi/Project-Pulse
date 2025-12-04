# 🏗️ Project Pulse Backend API

FastAPI-based backend for Project Pulse, featuring JWT authentication, PostgreSQL database integration, and Docker support.

> 📖 **Main Documentation**: See [`../README.md`](../README.md) for project overview and quick start guide.

---

## 🎯 Overview

Project Pulse Backend is a RESTful API built with FastAPI that provides secure project management functionality. It features user authentication, project CRUD operations, and user-specific data isolation.

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure token-based authentication
- 📝 **Project Management** – Full CRUD operations for projects
- 👤 **User Management** – User registration and profile updates
- 🔒 **Data Isolation** – Users can only access their own projects
- 🗄️ **PostgreSQL** – Async database operations with asyncpg
- 🔄 **Alembic Migrations** – Database schema versioning
- 🔑 **Password Hashing** – Argon2 password hashing
- 🐳 **Docker Support** – Containerized deployment
- 🌐 **CORS Enabled** – Cross-origin resource sharing

---

## 📁 Folder Structure

```
BackEnd/
├── alembic/                # Alembic migration scripts
│   ├── versions/           # Migration version files
│   └── env.py             # Alembic environment config
├── src/
│   ├── controller/         # Business logic controllers
│   │   ├── authController.py
│   │   └── projectController.py
│   ├── middleware/         # Request validation schemas
│   │   ├── validation.py  # User validation schemas
│   │   └── pvalidation.py # Project validation schemas
│   ├── model/             # SQLModel data models
│   │   ├── Usermodel.py
│   │   └── projectmodel.py
│   ├── routes/            # FastAPI routers
│   │   ├── authRouter.py
│   │   └── projRouter.py
│   └── service/          # Service layer for business logic
│       ├── authService.py
│       └── projectService.py
├── utilities/            # Utility functions
│   ├── jwtGenerator.py  # JWT token generation/validation
│   └── passwordHasher.py # Password hashing utilities
├── index.py             # FastAPI app entrypoint
├── dbhandler.py         # Database engine setup
├── Dockerfile           # Docker build file
├── requirements.txt     # Python dependencies
└── alembic.ini         # Alembic configuration
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- PostgreSQL database
- Redis (optional, for token blacklisting)

### 1. Clone the Repository

```bash
git clone https://github.com/Mr-Ndi/Project-Pulse.git
cd Project-Pulse/BackEnd
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `BackEnd/` directory:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/projectpulse
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REDIS_URL=redis://localhost:6379
```

### 5. Run Database Migrations

```bash
alembic upgrade head
```

### 6. Start the Server

```bash
uvicorn index:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

---

## 🐳 Docker Deployment

### Build the Image

```bash
docker build -t project-pulse-backend:latest .
```

### Run with Docker

```bash
docker run -d \
  -p 8000:8000 \
  --env-file .env \
  --name project-pulse-backend \
  project-pulse-backend:latest
```

### Pull from Docker Hub

```bash
docker pull ninshuti/project-pulse-backend:latest
docker run -d -p 8000:8000 --env-file .env ninshuti/project-pulse-backend:latest
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | User login | No |
| PUT | `/api/update-profile` | Update user profile | Yes |

### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/plan/register` | Create new project | Yes |
| GET | `/plan/all` | Get all user's projects | Yes |
| GET | `/plan/details?id={id}` | Get project details | Yes |
| PUT | `/plan/edit` | Update project | Yes |
| PATCH | `/plan/delete` | Delete project | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check endpoint |

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained by logging in via `/api/login` and expire after the time specified in `ACCESS_TOKEN_EXPIRE_MINUTES`.

---

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `full_name` (String)
- `password` (String, Hashed)
- `role` (Enum: user, admin)
- `is_verified` (Boolean)

### Projects Table
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String, Optional)
- `owner_id` (UUID, Foreign Key → Users)
- `status` (Enum: not_started, in_progress, completed)
- `start_date` (Float, Timestamp)

---

## 🔒 Security Features

- **Password Hashing**: Argon2 for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Data Isolation**: Users can only access their own projects
- **Input Validation**: Pydantic schemas for request validation
- **CORS**: Configurable cross-origin resource sharing

---

## 🧪 Development

### Running Tests

```bash
pytest
```

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback migration:
```bash
alembic downgrade -1
```

---

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `SECRET_KEY` | JWT secret key | Yes | - |
| `ALGORITHM` | JWT algorithm | No | HS256 |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | No | 30 |
| `REDIS_URL` | Redis connection string | No | - |

---

## 🐛 Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql+asyncpg://user:password@host:port/database`
- Ensure database exists

### Migration Issues

- Run `alembic upgrade head` to apply all migrations
- Check migration files in `alembic/versions/`

### JWT Token Issues

- Verify `SECRET_KEY` is set in `.env`
- Check token expiration time
- Ensure token is sent in Authorization header

---

## 📄 License

MIT License

---

## 🔗 Related Documentation

- **Main Project**: [`../README.md`](../README.md)
- **Frontend**: [`../FrontEnd/README.md`](../FrontEnd/README.md)

---

## 👤 Author

**Mr-Ndi**  

🔗 [LinkedIn](https://www.linkedin.com/in/mr-ndi/)  

💻 [GitHub](https://github.com/Mr-Ndi/)
