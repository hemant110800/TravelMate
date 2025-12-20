# Application Specification – TravelMate

## Project Title
TravelMate – Travel and Shopping Platform

## Introduction
TravelMate is a full-stack web application that combines travel planning, shopping, secure payments, and AI-powered assistance into a single platform.
The application is designed to provide users with a seamless experience for discovering travel destinations, purchasing travel-related products, and receiving intelligent guidance through an AI chat assistant.

This project demonstrates real-world full-stack development concepts including frontend UI development, backend API design, authentication, payment integration, and cloud deployment.

## Core Features

### 1) User Authentication
- User registration and login functionality  
- JWT token–based authentication  
- Personalized user experience after login  

### 2) Travel Module (Places)
- View a list of available travel destinations  
- Select preferred travel places  
- Track user-specific selected places  
- Remove selected places at any time  
- Persistent storage of user preferences  

### 3) Shopping Module
- Browse a catalog of travel-related products  
- View product prices and details  
- Add products to cart  
- Update or remove cart items  
- “Buy Now” option for instant purchases  
- Place orders directly from the cart  

### 4) Payment Integration
- Secure payment flow implemented using Razorpay  
- Supports checkout from cart and Buy Now flow  
- Integrated using Razorpay Test Mode for demo purposes  

### 5) AI Chat Assistant
- Integrated Generative AI–based chat assistant  
- Helps users general queries  
- Enhances overall user engagement and experience  

## Frontend Requirements

### User Interface
- Responsive and user-friendly UI  
- Clear navigation between modules  
- Protected routes for authenticated users  
- Real-time feedback on user actions  

### Technology

- React (Vit-  
- TypeScript  
- SCSS for styling  
- Axios for API communication  

## Backend Requirements

### API Development
- RESTful APIs using Django REST Framework  
- JWT-based authentication and authorization  
- Secure endpoints for user-specific data  

### Data Management  
- PostgreSQL Database  
- Relational schema for users, places, products, carts
- Migration-based schema evolution  

### Validation & Error Handling
- Server-side input validation  
- Proper HTTP status codes  
- Meaningful error messages  

## Database Design
The database schema and relationships are documented using DbDocs.

## Non-Functional Requirements
- Secure handling of sensitive data  
- Scalable backend architecture  
- Clean, maintainable, and modular codebase  
- Separation of concerns between frontend and backend  
- Production-ready deployment strategy  

## Assumptions & Design Decisions
- The application is developed primarily for **learning, demonstration, and evaluation purposes**.  
- **Payment integration is implemented using Razorpay in Test Mode only**. No real monetary transactions are processed.  
- All payment success and failure scenarios are based on Razorpay’s test environment responses.  
- Static images for travel places and shop products are currently served as public assets; admin-based image uploads may be added in future enhancements.    
- User authentication is implemented using JWT tokens without advanced features such as refresh token rotation or multi-factor authentication.  
- The **AI Chat Assistant is a general-purpose, Generative AI–based assistant** intended only for answering generic travel or usage-related queries.  
- The AI assistant **does not have access to application data, user accounts,  payments, or system controls**, and cannot perform or trigger any in-app actions.  
- AI-generated responses depend on third-party APIs and may not always be accurate or context-aware.  
- The system assumes a stable internet connection for API communication and third-party integrations.  
- The application is optimized for modern web browsers; legacy browser support is not guaranteed.  

All assumptions are documented to ensure transparency during evaluation.

## Project Setup
- Frontend and backend are maintained in separate directories  
- Each directory contains its own README.md with detailed local setup instructions  
- PostgreSQL database is dockerized for local development

## Tech Stack Summary

#### Frontend 
React (Vit-, TypeScript, SCSS, Axios

#### Backend
Django, Django REST Framework, JWT Authentication

#### Database
PostgreSQL (Dockerize-

## Integrations & Tools

- Razorpay Payment Gateway  
- Generative AI APIs  
- Docker (PostgreSQL)  
- DbDocs (Schema documentation)  
- GitHub (Version Control)  

## Future Enhancements

- Admin dashboard for managing places and products  
- Cloud-based image uploads (Cloudinary / S3)  
- Booking and itinerary management  
- Advanced AI-powered travel recommendations  
- Improved order tracking and history  

## Evaluation Focus

This project is intended to demonstrate:  
- Full-stack application design  
- Frontend–backend integration  
- Secure authentication and payments  
- Real-world deployment practices  
- Scalable and maintainable architecture  

Any additional assumptions or implementation trade-offs are documented in the respective README.md files.
