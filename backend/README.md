
# Mini-Blog Management System

A modern, full-stack Mini-Blog application built with **NestJS** for the backend and **Vue.js 3** for the frontend. This system allows for public viewing of blog posts and an administrative dashboard for full CRUD (Create, Read, Update, Delete) operations.


## 🚀 Tech Stack

### Frontend

- **Vue.js 3 (Composition API)**
- **PrimeVue** (UI Component Library)
- **Axios** (API Communication)
- **Vite** (Build Tool)

### Backend

- **NestJS** (Node.js Framework)
- **TypeScript**
- **TypeORM**
- **Microsoft SQL Server (MSSQL)**

---

## ✨ Features

- **Public Blog Feed:** Users can view all published articles in a clean, card-based layout.
- **Advanced Search:** Real-time search functionality to filter posts by title or content.
- **Pagination:** Seamlessly navigate through large sets of blog data.
- **Admin Dashboard:** A protected interface to manage content using a modern Data Table.
- **Clean UI/UX:** Responsive design focused on readability and professional aesthetics using PrimeVue.
- **Global API Interceptor:** Automatic handling of base URLs and headers for consistent communication.

---

## 🔑 Demo Access

For demonstration purposes, the application uses a **Mock Login** system. You can access the Admin Dashboard using the following credentials:

- **Username:** `admin`
- **Password:** `admin123`

---

## 🛠️ Installation & Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MSSQL Instance

### 2. Backend Setup


# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (.env)
# DATABASE_URL=mssql://username:password@localhost:1433/dbname

# Run the server
npm run start:dev

### 3. Frontend Setup


# Navigate to frontend directory
cd frontend/mini-blog-frontend/vue-project

# Install dependencies
npm install

# Install PrimeIcons (Required for UI icons)
npm install primeicons

# Run the development server
npm run dev



## 📑 API Documentation

The backend exposes the following RESTful endpoints:

| Method   | Endpoint     | Description                                                    |
| :------- | :----------- | :------------------------------------------------------------- |
| `GET`    | `/posts`     | Fetch posts with optional `page`, `limit`, and `search` params |
| `POST`   | `/posts`     | Create a new blog post                                         |
| `PATCH`  | `/posts/:id` | Update an existing post                                        |
| `DELETE` | `/posts/:id` | Remove a post from the database                                |

---

## 📂 Project Structure


├── backend/                # NestJS Source Code
└── frontend/
    └── vue-project/
        ├── src/
        │   ├── services/   # Axios API Instance
        │   ├── views/      # Public, Admin, and Login Views
        │   ├── router/     # Navigation Guards and Routes
        │   └── App.vue     # Main Layout & Navigation
        └── public/
```

### Developed by

**Muhammad Mahad** _Senior Backend & Full-Stack Developer_

