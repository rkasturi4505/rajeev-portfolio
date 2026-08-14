# Rajeev Kumar Kasturi — Senior Java Developer Portfolio

<p align="center">
  <img src="frontend/public/favicon.png" alt="Rajeev Kumar Kasturi" width="90" />
</p>

<h3 align="center">
  Senior Java Developer | Spring Boot | Microservices | AWS | Docker | Kubernetes
</h3>

<p align="center">
  A modern, full-stack developer portfolio built with React, TypeScript, Spring Boot and MySQL.
</p>

<p align="center">
  <a href="https://github.com/rkasturi4505">
    <img src="https://img.shields.io/badge/GitHub-rkasturi4505-181717?style=for-the-badge&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/">
    <img src="https://img.shields.io/badge/LinkedIn-Rajeev%20Kumar%20Kasturi-0A66C2?style=for-the-badge&logo=linkedin" />
  </a>
</p>

---

## 🚀 Live Portfolio

🌐 **Live Website:**
https://rajeevkumarkasturi.com

💻 **Source Code:**
https://github.com/rkasturi4505

🔗 **LinkedIn:**
https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/

The portfolio is deployed as a production full-stack application with a React frontend hosted on Vercel and a Spring Boot backend hosted on Render.

---

## 📌 About

This repository contains my personal developer portfolio, designed to showcase my professional experience, technical expertise, projects, certifications and engineering capabilities.

The application is built as a full-stack solution with a **React + TypeScript frontend** and a **Spring Boot + MySQL backend**, with authentication, analytics, administration, contact notifications and an AI-powered portfolio assistant.

---

## ✨ Highlights

* 🧑‍💻 Professional Senior Java Developer portfolio
* ⚙️ Spring Boot REST APIs
* ⚛️ React + TypeScript frontend
* 🔐 JWT-based authentication
* 🛡️ Spring Security
* 🤖 AI-powered portfolio assistant
* 📊 Portfolio and visitor analytics
* 📈 Visitor trend and chart dashboards
* 👨‍💼 Admin dashboard
* 📝 Project management
* 🎓 Certification management
* 💼 Experience and education management
* 📩 Contact/message management
* 📄 Resume download tracking
* 📧 Gmail SMTP integration
* 🗄️ MySQL persistence
* 🌐 RESTful API architecture
* 📦 Maven backend
* 🚀 Vite frontend
* 🎨 Responsive modern UI

---

# 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       Web Browser       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   React + TypeScript    │
                    │        Frontend         │
                    │                         │
                    │  • Portfolio            │
                    │  • Admin Dashboard      │
                    │  • AI Assistant         │
                    │  • Analytics             │
                    └────────────┬────────────┘
                                 │
                            REST APIs
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Spring Boot        │
                    │        Backend          │
                    │                         │
                    │  • Controllers          │
                    │  • Services             │
                    │  • Security             │
                    │  • JWT Authentication   │
                    │  • Analytics            │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │          MySQL          │
                    │       portfolio_db      │
                    └─────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* Framer Motion
* Responsive CSS
* Modern component-based architecture

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST APIs
* JWT Authentication
* Maven
* Jakarta Validation

### Database

* MySQL
* JPA/Hibernate ORM
* Database-driven portfolio content
* Analytics persistence
* Contact message persistence

### DevOps & Cloud

* Docker
* Vercel
* Render
* Git
* GitHub
* Maven
* Environment-based configuration

### Communication

* Gmail SMTP
* Spring Boot Mail
* Contact notification system

---

## ☁️ Production Deployment Architecture

```text
                         Internet
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Custom Domain      │
                 │                      │
                 │ rajeevkumarkasturi   │
                 │       .com           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       Vercel         │
                 │                      │
                 │ React + TypeScript   │
                 │      Frontend        │
                 └──────────┬───────────┘
                            │
                       REST / HTTPS
                            │
                            ▼
                 ┌──────────────────────┐
                 │       Render         │
                 │                      │
                 │   Spring Boot API    │
                 │   Spring Security    │
                 │   JWT Authentication │
                 │   Analytics          │
                 │   Contact API        │
                 └──────────┬───────────┘
                            │
                    ┌───────┴────────┐
                    ▼                ▼
          ┌────────────────┐   ┌─────────────────┐
          │     MySQL      │   │   Gmail SMTP    │
          │                │   │                 │
          │ Portfolio Data │   │ Contact Alerts  │
          │ Projects       │   │                 │
          │ Messages       │   │                 │
          │ Analytics      │   │                 │
          └────────────────┘   └─────────────────┘
```

---

## 🔐 Security

The application implements multiple security mechanisms to protect administrative functionality and backend APIs.

### Security Features

* Spring Security
* JWT-based authentication
* Protected administrative APIs
* Stateless authentication
* Role-based administrative access
* Password hashing
* CORS configuration
* Environment-based secrets
* Server-side request validation
* Jakarta Bean Validation

Sensitive production credentials are **not stored in the GitHub repository**.

Production secrets such as database credentials, JWT secrets, Gmail credentials and administrator credentials are supplied through environment variables.

---

## 🤖 AI-Powered Portfolio Assistant

The portfolio includes an AI-powered assistant designed to answer questions about my professional profile and portfolio.

### Capabilities

* Professional profile questions
* Technical expertise questions
* Project-related questions
* Experience-related questions
* Portfolio knowledge retrieval
* Structured project responses

The assistant integrates with the backend portfolio services so that responses can be generated from portfolio data rather than relying only on static frontend content.

---

## 📊 Analytics & Admin Dashboard

The application includes an administrative dashboard for monitoring and managing portfolio activity.

### Analytics

* Portfolio views
* Resume downloads
* Contact messages
* Administrative logins
* Visitor tracking
* Visitor trends
* Analytics dashboards

### Administration

* Project management
* Portfolio content management
* Contact message management
* Analytics visualization
* Protected administrative operations

---

## 📩 Contact & Email Notifications

Recruiters and visitors can contact me directly through the portfolio.

```text
Visitor
   │
   ▼
Contact Form
   │
   ▼
POST /api/messages
   │
   ├──────────────► MySQL
   │                 │
   │                 └── Message persisted
   │
   └──────────────► Gmail SMTP
                     │
                     ▼
              Portfolio Owner
              kasturirajeev90@gmail.com
```

The notification contains:

* Sender name
* Sender email address
* Sender message

Messages are persisted in the database before the email notification is attempted, helping prevent message loss if the email service temporarily becomes unavailable.

The notification email includes the sender's name, email address and message so the portfolio owner can respond directly.

---

## 🐳 Docker

The Spring Boot backend is containerized using Docker for consistent builds and deployment.

### Backend containerization includes

* Java runtime
* Spring Boot application
* Maven build process
* Production-ready application packaging

---

## 📁 Project Structure

```text
portfolio/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   └── config/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/rajeev/backend/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       └── resources/
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md
```

---

## ⚙️ Local Development

### Prerequisites

* Java 21
* Maven
* Node.js
* npm
* MySQL
* Git

### Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Production credentials are configured through environment variables.

### Backend

```text
DB_URL
DB_USERNAME
DB_PASSWORD

MAIL_USERNAME
MAIL_PASSWORD

ADMIN_USERNAME
ADMIN_EMAIL
ADMIN_PASSWORD

JWT_SECRET
JWT_EXPIRATION
```

### Frontend

```text
VITE_API_URL
```

Actual production credentials should **never** be committed to GitHub.

---

## 🧪 Key REST APIs

| API                  | Purpose                            |
| -------------------- | ---------------------------------- |
| `GET /api/portfolio` | Retrieve portfolio data            |
| `GET /api/projects`  | Retrieve projects                  |
| `POST /api/messages` | Submit contact message             |
| `POST /api/ai/chat`  | Portfolio AI assistant             |
| Admin APIs           | Protected portfolio administration |
| Analytics APIs       | Portfolio and visitor analytics    |

---

## 📈 Engineering Highlights

This project demonstrates practical experience across the full application lifecycle:

* Full-stack application development
* REST API design
* Secure authentication
* Database persistence
* Cloud deployment
* Docker containerization
* Environment-based configuration
* API integration
* Analytics implementation
* Email notification workflows
* Administrative application design
* Responsive frontend development
* Production troubleshooting and deployment

---

## 🔮 Future Enhancements

Potential future improvements include:

* Advanced CI/CD automation and testing workflows
* Expanded observability and monitoring
* Additional analytics capabilities
* Automated testing coverage
* Enhanced AI portfolio capabilities
* Additional cloud infrastructure integrations

---

## 👨‍💻 Author

### Rajeev Kumar Kasturi

**Senior Java Developer**

Java | Spring Boot | Microservices | REST APIs | Docker | Kubernetes | AWS | React | TypeScript

🌐 **Portfolio:**
https://rajeevkumarkasturi.com

💻 **GitHub:**
https://github.com/rkasturi4505

🔗 **LinkedIn:**
https://www.linkedin.com/in/rajeev-kumar-kasturi-5a036771/

---

## ⭐ If You Find This Project Useful

If you are a recruiter, hiring manager or developer interested in the implementation, feel free to explore the repository and connect with me through the links above.
