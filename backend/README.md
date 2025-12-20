# TravelMate Backend – Local Development Setup
This document explains how to set up and run the TravelMate backend server locally for development and testing.

# Tech Stack

**Backend:** Django / Django REST Framework
**Database:** PostgreSQL
**Containerization:** Docker (for DB)
**Auth:** JWT
**Deployment (Prod):** Render

# Prerequisites
Make sure you have the following installed: Python 3.10+, Docker, pip / virtualenv, Git

# Steps to setup Server Locally

# 1. Clone the Repository

git clone <your-repo-url>

cd travelmate-backend

# 2. Create a PostgreSQL Database (Using Docker)

**Run PostgreSQL container:**

docker run --rm -d --name travelMate-postgres -e POSTGRES_USER=travelmate_user -e POSTGRES_PASSWORD=travelmate_password -p 5432:5432 postgres

**Create a sample database:**

docker exec -it travelmate-postgres psql -U travelmate_user -c "CREATE DATABASE travelmate_db;"

# 3. Create a .env file with required values
Create a .env file in the project root.

OPENAI_API_KEY = ""
GOOGLE_API_KEY = "your-google-api-key-here"
RAZORPAY_KEY_ID = "your-rzp-key-id"
RAZORPAY_KEY_SECRET = "your-rzp-secret"
DB_NAME = "dbname"
DB_USER = "dbuser"
DB_PASSWORD = "dbpassword"
DB_HOST = "dbhost"
DB_PORT = "dbport"
PG_ADMIN_EMAIL = "pgadminemail"
PG_ADMIN_PASSWORD = "password"
DJ_SECURE_KEY = "django secret key"
DJANGO_DEBUG_FLAG = "False"
ALLOWED_HOSTS="allowed hosts"

# 4. Create & Activate Virtual Environment
**Create :-** python -m venv venv
**Activate :-** venv\Scripts\activate

# 5. Install Dependencies
pip install -r requirements.txt

# 6. Apply Database Migrations

python manage.py makemigrations
python manage.py migrate

**(Optional) Create superuser:**

python manage.py createsuperuser

# 7. Run the Development Server
python manage.py runserver

Backend will be available at:
http://127.0.0.1:8000/
