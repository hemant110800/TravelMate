# Decision History – TravelMate

## 1. Frontend Framework
**Decision:** React with Vite and TypeScript  
**Reason:** Enables fast development, modern tooling, strong ecosystem support, and type safety for a scalable frontend.  
**Trade-off:** Requires strict TypeScript and ESLint discipline during development.

## 2. Backend Framework
**Decision:** Django with Django REST Framework  
**Reason:** Allows rapid API development, structured project organization, and built-in support for authentication and permissions.  
**Trade-off:** Heavier framework compared to lightweight alternatives, with slightly higher resource usage.

## 3. Authentication Strategy
**Decision:** JWT-based authentication  
**Reason:** Stateless authentication mechanism suitable for SPA architecture and frontend–backend separation.  
**Trade-off:** Advanced features such as refresh token rotation and multi-factor authentication are not implemented in the current version.

## 4. Payment Integration
**Decision:** Razorpay integration using Test Mode  
**Reason:** Provides a secure and reliable sandbox environment to demonstrate payment workflows without real transactions.  
**Trade-off:** Real monetary transactions are disabled and payment flows are limited to test scenarios.

## 5. AI Assistant Scope
**Decision:** Read-only, general-purpose Generative AI assistant  
**Reason:** Ensures user safety and prevents unauthorized access or actions within the application.  
**Trade-off:** The AI assistant cannot access application data, user accounts, or trigger any in-app operations.

## 6. Image Management
**Decision:** Static public images for places and products  
**Reason:** Simplifies development and deployment while focusing on core application functionality.  
**Trade-off:** Admin-based image uploads and cloud storage are not available in the current version.

## 7. Deployment Strategy
**Decision:** Netlify for frontend and Render for backend  
**Reason:** Provides simple CI/CD pipelines, easy deployment, and free-tier support suitable for a portfolio project.  
**Trade-off:** Backend may experience cold-start latency under low traffic conditions.
