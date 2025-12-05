# User CRUD API

A production-ready Express.js CRUD API with PostgreSQL database using MVC pattern.

## Project Structure

```
postgres/
├── src/
│   ├── app.js                 # Main application file
│   ├── config/
│   │   ├── database.js        # Database connection pool
│   │   ├── init.js            # Database initialization
│   │   └── swagger.js         # Swagger configuration
│   ├── models/
│   │   └── User.js            # User model with DB queries
│   ├── controllers/
│   │   └── UserController.js  # User controller with business logic
│   ├── routes/
│   │   └── userRoutes.js      # API routes with Swagger docs
│   ├── middleware/            # Middleware functions
│   └── utils/                 # Utility functions
├── docker-compose.yml         # Docker compose for local setup
├── Dockerfile                 # Docker image configuration
├── package.json               # Project dependencies
├── .env.example               # Example environment variables
└── README.md                  # This file
```

## Prerequisites

- Docker & Docker Compose (for containerized setup)
- Node.js 18+ (if running without Docker)
- npm

## Quick Start (Recommended - Using Docker)

### 1. Clone/Setup the project

```bash
cd postgres
```

### 2. Create `.env` file

```bash
# Copy from example
cp .env.example .env
```

**Default `.env` content:**
```
DB_HOST=postgres
DB_PORT=5432
DB_NAME=userdb
DB_USER=postgres
DB_PASSWORD=postgres123
NODE_ENV=development
PORT=3000
```

### 3. Build and run with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build the Node.js application
- Start PostgreSQL database
- Automatically initialize the database with users table
- Start the API server on `http://localhost:3000`

### 4. Access the API

- **API Base URL:** `http://localhost:3000`
- **Health Check:** `http://localhost:3000/health`
- **Swagger Docs:** `http://localhost:3000/api-docs`

---

## Local Setup (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` file

```bash
cp .env.example .env
```

**Update `.env` for local PostgreSQL:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=userdb
DB_USER=postgres
DB_PASSWORD=postgres123
NODE_ENV=development
PORT=3000
```

### 3. Ensure PostgreSQL is Running

Make sure you have PostgreSQL installed and running locally on port 5432.

### 4. Run the application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

---

## API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Users CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Request/Response Examples

**Create User (POST /api/users)**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City"
}
```

**Response (Success - 201)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City",
    "created_at": "2025-12-05T10:30:00.000Z",
    "updated_at": "2025-12-05T10:30:00.000Z"
  },
  "message": "User created successfully"
}
```

**Get All Users (GET /api/users)**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City",
      "created_at": "2025-12-05T10:30:00.000Z",
      "updated_at": "2025-12-05T10:30:00.000Z"
    }
  ],
  "message": "Users retrieved successfully"
}
```

---

## Docker Commands

### Start services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes
```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f app
```

### View database logs
```bash
docker-compose logs -f postgres
```

### Access PostgreSQL CLI (from Docker)
```bash
docker exec -it postgres_db psql -U postgres -d userdb
```

---

## Database Details

**Database Name:** `userdb`  
**Default User:** `postgres`  
**Default Password:** `postgres123`

**Users Table Schema:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing with cURL

```bash
# Get all users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+1987654321","address":"456 Oak Ave"}'

# Get user by ID
curl http://localhost:3000/api/users/1

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane.smith@example.com"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

---

## Troubleshooting

### Port Already in Use
If port 3000 or 5432 is already in use, update the ports in `docker-compose.yml` or `.env`

### Database Connection Error
- Ensure PostgreSQL is running and accessible
- Verify credentials in `.env` file
- Wait a few seconds for the database to be ready after Docker startup

### Container won't start
```bash
# Check logs
docker-compose logs app

# Rebuild images
docker-compose up --build
```

---

## Development Notes

- All API responses follow a consistent JSON format: `{ success, data, message }`
- Email field is unique - duplicate emails will return 409 Conflict
- Timestamps are automatically managed by PostgreSQL
- The `updated_at` field is updated automatically on record modification

---

## License

ISC
