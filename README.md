# StylistAssist 💇‍♀️

An AI-powered business assistant for hairstylists, built to help beauty professionals manage bookings, create engaging social media content, and streamline daily client interactions.

---

## ✨ Project Overview

**StylistAssist** is a full-stack application designed specifically for hairstylists and salon professionals. It combines business tools with AI-powered features to support both client management and online growth.

Built with a **decoupled architecture**, the platform uses a **Django REST Framework (DRF)** backend and a **Next.js** frontend for scalability, performance, and flexibility.

Current core features include:

- **Booking Management** for client appointments  
- **AI Image Analysis + Caption Generator** powered by OpenAI  

> **Status:** 🚧 *Active Development*  
> The project is currently in progress. While not yet deployed to a live production URL, the core backend API and frontend interfaces are functional in a local development environment.

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

### 📅 Booking System
A scheduling feature that allows hairstylists to manage appointments and client bookings efficiently.

### 🤖 AI Caption Generator
Users can upload hairstyle images and receive polished, engaging captions tailored for platforms like Instagram and Facebook.

### 📸 Image Analysis
AI reviews hairstyle photos to generate context-aware marketing content based on style, color, and presentation.

---
