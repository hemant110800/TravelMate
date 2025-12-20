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

## Frontend Requirements

### User Interface
a) Responsive and user-friendly UI  
b) Clear navigation between modules  
c) Protected routes for authenticated users  
d) Real-time feedback on user actions  

### Technology

React (Vite)  
TypeScript  
SCSS for styling  
Axios for API communication  

## Backend Requirements

### API Development
a) RESTful APIs using Django REST Framework  
b) JWT-based authentication and authorization  
c) Secure endpoints for user-specific data  

### Data Management  
a) PostgreSQL Database  
b) Relational schema for users, places, products, carts, orders, and payments  
c) Migration-based schema evolution  

### Validation & Error Handling
a) Server-side input validation  
b) Proper HTTP status codes  
c) Meaningful error messages  

## Database Design
The database schema and relationships are documented using DbDocs.

## Non-Functional Requirements
a) Secure handling of sensitive data  
b) Scalable backend architecture  
c) Clean, maintainable, and modular codebase  
d) Separation of concerns between frontend and backend  
e) Production-ready deployment strategy  

## Assumptions & Design Decisions
a) Static images (places and products) are currently served from the frontend using Netlify CDN  
b) Backend does not store media files in production  
c) Cloud-based storage will be introduced for admin-uploaded images in future  
d) JWT tokens are stored client-side for authentication  
e) Payment processing relies on Razorpay’s hosted checkout flow  

All assumptions are documented to ensure transparency during evaluation.

## Project Setup
a) Frontend and backend are maintained in separate directories  
b) Each directory contains its own README.md with detailed local setup instructions  
c) PostgreSQL database is dockerized for local development

## Tech Stack Summary

#### Frontend 
React (Vite), TypeScript, SCSS, Axios

#### Backend
Django, Django REST Framework, JWT Authentication

#### Database
PostgreSQL (Dockerized)

## Integrations & Tools

a) Razorpay Payment Gateway  
b) Generative AI APIs  
c) Docker (PostgreSQL)  
d) DbDocs (Schema documentation)  
e) GitHub (Version Control)  

## Future Enhancements

a) Admin dashboard for managing places and products  
b) Cloud-based image uploads (Cloudinary / S3)  
c) Booking and itinerary management  
d) Advanced AI-powered travel recommendations  
e) Improved order tracking and history  

## Evaluation Focus

This project is intended to demonstrate:  
a) Full-stack application design  
b) Frontend–backend integration  
c) Secure authentication and payments  
d) Real-world deployment practices  
e) Scalable and maintainable architecture  

Any additional assumptions or implementation trade-offs are documented in the respective README.md files.
