# Application Specification – TravelMate

## Project Title
TravelMate – Travel and Shopping Platform

## Introduction
TravelMate is a full-stack web application that combines travel planning, shopping, secure payments, and AI-powered assistance into a single platform.
The application is designed to provide users with a seamless experience for discovering travel destinations, purchasing travel-related products, and receiving intelligent guidance through an AI chat assistant.

This project demonstrates real-world full-stack development concepts including frontend UI development, backend API design, authentication, payment integration, and cloud deployment.

## Core Features

### 1) User Authentication
a) User registration and login functionality
b) JWT token–based authentication
c) Personalized user experience after login

### 2) Travel Module (Places)
a) View a list of available travel destinations
b) Select preferred travel places
c) Track user-specific selected places
d) Remove selected places at any time
e) Persistent storage of user preferences

### 3) Shopping Module
a) Browse a catalog of travel-related products
b) View product prices and details
c) Add products to cart
d) Update or remove cart items
e) “Buy Now” option for instant purchases
f) Place orders directly from the cart

### 4) Payment Integration
a) Secure payment processing using Razorpay
b) Supports:
     i) Cart-based checkout 
     ii) Buy Now flow
c) Ensures safe and reliable transaction handling

### 5) AI Chat Assistant
a) Integrated Generative AI–based chat assistant
b) Helps users with:
    i) Travel-related queries
    ii) General guidance within the application
c) Enhances overall user engagement and experience
    
   

## Scope of Application

### Current Features
- Browse travel destinations (places)
- View travel-related products
- User authentication using JWT
- Responsive frontend UI
- RESTful backend APIs
- Static image serving via frontend CDN

---

## Frontend Requirements

1. **User Interface**
   - Display a list of travel destinations
   - Display travel products with images and details
   - Login and registration screens
   - Navigation and protected routes

2. **User Experience**
   - Responsive layout for dekstop
   - Client-side form validation
   - Smooth navigation and feedback

3. **Technology**
   - React + TypeScript
   - Vite for bundling
   - Context API, Redux for state management

---

## Backend Requirements

1. **API Development**
   - REST APIs for places, products, and users
   - JWT-based authentication
   - Role-based access (future scope)

2. **Data Storage**
   - PostgreSQL database
   - Django ORM models
   - Migration-based schema management

3. **Validation & Error Handling**
   - Server-side validation for inputs
   - Proper HTTP status codes and error messages

---

## Non-Functional Requirements

- Secure handling of credentials
- Scalable deployment setup
- Clean and maintainable codebase

---

## Assumptions & Design Decisions

- Images are currently served statically from frontend
- Backend does not store media files in production
- Cloud storage will be used for admin uploads in future
- Authentication tokens are stored client-side

---

## Future Enhancements

- Admin dashboard
- Cloud-based image uploads
- Booking and itinerary management
- Payment integration

---

## Evaluation Criteria

This project demonstrates:
- Full-stack architecture understanding
- Clean API design
- Frontend–backend integration
- Production deployment practices

