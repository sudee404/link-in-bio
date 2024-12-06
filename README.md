# Project Documentation

## Overview
This project consists of a **backend**, **frontend**, and a **PostgreSQL database**, orchestrated using Docker Compose. The services are connected through a custom Docker network (`bio_net`) to ensure smooth communication.

## Services

### 1. Backend
- **Environment File**: `./backend/.env`
- **Build Context**: `./backend`
- **Dockerfile**: `./Dockerfile`
- **Ports**: 
  - Exposed on `localhost:8000`
- **Volumes**:
  - Maps the local directory `./backend` to `/usr/src/app` inside the container.
- **Dependencies**:
  - Depends on the `db` service.
- **Network**: 
  - Connected to `bio_net`.

### 2. Frontend
- **Environment File**: `./frontend/.env`
- **Build Context**: `./frontend`
- **Dockerfile**: `./Dockerfile`
- **Ports**: 
  - Exposed on `localhost:3000`
- **Volumes**:
  - Maps the local directory `./frontend` to `/usr/src/app` inside the container.
- **Network**: 
  - Connected to `bio_net`.

### 3. Database (PostgreSQL)
- **Image**: `postgres:13.1-alpine`
- **Environment Variables**:
  - `POSTGRES_DB`: `bio`
  - `POSTGRES_USER`: `admin`
  - `POSTGRES_PASSWORD`: `12345`
- **Volumes**:
  - Stores persistent data in `bio_data` volume, mapped to `/var/lib/postgresql/data/`.
- **Ports**:
  - Exposed on `localhost:5432`.
- **Network**:
  - Connected to `bio_net`.

## Networks

### bio_net
- **Type**: Bridge
- Connects all the services to facilitate communication.

## Volumes
- **bio_data**: Persistent storage for PostgreSQL data.
- **media**: (Unused currently, but defined for future use.)

## Usage

### Prerequisites
- Install Docker and Docker Compose on your system.

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>

2. Create .env files for the backend and frontend services in their respective directories.
3. Start the project using Docker Compose
    ```
    docker-compose up --build
    ```
This command will build the images and start the services.
4. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`
   - Database: `http://localhost:5432`

## Envs
### Backend
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `POSTDB_PORTGRES_PORT`: Database port
- `SECRET_KEY`: Secret key
- `JWT_SECRET_KEY`: Secret key for JWT
- `DEBUG`: True or False
- `ALLOWED_HOSTS`: 127.0.0.1 0.0.0.0

### Frontend
- `BACKEND_API_URL`=http://0.0.0.0:8000/
- `NEXTAUTH_SECRET`=secret
- `NEXTAUTH_URL`=http://localhost:3000/