<div align="center">

# 🔎 LostLink
### Reconnect What Matters.

**A Smart Lost & Found Management Platform for Sri Lanka**

A web-based platform designed to help people report, discover, and recover lost belongings through intelligent item matching, location-based searching, and real-time notifications.

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Application-00CFC8?style=for-the-badge&logo=vercel&logoColor=white)](https://lostlink-frontend-two.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-000000?style=for-the-badge&logo=node.js&logoColor=white)](https://lostlink-backend.vercel.app/api/v1/health)
[![GitHub](https://img.shields.io/badge/Source%20Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Oshan-uk)

</div>

---

## 📌 About the Project

Losing personal belongings can be stressful, especially when there is no centralized platform to connect people who have lost items with those who have found them.

**LostLink** addresses this problem by providing a centralized, user-friendly digital platform where users across Sri Lanka can report lost and found items, discover potential matches, and improve the chances of recovering their belongings.

Unlike a traditional lost-and-found listing system, LostLink introduces an automated matching mechanism that evaluates reported items using multiple attributes, including item name, category, location, and date.

The platform is designed with a responsive interface, secure authentication, structured REST APIs, and a scalable full-stack architecture.

## 🎯 Project Objectives

- Provide a centralized lost-and-found platform for Sri Lanka.
- Simplify the process of reporting lost and found belongings.
- Help users discover potentially matching items automatically.
- Reduce the time required to identify matching reports.
- Notify users when potential matches are discovered.
- Provide a secure and accessible user experience.

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 User Authentication | Secure registration and login using JWT authentication. |
| 📦 Lost Item Reporting | Users can submit detailed lost-item reports. |
| 🎒 Found Item Reporting | Users can report belongings they have discovered. |
| 🔍 Smart Search | Search and filter reports using multiple criteria. |
| 📍 Location Filtering | Filter items by province, district, city, and specific location. |
| 🧠 Automatic Matching | Automatically calculates potential matches between lost and found reports. |
| 📊 Match Percentage | Displays matching scores based on item attributes. |
| 🔔 Notifications | Notifies users when potential matches are identified. |
| 📋 User Dashboard | Manage personal reports and monitor their status. |
| ✅ Return Management | Mark recovered items as returned. |
| 🤖 AI Assistant | Provides an AI-powered conversational assistant. |
| ☁️ Cloud Image Storage | Stores uploaded item images using Cloudinary. |
| 📱 Responsive Design | Supports desktop, tablet, and mobile devices. |

## ⚙️ How LostLink Works

LostLink follows a structured workflow to connect people with their missing belongings.

**1. User Registration & Authentication**

Users create an account and securely access the platform using JWT-based authentication.

**2. Report Lost or Found Items**

Users submit reports containing item names, categories, descriptions, locations, dates, and optional images.

**3. Automatic Item Matching**

When a new report is submitted, the backend compares it with existing active reports of the opposite type.

The matching mechanism evaluates:

- Item category similarity.
- Item name similarity.
- Province.
- District.
- City.
- Reported date.

**4. Matching Score Calculation**

The system calculates a weighted matching score out of 100.

| Matching Criteria | Maximum Score |
|---|---:|
| Category | 30 |
| Item Name | 25 |
| Province | 10 |
| District | 15 |
| City | 10 |
| Date | 10 |
| **Total** | **100** |

Reports achieving a matching score of 40 or above are considered potential matches.

**5. Notification Generation**

When potential matches are identified, the system creates notifications for the relevant users.

**6. Item Recovery**

Users can review potential matches, investigate relevant reports, and update their own item status to returned once the belongings have been recovered.

## 🏗️ System Architecture

LostLink follows a layered client-server architecture.

```text
             ┌──────────────────────────┐
             │       React Frontend     │
             │      TypeScript + Vite   │
             └────────────┬─────────────┘
                          │
                          │ HTTP / REST API
                          ▼
             ┌──────────────────────────┐
             │      Express Backend    │
             │       Node.js + TS       │
             └────────────┬─────────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Routes  │ │Middleware│ │Controllers│
        └──────────┘ └──────────┘ └─────┬────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │ Mongoose ODM     │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │   MongoDB Atlas  │
                              └──────────────────┘
```

### External Integrations

- **Cloudinary:** Cloud-based image storage.
- **Google Gemini:** AI assistant functionality.
- **Vercel:** Application deployment and hosting.

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and maintainability |
| Vite | Development server and build tooling |
| React Router | Client-side navigation |
| Axios | HTTP communication with backend |
| Tailwind CSS | Responsive styling |
| Lucide React | Interface icons |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| TypeScript | Type-safe backend development |
| MongoDB | NoSQL database |
| Mongoose | Object Data Modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image management |
| Google Gemini API | AI assistant integration |

### Development & Deployment

- Git & GitHub
- Postman
- MongoDB Atlas
- Vercel

## 🔐 Security Considerations

LostLink incorporates several security practices:

- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected API routes.
- Authorization checks for user-specific operations.
- Input validation.
- Environment variables for sensitive configuration.
- Ownership verification when updating or deleting reports.

## 🌐 Deployment

The application is deployed using Vercel, with separate frontend and backend deployments.

| Component | Deployment |
|---|---|
| Frontend | [LostLink Frontend](https://lostlink-frontend-two.vercel.app/) |
| Backend | [LostLink Backend](https://lostlink-backend.vercel.app/) |
| API Health Check | [Check API Status](https://lostlink-backend.vercel.app/api/v1/health) |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

## 📂 Project Structure

```text
LostLink/
│
├── LostLink-Frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── hooks/
│       ├── services/
│       └── assets/
│
└── LostLink-Backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        └── app.ts
```

## 🚀 Future Enhancements

Potential future improvements include:

- Real-time private messaging between users.
- Advanced image-based item similarity detection.
- Interactive map-based item discovery.
- Enhanced analytics and reporting.
- More advanced notification capabilities.

## 🎥 Project Demonstration

Watch the complete LostLink application walkthrough, showcasing its features, functionality, and user experience.

<div align="center">

[![LostLink Project Demo](https://img.youtube.com/vi/wlZ4HAUSiRE/maxresdefault.jpg)](https://youtu.be/wlZ4HAUSiRE)

**▶️ Watch LostLink – Complete Project Demonstration**

</div>

The demonstration covers the application's user interface, authentication, item reporting, search functionality, automatic matching mechanism, notifications, dashboard, and AI assistant.

---

## 👨‍💻 Developed By

<div align="center">

### Oshan Udeesha

**Full Stack Developer | Undergraduate Software Engineering Student**

Building practical software solutions through modern web technologies.

[![GitHub](https://img.shields.io/badge/GitHub-Oshan--uk-181717?style=for-the-badge&logo=github)](https://github.com/Oshan-uk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Oshan%20Udeesha-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/oshan-udeesha-a380b03a8/)
[![YouTube](https://img.shields.io/badge/YouTube-Oshan%20Udeesha%20Official-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@oshanudeeshaofficial)

</div>

---

<div align="center">

**LostLink — Reconnecting People With What Matters.**

*Designed and developed as a Full Stack Web Application Development coursework project.*

</div>
