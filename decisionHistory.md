# Decision History – TravelMate

## 1. Frontend Framework
**Decision:** React with Vite and TypeScript  
**Reason:** Fast development, modern tooling, strong ecosystem  
**Trade-off:** Requires strict linting and type discipline

## 2. Backend Framework
**Decision:** Django + Django REST Framework  
**Reason:** Rapid API development, built-in authentication support  
**Trade-off:** Heavier compared to lightweight frameworks

## 3. Authentication Strategy
**Decision:** JWT-based authentication  
**Reason:** Stateless, suitable for SPA architecture  
**Trade-off:** Refresh token rotation not implemented in current version

## 4. Payment Integration
**Decision:** Razorpay in Test Mode  
**Reason:** Safe sandbox testing and India-focused gateway  
**Trade-off:** No real transactions enabled

## 5. AI Assistant Scope
**Decision:** Read-only, general-purpose GenAI assistant  
**Reason:** Prevents security risks and uncontrolled app actions  
**Trade-off:** AI cannot access or modify application data

## 6. Image Management
**Decision:** Static public images  
**Reason:** Faster development and simpler deployment  
**Trade-off:** No admin uploads yet

## 7. Deployment Strategy
**Decision:** Netlify (Frontend) + Render (Backend)  
**Reason:** Easy CI/CD and free-tier friendly  
**Trade-off:** Possible cold start latency on backend
