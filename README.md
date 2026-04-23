# BossfightQuiz

A full-stack quiz application with real-time WebSocket support. The backend is built with Django + Django Channels, and the frontend is an Angular SPA.

## Prerequisites

- **Python** 3.10+
- **Node.js** 18+ and **npm** 10+
- **Angular CLI**: `npm install -g @angular/cli`

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Bossfight-Quiz
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# (Optional) Create a superuser for the Django admin
python manage.py createsuperuser
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

---

## Running locally

Both the backend and frontend need to run simultaneously in separate terminals.

**Terminal 1 — Backend** (from `backend/`):

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`.

**Terminal 2 — Frontend** (from `frontend/`):

```bash
ng serve
```

Open your browser at `http://localhost:4200`. The app proxies API requests to the backend automatically.

---

## Running with Docker

Each service has its own Dockerfile. Build and run them individually:

```bash
# Backend
cd backend
docker build -t bossfight-backend .
docker run -p 8000:8000 bossfight-backend

# Frontend
cd frontend
docker build -t bossfight-frontend .
docker run -p 80:80 bossfight-frontend
```

---

## Development

### Useful backend commands

```bash
# Apply new migrations after model changes
python manage.py makemigrations && python manage.py migrate

# Open the Django shell
python manage.py shell

# Access the admin panel
# Navigate to http://localhost:8000/admin after creating a superuser
```

### Frontend commands

```bash
# Start dev server
ng serve

# Build for production
ng build

# Run unit tests
ng test

# Generate a new component
ng generate component component-name
```

---

## Project structure

```
Bossfight-Quiz/
├── backend/          # Django REST API + WebSocket server
│   ├── authentication/
│   ├── boss/
│   ├── config/       # Django settings & URL config
│   ├── questions/
│   ├── scores/
│   ├── manage.py
│   └── requirements.txt
└── frontend/         # Angular SPA
    ├── src/
    ├── angular.json
    └── package.json
```

---

## Additional resources

- [Angular CLI documentation](https://angular.dev/tools/cli)
- [Django documentation](https://docs.djangoproject.com/)
- [Django Channels documentation](https://channels.readthedocs.io/)
