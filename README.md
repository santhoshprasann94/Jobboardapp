# Job Board Application

A full-stack Job Board Application built using Spring Boot and React. The application allows users to create, view, update, delete, and search job postings through a responsive web interface.

## Live Demo

Frontend (Vercel):  
https://jobboardapp-ebon.vercel.app

Backend API (Render):  
https://jobboardapp-f7n0.onrender.com/api/jobs

## GitHub Repository

https://github.com/santhoshprasann94/Jobboardapp

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Spring Boot
- Spring Data JPA
- H2 Database
- Maven

## Features

- Add new job postings
- View all job postings
- Update existing jobs
- Delete jobs
- Search job postings
- Responsive user interface
- REST API integration

## Deployment

- Frontend: Vercel
- Backend: Render (Docker)
- CI/CD: GitHub Actions

## Project Structure

```
Jobboardapp
├── backend
├── frontend
└── .github
    └── workflows
```

## Running the Project Locally

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Author

Santhosh Prasann Galipalli

GitHub: https://github.com/santhoshprasann94
