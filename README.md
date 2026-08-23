# 🩺 MediaFlow — Manage (Admin/Doctor Dashboard)

An administrative dashboard for managing the MediaFlow platform — allowing admins and doctors to oversee doctor profiles, patient bookings, user accounts, and rating analytics from a single control panel. Built with **Angular** and **Tailwind CSS**, connecting to the same Express.js/MongoDB backend as the Patient Portal.

**🔗 Live Demo:** [media-flow-manage.vercel.app](https://media-flow-manage.vercel.app)

---

## ✨ Features

- 🔐 **Admin/Doctor Authentication** — Secure login with role-based access using JWT.
- 👨‍⚕️ **Doctor Management** — Add, edit, or remove doctor profiles and details.
- 📅 **Bookings Management** — View, update, and manage all patient appointments.
- 👥 **User Management** — Manage registered patient accounts.
- 📊 **Rating Analytics** — Track and analyze doctor ratings and reviews across the platform.
- 📱 **Responsive UI** — Clean, dashboard-friendly interface built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Angular 17+](https://angular.io/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend | [Express.js](https://expressjs.com/) *(shared with MediaFlow Client)* |
| Database | [MongoDB](https://www.mongodb.com/) |
| Auth | [JWT](https://jwt.io/) (role-based access) |
| Deployment | [Vercel](https://vercel.com/) |

> ℹ️ This repository contains the **admin/doctor dashboard (frontend)** only. It connects to the same backend API used by the [MediaFlow Patient Portal](https://media-flow-client.vercel.app).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli)
- The MediaFlow backend running locally or deployed

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/mediaflow-manage.git
cd mediaflow-manage

# Install dependencies
npm install
```

### Environment Setup

Configure the API base URL in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api" // point to your backend URL
};
```

### Run Locally

```bash
ng serve
```

Then navigate to `http://localhost:4200/`.

### Build for Production

```bash
ng build --configuration production
```
