# TravelMate Frontend - React + TypeScript + Vite

TravelMate is a travel-focused web application that allows users to explore places, browse products, and interact with travel features through a modern React-based frontend.

This project is built using React, TypeScript, and Vite and is deployed on Netlify.

## Tech Stack

#### Framework: 
React
#### Build Tool: 
Vite
#### Language: 
TypeScript
#### Styling:
SCSS
#### State Management:
React Context API, REDUX
#### API Communication:
REST (Django backend)
#### Deployment:
Netlify

## Prerequisites
Make sure you have the following installed:

Node.js (v18+ recommended), npm (or yarn), Git

## Local Setup Instructions

### 1. Clone the Repository
git clone your-frontend-repo-url
cd travelmate-frontend

### 2. Install Dependencies
npm install

### 3. Environment Variables

Create a .env file in the project root:

VITE_BACKEND_URL = http://127.0.0.1:8000

**Important Notes**
1. All Vite environment variables must start with VITE_
   
2. VITE_BACKEND_URL should point to your running backend server

### 4.Static Images Setup

Currently, the application uses static images served directly from the frontend.

📁 **Folder structure:**

public/places/taj-mahal.jpg,
public/places/goa.jpg,
public/products/bag.jpg,
public/products/shoes.jpg

**Notes:**
1. Do not include /public in URLs
   
2. File names are case-sensitive
  
3. Images are served by Netlify CDN in production

### 5. Run the Development Server

**npm run dev**
The application will be available at:
http://localhost:5173

## Authentication Flow

1. User authenticates via backend APIs

2. Backend returns a JWT access token

3. Token is stored on the client (context / localStorage)

4. Token is attached to protected requests

```
