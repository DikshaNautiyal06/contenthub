# ContentHub

*ContentHub* is a full-stack blogging application built with FastAPI (backend) and React (frontend) using Vite and Tailwind CSS. Users can register, login, create, read, update, and delete posts. The design uses a black & red theme with support for light/dark mode.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Running the Application](#running-the-application)

  * [Backend](#backend)
  * [Frontend](#frontend)
* [API Endpoints](#api-endpoints)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

## Features

* User registration with email/password
* JWT authentication (login, logout, current user)
* Create, read, update, and delete posts
* View all posts or user-specific posts
* Filter posts by category
* Responsive black & red themed UI with Tailwind CSS

## Tech Stack

* *Backend:* Python, FastAPI, SQLModel, PostgreSQL
* *Frontend:* JavaScript, React, Vite, Tailwind CSS
* *Authentication:* OAuth2 with JWT
* *Styling:* Tailwind CSS

## Prerequisites

* Node.js (v16+)
* npm or yarn
* Python (v3.9+)
* pip (Python package manager)
* PostgreSQL database

## Installation

### Backend Setup

1. Navigate to the backend directory:

   bash
   cd backend
   
2. Create and activate a virtual environment:

   bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .\.venv\Scripts\activate
   
3. Install Python dependencies:

   bash
   pip install -r requirements.txt
   
4. Configure database connection in .env or environment variables:

   env
   DATABASE_URL=postgresql://user:password@localhost:5432/contenthub
   SECRET_KEY=your_jwt_secret_key
   
5. Run database migrations (if any) or ensure tables are created:

   bash
   python -m app.database  # or appropriate init script
   

### Frontend Setup

1. Navigate to the frontend directory:

   bash
   cd frontend
   
2. Install Node.js dependencies:

   bash
   npm install
   # or yarn install
   
3. Create a .env file in the frontend root with the API URL (optional):

   env
   VITE_API_URL=http://localhost:8000/api
   

## Running the Application

### Backend

Run the FastAPI server with automatic reload:

bash
cd backend
uvicorn app.main:app --reload --port 8000


The API documentation will be available at http://localhost:8000/docs.

### Frontend

Start the Vite development server:

bash
cd frontend
npm run dev


Open http://localhost:5173 in your browser.

## API Endpoints

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | /api/auth/register | Register a new user      |
| POST   | /api/auth/token    | Login and get JWT token  |
| GET    | /api/auth/me       | Get current user profile |

### Posts

| Method | Endpoint               | Description                                |
| ------ | ---------------------- | ------------------------------------------ |
| GET    | /api/posts           | List all posts (with optional filters)     |
| GET    | /api/posts/{post_id} | Get a single post by ID                    |
| POST   | /api/posts           | Create a new post (authenticated)          |
| PUT    | /api/posts/{post_id} | Update a post (authenticated, owner only)  |
| DELETE | /api/posts/{post_id} | Delete a post (authenticated, owner only)  |
| GET    | /api/myposts         | List posts by current user (authenticated) |

## Project Structure


contenthub/
├─ backend/
│  ├─ app/
│  │  ├─ main.py          # FastAPI application setup and routes
│  │  ├─ database.py      # Database initialization
│  │  ├─ models.py        # SQLModel ORM models
│  │  ├─ schemas.py       # Pydantic schemas
│  │  ├─ crud.py          # CRUD operations
│  │  ├─ auth.py          # Authentication utilities
│  │  └─ ...
│  ├─ .env                # Environment variables
│  └─ requirements.txt    # Python dependencies

├─ frontend/
│  ├─ src/
│  │  ├─ components/      # Reusable React components (PostCard, etc.)
│  │  ├─ contexts/        # React context (AuthContext)
│  │  ├─ pages/           # Page components (Home, Login, Signup, etc.)
│  │  ├─ api.jsx          # Axios API instance
│  │  └─ main.jsx         # React app entry point
│  ├─ .env                # Frontend environment variables
│  ├─ package.json        # JS dependencies and scripts
│  └─ vite.config.js      # Vite configuration with proxy

├─ README.md              # Project overview and instructions
└─ .gitignore


## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See LICENSE file for details.
