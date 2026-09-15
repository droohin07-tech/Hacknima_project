import requests

BASE_URL = "http://127.0.0.1:5000"

# A Session keeps login cookies between requests.
session = requests.Session()

# -----------------------------
# 1. Test backend health
# -----------------------------
response = session.get(f"{BASE_URL}/api/health")

print("HEALTH CHECK")
print("Status:", response.status_code)
print("Response:", response.json())
print("-" * 50)


# -----------------------------
# 2. Register a test student
# -----------------------------
register_data = {
    "name": "Test Student",
    "email": "teststudent@example.com",
    "password": "test123456",
    "role": "student"
}

response = session.post(
    f"{BASE_URL}/api/auth/register",
    json=register_data
)

print("REGISTRATION")
print("Status:", response.status_code)
print("Response:", response.json())
print("-" * 50)


# -----------------------------
# 3. Login with the account
# -----------------------------
login_data = {
    "email": "teststudent@example.com",
    "password": "test123456",
    "role": "student"
}

response = session.post(
    f"{BASE_URL}/api/auth/login",
    json=login_data
)

print("LOGIN")
print("Status:", response.status_code)
print("Response:", response.json())
print("-" * 50)


# -----------------------------
# 4. Check authenticated user
# -----------------------------
response = session.get(
    f"{BASE_URL}/api/auth/me"
)

print("CURRENT USER")
print("Status:", response.status_code)
print("Response:", response.json())
print("-" * 50)


# -----------------------------
# 5. Logout
# -----------------------------
response = session.post(
    f"{BASE_URL}/api/auth/logout"
)

print("LOGOUT")
print("Status:", response.status_code)
print("Response:", response.json())
print("-" * 50)


# -----------------------------
# 6. Confirm session was cleared
# -----------------------------
response = session.get(
    f"{BASE_URL}/api/auth/me"
)

print("CHECK AFTER LOGOUT")
print("Status:", response.status_code)
print("Response:", response.json())