# StylistAssist 💇‍♀️

An AI-powered content assistant for hairstylists — upload a photo of a finished look and get a ready-to-post Instagram caption in seconds, written to sound like the stylist, not a marketing agency.

**Live at:** [stylistassist.com](https://stylistassist.com)

---

## ✨ Project Overview

**StylistAssist** is a full-stack app built for hairstylists and salon professionals who don't want to spend 30 minutes writing a caption after a full day behind the chair.

Built with a **decoupled architecture**, the platform uses a **Django REST Framework (DRF)** backend and a **Next.js** frontend for scalability, performance, and flexibility.

Current core feature:

- **AI Image Analysis + Caption Generator** powered by OpenAI

> **Status:** ✅ *Live*
> The app is deployed and functional at [stylistassist.com](https://stylistassist.com).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

### Backend
- **Framework:** Django REST Framework (DRF)
- **Language:** Python
- **Authentication:** JWT via SimpleJWT
- **AI Integration:** OpenAI API for image-based caption generation

---

## 🏗 System Architecture

StylistAssist uses a **decoupled full-stack architecture**:

1. **Backend (DRF)**
   Handles API endpoints, business logic, authentication, and database operations.
2. **Frontend (Next.js)**
   Provides a responsive user interface, manages routing, and consumes backend APIs.
3. **AI Services**
   Processes uploaded hairstyle images and generates personalized captions for marketing and social media use.
4. **Authentication Layer**
   Secure JWT-based authentication ensures protected access to user-specific features and data.

---

## 🚀 Core Features

### 🤖 AI Caption Generator
Users upload a hairstyle photo and receive an engaging, on-voice caption tailored for platforms like Instagram — written from the stylist's own perspective rather than generic "stunning transformation!" marketing copy.

### 📸 Image Analysis
AI reviews hairstyle photos to generate context-aware content based on style, color, and presentation.

---

## 🧑‍💻 Running Locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Both need a few environment variables set (OpenAI key, Django secret key, API URL) — see `.env` in each folder.