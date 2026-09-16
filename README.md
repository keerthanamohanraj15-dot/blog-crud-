# CRUD Blog - Module 4

Beginner-friendly Blog CRUD project using:
- HTML, CSS, JavaScript
- Node.js + Express
- MongoDB + Mongoose

## CRUD features
- Create a blog
- Read/view all blogs
- Update a blog
- Delete a blog

## Setup

### 1. Backend
Open a terminal inside the `backend` folder:

```bash
npm.cmd install
```

Copy `.env.example` to a new file named `.env` and put your MongoDB connection string in it:

```text
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Then run:

```bash
node server.js
```

### 2. Frontend
Open `frontend/index.html` in a browser.

Make sure the backend is running first.

## API
- POST `/api/blogs`
- GET `/api/blogs`
- PUT `/api/blogs/:id`
- DELETE `/api/blogs/:id`
